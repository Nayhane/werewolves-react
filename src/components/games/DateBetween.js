let DateBetween = function(startDate, endDate) {
  let second = 1000;
  let minute = second * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let distance = endDate - startDate;

  if (distance < 0) {
    return false;
  }

  let days = Math.floor(distance / day);
  let hours = Math.floor((distance % day) / hour);
  let minutes = Math.floor((distance % hour) / minute);
  let seconds = Math.floor((distance % minute) / second);


  let between = [];

  if (days > 0 ) {
    between.push(`${days} day${days > 1 ? 's' : ''}`)
  }

  if (hours > 0 ) {
    between.push(`${hours} hour${hours > 1 ? 's' : ''}`)
  }

  if (minutes > 0 ) {
    between.push(`${minutes} minute${minutes > 1 ? 's' : ''}`)
  }

  if (seconds > 0 ) {
    between.push(`${seconds} second${seconds > 1 ? 's' : ''}`)
  }

  return between
}

module.exports = DateBetween;
