/**
 * Класс, отвечающий за внешнее изменение состояния игры. Состояние игры.
 */

import Condition from "./Сondition.js";
import ShipFront from "./ShipFront.js";
import ShotFront from "./ShotFront.js";
import {getRandomBetween, isUnderPoint} from "./additional.js";

export default class BotCondition extends Condition {
	playerMove = true;
	
	/** @type {Element} */
	status = null;
	
	/**l @type {string | null} */
	userName = null;
	sum = 20;
	
	start() {
		this.userName = prompt('Введите свое имя');
		// Нет проверки на пустую строку, когда просто нажато ОК
		if (this.userName === null) {
			this.userName = 'игрок';
		}
		
		const totalShips = document.querySelector('.count_play_total');
		totalShips.style.display = "";
		const counterShips = document.querySelector('.count_play');
		counterShips.textContent = '0'
		
		const {opponent} = this.app;
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
	
	// Вызывается бесконечно на каждый кадр, рисует в 60 к/с
	// Непонятна логика работы через бесконечный цикл с отслеживанием мышки,
	// когда можно было подписаться на каждую ячейку или вообще на всю таблицу и по target ловить элемент под курсором
	update() {
		const {mouse, opponent, player} = this.app;
		const isEnd = opponent.loser || player.loser;
		const cells = opponent.cells.flat();
		// Здесь постоянно удаляет и добавляет обратно ниже по коду класс battlefield_item_active,
		// из-за чего бесконечно меняется DOM
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
			
			if (cell) {
				cell.classList.add("battlefield_item_active");
				
				if (this.playerMove && mouse.left && !mouse.previouseLeft) {
					const x = parseInt(cell.dataset.x);
					const y = parseInt(cell.dataset.y);
					const shot = new ShotFront(x, y);
					
					const result = opponent.addShot(shot);
					
					if (result) {
						// Может быть преобразовано к обычному условию без тернарного оператора
						this.playerMove = shot.variant === "промах" ? false : true;
					}
					
					if (shot.variant != "промах") {
						this.sum--;
						const totalShips = document.querySelector('.count_play_total');
						totalShips.style.display = "";
						const counterShips = document.querySelector('.count_play');
						counterShips.textContent = `${20 - this.sum}`
					}
				}
			}
		}
		
		if (!this.playerMove) {
			const x = getRandomBetween(0, 9);
			const y = getRandomBetween(0, 9);
			
			const shot = new ShotFront(x, y);
			const result = player.addShot(shot);
			
			// В идеале, хотелось бы видеть изменение алгоритма выстрела со случайного на удары по соседству
			// для уничтожения соседних клеток подбитого корабля.
			// Сейчас бот всегда случайно бьёт по полю вне зависимости от результата
			if (result) {
				// Может быть преобразовано к обычному условию без тернарного оператора
				this.playerMove = shot.variant === "промах" ? true : false;
			}
		}
		
		if (this.playerMove) {
			this.status.textContent = `Ваш ход, ${this.userName}`;
		} else {
			// Так как update вызывается 60 раз в сек., эта надпись практически не появляется и иногда моргает.
			// Нужно либо убрать, либо сделать синтетическую задержку на "размышления" бота
			this.status.textContent = "Ход компьютера";
		}
		
	}
}
