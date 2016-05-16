# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160515232108) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "game_rounds", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "games", force: :cascade do |t|
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.integer  "phase",               default: 1,     null: false
    t.boolean  "waiting_for_players", default: true,  null: false
    t.boolean  "finished",            default: false, null: false
    t.integer  "moves_submitted",     default: 0,     null: false
  end

  create_table "players", force: :cascade do |t|
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
    t.integer  "user_id"
    t.integer  "game_id"
    t.boolean  "is_attacker"
    t.boolean  "is_alive"
    t.boolean  "is_current_player"
    t.integer  "player_number"
    t.decimal  "position_x",        precision: 5
    t.decimal  "position_y",        precision: 5
    t.decimal  "action_1_x",        precision: 5
    t.decimal  "action_1_y",        precision: 5
    t.decimal  "action_2_x",        precision: 5
    t.decimal  "action_2_y",        precision: 5
    t.decimal  "action_3_x",        precision: 5
    t.decimal  "action_3_y",        precision: 5
    t.string   "username"
    t.integer  "deaths",                          default: 0, null: false
  end

  add_index "players", ["game_id"], name: "index_players_on_game_id", using: :btree
  add_index "players", ["user_id"], name: "index_players_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "players", "games"
  add_foreign_key "players", "users"
end
