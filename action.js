const date = new Date();
document.querySelector("#latest-update").innerHTML = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
currentYear = date.getFullYear();
changeYear = currentYear;
// Successfully targets as inline =====>
// Nested SVG needs no xmlns =====>
const paths = document.querySelectorAll("path");
for (let path of paths) {
	const pathInitialColor = path.style.fill.valueOf();
	console.log(pathInitialColor);
	path.onmouseenter = () => {
		console.log(pathInitialColor);
		// document.getElementById("nc-flag").animate({ transform: "translateX(300px)" }, 1000);

	}
	path.onmouseleave = () => {
		path.style.fill = pathInitialColor;
		// document.getElementById("nc-flag").animate({ transform: "translateX(300px)"}, 2000);

	}
}

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

function getMonthText(val){
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return months[val - 1];
}
// console.log(getMonthText(birthMonth) + " " + birthDate + " " + birthYear);


// ----- MAIN GENERATOR ----- //

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

function enableLifecraftButtons() {
	let toggleRotation = false;
	document.querySelectorAll(".page-button").forEach(button => {
		
		button.onclick = function () {
			// ButtonInterface.buttonOnClick(button);
			switch (button.value) {
				case "next":
					generateCalendar(++changeYear);
					displayBiweeklyRotation(changeYear);
					switchDisplay("aRotation", toggleRotation);
					switchDisplay("bRotation", toggleRotation);
					generateSavingsProjector(currentDeposit, true);
					// if (toggleSavings) {
					// 	switchDisplay("savings-projection", true);
					// }
					console.log(currentBalance);
				break;
				case "previous":
					generateCalendar(--changeYear);
					displayBiweeklyRotation(changeYear);
					switchDisplay("aRotation", toggleRotation);
					switchDisplay("bRotation", toggleRotation);
					// generateSavingsProjector(currentDeposit, false);
					// if (toggleSavings) {
					// 	switchDisplay("savings-projection", true);
					// }
					console.log(currentBalance);
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
			// ButtonInterface.buttonOnMouseEnter(button);
		}
		button.onmouseleave = function () {
			// ButtonInterface.buttonOnMouseLeave(button);
		}
	});
}
enableLifecraftButtons();