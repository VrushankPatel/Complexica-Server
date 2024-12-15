"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Util = _interopRequireDefault(require("../utilities/Util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var axios = require('axios');

var uploadImageRequest = function uploadImageRequest(img, updateImage, stopProgressSim) {
  var FormData = require('form-data');

  var data = new FormData();
  data.append('image', img);
  var config = {
    method: 'post',
    url: _Util["default"].getUrlByGMT(),
    data: data
  };
  axios(config).then(function (response) {
    updateImage(response.data);
    stopProgressSim();
  })["catch"](function (error) {
    alert("Unable to convert image, please try again later..");
  });
};

var _default = uploadImageRequest;
exports["default"] = _default;