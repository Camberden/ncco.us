/** ===> NCCO.US UPDATE ===>
 * @description NC Correctional Officer Resource:
 * - From December 2025 to Present
 * - First deployed multi-user resource
 * @variation ncprison.co
 * @variation ncco.help
 * @constant latestUpdate
 * - Date is changed for any first update completed on a new day.
 * - Update date to be automated upon server-side script implementation.
 * @author Chrispy
 */
const latestUpdate = "Monday, February 9th, 2026";
const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();
const currentDay = date.getDate();
const currentDayOfWeek = date.getDay();
const dateOptions = {
	weekday: "long", //long, narrow
	year: "numeric", //
	month: "long", //long, short, narrow, numeric
	day: "2-digit",
}
const currentDate = currentYear + "-" + (currentMonth + 1) + "-" + currentDay;
const currentDateString = date.toLocaleDateString("en-US", dateOptions);
document.querySelector("#latest-update").innerHTML = latestUpdate;
let changeYear = currentYear;
// Nested SVG needs no xmlns =====>
const pageField = document.getElementById("page-field");
function clearPageField() {
	pageField.innerHTML = "";
}

const testDate = new Date(2024, 2, 10);
const testWeekday = testDate.toLocaleDateString("en-US", dateOptions).split(",");
const weekday = testWeekday[0];

/**
 * 
 * @param {HTMLCollection} elements the HTML Class to target for display triggering
 * @param {Boolean} displayed whether the values are displayed at associated HTML Class
 */
function switchDisplay(elements, displayed) {
	if (displayed) {
		document.querySelectorAll(`.${elements}`).forEach(element => {
			element.style.display = "inline";
		});
	} else if (!displayed) {
		document.querySelectorAll(`.${elements}`).forEach(element => {
			element.style.display = "none";
		});
	}
}
function enableNavigationButtons() {
	document.querySelectorAll(".navigation-button").forEach(button => {
		button.onclick = function () {
			ButtonInterface.buttonOnClick(button);
		}
		button.onmouseenter = function () {
			ButtonInterface.buttonOnMouseEnter(button);
		}
		button.onmouseleave = function () {
			ButtonInterface.buttonOnMouseLeave(button);
		}
	});
	document.querySelectorAll(".wip").forEach(wip => {
		wip.onclick = function () {
			displayNavigationNotice();
		}
	})
}
enableNavigationButtons();

function displayNavigationNotice() {
	const notice = document.querySelector("#navigation-notice");
	const bar = document.querySelector("#notice-bar");
	notice.style.display = "flex";
	bar.classList.add("timeout-bar-animation");
	const duration = parseInt(bar.getAttribute("value"));
	console.log(duration);
	const second = 1000;
	let countdown = second;
	bar.innerText = (duration / countdown) + "s";
	const elapsedTime = setInterval(() => {
		bar.innerText = ((duration - countdown) / second) + "s";
		countdown += second;
	}, second);

	setTimeout(() => {
		clearInterval(elapsedTime);
		notice.style.display = "none";
		bar.classList.remove("timeout-bar-animation");
	}, duration);
}

// ---------- STEP PAY PLAN MODULE ---------- //

// 160 Sick Hours == 1 Month Service

