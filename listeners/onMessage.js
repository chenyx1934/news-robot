const config = require('../config/index')
const exRate = require('../service/exchangeRate')
const tlAI = require('../service/talkRobot')


async function onMessage(msg) {
    console.log(`msg : ${msg}`)
    const contact = msg.from()
    const text = msg.text()
    const room = msg.room()
    const msgDate = msg.date()
    console.debug("发送人: " + contact + " 内容: " + text + " 日期: " + msgDate)
    if (!contact) {
        return
    }
    if (msg.self()) {
        let res = await tlAI.tlReplay(text, contact.id)
        contact.say(res)
        return // skip self
    }
    if (room) {
        const topic = await room.topic()
        console.info(`Room: ${topic} Contact: ${contact.name()} Text: ${text}`)

        if (config.groups.indexOf(topic) != -1) {
            if (text.startsWith('#')) {//汇率查询
                let res = await exRate.getSingleRate(text)
                await room.say(res)
            }
            else {//AI对话
                let res = await tlAI.tlReplay(text, contact.id)
                room.say(res)
            }

        } else {
        }
    } else {

    }
}
module.exports = onMessage 