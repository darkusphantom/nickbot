import { APIErrorCode, ClientErrorCode, isNotionClientError } from "@notionhq/client"
import { notion } from "../core/configAPI"
import { NotionDatabaseAPI } from "../interfaces/database.interface"

export const getTrackHabitsThisWeek = async (): Promise<NotionDatabaseAPI | null> => {
    try {
        // const filter = {
        //     and: [
        //         {
        //             property: "Nombre",
        //             date: {
        //                 this_week: {}
        //             }
        //         },
        //     ],
        // }


        const sorts = [
            {
                "property": "Nombre",
                "direction": "ascending"
            }
        ]

        const databaseId = "d3583cf9edfb445a8c20124bf6ad3dc1"
        const data = await notion.databases.query({
            database_id: databaseId,
            // filter,
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