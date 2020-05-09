const axios = require('axios');
const config = require('../config/index');
/*
图灵机器人
*/
async function tlReplay(msg, uid) {
    let url = `http://openapi.tuling123.com/openapi/api/v2`
    try {
        let params = {}
        params.reqType = 0
        params.perception = {}
        params.perception.inputText = {}
        params.perception.inputText.text = msg
        params.userInfo = {}
        params.userInfo.apiKey = config.tulingkey
        params.userInfo.userId = Buffer.from(uid).toString('base64').replace(/=/g, '')

        const response = await axios.post(url, params);
        console.log(response);
        if (response.status == 200) {
            let result = response.data.results[0].values.text;
            return result
        }
        else {
            return `不理解你的输入，请重新输入`
        }
    } catch (error) {
        return `机器人故障，请重新输入`
    }
}

module.exports = {
    tlReplay
}