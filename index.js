const { Wechaty } = require('wechaty');
const onScan = require('./listeners/onScan')
const onLogin = require('./listeners/onLogin')
const onMessage = require('./listeners/onMessage')
const onRoomInvite = require('./listeners/onRoomInvite')
// const onLogout = require('./listeners/on-logout')
// const onFriend = require('./listeners/on-friend')


const { PuppetPadplus } = require('wechaty-puppet-padplus')
const token = 'puppet_padplus_654b9f2eb1fc5cf7'
const puppet = new PuppetPadplus({
    token,
})
const bot = new Wechaty({ name: 'WechatNews', puppet });


bot.on('scan', onScan);
bot.on('login', onLogin);
bot.on('message', onMessage);
bot.on('room-invite', onRoomInvite);
// bot.on('logout', onLogout);
// bot.on('friendship', onFriend);
// bot.on('room-join', onRoomInvite);


bot
    .start()
    .then(() => {
        console.log('开始登陆微信');
    })
    .catch(async function (e) {
        console.log(`初始化失败: ${e}.`)
        await bot.stop()
        process.exit(1)
    });