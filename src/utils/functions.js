export const filterOrders = (arr) => {
    return arr?.reduce(
      (acc, curr) => {
        curr.status === "done"
          ? (acc.done = [...acc.done, curr])
          : (acc.pending = [...acc.pending, curr]);
        return acc;
      },
      { done: [], pending: [] }
    );
  };

export const editDate = (date) => {
    const createdAt = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = Math.ceil((today.getTime() - createdAt.getTime()) / (60 * 60 * 24 * 1000));
    const hours = createdAt.getHours() > 9 ? createdAt.getHours() : `0${createdAt.getHours()}`;
    const min = createdAt.getMinutes() > 9 ? createdAt.getMinutes() : `0${createdAt.getMinutes()}`;
    const getDays = (days) => days === 0 ? "Сегодня" : days === 1 ? "Вчера" : days > 1 ? `${days} дня(-ей) назад` : "Ошибка";
    return `${getDays(diffTime)}, ${hours}:${min} i-GMT+${(createdAt.getTimezoneOffset() * -1) / 60}`;
  };