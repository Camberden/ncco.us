/** ===> NCCO.US UPDATE ===>
 * @description NC Correctional Officer Resource:
 * - From December 2025 to Present
 * - CMBR first-deployed multi-user resource
 * @variation ncprison.co
 * @variation ncco.help
 * @constant latestUpdate
 * - Date is changed for any first update completed on a new day.
 * - Update date to be automated upon server-side script implementation.
 * @author Camberden (Chrispy | Kippi)  
 */
const latestUpdate = "Tuesday, March 3rd, 2026";
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
const testDate = new Date(2024, 2, 10);
const testWeekday = testDate.toLocaleDateString("en-US", dateOptions).split(",");
const weekday = testWeekday[0];

function enableNavigationButtons() {
	document.querySelectorAll(".navigation-button").forEach(button => {
		button.onclick = function () {
			document.querySelector("body").removeChild(document.querySelector(".component-script"));
			CMBRutil.buttonOnClick(button);
		}
		button.onmouseenter = function () {
			CMBRutil.buttonOnMouseEnter(button);
		}
		button.onmouseleave = function () {
			CMBRutil.buttonOnMouseLeave(button);
		}
	});
	document.querySelectorAll(".wip").forEach(wip => {
		wip.onclick = function() {
			displayNavigationNotice();
		}
	})
}
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
			bar.innerText = ((duration - countdown)/ second) + "s";
			countdown += second;
		}, second);

	setTimeout(() => {
		clearInterval(elapsedTime);
  		notice.style.display = "none";
		bar.classList.remove("timeout-bar-animation");
	}, duration);
}

// ----- MAIN GENERATOR ----- //

function getMonthText(val){
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return months[val - 1];
}

function getDaysInMonthOfYear(year, month) {
	return new Date(year, month, 0).getDate();
}

/**
 * 
 * @param {String} string 
 * @param {Boolean} firstDay 
 * @returns String | Number
 */
function getDayOfWeek(string, firstDay) {
	const thisDate = new Date(string.replace("-", ","));
	if (!firstDay) {
		const dateString = thisDate.toLocaleDateString("en-US", dateOptions).split(",");
		return dateString[0];
	} else {
		return thisDate.getDay();
	}
}

// function generateCalendar(year) {
// 	clearPageField();
// 	for (let i = 0; i < 12; i++) {
// 		const div = document.createElement("div");
// 		div.setAttribute("class", "calendar-month");
// 		const text = document.createTextNode(getMonthText(i + 1) + " " + year);
// 		div.setAttribute("id", `${(getMonthText(i + 1) + "-" + year + "-div")}`);
// 		const monthSpan = document.createElement("span");
// 		monthSpan.setAttribute("class", "these-months");
// 		monthSpan.setAttribute("id", `${getMonthText(i + 1) + "-" + year}`);
// 		const br = document.createElement("br");
// 		const hr = document.createElement("hr");
// 		monthSpan.appendChild(text);
// 		monthSpan.appendChild(br);
// 		div.appendChild(monthSpan);
// 		div.appendChild(hr);
// 		const startingDay = getDayOfWeek(year + "," + (i + 1) + "," + 1, true);
// 		if (startingDay != 0) {
// 				for(let k = 0; k < startingDay; k++) {
// 					const emptySpan = document.createElement("span");
// 					emptySpan.setAttribute("class", "empty-span");
// 					emptySpan.appendChild(document.createTextNode("#"));
// 					div.appendChild(emptySpan);
// 				}
// 			}
// 		for (let j = 0; j < getDaysInMonthOfYear(year, i + 1); j++) {
// 			const span = document.createElement("span");
// 			span.setAttribute("id", `${year}-${i + 1}-${j + 1}`);
// 			span.setAttribute("class", "calendar-date");
// 			span.setAttribute("value", `${getDayOfWeek(span.id, false)}`);
// 			const text = document.createTextNode(j + 1);
// 			span.appendChild(text);

// 			div.appendChild(span);
// 		}
// 		pageField.appendChild(div);
// 	}
// 	if (changeYear === currentYear) { document.getElementById(`${currentDate}`).classList.add("current-date"); }
// }

/**
 * 
 * @param {Boolean} enable 
 */
function enlargeCalendar(enable) {
	const calendarDates = document.querySelectorAll(".calendar-date");
	const emptySpans = document.querySelectorAll(".empty-span");
	const calendarMonths = document.querySelectorAll(".calendar-month");
	const theseMonths = document.querySelectorAll(".these-months");
	
	calendarDates.forEach(calendarDate => {
		enable ?
		calendarDate.style = "width: 3.5rem; height: 1rem; font-size: 1.5rem; padding-left: 0.5rem; padding-top: 1.5rem; padding-bottom: 1.5rem;" :
		calendarDate.style = "initial";
	});
	emptySpans.forEach(emptySpan => {
		enable ?
		emptySpan.style = "width: 3.5rem; height: 1rem;" :
		emptySpan.style = "initial;";
	});
	calendarMonths.forEach(calendarMonth => {
		enable ?
		calendarMonth.style = "height: 20rem; width:25rem;" :
		calendarMonth.style = "initial";
	});
	theseMonths.forEach(thisMonth => {
		if (enable) {
		thisMonth.style = "font-size: 1.5rem; padding-top: 1rem; padding-bottom: 1rem;";
		const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		for (let i = 0; i < 7; i++) {
			const span = document.createElement("span");
			span.classList.add("day-span");
			const text = document.createTextNode(days[i]);
			span.appendChild(text);
			thisMonth.appendChild(span);
			}
		} else if (! enable) {
			thisMonth.style = "initial";
			while (thisMonth.children.length > 1) {
				thisMonth.removeChild(thisMonth.lastChild);
			}
		}
	});
}

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

	calendarDays.forEach(calendarDay => {
		if (indexProper > 14) {
			indexProper = 1;
		}
		const span = document.createElement("span");
		if (biweeklyRelations[indexProper].includes("Off")) {
			span.classList.add("aRotation");
		} else if (biweeklyRelations[indexProper].includes("On")){
			span.classList.add("bRotation");
		}
		calendarDay.appendChild(span);
		indexProper++;
	});
} 

function enablePageButtons() {
	let toggleRotation = true;
	let toggleEnlargeCalendar = false;
	document.querySelectorAll(".page-button").forEach(button => {
		
		button.onclick = function () {
			CMBRutil.buttonOnClick(button);
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
						if (toggleRotation) {
							this.textContent = "Enable Rotation Display";
							switchDisplay("aRotation", false);
							switchDisplay("bRotation", false);
							toggleRotation = false;
						} else if (!toggleRotation) {
							this.textContent = "Disable Rotation Display";
							switchDisplay("aRotation", true);
							switchDisplay("bRotation", true);
							toggleRotation = true;
						};
					break;
				case "enlarge-calendar":
					if (toggleEnlargeCalendar) {
						this.textContent = "Enlarge Calendar";
						enlargeCalendar(false);
						toggleEnlargeCalendar = false;
						window.scrollTo(0, 0);

					} else if (! toggleEnlargeCalendar) {
						this.textContent = "Shrink Calendar";
						enlargeCalendar(true);
						toggleEnlargeCalendar = true;
						window.scrollTo(0, 0);
					}
				default:
					console.log("Default Switch Triggered: enablePageButtons()");
				break;
			}
		}
		button.onmouseenter = function () {
			CMBRutil.buttonOnMouseEnter(button);
		}
		button.onmouseleave = function () {
			CMBRutil.buttonOnMouseLeave(button);
		}
	});
}

( async () => {

	enableNavigationButtons();

})();