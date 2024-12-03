import Ws from "App/Services/Ws";
Ws.boot();

/**
 * Listen for incoming socket connections
 */
Ws.io.on("connection", (socket) => {
  console.log("nuevo dispositivo conectado");

  let id = socket.id;
  // *OBTENER LA INFO DE LA PERSONA QUE SE CONECTÓ
  //   en el query se puede mandar info
  const { body } = socket.handshake.query;
  // *MANDAR LA INFO AL CLIENTE DE QUE SE CONECTÓ
  console.log("se conectó " + JSON.stringify(body));
  console.log("se conectó " + id);

  socket.emit("notifications", { hello: "world" });

  // socket.on('my other event', (data) => {

  // console.log(data)

  // })
});
