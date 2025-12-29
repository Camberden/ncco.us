const boosh = JSON.stringify({"Something": "Gold"});
document.getElementById("string-thing").innerHTML = boosh;
const date = new Date();
document.querySelector("#latest-update").innerHTML = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();

// Successfully targets as inline =====>
const paths = document.querySelectorAll("path");
for (let path of paths) {
	const pathInitialColor = path.getAttribute("fill");
	path.onmouseenter = () => {
		path.style.fill = "grey";
	}
	path.onmouseleave = () => {
		path.style.fill = pathInitialColor;
	}
}