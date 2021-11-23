const Session = require('../models/session_id');

module.exports.get = async (req, res) => {

    const sessionID = req.get('sessionID');
    const result = await Session.deleteOne({ 'sessionID': sessionID });

    if (result.deletedCount == 1) {
        res.status(200).json({
            message: "Logged out"
        })
    } else {
        res.status(400).json({
            message: "Unexpected error"
        })
    }
};