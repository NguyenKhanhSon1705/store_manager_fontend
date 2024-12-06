function formatDate(date) {
    const d = new Date(date);
    if (isNaN(d)) return ""; // Return empty string if the date is invalid
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
export default formatDate