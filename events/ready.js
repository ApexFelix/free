module.exports = (client) => {

//  WATCHING : !ping izliyor
//  LISTENING : !ping dinliyor
//  PLAYING  : !ping oynuyor 
//  STREAMING : !ping yayında

    client.user.setActivity('YouTube: RevengeNYKS',{ type: "WATCHING"} )
    console.log(client.user.username + " : " + client.user.presence.game)
}
