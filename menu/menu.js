'use strict';

const { dialog } = require('electron');
const sendHeartbeat = require('../helper').sendHeartbeat;

module.exports = function(electronApp, menuState) {

  function showMessage(options) {
    const {
      message,
      type,
    } = options;

    dialog.showMessageBox(electronApp.mainWindow, {
      message,
      type
    });
  }

  function getApiKey() {
    return electronApp.flags.get('wakatime-api-key');
  }

  return [{
    label: 'Wakatime API Key',
    action: function() {

      const apiKey = getApiKey();

      if (!apiKey) {
        return showMessage({
          message: 'No API-Key available! Please add one in the \'flags.json\'',
          type: 'error'
        });
      }

      showMessage({
        message: `Wakatime API-Key: ${apiKey}`,
        type: 'info'
      });
    }
  },
  {
    label: 'Wakatime Send Heartbeat',
    action: async function() {

      const apiKey = getApiKey();

      if (!apiKey) {
        return showMessage({
          message: 'No API-Key available! Please add one in the \'flags.json\'',
          type: 'error'
        });
      }

      try {
        await sendHeartbeat({
          apiKey,
          project: 'Camunda Modeler',
          time: new Date()
        });
      } catch (e) {
        showMessage({
          message: e.stacktrace,
          type: 'error'
        });
      }

    }
  }];
};
