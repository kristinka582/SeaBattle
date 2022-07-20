/**
 * Родительский класс, отвечающий за выстрелы.
 */

// Нет смысла в наследовании для классов, которые не будут иметь больше одного потомка
export default class Shot {
	x = null;
	y = null;
	variant = null;
	
	constructor(x, y, variant = "промах") {
		Object.assign(this, {x, y, variant});
	}
	
	setVariant(variant) {
		this.variant = variant;
	}
}
