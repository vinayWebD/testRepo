import moment from 'moment';

const timeSpan = (from) => {
  let duration = moment.duration(moment().diff(from));
  let minuteDiff = duration.asMinutes();
  let hoursDiff = duration.asHours();
  minuteDiff = parseInt(minuteDiff);
  hoursDiff = parseInt(hoursDiff);
  if (minuteDiff < 1) {
    return 'just now';
  } else if (minuteDiff >= 1 && minuteDiff < 60) {
    return `${minuteDiff} min ago`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff} ${hoursDiff > 1 ? 'hrs' : 'hr'} ago`;
  } else {
    return moment(from).format('DD MMMM YYYY');
  }
};

export default timeSpan;
