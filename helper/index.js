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
  const os = electronRequire('remote').require('os');

  return process.env.WAKATIME_HOME || os.homedir();
}

function loadConfig() {
  const homePath = getHomeDirectory() + '/.wakatime.cfg';

  const fs = electronRequire('remote').require('fs');

  if (fs.existsSync(homePath)) {
    const config = ini.parse(fs.readFileSync(homePath, 'utf-8'));

    return config;
  }
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
  const config = loadConfig();

  if (config && config.settings) {

    const apiKey = config.settings['api_key'];

    if (app) {
      app.flags[API_KEY_FLAG] = apiKey;
    }

    return apiKey;
  }

}

/**
 * Logs message to application log
 * @param {String} options.message
 * @param {String} options.type
 */
function applicationLog(options) {

  const {
    message,
    type
  } = options;

  const config = loadConfig();

  if (config && (config.settings || {}).debug) {

    var log = electronRequire('remote').require('./log')('plugin:wakatime');

    type === 'info' ? log.info(message) : log.error(message);
  }
}

function electronRequire(component) {
  try {

    // browser
    return window.require('electron')[component];
  } catch (e) {

    // main process, back to default
    const r = require;

    return { require: r };
  }
}

module.exports = {
  applicationLog,
  electronRequire,
  retrieveApiKey,
  sendHeartbeat
};