export function openModal(modal, props) {
    return {
        type: 'OPEN_MODAL',
        modal,
        props,
    }
}

export function closeModal() {
    return {
        type: 'CLOSE_MODAL',
    }
}

export function setTariffs(tariffs) {
    return {
        type: "SET_TARIFFS",
        tariffs,
    }
}

export function addTariff(tariff) {
    return {
        type: "ADD_TARIFF",
        tariff,
    }
}

export function setTariff(tariff) {
    return {
        type: "SET_TARIFF",
        tariff,
    }
}

export function setServices(services) {
    return {
        type: "SET_SERVICES",
        services,
    }
}