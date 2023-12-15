export const formatDateTime = (e) => {
  const value = new Date(e);
  console.log("value", value);
  const year = value.getFullYear()
  const day = value.getDate();
  const month = value.getMonth();
  const hours = value.getHours();
  const minutes = value.getMinutes();
  return `${year}/${month}/${day} ${hours}:${minutes}`
}



export const formatDate = (e) => {
  const value = new Date(e);
  console.log("value", value);
  const year = value.getFullYear();
  const day = value.getDate();
  const month = value.getMonth();
  return `${year}/${month}/${day}`;
};

// export const formateTimeAndZone = () => {
//   console.log()
// }



export const formattedTime = (e) => {
  // const now = new Date();
  const value = new Date(e);
  console.log("value", value);
  const year = value.getFullYear();
  const day = value.getDate();
  const month = value.getMonth();
  // return `${year}/${month}/${day}`;
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
    timeZone: 'UTC'
  };
  
  return `${year}/${month}/${day} ${new Intl.DateTimeFormat('en-US', options).format(value)}`;
};
// console.log(formattedTime);

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