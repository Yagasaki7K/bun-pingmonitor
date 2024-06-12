const ping = require("ping");

const host = "www.google.com.br"; // Altere para o host que deseja pingar
const interval = 1000; // Intervalo entre pings em milissegundos

let sentPings = 0;
let lostPings = 0;

const pingHost = async () => {
  const res = await ping.promise.probe(host);
  sentPings++;

  if (!res.alive) {
    lostPings++;
  }

  const packetLoss = (lostPings / sentPings) * 100;
  console.log(
    `${
      res.alive ? "🟢" : "🔴"
    } Ping to ${host} | Packet Loss: ${packetLoss.toFixed(2)}% | Ping: ${
      res.time
    }ms`
  );
};

// Ping the host at regular intervals
setInterval(pingHost, interval);