const salarySchedule2020 = [
	["33130", "33130", "33130", "33130", "33130", "33130", "33130"], // C/OI
	["34220", "34220", "34220", "34220", "34220", "34220", "34220"], // C/OII
	["36598", "36598", "36598", "36598", "36598", "36598", "36598"], // C/OIII
];
const salarySchedule2021 = [
	["33130", "35449", "37576", "39455", "41033", "42264", "43109"], // C/OI
	["34220", "36615", "38812", "40753", "42383", "43654", "44527"], // C/OII
	["36598", "39160", "41510", "43586", "45329", "46689", "47623"], // C/OIII
];
const salarySchedule2022 = [
	["33958", "36335", "38515", "40441", "42059", "43321", "44187"], // C/OI
	["35076", "37530", "39782", "41772", "43443", "44745", "45640"], // C/OII
	["37513", "40139", "42548", "44676", "46462", "47856", "48814"], // C/OIII
];
const salarySchedule2023 = [
	["36525", "39801", "41427", "43498", "45237", "46595", "47527"], // C/OI
	["37727", "40367", "42790", "44929", "46726", "48127", "49090"], // C/OII
	["40348", "43173", "45764", "48052", "49974", "51473", "52503"], // C/OIII
];
const salarySchedule2024 = [
	["37621", "40253", "42670", "44803", "46594", "47993", "48953"], // C/OI
	["38859", "41578", "44074", "46277", "48128", "49571", "50563"], // C/OII
	["41558", "44468", "47137", "49494", "51473", "53017", "54078"], // C/OIII
];
// Pending: Governor & Senate
const salarySchedule2025 = [
	["40066", "42869", "45444", "47715", "49623", "51113", "52135"], // C/OI
	["41385", "44281", "46985", "49285", "51256", "52793", "53793"], // C/OII
	["44259", "47358", "50201", "52711", "54819", "56463", "57593"], // C/OIII
];
// Pending: House
const salarySchedule2026 = [
	["40281", "43099", "45687", "47971", "49888", "51386", "52414"], // C/OI
	["41606", "44518", "47236", "49549", "51531", "53076", "54138"], // C/OII
	["44496", "47612", "50470", "52993", "55112", "56765", "57901"], // C/OIII
];
const salarySchedules = [
	salarySchedule2020, salarySchedule2021, salarySchedule2022, salarySchedule2023, salarySchedule2024, salarySchedule2025, salarySchedule2026,
];

let fiscalYear = 2024;
const fiscalYearDisplay = document.getElementById("fiscal-year");
fiscalYearDisplay.innerHTML = `${fiscalYear}-${fiscalYear + 1}`;

let currentSchedule = salarySchedules[fiscalYear - 2020];
let currentSalary;
let highlightedSalary;
let custodyLevel = 1;
let yearsExperience = 5;

function nextFiscalYear() {
	fiscalYear++;
	fiscalYearDisplay.innerHTML = `${fiscalYear}-${fiscalYear + 1}`;
	currentSchedule = salarySchedules[fiscalYear - 2020];
	removeHighlightedSalary();
	populateSalaryTable();
	calculateStep();
}
function previousFiscalYear() {
	fiscalYear--;
	fiscalYearDisplay.innerHTML = `${fiscalYear}-${fiscalYear + 1}`;
	currentSchedule = salarySchedules[fiscalYear - 2020];
	removeHighlightedSalary();
	populateSalaryTable();
	calculateStep();
}
function calculateStep() {

	currentSalary = currentSchedule[custodyLevel - 1][yearsExperience];
	document.getElementById("current-salary").innerHTML = currentSalary;
	document.getElementById("monthly-salary").innerHTML = (currentSalary / 12).toFixed(2);
	let currentHourlyRate = currentSalary / 52 / 40;
	document.getElementById("hourly-salary").innerHTML = currentHourlyRate.toFixed(2);
	document.getElementById("gap-pay").innerHTML = (currentHourlyRate * 11).toFixed(2);
	document.getElementById("overtime-diff").innerHTML = ((currentHourlyRate * 1.5) - currentHourlyRate).toFixed(2) + " ($" + (12.25 * (currentHourlyRate * 1.5)).toFixed(2) + ")";
	document.getElementById("night-diff").innerHTML = (currentHourlyRate / 10).toFixed(2);
	document.getElementById("weekend-diff").innerHTML = (currentHourlyRate / 10).toFixed(2);
	document.getElementById("holiday-diff").innerHTML = ((currentHourlyRate * 1.75) - currentHourlyRate).toFixed(2);

	document.getElementById("custody-level").innerHTML = ("I".repeat(custodyLevel));
	document.getElementById("years-experience").innerHTML = yearsExperience;
	highlightedSalary = document.getElementById(`co${custodyLevel}-${yearsExperience}`);
	highlightedSalary.classList.add("salary-highlight");
}
function highlightSalary(level, step) {
	document.getElementById(`co${level + 1}-${step}`).classList.add("salary-highlight");
}
function removeHighlightedSalary() {
	highlightedSalary.classList.remove("salary-highlight");
}
function increaseCustodyLevel() {
	if (custodyLevel >= 1 && custodyLevel < 3) {
		custodyLevel += 1;
		removeHighlightedSalary();
		calculateStep();
	}
}
function decreaseCustodyLevel() {
	if (custodyLevel <= 3 && custodyLevel > 1) {
		custodyLevel -= 1;
		removeHighlightedSalary();
		calculateStep();
	}
}
function increaseYearsExperience() {
	if (yearsExperience >= 0 && yearsExperience < 6) {
		yearsExperience += 1;
		removeHighlightedSalary();
		calculateStep();
	}
}
function decreaseYearsExperience() {
	if (yearsExperience > 0 && yearsExperience <= 6) {
		yearsExperience -= 1;
		removeHighlightedSalary();
		calculateStep();
	}
}
function enableStepPayPlanButtons() {
	document.querySelectorAll(".step-pay-plan-button").forEach(button => {
		button.onclick = () => {
			ButtonInterface.buttonOnClick(button);
			switch (button.value) {
				case ("increase-custody-level"):
					increaseCustodyLevel();
					break;
				case ("decrease-custody-level"):
					decreaseCustodyLevel();
					break;
				case ("increase-years-experience"):
					increaseYearsExperience();
					break;
				case ("decrease-years-experience"):
					decreaseYearsExperience();
					break;
				case ("next-fiscal-year"):
					nextFiscalYear();
					break;
				case ("previous-fiscal-year"):
					previousFiscalYear();
					break;
				default:
					console.log("Default Switch Triggered: enableStepPayPlanButtons()");
					break;
			};
		};

		button.onmouseenter = () => {
			ButtonInterface.buttonOnMouseEnter(button);
		}
		button.onmouseleave = () => {
			ButtonInterface.buttonOnMouseLeave(button);
		}
	});
}
function populateSalaryTable() {
	for (i = 0; i < currentSchedule.length; i++) {
		for (j = 0; j < currentSchedule[i].length; j++) {
			document.getElementById(`co${i + 1}-${j}`).innerHTML = currentSchedule[i][j];
			// if (currentSchedule[i][j] === currentSalary) {
			// 	document.getElementById(`co${i + 1}-${j}`).classList.add("salary-highlight");
			// }
		}
	}
}
function getDaysInMonthOfYear(year, month) {
	return new Date(year, month, 0).getDate();
}

