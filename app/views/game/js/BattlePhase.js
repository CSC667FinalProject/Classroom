var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, update: update, create: create });

var game_package;

//player data
var player_data = [
	{	
	//player 1
		user_name: "a",
		is_attacker: false,
		is_alive: true,
		player_positionX: 100,
		player_positionY: 100,
		actionX_1: 400,
		actionY_1: 100,
		actionX_2: 0,
		actionY_2: 100,
		actionX_3: 200,
		actionY_3: 0,
		is_current_user: false
	},

	{
	//player 2
		user_name: "b",
		is_attacker: false,
		is_alive: true,
		player_positionX: 700,
		player_positionY: 0,
		actionX_1: 0,
		actionY_1: 400,
		actionX_2: 500,
		actionY_2: 0,
		actionX_3: 400,
		actionY_3: 500,
		is_current_user: false
	},

	{
	//player 3
		user_name: "c",
		is_attacker: false,
		is_alive: true,
		player_positionX: 0,
		player_positionY: 600,
		actionX_1: 200,
		actionY_1: 0,
		actionX_2: 0,
		actionY_2: 400,
		actionX_3: 700,
		actionY_3: 500,
		is_current_user: false
	},

	{
	//player 4
		user_name: "d",
		is_attacker: true,
		is_alive: true,
		player_positionX: 750,
		player_positionY: 550,
		actionX_1: 500,
		actionY_1: 0,
		actionX_2: 100,
		actionY_2: 300,
		actionX_3: 800,
		actionY_3: 600,
		is_current_user: true
	}
]
	
var player1, player2, player3, player4;
var player_tween = [];
var projectiles, projectile, projectile_1, projectile_2, projectile_3;
var projectileXY = [];
var is_defender = [];
var counter_text, counter_style, counter = 10;

