# Proxy Manager
version 0.0.3

## prepare
1. install mongo
2. install npm
3. following script:
  npm install
  sudo npm install forever bower grunt grunt-cli -g
  bower install

## Start script
./start script

	#!/bin/bash
	export PROXY_IP=your-server-ip
	export IP=127.0.0.1 # With Nginx
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
