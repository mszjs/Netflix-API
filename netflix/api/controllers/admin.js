const { default: axios } = require("axios");
const { dbUrl } = require("../../config");

module.exports = {
    getVideoById: getVideoById,
    updateVideo: updateVideo,
    deleteVideoById: deleteVideoById
}

async function getVideoById(req, res) {
    const videoIdFromPath = req.swagger.params.videoId.value;
    axios({
        method: 'get',
        url: `${dbUrl}/api/v1/video/${videoIdFromPath}`
    })
        .then((response) => {
            res.status(200).json(response.data);
        })
        .catch((error) => {
            if (error.response == undefined || error.response.status) {
                res.status(400).json({
                    message: "video not found"
                });
            }
        });
}

async function updateVideo(req, res) {
    const videoIdFromPath = req.swagger.params.videoId.value;
    const videoNameFromQuery = req.swagger.params.title.raw;
    const videoCategoryFromQuery = req.swagger.params.category.raw;
    const videoTpyeFromQuery = req.swagger.params.type.raw;
    axios({
        method: 'patch',
        url: `${dbUrl}/api/v1/video/${videoIdFromPath}`,
        data: {
            title: videoNameFromQuery,
            category: videoCategoryFromQuery,
            type: videoTpyeFromQuery
        }
    })
        .then((response) => {
            if (response.status == 200) {
                res.status(200).json({
                    message: "Video updated"
                });
            }
        })
        .catch((error) => {
            if (error.response == undefined || error.response.status) {
                res.status(400).json({
                    message: "Video not found"
                });
            }
        });
}

async function deleteVideoById(req, res) {
    const videoIdFromPath = req.swagger.params.videoId.value;
    axios({
        method: 'delete',
        url: `${dbUrl}/api/v1/video/${videoIdFromPath}`
    })
        .then((response) => {
            console.log(response);
            if (response.status == 204) {
                res.status(200).json({
                    message: "Video deleted"
                });
            }
        })
        .catch((error) => {
            if (error.response == undefined || error.response.status) {
                res.status(400).json({
                    message: "video not found"
                });
            }
        });
}