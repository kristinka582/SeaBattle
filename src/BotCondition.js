/**
 * Класс, отвечающий за внешнее изменение состояния игры. Состояние игры.
 */

class BotCondition extends Condition {

    start() {
        document.querySelectorAll('.button_container_bot').forEach((el) => el.style.display = "");
        document.querySelector('.app_title').style.marginBottom = "12px";
    }

    update() {
		const { mouse, opponent, player } = this.app;

        const cells = opponent.cells.flat();
		cells.forEach((cell) => cell.classList.remove("battlefield_item_active"));

        if (isUnderPoint(mouse, opponent.table)) {

            const cell = cells.find((cell) => isUnderPoint(mouse, cell));

            if(cell) {
                cell.classList.add("battlefield_item_active");

                if (mouse.left && !mouse.previouseLeft) {
					const x = parseInt(cell.dataset.x);
					const y = parseInt(cell.dataset.y);

                    const shot = new ShotFront(x, y);
                    const result = opponent.addShot(shot);
                }
            }
        }
    }
}