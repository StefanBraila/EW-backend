import calcLvl from '../util/calcLvl.js'

const dice = async (req, res) => {
  try {
    let { winChance, betAmount, reverse } = req.body;
    betAmount = Math.round(betAmount * 100)
    if (isNaN(winChance) || isNaN(betAmount)) {
      return res.status(400).json({
        msg: "Win chance and bet amount are required and must be numbers",
      })}
    const user = req.user;
    if (user.bj) {
      return res.status(403).json({
        msg: "You have a blackjack game in progress",
    });}
    if (Math.round(user.balance * 100) < betAmount) {
      return res.status(403).json({
        msg: "Insufficient coins",
      });
    }
    if (winChance > 99 || winChance < 1) {
      return res.status(400).json({
        msg: "Win chance must be between 1 and 99",
      });
    }
    calcLvl(betAmount, user)
    const multiplier = 99 / winChance
    const ln = Math.random() * 100;
    let win = true
    if (!reverse) {
      if (ln < winChance) {
        user.balance = Math.round(user.balance * 100 + (betAmount * multiplier - betAmount)) / 100
      } else {
        win = false;
        user.balance = Math.round(user.balance * 100 - betAmount) / 100
      }
    } else {
      winChance = 100 - winChance;
      if (ln > winChance) {
        user.balance = Math.round(user.balance * 100 + (betAmount * multiplier - betAmount)) / 100
      } else {
        win = false;
        user.balance = Math.round(user.balance * 100 - betAmount) / 100
      }
    }

    await user.save();
    res.status(200).json({
      win,
      ln: ln.toFixed(2),
      balance: user.balance,
      lvl: user.lvl,
      exp: user.exp,
    });
  } catch (err) {
    console.error('error in dice controller, ', err);
    res.status(500).json({
      msg: "Server error",
    });
  }

}
export default dice;