const Client = require('mpp-client-xt');
const Discord = require('discord.js');
var bot = new Discord.Client({disableEveryone: true})
var gClient = new Client("ws://multiplayerpiano.com:8080");
var defaultChannel = "broom bot"; // if the lobby is full, change the channel
gClient.setChannel(defaultChannel);
gClient.start();
var ex = 0;
var joinsenabled = false;
var emotes = ["☺️","🤔","🙂","😕","👻","🤗","😂"]
var verifiy = false; // if the user is verifing, stop users use the command also it can't use that
var mppid = ""; // user verifing mpp id
var code = "";
var verauthor = undefined;
var verchannel = undefined;
var vermember = undefined;
var helperenabled = true;
var guildhelper = "490335779403333634"; // replace the string to your user id, not others
var userchannels = [];
var guildinvites = [];
const hook = new Discord.WebhookClient(process.env.HOOKID, process.env.HOOKTOKEN);
var ey = 0;
var banned = ["fbc347c2a94b3e5517b5f816","79b8c6638cea827959ed7046"];
var issweeping = false;
var animationtype = 1;
var useruse = []; // only users who can use the command will be added
var disuse = [];
var autoban = 0
var botinvite = "https://discordapp.com/api/oauth2/authorize?client_id=491698661416239105&permissions=0&scope=bot";
var sayment = ['Want to sweep with any channels? you can use b!sweep [channel name]','Join me on my discord bot https://discordapp.com/api/oauth2/authorize?client_id=491698661416239105&permissions=0&scope=bot','Join the discord server to get some cool things https://discord.gg/Am53zEg','Host for free on https://github.com/lolsuperscratch/sweeper-mpp, dont forget to fork it and use it on heroku']
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
       autoban = autoban + 1
     if (autoban > 4) {
        autoban = 0;
        gClient.say('Autobanned.');
        banned.push(msg.p._id)
        return;
     }
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
   if (msg.a.split(' ')[0] == "b!ban" && msg.p._id == "bd5d18bfa699a08ab12d97f1") {
     
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
   if (msg.a.split(' ')[0] == "b!default" && msg.p._id == "bd5d18bfa699a08ab12d97f1") {
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
      message.channel.send("5. Do not abuse or cheat b!cancel when user is verifing! :joy:")
   }
   if (message.content == "b!help"){
      message.channel.send("general commands: b!sweep [channel name], b!rules")
      message.channel.send("mpp commands: b!useruses, b!verifiy [your multiplayer piano id], b!view - you can see who broom is going around in the channels.")
      message.channel.send("bridge commands: b!responsecmd [command for bots], b!reconnect - if not working or just reconnect mpp")
      message.channel.send("user commands: b!userchannel [name] - if you use spacebar, it will add dash on it, b!deletechannel - delete your targeted user channel")
   }
   if (message.content == "b!useruses") {
      message.channel.send("User Uses: ```"+useruse.join(', ')+"``` (multiplayer piano)");
   }
   if (message.content.split(' ')[0] == "b!userchannel") {
      if (message.guild.id !== "491745908539654154") return message.author.send('You must join our guild in order to make user channels! https://discord.gg/Am53zEg')
      var createdchannel = message.guild.createChannel(message.content.split(' ').slice(1).join('-').toLowerCase(),'text',[{id:"493120256542375936"}],'broom user channel')
      userchannels.push(`${createdchannel.name}^${message.author.username}`)
      
      
   }
   if (message.content.split(' ')[0] == "b!deletechannel") {
      if (message.guild.id !== "491745908539654154") return message.author.send('You must join our guild in order to delete user channels! https://discord.gg/Am53zEg')
      var found = false;
      for (var c = 0;c < userchannels.length;c++) {
          if (userchannels[c].split('^')[0] == message.channel.name && userchannels[c].split('^')[1] == message.author.username) {
              found = true;
          }
      }
      if (!found) return message.react('🚫');
      message.channel.delete()
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
   if (message.content.split(' ')[0] == "b!verifiy" && !verifiy && message.content.split(' ')[1]) {
       message.delete()
       verauthor = message.author
       verchannel = message.channel
       vermember = message.member
       code = Math.floor(Math.random()*900000000)
       verifiy = true
       mppid = message.content.split(' ')[1]
       verauthor.send(`${emotes[Math.floor(Math.random()*emotes.length)]} *1. Go to ${defaultChannel} in multiplayer piano*`)
       verauthor.send(emotes[Math.floor(Math.random()*emotes.length)]+' *2. Copy this command:* ``b!discordverifiy``')
       verauthor.send(`${emotes[Math.floor(Math.random()*emotes.length)]} *3. And paste it to the broom* (if there is problem with verifing, you can send b!cancel)`)
   }
   if (message.content.split(' ')[0] == "b!verifiy" && !verifiy && !message.content.split(' ')[1]) {
       message.delete()
       var createdmessage = message.channel.send('please inculde your multiplayer piano id (_id)')
       
   }
   if (message.content.split(' ')[0] == "b!cancel" && verifiy) {
      message.delete()
       const embed = new Discord.RichEmbed()
         embed.setTitle('Uh oh!')
         embed.setColor('RANDOM')
         embed.setDescription("we're cancelling for you");
         embed.setAuthor(message.author.username,message.author.avatarURL);
         message.channel.send(embed)
         mppid = "";
         
         code = "";
          verauthor = undefined;
        verchannel = undefined
        verifiy = false;
        vermember = undefined;
   }
   if (message.content.split(' ')[0] == "b!view") {
      const puppeteer = require('puppeteer');

puppeteer.launch({ args: ['--no-sandbox'] }).then(async browser => {
  const page = await browser.newPage();
  await page.goto('http://www.multiplayerpiano.com/'+encodeURIComponent(gClient.channel._id));
  await page.click('#sound-warning > .submit') // stop appearing sound warning modal
  // other actions...
  await page.screenshot({path:"broom-viewer.png"}).then(async a => {
     var attachment = new Discord.Attachment('broom-viewer.png')
     message.channel.send(attachment)
     await browser.close();
  })
   
  
}).catch(error => {
  message.channel.send('the error got caught! :warning: ```'+error.message.substring(0,899)+'```')
});
   }
   })

