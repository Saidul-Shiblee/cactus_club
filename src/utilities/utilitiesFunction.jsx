export const formatDateTime = (e) => {
  const value = new Date(e);
  const year = value.getFullYear()
  const day = value.getDate();
  const month = value.getMonth();
  const hours = value.getHours();
  const minutes = value.getMinutes();
  return `${year}/${month}/${day} ${hours}:${minutes}`
}



export const formatDate = (e) => {
  const value = new Date(e);
  const year = value.getFullYear();
  const day = value.getDate();
  const month = value.getMonth();
  return `${year}/${month}/${day}`;
};




export const formattedTime = (e) => {
  const value = new Date(e);
  const year = value.getFullYear()
  const day = value.getDate();
  const month = value.getMonth();
  const hours = value.getHours();
  const minutes = value.getMinutes();
  return `<span className="inline-block">${year}/${month}/${day}</span> <span className="inline-block">${hours}:${minutes}</span>`
};

export function trimText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  } else {
    const slicedText = text.slice(0, maxLength - 3);
    return slicedText + "...";
  }
}
export function filterArray(array, filter) {

  const cArray = [...array]

  return cArray.filter(el => {
    if (filter === "all") {
      return true;
    } else {
      return el?.Type === filter
    }
  })
}