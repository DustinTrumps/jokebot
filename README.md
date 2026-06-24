# Slack Joke Bot

A simple Slack bot built with Node.js, node-cron, and JokeAPI.

## Features

- **/jokebot-ping** - Check if the bot is online and return the response time.
- **/jokebot-joke-1p** - Get a random one-part joke.
- **/jokebot-joke-2p** - Get a random two-part joke.
- Daily joke sent automatically to **#bot-spam** at 9:00 AM PST.

## Using It Yourself

```bash
git clone https://github.com/DustinTrumps/jokebot
cd jokebot
npm install
```

### Create a .env file

```env
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-token
```

## Starting the Bot

Run:

```bash
node index.js
```

Or, to run it as a persistent systemd service:

```bash
nano /etc/systemd/system/slackbot.service
```

Paste this:

```ini
[Unit]
Description=Slack Bot
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=root
Restart=always
RestartSec=5
WorkingDirectory=/root/jokebot
ExecStart=/usr/bin/node index.js

[Install]
WantedBy=multi-user.target
```

> **Note:** Running as `User=root` works but isn't best practice for an internet-facing process. Consider creating a dedicated low-privilege user (e.g. `useradd -r -s /usr/sbin/nologin jokebot`) and updating `User=` and `WorkingDirectory=` accordingly.

## Quick Commands

```bash
systemctl start slackbot.service
systemctl stop slackbot.service
systemctl restart slackbot.service
systemctl status slackbot.service
```

## Joke API

[https://jokeapi.dev/](https://jokeapi.dev/)

## Filtered Categories

- NSFW
- Religious
- Political
- Racist
- Sexist
- Explicit