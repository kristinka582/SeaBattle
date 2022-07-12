/**
 * Класс, отвечающий за внешнее изменение состояния игры. Состояние игры.
 */

class BotCondition extends Condition {

    playerMove = true;
    status = null;
    userName = null;
    sum = 20;

    start() {
        this.userName = prompt('Введите свое имя');
        if (this.userName === null) {
            this.userName = 'игрок';
        }

        const totalShips = document.querySelector('.count_play_total');
        totalShips.style.display = "";
        const counterShips = document.querySelector('.count_play');
        counterShips.textContent = '0'

        const { opponent } = this.app;
        document.querySelector('.pushable_again').style.display = "";

        document.querySelectorAll('.button_container_bot').forEach((el) => el.style.display = "");
        document.querySelector('.app_title').style.marginBottom = "12px";

        opponent.clear();
		opponent.randomize(ShipFront);

        const againButton = document.querySelector('.pushable_again');
        againButton.addEventListener('click', () => {
            this.app.start('preparation');
            document.querySelector('.pushable_again').style.display = "none";
            const totalShips = document.querySelector('.count_play_total');
            totalShips.style.display = "none";
            const counterShips = document.querySelector('.count_play');
            counterShips.style.display = "none";
        })
    }

    update() {
		const { mouse, opponent, player } = this.app;

        const isEnd = opponent.loser || player.loser;

        const cells = opponent.cells.flat();
		cells.forEach((cell) => cell.classList.remove("battlefield_item_active"));

        this.status = document.querySelector('.front_move');

        if (isEnd) {
			if (opponent.loser) {
				this.status.textContent = `Вы выиграли, ${this.userName}!`;
			} else {
				this.status.textContent = `Вы проиграли, ${this.userName} :(`;
			}

            document.querySelector('.front_again').textContent = "Играть еще раз"

			return;
		}

        if (isUnderPoint(mouse, opponent.table)) {

            const cell = cells.find((cell) => isUnderPoint(mouse, cell));

            if(cell) {
                cell.classList.add("battlefield_item_active");

                if (this.playerMove && mouse.left && !mouse.previouseLeft) {
					const x = parseInt(cell.dataset.x);
					const y = parseInt(cell.dataset.y);
                    const shot = new ShotFront(x, y);

                    const result = opponent.addShot(shot);

                    if (result) {
                        this.playerMove = shot.variant === "промах" ? false : true;
                    }

                    if (shot.variant != "промах") {
                        this.sum--;
                        const totalShips = document.querySelector('.count_play_total');
                        totalShips.style.display = "";
                        const counterShips = document.querySelector('.count_play');
                        counterShips.textContent = `${ 20 - this.sum}`
                    }
                }
            }
        }

        if (!this.playerMove) {
            const x = getRandomBetween(0, 9);
			const y = getRandomBetween(0, 9);

            const shot = new ShotFront(x, y);
			const result = player.addShot(shot);

            if (result) {
                this.playerMove = shot.variant === "промах" ? true : false;
            }
        }

        if (this.playerMove) {
			this.status.textContent = `Ваш ход, ${this.userName}`;
		} else {
			this.status.textContent = "Ход компьютера";
		}
        
    }
}