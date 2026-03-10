let selectedDay = "";
let selectedMonth = "";
let selectedYear = "";
let savedTotalDays = 0;
let currentLang = "ar";

let ageOn = true;
let hijriOn = true;
let waterOn = false;
let sleepOn = false;
let mealsOn = false;
let ramadanOn = false;
let prayersOn = false;
let hoursOn = false;
let heartbeatOn = false;

const dayPicker = document.getElementById("dayPicker");
const monthPicker = document.getElementById("monthPicker");
const yearPicker = document.getElementById("yearPicker");

function openBirthSheet() {
  document.getElementById("birthSheet").style.display = "flex";
}

function closeBirthSheet() {
  document.getElementById("birthSheet").style.display = "none";
  clearDateError();
}

function clearDateError() {
  document.getElementById("dateError").innerText = "";
  dayPicker.classList.remove("error-field");
  monthPicker.classList.remove("error-field");
  yearPicker.classList.remove("error-field");
}

function markFieldError(field, message) {
  clearDateError();
  document.getElementById("dateError").innerText = message;
  field.classList.add("error-field");
}

function confirmBirthDate() {
  const errorBox = document.getElementById("dateError");
  clearDateError();

  selectedDay = dayPicker.value.trim();
  selectedMonth = monthPicker.value.trim();
  selectedYear = yearPicker.value.trim();

  if (!selectedDay || !selectedMonth || !selectedYear) {
    errorBox.innerText = currentLang === "ar"
      ? "يرجى إدخال اليوم والشهر والسنة"
      : "Please enter day, month, and year";
    return;
  }

  const d = Number(selectedDay);
  const m = Number(selectedMonth);
  const y = Number(selectedYear);
  const thisYear = new Date().getFullYear();

  if (isNaN(d) || d < 1 || d > 31) {
    markFieldError(dayPicker, currentLang === "ar"
      ? "اليوم يجب أن يكون بين 1 و 31"
      : "Day must be between 1 and 31");
    return;
  }

  if (isNaN(m) || m < 1 || m > 12) {
    markFieldError(monthPicker, currentLang === "ar"
      ? "الشهر يجب أن يكون بين 1 و 12"
      : "Month must be between 1 and 12");
    return;
  }

  if (isNaN(y) || y < 1900 || y > thisYear) {
    markFieldError(yearPicker, currentLang === "ar"
      ? "السنة غير صحيحة"
      : "Invalid year");
    return;
  }

  const testDate = new Date(y, m - 1, d);

  if (
    testDate.getFullYear() !== y ||
    testDate.getMonth() !== m - 1 ||
    testDate.getDate() !== d
  ) {
    document.getElementById("dateError").innerText = currentLang === "ar"
      ? "تاريخ غير صحيح"
      : "Invalid date";
    dayPicker.classList.add("error-field");
    monthPicker.classList.add("error-field");
    yearPicker.classList.add("error-field");
    return;
  }

  document.getElementById("birthButton").innerText =
    currentLang === "ar" ? y + "/" + m + "/" + d : d + "/" + m + "/" + y;

  closeBirthSheet();
}

function toggleOption(type) {
  if (type === "age") {
    ageOn = !ageOn;
    document.getElementById("ageBtn").classList.toggle("active", ageOn);
  }
  if (type === "hijri") {
    hijriOn = !hijriOn;
    document.getElementById("hijriBtn").classList.toggle("active", hijriOn);
  }
  if (type === "water") {
    waterOn = !waterOn;
    document.getElementById("waterBtn").classList.toggle("active", waterOn);
  }
  if (type === "sleep") {
    sleepOn = !sleepOn;
    document.getElementById("sleepBtn").classList.toggle("active", sleepOn);
  }
  if (type === "meals") {
    mealsOn = !mealsOn;
    document.getElementById("mealsBtn").classList.toggle("active", mealsOn);
  }
  if (type === "ramadan") {
    ramadanOn = !ramadanOn;
    document.getElementById("ramadanBtn").classList.toggle("active", ramadanOn);
  }
  if (type === "prayers") {
    prayersOn = !prayersOn;
    document.getElementById("prayersBtn").classList.toggle("active", prayersOn);
  }
  if (type === "hours") {
    hoursOn = !hoursOn;
    document.getElementById("hoursBtn").classList.toggle("active", hoursOn);
  }
  if (type === "heartbeat") {
    heartbeatOn = !heartbeatOn;
    document.getElementById("heartbeatBtn").classList.toggle("active", heartbeatOn);
  }
}

