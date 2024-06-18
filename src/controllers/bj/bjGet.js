import Bj from '../../models/bjModel.js'
import calcPoints from '../../util/bj/calcPoints.js'

const bjGet = async (req, res) => {
	try {
		const user = req.user
		if (!user.bj) {
			return res.status(200).json({msg: 'No active games'})
		}
		const bj = await Bj.findById(user.bj)
		if (!bj) {
			return res.status(404).json({
				msg: 'Blackjack game not found'
			})
		}
		const dealerPoints = calcPoints([bj.dealer[0]])
		if (bj.player.length) {
			const playerPoints = calcPoints(bj.player)
			return res.status(200).json({
				dealer: [bj.dealer[0]],
				dealerPoints,
				player: bj.player,
				playerPoints
			})
		}
		const playerPoints1 = calcPoints(bj.player1)
		const playerPoints2 = calcPoints(bj.player2)
		res.status(200).json({
			dealer: [bj.dealer[0]],
			dealerPoints,
			player1: bj.player1,
			player2: bj.player2,
			playerPoints1,
			playerPoints2,
			activeHand: bj.activeHand
		})
	} catch (err) {
		console.log('error in bjGet controller', err)
		res.status(500).json({msg: 'Server Error'})
	}
}
export default bjGet