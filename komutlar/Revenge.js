const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')

exports.run = async (client,message) => {
message.channel.send(client.ping)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Ping'],
  permLevel: 0
}

exports.help = {
  name: 'Ping',
  description: 'Ping Atar',
  usage: 'ping'
}
