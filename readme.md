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

 