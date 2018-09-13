let instance = null;

export default() => {
	instance = instance || new blu.Component({
		ads : [],
		circle_indicator : [],
		main() {


		},


	});

	return instance;
}
