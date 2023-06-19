import mqtt from "mqtt-browser";

let mqttClient = null;
const BROKER_URL = "ws://localhost:8083/mqtt";

const mqttConnection = () => {
  if (mqttClient == null) {
    const options = {
      clientId: "lc-controller_IOT",
    };

    mqttClient = mqtt.connect(BROKER_URL, options);

    mqttClient.on("connect", () => {
      console.log("-------Conexion exitosa--------");
    });

    mqttClient.on("error", (error) => {
      console.error("Error en la conexión:", error);
    });
  }

  return mqttClient;
};

export default mqttConnection;
