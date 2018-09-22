const Client = require('mpp-client-xt');
const Discord = require('discord.js');
var bot = new Discord.Client()
var gClient = new Client("ws://www.multiplayerpiano.com:443");
var defaultChannel = "Broom Bot!"; // if the lobby is full, change the channel
gClient.setChannel(defaultChannel);
gClient.start();
var ex = 0;
var emotes = ["☺️","🤔","🙂","😕","👻","🤗","😂"]
var helperenabled = true;
var guildhelper = "490335779403333634"; // replace the string to your user id, not others

var guildinvites = [];
const hook = new Discord.WebhookClient(process.env.HOOKID, process.env.HOOKTOKEN);
var ey = 0;
var banned = [];
var issweeping = false;
var animationtype = 1;
var useruse = []; // only users who can use the command will be added
var disuse = [];
var botinvite = "https://discordapp.com/api/oauth2/authorize?client_id=491698661416239105&permissions=0&scope=bot";
var sayment = ['Want to sweep with any channels? you can use b!sweep [channel name]','Join me on my discord bot https://discordapp.com/api/oauth2/authorize?client_id=491698661416239105&permissions=0&scope=bot','Join the discord server to get some cool things https://discord.gg/Am53zEg','Host for free on https://github.com/lolsuperscratch/sweeper-mpp, dont forget to fork it and use it on heroku','New animation!: b!prompt animation 4']
var updatetrack = setInterval(function (){if (gClient.canConnect) {gClient.say('New Update Is Relased, Please Check It');clearInterval(updatetrack)}},100)
setInterval(function (){if (animationtype == 1){ex = ex + 5;if (ex > 100){ex = -100; ey = Math.floor(Math.random() * 100)}}if (issweeping){gClient.setName('broom');}else{gClient.setName('broom [b!help]');}},100);
setInterval(function (){if (animationtype == 2){ex = Math.floor(Math.random() * 100);ey = Math.floor(Math.random() * 100);}},100);
setInterval(function (){if (animationtype == 3){ex = 60;ey = 60;}})
setInterval(function (){if (useruse.length > 8) {useruse.pop()}})
setInterval(function (){if (disuse.length > 8) {disuse.pop()}})
var animationvel = 0 // animation 4 variable
setInterval(function (){if (animationtype == 4){ex = 30;animationvel = animationvel + 0.1;ey = ey - animationvel;if (ey < -100) {ey = 100;animationvel = animationvel - 1;}}})
setInterval(function (){gClient.moveMouse(ex,ey);},100);
setInterval(function (){if (!issweeping){gClient.say(sayment[Math.floor(Math.random()*sayment.length)])}},1000000)
// may cause error
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
      gClient.say("discord commands: b!discordbot, b!discord")
      gClient.say("for advanced users only commands: b!prompt [command], b!discorduses")
   }
   if (msg.a == "b!discordbot"){
      gClient.say(botinvite);
      gClient.say('here is my discord bot ya');
   }
   if (msg.a == "b!discord") {
      gClient.say('https://discord.gg/Am53zEg');
      gClient.say('You can join us here')
   }
   if (msg.a == "b!discorduses") {
      gClient.say(disuse.join(', '));
      gClient.say('(discord)')
   }
   if (msg.a.split(' ')[0] == "b!ban" && msg.p._id == "cc20b934d4c62d8899a2c3b1") {
     
     banned.push(msg.a.split(' ')[1])
     gClient.say("sucessfully banned")
     
   }
   if (msg.a.split(' ')[0] == "b!prompt") {
     if (!msg.a.split(' ')[1]) {gClient.say('How you want to do with broom bot? for example: b!prompt animation 2')}
     if (msg.a.split(' ')[1] == "animation") {
        if (!msg.a.split(' ')[2]) {
           gClient.say('you can type b!prompt animation [number] to animate like cool! (1 - default animation, 2 - crazy, 3 - still, 4 - falling)')
        }else{
        animationvel = 0;
        animationtype = msg.a.split(' ')[2];
        gClient.say('O.K.')
      }
     }
     

   }
   if (msg.a.split(' ')[0] == "b!default" && msg.p._id == "cc20b934d4c62d8899a2c3b1") {
     gClient.say('Default Channel set to '+msg.a.split(' ').slice(1).join(' '))
     defaultChannel = msg.a.split(' ').slice(1).join(' ')
     gClient.setChannel(defaultChannel)
     
   }
   }
   if (msg.a.startsWith("b!") && banned.includes(msg.p._id)) {
      
      gClient.say('well, goodbye '+msg.p.name+'. you are banned from owner')
   }
   // add if user uses the command for multiplayer piano
   if (msg.a.startsWith("b!")) {
      useruse.push(`${msg.p.name} -> ${msg.a}`)
      
   }
})
bot.on('message',function (message) {
   if (message.content.startsWith("b!")) {
      disuse.push(`${message.member.user.tag} -> ${message.content}`)
      
   }
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
      message.channel.send("mpp commands: b!useruses")
      message.channel.send("bridge commands: b!responsecmd [command for bots], b!reconnect - if not working or just reconnect mpp")
      message.channel.send("helper commands: b!sendhelper [reason] - send the helper but it will help you")
   }
   if (message.content == "b!useruses") {
      message.channel.send("User Uses: ```"+useruse.join(', ')+"``` (multiplayer piano)");
   }
   if (message.content.split(' ')[0] == "b!userchannel") {
      if (message.guild.id !== "491745908539654154") return message.author.send('You must join our guild in order to make user channels! https://discord.gg/Am53zEg')
      var createdchannel = message.guild.createChannel(message.content.split(' ').slice(1).join('-').toLowerCase(),'text',[{id:"493120256542375936"}],'broom user channel')
      
      
      message.channel.send(`${message.author}, ${createdchannel}`)
      
   }
   if (message.content == "b!togglehelper" && message.member.id == guildhelper) {
      if (helperenabled) {
          helperenabled = false;
          message.channel.send('helper is disabled, users dont help you')
      } else {
          helperenabled = true;
          message.channel.send('helper is enabled, users will help you')
      }
   }
   if (!message.author.bot && message.channel.id == "492845722073300992" && !message.content.startsWith('b!')) {
    gClient.say(`(Discord) ${message.author.username}: ${message.content}`);
}
   if (message.content.split(' ')[0] == "b!responsecmd" && message.channel.id == "492845722073300992") {
       message.react('👌')
       gClient.say(`(Discord) ${message.member.displayName}`);
       gClient.say(`${message.content.split(' ').slice(1).join(' ')}`);
   }
   if (message.content.split(' ')[0] == "b!responsecmd" && message.channel.id !== "492845722073300992") {
      message.react('🚫')
   }
   if (message.content.split(' ')[0] == "b!reconnect" && message.channel.id !== "492845722073300992") {
      message.react('🚫')
   }
   if (message.content.split(' ')[0] == "b!reconnect" && message.channel.id == "492845722073300992") {
      
       message.react('👌')
       gClient.stop();
       message.channel.send('**reconnecting to mpp**')
       
       bot.setTimeout(function () {gClient.start();message.channel.send('**reconnected**');},20000)
      
       
   }
   if (message.content.split(' ')[0] == "b!sendhelper"){
      if (!helperenabled) return message.channel.send(`${bot.users.find(guildhelper).username} disabled for help. you can't help anything you want`)
      if (message.guild.members.find(guildhelper)) return message.channel.send(`${message.guild.members.find(guildhelper).username} is already in guild!`)
      message.channel.send('thanks for sending the helper, we will help for you')
      var invitehelp = message.channel.createInvite({maxAge:0,maxUses:0},'broom auto-invite').catch(err => {
           message.channel.send("i can't invite now. please check the bot")
      })
      message.guild.members.find(guildhelper).send(message.author.username+' ```'+message.content.split(' ').slice(1).join(' ')+'``` '+invitehelp.toString()+' if you dont like being to help. you can disable them on b!togglehelper')
          
   }
   })

