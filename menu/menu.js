'use strict';

const { dialog } = require('electron');

const sendHeartbeat = require('../helper').sendHeartbeat;
const retrieveApiKey = require('../helper').retrieveApiKey;

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
    return retrieveApiKey(electronApp);
  }

  return [{
    label: 'Show API Key',
    action: function() {

      const apiKey = getApiKey();

      if (!apiKey) {
        return showMessage(getApiKeyError());
      }

      showMessage({
        message: `Wakatime API-Key: ${apiKey}`,
        type: 'info'
      });
    }
  },
  {
    label: 'Send Heartbeat (Demo)',
    action: async function() {

      const apiKey = getApiKey();

      if (!apiKey) {
        return showMessage(getApiKeyError());
      }

      try {

        const options = {
          apiKey,
          time: new Date()
        };

        await sendHeartbeat(options);

        showMessage({
          message: `Sent heartbeat to Wakatime, timestamp: ${options.time}`,
          type: 'info'
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

// helpers //////////

function getApiKeyError() {
  return {
    message: 'No API-Key available! Please add one in the \'flags.json\' or \'$WAKATIME_HOME/.wakatime.cfg\'',
    type: 'error'
  };
}
