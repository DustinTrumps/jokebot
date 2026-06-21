require("dotenv").config();
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

(async () => {
  await app.start();
  console.log("bot is running!");
})();

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