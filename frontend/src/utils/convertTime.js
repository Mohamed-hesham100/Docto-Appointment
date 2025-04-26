const convertTime = (time) => {
  // تقسيم الوقت اللي جاي بصيغة "HH:MM" إلى جزئين: الساعات والدقايق
  const timeParts = time.split(":");

  // تحويل الجزء الأول (الساعات) من نص إلى رقم
  let hours = parseInt(timeParts[0]);

  // تحويل الجزء التاني (الدقايق) من نص إلى رقم
  const minutes = parseInt(timeParts[1]);

  // تعيين meridiem كـ "am" مبدئياً
  let meridiem = "am";

  // لو الساعة 12 أو أكتر، نخليها "pm"
  if (hours >= 12) {
    meridiem = "pm";

    // ولو أكبر من 12 (يعني مثلاً 13، 14...) نحولها لـ 12 ساعة (مثلاً 14 تبقى 2)
    if (hours > 12) {
      hours -= 12;
    }
  }

  // لو الساعة كانت 0 (يعني منتصف الليل)، نحولها لـ 12
  if (hours === 0) {
    hours = 12;
  }

  // نرجع الوقت بصيغة 12 ساعة، ونضيف meridiem في الآخر
  return (
    hours.toString().padStart(2, "0") + // الساعات بصيغة 2 أرقام (مثلاً 02)
    ":" +
    minutes.toString().padStart(2, "0") + // الدقايق بصيغة 2 أرقام
    " " +
    meridiem // am أو pm
  );
};

export default convertTime;
