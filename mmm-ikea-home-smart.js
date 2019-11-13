
Module.register("ikea-home-smart", {
    defaults: {
        deviceMatchString: 'light',
    },

    start: function() {
        this.sendSocketNotification('START', this.config);
    },
});
