const axios = require('axios')


const base_url = `https://api.telegram.org/bot${BOT_TOKEN}`;

function getAxiosInstance(){
    return {
        get(method,params) {
            return axios.get(`/${method}`,{
                baseURL : base_url,
                params
            });
        },
        post(method,data){
            return axios({
                method:'post',
                baseURL : base_url,
                url : `/${method}`,
                data
            })
        }
    }
}

module.exports = {axiosInstance : getAxiosInstance()};