class PusherController < ApplicationController
  def chat
  end

  def hello_world
    Pusher.trigger('test_channel', 'my_event', {
      message: 'hello world'
    })
	
	redirect_to home_index_path
  end
end
