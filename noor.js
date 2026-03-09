let selectedDay = "";
let selectedMonth = "";
let selectedYear = "";

let savedTotalDays = 0;
let waterOn = false;
let sleepOn = false;
let mealsOn = false;

const dayPicker = document.getElementById("dayPicker");
const monthPicker = document.getElementById("monthPicker");
const yearPicker = document.getElementById("yearPicker");

function openBirthSheet() {
  document.getElementById("birthSheet").style.display = "flex";
}

function closeBirthSheet() {
  document.getElementById("birthSheet").style.display = "none";
}

function confirmBirthDate() {
  selectedDay = dayPicker.value.trim();
  selectedMonth = monthPicker.value.trim();
  selectedYear = yearPicker.value.trim();

  if (!selectedDay || !selectedMonth || !selectedYear) {
    return;
  }

  const d = Number(selectedDay);
  const m = Number(selectedMonth);
  const y = Number(selectedYear);

  if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1900) {
    return;
  }

  document.getElementById("birthButton").innerText = y + "/" + m + "/" + d;
  closeBirthSheet();
}

function calculateAge() {
  const error = document.getElementById("error");
  const result = document.getElementById("result");
  const startSection = document.getElementById("startSection");
  const optionsWrap = document.getElementById("optionsWrap");

  error.innerText = "";
  result.style.display = "none";

  const d = Number(selectedDay);
  const m = Number(selectedMonth);
  const y = Number(selectedYear);

  if (!selectedDay || !selectedMonth || !selectedYear) {
    error.innerText = "يرجى اختيار تاريخ الميلاد";
    return;
  }

  if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1900) {
    error.innerText = "يرجى إدخال تاريخ ميلاد صحيح";
    return;
  }

  const birthDate = new Date(y, m - 1, d);
  const today = new Date();

  if (birthDate > today) {
    error.innerText = "تاريخ الميلاد لا يمكن أن يكون في المستقبل";
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

  document.getElementById("years").innerText = "عمرك بالسنوات: " + years + " سنة";
  document.getElementById("months").innerText = "الأشهر الإضافية: " + months + " شهر";
  document.getElementById("days").innerText = "الأيام الإضافية: " + days + " يوم";
  document.getElementById("totalDays").innerText =
    "مجموع الأيام التي عشتها تقريباً: " + savedTotalDays.toLocaleString("ar-EG") + " يوم";

  startSection.classList.add("hidden");
  optionsWrap.style.display = "block";
  result.style.display = "block";
  document.getElementById("backButton").classList.remove("hidden");

  updateExtras();
}

function toggleExtra(type) {
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

  updateExtras();
}

function updateExtras() {
  if (savedTotalDays === 0) return;

  document.getElementById("waterResult").innerText = "";
  document.getElementById("sleepResult").innerText = "";
  document.getElementById("mealsResult").innerText = "";

  if (waterOn) {
    const water = savedTotalDays * 2;
    document.getElementById("waterResult").innerText =
      "كمية الماء التي شربتها تقريباً: " + water.toLocaleString("ar-EG") + " لتر";
  }

  if (sleepOn) {
    const sleep = savedTotalDays * 8;
    document.getElementById("sleepResult").innerText =
      "عدد ساعات النوم التقريبية: " + sleep.toLocaleString("ar-EG") + " ساعة";
  }

  if (mealsOn) {
    const meals = savedTotalDays * 3;
    document.getElementById("mealsResult").innerText =
      "عدد الوجبات التي تناولتها تقريباً: " + meals.toLocaleString("ar-EG") + " وجبة";
  }
}

function resetPage() {
  document.getElementById("startSection").classList.remove("hidden");
  document.getElementById("optionsWrap").style.display = "none";
  document.getElementById("result").style.display = "none";
  document.getElementById("backButton").classList.add("hidden");
}