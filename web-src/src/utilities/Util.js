const AbsURL1 = "/"; // http://127.0.0.1:5000
const AbsURL2 = "/"; // http://127.0.0.1:5000

const listOfAcceptedExtensions = ["jpg", "png", "jpeg"];
const getUrlByGMTFn = () => {
    const currentDate = new Date().getDate();
    if (currentDate <= 15) return AbsURL1;
    else return AbsURL2;
}
const util = {
    capitalizeFirstChar: str => str.charAt(0).toUpperCase() + str.substring(1),
    getUrlEndPoint: () => {
        let url = new URL(window.location.href).pathname.split("/")[1];
        url = url ? url : "home";
        return util.capitalizeFirstChar(url);
    },
    isValidExtension: (fileName) => {
        let fileNameChunks = fileName.split(".");
        const extension = fileNameChunks[fileNameChunks.length - 1];
        return listOfAcceptedExtensions.includes(extension)
    },
    getUrlByGMT: getUrlByGMTFn(),
    downloadBase64File: (contentType, base64Data, fileName) => {
        const linkSource = `data:${contentType};base64,${base64Data}`;
        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }
};


export default util;