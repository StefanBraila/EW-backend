import calcLvl from '../util/calcLvl.js'

const roulette = async (req, res) => {
    try {
        const user = req.user;
        const num = Math.floor(Math.random() * 37)
        const { bets } = req.body
        if (user.bj) {
            return res.status(403).json({
                msg: "You have a blackjack game in progress",
            });
        }
        const keys = Object.keys(bets)
        if (keys.length === 0) {
            return res.status(200).json({
                num
            })
        }
        let betAmount = 0
        for (let i = 0; i < keys.length; i++) {
            betAmount += bets[keys[i]]
        }
        if (betAmount > user.balance) {
            res.status(403).json({
                msg: 'insuficient balance'
            })
        }
        user.balance -= betAmount
        calcLvl(betAmount * 100, user)
        const wins = {}
        if (num % 3 === 1) wins["2to1-1"] = 3
        if (num % 3 === 2) wins["2to1-2"] = 3
        if (num % 3 === 0) wins["2to1-3"] = 3
        if (num <= 12 && num !== 0) wins["1st12"] = 3
        if (num <= 24 && num > 12) wins["2nd12"] = 3
        if (num <= 36 && num > 24) wins["3rd12"] = 3
        if (num <= 18 && num !== 0) wins["1to18"] = 2
        if (num <= 36 && num >= 19) wins["19to36"] = 2
        if (num % 2 === 0 && num !== 0) wins["even"] = 2
        if (num % 2 === 1) wins["odd"] = 2
        if (
            num === 2 ||
            num === 4 ||
            num === 6 ||
            num === 8 ||
            num === 10 ||
            num === 11 ||
            num === 13 ||
            num === 15 ||
            num === 17 ||
            num === 20 ||
            num === 22 ||
            num === 24 ||
            num === 26 ||
            num === 28 ||
            num === 29 ||
            num === 31 ||
            num === 33 ||
            num === 35
        ) {
            wins["black"] = 2
        } else {
            wins["red"] = 2
        }
        let win = 0
        for (let i = 0; i < keys.length; i++) {
            if (Number(keys[i]) === num) {
                win += bets[keys[i]] * 36
            }
            if (wins[keys[i]]) {
                win += bets[keys[i]] * wins[keys[i]]
            }
        }
        user.balance += win
        await user.save()
        res.status(200).json({
            win,
            num,
            balance: user.balance,
            lvl: user.lvl,
            exp: user.exp
        })
    } catch (err) {
        console.log('error in roulette controller', err)
        res.status(500).json({ msg: 'Server Error' })
    }
}

export default roulette