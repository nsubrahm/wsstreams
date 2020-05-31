const stream = require('stream')
const shortid = require('shortid')

const mqttSub = require('./device/mqttsub')
const zmqPub = require('./broker/zmqpub')
const alerts = require('./transform/alerts')

const options = {
  "ws" : {
    "port" : 3000,
    "path" : "/demo"
  },
  "mqtt" : {
    "host" : "test.mosquitto.org",
    "port" : 1883,
    "topics" : ["/demo/demo/1"],
    "clientIdPrefix" : "magic-box-"
  },
  "zmq" : {
    "host" : "tcp://127.0.0.1",
    "port" : 2151
  }
}

const p1 = new stream.PassThrough()
const t1 = new stream.Transform()
t1._transform = alerts.detectAlerts

let mqttSubOptions = {
  host: options.mqtt.host,
  port: options.mqtt.port,
  clientId: options.mqtt.clientIdPrefix + shortid.generate(),
  topics: options.mqtt.topics  
}

let zmqPubOptions = { socketUrl : options.zmq.host + ':' + options.zmq.port }

const ms = new mqttSub.MqttSubscriber({
  mqtt: mqttSubOptions,
  passthru: t1
})

const zp = new zmqPub.ZeromqPublisher({
  zmq: zmqPubOptions,
  passthru: p1
})

zp.connect()
zp.publish()

t1.pipe(p1)