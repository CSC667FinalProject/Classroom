class PusherController < ApplicationController
	helper_method :initialGameData
	# skip CSRF token veritication only for chat action
	skip_before_action :verify_authenticity_token, only: [:chat, :player_joined, :submit_moves, :submit_results]
	
	def chat
		user_email = params[:user_email]
		message = params[:message]

		Pusher.trigger('chat', 'sendMessage', {user_email: user_email,
	  	message: message
		})
	end

	def player_joined
		game = Game.find(params[:id])
		players = game.players
		if(players.count == 4)
			Pusher.trigger(game.id, 'promptForMoves', initialGameData(game))
		else
			Pusher.trigger(game.id, 'newPlayerJoined', {user_email: current_user['email']})
		end
	end

	def submit_moves
		player=setMovesForPlayer(params)
		game = player.game
		game.moves_submitted=game.moves_submitted+1
		game.save
		game.reload
		if(game.moves_submitted==4)
			players = game.players
			Pusher.trigger(game.id, 'allMovesEntered', players)
		end
	end

	def submit_results
		game_data=JSON.parse(params[:game_data])
		update_deaths(game_data)
		game = Player.find(game_data[0]['id'].to_i).game
		game.phase = game.phase+1
		game.moves_submitted = 0
		game.save
		game.reload
		if(game.phase == 4)
			Pusher.trigger(game.id, 'gameComplete',game.players)
		else
			Pusher.trigger(game.id, 'promptForMoves',initialGameData(game))
		end
	end

	def update_deaths(params)
		params.each do |player_data|
			player = Player.find(player_data['id'].to_i)
			if !player_data['is_alive']
				player.deaths = player.deaths+1
				player.is_alive = true
				player.save
			end
		end
	end

	def setMovesForPlayer(params)
		player = Player.find(params['id'].to_i)
		player.action_1_x = params['action_1_x'].to_i
		player.action_1_y = params['action_1_y'].to_i
		player.action_2_x = params['action_2_x'].to_i
		player.action_2_y = params['action_2_y'].to_i
		player.action_3_x = params['action_3_x'].to_i
		player.action_3_y = params['action_3_y'].to_i
		player.position_x = params['position_x'].to_i
		player.position_y = params['position_y'].to_i
		player.save
		return player
	end


	def initialGameData(game)
		players = game.players
		players.each do |player|
	    x = 0
	    y = 0
	    case player.player_number
	      when 1
	        x = 50
	        y = 50
	      when 2
	        x = 750
	        y = 50
	      when 3
	        x = 50
	        y =550
	      when 4
	        x = 750
	        y = 550
	    end
	    player.position_x = x
	    player.position_y = y
	    player.action_1_x = 0
	    player.action_1_y = 0
	    player.action_2_x = 0
	    player.action_2_y = 0
	    player.action_3_x = 0
	    player.action_3_y = 0
	    player.is_current_player = false
	    player.is_attacker = false
	    player.save
	  end
		attacker_number = rand(4)+1
		attacker = Player.where(:game_id=>game.id).where(:player_number=>attacker_number).first
		attacker.is_attacker = true
		attacker.save
		players.reload
		return players
  end
end
