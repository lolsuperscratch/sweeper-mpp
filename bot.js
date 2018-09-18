const Client = require('mpp-client-xt');
var gClient = new Client("ws://www.multiplayerpiano.com:443");
gClient.setChannel('lobby');
gClient.start();
var ex = 0;
var ey = 0;
var banned = [];
var issweeping = false;
setInterval(function (){ex = ex + 5;if (ex > 100){ex = -100; ey = Math.floor(Math.random() * 100)}gClient.moveMouse(ex,ey);gClient.setName('broom');},100);
setInterval(function (){if (!issweeping){gClient.say('Want to sweep with any channels? you can use b!sweep [channel name]')}},1000000)
gClient.on('a',function(msg){
   if (!banned.includes(msg.p._id)) {
   if (msg.a.split(' ')[0] == "b!sweep") {
     gClient.say('Sweeping to '+msg.a.split(' ').slice(1).join(' ')+' is now ready to go')
     issweeping = true;
     gClient.setChannel(msg.a.split(' ').slice(1).join(' '))
     setTimeout(function(){gClient.say('Well thats sweeped too much. Bye');gClient.setChannel('lobby');issweeping = false;},50000)
   }
   if (msg.a == "b!rules"){
      gClient.say("1. do not spam commands. but that is too annoying")
      gClient.say("2. after you join other channels, make sure use b!sweep [channel name you joined] in lobby")
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
   }
   if (msg.a.startsWith("b!") && banned.includes(msg.p._id)) {
      
      gClient.say('well, goodbye '+msg.p.name+'. you are banned from owner')
   }
   // help command when users not used the sweeper command
   if (msg.a.startsWith("/help")) { // help command
      
      gClient.say('if you wish to see my commands, type b!help instead')
   }
   if (msg.a.startsWith(".help")) { // omegabot help command
      
      gClient.say('if you wish to see my commands, type b!help instead')
   }
   if (msg.a.startsWith("*help")) { // JDPLD help command
      
      gClient.say('if you wish to see my commands, type b!help instead')
   }
})
