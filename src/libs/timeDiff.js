export function timeDiff(date) {
  let remTime = Math.abs(Date.now() - new Date(date).getTime());
  const diffDays = Math.floor(remTime / (1000 * 60 * 60 * 24));
  remTime = Math.floor(remTime % (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(remTime / (1000 * 60 * 60));
  remTime = Math.floor(remTime % (1000 * 60 * 60));
  const diffMinutes = Math.floor(remTime / (1000 * 60));
  let result = '';
  if (diffDays > 0) result += diffDays + (diffDays === 1 ? ' day' : ' days');
  if (diffDays > 0 && (diffHours > 0 || diffMinutes > 0)) result += ', ';
  if (diffHours > 0) result += diffHours + (diffHours === 1 ? ' hour' : ' hours');
  if (diffHours > 0 && diffMinutes > 0) result += ', ';
  if (diffMinutes > 0) result += diffMinutes + (diffMinutes === 1 ? ' minute' : ' minutes');
  if (result === '') result = 'Now';
  return result;
}
