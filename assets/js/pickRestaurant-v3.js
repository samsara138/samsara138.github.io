var restaurantData = null

function InitPage(csvPath = "/assets/csv/Restaurants.csv") {
    const csvData = readCSV(csvPath).then(parsedData => {
        restaurantData = parsedData

        // Setup dropdowns
        const uniqueTypes = GetUniqueSet("Type")
        PopulateDropdown("typeDropdown", uniqueTypes);
        const uniqueLocations = GetUniqueSet("Location")
        PopulateDropdown("locationDropdown", uniqueLocations);
        const uniquePrices = ["All", "$", "$$", "$$$"]
        PopulateDropdown("priceDropdown", uniquePrices);
    })
}

function PopulateDropdown(dropdown, options) {
    var selectDropdown = document.getElementById(dropdown);

    // Clear existing options
    selectDropdown.innerHTML = "";

    // Add new options
    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.text = options[i];
        option.value = options[i];
        selectDropdown.add(option);
    }
}

function GetUniqueSet(field) {
    let uniqueTypes = new Set();

    for (let obj of restaurantData) {
        uniqueTypes.add(obj[field])
    }

    let uniqueTypesArray = Array.from(uniqueTypes);
    uniqueTypesArray.unshift("All")
    return uniqueTypesArray
}

function GetDropdownSelected(id) {
    var selectElement = document.getElementById(id)
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    var selectedValue = selectedOption.value;
    return selectedValue
}

function PickRestaurant() {
    var type = GetDropdownSelected("typeDropdown")
    var location = GetDropdownSelected("locationDropdown")
    var price = GetDropdownSelected("priceDropdown")
    const resultTable = document.getElementById("ResultTable")
    const noResultDisplay = document.getElementById("NoResult")

    const selected = []

    for (let i = 0; i < restaurantData.length; i++) {
        var entry = restaurantData[i]
        if (
            (type == "All" || entry.Type == type)
            &&
            (location == "All" || entry.Location == location)
            &&
            (price == "All" || entry.Price == price)
        ) {
            selected.push(entry);
        }
    }

    renderTable(selected, resultTable)

    if (selected.length > 0){
        noResultDisplay.style.display = "none"
    }else{
        noResultDisplay.style.display = "block"
    }
}

function renderTable(list, table) {
    var headerRow = table.tHead.children[0]; // Get the first (and only) row in the thead
    var tbody = table.tBodies[0];
    headerRow.innerHTML = ""
    tbody.innerHTML = ""

    for(let fieldName in list[0]){
        var th = document.createElement("th");
        th.textContent = fieldName;
        headerRow.appendChild(th);
    }

    for (let i = 0; i < list.length; i++) {
        var values = Object.values(list[i])
        console.log(values)
        var tr = document.createElement("tr");

        for(let i = 0; i < values.length; i++){
            var td = document.createElement("td");
            td.textContent = values[i];
            tr.appendChild(td); // Append td to the tr
        }

        tbody.appendChild(tr); // Append tr to the tbody
    }
}
