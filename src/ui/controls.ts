// user interaction

export function createButton(onClick: () => void) {
    const button = document.createElement("button");
    button.innerText = "rotateY";

    button.style.position = "fixed";
    button.style.left = "4%";
    button.style.bottom = "4%";
    button.style.padding = "3% 5%";
    button.style.fontSize = "4vw";

    button.onclick = onClick;

    document.body.appendChild(button);

    return button;
}
