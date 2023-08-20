
// Function to render a CSV as an HTML table
function generateHTML(csvData) {
    const parsedData = $.csv.toObjects(csvData)

    let tableHtml = ""
    var previouseType = ""

    parsedData.forEach(entry => {
        if(entry.Type != previouseType){
            tableHtml += `<h2> ${entry.Type} </h2>`
            previouseType = entry.Type
        }
        let entryHTML = `<p> <a href=${entry.url}> ${entry.Name} </a> - ${entry.Desc} </p>`
        tableHtml += entryHTML
    })

    return tableHtml;
}

// Function to fetch and render CSV
function renderCSV(fileName, containerId = "csvContainer") {
    fetch(fileName)
        .then(response => response.text())
        .then(data => {
            const tableHtml = generateHTML(data);
            const container = document.getElementById(containerId);
            container.innerHTML = tableHtml;
        })
        .catch(error => console.error('Error fetching and rendering CSV:', error));
}