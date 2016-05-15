class LobbyController < ApplicationController
  def index
    if current_user
        open_games=Game.where(:waiting_for_players => true)
        if open_games.count == 0
          game = Game.new
          game.phase = 1
          game.waiting_for_players = true
          game.finished = false
          game.save
          open_games=Game.where(:waiting_for_players => true)
        end
        @games = Hash.new
        open_games.each do |game|
          @games[game.id] = Hash.new
          players=game.players
          players.each do |player|
            @games[game.id][player.id]=player.user.email
          end
        end
    else
      redirect_to "/home/"
    end
  end
end
