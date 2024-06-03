import { Context } from "telegraf";
import { formatDate } from "../core/utils";
import { getTrackHabitsThisWeek } from "../service/track-habits";

const showHabitsOnThisWeek = async (ctx: Context): Promise<void> => {
    try {
        const data = await getTrackHabitsThisWeek()
        if (!data) {
            ctx.reply("No hay hàbitos por seguir en esta semana")
            return
        }
        const properties = data.results.map((task) => ({
            task: task.properties,
            url: task.url
        }));
        console.log(properties)
        // const habits = properties.map((property, index) => {
        //     const taskName = property.task['Nombre'].title[0].plain_text
        //     const workout = property.task['Ejercicio'].select?.name.toLocaleUpperCase()

        //     return `${index + 1}. ${taskName} Ejercicios(${})`
        // })

        // const message = `Hábitos:\n\n${habits.join('\n\n')}`

        ctx.reply("message")
    } catch (error) {
        ctx.reply("Ocurrió un error al cargar las tareas pendientes")
    }
}

export { showHabitsOnThisWeek }