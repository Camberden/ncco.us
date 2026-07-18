/** === CMBR.JS: GLOBAL UTILITIES ===>
 * @fileOverview BCN23 General site utility toolkit.
 * @interface CMBRutil
 * @author Chrispy (BCN23)
 */
// htmx.config.selfRequestsOnly = false;

/** @global @readonly @description Determines the Site's Port Number */
const basePort = document.location.port.length ? document.location.port : "";
/** @global @readonly @description Site-specific Links Configuration */
const baseHyperlinks = [
	"https://ncco.us/",
	"https://ncco.help/",
	"http://127.0.0.1:" + basePort,
	"http://localhost:" + basePort,
	"http://localhost:" + basePort + "/index.html",
];
const baseUrl = document.location.origin + "/";


/* |==========| §MULTI-SITE FUNCTIONS |====================> */
/* |==========| REUSABLE |====================> */
/**
 * @global @public @interface
 * @description - Camberden Personal Utilities:
 * Formally buttons.js, a Global JavaScript Handler
 * @author Camberden (Chrispy | Kippi)
 */
const CMBRutil = {

	buttonOnMouseEnter: function (button) {
		if (!button.classList.contains("button-toggled")) {
			button.classList.add("button-highlight");
		}
	},
	buttonOnMouseLeave: function (button) {
		button.classList.remove("button-highlight");
	},
	buttonOnClick: function (button) {
		if (button.classList.contains("toggleable")) {

			if (button.classList.contains("button-toggled")) {
				button.classList.remove("button-toggled");
			} else {
				button.classList.add("button-toggled");
			}

		} else {
			button.classList.add("button-depressed");

			setTimeout(() => {
				button.classList.remove("button-depressed");
			}, 200);
		}
	},
	/**
	 * @description Handles all page forms, preventing reload upon form submission
	 * @param {boolean} configured - Toggle boolean for default (reloading) prevention
	 * - CONFIGURED: Applies current form submission handling and default prevention
	 * - NONCONFIGURED: Returns page to normal form submission reloading
	 * @fires window#onload - Fires immediately if cmbr.js is linked
	 * @global
	 */
	handleFormDefault(configured) {
		window.onload = function () {
			if (configured) {
				console.log("Running and configured!");
				document.querySelectorAll("form").forEach(form => {
					form.addEventListener("submit", (e) => { e.preventDefault(); });
				});
			} else {
				console.log("Running! (configuration disabled)");
			}
		}
	},

	dataTheme: function () {
		document.querySelectorAll(".data-theme-button").forEach(button => {
			button.onclick = function () {
				switch (button.id) {
					case "dark":
						document.querySelector("body").setAttribute("data-theme", "dark");
						button.style.color = "initial";
						document.getElementById("light").style.color = "transparent";
						document.getElementById("legacy").style.color = "transparent";
						// document.getElementById("paperesque").style.color = "transparent";

						break;
					case "light":
						document.querySelector("body").setAttribute("data-theme", "light");
						button.style.color = "initial";
						document.getElementById("dark").style.color = "transparent";
						document.getElementById("legacy").style.color = "transparent";
						// document.getElementById("paperesque").style.color = "transparent";

						break;
					case "legacy":
						document.querySelector("body").setAttribute("data-theme", "legacy");
						button.style.color = "initial";
						document.getElementById("dark").style.color = "transparent";
						document.getElementById("light").style.color = "transparent";
						// document.getElementById("paperesque").style.color = "transparent";

						break;
					case "paperesque":
						document.querySelector("body").setAttribute("data-theme", "paperesque");
						button.style.color = "initial";
						document.getElementById("dark").style.color = "transparent";
						document.getElementById("light").style.color = "transparent";
						// document.getElementById("legacy").style.color = "transparent";

						break;
					default:
						console.log("Light, Dark, and Lavendarium.");
						break;
				}
			}
		});
		document.getElementById(document.querySelector("body").getAttribute("data-theme")).style.color = "initial";
	},

	/** @returns {Boolean} `true` if file:// protocol | `false` otherwise */
	acceptableProtocol: function () {
		if (document.location.protocol === "file:") {
			// console.log("<‰ File Protocol Detected ‰>");
			return false;
		} else {
			// console.log("<‰ CORS Acceptable Protocol Detected ‰>");
			return true;
		}
	},
	/** 
	 * @global 
	 * @readonly 
	 * @returns {Boolean} boolean 
	 * @description Reads site index URL and provides gateway for development servers and all configured domains
	 *  */
	atSiteIndex: function () {
		if (this.acceptableProtocol() && document.location.href.endsWith("index.html")) {
			return true;
		} else if (baseHyperlinks.includes(document.location.href)) {
			return true;
		} else if (document.location.href.endsWith("index.html")) {
			return true;
		} else if (document.location.href.endsWith(document.location.port + "/")) {
			return true;
		} else if (document.location.href.includes(baseHyperlinks[0])) {
			return false;
		} else {
			return false;
		}
	},
	// Function to update URL parameters

	/**
	 * 
	 * @param {HTMLElement[]} buttons 
	 * @param {Boolean} includeClick
	 */
	wireDefaultButtons: function () {
		document.querySelectorAll("button").forEach(button => {
			button.onmouseenter = () => {
				this.buttonOnMouseEnter(button);
			}
			button.onmouseleave = () => {
				this.buttonOnMouseLeave(button);
			}
			button.onclick = () => {
				this.buttonOnClick(button);
				sout("Button ID => " + button.id);
				sout("Button Value => " + button.id);

				if (button.id === "sparkle") {
					button.textContent = "✨sparkle✨"
					setTimeout(() => {
						button.textContent = "sparkle";
					}, 3000);
				}
			};
		});
	},

	/** 
	 * @description Reads cmbr.json
	 * @borrows cmbr.json
	 * @param {Array} query
	 * @implements {Promise<Object>} 
	 * 
	 */
	connectCMBRjson: async function (query) {
		return fetch(`${document.location.origin}/cmbr.json`)
			.then(data => data.json())
			.then(data => {
				// console.log(data);
				console.log("QUERY BEFORE RESOLUTION: " + query[0]);
				return data;
			})
			.then((data) => {
				query[0] == "travel-photos" ? console.log("QUERY 0 SAME: " + query[0]) : console.log("QUERY 0 NOT SAME: " + query[0]);
				query[1] == 1 ? console.log("QUERY 1 SAME: " + query[1]) : console.log("QUERY 1 NOT SAME: " + query[1]);
				console.log("QUERY LENGTH: " + query.length);
				switch (query[0]) {
					case "travel-photos":
						if (query.length == 1) {
							// console.log(data[query[0]].items);
							return (data[query[0]].items);
							break;
						}
						// console.log(data[query[0]].items[query[1]]);
						return (data[query[0]].items[query[1]]);
						break;
						break;
					case "sections":
						// console.log("sections");
						return data["sections"];
						break;
					case "blog":
						if (query.length == 1) {
							// console.log(data[query[0]]);
							return (data[query[0]]);
							break;
						}
						let post = ("post-" + query[1]);
						sout("blog as post = " + post);
						// console.log(data[query[0]][post]);
						return (data[query[0]][post]);
						break;
						break;

					default:
						sout("Bad Query at connectCMBRjson.");
						return data;
				}
			});
	}

}

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
// const fiscalYearDisplay = document.getElementById("fiscal-year");
// fiscalYearDisplay.innerHTML = `${fiscalYear}-${fiscalYear + 1}`;

