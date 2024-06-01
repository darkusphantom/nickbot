import { APIErrorCode, ClientErrorCode, isNotionClientError } from "@notionhq/client"
import { NotionDatabaseAPI } from "../interfaces/database.interface"
import { getTomorrowDate } from "../core/utils"

const { Client } = require("@notionhq/client")

// Initializing a client
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

/**
 * Retrieves tasks that are not completed from the Notion database.
 *
 * @return {Promise<NotionDatabaseAPI | null>} A promise that resolves with the data of the tasks or null if an error occurs.
 */
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

        const sorts = [
            {
                "property": "Fecha Limite",
                "direction": "ascending"
            }
        ]

        const databaseId = "b11b2142740644918c1945bfc0a91bea"
        const data = await notion.databases.query({
            database_id: databaseId,
            filter,
            sorts
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

export const getTasksForTomorrow = async (): Promise<NotionDatabaseAPI | null> => {
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
                                equals: getTomorrowDate()
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
                                equals: getTomorrowDate()
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

        const sorts = [
            {
                "property": "Fecha Limite",
                "direction": "ascending"
            }
        ]

        const databaseId = "b11b2142740644918c1945bfc0a91bea"
        const data = await notion.databases.query({
            database_id: databaseId,
            filter,
            sorts
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
