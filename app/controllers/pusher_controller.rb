class PusherController < ApplicationController
	# skip CSRF token veritication only for chat action
	skip_before_action :verify_authenticity_token, only: [:chat]
	
	def chat

		user_email = params[:user_email]
		message = params[:message]

		Pusher.trigger('chat', 'sendMessage', {user_email: user_email,
	  	message: message
		})
	end

	def hello_world
	#Pusher.trigger('test_channel', 'my_event', {
	#  message: 'hello world'
	#})

	redirect_to home_index_path
	end
end
