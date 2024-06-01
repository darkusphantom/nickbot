/**
 * Formats a given date into a string representation in the format "dd-mm-yyyy - hh:mm".
 *
 * @param {any} date - The date to be formatted. It can be a string, number, or Date object.
 * @return {string} The formatted date string. If the input date is falsy, it returns "No hay fecha".
 */
export const formatDate = (date: any): string => {
    if(!date) return 'No hay fecha'

    const originalDate = new Date(date);

    const day = originalDate.getDate().toString().padStart(2, '0');
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Los monthes en JavaScript empiezan en 0
    const year = originalDate.getFullYear();

    const hour = originalDate.getHours().toString().padStart(2, '0');
    const minutes = originalDate.getMinutes().toString().padStart(2, '0');

    const formattedDate = `${hour}:${minutes}  -  ${day}-${month}-${year}`;
    return formattedDate

}