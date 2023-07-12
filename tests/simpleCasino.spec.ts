import { Page, test as base, expect } from '@playwright/test';
import { MainPage } from './pages/main.page';
import { faker } from '@faker-js/faker';
import { DashBoardPage } from './pages/dashboard.page';
import { CasinoPage } from './pages/casino.page';
import { getWonPrize } from './utils/stringUtils';

type BaseFixture = {
  email: string;
  phoneNumber: string;
  name: string;
  password: string;
}

// Prepare simple fixture to share user info.
const test = base.extend<BaseFixture> ({
  email: faker.internet.email(),
  phoneNumber: faker.phone.number('+46#########'),
  name: faker.person.fullName(),
  password: faker.internet.password( { length:7 } )
})

test.describe('Fast Track cases', () => {
  
  test('Sign in and login cases', async ({page, email, phoneNumber, name, password}) => {
    const mainPage = new MainPage(page)
    const dashBoardPage = new DashBoardPage(page);
    
    await mainPage.goto()
    
    // Registration
    await mainPage.newUserButton.click()
    await mainPage.introButton.click()
    
    // Email
    await expect(mainPage.loginField).toHaveAttribute('placeholder', 'Enter Email')
    await mainPage.loginField.fill(email)
    await mainPage.submitButton.click()
    
    // Phone number
    await expect(mainPage.phoneCountryCodeField).toHaveAttribute('placeholder', '+46')
    await expect(mainPage.phoneField).toHaveAttribute('placeholder', 'Phone number')
    await mainPage.phoneCountryCodeField.fill(phoneNumber.substring(0,3))
    await mainPage.phoneField.fill(phoneNumber.substring(3))
    await mainPage.submitButton.click()
  
    // Name
    await expect(mainPage.loginField).toHaveAttribute('placeholder', 'Enter your name')
    await mainPage.loginField.fill(name)
    await mainPage.submitButton.click()
  
    // Password
    await expect(mainPage.loginField).toHaveAttribute('placeholder', 'Password')
    await mainPage.loginField.fill(password)
    await mainPage.submitButton.click()
  
    // Checking for succesfull registration
    await expect(await mainPage.getElementWithText('h3', 'Your registration is complete!')).toBeVisible()
    await expect(await mainPage.getElementWithText('button', 'Login')).toBeVisible()
  
    // Login with created user (I think this is a different case than is plain login)
    await (await mainPage.getElementWithText('button', 'Login')).click()
  
    await expect(mainPage.loginField).toHaveAttribute('placeholder', 'Enter Email')
    await mainPage.loginField.fill(email)
    await mainPage.submitButton.click()
  
    // I can't understand why a password is not required there. But I have a lack of product knowledge for now.
    // await expect(mainPage.loginField).toHaveAttribute('placeholder', 'Password')
    // await mainPage.loginField.fill(password)
    // await mainPage.submitButton.click()
  
    // Check for succesfull login
    await expect(await mainPage.getElementWithText('h1', 'Fast Track CRM - Built for Casino, Sports and Lottery')).toBeVisible()
    await expect(dashBoardPage.depositeButton).toBeVisible()
  })
  
  test('Login case', async ({ page, email }) => {
    const mainPage = new MainPage(page)
    const dashBoardPage = new DashBoardPage(page);

    await mainPage.goto()

    await mainPage.returningUserButton.click()
    
    // Email
    await expect(mainPage.loginField).toHaveAttribute('placeholder', 'Enter Email')
    await mainPage.loginField.fill(email)
    await mainPage.submitButton.click()
    
  
    // Password
    // I can't understand why a password is not required there. But I have a lack of product knowledge for now.
    // await mainPage.loginField.fill(password)
    // await mainPage.submitButton.click()
    
    // Check for succesfull login
    await expect(await mainPage.getElementWithText('h1', 'Fast Track CRM - Built for Casino, Sports and Lottery')).toBeVisible()
    await expect(dashBoardPage.depositeButton).toBeVisible()
  });
  
  test('Deposite balance case', async ({ page, email, password }) => {
    const mainPage = new MainPage(page)
    const dashBoardPage = new DashBoardPage(page)
    await mainPage.login(email, password)

    await expect(dashBoardPage.depositeButton).toHaveText('€0.00')

    await dashBoardPage.depositeButton.click()
    const depositModal = dashBoardPage.depositElement;

    await (await depositModal.cardButton).click();
    await (await depositModal.deposit50Button).click();
    await (await depositModal.depositApprovedButton).click();

    await expect(await mainPage.getElementWithText('h3', 'Your deposit was successful!')).toBeVisible()
    await (await depositModal.OkButton).click();

    await expect(dashBoardPage.depositeButton).toHaveText('€50.00')
  });
  
  test('Play casino game case', async ({ page, email, password }) => {
    const mainPage = new MainPage(page)
    const casinoPage = new CasinoPage(page)
    await mainPage.login(email, password)
  
    await casinoPage.navigationMenu.click()
    await (await casinoPage.getMenuElement('Casino')).click();

    
    
    // Losing case
    await (await casinoPage.loseCat2()).click()
    await expect(await casinoPage.getFrameElementWithText('h2', 'You didn\'t win anything this time.')).toBeVisible()
    await (await casinoPage.getFrameElementWithText('h2', 'You didn\'t win anything this time.')).waitFor({state: 'hidden'})

    await expect(casinoPage.balanceLable).toContainText('45')
    await expect(casinoPage.depositeButton).toHaveText('€45.00', {timeout: 20000})

    // Winning case (with random prize)
    await (await casinoPage.winCat1()).click()
    const wonMessage = await (await casinoPage.getFrameElementWithText('h2', 'You just won')).textContent()
    const prize = getWonPrize(wonMessage)
    await casinoPage.logToBrowserConsole(`Won ${prize}`)
    
    await expect(casinoPage.balanceLable).toContainText(`${45 + prize}`)
    await expect(casinoPage.depositeButton).toHaveText(`€${45 + prize}.00`, {timeout: 20000})
  });
})

