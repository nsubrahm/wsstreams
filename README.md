# Introduction

## Usage

1. Launch ZeroMQ subscriber with `node app/zsub.js`.
2. Launch device subscriber with `node app/index.js`.
3. Publish MQTT messages with `mqtt pub -h test.mosquitto.org -m '{"a" : "A"}'`  _Only JSON messages supported!_