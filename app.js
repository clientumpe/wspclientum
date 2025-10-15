// Importar Express.js
const express = require('express');

// Crear una aplicación Express
const app = express();

// Middleware para analizar cuerpos JSON
app.use(express.json());

// Establecer puerto y token de verificación
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN || 'clientum_token_2025'; // puedes definirlo fijo o como variable de entorno

// Ruta para solicitudes GET (verificación del webhook)
app.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const challenge = req.query['hub.challenge'];
  const token = req.query['hub.verify_token'];

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('✅ WEBHOOK VERIFICADO');
    res.status(200).send(challenge);
  } else {
    console.log('❌ ERROR DE VERIFICACIÓN');
    res.sendStatus(403);
  }
});

// Ruta para solicitudes POST (eventos del webhook)
app.post('/', (req, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n📩 Webhook recibido ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));

  res.status(200).end();
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`\n🚀 Servidor escuchando en el puerto ${port}\n`);
});