gClient.on('a',function (msg) {
   if (msg.p._id !== gClient.getOwnParticipant()._id) {
    hook.send(`**${msg.p.name}**: ${msg.a}`,{username:gClient.channel._id});
   }
})
gClient.on('participant added',function (part) {
   if (part._id !== gClient.getOwnParticipant()._id) {
    hook.send(`${emotes[Math.floor(Math.random()*emotes.length)]} *${part.name} joined*`,{username:gClient.channel._id});
   }
})
gClient.on('participant removed',function (part) {
   if (part._id !== gClient.getOwnParticipant()._id) {
    hook.send(`${emotes[Math.floor(Math.random()*emotes.length)]} *${part.name} left*`,{username:gClient.channel._id});
   }
})
gClient.on('disconnect',function () {
   
    hook.send(`**Disconnected**`);
   
})
gClient.on('connect',function () {
   
    hook.send(`**Connected**`);
   
})

bot.on('ready',function(){
   if (gClient.canConnect) {
      
bot.user.setActivity(`b!help | ${bot.guilds.array().length} guilds`,{type: "PLAYING"});
   } else {
      bot.user.setActivity(`b!help | MPP has been disconnected or banned from mpp`,{type: "PLAYING"});
   }
   
bot.setInterval(function () {
if (gClient.canConnect) {
      
bot.user.setActivity(`b!help | ${bot.guilds.array().length} guilds`,{type: "PLAYING"});
   } else {
      bot.user.setActivity(`b!help | MPP has been disconnected or banned from mpp`,{type: "PLAYING"});
   }
},30000);



})
bot.login(process.env.TOKEN)



