
const axios = require('axios');
const { dbUrl } = require('../../config.js');
const consumerHelper = require('../helpers/consumerHelper.js')

module.exports = {
    createUser: createUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
}

async function createUser(req, res) {
    const user = req.swagger.params.user.raw;
    if (Object.keys(user).length !== 0) {
        const data = await consumerHelper.createConsumer(user);
        console.log(data);
        if (data.username) {
            await axios({
                method: 'post',
                url: `${dbUrl}/api/v1/user`,
                data: user,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    if (response.status == 201) {

                        res.status(200).json({
                            message: "User created"
                        });
                    }
                })
                .catch((error) => {
                    if (error.response != undefined) {
                        if (error.response.status == 400) {
                            res.status(400).json({
                                message: "User already exist or something went wrong"
                            });
                        }
                    } else {
                        res.status(400).json({
                            message: "Something went wrong"
                        });
                    }
                });
        }
    } else {
        res.status(404).json({
            message: "Bad Request"
        });
    }
}

async function loginUser(req, res) {
    const user = req.swagger.params.user.raw;
    await axios({
        method: 'post',
        url: `${dbUrl}/login`,
        data: user,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (response.status == 200) {
                consumerHelper.createApiKeyForConsumer(user, response.data.sessionID);
                consumerHelper.addUserConsumerToUserGroup(user);
                res.status(200).json({
                    message: "Login succesfull"
                });
            }
        })
        .catch((error) => {
            if (error.response.status == 400) {
                res.status(400).json({
                    message: "Something went wrong or session already exist"
                });
            }
        });

}

async function logoutUser(req, res) {
    const sessionID = req.get('apikey');
    await axios({
        method: 'get',
        url: `${dbUrl}/logout`,
        headers: {
            'Content-Type': 'application/json',
            'sessionID': sessionID
        }
    })
        .then((response) => {
            if (response.status == 200) {
                consumerHelper.deleteConsumerApiKey(sessionID);
                res.status(200).json({
                    message: "Logout succesfull"
                });
            }
        })
        .catch((error) => {
            if (error.response.status == 400) {
                res.status(400).json({
                    message: "Unexpected error"
                });
            }
        });
}
