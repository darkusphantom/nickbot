import { Context } from "telegraf";
import { getTrackHabitsThisWeek } from "../service/track-habits";
import { formatEmotions } from "../core/utils";

const showTrackHabits = async (ctx: Context): Promise<void> => {
    try {
        const data = await getTrackHabitsThisWeek()
        if (!data) {
            ctx.reply("No hay hàbitos por seguir en esta semana")
            return
        }
        const properties = data.results.map((habit) => ({
            habit: habit.properties,
            url: habit.url
        }));

        const listHabits = properties.map((property, index) => {
            const day = property.habit['Nombre'].title[0].plain_text
            const workout = property.habit['Ejercicio'].checkbox ? '💪' : ''
            const eatHealthy = property.habit['Comí Saludable'].checkbox ? '🍎' : ''
            const work = property.habit['Avancé con el trabajo'].checkbox ? '💻' : ''
            const creationContent = property.habit['Creé contenido'].checkbox ? '📝' : ''
            const learnSomething = property.habit['Creé contenido'].checkbox ? '📕' : ''
            
            const status = property.habit['Status'].select?.name
            const emotion = formatEmotions(status)
            const textHabits = `${workout}${eatHealthy}${work}${creationContent}${learnSomething} | ${emotion}` 

            const date = new Date(day)
            const currentMonth = date.toLocaleString('default', { month: 'long' })
            
            if (index === 0 || currentMonth !== new Date(properties[index - 1].habit['Nombre'].title[0].plain_text).toLocaleString('default', { month: 'long' })) {
                return `\n${currentMonth}\n${day}: ${textHabits}`
            }

            return `${day}: ${textHabits}`
        })

        const message = `🗓📝 Seguimiento de Hábitos:\n${listHabits.join('\n')}`

        ctx.reply(message)
    } catch (error) {
        ctx.reply("Ocurrió un error al cargar las tareas pendientes")
        console.error("Ha ocurrido un error: ", error)
    }
}

export { showTrackHabits }