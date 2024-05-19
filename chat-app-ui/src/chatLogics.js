export const getTime = (date) => {
    const dateTime = new Date(date);
    return dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toUpperCase();
}