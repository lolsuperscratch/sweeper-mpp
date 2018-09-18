const Client = require('mpp-client-xt');
var gClient = new Client("ws://www.multiplayerpiano.com:443");
gClient.setChannel('lobby');
gClient.start();
var ex = 0;
var ey = 0;
var issweeping = false;
setInterval(function (){ex = ex + 5;if (ex > 100){ex = -100; ey = Math.floor(Math.random() * 100)}gClient.moveMouse(ex,ey);gClient.setName('broom');},100);
setInterval(function (){if (!issweeping){gClient.say('Want to sweep with any channels? you can use b!sweep [channel name]')}},3000000)
gClient.on('a',function(msg){
   if (msg.a.split(' ')[0] == "b!sweep") {
     gClient.say('Sweeping to '+msg.a.split(' ').slice(1).join(' ')+' is now ready to go')
     issweeping = true;
     gClient.setChannel(msg.a.split(' ').slice(1).join(' '))
     setTimeout(function(){gClient.say('Well thats sweeped too much. Bye');gClient.setChannel('lobby');issweeping = false;},50000)
   }
})
