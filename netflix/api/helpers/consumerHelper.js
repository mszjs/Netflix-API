const axios = require('axios');
const {kongURL} = require('../../config')

module.exports = {
    createConsumer,
    createApiKeyForConsumer,
    deleteConsumerApiKey,
    addUserConsumerToUserGroup
}

async function createConsumer(user) {
    return (await axios({
        method: 'post',
        url: `${kongURL}/consumers`,
        data: {
            username: user.username
        }
    })).data
}

async function createApiKeyForConsumer(user, sessionID) {
    return (await axios({
        method: 'post',
        url: `${kongURL}/consumers/${user.username}/key-auth`,
        data: {
            key: sessionID.toString()
        }
    })).data
}

async function addUserConsumerToUserGroup(user) {
    return (await axios({
        method: 'post',
        url: `${kongURL}/consumers/${user.username}/acls`,
        data: {
            "group": "group_user"
        }
    })).data
}

async function deleteConsumerApiKey(apikey) {
    return (await axios({
        method: 'delete',
        url: `${kongURL}/key-auths/${apikey}`
    })).data
}