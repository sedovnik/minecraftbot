const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const GoalFollow = goals.GoalFollow
const GoalBlock = goals.GoalBlock
const AutoAuth = require('mineflayer-auto-auth')
const inventoryViewer = require('mineflayer-web-inventory')

const bot = mineflayer.createBot({

 	host: 'mc.politmine.ru',
	version: '1.18.2', 
	auth: 'offline',
	//host: '192.168.0.103',
	//port: 62820, 
	username: 'ironzone20',
	plugins: [AutoAuth],
	AutoAuth: {
        logging: true,
        password: '1029384756A',
        ignoreRepeat: true,
    }

})

bot.loadPlugin(pathfinder);


const mineflayerViewer = require('prismarine-viewer').mineflayer
inventoryViewer(bot)

bot.once('spawn', function () {
    mineflayerViewer(bot, { firstPerson: false, port: 3007 })
    bot.chat('/joinqueue august')

  

	setInterval(() => {
		const sword = bot.inventory.items().find(item => item.name.includes('sword'))
        	if (sword) bot.equip(sword, 'hand')
		const mobFilter = e => e.type === 'mob' && e.mobType === 'Pig' | e.mobType === 'Cow' | e.mobType === 'Sheep'
                const mob = bot.nearestEntity(mobFilter)

		if (!mob) {
			return
		}

		const mcData = require('minecraft-data')(bot.version)
		const movements = new Movements(bot, mcData)
		movements.scafoldingBlocks = []

		bot.pathfinder.setMovements(movements)

		const goal = new GoalFollow(mob, 1)
		bot.pathfinder.setGoal(goal, true)
		
		const pos = mob.position;
		bot.lookAt(pos) 
		bot.attack(mob);
      

    }, 500);
})

bot.on('chat', function (username, message) {
    if(message === "[main_dismoral -> Я] 1"){
        bot.chat('(')
    }
})

bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn))
bot.on('error', err => console.log(err))








