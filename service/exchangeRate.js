const axios = require('axios');
const config = require('../config/index');
/*
单货币置换
*/
async function getSingleRate(currency) {
    let url = `https://api.jisuapi.com/exchange/single?currency=${currency}&appkey=${config.jskey}`
    try {
        const response = await axios.post(url);
        if (response.status == 200 && response.data.status == 0) {
            let result = `${response.data.result.name}(${response.data.result.currency})`;
            result += `\n-------------\n`
            for (let key in response.data.result.list) {
                result += `${response.data.result.list[key].name}(${key}):${response.data.result.list[key].rate}\n`
            }
            return result
        }
        else {
            return `不理解你的输入，请重新输入`
        }
        console.log(response);
    } catch (error) {
        return `机器人故障，请重新输入`
    }
}

module.exports = {
    getSingleRate
}