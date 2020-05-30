const mqtt = require('mqtt')
const _ = require('lodash')

class MqttSubscriber {
  
  constructor(options) {
    this.mqttOptions = options.mqtt
    this.passthru = options.passthru

    this.mqttClient = mqtt.connect(this.mqttOptions)
    this.mqttClient.on('connect', () => {
      this.mqttClient.subscribe(this.mqttOptions.topics, (err, granted) => {
        if (err) {
          // TODO: Handle this error
        } else {
          _.forEach(granted, (g) => {
            console.log('Subscribed to ' + g.topic + ' with QoS ' + g.qos)
          })
          this.mqttClient.on('message', (topic, message) => {
            this.passthru.write(Buffer.from(JSON.stringify({
              topic: topic,
              message: JSON.parse(message.toString())
            })))
          })
        }
      })
    })
  }
}

exports.MqttSubscriber = MqttSubscriber