/**
 * Наследованный клас, отвечающий за внешнее представление выстрелов.
 */

import Shot from "./Shot.js";

export default class ShotFront extends Shot {
	div = null;
	
	constructor(x, y, variant = "промах") {
		super(x, y, variant);
		
		const div = document.createElement("div");
		div.classList.add("shot");
		
		this.div = div;
		this.setVariant(variant, true);
	}
	
	// Хотелось бы в шаблоне видеть выстрелы прямо внутри ячеек поля боя. Сейчас создаются поверх, в отдельном div
	// Также см. комментарий к ShipFront.setDirection
	setVariant(variant, force = false) {
		if (!force && this.variant === variant) {
			return false;
		}
		
		this.variant = variant;
		this.div.textContent = "";
		
		if (this.variant === "промах") {
			this.div.classList.add("shot_missed");
			this.div.textContent = "•";
		} else if (this.variant === "ранен") {
			this.div.classList.add("shot_wounded");
		} else if (this.variant === "убит") {
			this.div.classList.add("shot_wounded", "shot_killed");
			this.div.textContent = "💥";
		}
		
		return true;
	}
}
