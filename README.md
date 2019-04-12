# camunda-modeler-wakatime-plugin
[Wakatime](https://wakatime.com) Plugin for the [Camunda Modeler](https://github.com/camunda/camunda-modeler)

[![Compatible with Camunda Modeler version 3.0](https://img.shields.io/badge/Camunda%20Modeler-3.0+-blue.svg)](https://github.com/camunda/camunda-modeler)

## How to use

1. Download and copy this repository into the `plugins` directory of the Camunda Modeler
2. Start the Camunda Modeler
3. When an API-Key is added, the application will start sending activity heartbeats to Wakatime


## Compatibility Notice

Due to the flag loading, this plug-in is compatible with Camunda Modeler `v3.0+`.

## Building

Install dependencies:

```sh
npm install
```

Package plugin to `client/client-bundle.js`:

```sh
npm run bundle

# or

npm run bundle -- --watch
```


## Adding Wakatime API-Key

Before the application will send heartbeats to Wakatime, you will have to add an [API-Key](https://wakatime.com/faq#api-key) inside your local `flags.json`

```json
{
    "wakatime-api-key": "YOUR_API_KEY"
}
```


## Additional Resources

* [Flags documentation](https://github.com/camunda/camunda-modeler/tree/master/docs/flags)
* [Plugins documentation](https://github.com/camunda/camunda-modeler/tree/master/docs/plugins)


## Licence

MIT

