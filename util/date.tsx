export const getFormattedDate = (date: any) => {
    //return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+1}`;
    return date.toISOString().slice(0, 10);
}

export const getDateMinusDays = (date: any, days: any) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}