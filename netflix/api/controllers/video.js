const axios = require('axios');
const { dbUrl } = require('../../config');

module.exports = {
    getVideoByTitle: getVideoByTitle,
    addVideo: addVideo,
    addVideoByTitle: addVideoByTitle,
    listMyQueue: listMyQueue,
}

async function getVideoByTitle(req, res) {
    const videoTitleFromQuery = req.swagger.params.videoTitle.value;
    axios({
        method: 'get',
        url: `${dbUrl}/api/v1/video`,
        params: {
            query: { title: videoTitleFromQuery }
        },
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (response.status == 200) {
                if (response.data.length == 0) {
                    res.status(400).json({
                        message: "video not found"
                    })
                } else {
                    res.status(200).json(response.data);
                }
            }
        })
        .catch((error) => {
            if (error.response == undefined || error.response.status == 400) {
                res.status(400).json({
                    message: "Unexpected error"
                });
            }
        });
}

async function addVideo(req, res) {
    const videoFromBody = req.swagger.params.videoContent.raw;
    await axios({
        method: 'post',
        url: `${dbUrl}/api/v1/video`,
        data: videoFromBody,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (response.status == 201) {
                res.status(200).json({
                    message: "Video added to queue",
                    body: res.body
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

async function addVideoByTitle(req, res) {
    const videoTitleFromQuery = req.swagger.params.videoTitle.raw;
    axios({
        method: 'get',
        url: `${dbUrl}/api/v1/video`,
        params: {
            query: { title: videoTitleFromQuery }
        },
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (response.status == 200) {
                if (response.data.length == 0) {
                    res.status(400).json({
                        message: "video not found"
                    })
                } else {
                    const videoData = response.data;
                    axios({
                        method: 'post',
                        url: `${dbUrl}/listVideos`,
                        data: videoData[0],
                        headers: {
                            'apikey': req.get('apikey'),
                            'Content-Type': 'application/json'
                        }
                    })
                        .then((response) => {
                            if (response.status == 200) {
                                res.status(200).json({
                                    message: "Video added"
                                })
                            } else {
                                res.status(400).json({
                                    message: "Unexpected error"
                                })
                            }
                        })
                        .catch((error) => {
                            if (error.response == undefined || error.response.status == 400) {
                                res.status(400).json({
                                    message: "Unexpected error"
                                });
                            }
                        });
                }
            }
        })
        .catch((error) => {
            if (error.response == undefined || error.response.status == 400) {
                res.status(400).json({
                    message: "Unexpected error"
                });
            }
        });
}

async function listMyQueue(req, res) {
    await axios({
        method: 'get',
        url: `${dbUrl}/listVideos`,
        headers: {
            'sessionID': req.get('apikey'),
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (response.status == 200) {
                res.status(200).json(response.data);
            }
        })
        .catch((error) => {
            console.log(error)
        });
}