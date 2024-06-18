import calcPoints from './calcPoints.js'
import cards from './cards.js'

const dealerPlay = (hand) => {
    let p = calcPoints(hand)
    while (p < 17) {
        hand.push(cards[Math.floor(Math.random() * cards.length)])
        p = calcPoints(hand)
    }
    return hand
}
export default dealerPlay