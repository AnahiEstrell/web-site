document.getElementById('formulario').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const mensaje = document.getElementById('mensaje').value;

  const alerta = document.getElementById('alerta');
  alerta.style.display = 'none';

  try {
    const res = await fetch('/enviar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, mensaje })
    });

    const result = await res.json();

    alerta.textContent = result.message;
    alerta.style.display = 'block';
    alerta.style.backgroundColor = result.success ? '#d4edda' : '#f8d7da';
    alerta.style.color = result.success ? '#155724' : '#721c24';
    alerta.style.border = result.success ? '1px solid #c3e6cb' : '1px solid #f5c6cb';
  } catch (err) {
    alerta.textContent = 'Error de conexión al enviar el mensaje';
    alerta.style.display = 'block';
    alerta.style.backgroundColor = '#f8d7da';
    alerta.style.color = '#721c24';
    alerta.style.border = '1px solid #f5c6cb';
  }
});
