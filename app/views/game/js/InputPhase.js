var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

var game_package;

//player data
var player1_data = {
	user_name: "a",
	is_attacker: false,
	is_alive: true,
	player_positionX: 50,
	player_positionY: 50,
	actionX_1: 0,
	actionY_1: 0,
	actionX_2: 0,
	actionY_2: 0,
	actionX_3: 0,
	actionY_3: 0,
	is_current_user: false
};

var player2_data = {
	user_name: "b",
	is_attacker: false,
	is_alive: true,
	player_positionX: 750,
	player_positionY: 50,
	actionX_1: 0,
	actionY_1: 0,
	actionX_2: 0,
	actionY_2: 0,
	actionX_3: 0,
	actionY_3: 0,
	is_current_user: false
};

var player3_data = {
	user_name: "c",
	is_attacker: false,
	is_alive: true,
	player_positionX: 50,
	player_positionY: 550,
	actionX_1: 0,
	actionY_1: 0,
	actionX_2: 0,
	actionY_2: 0,
	actionX_3: 0,
	actionY_3: 0,
	is_current_user: false
};

var player4_data = {
	user_name: "d",
	is_attacker: false,
	is_alive: true,
	player_positionX: 750,
	player_positionY: 550,
	actionX_1: 0,
	actionY_1: 0,
	actionX_2: 0,
	actionY_2: 0,
	actionX_3: 0,
	actionY_3: 0,
	is_current_user: true
};

//store player x,y inputs
var inputX = [];
var inputY = [];

var player_1, player_2, player_3, player_4;
var points = [];
var over = false;
var currentPoint;
var centroid;
var inputType;
var counter = 0;
var button;

var style;
var text;

function preload() {
	
	//load player sprites
	game.load.image("player_1", "assets/images/player_1.png");
	game.load.image("player_2", "assets/images/player_2.png");
	game.load.image("player_3", "assets/images/player_3.png");
	game.load.image("player_4", "assets/images/player_4.png");
	
	//load point spritesheet
	game.load.spritesheet('points', 'assets/images/points.png', 16, 16);
	
	//load waiting background image	
	game.load.image("waiting", "assets/images/waiting.png");

}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	//set game background color
	game.stage.backgroundColor = '#313131';
	
	//set/create player inital coordinates and image
	player_1 = game.add.sprite(player1_data.player_positionX, player1_data.player_positionY, 'player_1');  
	player_2 = game.add.sprite(player2_data.player_positionX, player2_data.player_positionY, 'player_2'); 
	player_3 = game.add.sprite(player3_data.player_positionX, player3_data.player_positionY, 'player_3'); 
	player_4 = game.add.sprite(player4_data.player_positionX, player4_data.player_positionY, 'player_4'); 
	
	//enables phasers arcade physics to players
	game.physics.arcade.enable(player_1);
	game.physics.arcade.enable(player_2);
	game.physics.arcade.enable(player_3);
	game.physics.arcade.enable(player_4);
	
	//sets the bounds of the game world to player
	player_1.body.collideWorldBounds = true;
	player_2.body.collideWorldBounds = true;
	player_3.body.collideWorldBounds = true;
	player_4.body.collideWorldBounds = true;
	
	//display coordinates on click
    game.input.onTap.add(onTapHandler, this);
	
}

//displays/inputs coordinates on click 
//sends coordinates to server after 3 inputs
function onTapHandler() {
	
    if (!over && counter != 3)
    {
		//create points on game 
        var point = game.add.sprite(game.input.activePointer.position.x, game.input.activePointer.position.y, 'points', 0);
		
		//input coordinates in array
		inputX[counter] = game.input.activePointer.position.x;
		inputY[counter] = game.input.activePointer.position.y;
		console.log(inputX[counter]);
		console.log(inputY[counter]);
        points.push(point.position);

        point.anchor.set(0.5);
        point.alpha = 1;
        point.inputEnabled = true;
        point.input.enableDrag(true);
        point.defaultCursor = "move";
        
		//itterate counter
		counter++;
		
		//after 3 points 
		if (counter == 3)
		{
			//hide all objects in game
			game.world.worldVisible = false;
						
			//display waiting image
			game.add.sprite(0, 0, 'waiting');
		
			//check which client is and send data to server
			//the inputs will be added to data when data is sent
			if (player1_data.is_current_user == true) {
				
				console.log(player1_data);
				//getPlayerMoves(player1_data);
			
			}
			else if (player2_data.is_current_user == true){
			
				console.log(player2_data);
				//getPlayerMoves(player2_data);
			
			}
			else if (player3_data.is_current_user == true){
			
				console.log(player3_data);
				//getPlayerMoves(player3_data);
			
			}
			else if (player4_data.is_current_user == true){
			
				console.log(player4_data);
				//getPlayerMoves(player4_data);
				
			}

		}
		
    }
	
}

function render () {
	
	//render coordinates of points of all objects
	game.world.forEachAlive(function(child) {
        game.debug.text(Phaser.Math.roundTo(child.x, 0) + "," + Phaser.Math.roundTo(child.y, 0), child.x - 14, child.y + 30, "#ff1e00", "12px Courier");
    });

}

/*
//recieve data from server 
function animateGame() {
	$.get('controller/action', function(event) {
						//event is the data you get from dserver\
						//Format is a loong ass hash
						//event.current_game[0].players[0].user_name
		game_package = event.data;
	})
}
*/

/*
//send data to server
//update player inputs
function getPlayerMoves(player_data) {
	//Get user input
	var hash = {
		user_name: player_data.user_name,
		is_attacker: player_data.is_attacker,
		is_alive: player_data.is_alive,
		player_positionX: player_data.player_positionX,
		player_positionY: player_data.player_positionY,
		actionX_1: inputX[0],
		actionY_1: inputY[0],
		actionX_2: inputX[1],
		actionY_2: inputY[1],
		actionX_3: inputX[2],
		actionY_3: inputY[2],
		is_current_user: player_data.is_current_user
	}
	$.post('controller/action', hash)
}
*/