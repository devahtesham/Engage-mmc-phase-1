const dateFormatter = () => {
    let inputDate = "2023-09-07"
    // Parse the input date into a JavaScript Date object
    const parsedDate = new Date(inputDate);

    // Set the time to 06:34:02.148 and timezone to UTC
    parsedDate.setUTCHours(6);
    parsedDate.setUTCMinutes(34);
    parsedDate.setUTCSeconds(2);
    parsedDate.setUTCMilliseconds(148);

    // Format the parsed date in the desired format "2023-09-09T06:34:02.148Z"
    const formattedDate = parsedDate.toISOString();
    return formattedDate
}   

export {dateFormatter}
