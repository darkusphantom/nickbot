import { Telegraf } from 'telegraf';

import { about, showTodayTasks } from './commands';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';
import { welcomeMessage } from './commands/start';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf(BOT_TOKEN);

bot.start(welcomeMessage)
bot.command('about', about());
bot.command('task_today', showTodayTasks)

bot.on('message', () => {
  console.log("App is running");
});


//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
