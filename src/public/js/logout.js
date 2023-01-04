let timeLimit = 3
window.onload = () =>setInterval(muestraReloj, 1000);
muestraReloj = () => {
    if(timeLimit>0 )updateDisplay(timeLimit--);
    else window.location.replace("../")
}
updateDisplay = val => document.getElementById("counter-label").innerHTML = `${val} segundos`;


