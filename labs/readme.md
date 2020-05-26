# Get connection string:
In the Shared access policies blade, click the iothubowner policy, and then copy and make note of the IoT Hub connection string

HostName=rfpiot.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=if0/vHAE3e0fJrDiNbjO71LMcKc+7PkSPobLuxLo2NI=

# Init project

npm init

npm install azure-iot-device azure-iot-device-mqtt --save

# Develop SimulatedDevice.js

# Run it

node SimulatedDevice.js