export const getDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    const ddTomorrow = String(today.getDate() + 1).padStart(2, "0");

    const todayDate = `${yyyy}-${mm}-${ddTomorrow}`;

    const nextYear = today.getFullYear() + 1;
    const nextYearDate = `${nextYear}-${mm}-${dd}`;

    return { todayDate, nextYearDate };
};
