# Minecraftbot short info
A bot for minecraft servers created with mindflayer and some additional plugins

History of project: <br>
12.03.23 - Ver. 0.1 <br>
09.04.23 - Ver. 0.2 <br>
New goals:<br>
<strong>1-</strong> Add the ability for the bot to independently put things in the specified/nearest chest;<br>
<strong>2-</strong> Add chat reading functionality. Some servers use different prefixes to nicknames, <br>
which requires adding the message function from mineflayer; <br>
<strong>3-</strong> Bugfix.

<h1 align="center">Minecraft autofish bot</h1> 

This is a Node.js script that uses the mineflayer library to create a bot that can play Minecraft autonomously. The script includes several functions that enable the bot to fish, move randomly, follow a player, and more.

The script also includes a console interface that allows the user to send commands to the bot. The available commands are:

<strong>--start:</strong> Starts the fishing process <br>
<strong>--stop:</strong> Stops the fishing process <br>
<strong>--items:</strong> Displays the bot's inventory <br>
<strong>--quit:</strong> Disconnects the bot from the server <br>
<strong>--login:</strong> Joins a server queue  <br>
<strong>--come:</strong> Tells the bot to navigate to and follow the player  <br>

The script is designed to work with a Minecraft server hosted at mc.politmine.ru and uses version 1.16.4 of the game. To run the script, simply install the required packages and run the script with Node.js:
```
npm install mineflayer && mineflayer-auto-auth && mineflayer-pathfinder --save
node bot.js
```
The script also includes event listeners for when the bot is kicked or experiences an error, which will log the error message to the console.

Overall, this script provides a basic framework for creating a Minecraft bot with some simple functionality. Feel free to modify and build upon it as needed!
