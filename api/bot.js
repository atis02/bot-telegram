const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const token = 7511051052:AAHJoeZu1_GattzI18hrS3F9h1ZJRQp2qDE;
const bot = new TelegramBot(token);

bot.setWebHook(`${process.env.BOT_URL}/api/bot`);

module.exports = (req, res) => {
  if (req.method === "POST") {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const options = {
    reply_markup: {
      inline_keyboard: [[{ text: "Send Photo", callback_data: "send_photo" }]],
    },
  };

  bot.sendMessage(chatId, "Click the button to receive a photo:", options);
});

bot.on("callback_query", (callbackQuery) => {
  const message = callbackQuery.message;
  const data = callbackQuery.data;

  if (data === "send_photo") {
    bot.sendPhoto(
      message.chat.id,
      "https://i.postimg.cc/fy9j3wZw/1704795878786-1704795856319.jpg",
      {
        caption: "Here is your photo!",
      }
    );
  }
});
