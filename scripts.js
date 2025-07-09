document.addEventListener('DOMContentLoaded', () => {
    console.log("Bienvenido a mi portafolio");

    // FORMULARIO DE CONTACTO
    const form = document.getElementById('form-contacto');
const alerta = document.getElementById('alerta');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  if (!nombre || !email || !mensaje) {
    alerta.style.color = 'red';
    alerta.textContent = 'Por favor completa todos los campos.';
    return;
  }

  try {
    const respuesta = await fetch('http://localhost:3000/contacto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         nombre: nombre,
          email: email,
          mensaje: mensaje
      })
    });

    const texto = await respuesta.text();

    if (respuesta.ok) {
      alerta.style.color = 'green';
      alerta.textContent = texto;
      form.reset();
    } else {
      alerta.style.color = 'red';
      alerta.textContent = 'Error al enviar mensaje: ' + texto;
    }
  } catch (error) {
    alerta.style.color = 'red';
    alerta.textContent = 'No se pudo conectar al servidor.';
    console.error('Error de red:', error);
  }
});


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
