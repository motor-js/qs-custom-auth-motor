import { useState } from 'react'
const enigma = require("enigma.js");
const schema = require("enigma.js/schemas/12.170.2.json");
const fs = require('fs');
const path = require('path');

const useConnect = () => {

    // INSERT CUSTOM CONNECTION LOGIC TO CONNECT TO YOUR QLIK SENSE ENTERPRISE SITE...

    const [engine, setEngine] = useState(() => {
        (async () => {
            const session = enigma.create({
                schema,
                // ws for http / wss for https
                url: `ws://${engineHost}:${enginePort}/app/${appId}`,
                createSocket: url => new WebSocket(url)
     
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
