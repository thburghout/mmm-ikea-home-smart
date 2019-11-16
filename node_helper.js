NodeHelper = require("node_helper");
Tradfri = require("ikea-tradfri");
const { getSunrise, getSunset } = require('sunrise-sunset-js');

module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting" + this.name);
        this.socketNotificationHandlers = {
            "START": this.connectToTradfri.bind(this),
            "HANDLE_NOTIFICATION": this.notificationReceived.bind(this),
        };

        this.notificationHandlers = {
            'IKEA_HOME_SMART_SWITCH_LIGHTS': this.switchLights.bind(this),
            'IKEA_HOME_SMART_SWITCH_LIGHTS_IF_DARK': this.switchLightsIfDark.bind(this),
        };
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification in this.socketNotificationHandlers) {
            this.socketNotificationHandlers[notification](payload);
        }
    },

    connectToTradfri: function(config) {
        console.log(this.name + ": starting...");
        this.config = config;
        this.tradfri = new Tradfri(this.config.host, this.config.identity);
        this.tradfri.connect().then(this.onConnect.bind(this)).catch(console.error);
    },

    onConnect: function () {
        console.log(this.name  + ': Connected to IKEA Tradfri HUB');
    },

    notificationReceived: function(payload) {
        let notification = payload.notification;
        payload = payload.payload;
        if (notification in this.notificationHandlers) {
            this.notificationHandlers[notification](payload);
        }
    },

    switchLights: function(on) {
        console.log(`${this.name} toggled lights ${on ? 'on' : 'off'} (${new Date(Date.now()).toLocaleString()})`);
        this.tradfri.devices.forEach(device => {
            if (device.name.toLowerCase().includes(this.config.deviceMatchString)) {
                device.switch(on);
            }
        });
    },

    switchLightsIfDark: function () {
        const now = new Date(Date.now());
        const pos = this.config.location;
        if (now > getSunset(pos.latitude, pos.longitude) || now < getSunrise(pos.latitude, pos.longitude)) {
            this.switchLights(true);
        }
    }
});