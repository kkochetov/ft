
/*
* Extract the won prize from the win message 
*/
export const getWonPrize = (message: string | null) => {
    if (message === null) {
        return 0
    }
    const m = message.matchAll(/.*€([0-9]+).*/g)
    if (m[1] === undefined) {
        return 0
    }
    return parseInt(m[1])
}