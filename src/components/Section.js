export default class Section {
    constructor(containerSelector, {render}) {
        this._container = document.querySelector(containerSelector);
        this._render = render;
    }

    addItem(element) {
        this._container.append(element);
    }

    addItemAfterPost(element) {
        this._container.prepend(element);
    }

    renderItems(items, userId) {
        this._render(items, userId);
    }
}