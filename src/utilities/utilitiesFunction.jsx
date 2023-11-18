export const formatDateTime = (e) => {
    const value = new Date(e);
    console.log("value", value);
    const year = value.getFullYear()
    const day = value.getDate();
    const month = value.getMonth();
    const hours = value.getHours();
    const minutes = value.getMinutes();
    return `${year}/${month}/${day} ${hours}:${minutes}`
    }