var request = require('request-promise');

// todo(pinussilvestrus): read from package
const VERSION = '0.1.0';

function btoa(String) {
  return Buffer.from(String).toString('base64');
}

async function sendHeartbeat(options) {

  const {
    apiKey,
    project,
    time
  } = options;

  const data = {
    time: time / 1000,
    entity: 'modeling', // todo(pinussilvestrus)
    type: 'app',
    project: project,
    language: 'xml',
    plugin: `camunda-modeler-wakatime/${VERSION}`
  };

  console.log(data);

  const url = 'https://wakatime.com/api/v1/heartbeats';

  const response = await request.post({
    headers: {
      'content-type': 'application/json',
      'Authorization': `Basic ${btoa(apiKey)}`
    },
    url,
    body: JSON.stringify(data)
  });

  console.log(response);
}


module.exports = {
  sendHeartbeat
};