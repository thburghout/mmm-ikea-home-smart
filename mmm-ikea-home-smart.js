Tradfri = require('ikea-tradfri');

Module.register("ikea-home-smart", {
    defaults: {
        deviceMatchString: 'light',
    },

    start: function() {
        this.tradfri = new Tradfri(this.config.host, this.config.identity);
        this.tradfri.connect().then(this.onConnect).catch(Log.error)
    },

    onConnect: function () {
        Log.info('Connected to IKEA Tradfri HUB');
    },

    notificationReceived: function(notification, payload, sender) {
        if (notification in this.notificationHandlers) {
            this.notificationHandlers[notification](payload);
        }
    },

    notificationHandlers: {
        'IKEA_HOME_SMART_SWITCH_LIGHTS': this.switchLights,
    },

    switchLights: function(on) {
        this.tradfri.devices.forEach(function (d) {
            if (d.name.toLowerCase().includes(this.config.deviceMatchString)) {
                d.switch(on)
            }
        });
    }
});
