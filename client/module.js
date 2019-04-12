'use strict';
/* global window */

var sendHeartbeat = require('../helper').sendHeartbeat;

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

    // console.log("Send heartbeat for event '" + event.type + "' and definition '" + entity + "'");

    if (!apiKey) {
      return;
    }

    sendHeartbeat({
      apiKey: apiKey,
      entity: entity,
      time: new Date()
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