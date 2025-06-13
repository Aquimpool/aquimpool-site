// Obtener query param "post"
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const postsPerPage = 6;
let currentPage = 1;
let posts = [];

const postGrid = document.getElementById("post-grid");
const pagination = document.getElementById("pagination");
const postDetail = document.getElementById("post-detail");
const backBtn = document.getElementById("backBtn");
const detailTitle = document.getElementById("detail-title");
const detailImg = document.getElementById("detail-img");
const detailDate = document.getElementById("detail-date");
const detailContent = document.getElementById("detail-content");

fetch("posts.json")
  .then(res => res.json())
  .then(data => {
    posts = data;

    updateCanonical(); // ✅ mantener aquí

    const postId = getQueryParam("post");

    if (!postId) {
      const pageParam = getQueryParam("page");
      const parsedPage = parseInt(pageParam);
      if (pageParam && !isNaN(parsedPage) && Number.isInteger(parsedPage)) {
        const totalPages = Math.ceil(posts.length / postsPerPage);
        if (parsedPage >= 1 && parsedPage <= totalPages) {
          currentPage = parsedPage;
        }
      }
    }

    if (postId) {
      showPostDetail(parseInt(postId));
    } else {
      renderPosts();
      renderPagination();
    }
  })
  .catch(err => {
    postGrid.innerHTML = "<p>Error al cargar los posts. Intente más tarde.</p>";
    console.error("Error cargando posts.json:", err);
  });




function renderPosts() {
  postGrid.innerHTML = "";
  postDetail.classList.add("hidden");
  postGrid.classList.remove("hidden");
  pagination.classList.remove("hidden");

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const currentPosts = posts.slice(start, end);

  currentPosts.forEach(post => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${post.imagen}" alt="${post.titulo}" />
      <div class="card-content">
        <h2>${post.titulo}</h2>
        <p>${post.resumen}</p>
        <span class="fecha">${post.fecha}</span><br/>
        <span class="meta">Publicada por ${post.autor} | Visitas: ${post.visitas}</span>
      </div>
    `;

    card.addEventListener("click", () => {
      history.pushState(null, "", `?post=${post.id}`);
      showPostDetail(post.id);
    });
    postGrid.appendChild(card);
  });
}

function renderPagination() {
  pagination.innerHTML = "";
  const totalPages = Math.ceil(posts.length / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.setAttribute("aria-label", `Página ${i}`);
    if (i === currentPage) {
      btn.classList.add("active");
      btn.setAttribute("aria-current", "page");
    }
    btn.addEventListener("click", () => {
      currentPage = i;
      renderPosts();
      renderPagination();
      history.pushState(null, "", `?page=${i}`);
    });
    pagination.appendChild(btn);
  }
}

function showPostDetail(postId) {
  const post = posts.find(p => p.id === postId);
if (!post) {
  postDetail.innerHTML = "<p>El post solicitado no existe.</p><button id='backBtn'>Volver al blog</button>";
  const newBackBtn = document.getElementById("backBtn");
  newBackBtn.addEventListener("click", () => {
    history.pushState(null, "", "blog.html");
    renderPosts();
    renderPagination();
    removeSchema();
  });
  return;
}


  detailTitle.textContent = post.titulo;
  detailImg.src = post.imagen;
  detailImg.alt = post.titulo;
  detailDate.innerHTML = `${post.fecha} <br> <small>Publicada por ${post.autor} | Visitas: ${post.visitas}</small>`;
  detailContent.textContent = post.resumen + " (Aquí podrías ampliar el contenido del post si quieres)";

  postDetail.classList.remove("hidden");
  postGrid.classList.add("hidden");
  pagination.classList.add("hidden");

  // Insertar schema.org dinámico
  insertSchema(post);
}

// Botón volver al listado
backBtn.addEventListener("click", () => {
  history.pushState(null, "", "blog.html");
  renderPosts();
  renderPagination();
  removeSchema();
});

// Función para insertar marcado JSON-LD schema.org
function insertSchema(post) {
  removeSchema(); // Limpiar si hay alguno

  const schema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.titulo,
  "image": post.imagen,
  "author": {
    "@type": "Organization",
    "name": post.autor
  },
  "datePublished": post.fecha,
  "publisher": {
    "@type": "Organization",
    "name": "Aquimpool Piscinas"
  },
  "description": post.resumen,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": window.location.href
  }
};


  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "jsonld-schema";
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
}

function removeSchema() {
  const old = document.getElementById("jsonld-schema");
  if (old) old.remove();
}

// Manejar navegación con botón "Atrás" del navegador
window.addEventListener("popstate", () => {
  const postId = getQueryParam("post");
  if (postId) {
    showPostDetail(parseInt(postId));
  } else {
    renderPosts();
    renderPagination();
  }
});

function updateCanonical() {
  const url = new URL(window.location.href);
  const postId = url.searchParams.get('post');

  let canonicalUrl;

  if (postId) {
    // URL canónica para un post individual
    canonicalUrl = `${window.location.origin}${window.location.pathname}?post=${postId}`;
  } else {
    // URL canónica para listado (sin page o con page=1)
    // Puedes decidir dejar solo blog.html o añadir ?page=x si quieres
    const page = url.searchParams.get('page');
    if (page && page !== '1') {
      canonicalUrl = `${window.location.origin}${window.location.pathname}?page=${page}`;
    } else {
      canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    }
  }

  // Buscar si ya existe un canonical
  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute('href', canonicalUrl);
}



// También llama updateCanonical() dentro de los handlers donde cambias URL o renderizas página/post:
function renderPosts() {
  //...
  updateCanonical();
}

function showPostDetail(postId) {
  //...
  updateCanonical();
}

