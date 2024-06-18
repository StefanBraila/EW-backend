const calcPoints = (hand) => {
  let p = 0
  let a = 0
  for (let i = 0; i < hand.length; i++) {
      if (hand[i][0] === 'A') a++
      else if (hand[i][0] === 'T' || hand[i][0] === 'J' || hand[i][0] === 'Q' || hand[i][0] === 'K') {
          p += 10
      } else {
          p += Number(hand[i][0])
      }
  }
  while (a !== 0) {
      if (11 + (a - 1) + p > 21) {
          p++
      } else {
          p += 11 + (a - 1)
          break
      }
      a--
  }
  return p
}
export default calcPoints