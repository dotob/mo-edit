path         = require 'path'
fs           = require 'fs'
express      = require 'express'
bodyParser   = require 'body-parser'
http         = require 'http'
serveStatic  = require 'serve-static' # use this because of mime type issues with express.static
socketio     = require 'socket.io'
mers         = require 'mers'


# create web server instance
app     = express()

# TODO: do we need this?
app.use bodyParser.json()
app.use bodyParser.urlencoded({ extended: false })

server  = http.Server app

mers   = mers {uri:'mongodb://localhost/moedit'}
models = require('./server/models')(mers.mongoose)
require './server/fakedata'
app.use '/api', mers.rest()



io = socketio(server) #create web socket for pushing data to clients
io.on 'connection', (socket) =>
  console.log "#{io.sockets.sockets.length} socket(s) connected"

port = 3030
server.listen port, ->
  console.log "web server is listening on port #{port}"

# Set the public folder as static assets
app.use serveStatic path.join(__dirname, 'client', 'public')

# basic route
app.get "*", (req, res) ->
	console.log "requested #{req.url}"
	res.sendFile path.join(__dirname, 'client', 'public', 'index.html')

# logger route, for saving logmessages from client
app.post "/logger", (req, res) ->
	console.log JSON.stringify(req.body)
