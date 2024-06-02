import { Context } from 'telegraf';
import createDebug from 'debug';

import { formatDate } from '../core/utils';
import { getTasksForTomorrow, getTasksNotCompleted, getTasksSomeday, getTasksToBeDone } from '../service';

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
            const taskName = task.task['Nombre'].title[0].plain_text
            
            return `${index + 1}. ${taskName} (${task.task['Prioridad'].select?.name.toLocaleUpperCase()}) | ${limitDate}`
        })

        const message = `Total tareas pendientes: ${tasks.length}\n\n${tasksToShow.join('\n\n')}`

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
        const tasks = data.results.map((task) => ({
            task: task.properties,
            url: task.url
        }))

        const tasksToShow = tasks.map((task, index) => {
            const limitDate = formatDate(task.task['Fecha Limite'].date?.start)
            const icon = task.task['Tipo'].select?.name.at(0) === '✅' ? '✅' : '📩'
            const taskName = task.task['Nombre'].title[0].plain_text
            const prioridad = task.task['Prioridad'].select?.name.toLocaleUpperCase()

            return `${index + 1}.${icon} ${taskName} (${prioridad})
            FECHA LIMITE: ${limitDate}`
        })

        const message = `Total tareas para mañana: ${tasks.length}\n
    ${tasksToShow.join('\n\n')}`

        ctx.reply(message)
    } catch (error) {
        ctx.reply("Ocurrió un error al cargar las tareas de mañana")
    }
}

const showTasksToBeDone = async (ctx: Context): Promise<void> => {
    try {
        const data = await getTasksToBeDone()
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
            const taskName = task.task['Nombre'].title[0].plain_text
            const prioridad = task.task['Prioridad'].select?.name.toLocaleUpperCase()

            return `${index + 1}.🗒️ ${taskName} (${prioridad}) | ${limitDate}
`})

        const message = `Total tareas por hacer: ${tasks.length}\n
    ${tasksToShow.join('\n\n')}`

        ctx.reply(message)
    } catch (error) {
        ctx.reply("Ocurrió un error al cargar las tareas por hacer")
    }
}

const showTasksSomeday = async (ctx: Context): Promise<void> => {
    try {
        const data = await getTasksSomeday()
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
            const taskName = task.task['Nombre'].title[0].plain_text
            const prioridad = task.task['Prioridad'].select?.name.toLocaleUpperCase()

            return `${index + 1}.✨ ${taskName} (${prioridad}) | ${limitDate}`
        })

        const message = `Total tareas para hacer algún día: ${tasks.length}\n
    ${tasksToShow.join('\n\n')}`

        ctx.reply(message)
    } catch (error) {
        ctx.reply("Ocurrió un error al cargar las tareas para hacer algún día")
    }
}

export {
    showTodayTasks,
    showTomorrowTasks,
    showTasksToBeDone,
    showTasksSomeday
};
