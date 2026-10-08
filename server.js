require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const API_TOKEN = process.env.API_TOKEN || 'seu-token-secreto';

app.use(cors());
app.use(express.json());

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || token !== API_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Top Sorvetes API rodando!' });
});

app.post('/routes/create', authenticate, (req, res) => {
  res.json({ success: true, message: 'Rota criada', route_id: 1 });
});

app.get('/routes/assigned', authenticate, (req, res) => {
  res.json({ success: true, routes: [] });
});

app.post('/location/update', authenticate, (req, res) => {
  res.json({ success: true, message: 'Localização atualizada' });
});

app.post('/stops/:id/complete', authenticate, (req, res) => {
  res.json({ success: true, message: 'Parada concluída' });
});

app.get('/dashboard/today', authenticate, (req, res) => {
  res.json({
    success: true,
    metrics: {
      total_routes: 0,
      completed_stops: 0,
      active_drivers: 0
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
});
