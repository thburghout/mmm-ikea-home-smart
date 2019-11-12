const readline = require('readline');
Tradfri = require('ikea-tradfri');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Tradfri ip address or hostname: ", (address => {
    rl.question("Identity (found in the QR code): ", (identity => {
        let tradfri = new Tradfri(address, identity);
        tradfri.connect()
            .then (credentials => {
                const config = {identity: credentials, host: address};
                console.log("Add to following to your config.js", config);
                process.exit();
            }).catch(err => {
            console.error(err);
            process.exit(1);
        });
    }));
}));
