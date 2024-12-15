import Util from "../utilities/Util";
import axios from 'axios';


const uploadImageRequest = (img, updateImage, stopProgressSim, startTime, showDurationToast, enableDownload) => {
    var FormData = require('form-data');
    var data = new FormData();
    const beginTime = startTime;
    data.append('image', img);

    var config = {
        method: 'post',
        url: Util.getUrlByGMT + "api/upload_image",
        data: data
    };
    axios(config)
        .then(function (response) {
            updateImage(response.data.image);
            stopProgressSim();
            const timeTaken = Math.ceil((new Date() - beginTime) / 1000);
            if (response.data.timeTaken > -1) {
                showDurationToast(response.data.timeTaken, timeTaken);
            }
            enableDownload();
        })
        .catch(function (error) {            
            alert("Unable to convert image, please try again later..");
            stopProgressSim();
        });
}

export default uploadImageRequest;