function preload() {
	
	//load player image
	game.load.image("player_1", "assets/images/player_1.png");
	game.load.image("player_2", "assets/images/player_2.png");
	game.load.image("player_3", "assets/images/player_3.png");
	game.load.image("player_4", "assets/images/player_4.png");
	
	//load projectile image
	game.load.image("projectile_1", "assets/images/projectile.png");
	game.load.image("projectile_2", "assets/images/projectile.png");
	game.load.image("projectile_3", "assets/images/projectile.png");

}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	//set background color
	game.stage.backgroundColor = '#313131';
	
	//get all projectile coordinates
	projectileXY = check_is_attacker(player_data);
	
	//creates text for countdown timer
	counter_style = { font: "bold 32px Arial", fill: "#fff", align: "center" };
	counter_text = game.add.text(game.world.centerX, game.world.centerY, 'Counter: 10', counter_style);
    counter_text.anchor.setTo(0.5, 0.5);
	
	//set/create projectile coordinates and image
	projectile_1 = game.add.sprite(projectileXY[0], projectileXY[1], 'projectile_1');
	projectile_2 = game.add.sprite(projectileXY[0], projectileXY[1], 'projectile_2');
	projectile_3 = game.add.sprite(projectileXY[0], projectileXY[1], 'projectile_3');
	
	//enables phasers arcade physics to players
	game.physics.enable(projectile_1, Phaser.Physics.ARCADE);
	game.physics.enable(projectile_2, Phaser.Physics.ARCADE);
	game.physics.enable(projectile_3, Phaser.Physics.ARCADE);
	game.physics.arcade.enable(projectile_1);
	game.physics.arcade.enable(projectile_2);
	game.physics.arcade.enable(projectile_3);
	
	//sets the bounds of the game world to player
	projectile_1.body.collideWorldBounds = true;
	projectile_2.body.collideWorldBounds = true;
	projectile_3.body.collideWorldBounds = true;
		
	//set projectile to bounce with no deacceleration
	projectile_1.body.bounce.setTo(1, 1);
	projectile_2.body.bounce.setTo(1, 1);
	projectile_3.body.bounce.setTo(1, 1);
	

	//sets players location and sprite image
	player1 = game.add.sprite(player_data[0].player_positionX, player_data[0].player_positionY, 'player_1');  
	player2 = game.add.sprite(player_data[1].player_positionX, player_data[1].player_positionY, 'player_2');  
	player3 = game.add.sprite(player_data[2].player_positionX, player_data[2].player_positionY, 'player_3');  
	player4 = game.add.sprite(player_data[3].player_positionX, player_data[3].player_positionY, 'player_4');  
	
	//enables phasers arcade physics to players
	game.physics.enable(player1, Phaser.Physics.ARCADE);
	game.physics.enable(player2, Phaser.Physics.ARCADE);
	game.physics.enable(player3, Phaser.Physics.ARCADE);
	game.physics.enable(player4, Phaser.Physics.ARCADE);
	game.physics.arcade.enable(player1);
	game.physics.arcade.enable(player2);
	game.physics.arcade.enable(player3);
	game.physics.arcade.enable(player4);
    	
	//sets the bounds of the game world to player
	player1.body.collideWorldBounds = true;
	player2.body.collideWorldBounds = true;
	player3.body.collideWorldBounds = true;
	player4.body.collideWorldBounds = true;
		
	//destroys all dead players
	check_is_alive(player1, player_data[0].is_alive);
	check_is_alive(player2, player_data[1].is_alive);
	check_is_alive(player3, player_data[2].is_alive);
	check_is_alive(player4, player_data[3].is_alive);
	
	//move projectile toward x,y coordinates
	game.physics.arcade.moveToXY(projectile_1, projectileXY[2], projectileXY[3], 500);
	game.physics.arcade.moveToXY(projectile_2, projectileXY[4], projectileXY[5], 500);
	game.physics.arcade.moveToXY(projectile_3, projectileXY[6], projectileXY[7], 500);
	
	//finds defenders and animates movements
	//update new players players_position
	if (!player_data[0].is_attacker) {
		game.add.tween(player1).to ({ x: [player_data[0].actionX_1, player_data[0].actionX_2, player_data[0].actionX_3], 
									  y: [player_data[0].actionY_1, player_data[0].actionY_2, player_data[0].actionY_3] }, 8000, null, true);
		
		player_data[0].player_positionX = player_data[0].actionX_3;
		player_data[0].player_positionY = player_data[0].actionY_3;
		
	}
	if (!player_data[1].is_attacker) {
		game.add.tween(player2).to ({ x: [player_data[1].actionX_1, player_data[1].actionX_2, player_data[1].actionX_3], 
									  y: [player_data[1].actionY_1, player_data[1].actionY_2, player_data[1].actionY_3] }, 8000, null, true);
		
		player_data[1].player_positionX = player_data[1].actionX_3;
		player_data[1].player_positionY = player_data[1].actionY_3;
	}
	if (!player_data[2].is_attacker) {
		game.add.tween(player3).to ({ x: [player_data[2].actionX_1, player_data[2].actionX_2, player_data[2].actionX_3], 
									  y: [player_data[2].actionY_1, player_data[2].actionY_2, player_data[2].actionY_3] }, 8000, null, true);
		
		player_data[2].player_positionX = player_data[2].actionX_3;
		player_data[2].player_positionY = player_data[2].actionY_3;
	}
	if (!player_data[3].is_attacker) {
		game.add.tween(player4).to ({ x: [player_data[3].actionX_1, player_data[3].actionX_2, player_data[3].actionX_3], 
									  y: [player_data[3].actionY_1, player_data[3].actionY_2, player_data[3].actionY_3] }, 8000, null, true);
		
		player_data[3].player_positionX = player_data[3].actionX_3;
		player_data[3].player_positionY = player_data[3].actionY_3;
	}
	
	//sets countdown timer
	game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
}

