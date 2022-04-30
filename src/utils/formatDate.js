const formatDate = (dateTime) => {
    const event = new Date(dateTime);
    let hour = new Date(dateTime).getHours();
    let minutes = new Date(dateTime).getMinutes();

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const date = event?.toLocaleDateString("en-US", options);
    if (hour < 10) {
        hour = '0' + hour;
    } if (minutes < 10) {
        minutes = '0' + minutes;
    }
    // const endTime = (time * 25200)
    return `${hour}:${minutes} - ${date}`
}

export default formatDate;