const zmq = require("zeromq")

async function run() {
  const sock = new zmq.Subscriber
  let topic = '/demo/demo/1'
  
  sock.connect("tcp://127.0.0.1:2151")
  sock.subscribe(topic)
  console.log("Subscriber connected to port 2151")

  for await (const [topic, msg] of sock) {
    console.log(topic.toString() + '<>' + msg.toString())
  }
}

run()