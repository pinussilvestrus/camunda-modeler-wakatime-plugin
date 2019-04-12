import { registerBpmnJSPlugin } from 'camunda-modeler-plugin-helpers';

import {
  electronRequire,
  sendHeartbeat
} from '../helper';

function registerWindowListeners() {

  const {
    app
  } = electronRequire('remote');

  const apiKey = app.flags.get('wakatime-api-key');

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
// registerBpmnJSPlugin(module);
registerWindowListeners();