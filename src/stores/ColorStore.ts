let colors = [
	"#ceb369",
	"#7a5dda",
	"#5dda61",
	"#c82d2d",
	"#4087d4"
]

function getNextColor() {
	let nextColor = colors.shift()
  return nextColor;
}

function putColorBack(color: string) {
	colors.push(color);
}

export default {
	getNextColor: getNextColor,
	putColorBack: putColorBack
}
