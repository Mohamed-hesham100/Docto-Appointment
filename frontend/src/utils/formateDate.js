// export const formateDate = (date, config) => {
//   const defaultOptions = { day: "numeric", month: "long", year: "numeric" };
//   const options = config ? config : defaultOptions;

//   return new Date(date).toLocaleDateString("en-Us", options);
// };

export const formateDate = (date, config) => {
  const defaultOptions = { day: "numeric", month: "short", year: "numeric" };
  const options = config || defaultOptions;

  return new Date(date).toLocaleDateString("en-US", {
    ...options,
    timeZone: "Africa/Cairo",
  });
};





//   export const formateDate = (date, config) => {
//     const defaultOptions = { day: "numeric", month: "long", year: "numeric" };
//     const options = config || defaultOptions;

//     // لو التاريخ جاي بالشكل "19-04-2025"، نحوله لـ "2025-04-19"
//     if (/^\d{2}-\d{2}-\d{4}$/.test(date)) {
//       const [day, month, year] = date.split("-");
//       date = `${year}-${month}-${day}`;
//     }

//     return new Date(date).toLocaleDateString("en-US", {
//       ...options,
//       timeZone: "Africa/Cairo",
//     });
//   };

// export const formateDate = (date, config) => {
//   const defaultOptions = {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   };

//   const options = config || defaultOptions;

//   // دعم تنسيق "19-04-2025"
//   if (/^\d{2}-\d{2}-\d{4}$/.test(date)) {
//     const [day, month, year] = date.split("-");
//     date = `${year}-${month}-${day}`;
//   }

//   return new Date(date).toLocaleString("en-US", {
//     ...options,
//     timeZone: "Africa/Cairo",
//   });
// };
