ENV['RACK_ENV'] ||= 'development'

require 'rubygems'
require 'sinatra/base'
require 'json'
require 'socket'

Bundler.require :default, ENV['RACK_ENV'].to_sym

class AppServer < Sinatra::Base

  set :public_folder, File.dirname(__FILE__) + '/static'

  workers = {}
  WORKER_TTL = 10

  SIDECAR_FILE_NAME = ENV['SIDECAR_FILE_NAME'] || "/tmp/sidecar.txt"

  get '/' do
    send_file File.join(settings.public_folder, 'index.html')
  end


  get '/api' do
    workers.delete_if { |_, t| Time.now.to_i - t > WORKER_TTL }

    puts "API Registered Workers: #{workers}"

    lemonade = ""
    if File.file?(SIDECAR_FILE_NAME)
      sidecar_file = File.open(SIDECAR_FILE_NAME)
      lemonade = sidecar_file.read.strip
    end

    content_type :json
    {
      ads: workers.count,
      lemonade: lemonade

    }.to_json
  end

  get '/register_worker' do

    worker_uuid = params[:uuid]

    workers[worker_uuid] = Time.now.to_i

    workers.delete_if { |_, t| Time.now.to_i - t > WORKER_TTL }
    puts "Registered Workers: #{workers}"

  end

  def prune_workers

  end
  run! if app_file == $0
end
