/* ============================================================
   Visual Evidence — Scripts do site
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initNavbar();
  initBackToTop();
  initReveal();
  initContactForm();
});

/* ---------- Menu mobile ---------- */
function initMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("menu");

  if (!toggle || !menu) return;

  const close = () => {
    toggle.classList.remove("open");
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Fecha o menu ao clicar em um link
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", close);
  });

  // Fecha com a tecla Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* ---------- Navbar com sombra ao rolar ---------- */
function initNavbar() {
  const nav = document.getElementById("nav");
  if (!nav) return;

  const onScroll = () => {
    nav.style.boxShadow = window.scrollY > 8 ? "0 6px 30px rgba(2, 6, 23, 0.4)" : "none";
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- Botão voltar ao topo ---------- */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("visible", window.scrollY > 600);
    },
    { passive: true }
  );
}

/* ---------- Animação de revelação ao rolar ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  // Se o IntersectionObserver não existir, mostra tudo
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- Formulário de contato ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const status = document.getElementById("contactStatus");
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const mensagem = document.getElementById("mensagem");

  const setStatus = (message, type = "") => {
    status.textContent = message;
    status.className = "contact__status" + (type ? " " + type : "");
  };

  const clearErrors = () => {
    [nome, email, mensagem].forEach((f) => f.classList.remove("error"));
  };

  const validate = () => {
    let valid = true;
    clearErrors();

    if (!nome.value.trim()) {
      nome.classList.add("error");
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      email.classList.add("error");
      valid = false;
    }
    if (!mensagem.value.trim()) {
      mensagem.classList.add("error");
      valid = false;
    }
    return valid;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validate()) {
      setStatus("⚠️ Preencha todos os campos corretamente para enviar.", "err");
      return;
    }

    // Monta o e-mail com o conteúdo do formulário
    const subject = encodeURIComponent("Contato pelo site — Visual Evidence");
    const body = encodeURIComponent(
      `Nome: ${nome.value.trim()}\nE-mail: ${email.value.trim()}\n\n${mensagem.value.trim()}`
    );

    setStatus("✅ Mensagem pronta! Abrindo seu aplicativo de e-mail…", "ok");
    window.location.href = `mailto:romeroeletrica380@gmail.com?subject=${subject}&body=${body}`;

    form.reset();
    setTimeout(() => setStatus(""), 6000);
  });

  // Limpa o erro assim que o usuário corrige o campo
  [nome, email, mensagem].forEach((f) => {
    f.addEventListener("input", () => f.classList.remove("error"));
  });
}
