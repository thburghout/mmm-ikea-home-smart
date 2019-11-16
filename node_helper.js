var NodeHelper = require("node_helper");
Tradfri = require("ikea-tradfri");

module.exports = NodeHelper.create({

    socketNotificationReceived: function(notification, payload) {
        if (notification === "START") {
            console.log(this.name + ": starting...");
            this.config = payload;
            this.tradfri = new Tradfri(this.config.host, this.config.identity);
            this.tradfri.connect().then(this.onConnect).catch(console.error);
        }
    },

    onConnect: function () {
        console.log(this.name  + ': Connected to IKEA Tradfri HUB');
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
        this.tradfri.devices.forEach(device => {
            if (device.name.toLowerCase().includes(this.config.deviceMatchString)) {
                device.switch(on)
            }
        });
    }
});