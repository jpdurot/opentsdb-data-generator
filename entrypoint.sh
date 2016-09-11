#!/bin/bash
cd /usr/src/app/app
node app.js $MESOS_SANDBOX/config.json
