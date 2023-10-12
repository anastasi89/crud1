import dayjs from 'dayjs';

export const formatCreated = (date: any) => {
  const diffMinutes = (Date.now() / 1000 - dayjs(date).unix()) / 60;

  if (diffMinutes < 60) {
    return `${Math.floor(diffMinutes)} минут назад`;
  }

  if (diffMinutes < 1440) {
    return `${Math.floor(diffMinutes / 60)} часов назад`;
  }

  return `${Math.floor(diffMinutes / 1440)} дней назад`;
};
