const { axiosInstance } = require("./axios");

function sendMessage(messageObj,messageText){
    return axiosInstance.get('sendMessage', {
        chat_id : messageObj.chat_id,
        text: messageText
    })
}