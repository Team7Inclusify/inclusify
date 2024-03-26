export function calculateTimeDifference(dateString) {
  const providedDate = new Date(dateString);
  const currentDate = new Date();
  const timeDifference = currentDate - providedDate;
  const secondsDifference = timeDifference / 1000;
  const minutesDifference = secondsDifference / 60;
  const hoursDifference = minutesDifference / 60;
  const daysDifference = hoursDifference / 24;

  if (daysDifference >= 1) {
    return (
      Math.floor(daysDifference) +
      " day" +
      (Math.floor(daysDifference) > 1 ? "s" : "") +
      " ago"
    );
  } else if (hoursDifference >= 1) {
    return (
      Math.floor(hoursDifference) +
      " hour" +
      (Math.floor(hoursDifference) > 1 ? "s" : "") +
      " ago"
    );
  } else if (minutesDifference >= 1) {
    return (
      Math.floor(minutesDifference) +
      " minute" +
      (Math.floor(minutesDifference) > 1 ? "s" : "") +
      " ago"
    );
  } else {
    return (
      Math.floor(secondsDifference) +
      " second" +
      (Math.floor(secondsDifference) > 1 ? "s" : "") +
      " ago"
    );
  }
}
