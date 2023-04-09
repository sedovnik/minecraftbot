# Minecraftbot short info
Bot for server, created via mineflayer and some addition plugins

History of project: <br>
12.03.23 - First iteration of my bot <br>
09.04.23 - Ver 0.2<br>
New goals:<br>
<strong>1-</strong> Add the ability for the bot to independently put things in the specified/nearest chest;<br>
<strong>2-</strong> Bugfix.

<h1 align="center">Minecraft autofish bot</h1> 

This is a Node.js script that uses the mineflayer library to create a bot that can play Minecraft autonomously. The script includes several functions that enable the bot to fish, move randomly, follow a player, and more.

The script also includes a console interface that allows the user to send commands to the bot. The available commands are:

<strong>--start:</strong> starts the fishing process <br>
<strong>--stop:</strong> stops the fishing process <br>
<strong>--items:</strong> displays the bot's inventory <br>
<strong>--quit:</strong> disconnects the bot from the server <br>
<strong>--login:</strong> joins a server queue  <br>
<strong>--come:</strong> tells the bot to navigate to and follow the player  <br>

The script is designed to work with a Minecraft server hosted at mc.politmine.ru and uses version 1.16.4 of the game. To run the script, simply install the required packages and run the script with Node.js:
```
npm install mineflayer && mineflayer-auto-auth && mineflayer-pathfinder --save
node bot.js
```
The script also includes event listeners for when the bot is kicked or experiences an error, which will log the error message to the console.

Overall, this script provides a basic framework for creating a Minecraft bot with some simple functionality. Feel free to modify and build upon it as needed!
