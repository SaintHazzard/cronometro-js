const baseTimer = document.querySelector('.container')
let plays = document.querySelector("#plays")
let stops = document.querySelector("#stops")
let resets = document.querySelector("#resets")
let addTimer = document.querySelector(".bxs-plus-square")
let bodyM = document.querySelector('body')

let intervalos = [];

let horas = 0
let minutos = 0
let segundos = 0

function iniciarCronometro(nodo) {
  return function () {
    let timer = nodo.querySelector("#timerText")

    segundos++
    if (segundos == 60) {
      segundos = 0
      minutos++;
      if (minutos == 60) {
        minutos = 0
        horas++;
      }
    }
    timer.textContent = `${horas.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`
  }

}

plays.addEventListener('click', (event) => {
  let target = event.target
  let nodoClick = target.closest('.container')
  if (!intervalo) intervalos[] = setInterval(iniciarCronometro(nodoClick), 1000);
})



stops.addEventListener("click", limpiarIntervalo)
resets.addEventListener("click", () => {
  timer.textContent = `00:00:00`
  limpiarIntervalo()
})


addTimer.addEventListener('click', () => {
  let nodoClonado = baseTimer.cloneNode(true);

  let playsClonado = nodoClonado.querySelector("#plays");
  let stopsClonado = nodoClonado.querySelector("#stops");
  let resetsClonado = nodoClonado.querySelector("#resets");

  playsClonado.addEventListener('click', (event) => {
    let target = event.target
    let nodoClick = target.closest('.container')
    console.log(nodoClick);

    if (!intervalo) intervalo = setInterval(() => (iniciarCronometro(nodoClick)), 1000);
  })

  stopsClonado.addEventListener("click", limpiarIntervalo);

  resetsClonado.addEventListener("click", () => {
    let timerClonado = nodoClonado.querySelector("#timerText");
    timerClonado.textContent = `00:00:00`;
    limpiarIntervalo();
  });

  bodyM.appendChild(nodoClonado);
});



function limpiarIntervalo() {
  clearInterval(intervalo);
  intervalo = null;
}





