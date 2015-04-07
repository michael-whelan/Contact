from tornado import websocket, web, ioloop, httpserver
import tornado
import ast #to convert unicode type to dict type
from Session import Session
import json
import datetime, time
import re
#list of WebSocket connections
connections={}

#session = Session()
sessionList = list()

_REG_USERS = 'data/registeredUsers.txt'

class WSHandler(tornado.websocket.WebSocketHandler):
	def check_origin(self, origin):
		return True
	def open(self):
		print ("WebSocket opened")
		print ("from %s" %self.request.remote_ip)

	def on_message(self, message):
		#if socket id not defined yet, set it to 0
		if( hasattr(self,"id") == False ):
			self.id = 0
		
		#When a message comes in on a socket,the player id can be obtained from the socket	
		#and passed on to the handler
		messageHandler.handleIncomingMsg(message,self,self.id)
 
	def on_close(self):
	    print ("WebSocket closed")

class MessageHandler:
	numberOfDeaths = 0#this keeps track of whether or not there is still anyone playing
	def __init__(self):
		pass
	def createSession(self):
		session1 = Session()
		sessionList.append(session1)
		print(len(sessionList))
		
	def getTime(self):
		# replace datetime.datetime.now() with your datetime object
		tempTime = time.mktime(datetime.datetime.now().timetuple()) * 1000
		return int(tempTime)

	def register(self, data,pid):
		print(data[0],data[1])
		if(self.checkRegister(_REG_USERS,data[0])):
			print("already taken")
			self.sendMessage(pid, "alreadyTaken", data)
			#call the already used method
		else:
			with open(_REG_USERS, 'a') as f:
				print(data[0],0,data[1],0,0,0,0,0,0,0, sep=',', file=f)
				self.sendMessage(pid, "reg", data)
			#f.write("Name '{0}', Pass '{1}';\n".format(data[0],data[1]))
			
	def checkRegister(self,file,name):
		with open(file) as f:
			for line in f:
				u,tStamp, p,money,shield,dmg,bomb,health,reload,radar = line.strip().split(',')
				if name == u:
					return True
			return False
	
	def checkLogin(self,data,pid,file):
		with open(file) as f:
			for line in f:
				u,tStamp, p,money,shield,dmg,bomb,health,reload,radar = line.strip().split(',')
				if data[0] == u:
					if data[1] == p:
						newData = [u,tStamp, p,money,shield,dmg,bomb,health,reload,radar]
						self.sendMessage(pid, "loginApproved", newData)#will also need to send message saying username/pass wrong

	def replace( self,filePath, text, subs, flags=0 ):
		with open( filePath, "r+" ) as file:
			fileContents = file.read()
			textPattern = re.compile( re.escape( text ), flags )
			fileContents = textPattern.sub( subs, fileContents )
			file.seek( 0 )
			file.truncate()
			file.write( fileContents)

	def updateProfile(self,data,file):
		with open(file, 'r+') as f:
			lines = f.readlines()
			for i, line in enumerate(lines):
				if line.startswith(data[0]):
					print(data[0])
					tempLine = line;
					u,tStamp, p,money,shield,dmg,bomb,health,reload,radar = line.strip().split(',')
					if self.getTime() > int(tStamp):
						
						print(data[0],self.getTime(),data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8], sep=',', file=f)
						self.replace(file,line,"")
	
	def getSession(self, pid):
		for s in sessionList:
			if s.getSession(pid):
				return s
			
	def hostGame(self,data,socket):
		self.createSession()
		#data['type'] = 'host'
		if(str(sessionList[len(sessionList)-1].getState()) == "-1"):
			success = sessionList[len(sessionList)-1].addPlayer(data['pid'])
			#data['pid'] = 'player1'
			self.addToConnectionList(socket, data)
			
		if(success):
			self.sendToAll(data['pid'], "state",str(str(sessionList[len(sessionList)-1].getState())))
		else:
			self.sendMessage(data['pid'], "error", "Unexpected error with hosting") 
				
	def handleIncomingMsg(self, data, socket,pid):
		try:
			print ('message received %s' %data)
			
			#converts the unicode data that arrives into a dict
			data = ast.literal_eval(data)
			
			type = data['type']
			data1 = data['data']

		except :
			print ("Unexpected error:" +  sys.exc_info()[0])
			type = 'error'
			print('except')
					
		if type == "host":
			self.hostGame(data,socket)		
		elif type == "join":
			#add to connection list
			
			iter = 0;
			for s in sessionList:
				print('Session return, '+ str(s.getState()))
				if(s.getState() == 0):
					print('p2')
					success = s.addPlayer(data['pid'])
					print('Session return2, '+ str(s.getState()))
					#data['pid'] = 'player2'
					self.addToConnectionList(socket, data)
			
					if(success):
						self.sendToAll(data['pid'], "state",str(s.getState()))
				++iter
			if iter >= len(sessionList):
				print(iter)
				self.hostGame(data, socket)
			#else:
			#	self.sendMessage(data['pid'], "error", "No available space: Two players already in the game!") 
			
		elif type == "test":
			self.sendToAll(pid,type,1)
		elif type == "register":
			self.addToConnectionList(socket, data)
			self.register(data1,data['pid'])
		elif type == "checkLogin":
			self.addToConnectionList(socket, data)
			self.checkLogin(data1,data['pid'],_REG_USERS)
		elif type == "updateProfile":
			self.updateProfile(data1,_REG_USERS)
		elif type == "updatePos":
			self.sendToOtherPlayer(pid,type,data1)
		elif type == "bossHit":
			self.sendToOtherPlayer(pid,type,data1)
		elif type == "bossTarget":
			self.sendToOtherPlayer(pid,type,data1)
		elif type == "bossPos":
			self.sendToOtherPlayer(pid,type,data1)
		elif type == "bossHole":
			self.sendToOtherPlayer(pid,type,data1)
		elif type == "worldUp":
			self.sendToOtherPlayer(pid,type,data1)
		elif type == "killEnemy":
			self.sendToOtherPlayer(pid,type,data1)
		elif type == "playerDeath":
			#print('Number Died: '+numberOfDeaths)
			#numberOfDeaths+=1
			#if(numberOfDeaths==2):
			#	self.sendToAll("server","lose","gameover")
			#else:
			self.sendToOtherPlayer(pid,type,data1)
		elif type == "setLevel":
			self.sendToAll(pid,type,str(data1))
		elif type == "updateState":
			self.updateState(pid, data1)
			
		else:
			msg = 'Error reading game request. Please make sure message type is either join, updateState, or...'
			message={'type':'error', "data":msg}
			print ('Error reading game request.')


	def addToConnectionList(self, socket, message):
		socket.id= message['pid']
		connections[socket.id]=socket
		print(str(socket.id) + " joined")

	def updateState(self, pid, data):
		for pid in self.getSession(my_pid).getPlayers():
			self.sendMessage(pid, "updateState", data)

	#add in types 
	def sendMessage(self,pid,type,data):
		try:
			msg=dict()
			msg["type"]=type;
			msg["data"]=data;
			msg=json.dumps(msg)
			connections[pid].write_message(msg)
		except KeyError:
			print("Player " + str(pid) + " isn't connected")

	def sendToAll(self,my_pid,type,data):
		for pid in  self.getSession(my_pid).getPlayers():
			#print("pids saved "+pid)
			self.sendMessage(pid, type, data)
			
			
	#Assuming two players, sends to the player that isn't my_pid
	def sendToOtherPlayer(self,my_pid,type,data):
		for pid in self.getSession(my_pid).getPlayers():
			#print(my_pid)
			#print(type)
			#print(data)
			if my_pid != pid:
				#print("equals")
				self.sendMessage(pid,type,data)
				
				
#needs to be after the class def
messageHandler = MessageHandler();
 

app= tornado.web.Application([
	#map the handler to the URI named "wstest"
	(r'/wstest', WSHandler),
])
 
if __name__ == '__main__':
	app.listen(8080)
	tornado.ioloop.IOLoop.instance().start()