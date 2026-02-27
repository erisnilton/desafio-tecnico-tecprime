# Frontend 

Aplicação web desenvolvida com React para consumir a API do desafio técnico.

## Visão geral

Este frontend implementa os fluxos principais de uma loja online:

- Login de usuário
- Listagem de produtos
- Carrinho com persistência local
- Checkout com criação de pedido
- Listagem e detalhe de pedidos

## Stack

- React 19 + TypeScript
- Vite
- React Router DOM
- React Hook Form + Zod
- Axios
- UnoCSS
- Sonner (toasts)

## Pré-requisitos

- Node.js 22+
- pnpm
- Backend da API em execução (veja o README do backend)

## Como executar

1. **Acesse a pasta do frontend:**

   ```bash
   cd frontend
   ```


3. **Instale as dependências:**

   ```bash
   pnpm install
   ```

4. **Execute o servidor de desenvolvimento:**

   ```bash
   pnpm dev
   ```

5. **Acesse a aplicação:**

   A aplicação estará disponível em [http://localhost:5173](http://localhost:5173)

### Credenciais de teste

Para fazer login, use as credenciais padrão criadas pelo seed do backend:

- **Usuário:** `admin`
- **Senha:** `admin`

## Scripts disponíveis

- `pnpm dev` — inicia servidor de desenvolvimento com hot reload
- `pnpm build` — gera build otimizada para produção
- `pnpm preview` — visualiza a build de produção localmente
- `pnpm lint` — executa verificação de linting

## Estrutura de pastas (resumo)

```txt
src/
  components/     # Componentes reutilizáveis (Navbar, ProductCard, UI)
  contexts/       # Estado global (Auth e Cart)
  hooks/          # Hooks customizados
  layout/         # Layouts de página
  pages/          # Páginas (Home, Cart, Checkout, Login, Order)
  services/       # Integração HTTP com API
  types/          # Tipagens compartilhadas
```

## Rotas da aplicação

- `/` — Home (catálogo)
- `/cart` — Carrinho
- `/checkout` — Finalização de compra
- `/login` — Autenticação
- `/order` — Listagem de pedidos
- `/order/:id` — Detalhe de pedido

## Integração com API

- A base URL é definida por `VITE_API_URL`.
- O token JWT é salvo no `localStorage` após login.
- As requisições autenticadas enviam `Authorization: Bearer <token>` via interceptor do Axios.

## Fluxo principal

1. Usuário pode acessar a página inicial e visualizar os produtos sem estar logado.
2. Produtos são exibidos na home, consumidos da API externa `dummyjson.com` via backend.
3. Ao tentar acessar o carrinho ou checkout sem autenticação, é redirecionado para `/login`.
4. Após login, usuário adiciona produtos ao carrinho (persistido no `localStorage`).
5. No checkout, o frontend envia os dados do pedido para o backend.
6. Usuário acompanha histórico e detalhes dos pedidos nas rotas `/order` e `/order/:id`.

## Observações importantes

- Este projeto depende **obrigatoriamente** da API do backend para autenticação, produtos e pedidos.
- Para desenvolvimento local completo, execute backend e frontend **simultaneamente** em terminais diferentes.
- O backend deve estar rodando na porta `3000` (padrão) ou ajuste `VITE_API_URL` no `.env`.
- O carrinho é persistido localmente via `localStorage` - não é sincronizado entre dispositivos.
