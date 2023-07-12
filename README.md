Autotests for demo FT-CRM

To run:
 - clone this repo
 - npm i
 - npm run test

 To check the report:
 - npm test:report
 - open http://localhost:9323/

This cases cover only positive cases:
 - Make sure we can register on the casino
 - Make sure we can log in with an existing user
 - Make sure we can deposit and check so the balance matches.
 - Make sure that we can play a game and the balance updates.