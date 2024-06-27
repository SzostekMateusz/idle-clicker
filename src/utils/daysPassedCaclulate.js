export const calculateDaysPassed = (startDate, currentDate) => {
    return Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
};
