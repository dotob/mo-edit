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

# mongoose rest mapping via mers
mers     = mers {uri:'mongodb://localhost/moedit'}
models   = require('./server/models')(mers.mongoose)
app.use '/api', mers.rest()

# use own instance of mongoose for faking and stuff, couldnt get mers mongoose to work properly
m = require 'mongoose'
m.connect 'mongodb://localhost/moedit'
models = require('./server/models')(m)
fakeData = require './server/fakedata'
fakeData(models)

# init documenthandling
DocumentHandling = require './server/documenthandling'
documentHandling = new DocumentHandling(models)

io = socketio(server) #create web socket for pushing data to clients
io.on 'connection', (socket) =>
	console.log "#{io.sockets.sockets.length} socket(s) connected"

port = 3030
server.listen port, ->
	console.log "web server is listening on port #{port}"

# Set the public folder as static assets
app.use serveStatic path.join(__dirname, 'client', 'public')

sendToClient = (req, res) ->
	console.log "requested #{req.url}"
	res.sendFile path.join(__dirname, 'client', 'public', 'index.html')
# basic route
app.get "/edit", sendToClient
app.get "/login", sendToClient
	

# logger route, for saving logmessages from client
app.post "/logger", (req, res) ->
	console.log JSON.stringify(req.body)
	res.sendStatus(200)

# preview route
app.get "/preview/:docid", (req, res) ->
	console.log "requested preview doc #{req.params.docid}"
	console.log documentHandling.createPreview(req.params.docid).then (h) ->
		console.log "promised: #{h}"
		res.send(h)

# download route
app.get "/download/word/:docid", (req, res) ->
	console.log "requested download doc #{req.params.docid}"
	documentHandling.createWord(req.params.docid).then (filename) ->
		console.log "doc created: #{filename}"
		res.sendFile path.join(__dirname, filename)
	