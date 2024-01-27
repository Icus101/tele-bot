require("dotenv").config();
const express = require("express");

const path = require("path");
const port = process.env.PORT || 4040;
const axios = require("axios");

const app = express();
app.use(express.static("static"));
app.use(express.json());
const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);
// app.use(bot.webhookCallback(`api.telegram.org/bot6871097105:AAGkZhB_e3E2RWJrh_sCH920ZRWKa7-rV-U/setWebhook?uri=https://8bfa-102-88-35-178.ngrok-free.app`))

// bot.telegram.setWebhook(`api.telegram.org/bot6871097105:AAGkZhB_e3E2RWJrh_sCH920ZRWKa7-rV-U/setWebhook?uri=https://8bfa-102-88-35-178.ngrok-free.app`)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

bot.command("start", (ctx) => {
  console.log(ctx.from);
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Hello there! Welcome to the Code Capsules telegram bot.\nI respond to /ethereum. Please try it",
    {}
  );
});

bot.command("ethereum", (ctx) => {
  let rate;
  console.log(ctx.from);
  axios
    .get(
      `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
    )
    .then((response) => {
      console.log(response.data);
      rate = response.data.ethereum;
      const message = `Hello, today the ethereum price is ${rate.usd}USD`;
      bot.telegram.sendMessage(ctx.chat.id, message, {});
    });
});

// Define a catch-all command handler for invalid commands
bot.on("text", (ctx) => {
  const command = ctx.message.text;
  if (command.startsWith("/")) {
    ctx.reply("Command not found. Try /eat to enjoy a meal.");
  }
});

bot.launch({
  webhook: {
    domain: "https://5a31-102-88-35-82.ngrok-free.app",
    port: 4040,
  },
});

// app.listen(port, () => console.log(`Listening on ${port}`));