let currentSchedule = salarySchedules[fiscalYear - 2020];
let currentSalary;
let highlightedSalary;
let custodyLevel = 1;
let yearsExperience = 1;

/* |==========| §NCCO.us SPECIFIC |====================> */
/* |==========| FOR COMPONENT ACCESS WIP |====================> */
const NCCOutil = {

	getMonthText: function (val) {
		const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		return months[val - 1];
	},

	getDaysInMonthOfYear: function (year, month) {
		return new Date(year, month, 0).getDate();
	},

	/**
	 * 
	 * @param {String} string 
	 * @param {Boolean} firstDay 
	 * @returns String | Number
	 */
	getDayOfWeek: function (string, firstDay) {
		const thisDate = new Date(string.replace("-", ","));
		if (!firstDay) {
			const dateString = thisDate.toLocaleDateString("en-US", dateOptions).split(",");
			return dateString[0];
		} else {
			return thisDate.getDay();
		}
	},

	generateCalendar: function (year) {
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
			const startingDay = getDayOfWeek(year + "," + (i + 1) + "," + 1, true);
			if (startingDay != 0) {
				for (let k = 0; k < startingDay; k++) {
					const emptySpan = document.createElement("span");
					emptySpan.setAttribute("class", "empty-span");
					emptySpan.appendChild(document.createTextNode("#"));
					div.appendChild(emptySpan);
				}
			}
			for (let j = 0; j < getDaysInMonthOfYear(year, i + 1); j++) {
				const span = document.createElement("span");
				span.setAttribute("id", `${year}-${i + 1}-${j + 1}`);
				span.setAttribute("class", "calendar-date");
				span.setAttribute("value", `${getDayOfWeek(span.id, false)}`);
				const text = document.createTextNode(j + 1);
				span.appendChild(text);

				div.appendChild(span);
			}
			pageField.appendChild(div);
		}
		if (changeYear === currentYear) { document.getElementById(`${currentDate}`).classList.add("current-date"); }
	},

	/**
	 * 
	 * @param {Boolean} enable 
	 */
	enlargeCalendar: function (enable) {
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
			} else if (!enable) {
				thisMonth.style = "initial";
				while (thisMonth.children.length > 1) {
					thisMonth.removeChild(thisMonth.lastChild);
				}
			}
		});
	},

	/**
	 * @todo Assign c based on currentYear param
	 */
	displayBiweeklyRotation: function (year) {

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
		if (indexBase === 0) {
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
			} else if (biweeklyRelations[indexProper].includes("On")) {
				span.classList.add("bRotation");
			}
			calendarDay.appendChild(span);
			indexProper++;
		});
	},

	enablePageButtons: function () {
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

						} else if (!toggleEnlargeCalendar) {
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
}

/* |==========| §GLOBAL RUNNERS |====================> */
/* |==========| IMMEDIATELY INVOKED FUNCTION EXPRESSIONS |====================> */
const recognizeFileProtocol = (x) => { y = document.getElementById(x); CMBRutil.acceptableProtocol() ? y.innerHTML += " &check;" : y.innerHTML += `<span style="font-size: 0.8rem; color: red; position: absolute;">[lesser functionality in file protocol]</span>`; }
const sout = (x) => { console.log("<‰=== " + (x ?? "No Output") + " ===‰>"); } //x += ("|=====* ");
const braft = (l) => document.querySelector(`${l}`).appendChild(document.createElement("br"));