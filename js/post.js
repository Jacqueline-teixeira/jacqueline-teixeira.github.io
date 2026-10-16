async function loadPost() {
  const contentEl = document.getElementById("post-content");
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  if (!slug) {
    contentEl.innerHTML = '<p class="state-message">Post não encontrado.</p>';
    return;
  }

  try {
    const [indexRes, mdRes] = await Promise.all([
      fetch("posts/posts.json"),
      fetch(`posts/${slug}.md`)
    ]);

    if (!mdRes.ok) throw new Error("Post não encontrado: " + slug);

    const posts = indexRes.ok ? await indexRes.json() : [];
    const meta = posts.find(p => p.slug === slug);
    const markdown = await mdRes.text();

    const html = window.marked ? window.marked.parse(markdown) : markdown;

    document.title = meta ? `${meta.title} — Jacqueline Teixeira` : "Post — Jacqueline Teixeira";

    contentEl.innerHTML = `
      ${meta ? `<h1>${meta.title}</h1><span class="post-date">${formatDate(meta.date)}</span>` : ""}
      <div class="post-body">${html}</div>
    `;
  } catch (err) {
    contentEl.innerHTML = '<p class="state-message">Erro ao carregar o post.</p>';
    console.error(err);
  }
}

function formatDate(isoDate) {
  const date = new Date(isoDate + "T00:00:00");
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

window.addEventListener("DOMContentLoaded", loadPost);
