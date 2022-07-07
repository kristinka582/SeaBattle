/**
 * Класс, отвечающий за работу с мышью, за ее координаты.
 */

class MouseCoordinates {

    elem = null;
    under = false;
    previousUnder = false;
    x = null;
    y = null;
    previousX = null;
    previouseY = null;
    left = false;
    previouseLeft = false;

    constructor (elem) {
        this.elem = elem;
        const update = (e) => {
            this.x = e.clientX;
            this.y = e.clientY;
            this.under = true;
        }

        elem.addEventListener('mousemove', (e) => {
            this.tick();
            update(e);
        });
        elem.addEventListener('mouseenter', (e) => {
            this.tick();
            update(e);
        });
        elem.addEventListener('mouseleave', (e) => {
            this.tick();
            update(e);
            this.under = false;
        });
        elem.addEventListener('mousedown', (e) => {
            this.tick();
            update(e);

            if (e.button === 0) {
                this.left = true;
            }
        });
        elem.addEventListener('mouseup', (e) => {
            this.tick();
            update(e);

            if (e.button === 0) {
                this.left = false;
            }
        });
    }

    tick () {
        this.previousX = this.x;
        this.previouseY = this.y;
        this.previousUnder = this.under;
        this.previouseLeft = this.left;
    }
}