/**
 * 
 * @param {Date} present 
 * @param {Date} birth 
 */
function findDaysInception(present, birth) {
	const yearsSinceBirth = present.getFullYear() - birth.getFullYear() - 1; // -1 accounts for present year lived months

	console.log(yearsSinceBirth); // Says 32; TODO correct by month.
	console.log(present.getMonth());
	console.log(birth.getMonth());
	const monthOfBirthDaysTotal = new Date(birth.getFullYear(), birth.getMonth(), 0).getDate();
	const monthOfBirthDaysLived = monthOfBirthDaysTotal - birth.getDate();
	const presentMonthDaysLived = present.getDate();

	let totalDaysLived = monthOfBirthDaysLived + presentMonthDaysLived;
	const monthsRemainingInBirthYear = 12 % birth.getMonth();
	const monthsRemainingInPresentYear = present.getMonth();
	console.log("Months remaining in Birth Year: " + monthsRemainingInBirthYear);
	console.log("Remaining in Present Year: " + monthsRemainingInPresentYear);

	const daysRemainingInBirthYear = getDaysInMonthOfYear(birth.getFullYear(), (birth.getMonth() + monthsRemainingInBirthYear));

	// Gathers days following birth month for all months of birth year.
	for (let i = 1; i <= monthsRemainingInBirthYear; i++) {
		totalDaysLived += getDaysInMonthOfYear(birth.getFullYear(), (birth.getMonth() + i)); // BIRTH doesn't need +1; it's inbuilt
	}
	console.log("Days remaining in birth Year: " + daysRemainingInBirthYear);

	// Gathers days before present month for all lived months of current year.
	if (present.getMonth() > 0) {
		for (let i = present.getMonth(); i >= 0; i--) {
			totalDaysLived += getDaysInMonthOfYear(present.getFullYear(), ((present.getMonth() + 1) - i)); // +1 FOR DAY COUNT VALUES ONLY
		}
	}

	// Gathers days between birth year and present year.
	let by = birth.getFullYear() + 1;
	console.log(by);
	for (let i = 0; i < yearsSinceBirth; i++) {
		for (let j = 1; j <= 12; j++)
			totalDaysLived += getDaysInMonthOfYear(by, j);
	}
	return totalDaysLived - 86;
}

function latestHeaterUpdate() {
	document.querySelector("#lasted-days").innerHTML = findDaysInception(new Date(), new Date(2025, 2, 5),);
}


(() => {

	calculateStep();
	enableStepPayPlanButtons();
	populateSalaryTable();
	latestHeaterUpdate();

})();