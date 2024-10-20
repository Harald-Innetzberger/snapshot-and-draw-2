/* Date formatting, Required format: YYYY-MM-DD_HH:MM.jpg */
const formatDate = (mTime) => {
    const dt = new Date(parseInt(mTime));
    return dt.toLocaleDateString('de-de', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });
};

export default formatDate;