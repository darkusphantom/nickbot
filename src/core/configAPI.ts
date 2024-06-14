const { Client } = require("@notionhq/client")

// Initializing a client
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

const getDBIDTasks = () => {
    try {
        const databaseId = process.env.DB_TASK_ID
        if (!databaseId) {
            console.error("No se encontro la ID de la base de datos")
            return null
        }
        return databaseId
    } catch (error) {
        console.error("Error al obtener la ID de la base de datos:", error);
        return null
    }
}

export { notion, getDBIDTasks }