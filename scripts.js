document.addEventListener('DOMContentLoaded', () => {
    console.log("Bienvenido a mi portafolio");

    // FORMULARIO DE CONTACTO
    const form = document.getElementById('form-contacto');
    const alerta = document.getElementById('alerta');
    if (form && alerta) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            if (nombre === '' || email === '' || mensaje === '') {
                alerta.textContent = 'Por favor completa todos los campos.';
                alerta.style.color = 'red';
                return;
            }
            alerta.style.color = 'green';
            alerta.textContent = 'Mensaje enviado exitosamente (simulado).';
            form.reset();
        });
    }

    // BOTÓN "IR ARRIBA"
    const btnArriba = document.getElementById('ir-arriba');
    if (btnArriba) {
        window.addEventListener('scroll', () => {
            btnArriba.style.display = window.scrollY > 300 ? 'block' : 'none';
        });
        btnArriba.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // CONTADOR DE PROYECTOS
    let contador = 0;
    const numero = document.getElementById('numero-proyectos');
    function animarContador() {
        const meta = 3; // Cambia según tus proyectos reales
        const intervalo = setInterval(() => {
            if (contador < meta) {
                contador++;
                if (numero) numero.textContent = contador;
            } else {
                clearInterval(intervalo);
            }
        }, 200);
    }
    if (numero) animarContador();

    // FUNCIÓN MODO OSCURO
    window.toggleModo = function () {
        document.body.classList.toggle('modo-oscuro');
        localStorage.setItem('modoOscuro', document.body.classList.contains('modo-oscuro'));
    };

    if (localStorage.getItem('modoOscuro') === 'true') {
      document.body.classList.add('modo-oscuro')
    }
    
    // CÁLCULO DE EDAD (opcional)
    const spanEdad = document.getElementById('edad');
    if (spanEdad) {
        function calcularEdad(nacimiento) {
            const hoy = new Date();
            const cumple = new Date(nacimiento);
            let edad = hoy.getFullYear() - cumple.getFullYear();
            const m = hoy.getMonth() - cumple.getMonth();
            if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) {
                edad--;
            }
            return edad;
        }
        spanEdad.textContent = calcularEdad("2004-03-21"); // Reemplaza con tu fecha de nacimiento
    }
});
  
const secciones = document.querySelectorAll('section');

function mostrarSecciones() {
  secciones.forEach(seccion => {
    const top = seccion.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      seccion.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', mostrarSecciones);
mostrarSecciones();
