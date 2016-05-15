class PusherController < ApplicationController
	helper_method :formatGameData
	# skip CSRF token veritication only for chat action
	skip_before_action :verify_authenticity_token, only: [:chat, :player_joined]
	
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
			Pusher.trigger(params[:id], 'promptForMoves', initialGameData(:id))
		end
		Pusher.trigger(params[:id], 'newPlayerJoined', {user_email: current_user['email']})
	end

	def hello_world
	#Pusher.trigger('test_channel', 'my_event', {
	#  message: 'hello world'
	#})

	redirect_to home_index_path
	end

	def initialGameData(id)
		data_package = Hash.new()
		data_package['players'] = Array.new()
		game = Game.find(params[:id])
		players = game.players
		attacker_number = rand(4)+1
		players.each_with_index do |player, i|
			player_data = Hash.new
			player_data['user_name']=player.user.email
			player_data['user_id']=player.user.id
			player_data['is_attacker']=player.is_attacker
			if i==attacker_number
				player_data['is_attacker']=true
			end
			player_data['is_alive']=player.is_alive
			player_data['player_number']=player.player_number
			player_data['action_1_x']=player.action_1_x
			player_data['action_1_y']=player.action_1_y
			player_data['action_2_x']=player.action_2_x
			player_data['action_2_y']=player.action_2_y
			player_data['action_3_x']=player.action_3_x
			player_data['action_3_y']=player.action_3_y

			data_package['players'].push(player_data)
		end
	end
end
