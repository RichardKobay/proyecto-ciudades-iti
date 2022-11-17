window.addEventListener("load", () => {
    getStates()
})


function getStates() {
    const xhttp = new XMLHttpRequest()
    xhttp.open("GET", env.host + "/src/api/api.json", true)
    xhttp.send()

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText)
            
            for (const state of data) {
                const select = document.getElementById("statesSelect")                
                let opt = document.createElement("option")
                let content = document.createTextNode(state.estado)
                
                opt.appendChild(content)
                opt.setAttribute("value", state.key)
                select.appendChild(opt)
            }
        }
    }
}

const getCities = () => {
    const xhttp = new XMLHttpRequest()
    xhttp.open("GET", env.host + "/src/api/api.json", true)
    xhttp.send()

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText)

            let citiesdiv = document.createElement("div")
            let body = document.querySelector("body")
            let citiesSel = document.createElement("select")
            let statesSelect = document.getElementById("statesSelect")
            let selectedOpt = getSelectedOption(statesSelect).index
            let statesCities = data[selectedOpt].municipios

            citiesdiv.setAttribute("id", "citiesDiv")
            citiesdiv.classList.add("cities-div")
            body.append(citiesdiv)

            const subtitle = document.createElement("h2")
            subtitle.classList.add("subtitle")
            subtitle.innerHTML = "Seleccione la ciudad"
            citiesdiv.appendChild(subtitle)

            for (const city of statesCities) {
                // console.log(city)
                let opt = document.createElement("option")
                let content = document.createTextNode(city)
                let valueString = data[selectedOpt].key + "_" + city.replace(" ", "_")

                console.log(valueString)

                opt.appendChild(content)
                opt.setAttribute("value", valueString)
                citiesSel.appendChild(opt)
                citiesdiv.appendChild(citiesSel)
            }

            statesSelect.setAttribute("disabled", "")
            
            const getCitiesBtn = document.getElementById("button")
            const getImagesButton = document.createElement("button")
            
            getCitiesBtn.setAttribute("disabled", "")
            getImagesButton.classList.add("button")
            getImagesButton.classList.add("cities-button")
            getImagesButton.innerHTML = "Dame las imagenes"
            citiesdiv.appendChild(getImagesButton)
        }
    }
}


function getSelectedOption(select) {
    let selectedOpt = select.options[select.selectedIndex]
    return selectedOpt
}

const btn = document.getElementById("button")
    
btn.addEventListener("click", () => {
    getCities()
})