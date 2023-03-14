const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const GoalFollow = goals.GoalFollow
const GoalBlock = goals.GoalBlock
const AutoAuth = require('mineflayer-auto-auth')
const inventoryViewer = require('mineflayer-web-inventory')

const bot = mineflayer.createBot({ //create and login bot

 	host: 'mc.politmine.ru',
	version: '1.18.2', 
	auth: 'offline',
	username: 'Your username',
	plugins: [AutoAuth],
	AutoAuth: 
	{
        	logging: true,
        	password: 'Your password',
        	ignoreRepeat: true,
   	}

})

bot.loadPlugin(pathfinder); //to find a way to mobs 
const mineflayerViewer = require('prismarine-viewer').mineflayer //to watch loaded data
inventoryViewer(bot) //to check bot's inventory

bot.once('spawn', function (){
	mineflayerViewer(bot, { firstPerson: false, port: 3007 }) 
	bot.chat('/joinqueue august')

	setInterval(() => {
		const sword = bot.inventory.items().find(item => item.name.includes('sword'))
        	if (sword) bot.equip(sword, 'hand') //check and equip sword
		const mobFilter = e => e.type === 'mob' && e.mobType === 'Pig' | e.mobType === 'Cow' | e.mobType === 'Sheep' //filter to search only thease nobs
                const mob = bot.nearestEntity(mobFilter) //focus on the nearest mob

		if (!mob) {return}

		const mcData = require('minecraft-data')(bot.version)
		const movements = new Movements(bot, mcData)
		movements.scafoldingBlocks = []
		bot.pathfinder.setMovements(movements)

		const goal = new GoalFollow(mob, 1)
		bot.pathfinder.setGoal(goal, true) //go to the nearest
		
		const pos = mob.position;
		bot.lookAt(pos) //look at mob
		bot.attack(mob); //attack mob
		
		}, 500); //delay 
})

//error logging for simple debug
bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn))
bot.on('error', err => console.log(err))








