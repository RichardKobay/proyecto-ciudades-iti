const statesSelect = document.getElementById("states-select")

window.addEventListener("load", () => {
    getStates()
})


function getStates() {
    console.log("inside")

    const xhttp = new XMLHttpRequest()

    xhttp.open("GET", "/src/api/api.json", true)
    xhttp.send()
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText)
            let data = JSON.parse(this.responseText)

            console.log(data[0])
            for (const iterator of data) {
                console.log(data[iterator])
            }
        }
    }
}