gClient.on('a',function (msg) {
   if (msg.p._id !== gClient.getOwnParticipant()._id) {
    hook.send(`**${msg.p.name}**: ${msg.a}`,{username:gClient.channel._id,disableEveryone:true});
   }
})
// discord verifiy system to mpp
gClient.on('a',function  (msg) {
     if (msg.a.split(' ')[0] == "b!discordverifiy") {
         if (mppid !== msg.p._id) return gClient.say('You are not in the verifing user! to verifiy, use b!verifiy '+msg.p._id+' on discord')
         // code is removed and will not work anymore
         mppid = "";
         verifiy = false;
         code = "";
         const embed = new Discord.RichEmbed()
         embed.setTitle('Thank you for verifing broom!')
         embed.setColor('RANDOM')
         embed.setDescription('hope you enjoy!');
         embed.setAuthor(verauthor.username,verauthor.avatarURL);
         verchannel.send(embed)
         vermember.addRole('494944904280277013')
         gClient.say('Thank you for verifing!')
        verauthor = undefined;
        verchannel = undefined
        vermember = undefined;
        
      
      
       
      
      
    
   
     }
})
gClient.on('participant added',function (part) {
   if (!joinsenabled) return;
   if (part._id !== gClient.getOwnParticipant()._id) {
    hook.send(`${emotes[Math.floor(Math.random()*emotes.length)]} *${part.name} joined*`,{username:gClient.channel._id});
   }
})
gClient.on('participant removed',function (part) {
   if (!joinsenabled) return;
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
setInterval(function (){
   autoban = 0;
},30000)
bot.login(process.env.TOKEN)



