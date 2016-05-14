class GameController < ApplicationController
  def index
    if current_user
        @open_games=Game.where(:waiting_for_players => true)
        if @open_games.count == 0
          game = Game.new
          game.phase = 1
          game.waiting_for_players = true
          game.finished = false
          game.save
          @open_games=Game.where(:waiting_for_players => true)
        end
    else
      redirect_to "/home/"
    end
  end
  def start
  end

end
