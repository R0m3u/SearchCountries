export default function selector(element) {
    let selected = document.querySelector(element);
    return selected;
}

export function selectAll(elements) {
    let selected = document.querySelectorAll(elements);
    return selected;
}