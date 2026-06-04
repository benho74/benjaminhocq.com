require 'webrick'
root = File.expand_path('.')
server = WEBrick::HTTPServer.new(Port: 7878, DocumentRoot: root, AccessLog: [], Logger: WEBrick::Log.new(File::NULL))
trap('INT') { server.shutdown }
server.start
