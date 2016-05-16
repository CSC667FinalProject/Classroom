class GameController < ApplicationController
  helper_method :setInitialPlayerData
  def index
    if not current_user or not params['id']
      redirect_to "/home/"
    end
  end
  def player_join
    if current_user
      if not defined? params['id']
        redirect_to "/home"
      end
      @game = Game.find_by(:id => params['id'])
      @player = Player.new
      @player.user = current_user
      @player.game = @game
      @player.username = current_user.email
      @player.is_attacker = false
      @player.is_alive = true
      @player.save
      @game.save
      num_players = @game.players.count
      @player.player_number=num_players
      setInitialPlayerData(@player)
      if @game.players.count==4
        @game.waiting_for_players = false
        @game.save
        @player.save
      end
      @game.reload
      @players = @game.players
      render :index
    else
      redirect_to "/home"
    end
  end

  def game_results

  end
  def setInitialPlayerData(player)
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
    player.save
  end
end
