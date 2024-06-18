import calcPoints from "./calcPoints.js"

const calcMultiplier = (bj) => {
  const dealerPoints = calcPoints(bj.dealer)
  if (bj.player.length !== 0) {
    const playerPoints = calcPoints(bj.player)
    if (playerPoints === 21 && dealerPoints !== 21 && bj.player.length === 2) return 1.5
    if (playerPoints > 21) return -1
    if (dealerPoints > 21) return 1
    if (playerPoints > dealerPoints) return 1
    if (playerPoints < dealerPoints) return -1
    return 0
  }
  let multiplier = 0
  const playerPoints1 = calcPoints(bj.player1)
  const playerPoints2 = calcPoints(bj.player2)
  if (playerPoints1 === 21 && dealerPoints !== 21 && bj.player1.length === 2) {
    multiplier += 1.5
  } else {
    if (playerPoints1 > 21) multiplier--
    if (dealerPoints > 21) multiplier++
    if (playerPoints1 > dealerPoints) multiplier++
    if (playerPoints1 < dealerPoints) multiplier--
  }
  if (playerPoints2 === 21 && dealerPoints !== 21 && bj.player2.length === 2) {
    multiplier += 1.5
  } else {
    if (playerPoints2 > 21) multiplier--
    if (dealerPoints > 21) multiplier++
    if (playerPoints2 > dealerPoints) multiplier++
    if (playerPoints2 < dealerPoints) multiplier--
  }
  return multiplier
}

export default calcMultiplier