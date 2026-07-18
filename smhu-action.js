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
const latestUpdate = "Monday, July 18th, 2026";
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
// document.querySelector("#latest-update").innerHTML = latestUpdate;
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
	latestHeaterUpdate();

})();