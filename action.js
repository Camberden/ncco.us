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
const latestUpdate = "Wednesday, December 31, 2025";
const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();
const currentDay = date.getDate();
const dateOptions = {
	weekday: "long", //long, narrow
	year: "numeric", //
	month: "long", //long, short, narrow, numeric
	day: "2-digit",
}
const currentDate = date.toLocaleDateString("en-US", dateOptions);
document.querySelector("#latest-update").innerHTML = latestUpdate;
let changeYear = currentYear;
// Nested SVG needs no xmlns =====>

const pageField = document.getElementById("page-field");
function clearPageField() {
	pageField.innerHTML = "";
	console.log("Page Field Cleared!");
}

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

// ----- MAIN GENERATOR ----- //

function getMonthText(val){
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return months[val - 1];
}

function getDaysInMonthOfYear(year, month) {
	return new Date(year, month, 0).getDate();
}

function generateCalendar(year) {
	clearPageField();
	for (let i = 0; i < 12; i++) {
		const div = document.createElement("div");
		div.setAttribute("class", "calendar-month");
		const text = document.createTextNode(getMonthText(i + 1) + " " + year);
		div.setAttribute("id", `${(getMonthText(i + 1) + "-" + year + "-div")}`);
		const monthSpan = document.createElement("span");
		monthSpan.setAttribute("class", "these-months");
		monthSpan.setAttribute("id", `${getMonthText(i + 1) + "-" + year}`);
		const br = document.createElement("br");
		const hr = document.createElement("hr");
		monthSpan.appendChild(text);
		monthSpan.appendChild(br);
		div.appendChild(monthSpan);
		div.appendChild(hr);
		for (let j = 0; j < getDaysInMonthOfYear(year, i + 1); j++) {
			const span = document.createElement("span");
			span.setAttribute("id", `${year}-${i + 1}-${j + 1}`);
			span.setAttribute("class", "calendar-date");
			const text = document.createTextNode(j + 1);
			span.appendChild(text);

			// TODO for creating E schedule.
			div.appendChild(span);
		}
		pageField.appendChild(div);
	}
	// addEventsByYear(year);
}
generateCalendar(currentYear);

/**
 * @todo Assign c based on currentYear param
 */
function displayBiweeklyRotation(year) {

	const calendarDays = document.querySelectorAll(".calendar-date");
	const biweeklyRelations = [
		"Default", // XX2023 & i0
		"Long On 1", // 2024 @ i1
		"Long On 2",
		"Long Off 1", // 2025 @ i3
		"Long Off 2", // 2026 @ i4
		"Long On 3", // 2027 @ i5
		"Long On 4", // 2028 @ i6
		"Long On 5", 
		"Short Off 1", // 2029 @ i8
		"Short Off 2", // 2030 @ i9
		"Short On 1", // 2020, 2031 @ i10
		"Short On 2", // 2032 @i11
		"Short Off 3", //2021 @ i12
		"Short Off 4", //2022, 2033 @ i13
		"Short Off 5", //2023 @ i14
	];

	// let year = 2025; 
	// let remainder = year - (year % 40);
	let indexBase = year % 40; // IndexBase
	let indexSkip = Math.floor(indexBase / 4); // Amount of times leap year hit
	let indexSum = indexBase + indexSkip;
	if (indexBase % 4 === 0) {
		indexSum -= 1;
	}
	if (indexBase === 0 ) {
		indexSum = 0;
	}
	let indexProper = indexSum % 14;
	if (indexProper === 0) {
		indexProper = 14;
	}
	// console.log("Year: " + year);
	// console.log("Index Base: " + indexBase);
	// console.log("Index Skip: " + indexSkip);
	// console.log("Index Sum: " + indexSum);
	// console.log("Index Proper: " + indexProper);
	// console.log("Result: " + biweeklyRelations[indexProper]);
	// console.log("Includes Off? " + biweeklyRelations[indexProper].includes("Off"));
	// console.log("Includes On? " + biweeklyRelations[indexProper].includes("On"));

	calendarDays.forEach(calendarDay => {
		if (indexProper > 14) {
			indexProper = 1;
		}
		if (biweeklyRelations[indexProper].includes("Off")) {
			calendarDay.innerHTML += `<span class="aRotation">A</span>`;
		} else if (biweeklyRelations[indexProper].includes("On")){
			calendarDay.innerHTML += `<span class="bRotation">B</span>`;;

		}
		indexProper++;
	});
} 
displayBiweeklyRotation(changeYear);

function enablePageButtons() {
	let toggleRotation = true;
	document.querySelectorAll(".page-button").forEach(button => {
		
		button.onclick = function () {
			// ButtonInterface.buttonOnClick(button);
			switch (button.value) {
				case "next":
					generateCalendar(++changeYear);
					displayBiweeklyRotation(changeYear);
					switchDisplay("aRotation", toggleRotation);
					switchDisplay("bRotation", toggleRotation);
				break;
				case "previous":
					generateCalendar(--changeYear);
					displayBiweeklyRotation(changeYear);
					switchDisplay("aRotation", toggleRotation);
					switchDisplay("bRotation", toggleRotation);
				break;
				case "rotation":
						// displayBiweeklyRotation(changeYear);
						if (toggleRotation) {
							switchDisplay("aRotation", false);
							switchDisplay("bRotation", false);
							toggleRotation = false;
						} else if (!toggleRotation) {
							switchDisplay("aRotation", true);
							switchDisplay("bRotation", true);
							toggleRotation = true;
						};
					break;
				default:
					console.log("Default Switch Triggered");
				break;
			}
		}
		button.onmouseenter = function () {
			ButtonInterface.buttonOnMouseEnter(button);
		}
		button.onmouseleave = function () {
			ButtonInterface.buttonOnMouseLeave(button);
		}
	});
}
enablePageButtons();

// ----- STEP PAY PLAN MODULE ----- //

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
let yearsExperience = 1;

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
function calculateStep(){

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
calculateStep();
function highlightSalary(level, step) {
	document.getElementById(`co${level + 1}-${step}`).classList.add("salary-highlight");
}
function removeHighlightedSalary(){
	highlightedSalary.classList.remove("salary-highlight");
}
function increaseCustodyLevel() {
	if (custodyLevel >= 1 && custodyLevel < 3){
		custodyLevel += 1;
		removeHighlightedSalary();
		calculateStep();
	}
}
function decreaseCustodyLevel() {
	if (custodyLevel <= 3 && custodyLevel > 1){
		custodyLevel -= 1;
		removeHighlightedSalary();
		calculateStep();
	}
}
function increaseYearsExperience(){
	if (yearsExperience >= 0 && yearsExperience < 6){
		yearsExperience += 1;
		removeHighlightedSalary();
		calculateStep();
	}
}
function decreaseYearsExperience() {
	if (yearsExperience > 0 && yearsExperience <= 6){
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
				console.log("Hi");
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
enableStepPayPlanButtons();
function populateSalaryTable(){
	for (i = 0; i < currentSchedule.length; i++) {
		for (j = 0; j < currentSchedule[i].length; j++){
			document.getElementById(`co${i + 1}-${j}`).innerHTML = currentSchedule[i][j];
			// if (currentSchedule[i][j] === currentSalary) {
			// 	document.getElementById(`co${i + 1}-${j}`).classList.add("salary-highlight");
			// }
		}
	}
}
populateSalaryTable();