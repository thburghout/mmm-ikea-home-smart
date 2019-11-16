# Ikea Home Smart - Magic Mirror Module

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

Uses the npm package [ikea-tradfri](https://www.npmjs.com/package/ikea-tradfri) 
to provide some rudimentary actions.

## Installation

```Shell
cd ~/MagicMirror/modules
git clone https://github.com/thburghout/mmm-ikea-home-smart.git
cd mmm-ikea-home-smart
npm install
```

Next, you are going to have to obtain the credentials to control the devices 
through the Tradfri gateway. 
These can be obtained via the `setup.js` script.

1. Make sure that your gateway has a **static ip address** configured in your router.
   * Please see your router's manual on how to do that.
     The gateway can be recognized by its name starting with `GW-`.
2. Obtain the gateway's identity by scanning the QR code on the bottom of the gateway. 
   It contains a string containing the MAC address and the identity separated by a comma. 
   **You only need the identity**.
3. Run the setup script using `node setup.js`.
4. Provide the address and identity when prompted.
5. Add the given configuration parameters to `config.js` as shown below.


## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: "mmm-ikea-home-smart",
            config: {
                identity: {
                    identity: "tradfri_9999999999999",
                    psk: "abcdefghijklmnop",
                },
                host: "192.168.1.103",
                location: {
                    latitude: 52.0,
                    longitude: 6.0,
                }
            }
        }
    ]
}
```

## Configuration options

| Option     | Description
|------------|-----------
| `identity` | *Required* credentials used for authenticating to the Tradfri Gateway. See Installation.
| `host`     | *Required* address to reach the gateway on.
| `deviceMatchString` | *Optional* devices whose name contain this string are considered lights when turning all lights on or off. <br><br> **Type:** `string`<br>**Default:** `"light"`
| `location` | *Required* for location based sunset estimation.

## Notification interface

This module is controlled via notifications.
These are listed below.
Please note that "all available lights" are the devices which have `config.deviceMatchString`
(default: `light`) in their name.

| Notification | Payload type | Description |
|--------------|--------------|-------------|
| `IKEA_HOME_SMART_SWITCH_LIGHTS` | `bool` | Turns on/off all available lights.
| `IKEA_HOME_SMART_SWITCH_LIGHTS_IF_DARK` | - | Turns on all available lights **if** the sun is currently set. 

# Future features & known issues

* Command registration for control via Telegram or other command users.
* Currently does not keep track of changes in lights and other devices.
