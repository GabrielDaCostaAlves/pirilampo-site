# 🐝 Escola e Creche Pirilampo — Site Institucional

Site institucional moderno e painel administrativo para a **Escola e Creche
Pirilampo** (Itabatã, Mucuri-BA). Da creche ao 9º ano, com um visual acolhedor
inspirado na luz do pirilampo (vaga-lume) e administração simples como a do
WordPress.

> O site funciona **sem nenhum custo**: Next.js na Vercel (gratuito) +
> Firebase no plano Spark (gratuito).

---

## ✨ Tecnologias

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4** + componentes no estilo **shadcn/ui**
- **Framer Motion** (animações suaves, respeitando `prefers-reduced-motion`)
- **Firebase**: Authentication, Cloud Firestore e Storage
- Deploy na **Vercel**

---

## 🚀 Rodando localmente

```bash
npm install
cp .env.example .env.local   # preencha com os dados do seu Firebase
npm run dev                  # http://localhost:3000
```

> 💡 O site abre e navega **mesmo sem o Firebase configurado** — ele mostra
> conteúdo de demonstração. O Firebase é necessário para o **login do painel**
> e para **salvar** publicações, galeria e configurações.

---

## 🔥 Configurando o Firebase (passo a passo)

1. Acesse [console.firebase.google.com](https://console.firebase.google.com) e
   crie um projeto (plano **Spark / gratuito**).
2. **Authentication** → *Sign-in method* → ative **E-mail/senha**.
   - Em *Users*, clique em **Adicionar usuário** e crie o login da equipe
     (ex.: `equipe@escolapirilampo.com.br` + uma senha).
3. **Firestore Database** → *Criar banco de dados* → modo de produção.
   - Em *Regras*, cole o conteúdo de [`firestore.rules`](./firestore.rules).
4. **Storage** → *Começar*.
   - Em *Regras*, cole o conteúdo de [`storage.rules`](./storage.rules).
5. **Configurações do projeto** → *Seus apps* → **Web** (`</>`) → copie o objeto
   `firebaseConfig` e preencha o `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Opcional: restringe o painel a estes e-mails (separados por vírgula)
NEXT_PUBLIC_ADMIN_EMAILS=equipe@escolapirilampo.com.br
```

---

## 🗂️ Estrutura de dados (Firestore)

| Collection | Documento |
|------------|-----------|
| `posts`    | `{ title, excerpt, content, coverImage, status: "draft" \| "published", createdAt }` |
| `gallery`  | `{ imageUrl, createdAt }` |
| `settings` | documento **`site`**: `{ heroTitle, heroSubtitle, phone, whatsapp, instagram, address }` |

As coleções são criadas automaticamente na primeira vez que você salva algo
pelo painel — não é preciso criá-las manualmente.

---

## 🔐 Painel administrativo

Acesse em **`/admin`** (link discreto "Acesso da equipe" no rodapé).

- **Início** — números de publicações, rascunhos e fotos + atalhos.
- **Publicações** — criar, editar, excluir, salvar rascunho e publicar.
- **Galeria** — adicionar e remover fotos.
- **Informações** — telefone, WhatsApp, Instagram, endereço e textos da Home.

Feito para ser usado por qualquer pessoa da escola, sem conhecimento técnico.

---

## 💬 Matrículas

Não há página de matrícula: **todos os botões "Matricule seu filho" abrem o
WhatsApp** da escola com a mensagem
*"Olá! Gostaria de obter informações sobre matrícula."*
O número é o configurado em **Informações → WhatsApp**.

---

## ☁️ Deploy na Vercel

1. Suba o projeto para um repositório no GitHub.
2. Em [vercel.com](https://vercel.com), importe o repositório.
3. Em *Settings → Environment Variables*, adicione as mesmas variáveis do
   `.env.local`.
4. *Deploy*. Pronto! 🎉

> Lembre-se de atualizar `SITE.url` em [`src/lib/constants.ts`](./src/lib/constants.ts)
> com o domínio final (usado em SEO, sitemap e dados estruturados).

---

## 🎨 Identidade visual

- **Azul** `#6EB7E8` · **Rosa** `#F8A3C5` · **Amarelo (a luz)** `#FFD45E`
- Tipografia: **Fraunces** (títulos) + **Plus Jakarta Sans** (texto)
- Elemento de assinatura: **vaga-lumes de luz** flutuando suavemente.

Os tokens ficam centralizados em
[`src/app/globals.css`](./src/app/globals.css).
