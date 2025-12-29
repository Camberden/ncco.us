const boosh = JSON.stringify({"Something": "Gold"});
document.getElementById("string-thing").innerHTML = boosh;
const date = new Date();
document.querySelector("#latest-update").innerHTML = date.getMonth();

// Successfully targets as inline =====>
const paths = document.querySelectorAll("path");
for (let path of paths) {
	console.log(path);
	const pathInitialColor = path.getAttribute("fill");
	path.onmouseenter = () => {
		path.style.fill = "magenta";
	}
	path.onmouseleave = () => {
		path.style.fill = pathInitialColor;
	}
}