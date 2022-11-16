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