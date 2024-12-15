"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var URL1 = "/complexica/upload_image";
var URL2 = "/complexica/upload_image";
var util = {
  capitalizeFirstChar: function capitalizeFirstChar(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  },
  getUrlEndPoint: function getUrlEndPoint() {
    var url = new URL(window.location.href).pathname.split("/")[1];
    url = url ? url : "home"; // home page has no url patern after domain name, so..        

    return util.capitalizeFirstChar(url);
  },
  isValidExtension: function isValidExtension(fileName, listOfAcceptedExtensions) {
    var fileNameChunks = fileName.split(".");
    var extension = fileNameChunks[fileNameChunks.length - 1];
    return listOfAcceptedExtensions.includes(extension);
  },
  getUrlByGMT: function getUrlByGMT() {
    var gmtHour = new Date().toUTCString().split(" ")[4].split(":")[0];

    if (gmtHour >= 7 && gmtHour <= 19) {
      return URL1;
    }

    return URL2;
  }
};
var _default = util;
exports["default"] = _default;