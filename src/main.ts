import "./styles/main.css";
import viteLogo from "/vite.svg";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div>
        <img src="${viteLogo}" class="logo" alt="Vite logo" />
        <p>A simple mobile Web app that shows you where the moon is relative to your current location.</p>
    </div>
`;

