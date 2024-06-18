const calcLvl = (betAmount, user) => {
  let exp = Math.round(user.exp * 100 + betAmount)
  while (exp >= 100000) {
    exp -= 100000
    user.lvl += 1
  }
  user.exp = exp / 100
}

export default calcLvl