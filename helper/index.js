/* global window */

var request = require('request-promise');
var ini = require('ini');

var VERSION = require('../package.json').version;

var API_KEY_FLAG = 'wakatime-api-key';

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

function getHomeDirectory() {
  var os = electronRequire('remote').require('os');

  return process.env.WAKATIME_HOME || os.homedir();
}

/**
 * Fetches Wakatime api key from flags or global configuration
 * @param {ElectronApp} app
 *
 * @returns {String}
 */
function retrieveApiKey(app) {

  // 1: load from flags.json
  if (app && app.flags.get(API_KEY_FLAG)) {
    return app.flags.get(API_KEY_FLAG);
  }

  // 2: load from $WAKATIME_HOME/.wakatime.cfg
  var homePath = getHomeDirectory() + '/.wakatime.cfg';

  var fs = electronRequire('remote').require('fs');

  if (fs.existsSync(homePath)) {
    var config = ini.parse(fs.readFileSync(homePath, 'utf-8'));

    var apiKey = config.settings['api_key'];

    if (app) {
      app.flags[API_KEY_FLAG] = apiKey;
    }

    return apiKey;
  }

}

/** browser only */
function electronRequire(component) {
  return window.require('electron')[component];
}

module.exports = {
  electronRequire,
  retrieveApiKey,
  sendHeartbeat
};