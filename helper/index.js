/* global window */

var request = require('request-promise');

// todo(pinussilvestrus): read from package
const VERSION = '0.1.0';

function btoa(String) {
  return Buffer.from(String).toString('base64');
}

/**
 * Sends activity heartbeat from application to Wakatime
 * @param {String} options.apiKey
 * @param {String} options.entity
 * @param {Date} options.time
 */
async function sendHeartbeat(options) {

  const {
    apiKey,
    entity,
    time
  } = options;

  const data = {
    time: time / 1000,
    category: 'designing',
    entity: entity || 'Modeling BPMN',
    type: entity ? 'domain' : 'app',
    project: 'Camunda Modeler',
    language: 'xml',
    plugin: `camunda-modeler-wakatime/${VERSION}`
  };

  const url = 'https://wakatime.com/api/v1/heartbeats';

  return await request.post({
    headers: {
      'content-type': 'application/json',
      'Authorization': `Basic ${btoa(apiKey)}`
    },
    url,
    body: JSON.stringify(data)
  });
}

/** browser only */
function electronRequire(component) {
  return window.require('electron')[component];
}

module.exports = {
  sendHeartbeat,
  electronRequire
};