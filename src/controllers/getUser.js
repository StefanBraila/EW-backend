
const getUser = (req, res) => {
    try {
        const user = req.user
        res.status(200).json({
            username: user.username,
            balance: user.balance,
            lvl: user.lvl,
            exp: user.exp
        })
    } catch(err) {
        console.log('error in getUser controller', err)
        res.status(500).json({msg: 'Server Error'})
    }
}
export default getUser