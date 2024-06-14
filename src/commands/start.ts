import { Context } from "telegraf";
import { errorHandlerMessage } from "../core/errorHandler";

/**
 * Displays in the chat information about the settings.
 *
 * @param {Context} ctx - The context of the conversation in which the information is being displayed.
 */
const welcomeMessage = async (ctx: Context) => {
    try {
        const username = `${ctx.message?.from.first_name} ${ctx.message?.from.last_name}`;
        const message =
            `Saludos, ${username}!
            
            Mi nombre es Nick y seré tu ayudante para organizar tus tareas. Puedes contactarme a través de mis comandos.

            No olvides revisar los comandos en /help. 🙂`;

        await ctx.reply(message);
    } catch (error: unknown) {
        const messageError = errorHandlerMessage(error, "error.default");
        await ctx.reply(messageError);
    }
};

export { welcomeMessage };