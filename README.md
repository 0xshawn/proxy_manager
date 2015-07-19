# Proxy Manager

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
	