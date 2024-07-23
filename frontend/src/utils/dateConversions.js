export const unixEpochToDateTime = (epochTime) => {
    const date = new Date(Number(epochTime) * 1000);
    const formattedDateTime = date.toISOString().slice(0, 16).replace('T', ' ');
    return formattedDateTime;
}

export const convertToUnixEpoch = (datestr) => {
    const unixEpochTimestamp = new Date(datestr).getTime();
    if (isNaN(unixEpochTimestamp)) {
        throw new Error('Invalid input. dateTimeString must be a valid datetime string.');
    }
    const unixEpochString = (unixEpochTimestamp / 1000).toString();
    console.log(typeof unixEpochString)
    return unixEpochString;
}