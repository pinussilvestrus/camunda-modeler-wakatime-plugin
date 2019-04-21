'use strict';
/* global window */

const applicationLog = require('../helper').applicationLog;
const sendHeartbeat = require('../helper').sendHeartbeat;

function BpmnWakatimePlugin(eventBus, canvas) {
  this._canvas = canvas;

  const self = this;

  const apiKey = window.wakatimeApiKey;

  // send on several modeling event
  eventBus.on([
    'connect.start', 'connect.end', 'shape.added',
    'element.click', 'drag.start'
  ], function(event) {
    const root = self._canvas.getRootElement();

    const entity = root.id;

    if (!apiKey) {
      return;
    }

    const options = {
      apiKey: apiKey,
      entity: entity,
      time: new Date()
    };

    sendHeartbeat(options);

    applicationLog({
      message: `Sent heartbeat to Wakatime, timestamp: ${options.time}, entity ${options.entity}`,
      type: 'info'
    });

  });
}

BpmnWakatimePlugin.$inject = [
  'eventBus',
  'canvas'
];

module.exports = {
  __init__: [ 'wakatimePlugin' ],
  wakatimePlugin: [ 'type', BpmnWakatimePlugin ]
};