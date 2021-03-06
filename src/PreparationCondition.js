/**
 * Класс, отвечающий за внешнее изменение состояния игры. Первоначальное состояние.
 */

 class PreparationCondition extends Condition {

    start() {
  
      const { player, opponent } = this.app;

      opponent.clear();
      player.removeAllShots();
      player.ships.forEach((ship) => (ship.killed = false));
      document.querySelector('.button_container_bot').style.display = "none";
      document.querySelector('.button_container_praparation').style.display = "";

      const randomizeButton = document.querySelector('.pushable_ships');

	    randomizeButton.addEventListener("click", () => this.randomize());
    }

    randomize() {
		  const { player } = this.app;
		  player.randomize(ShipFront);
      const playButton = document.querySelector('.pushable_play');
      playButton.style.display = "";
      playButton.addEventListener('click', () => this.startBot());
	  }

    startBot() {
      const hiddenClassPreparation = document.querySelector('.button_container_praparation');
      hiddenClassPreparation.style.display = "none";
      
      this.app.start('bot');
    }
}