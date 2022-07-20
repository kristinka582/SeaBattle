/**
 * Класс, отвечающий за создание кораблей и их направление.
 */

import Ship from "./Ship.js";

export default class ShipFront extends Ship {
	div = null;
	startX = null;
	startY = null;
	
	constructor(size, direction, startX, startY) {
		super(size, direction);
		
		const div = document.createElement("div");
		div.classList.add("ship");
		
		Object.assign(this, {div, startX, startY});
		
		this.setDirection(direction, true);
	}
	
	// Хотелось бы, чтобы выстрелы по кораблю тоже хранились тут, чтобы не рисовать их поверх корабля, а внутри его div
	setDirection(newDirection) {
		this.div.classList.remove(`ship-${this.direction}-${this.size}`);
		this.direction = newDirection;
		this.div.classList.add(`ship-${this.direction}-${this.size}`);
		
		return true;
	}
}
