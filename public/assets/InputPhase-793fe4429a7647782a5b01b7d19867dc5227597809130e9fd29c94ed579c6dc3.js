function startInputPhase(player_data, phase){
	console.log(player_data);
	player1_data=player_data[0];
	player2_data=player_data[1];
	player3_data=player_data[2];
	player4_data=player_data[3];
	canvas_location='input-phase-canvas-'+phase;

	var game = new Phaser.Game(800, 600, Phaser.CANVAS, canvas_location, { preload: preload, create: create, render: render });


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
		game.load.image("player_1", "/assets/player_1-9ff3f2c39e02ed53bd17844087bb347fbb8c31899bdd7a4c6b2ec86e115a7395.png");
		console.log("inputPhase: player_1 path" + "/assets/player_1-9ff3f2c39e02ed53bd17844087bb347fbb8c31899bdd7a4c6b2ec86e115a7395.png");
		game.load.image("player_2", "/assets/player_2-a58d6b8b1b62ac22c99806cb61c8813a01ddcd458eb4c54897a11506574e4bd6.png");
		game.load.image("player_3", "/assets/player_3-7502ee3cab3ceddaa149fef664b0546af4c246893bc6ad765cc0f85d7381893d.png");
		game.load.image("player_4", "/assets/player_4-a5a83be7facf196e67ffefff75b59e25a55071a91c1272a65bfcfd296c3b62b6.png");
		
		//load point spritesheet
		game.load.spritesheet('points', "/assets/points-c554db70b0818085543b10644f42ce9fa1440501ddc062b3ad4fb006bc678927.png", 16, 16);
		
		//load waiting background image	
		game.load.image("waiting", "/assets/waiting-f6ad74157ad86244ce29620e4d67507a30f2f8601975ad1ed104ad2c95a59adb.png");

	}

	function create() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		//set game background color
		game.stage.backgroundColor = '#313131';
		
		//set/create player inital coordinates and image
		player_1 = game.add.sprite(player1_data.position_x, player1_data.position_y, 'player_1');  
		player_2 = game.add.sprite(player2_data.position_x, player2_data.position_y, 'player_2'); 
		player_3 = game.add.sprite(player3_data.position_x, player3_data.position_y, 'player_3'); 
		player_4 = game.add.sprite(player4_data.position_x, player4_data.position_y, 'player_4'); 
		
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
			console.log(counter);
			//after 3 points 
			if (counter == 3)
			{
				//hide all objects in game
				game.world.worldVisible = false;
							
				//display waiting image
				game.add.sprite(0, 0, 'waiting');
			
				//check which client is and send data to server
				//the inputs will be added to data when data is sent
				if (player1_data.is_current_player) {
					player_data[0].action_1_x=inputX[0];
					player_data[0].action_1_y=inputY[0];
					player_data[0].action_2_x=inputX[1];
					player_data[0].action_2_y=inputY[1];
					player_data[0].action_3_x=inputX[2];
					player_data[0].action_3_y=inputY[2];
					console.log(player_data[0]);
					movesWereEntered(player_data);				
				}
				else if (player2_data.is_current_player){
					player_data[1].action_1_x=inputX[0];
					player_data[1].action_1_y=inputY[0];
					player_data[1].action_2_x=inputX[1];
					player_data[1].action_2_y=inputY[1];
					player_data[1].action_3_x=inputX[2];
					player_data[1].action_3_y=inputY[2];
					console.log(player_data[1]);
					movesWereEntered(player_data);
				}
				else if (player3_data.is_current_player){
					player_data[2].action_1_x=inputX[0];
					player_data[2].action_1_y=inputY[0];
					player_data[2].action_2_x=inputX[1];
					player_data[2].action_2_y=inputY[1];
					player_data[2].action_3_x=inputX[2];
					player_data[2].action_3_y=inputY[2];
					console.log(player_data[2]);
					movesWereEntered(player_data);
				}
				else if (player4_data.is_current_player){
					player_data[3].action_1_x=inputX[0];
					player_data[3].action_1_y=inputY[0];
					player_data[3].action_2_x=inputX[1];
					player_data[3].action_2_y=inputY[1];
					player_data[3].action_3_x=inputX[2];
					player_data[3].action_3_y=inputY[2];
					console.log(player_data[3]);
					game.destroy()
					movesWereEntered(player_data);
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


	// //send data to server
	// //update player inputs
	// function getPlayerMoves(player_data) {
	// 	//Get user input
	// 	var hash = {
	// 		user_name: player_data.user_name,
	// 		is_attacker: player_data.is_attacker,
	// 		is_alive: player_data.is_alive,
	// 		position_x: player_data.position_x,
	// 		position_y: player_data.position_y,
	// 		action_1_x: inputX[0],
	// 		action_1_y: inputY[0],
	// 		action_2_x: inputX[1],
	// 		action_2_y: inputY[1],
	// 		action_3_x: inputX[2],
	// 		action_3_y: inputY[2],
	// 		is_current_player: player_data.is_current_player
	// 	}
	// 	$.post('controller/action', hash)
	// }
}
