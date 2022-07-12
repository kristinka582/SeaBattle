/**
 * Класс, отвечающий за внешнее отображение игрового поля. 
 * Создание игрового поля с помощью матрицы. Добавление кораблей.
 * table - игровое поле
 * ships_cell - корабли
 * 
 */
class BattlefieldFront extends Battlefield {

    root = null;
	table = null;
	ships_cell = null;
	polygon = null;
	cells = [];
	showShipsBot = true;

	constructor(showShipsBot = true) {
		super();

		const root = document.createElement("div");
		root.classList.add("battlefield");

		const table = document.createElement("table");
		table.classList.add("battlefield_table");

		const ships_cell = document.createElement("div");
		ships_cell.classList.add("battlefield_ships");

		const polygon = document.createElement("div");
		polygon.classList.add("battlefield_polygon");

		Object.assign(this, { root, table, ships_cell, polygon, showShipsBot });
		root.append(table, ships_cell, polygon);

		for (let y = 0; y < 10; y++) {
			const row = [];
			const tr = document.createElement("tr");
			tr.classList.add("battlefield_row");
			tr.dataset.y = y;

			for (let x = 0; x < 10; x++) {
				const td = document.createElement("td");
				td.classList.add("battlefield_column");
				Object.assign(td.dataset, { x, y });

				tr.append(td);
				row.push(td);
			}

			table.append(tr);
			this.cells.push(row);
		}

		for (let x = 0; x < 10; x++) {
			const cell = this.cells[0][x];
			const marker = document.createElement("div");

			marker.classList.add("marker", "marker_column");
			marker.textContent = "АБВГДЕЖЗИК"[x];

			cell.append(marker);
		}

		for (let y = 0; y < 10; y++) {
			const cell = this.cells[y][0];
			const marker = document.createElement("div");

			marker.classList.add("marker", "marker_row");
			marker.textContent = y + 1;

			cell.append(marker);
		}
	}

	addShip(ship, x, y) {

		if (!super.addShip(ship, x, y)) {
			return false;
		}

		if (this.showShipsBot) {
			this.ships_cell.append(ship.div);

			if (ship.placed) {
				const cell = this.cells[y][x];
				const cellRect = cell.getBoundingClientRect();
				const rootRect = this.root.getBoundingClientRect();

				ship.div.style.left = `${cellRect.left - rootRect.left}px`;
				ship.div.style.top = `${cellRect.top - rootRect.top}px`;
			} else {
				ship.setDirection("row");
				ship.div.style.left = `${ship.startX}px`;
				ship.div.style.top = `${ship.startY}px`;
			}
		}

		return true;
	}

	addShot(shot, x, y) {
		if (!super.addShot(shot, x, y)) {
			return false;
		}
		this.polygon.append(shot.div);

		const cell = this.cells[shot.y][shot.x];
		const cellRect = cell.getBoundingClientRect();
		const rootRect = this.root.getBoundingClientRect();

		shot.div.style.left = `${cellRect.left - rootRect.left}px`;
		shot.div.style.top = `${cellRect.top - rootRect.top}px`;

		return true;
	}

	removeShot(shot) {
		if (!super.removeShot(shot)) {
			return false;
		}

		if (Array.prototype.includes.call(this.polygon.children, shot.div)) {
			shot.div.remove();
		}

		return true;
	}

	clear() {
		this.removeAllShots();
		this.removeAllShips();
	}
	
}