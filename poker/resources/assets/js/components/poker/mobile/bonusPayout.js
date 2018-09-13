let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {
		}
	});
}