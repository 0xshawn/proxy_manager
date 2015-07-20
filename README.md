# Proxy Manager
version 0.0.1

## prepare
  npm install
  bower install
  npm install forever -g

## Start script
./start script

	#!/bin/bash
	export IP=your-server-ip
	export NODE_ENV=production
	export PORT=3000
	export MONGODB_URI=mongodb://localhost/proxymanager
	export SESSION_SECRETS=randomString
	cd dist
	ln -s ../node_modules .
	npm start

./restart script

	pkill node
	git pull
	grunt build --force
	./start
