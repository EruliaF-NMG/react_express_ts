

/**
 * @description date object to string
 * @param {Date|String} dateObject Date object
 * @param {String} format date format
 */
const dateObjectToString = (date:Date|string, format:string = 'yyyy-mm-dd') => {
    const dateObject:Date = new Date(date);
    switch (format) {
      case 'yyyy-mm-dd':
        return `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`;
      case 'yyyy_mm_dd':
        return `${dateObject.getFullYear()}_${(dateObject.getMonth() + 1)
          .toString()
          .padStart(2, '0')}_${dateObject.getDate().toString().padStart(2, '0')}`;
      case 'h:i a':
        // eslint-disable-next-line no-case-declarations
        let hours = dateObject.getHours();
        // eslint-disable-next-line no-case-declarations
        const minutes = dateObject.getMinutes();
        // eslint-disable-next-line no-case-declarations
        const meridiemType:string = hours >= 12 ? 'PM' : 'AM';
        hours %= 12;
        hours = hours || 12;
        return `${hours
          .toString()
          .padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${meridiemType}`;
      default:
        return date;
    }
  };
  

/**
 * @description change date,month,year
 * @param {Date} dateObject Date object
 */
export const changeDate2 = (dateObject:Date) => ({
    setSeconds(seconds:Number) {
      dateObject.setSeconds(this.dateObject.getSeconds() + seconds);
      return this;
    },
    setDays(dayCount:Number) {
      dateObject.setDate(this.dateObject.getDate() + dayCount);
      return this;
    },
    setMonth(monthCount:Number) {
      dateObject.setMonth(this.dateObject.getMonth() + monthCount);
      return this;
    },
    setYear(yearCount:Number) {
      dateObject.setFullYear(this.dateObject.getFullYear() + yearCount);
      return this;
    },
    getDate(format:string = 'none') {
      return dateObjectToString(dateObject, format);
    },
});

export const changeDate = (dateObject:Date) => {
  const builders = {
    setSeconds:(seconds:number)=> {
      dateObject.setSeconds( dateObject.getSeconds() + seconds);
      return builders;
    },

    setDays:(dayCount:number)=> {
      dateObject.setDate(dateObject.getDate() + dayCount);
      return builders;
    },
    setMonth:(monthCount:number)=> {
      dateObject.setMonth(dateObject.getMonth() + monthCount);
      return this;
    },
    setYear:(yearCount:number) =>{
      dateObject.setFullYear(dateObject.getFullYear() + yearCount);
      return builders;
    },
    getDate: (format:string = 'none') => {
      return dateObjectToString(dateObject, format);
    },
  };

  return builders;
};
