window.addEventListener("load", () => {
    getStates()
})


function getStates() {
    const xhttp = new XMLHttpRequest()
    xhttp.open("GET", "/src/api/api.json", true)
    xhttp.send()

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText)
            
            
            for (const iterator of data) {
                const select = document.getElementById("statesSelect")
                // console.log(iterator.key)
                // console.log(iterator.estado)
                
                let opt = document.createElement("option")
                let content = document.createTextNode(iterator.estado)
                opt.appendChild(content)
                opt.setAttribute("value", iterator.key)
                select.appendChild(opt)
                console.log(select.lastChild.previousSibling)
            }
        }
    }
}

const botoncito = document.getElementById("botoncito").addEventListener("click", () => {
    
})