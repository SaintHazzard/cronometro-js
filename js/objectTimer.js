let timerAdd = document.querySelector('.bxs-plus-square')
let bodyM = document.querySelector('body')


class Timer {
  constructor(container) {
    this.container = container;
    this.intervalId = null;
    this.horas = 0;
    this.minutos = 0;
    this.segundos = 0;

    this.play = this.container.querySelector(".plays")
    this.stop = this.container.querySelector(".stops");

    this.iniciarCronometro = this.iniciarCronometro.bind(this);
    this.detenerCronometro = this.detenerCronometro.bind(this);
    this.reiniciarCronometro = this.reiniciarCronometro.bind(this);

    this.container.querySelector(".plays").addEventListener('click', this.iniciarCronometro);
    this.container.querySelector(".stops").addEventListener('click', this.detenerCronometro);
    this.container.querySelector(".resets").addEventListener('click', this.reiniciarCronometro);
  }

  iniciarCronometro() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => this.actualizarCronometro(), 1000);
    }
    this.toogleButtons(this.play, this.stop);
  }

  detenerCronometro() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.toogleButtons(this.play, this.stop);
  }

  reiniciarCronometro() {
    if (this.intervalId) {
      this.detenerCronometro();
    }
    this.horas = 0;
    this.minutos = 0;
    this.segundos = 0;
    this.actualizarInterfaz();
  }

  actualizarCronometro() {
    this.segundos++;
    if (this.segundos === 60) {
      this.segundos = 0;
      this.minutos++;
      if (this.minutos === 60) {
        this.minutos = 0;
        this.horas++;
      }
    }
    this.actualizarInterfaz();
  }

  actualizarInterfaz() {
    let timerText = this.container.querySelector(".timerText");
    timerText.textContent = `${this.horas.toString().padStart(2, "0")}:${this.minutos.toString().padStart(2, "0")}:${this.segundos.toString().padStart(2, "0")}`;
  }
  /**
   * 
   * @param {HTMLBodyElement} play 
   * @param {HTMLBodyElement} stop 
   */
  toogleButtons(play, stop) {
    play.classList.toggle('inactive')
    stop.classList.toggle('inactive')
  }
}


let timers = document.querySelectorAll(".container");
let timersArray = [];
timers.forEach((timer, index) => {
  timersArray.push(new Timer(timer, index));
});

timerAdd.addEventListener("click", () => {
  let baseTimer = `<div class="container">
      <div class="timer">
        <p class="timerText">00:00:00</p>
      </div>
      <div class="controls">
        <i class="bx bx-play plays"></i>
        <i class="bx bx-stop stops inactive"></i>
        <i class="bx bx-reset resets active"></i>
      </div>
    </div>`

  let tempDiv = document.createElement('div')
  tempDiv.innerHTML = baseTimer;
  timers = document.querySelectorAll(".container");
  let nodo = tempDiv.firstChild
  if (timers.length < 6) {
    bodyM.appendChild(nodo)
    timersArray.push(new Timer(nodo));
    console.log(timersArray);
  } else {
    alert(`You cant add more timers`)
  }
})



