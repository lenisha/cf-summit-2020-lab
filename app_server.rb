ENV['RACK_ENV'] ||= 'development'

require 'rubygems'
require 'sinatra/base'
require 'json'
require 'net/http'
# require 'typhoeus'

Bundler.require :default, ENV['RACK_ENV'].to_sym

class AppServer < Sinatra::Base
  get '/' do
    File.read('index.html')
  end

  get '/api' do
    puts "Sending a request to the adds-js sidecar at localhost:ENV['ADDS_JS_PORT']"
    response = Net::HTTP.get('localhost', '/', ENV['ADDS_JS_PORT'])
    # response = Typhoeus.get("localhost:S_JS_PORT']}")
    puts "Received #{response} from the adds-js sidecar"
    response
  end

  run! if app_file == $0
end