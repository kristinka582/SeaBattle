/**
 * Файл-сброник полезных функций для игры.
 */

/**
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function getRandomBetween(min, max) {
	return min + Math.floor(Math.random() * (max - min + 1));
}

/**
 * @template T
 * @param {T} args
 * @returns {T}
 */
export function getRandomFrom(...args) {
	const index = Math.floor(Math.random() * args.length);
	return args[index];
}

/**
 *
 * @param point
 * @param {HTMLElement} element
 * @returns {boolean}
 */
export function isUnderPoint(point, element) {
	const {left, top, width, height} = element.getBoundingClientRect();
	const {x, y} = point;
	
	return left <= x && x <= left + width && top <= y && y <= top + height;
}
