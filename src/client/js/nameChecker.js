function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    const names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ];

    if (names.includes(inputText)) {
        return true;
    }
    return false;
}

export { checkForName };
