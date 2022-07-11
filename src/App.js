/**
 * Класс-сборка игры. Поле игрока и оппонента.
 */

class App {
    
    mouse = null;

	player = null;
	opponent = null;

	conditions = {};
	activeCondition = null;

    constructor(conditions = {}) {
		const mouse = new MouseCoordinates(document.body);
		const player = new BattlefieldFront();
		const opponent = new BattlefieldFront();

        Object.assign(this, { mouse, player, opponent });

        document.querySelector('[data-side="player"]').append(player.root);
		document.querySelector('[data-side="opponent"]').append(opponent.root);

		for (const [conditionName, conditionClass] of Object.entries(conditions)) {
			this.conditions[conditionName] = new conditionClass(conditionName, this);
		}

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