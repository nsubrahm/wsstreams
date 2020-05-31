let thresholds = require('../../conf/thresholds.json')

function detectAlerts(chunk, encoding, done) {
  let m = JSON.parse(chunk.toString())
  m.message.alerts = [
    {
      "paramName": "demo",
      "paramValue": 30.09
    }
  ]
  this.push(JSON.stringify(m))
  done()
}

module.exports = {
  detectAlerts: detectAlerts
}