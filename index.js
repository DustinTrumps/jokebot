require("dotenv").config();
const cron = require("node-cron");
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/jokebot-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
  console.log(latency);
});

app.command("/jokebot-joke-2p", async ({ ack, respond }) => {
  await ack();
  const jokeData = await getJOKE('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart');
  if (!jokeData) {
    await respond("sorry, I could not get a joke at this time.");
  } else {
    await respond({ text: `${jokeData.setup}\n${jokeData.delivery}` });
  }
});

app.command("/jokebot-joke-1p", async ({ ack, respond }) => {
  await ack();
  const jokeData = await getJOKE('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single');
  if (!jokeData) {
    await respond("sorry, I could not get a joke at this time.");
  } else {
    await respond({ text: `${jokeData.joke}` });
  }
});

async function getJOKE(JOKEurl) {
  try {
    const response = await fetch(JOKEurl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error.message);
    return null;
  }
}

cron.schedule(
  "0 9 * * *",
  async () => {
    try {
      const jokeData = await getJOKE(
        "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
      );

      await app.client.chat.postMessage({
        channel: "C0P5NE354",
        text: "Good morning! Here's your daily joke:\n" + jokeData.joke
      });

      console.log("Message sent");
    } catch (err) {
      console.error(err);
    }
  },
  {
    timezone: "America/Los_Angeles"
  }
);

(async () => {
  await app.start();
  console.log("bot is running!");
})();