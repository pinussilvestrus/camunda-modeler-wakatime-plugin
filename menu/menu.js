'use strict';

module.exports = function(electronApp, menuState) {
  return [{
    label: 'Wakatime API Key',
    action: function() {

      // will be forwarded to bpmn-js eventually
      //electronApp.emit('menu:action', 'toggleTransactionBoundaries');
    }
  }];
};
