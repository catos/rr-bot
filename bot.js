var Discord = require('discord.io')
var logger = require('winston')
var giphy = require('giphy-api')('T51yW98iBdaWTgxINrFE585fp0SPLMZJ');

var auth = require('./auth.json')
var data = require('./data')

// Configure logger settings
logger.remove(logger.transports.Console)
logger.add(logger.transports.Console, { colorize: true })
logger.level = 'debug'

// Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
})

bot.on('ready', function () {
    logger.info('Connected')
    logger.info('Logged in as %s - %s\n', bot.username, bot.id)
})

bot.on('message', function (user, userID, channelID, message, event) {
    if (user === 'rr-bot')
        return

    let result = data.find(i => i.words.some(w => message.indexOf(w) !== -1))
    if (result) {
        bot.sendMessage({
            to: channelID,
            message: result.response
        })
    }

    if (message.startsWith('!')) {
        var query = message.replace('!', '')
        giphy.search(query, function (err, res) {
            if (res.data.length > 0) {
                const randomIndex = Math.floor(Math.random() * (res.data.length - 1)) + 1
                const gifUrl = res.data[randomIndex].url
                bot.sendMessage({
                    to: channelID,
                    message: gifUrl
                })
            }
        })
    }

})