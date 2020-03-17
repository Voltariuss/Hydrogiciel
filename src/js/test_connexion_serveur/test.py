#!/usr/bin/env python
import socket
import time
   
TCP_IP = '127.0.0.1'
TCP_PORT = 11114
BUFFER_SIZE = 1024
MESSAGE = "GET\r\n\r\n"

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((TCP_IP, TCP_PORT))
for i in range(0, 10):
	s.send(MESSAGE)
	data = s.recv(BUFFER_SIZE)
	time.sleep(0.1)
	print "received data:", data

s.close()