function update() {
	
	//checks for collision between players with all projectiles
	//attacks are immune to projectiles
	if (game.physics.arcade.overlap(player1, projectile_1)){
		
		collisionHandler(player_data[0], player1, projectile_1);
		
	}
	if (game.physics.arcade.overlap(player1, projectile_2)){
		
		collisionHandler(player_data[0], player1, projectile_2);
		
	}
	if (game.physics.arcade.overlap(player1, projectile_3)){
		
		collisionHandler(player_data[0], player1, projectile_3);
		
	}
	if (game.physics.arcade.overlap(player2, projectile_1)){
		
		collisionHandler(player_data[1], player2, projectile_1);
		
	}
	if (game.physics.arcade.overlap(player2, projectile_2)){
		
		collisionHandler(player_data[1], player2, projectile_2);
		
	}
	if (game.physics.arcade.overlap(player2, projectile_3)){
		
		collisionHandler(player_data[1], player2, projectile_3);
		
	}
	if (game.physics.arcade.overlap(player3, projectile_1)){
		
		collisionHandler(player_data[2], player3, projectile_1);
		
	}
	if (game.physics.arcade.overlap(player3, projectile_2)){
		
		collisionHandler(player_data[2], player3, projectile_2);
		
	}
	if (game.physics.arcade.overlap(player3, projectile_3)){
		
		collisionHandler(player_data[2], player3, projectile_3);
		
	}
	if (game.physics.arcade.overlap(player4, projectile_1)){
		
		collisionHandler(player_data[3], player4, projectile_1);
		
	}
	if (game.physics.arcade.overlap(player4, projectile_2)){
		
		collisionHandler(player_data[3], player4, projectile_2);
		
	}
	if (game.physics.arcade.overlap(player4, projectile_3)){
		
		collisionHandler(player_data[3], player4, projectile_3);
		
	}
	
}

//find attacker and projectile coordinates
function check_is_attacker (player) {
	
	var coordinates = [];
	
	for (var index = 0; index < 4; index++) {
		if (player[index].is_attacker) {
			coordinates[0] = player[index].player_positionX;
			coordinates[1] = player[index].player_positionY;
			coordinates[2] = player[index].actionX_1;
			coordinates[3] = player[index].actionY_1;
			coordinates[4] = player[index].actionX_2;
			coordinates[5] = player[index].actionY_2;
			coordinates[6] = player[index].actionX_3;
			coordinates[7] = player[index].actionY_3;
		}
	}
	
	return coordinates;	
}

//checks if player is dead/inactive
function check_is_alive (player, is_alive) {

	if (!is_alive){
		
		//destory player object
		player.destroy();
	} 

}

//updates in-game counter
function updateCounter() {
	
	//decrementerate counter
    counter--;
	
	//update counter
    counter_text.setText('Counter: ' + counter);
	
	//stops entire game when counter reaches 0
	if (counter == 0) {
		
		//stops timer
		game.time.events.stop();
		
		//display text
		var text = game.add.text(game.world.centerX, game.world.centerY+50, 'Waiting For Other Players....', counter_style);
		text.anchor.setTo(0.5, 0.5);
		
		//stops game
		stop();
		
		
		console.log(player_data);
		
		
		
		/*
		//checks who is_attacker and that user sends all clients data to server
		for (var index = 0; index < 4; index++){
			if (player_data[index].is_attacker) {
				//getPlayerMoves(player_data);
			}
		}
		*/
		
		/*
		//checks who current user is and sends client data to server
		for (var index = 0; index < 4; index++){
			if (player_data[index].is_current_user) {
				//getPlayerMoves(player_data[index]);
			}
		}
		*/
	}

}

//stops game
function stop() {

    game.physics.arcade.isPaused = (game.physics.arcade.isPaused) ? false : true;

}

//kills defender and projectile when they collide
function collisionHandler(player_data, player, projectile) {
	
	//if player is an defender they die
	if (!player_data.is_attacker){
		
		//kill player and projectile
		player.kill();
		projectile.kill();
		
		//current player is now dead
		player_data.is_alive = false;
	}
		
}

/*
function getPlayerMoves(player_data) {
	//Get user input
	var hash = {
		user_name: player_data.user_name,
		is_attacker: player_data.is_attacker,
		is_alive: player_data.is_alive,
		player_positionX: player_data.actionX_3,
		player_positionY: player_data.actionY_3,
		actionX_1: player_data.actionX_1,
		actionY_1: player_data.actionY_1,
		actionX_2: player_data.actionX_2,
		actionY_2: player_data.actionY_2,
		actionX_3: player_data.actionX_3,
		actionY_3: player_data.actionY_3,
		is_current_user: player_data.is_current_user
	}
	$.post('controller/action', hash)
}
*/
/*
function animateGame() {
	$.get('controller/action', function(event) {
						//event is the data you get from dserver\
						//Format is a loong ass hash
						//event.current_game[0].players[0].user_name
		game_package = event.data;
	})
}
*/
