function startBattlePhase(game_package, phase){
	player_data=game_package;
	var player1, player2, player3, player4;
	var player_tween = [];
	var projectiles, projectile, projectile_1, projectile_2, projectile_3;
	var projectileXY = [];
	var is_defender = [];
	var counter_text, counter_style, counter = 10;
	canvas_location='battle-phase-canvas-'+phase;
	var game = new Phaser.Game(800, 600, Phaser.CANVAS, canvas_location, { preload: preload, update: update, create: create });

	function preload() {
		
		//load player image
		game.load.image("player_1", "/assets/player_1-9ff3f2c39e02ed53bd17844087bb347fbb8c31899bdd7a4c6b2ec86e115a7395.png");
		game.load.image("player_2", "/assets/player_2-a58d6b8b1b62ac22c99806cb61c8813a01ddcd458eb4c54897a11506574e4bd6.png");
		game.load.image("player_3", "/assets/player_3-7502ee3cab3ceddaa149fef664b0546af4c246893bc6ad765cc0f85d7381893d.png");
		game.load.image("player_4", "/assets/player_4-a5a83be7facf196e67ffefff75b59e25a55071a91c1272a65bfcfd296c3b62b6.png");
		
		//load projectile image
		game.load.image("projectile_1", "/assets/projectile-cfde10e78ac58772a54a766d085ac845faff9a0e0b173a62b99a51b0e2ec662b.png");
		game.load.image("projectile_2", "/assets/projectile-cfde10e78ac58772a54a766d085ac845faff9a0e0b173a62b99a51b0e2ec662b.png");
		game.load.image("projectile_3", "/assets/projectile-cfde10e78ac58772a54a766d085ac845faff9a0e0b173a62b99a51b0e2ec662b.png");

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
		player1 = game.add.sprite(player_data[0].position_x, player_data[0].position_y, 'player_1');  
		player2 = game.add.sprite(player_data[1].position_x, player_data[1].position_y, 'player_2');  
		player3 = game.add.sprite(player_data[2].position_x, player_data[2].position_y, 'player_3');  
		player4 = game.add.sprite(player_data[3].position_x, player_data[3].position_y, 'player_4');  
		
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
			game.add.tween(player1).to ({ x: [player_data[0].action_1_x, player_data[0].action_2_x, player_data[0].action_3_x], 
										  y: [player_data[0].action_1_y, player_data[0].action_2_y, player_data[0].action_3_y] }, 8000, null, true);
			
			player_data[0].position_x = player_data[0].action_3_x;
			player_data[0].position_y = player_data[0].action_3_y;
			
		}
		if (!player_data[1].is_attacker) {
			game.add.tween(player2).to ({ x: [player_data[1].action_1_x, player_data[1].action_2_x, player_data[1].action_3_x], 
										  y: [player_data[1].action_1_y, player_data[1].action_2_y, player_data[1].action_3_y] }, 8000, null, true);
			
			player_data[1].position_x = player_data[1].action_3_x;
			player_data[1].position_y = player_data[1].action_3_y;
		}
		if (!player_data[2].is_attacker) {
			game.add.tween(player3).to ({ x: [player_data[2].action_1_x, player_data[2].action_2_x, player_data[2].action_3_x], 
										  y: [player_data[2].action_1_y, player_data[2].action_2_y, player_data[2].action_3_y] }, 8000, null, true);
			
			player_data[2].position_x = player_data[2].action_3_x;
			player_data[2].position_y = player_data[2].action_3_y;
		}
		if (!player_data[3].is_attacker) {
			game.add.tween(player4).to ({ x: [player_data[3].action_1_x, player_data[3].action_2_x, player_data[3].action_3_x], 
										  y: [player_data[3].action_1_y, player_data[3].action_2_y, player_data[3].action_3_y] }, 8000, null, true);
			
			player_data[3].position_x = player_data[3].action_3_x;
			player_data[3].position_y = player_data[3].action_3_y;
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
		console.log("check attacker");
		console.log(player);
		var coordinates = [];
		
		for (var index = 0; index < 4; index++) {
			if (player[index].is_attacker) {
				coordinates[0] = player[index].position_x;
				coordinates[1] = player[index].position_y;
				coordinates[2] = player[index].action_1_x;
				coordinates[3] = player[index].action_1_y;
				coordinates[4] = player[index].action_2_x;
				coordinates[5] = player[index].action_2_y;
				coordinates[6] = player[index].action_3_x;
				coordinates[7] = player[index].action_3_y;
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
			game.destroy();
			gameAnimationComplete(player_data);
			
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


	function getPlayerMoves(player_data) {
		//Get user input
		/*
		var hash = {
			user_name: player_data.user_name,
			is_attacker: player_data.is_attacker,
			is_alive: player_data.is_alive,
			position_x: player_data.action_3_x,
			position_y: player_data.action_3_y,
			action_1_x: player_data.action_1_x,
			action_1_y: player_data.action_1_y,
			action_2_x: player_data.action_2_x,
			action_2_y: player_data.action_2_y,
			action_3_x: player_data.action_3_x,
			action_3_y: player_data.action_3_y,
			is_current_player: player_data.is_current_player
		}
		*/
		// $.post('controller/action', player_data)
	}


	function animateGame() {
		$.get('controller/action', function(event) {
							//event is the data you get from dserver\
							//Format is a loong ass hash
							//event.current_game[0].players[0].user_name
			game_package = event.data;
		})
	}
}

