const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');


const app = express();
const port = 3030;

app.use(express.json());

app.use(cors());


const portfolio = [
  { symbol: 'AAPL', shares: 50, price: 150 },
  { symbol: 'GOOGL', shares: 10, price: 2800 },
  { symbol: 'AMZN', shares: 5, price: 3500 }
];

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Investment Portfolio API',
      version: '1.0.0',
      description: 'API para gerenciar carteiras de ações',
      contact: {
        name: 'Empresa de Investimentos',
      },
      servers: ['http://localhost:8080'],
    },
  },
  apis: ['./app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /portfolio:
 *   get:
 *     summary: Retorna a carteira de ações
 *     responses:
 *       200:
 *         description: Lista de ações na carteira
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   symbol:
 *                     type: string
 *                   shares:
 *                     type: integer
 *                   price:
 *                     type: number
 *                     format: float
 *   post:
 *     summary: Adiciona uma nova ação à carteira
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symbol:
 *                 type: string
 *               shares:
 *                 type: integer
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Ação adicionada à carteira
 *       400:
 *         description: Dados da ação inválidos
 */

/**
 * @swagger
 * /healthcheck:
 *   get:
 *     summary: Verifica o estado da aplicação
 *     responses:
 *       200:
 *         description: Aplicação está saudável
 */

app.get('/portfolio', (req, res) => {
  res.json(portfolio);
});

app.post('/portfolio', (req, res) => {
  const newStock = req.body;

  if (newStock.symbol && newStock.shares && newStock.price) {
    
    portfolio.push(newStock)
    res.status(201).send('Ação adicionada à carteira!');
  } else {
    res.status(400).send('Dados da ação inválidos!');
  }
});

app.get('/health', (req, res) => {
  res.send('Aplicação está saudável!');
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
