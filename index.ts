const ping = require("ping");

const host = "www.google.com"; // Altere para o host que deseja pingar
const interval = 1000; // Intervalo entre pings em milissegundos
const pingCount = 100; // Número de pings a serem realizados antes de calcular a perda de pacotes

let sentPings = 0;
let lostPings = 0;

const pingHost = async () => {
  const res = await ping.promise.probe(host);
  sentPings++;
  if (!res.alive) {
    lostPings++;
  }
  console.log(
    `Ping to ${host}: ${res.alive ? "Alive" : "Dead"} - Time: ${res.time}ms`
  );

  if (sentPings % pingCount === 0) {
    const packetLoss = (lostPings / sentPings) * 100;
    console.log(`Packet Loss: ${packetLoss.toFixed(2)}%`);
  }
};

// Ping the host at regular intervals
setInterval(pingHost, interval);
