export const formatDateTime = (e) => {
   const value = new Date(e);
   const year = value.getFullYear();
   let day = value.getDate();
   let month = value.getMonth() + 1;
   let hours = value.getHours().toString();
   let minutes = value.getMinutes().toString();

   if (day.toString().length === 1) {
     day = "0" + day;
   }
   if (month.toString().length === 1) {
     month = "0" + month;
   }
   if (hours.toString().length === 1) {
     hours = "0" + hours;
   }
   if (minutes.toString().length === 1) {
     minutes = "0" + minutes;
   }
  return `${year}/${month}/${day}${"  "}${hours}:${minutes}`
}



export const formatDate = (e) => {
  const value = new Date(e);
  const year = value.getFullYear();
  const day = value.getDate();
  const month = value.getMonth();
  return `${year}/${month}/${day}`;
};


export const formattedTimeOnly = (e) => {
  const date = new Date(e);
 return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
}



export const formattedTime = (e) => {
  const value = new Date(e);
  const year = value.getFullYear()
  let day = value.getDate();
  let month = value.getMonth() + 1;
  let hours = value.getHours().toString();
  let minutes = value.getMinutes().toString();

  if(day.toString().length ===1){
    day = "0" + day
  }
  if(month.toString().length ===1){
    month = "0" + month
  }
  if(hours.toString().length === 1 ){
    hours = "0" + hours
  }
  if(minutes.toString().length ===1) {
    minutes = "0" + minutes
  }
  return `<span className="inline-block">${year}/${month}/${day}</span> <span className="inline-block">${hours}:${minutes} </span>`
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