//init
const mineflayer = require('mineflayer')
const readline = require('readline');
const AutoAuth = require('mineflayer-auto-auth')

const {pathfinder, Movements, goals: {GoalNear, GoalBlock, GoalFollow}} = require('mineflayer-pathfinder');
//create bot
const bot = mineflayer.createBot({
 	host: 'mc.politmine.ru', //any server u want to play, this is just for example
	version: '1.16.4', 
	auth: 'offline',
	username: 'bot_username',
	plugins: [AutoAuth],
	AutoAuth: 
	{
        	logging: true,
        	password: 'bot_password',
        	ignoreRepeat: true,
   	}

});
bot.loadPlugin(pathfinder);
const mcData = require('minecraft-data')(bot.version);

//init console 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//commands
rl.on('line', (input) => {
  if (input === 'start') {
    startFishing();
  } else if (input === 'stop') {
    stopFishing();
	} else if(input === 'items') {
	console.log(bot.inventory.slots);
  } else if(input === 'quit') {
	  bot.quit();
  } else if(input === 'login') {
	 // if there are several server worlds and one lobby, you can use something similar to this command. it may differ on your server
	bot.chat('/joinqueue server_name'); 
  }  else if(input === 'come') {
	goToPlayer('your_nickname');
  } else {
    console.log(`Unkown command: ${input}`);
  }
});

let nowFishing = false

function onCollect (player, entity) {
  if (entity.kind === 'Drops' && player === bot.entity) {
    bot.removeListener('playerCollect', onCollect) 
	  setTimeout(() => {
	moveRandomly(bot, minX, minZ, maxX, maxZ); //coordinates of opposite corners of a rectangular area in which the bot will move in random directions
  }, Math.floor(Math.random() * 1000) + 1000);
	setTimeout(() => {
    turnRandomly();
  }, Math.floor(Math.random() * 1000) + 1000);
    startFishing()
}
}




async function startFishing () {
  console.log('Fishing')
   
  try {
    await bot.equip(bot.registry.itemsByName.fishing_rod.id, 'hand')
  } catch (err) {
    return console.log(err.message)
  }

  nowFishing = true
  bot.on('playerCollect', onCollect)

  try {
    await bot.fish()
  } catch (err) {
    console.log(err.message)
  }
 
   nowFishing = false
  
}


//stop fishing
function stopFishing () {
  bot.removeListener('playerCollect', onCollect)

  if (nowFishing) {
    bot.activateItem()
  }
}

async function turnRandomly () {
    const direction = Math.random() >= 0.1 ? 1 : -1; 
    bot.look(bot.entity.yaw + (direction), 0, false); 
}

async function goToPlayer(playerName) {
  const player = bot.players[playerName]
  if (!player) {
    console.log(`Player "${playerName}" is not online`)
    return
  }
  if (!player.entity) {
    console.log(`Player "${playerName}" entity is not loaded`)
    return
  }
  const { position } = player.entity;
  bot.pathfinder.setGoal(new GoalNear(position.x, position.y, position.z, 1));
}

async function moveRandomly(bot, minX, minZ, maxX, maxZ) {
  const dx = Math.floor(Math.random() * 3) - 1; 
  const dz = Math.floor(Math.random() * 3) - 1; 
  const x = bot.entity.position.x + dx;
  const z = bot.entity.position.z + dz;
  if (x >= minX && x <= maxX && z >= minZ && z <= maxZ) {
    const goal = new GoalBlock(x, bot.entity.position.y, z);
    bot.pathfinder.setGoal(goal, true);
  }
}




//error logging for simple debug
bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn))
bot.on('error', err => console.log(err))


