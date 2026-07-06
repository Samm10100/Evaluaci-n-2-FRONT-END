document.addEventListener("DOMContentLoaded", () => {
  
  // Base de datos local
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // ==========================================
  // REFERENCIAS DE NAVEGACIÓN Y SECCIONES
  // ==========================================
  const sectionLogin = document.getElementById("section-login");
  const sectionRegister = document.getElementById("section-register");
  const sectionDashboard = document.getElementById("section-dashboard");

  const linkToRegister = document.getElementById("link-to-register");
  const linkToLogin = document.getElementById("link-to-login");

  // Cambiar a pantalla de Registro
  linkToRegister.addEventListener("click", (e) => {
    e.preventDefault();
    sectionLogin.classList.add("d-none");
    sectionLogin.classList.remove("d-flex"); // Quitamos el flex para que se oculte bien
    sectionRegister.classList.remove("d-none");
    sectionRegister.classList.add("d-flex");
  });

  // Cambiar a pantalla de Login
  linkToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    sectionRegister.classList.add("d-none");
    sectionRegister.classList.remove("d-flex");
    sectionLogin.classList.remove("d-none");
    sectionLogin.classList.add("d-flex");
  });

  // ==========================================
  // LÓGICA DE REGISTRO
  // ==========================================
  const formCrearCuenta = document.getElementById("formCrearCuenta");
  
  formCrearCuenta.addEventListener("submit", (evento) => {
    evento.preventDefault(); 

    let nombre = document.getElementById("regNombre").value;
    let telefono = document.getElementById("regTelefono").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;
    let confirmPassword = document.getElementById("regConfirmPassword").value;

    if (password !== confirmPassword) {
      Swal.fire({ icon: "error", title: "Error", text: "Las contraseñas no coinciden" });
      return;
    }

    let usuario = { nombre, telefono, email, password };
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    Swal.fire({
      icon: "success",
      title: "Cuenta creada",
      text: "El usuario " + nombre + " se registró correctamente"
    }).then(() => {
      // Simular cambio de página al Login
      linkToLogin.click();
      formCrearCuenta.reset(); 
    });
  });

  // ==========================================
  // LÓGICA DE LOGIN
  // ==========================================
  const formLogin = document.getElementById("formLogin");
  
  formLogin.addEventListener("submit", (evento) => {
    evento.preventDefault(); 

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let usuario = usuarios.find(u => u.email === email);

    if (!usuario) {
      Swal.fire({ icon: "error", title: "Error", text: "El usuario no existe" });
      return;
    }

    if (usuario.password !== password) {
      Swal.fire({ icon: "error", title: "Error", text: "La contraseña es incorrecta" });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Bienvenido",
      text: "Hola " + usuario.nombre
    }).then(() => {
      // Magia SPA: Ocultar login, Mostrar Dashboard
      sectionLogin.classList.add("d-none");
      sectionLogin.classList.remove("d-flex");
      sectionDashboard.classList.remove("d-none");
      formLogin.reset();
    });
  });

  // ==========================================
  // LÓGICA DEL DASHBOARD (GATOS)
  // ==========================================
  const startCount = 15;
  let count = startCount; 

  const actionBtn = document.getElementById('actionBtn');
  const removeBtn = document.getElementById('removeBtn');
  const btnCounter = document.getElementById('btnCounter');
  const statusCard = document.getElementById('statusCard');
  const cardHeader = document.getElementById('cardHeader');
  const cardImage = document.getElementById('cardImage');
  const cardTitle = document.getElementById('cardTitle');
  const cardDesc = document.getElementById('cardDesc');
  const footerCounter = document.getElementById('footerCounter');

  const phases = {
    primary: { 
      btnClass: 'btn-primary', cardClass: 'text-bg-primary',
      header: 'Fase 1: Gatito descansando...', title: 'Cuadro: Gato mimiendo..zzz!',
      desc: 'Hermosa pintura clásica. Tenemos suficientes unidades disponibles.',
      img: 'https://i.pinimg.com/736x/84/a1/e0/84a1e0b276dfc63f5329406da148f514.jpg' 
    },
    warning: { 
      btnClass: 'btn-warning', cardClass: 'text-bg-warning',
      header: 'Fase 2: Si sigues, se enojará!', title: 'Cuadro: Gato enojado!!!!',
      desc: 'El stock está bajando. ¡Agrega esta obra a tu carrito antes de que se agote!',
      img: 'https://i.pinimg.com/736x/f3/ab/b4/f3abb4f2807463220bacf043c3db3c68.jpg' 
    },
    danger: { 
      btnClass: 'btn-danger', cardClass: 'text-bg-danger',
      header: 'Fase 3: Toma tu merecido!', title: 'Cuadro: Gato emputado!!!!',
      desc: '¡Quedan muy pocas obras! Si no confirmas tu carrito pronto, podrías perderlo.',
      img: 'https://i.pinimg.com/736x/d9/0e/33/d90e339d910188d5f58722a3a5491df4.jpg' 
    }
  };

  function updateDashboard() {
    btnCounter.textContent = count;
    footerCounter.textContent = count;

    let currentPhase = (count > 10) ? phases.primary : (count >= 6 ? phases.warning : phases.danger);

    actionBtn.className = `btn ${currentPhase.btnClass} btn-lg custom-transition`;
    statusCard.className = `card ${currentPhase.cardClass} custom-transition shadow`;
    cardHeader.textContent = currentPhase.header;
    cardTitle.textContent = currentPhase.title;
    cardDesc.textContent = currentPhase.desc;
    cardImage.src = currentPhase.img;
  }

  actionBtn.addEventListener('click', () => {
    count--; 
    if (count === 0) {
      count = startCount; 
      alert("¡Stock agotado! Se ha repuesto el inventario de la tienda.");
    }
    updateDashboard();
  });

  removeBtn.addEventListener('click', () => {
    if (count < startCount) {
      count++; updateDashboard();
    } else {
      alert("Tu carrito de cuadros está vacío.");
    }
  });

  updateDashboard();
});