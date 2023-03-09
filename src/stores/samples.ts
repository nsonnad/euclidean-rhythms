const samples = import.meta.glob("../../static/samples/**/*.mp3")

const samplePaths = Object.keys(samples).map((path) => {
	return path.replace('../../static/samples/', '');
});

export default samplePaths;
