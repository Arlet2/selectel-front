export function convertDateFormat(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() +  1; // Месяцы начинаются с  0
    const year = date.getFullYear();
    return `${day}.${month <  10 ? '0' + month : month}.${year}`;
}