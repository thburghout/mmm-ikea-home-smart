
Module.register("mmm-ikea-home-smart", {
    defaults: {
        deviceMatchString: 'light',
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        this.sendSocketNotification('START', this.config);
    },

    notificationReceived: function(notification, payload) {
        this.sendSocketNotification('HANDLE_NOTIFICATION', {
            notification: notification,
            payload: payload
        });
    },
});
