let timerAdd = document.querySelector('.bxs-plus-square')
let bodyM = document.querySelector('body')


class Timer {
  constructor(container, index) {
    this.container = container;
    this.index = index;
    this.intervalId = null;
    this.horas = 0;
    this.minutos = 0;
    this.segundos = 0;

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
  }

  detenerCronometro() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reiniciarCronometro() {
    this.detenerCronometro();
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
        <i class="bx bx-stop stops"></i>
        <i class="bx bx-reset resets"></i>
      </div>
    </div>`

  let tempDiv = document.createElement('div')
  tempDiv.innerHTML = baseTimer;

  let nodo = tempDiv.firstChild
  if (timers.length < 6) {
    bodyM.appendChild(nodo)
    timers = document.querySelectorAll(".container");
    timers.forEach((timer, index) => {
      timersArray.push(new Timer(timer, index));
    });
  } else {
    alert(`You cant add more timers`)
  }
})



