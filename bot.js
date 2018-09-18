const Client = require('mpp-client-xt');
const Discord = require('discord.js');
var bot = new Discord.Client()
var gClient = new Client("ws://www.multiplayerpiano.com:443");
var defaultChannel = "Sweep Center";
gClient.setChannel(defaultChannel);
gClient.start();
var ex = 0;
var ey = 0;
var banned = [];
var issweeping = false;
var sayment = ['Want to sweep with any channels? you can use b!sweep [channel name]','Join me on my discord bot https://discordapp.com/api/oauth2/authorize?client_id=491698661416239105&permissions=0&scope=bot']
setInterval(function (){},100)
setInterval(function (){ex = ex + 5;if (ex > 100){ex = -100; ey = Math.floor(Math.random() * 100)}gClient.moveMouse(ex,ey);if (issweeping){gClient.setName('broom');}else{gClient.setName('broom [b!help]');}},100);
setInterval(function (){if (!issweeping){gClient.say(sayment[Math.floor(Math.random()*sayment.length)])}},1000000)
gClient.on('a',function(msg){
   if (!banned.includes(msg.p._id)) {
   if (msg.a.split(' ')[0] == "b!sweep") {
     gClient.say('Sweeping to '+msg.a.split(' ').slice(1).join(' ')+' is now ready to go')
     issweeping = true;
     gClient.setChannel(msg.a.split(' ').slice(1).join(' '))
     setTimeout(function(){gClient.say('Well thats sweeped too much. Bye');gClient.setChannel(defaultChannel);issweeping = false;},50000)
   }
   if (msg.a == "b!rules"){
      gClient.say("1. do not spam commands. but that is too annoying")
      gClient.say("2. after you join other channels, make sure use b!sweep [channel name you joined] in "+defaultChannel)
      setTimeout(function () {gClient.say("3. stop doing b!sweep lobby, but it is inappropriate")},10000)
      setTimeout(function () {gClient.say("4. dont ban broom after using the command, if you do it, but it is inappropriate")},20000)
   }
   if (msg.a == "b!help"){
      gClient.say("general commands: b!sweep [channel name], b!rules")
   }
   if (msg.a.split(' ')[0] == "b!ban" && msg.p.name == "<anonymouser>") {
     
     banned.push(msg.a.split(' ')[1])
     gClient.say("sucessfully banned")
     
   }
    
   if (msg.a.split(' ')[0] == "b!default" && msg.p.name == "<anonymouser>") {
     gClient.say('Default Channel set to '+msg.a.split(' ').slice(1).join(' '))
     defaultChannel = msg.a.split(' ').slice(1).join(' ')
     gClient.setChannel(defaultChannel)
     
   }
   }
   if (msg.a.startsWith("b!") && banned.includes(msg.p._id)) {
      
      gClient.say('well, goodbye '+msg.p.name+'. you are banned from owner')
   }
   
})
bot.on('message',function (message) {
if (message.content.split(' ')[0] == "b!sweep") {
     message.channel.send('Sweeping to '+message.content.split(' ').slice(1).join(' ')+' is now ready to go')
     issweeping = true;
     gClient.setChannel(message.content.split(' ').slice(1).join(' '))
     setTimeout(function(){gClient.say('Well thats sweeped too much. Bye');gClient.setChannel(defaultChannel);issweeping = false;},50000)
   }
   if (message.content == "b!rules"){
      message.channel.send("1. do not spam commands. but that is too annoying")
      message.channel.send("2. after you join other channels, make sure use b!sweep [channel name you joined] in "+defaultChannel)
      message.channel.send("3. stop doing b!sweep lobby, but it is inappropriate")
      message.channel.send("4. dont ban broom after using the command, if you do it, but it is inappropriate")
   }
   if (message.content == "b!help"){
      message.channel.send("general commands: b!sweep [channel name], b!rules")
   }
   if (message.content.split(' ')[0] == "b!ban" && message.author.username == "=bighapp=") {
     
     banned.push(msg.a.split(' ')[1])
     message.channel.send("sucessfully banned in multiplayer piano")
     
   }
    
   if (message.content.split(' ')[0] == "b!default" && message.author.username == "=bighapp=") {
     message.channel.send('Default Channel set to '+msg.a.split(' ').slice(1).join(' '))
     defaultChannel = msg.a.split(' ').slice(1).join(' ')
     gClient.setChannel(defaultChannel)
     
   }
   })

bot.on('ready',function(){
bot.user.setActivity("b!help", {
  type: "PLAYING"
});
})
bot.login(process.env.TOKEN)



