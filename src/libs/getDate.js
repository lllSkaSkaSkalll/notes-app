export const getDate = () => {
    const today = new Date();

    // Today's date
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const todayDate = `${yyyy}-${mm}-${dd}`;

    // Next year date
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    const ddNextYear = String(nextYear.getDate()).padStart(2, "0");
    const mmNextYear = String(nextYear.getMonth() + 1).padStart(2, "0");
    const yyyyNextYear = nextYear.getFullYear();
    const nextYearDate = `${yyyyNextYear}-${mmNextYear}-${ddNextYear}`;

    return { todayDate, nextYearDate };
};
