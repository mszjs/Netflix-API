const User = require('../models/user');
const Session = require('../models/session_id');

async function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function generateSessionID() {
    let ID = await getRandomInt(1000);
    console.log(ID)
    const currentID =await Session.find({
        'sessionID': ID
    });
    if (currentID.length == 0) {
        return ID;
    } else {
        await generateSessionID();
    }
}   

module.exports.post = async (req, res) => {
    const username = req.body.username;
    const pwd = req.body.password;
    const currentUser = await User.find({
        'username': username,
        'password': pwd
    });
    console.log(currentUser);
    if (currentUser.length == 0) {
        res.status(400).json({
            message: "Username/PWD error"
        })
    } else {
        const currentUserID = currentUser[0]['_id'];
        const sessionID = await generateSessionID();
        const sessionExist = await Session.find({
            'userId': currentUserID
        });

        if (sessionExist.length == 0) {
            Session.create({
                'userId': currentUserID,
                'sessionID': sessionID
            });
            res.status(200).json({
                message: "Session created",
                'sessionID': sessionID
            });
        } else {
            res.status(400).json({
                message: "Session already exist"
            })
        }
    }
};