const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Конфигурация приложения ЮMoney
const client_id = '5732DFAC5718A315ED409BC4FBE7493272561F7EB7CF3C332EDB647F82FE82CE';
const client_secret = 'A0F698D8BDE0660E27B403107B5E727F3180896833FBD0BA953081B1B13F32F2D4073593EC8C7CF5EF9D302687E9D514256E563A3E13AB99E7C22988520B64BE';
const redirect_uri = 'https://krisrush111.github.io/HoliarusD/callback';
const recipient_phone = '+79892899957'; // Номер для перевода

// Создание платежа
app.post('/create-payment', async (req, res) => {
  const { amount, price } = req.body;

  try {
    // Создаем платеж
    const response = await axios.post('https://yoomoney.ru/api/request-payment', {
      pattern_id: 'p2p',
      to: recipient_phone,
      amount: price,
      comment: `Покупка ${amount} кристаллов`,
    }, {
      headers: {
        Authorization: `test_aXz6BE7LBgIb0WuR8dzCYa93HW_UaGTCLLqi2MeJrhs`, // Вставьте токен доступа
        'Content-Type': 'application/json',
      }
    });

    if (response.data.status === 'success') {
      res.json({ payment_url: response.data.redirect_uri });
    } else {
      res.status(400).json({ error: 'Ошибка при создании платежа' });
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Серверная ошибка' });
  }
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});

app.get('/callback', (req, res) => {
    const { status, payment_id } = req.query;
  
    if (status === 'success') {
      res.send('Платёж успешно выполнен. Спасибо за покупку!');
    } else {
      res.send('Ошибка при выполнении платежа.');
    }
  });
  