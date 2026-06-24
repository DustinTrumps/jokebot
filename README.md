Slack Joke Bot

A simple Slack bot built with Node.js, node-cron, and a JokeAPI.

Features
/jokebot-ping -Check if the bot is online and return the response time
/jokebot-joke-1p - Get a random one-part joke.
/jokebot-joke-2p - a random two-part joke.
Daily joke sent automatically to #bot-spam at 9am PST

using it for yourself
git clone https://github.com/DustinTrumps/jokebot

cd jokebot
npm install

Create a .env file:

SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-token
Starting the Bot

Run:

node index.js
or

nano /etc/systemd/system/slackbot.service. and past this:

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

quick comands

systemctl start slackbot.service
systemctl stop slackbot.service
systemctl restart slackbot.service
systemctl status slackbot.service

Joke API

https://jokeapi.dev/

Filtered categories:

NSFW
Religious
Political
Racist
Sexist
Explicit