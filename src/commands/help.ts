import { Context } from "telegraf";

/**
 * Displays in the chat information about how to use the bot and available commands.
 *
 * @param {object} ctx - The context of the conversation in which the information is being displayed.
 */
const howToUseBot = async (ctx: Context) => {
    try {
        const message =
            `Este bot te ayudará a organizar tus tareas 🙂.\n\nEsta es mi lista de comandos
            /start - Inicia el bot
            /help - Muestra esta ayuda 
            /about - Muestra información sobre el creador del bot 
            /task_today - Muestra las tareas de hoy 
            /task_tomorrow - Muestra las tareas de manaña
            /task_todo - Muestra las tareas pendientes
            /task_someday - Muestra las tareas para hacer algún día
            /task_week - Muestra las tareas de la semana
            `;

        await ctx.reply(message);
    } catch (error: any) {
        console.error(error.name, error.message);
        await ctx.reply("Ha ocurrido un error");
    }
};

export { howToUseBot }