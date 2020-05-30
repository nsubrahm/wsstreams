const zmq = require('zeromq')

class ZeromqPublisher {
  constructor(options) {
    this.socketUrl = options.zmq.socketUrl
    this.passthru = options.passthru

    this.sock = new zmq.Publisher
  }

  async connect() {
    try {
      await this.sock.bind(this.socketUrl)
      console.log('Publisher bound to ' + this.socketUrl)
    } catch (e) {
      throw new Error(e)
    }
  }

  publish() {
    this.passthru.on('data', async (chunk) => {
      let payload = JSON.parse(chunk.toString())
      await this.sock.send([payload.topic, JSON.stringify(payload.message, null, null)])
    })
  }
}

exports.ZeromqPublisher = ZeromqPublisher