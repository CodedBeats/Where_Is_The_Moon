const modal = document.getElementById("log-modal") as HTMLElement | null
const modalMessage = document.getElementById("log-data-message") as HTMLElement | null

export const logDataHelper = (message: string) => {
    toggleModal()

    modalMessage!.innerHTML = message
}

const toggleModal = () => {
    if (modal?.style.display === "block") {
        modal.style.display = "none"
    } else {
        modal!.style.display = "block"
    }
}
