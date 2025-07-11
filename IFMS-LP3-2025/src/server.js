const express = require('express');
const app = express();
const port = 3000;

const itemsRoutes = require('./routes/itemsRoutes');

app.use(express.json());
app.use('/api/items', itemsRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
