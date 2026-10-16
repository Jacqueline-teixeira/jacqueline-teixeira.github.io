async function loadPostList() {
  const listEl = document.getElementById("post-list");

  try {
    const res = await fetch("posts/posts.json");
    if (!res.ok) throw new Error("Não foi possível carregar posts.json");
    const posts = await res.json();

    if (!posts.length) {
      listEl.innerHTML = '<p class="state-message">Nenhum post publicado ainda.</p>';
      return;
    }

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    listEl.innerHTML = posts.map(post => `
      <a class="post-item" href="post.html?slug=${encodeURIComponent(post.slug)}">
        <span class="post-date">${formatDate(post.date)}</span>
        <h3>${post.title}</h3>
        <p class="excerpt">${post.excerpt || ""}</p>
        ${post.tags && post.tags.length ? `<div class="tags">${post.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>` : ""}
      </a>
    `).join("");
  } catch (err) {
    listEl.innerHTML = '<p class="state-message">Erro ao carregar os posts.</p>';
    console.error(err);
  }
}

function formatDate(isoDate) {
  const date = new Date(isoDate + "T00:00:00");
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

loadPostList();
