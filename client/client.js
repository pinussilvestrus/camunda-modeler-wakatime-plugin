/* global window */

import {
  registerBpmnJSPlugin
} from 'camunda-modeler-plugin-helpers';

import module from './module';

import {
  electronRequire,
  sendHeartbeat
} from '../helper';

function registerApiKey() {

  const {
    app
  } = electronRequire('remote');

  const apiKey = app.flags.get('wakatime-api-key');

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

  mainWindow.on('focus', function(e) {
    sendHeartbeat({
      apiKey,
      time: new Date(),
      project: 'Camunda Modeler'
    });
  });
}

registerApiKey();

registerWindowListeners();

registerBpmnJSPlugin(module);