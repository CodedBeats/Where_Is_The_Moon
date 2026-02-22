// user interaction

export function rotateCameraBtn(onClick: () => void) {
    const button = document.createElement("button");
    button.innerText = "rotateY";

    button.style.position = "fixed";
    button.style.left = "4%";
    button.style.bottom = "4%";
    button.style.padding = "3% 5%";
    button.style.fontSize = "3vw";

    button.onclick = onClick;

    document.body.appendChild(button);

    return button;
}


// temp trigger to get phone rotation
export const getPhoneRotation = (onClick: () => void) => {
    const button = document.createElement("button");
    button.innerText = "Rotation Logs";

    button.style.position = "fixed";
    button.style.left = "25%";
    button.style.bottom = "4%";
    button.style.padding = "3% 5%";
    button.style.fontSize = "3vw";

    button.onclick = onClick;

    document.body.appendChild(button);

    return button;
}
