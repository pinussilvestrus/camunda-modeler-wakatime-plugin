/* global window */

import {
  registerBpmnJSPlugin
} from 'camunda-modeler-plugin-helpers';

import module from './module';

import {
  applicationLog,
  electronRequire,
  retrieveApiKey,
  sendHeartbeat,
} from '../helper';

function registerApiKey() {

  const {
    app
  } = electronRequire('remote');

  const apiKey = retrieveApiKey(app);

  window.wakatimeApiKey = apiKey;
}

function registerWindowListeners() {

  const {
    app
  } = electronRequire('remote');

  const apiKey = window.wakatimeApiKey;

  if (!apiKey) {
    return;
  }

  const {
    mainWindow
  } = app;

  const options = {
    apiKey,
    time: new Date(),
    project: 'Camunda Modeler'
  };

  mainWindow.on('focus', async function(e) {
    await sendHeartbeat(options);

    applicationLog({
      message: `Sent heartbeat to Wakatime, timestamp: ${options.time}`,
      type: 'info'
    });

  });
}

registerApiKey();

registerWindowListeners();

registerBpmnJSPlugin(module);