import { APIErrorCode, ClientErrorCode, isNotionClientError } from "@notionhq/client"
import { NotionDatabaseAPI } from "../interfaces/database.interface"

const { Client } = require("@notionhq/client")

// Initializing a client
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

/**
 * Retrieves all tasks from the Notion database.
 *
 * @return {Promise<any>} A promise that resolves to the data containing all tasks.
 * @throws {NotionClientError} If there is an error communicating with the Notion API.
 */
export const getAllTask = async (): Promise<any> => {
    try {
        const data = await notion.databases.query({
            database_id: "b11b2142740644918c1945bfc0a91bea"
        })

        return data;
    } catch (error: unknown) {
        if (isNotionClientError(error)) {
            // error is now strongly typed to NotionClientError
            switch (error.code) {
                case ClientErrorCode.RequestTimeout:
                    // ...
                    break
                case APIErrorCode.ObjectNotFound:
                    // ...
                    break
                case APIErrorCode.Unauthorized:
                    // ...
                    break
                // ...
                default:
                    // you could even take advantage of exhaustiveness checking
                    console.error(error.code)
                    break
            }
        }
    }
}

export const getTasksNotCompleted = async (): Promise<NotionDatabaseAPI | null> => {
    try {
        const filter = {
            or: [
                // Filtrado por acciones
                {
                    and: [
                        {
                            property: "Check",
                            checkbox: {
                                equals: false
                            }
                        },
                        {
                            property: "Fecha Limite",
                            date: {
                                on_or_before: new Date()
                            }
                        },
                        {
                            property: 'Tipo',
                            select: {
                                equals: '✅ Accionable',
                            },
                        },
                    ],
                },
                // Filtrado por recordatorios
                {
                    and: [
                        {
                            property: "Check",
                            checkbox: {
                                equals: false
                            }
                        },
                        {
                            property: "Fecha Limite",
                            date: {
                                on_or_before: new Date()
                            }
                        },
                        {
                            property: 'Tipo',
                            select: {
                                equals: '📩 Recordatorio',
                            },
                        },
                    ],
                },
            ],
        }

        const databaseId = "b11b2142740644918c1945bfc0a91bea"
        const data = await notion.databases.query({
            database_id: databaseId,
            filter
        })
        return data;
    } catch (error: unknown) {
        if (isNotionClientError(error)) {
            // error is now strongly typed to NotionClientError
            switch (error.code) {
                case ClientErrorCode.RequestTimeout:
                    // ...
                    break
                case APIErrorCode.ObjectNotFound:
                    // ...
                    break
                case APIErrorCode.Unauthorized:
                    // ...
                    break
                // ...
                default:
                    // you could even take advantage of exhaustiveness checking
                    console.error(error.code)
                    break
            }
        }
        return null
    }
}