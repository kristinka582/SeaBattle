/**
 * Класс-сборка игры. Поле игрока и оппонента.
 */

import MouseCoordinates from "./MouseCoordinates.js";
import BattlefieldFront from "./BattlefieldFront.js";

export default class App {
	/** @type {MouseCoordinates} */
	mouse = null;
	
	/** @type {BattlefieldFront} */
	player = null;
	
	/** @type {BattlefieldFront} */
	opponent = null;
	
	/** @type {Record<string, Condition>} */
	conditions = {};
	
	/** @type {Condition} */
	activeCondition = null;
	
	constructor(conditions = {}) {
		const mouse = new MouseCoordinates(document.body);
		const player = new BattlefieldFront();
		const opponent = new BattlefieldFront(false);
		
		// Можно обойтись без использования констант выше и сразу использовать через this,
		// тогда не понадобился бы Object.assign
		Object.assign(this, {mouse, player, opponent});
		
		document.querySelector('[data-side="player"]').append(player.root);
		document.querySelector('[data-side="opponent"]').append(opponent.root);
		
		for (const [conditionName, conditionClass] of Object.entries(conditions)) {
			this.conditions[conditionName] = new conditionClass(conditionName, this);
		}
		
		// Вход в бесконечный цикл перерисовок, можно было реализовать без этого, используя события для каждой ячейки
		requestAnimationFrame(() => this.tick());
	}
	
	start(conditionName) {
		if (this.activeCondition && this.activeCondition.name === conditionName) {
			return false;
		}
		
		if (!this.conditions.hasOwnProperty(conditionName)) {
			return false;
		}
		
		const condition = this.conditions[conditionName];
		this.activeCondition = condition;
		condition.start();
		
		return true;
	}
	
	tick() {
		requestAnimationFrame(() => this.tick());
		
		if (this.activeCondition) {
			this.activeCondition.update();
		}
		
		this.mouse.tick();
	}
}
