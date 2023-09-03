

function ListToAscii() {
    var input = document.getElementById("AListInput");
    var output = document.getElementById("AAsciiOutput");
    var inputValue = input.value;


    if (inputValue.startsWith("["))
        inputValue = inputValue.slice(1);
    if (inputValue.endsWith("]"))
        inputValue = inputValue.slice(0, -1);


    // Split the input by space or comma, depending on which is found
    var delimiter = inputValue.includes(",") ? "," : " ";
    var arr = inputValue.split(delimiter);

    // Remove empty elements and trim spaces from remaining elements
    arr = arr.filter(function (element) {
        // Remove leading and trailing spaces using trim
        var trimmedElement = element.trim();
        // Keep non-empty elements
        return trimmedElement !== "";
    });

    // Convert each element to its relevant ASCII character
    var asciiArr = arr.map(function (element) {
        // Try to parse the element as an integer
        var intValue = parseInt(element, 10);
        // Check if parsing was successful and within the valid ASCII range (0-127)
        if (!isNaN(intValue) && intValue >= 0 && intValue <= 127) {
            // Convert the integer to the corresponding ASCII character
            return String.fromCharCode(intValue);
        } else {
            // If parsing failed or the value is out of range, leave it unchanged
            return element;
        }
    });

    output.innerHTML = asciiArr.join("");
}