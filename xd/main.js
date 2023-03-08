let teclado = ["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","ñ","z","x","c","v","b","n","m"]
let letrasIngresadas = []
const tecladoP = document.querySelector(".teclado")
const tecladoPal = document.querySelector(".palabra")
const tecla = document.querySelector(".tecla")
const tecladoimg = document.querySelector(".borrar")
const cuadradoJuego = document.querySelector(".cuadrado-juego")
const ganador = document.querySelector("h1")
const perdedor = document.querySelector(".perdedor")
const ahorcado = document.querySelector(".ahorcado")
let palabras = ["perro","gato"]
let hecha = false
let h = 0;
let errores = 0;
ahorcado.style.left = `${cuadradoJuego.offsetLeft/2-ahorcado.clientWidth/2}px`
tecladoP.removeChild(tecladoP.children[0])
const random = (max,min)=>{
    let i = Math.floor((Math.random() *max)+min)
    return palabras[i]
}
const comprobar = (l)=>{
    if (palabra.includes(l) && !letrasIngresadas.includes(l)) {
        for (let i = 0;i<palabra.length;i++) {
            if (tecladoPal.children[i].children[0].textContent == l) {
                tecladoPal.children[i].children[0].style.opacity = "1"
                letrasIngresadas.push(l)
                h++;
                if (h == palabra.length) {
                    hecha = true
                    cuadradoJuego.classList.add("animate__backOutUp")
                    cuadradoJuego.classList.add("animate__animated")
                    ganador.classList.add("animate__backInUp")
                    ganador.classList.add("animate__animated")
                    ganador.style.display = "block"
                    ahorcado.style.display = "none"
                }
            }
            
        }
    } else {
        errores++
        ahorcado.style.backgroundImage = `url("img/${errores}.png")`
        if(errores == 5) {
            console.log("a")
            cuadradoJuego.classList.add("animate__backOutDown")
            cuadradoJuego.classList.add("animate__animated")
            perdedor.classList.add("animate__backInDown")
            perdedor.classList.add("animate__animated")
            ahorcado.style.display = "none"
            perdedor.style.display = "block"
        }
        document.children[0].children[1].style.backgroundColor = "red"
        let r = 0;
        let q = "sumar"
        const rotar = setInterval(()=>{
            if (r>25) {
                q = "restar"
            }
            if (r<-25) {
                q = "sumar"
            }
            if (q=="sumar") {
                r+= 3
            } else {
                r-= 3
            }
            cuadradoJuego.style.transform = `rotate(${r}deg)`
        },10)
        setTimeout(()=>{
            if (errores!=5) {
                document.children[0].children[1].style.backgroundColor = "rgb(44, 204, 44)"
            }
            clearInterval(rotar)
            cuadradoJuego.style.transform = `rotate(0deg)`
        },500)
    }
}
let palabra = random(palabras.length,0) 
for (let i = 0; i<teclado.length; i++) {
    let teclam = tecla.cloneNode(true)
    teclam.children[0].textContent = teclado[i]
    if (teclado[i] == "z") {
        teclam.classList.add('z')
    }
    teclam.addEventListener("click",()=>{
        l = teclam.children[0].textContent
        if (hecha == false && errores !=5) {
            comprobar(l)
        }
    })
    tecladoP.insertBefore(teclam, tecladoimg);
}
for (let i = 0;i<palabra.length;i++) {
    let letrac = tecladoPal.children[0].cloneNode(true)
    letrac.children[0].textContent = palabra[i]
    tecladoPal.appendChild(letrac)
}
tecladoPal.removeChild(tecladoPal.children[0])
document.addEventListener("keydown",(e)=>{
    let valortecla = e.key
    if (hecha == false && errores !=5) {
        comprobar(valortecla)
    }
})