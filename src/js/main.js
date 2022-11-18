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
                opt.classList.add("opt")
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

            citiesSel.setAttribute("id", "citiesSelect")
            citiesSel.classList.add("select")
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
                opt.classList.add("opt")
                let content = document.createTextNode(city)
                let valueString = data[selectedOpt].key + "_" + city.replaceAll(" ", "_")

                // console.log(valueString)

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
            getImagesButton.setAttribute("id", "getImagesButton")
            getImagesButton.innerHTML = "Dame las imagenes"
            citiesdiv.appendChild(getImagesButton)

            buttonGetImages()
        }
    }
}

function getImages() {
    const body = document.querySelector("body")
    const citiesSelect = document.getElementById("citiesSelect")
    const button = document.getElementById("getImagesButton")
    let selectedOpt = getSelectedOption(citiesSelect).value
    let containerDiv = document.createElement("div")
    containerDiv.classList.add("container-div")
    containerDiv.setAttribute("id", "containerDiv")
    body.append(containerDiv)
    
    for (const imgLink of picDic[selectedOpt]) {
        let imgContainer = document.createElement("div")
        imgContainer.classList.add("img-container")
        imgContainer.setAttribute("id", "imgContainer")
        let img = document.createElement("img")
        img.setAttribute("src", imgLink)
        img.classList.add("state-img")
        imgContainer.appendChild(img)
        containerDiv.appendChild(imgContainer)
    }

    citiesSelect.setAttribute("disabled", "")
    button.setAttribute("disabled", "")

    const resetButton = document.createElement("button")
    resetButton.innerHTML = "Reset"
    resetButton.classList.add("button", "reset-button")
    resetButton.setAttribute("id", "resetButton")
    resetButton.setAttribute("onClick", "location.reload(true)")
    body.appendChild(resetButton)
}


function getSelectedOption(select) {
    let selectedOpt = select.options[select.selectedIndex]
    return selectedOpt
}

const btn = document.getElementById("button")
    
btn.addEventListener("click", () => {
    getCities()
})

function buttonGetImages() {
    const button = document.getElementById("getImagesButton")
    button.addEventListener("click", () => {
        getImages()
    })
}

// console.log(picDic["AGS_Aguascalientes"])