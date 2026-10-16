# jacqueline-teixeira.github.io

Portfólio pessoal e blog, feitos com HTML, CSS e JavaScript puro, publicados
via GitHub Pages.

Site: https://jacqueline-teixeira.github.io

## Estrutura

```
.
├── index.html          # Página inicial (portfólio)
├── blog.html           # Lista de posts do blog
├── post.html           # Visualização de um post individual
├── css/style.css        # Estilo do site
├── js/blog.js           # Carrega e lista os posts em blog.html
├── js/post.js           # Carrega e renderiza um post em post.html
└── posts/
    ├── posts.json        # Índice com metadados de todos os posts
    └── *.md              # Conteúdo de cada post em Markdown
```

## Como editar o portfólio

Edite diretamente `index.html`: seção "Sobre mim", lista de projetos e links
de contato/redes sociais.

## Como adicionar um novo post no blog

1. Crie um arquivo `posts/meu-novo-post.md` com o conteúdo em Markdown.
2. Adicione uma entrada em `posts/posts.json`:

   ```json
   {
     "slug": "meu-novo-post",
     "title": "Título do post",
     "date": "AAAA-MM-DD",
     "excerpt": "Resumo curto que aparece na lista do blog.",
     "tags": ["tema1", "tema2"]
   }
   ```

3. Faça commit e push para a branch `main`. O GitHub Pages publica a
   atualização automaticamente em alguns segundos/minutos.

Não é necessário nenhum passo de build — tudo é lido diretamente pelo
navegador em tempo de execução.

## Rodando localmente

Como o site usa `fetch()` para carregar `posts.json` e os arquivos
Markdown, é preciso servir os arquivos por HTTP (abrir `index.html`
diretamente com `file://` não funciona). Uma forma simples:

```bash
python3 -m http.server 8000
```

Depois acesse http://localhost:8000.

## Publicação (GitHub Pages)

O site é publicado automaticamente a partir da branch `main` (pasta raiz),
configurado em *Settings → Pages* do repositório no GitHub.
