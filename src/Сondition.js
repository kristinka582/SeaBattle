/**
 * Класс, в котором мы можем управлять состоянием игры.
 */

class Condition {
    name = null;
	app = null;

	constructor(name, app) {
		Object.assign(this, { name, app });
	}

	init() {}

	start() {}

	update() {}

	stop() {}
}
