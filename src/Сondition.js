/**
 * Класс, в котором мы можем управлять состоянием игры.
 */

export default class Condition {
	/** @type {string} */
	name = null;
	
	/** @type {App} */
	app = null;
	
	constructor(name, app) {
		// Почему не использовать обычное присвоение?
		Object.assign(this, {name, app});
	}
	
	init() {}
	
	start() {}
	
	update() {}
}
