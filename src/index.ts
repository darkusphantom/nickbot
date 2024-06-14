import { Telegraf } from 'telegraf';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';
import { showTrackHabits } from './commands/habits';
import { welcomeMessage } from './commands/start';
import { howToUseBot } from './commands/help';
import { showTasksSomeday, showTasksToBeDone, showTodayTasks, showTomorrowTasks } from './commands/task';
import { about } from './commands/about';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf(BOT_TOKEN);
bot.start((ctx) => ctx.reply('Welcome'));

bot.start(welcomeMessage)
bot.help(howToUseBot)
bot.command('about', about());
bot.command('task_today', showTodayTasks)
bot.command('task_tomorrow', showTomorrowTasks)
bot.command('task_todo', showTasksToBeDone)
bot.command('task_someday', showTasksSomeday)

bot.command('list_habits', showTrackHabits)

bot.on('message', () => {
  console.log("App is running");
});

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
