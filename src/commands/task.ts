import { Context } from 'telegraf';
import createDebug from 'debug';

import { author, name, version } from '../../package.json';
import { formatDate } from '../core/utils';
import { getTasksForTomorrow, getTasksNotCompleted } from '../service';

const debug = createDebug('bot:about_command');

/**
 * Retrieves today's tasks from the server and sends a message with the list of tasks to the given context.
 *
 * @param {Context} ctx - The context object used to send the message.
 * @return {Promise<void>} A promise that resolves when the message is sent.
 */
const showTodayTasks = async (ctx: Context): Promise<void> => {
    try {
        const data = await getTasksNotCompleted()
        if (!data) {
            ctx.reply("No hay tareas pendientes")
            return
        }
        const tasks = data.results.map((task) => {
            return {
                task: task.properties,
                url: task.url
            }
        })

        const tasksToShow = tasks.map((task, index) => {
            const limitDate = formatDate(task.task['Fecha Limite'].date?.start)

            return `TAREA: ${index + 1}
      NOMBRE: ${task.task['Nombre'].title[0].plain_text}
      FECHA LIMITE: ${limitDate}
      TIPO: ${task.task['Tipo'].select?.name}
      PRIORIDAD: ${task.task['Prioridad'].select?.name.toLocaleUpperCase()}
      URL: ${task.url}`
        })

        const message = `Total tareas pendientes: ${tasks.length}\n
    ${tasksToShow.join('\n\n')}`

        ctx.reply(message)
    } catch (error) {
        ctx.reply("Ocurrió un error al cargar las tareas pendientes")
    }
}

const showTomorrowTasks = async (ctx: Context): Promise<void> => {
    try {
        const data = await getTasksForTomorrow()
        if (!data) {
            ctx.reply("No hay tareas pendientes")
            return
        }
        const tasks = data.results.map((task) => {
            return {
                task: task.properties,
                url: task.url
            }
        })

        const tasksToShow = tasks.map((task, index) => {
            const limitDate = formatDate(task.task['Fecha Limite'].date?.start)

            return `TAREA: ${index + 1}
      NOMBRE: ${task.task['Nombre'].title[0].plain_text}
      FECHA LIMITE: ${limitDate}
      TIPO: ${task.task['Tipo'].select?.name}
      PRIORIDAD: ${task.task['Prioridad'].select?.name.toLocaleUpperCase()}
      URL: ${task.url}`
        })

        const message = `Total tareas pendientes: ${tasks.length}\n
    ${tasksToShow.join('\n\n')}`

        ctx.reply(message)
    } catch (error) {
        ctx.reply("Ocurrió un error al cargar las tareas pendientes")
    }
}

export { showTodayTasks, showTomorrowTasks };
