const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const ayarlar = require('./ayarlar.json')
require("./util/eventLoader")(client)
// 7-24 Aktiflik İçin
const express = require('express')
const app = express()
const http = require('http')
app.get("/", (request, response) => {
console.log(client.user.username+' [--] "RevengeNYKS#0001 🌙 [--] Adlı Kullanıcı Tarafından Hostlandı Yani 7/24 Aktif Edildi. ( Teşekküre Gerek Yok 😊 ) ')
response.sendStatus(200)
})
app.listen(process.env.PORT)
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`)
}, 280000)
const Log = message => {
console.log(`[ »» ] ${message}`)
}

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err)
  Log(`${files.length} Komut Yüklenecek.`)
  files.forEach(f => {
    let props = require(`./komutlar/${f}`)
    Log(`Yüklenen Komut: ${props.help.name}.`)
    client.commands.set(props.help.name, props)
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name)
    })
  })
})

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)]
      let cmd = require(`./komutlar/${command}`)
      client.commands.delete(command)
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias)
      })
      client.commands.set(command, cmd)
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name)
      })
      resolve();
    } catch (e) {
      reject(e);
    }
  })
}

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`)
      client.commands.set(command, cmd)
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      })
      resolve();
    } catch (e) {
      reject(e);
    }
  })
}

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)]
      let cmd = require(`./komutlar/${command}`)
      client.commands.delete(command)
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      })
      resolve();
    } catch (e) {
      reject(e);
    }
  })
}
//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ // Komutlar Burdan Aşşa \\ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ \\

//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ // Komutlar Bitti \\ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ \\
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};
client.login(ayarlar.token)