function clearResults() {
  const ids = [
    "years","months","days","totalDays","hijriAge","waterResult","sleepResult",
    "mealsResult","ramadanResult","prayersResult","hoursResult","heartbeatResult"
  ];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = "";
  });
}

function calculateAge() {
  const error = document.getElementById("error");
  const result = document.getElementById("result");

  error.innerText = "";
  result.style.display = "none";

  const d = Number(selectedDay);
  const m = Number(selectedMonth);
  const y = Number(selectedYear);

  if (!selectedDay || !selectedMonth || !selectedYear) {
    error.innerText = currentLang === "ar"
      ? "يرجى اختيار تاريخ الميلاد"
      : "Please choose your birth date";
    return;
  }

  const birthDate = new Date(y, m - 1, d);
  const today = new Date();

  if (
    birthDate.getFullYear() !== y ||
    birthDate.getMonth() !== m - 1 ||
    birthDate.getDate() !== d
  ) {
    error.innerText = currentLang === "ar"
      ? "تاريخ الميلاد غير صحيح"
      : "Invalid birth date";
    return;
  }

  if (birthDate > today) {
    error.innerText = currentLang === "ar"
      ? "تاريخ الميلاد لا يمكن أن يكون في المستقبل"
      : "Birth date cannot be in the future";
    return;
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const diffTime = today - birthDate;
  savedTotalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const hijriYears = Math.floor(savedTotalDays / 354.367);
  const hijriMonths = Math.floor((savedTotalDays % 354.367) / 29.53);

  const ramadanCount = hijriYears;
  let prayerYears = years - 7;
  if (prayerYears < 0) prayerYears = 0;
  const prayerDays = prayerYears * 354;
  const prayersCount = prayerDays * 5;

  const livedHours = savedTotalDays * 24;
  const heartbeatCount = savedTotalDays * 24 * 60 * 70;

  clearResults();

  if (ageOn) {
    if (currentLang === "ar") {
      document.getElementById("years").innerText = years + " سنة";
      document.getElementById("months").innerText = months + " شهر";
      document.getElementById("days").innerText = days + " يوم";
      document.getElementById("totalDays").innerText = savedTotalDays.toLocaleString("ar-EG") + " يوم";
    } else {
      document.getElementById("years").innerText = years + " years";
      document.getElementById("months").innerText = months + " months";
      document.getElementById("days").innerText = days + " days";
      document.getElementById("totalDays").innerText = savedTotalDays.toLocaleString("en-US") + " days";
    }
  }

  if (hijriOn) {
    document.getElementById("hijriAge").innerText =
      currentLang === "ar"
        ? hijriYears + " سنة و " + hijriMonths + " شهر"
        : hijriYears + " years and " + hijriMonths + " months";
  }

  if (waterOn) {
    const water = savedTotalDays * 2;
    document.getElementById("waterResult").innerText =
      currentLang === "ar"
        ? water.toLocaleString("ar-EG") + " لتر"
        : water.toLocaleString("en-US") + " liters";
  }

  if (sleepOn) {
    const sleep = savedTotalDays * 8;
    document.getElementById("sleepResult").innerText =
      currentLang === "ar"
        ? sleep.toLocaleString("ar-EG") + " ساعة"
        : sleep.toLocaleString("en-US") + " hours";
  }

  if (mealsOn) {
    const meals = savedTotalDays * 3;
    document.getElementById("mealsResult").innerText =
      currentLang === "ar"
        ? meals.toLocaleString("ar-EG") + " وجبة"
        : meals.toLocaleString("en-US") + " meals";
  }

  if (ramadanOn) {
    document.getElementById("ramadanResult").innerText =
      currentLang === "ar"
        ? ramadanCount.toLocaleString("ar-EG") + " رمضان"
        : ramadanCount.toLocaleString("en-US") + " Ramadans";
  }

  if (prayersOn) {
    document.getElementById("prayersResult").innerText =
      currentLang === "ar"
        ? prayersCount.toLocaleString("ar-EG") + " صلاة"
        : prayersCount.toLocaleString("en-US") + " prayers";
  }

  if (hoursOn) {
    document.getElementById("hoursResult").innerText =
      currentLang === "ar"
        ? livedHours.toLocaleString("ar-EG") + " ساعة"
        : livedHours.toLocaleString("en-US") + " hours";
  }

  if (heartbeatOn) {
    document.getElementById("heartbeatResult").innerText =
      currentLang === "ar"
        ? heartbeatCount.toLocaleString("ar-EG") + " نبضة تقريبًا"
        : heartbeatCount.toLocaleString("en-US") + " beats تقريبًا";
  }

  result.style.display = "block";
  document.getElementById("backButton").classList.remove("hidden");
}

function resetPage() {
  document.getElementById("result").style.display = "none";
  document.getElementById("backButton").classList.add("hidden");
  document.getElementById("error").innerText = "";
  clearDateError();
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
}

function getShareText() {
  const parts = [];
  const pushIfExists = (id, titleAr, titleEn) => {
    const el = document.getElementById(id);
    if (el && el.innerText.trim() !== "") {
      parts.push((currentLang === "ar" ? titleAr : titleEn) + ": " + el.innerText.trim());
    }
  };

  pushIfExists("years", "العمر الميلادي", "Gregorian age");
  pushIfExists("hijriAge", "العمر الهجري", "Hijri age");
  pushIfExists("totalDays", "مجموع الأيام", "Total days");
  pushIfExists("ramadanResult", "عدد رمضاناتك", "Ramadans");
  pushIfExists("prayersResult", "عدد الصلوات", "Prayers");
  pushIfExists("hoursResult", "عدد الساعات", "Lived hours");
  pushIfExists("heartbeatResult", "نبضات القلب", "Heart beats");

  if (currentLang === "ar") {
    return "هذه نتيجتي في موقع حساب العمر:\n\n" + parts.join("\n");
  }
  return "This is my result from the Age Calculator website:\n\n" + parts.join("\n");
}

function shareResult() {
  const text = getShareText();
  const url = window.location.href;

  if (navigator.share) {
    navigator.share({
      title: currentLang === "ar" ? "نتيجة حساب العمر" : "Age Calculator Result",
      text: text,
      url: url
    });
  } else {
    navigator.clipboard.writeText(text + "\n" + url).then(() => {
      alert(currentLang === "ar" ? "تم نسخ النتيجة والرابط" : "Result and link copied");
    });
  }
}

function toggleLanguage() {
  clearDateError();

  if (currentLang === "ar") {
    currentLang = "en";
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";

    document.getElementById("mainTitle").innerText = "Age Calculator";
    document.getElementById("mainDesc").innerText = "Choose your birth date, enable the calculations you want, then press calculate.";
    document.getElementById("birthButton").innerText = "Choose birth date";
    document.getElementById("optionsMainTitle").innerText = "Choose what you want to calculate";
    document.getElementById("labelAge").innerText = "Gregorian age";
    document.getElementById("labelHijri").innerText = "Hijri age";
    document.getElementById("labelWater").innerText = "Water amount";
    document.getElementById("labelSleep").innerText = "Sleep hours";
    document.getElementById("labelMeals").innerText = "Meals count";
    document.getElementById("labelRamadan").innerText = "How many Ramadans";
    document.getElementById("labelPrayers").innerText = "Prayers since age 7";
    if (document.getElementById("labelHours")) document.getElementById("labelHours").innerText = "Lived hours";
    if (document.getElementById("labelHeartbeat")) document.getElementById("labelHeartbeat").innerText = "Heart beats";
    document.getElementById("calcBtn").innerText = "Calculate";
    document.getElementById("noteText").innerText = "Some results are approximate and not 100% exact.";
    document.getElementById("sheetTitle").innerText = "Choose Birth Date";
    document.getElementById("dayLabel").innerText = "Day";
    document.getElementById("monthLabel").innerText = "Month";
    document.getElementById("yearLabel").innerText = "Year";
    document.getElementById("confirmBtn").innerText = "Confirm";
    document.getElementById("cancelBtn").innerText = "Cancel";
    document.getElementById("aboutLink").innerText = "About";
    document.getElementById("contactLink").innerText = "Contact";
    document.getElementById("privacyLink").innerText = "Privacy Policy";
    document.getElementById("backButton").innerText = "← Change Birth Date";
    if (document.getElementById("shareBtn")) document.getElementById("shareBtn").innerText = "Share Result";

    const titles = [
      "Gregorian Age","Hijri Age","Extra Months","Extra Days","Total Days",
      "Water Amount","Sleep Hours","Meals Count","Ramadans","Prayers",
      "Lived Hours","Heart Beats"
    ];
    document.querySelectorAll(".result-card-title").forEach((el, i) => {
      if (titles[i]) el.innerText = titles[i];
    });

  } else {
    currentLang = "ar";
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";

    document.getElementById("mainTitle").innerText = "حساب العمر";
    document.getElementById("mainDesc").innerText = "اختر تاريخ ميلادك ثم فعّل الحسابات التي تريدها، وبعدها اضغط على احسب.";
    document.getElementById("birthButton").innerText = "اختر تاريخ الميلاد";
    document.getElementById("optionsMainTitle").innerText = "اختر ما تريد حسابه";
    document.getElementById("labelAge").innerText = "العمر الميلادي";
    document.getElementById("labelHijri").innerText = "العمر الهجري";
    document.getElementById("labelWater").innerText = "كمية الماء";
    document.getElementById("labelSleep").innerText = "ساعات النوم";
    document.getElementById("labelMeals").innerText = "عدد الوجبات";
    document.getElementById("labelRamadan").innerText = "كم رمضان مر عليك";
    document.getElementById("labelPrayers").innerText = "كم صلاة صليت من عمر 7";
    if (document.getElementById("labelHours")) document.getElementById("labelHours").innerText = "كم ساعة عشت";
    if (document.getElementById("labelHeartbeat")) document.getElementById("labelHeartbeat").innerText = "كم نبضة قلب";
    document.getElementById("calcBtn").innerText = "احسب";
    document.getElementById("noteText").innerText = "بعض النتائج تقريبية وليست دقيقة 100٪.";
    document.getElementById("sheetTitle").innerText = "اختر الميلاد";
    document.getElementById("dayLabel").innerText = "اليوم";
    document.getElementById("monthLabel").innerText = "الشهر";
    document.getElementById("yearLabel").innerText = "السنة";
    document.getElementById("confirmBtn").innerText = "تأكيد";
    document.getElementById("cancelBtn").innerText = "إلغاء";
    document.getElementById("aboutLink").innerText = "من نحن";
    document.getElementById("contactLink").innerText = "اتصل بنا";
    document.getElementById("privacyLink").innerText = "سياسة الخصوصية";
    document.getElementById("backButton").innerText = "← تغيير تاريخ الميلاد";
    if (document.getElementById("shareBtn")) document.getElementById("shareBtn").innerText = "مشاركة النتيجة";

    const titles = [
      "العمر الميلادي","العمر الهجري","الأشهر الإضافية","الأيام الإضافية","مجموع الأيام",
      "كمية الماء","ساعات النوم","عدد الوجبات","عدد رمضاناتك","عدد الصلوات",
      "عدد الساعات","نبضات القلب"
    ];
    document.querySelectorAll(".result-card-title").forEach((el, i) => {
      if (titles[i]) el.innerText = titles[i];
    });
  }

  if (savedTotalDays > 0) {
    calculateAge();
  }
      }
