## Run Device Simulator

1. In the terminal window, run the following commands to install the required libraries and rename the file **.env-to-customize** to **.env**.

```cmd/sh
npm install
mv .env-to-customize .env
```

2. Edit the file **.env** and replace the environment variable **IOTHUB_CONNECTION_STRING** value with your device connection string.

3. In the terminal window, run the following command to run the simulated device.

```cmd/sh
node index.js
```

The terminal window displays information as it tries to connect to your hub and starts to send messages to your IoT Hub.

### Note on Protocols

A device can use any of the following protocols to connect to your IoT hub:

| Protocol | Outbound port |
| --- | --- |
| MQTT |8883 |
| MQTT over WebSockets |443 |
| AMQP |5671 |
| AMQP over WebSockets |443 |
| HTTPS |443 |

If the outbound port is blocked by a firewall, the device can't connect.
