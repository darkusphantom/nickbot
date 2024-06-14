
const errorHandlerMessage = (error: any, text: string) => {
    if (error instanceof Error) {
        console.error(error.name, error.message);
        if (error.name === "TypeError") {
            return "Ha ocurrido un TypeError"
        }

        if (error.name === "Error") {
            return "Ha ocurrido un error"
        }
    }

    return "Ha ocurrido un error inesperado";
}

export {
    errorHandlerMessage
}