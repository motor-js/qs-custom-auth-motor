import { useState } from 'react'
const enigma = require("enigma.js");
const schema = require("enigma.js/schemas/12.170.2.json");

const useConnect = () => {

    // Your Sense Enterprise installation hostname:
    const engineHost = 'localhost';
    // Make sure the port below is accessible from the machine where this example
    // is executed. If you changed the QIX Engine port in your installation, change this:
    const enginePort = 4848;
    // Change this to an existing app id on your Qlik site
    const appId = 'Wine Analysis.qvf';
    // The Sense Enterprise-configured user directory for the user you want to identify
    // as:
    const userDirectory = 'your-sense-user-directory';
    // The user to use when creating the session:
    const userId = 'your-sense-user';
    // Path to a local folder containing the Sense Enterprise exported certificates:
    const certificatesPath = './';
    // Helper function to read the contents of the certificate files:

    const [engine, setEngine] = useState(() => {
        (async () => {
            const session = enigma.create({
                schema,
                // ws for http / wss for https
                url: `ws://${engineHost}:${enginePort}/app/${appId}`,
                createSocket: url => new WebSocket(url)
            
                // See below for certificate example. when connecting to the Websocket
                /*createSocket: (url) => new WebSocket(url, {
                    ca: [readCert('root.pem')],
                    key: readCert('client_key.pem'),
                    cert: readCert('client.pem'),
                    headers: {
                    'X-Qlik-User': `UserDirectory=${encodeURIComponent(userDirectory)}; UserId=${encodeURIComponent(userId)}`,
                    },
                }),*/
                });
            
                session.on("suspended", () => {
                    console.warn("Captured session suspended");
                });

                session.on("error", () => {
                    console.warn("Captured session error");
                });

                session.on("closed", () => {
                    console.warn("Session was closed");
              });

              const _global = await session.open();
              const _doc = await _global.openDoc(appId);
              setEngine(_doc);
        })();
    }, [])
    
    return { engine }
}

export default useConnect