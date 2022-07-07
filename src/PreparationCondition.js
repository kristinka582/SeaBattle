/**
 * Класс, отвечающий за внешнее изменение состояния игры. Первоначальное состояние.
 */

 class PreparationCondition extends Condition {

    start() {

        const randomizeButton = document.querySelector('.pushable_ships');

	    randomizeButton.addEventListener("click", () => this.randomize());
    }

    randomize() {
		const { player } = this.app;
		player.randomize(ShipFront);
        const playButton = document.querySelector('.pushable_play');
        playButton.style.display = "";
	}
}