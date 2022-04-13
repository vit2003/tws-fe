const formatDate = (dateTime) => {
    const event = new Date(dateTime);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = event?.toLocaleDateString("en-EN", options);
    const time = event?.toLocaleTimeString('en', { timeStyle: 'short', hour12: false, timeZone: 'UTC' })
    return `${time} - ${date}`
}

export default formatDate;