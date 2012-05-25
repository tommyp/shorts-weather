require 'sinatra'
require 'haml'
require 'coffee-script'
require 'execjs'
require 'sass'

set :public_folder, File.dirname(__FILE__) + '/public'
  
get '/' do
  haml :index
end

get '/shorts.js' do
  coffee :app
end

get '/shorts.css' do
  scss :style, :style => :expanded
end