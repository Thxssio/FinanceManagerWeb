const express = require('express');
const service = require('../services/transactionService.js');

const routes = express.Router();

routes.get('/', async (req, res) => {
  try {
    const { period } = req.query;

    const filter = { yearMonth: period };

    const projection = {
      _id: 0,
    };

    const transactions = await service.findAll(filter, projection);
    if (!transactions) {
      throw new Error('Does not exist transactions for period');
    }

    res.send({ Transactions: transactions });

    //logger.info(`GET /balance/:agency/:account - " /${agency}/${account}`);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

routes.post('/create', service.create);
routes.get('/findOne/:id', service.findOne);
routes.get('/findAll', service.findAll);
routes.get('/findAllMonths', service.findAllMonths);
routes.delete('/delete/:id', service.remove);
routes.put('/edit/:id', service.update);

module.exports = routes;
