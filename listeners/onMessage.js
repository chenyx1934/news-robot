const config = require('../config/index')
const exRate = require('../service/exchangeRate')
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
        let res = await exRate.getSingleRate(text)
        contact.say('别闹~')
        contact.say(res)
        return // skip self
    }
    if (room) {
        const topic = await room.topic()
        if (await msg.mentionSelf() && config.groups.indexOf(topic) != -1) {
            console.info('this message were mentioned me! [You were mentioned] tip ([有人@我]的提示)')
            console.info(`Room: ${topic} Contact: ${contact.name()} Text: ${text}`)
            let res = await exRate.getSingleRate(text)
            await room.say(res)
        } else {
            if (config.groups.indexOf(topic) != -1) {
                let res = await exRate.getSingleRate(text)
                room.say(res)
            }
            // console.info(`Room: ${topic} Contact: ${contact.name()} Text: ${text}`)
            //  room.say('别闹~')
        }
    } else {

    }
}
module.exports = onMessage 