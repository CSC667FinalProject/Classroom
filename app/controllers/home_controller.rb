class HomeController < ApplicationController
  def index
    gon.current_game = "Here's a game"
  end
end
