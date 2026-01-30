# Kamban — Frontend

Aplicação web de quadros Kanban (Kamban) para organização de tarefas. Permite criar quadros, colunas e (futuramente) cards, com suporte a drag and drop para reordenação. Desenvolvida em React com TypeScript.

---

## Índice

- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Scripts](#scripts)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
- [Rotas](#rotas)
- [Estado global (Zustand)](#estado-global-zustand)
- [API e serviços](#api-e-serviços)
- [Convenções](#convenções)

---

## Tecnologias

| Categoria         | Tecnologia                                                                     |
| ----------------- | ------------------------------------------------------------------------------ |
| **Framework**     | React 19                                                                       |
| **Linguagem**     | TypeScript 5.8                                                                 |
| **Build**         | Vite 6                                                                         |
| **Roteamento**    | TanStack Router (file-based)                                                   |
| **Requisições**   | Axios + TanStack React Query                                                   |
| **Estado global** | Zustand                                                                        |
| **Formulários**   | React Hook Form + Zod + @hookform/resolvers                                    |
| **Drag and drop** | @hello-pangea/dnd                                                              |
| **UI / estilos**  | Tailwind CSS 4, Radix UI (Dialog, Popover, Tooltip), Lucide React, React Icons |
| **Utilitários**   | clsx, tailwind-merge                                                           |

---

## Pré-requisitos

- **Node.js** 18+
- **pnpm** (recomendado) ou npm/yarn

---

## Instalação

```bash
# Clone o repositório (se ainda não tiver)
git clone <url-do-repositorio>
cd kamban-front

# Instale as dependências
pnpm install
```

---

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
```

- **`VITE_API_URL`**: URL base da API backend. Se não for definida, o padrão é `http://localhost:3000`.

---

## Scripts

| Comando        | Descrição                                         |
| -------------- | ------------------------------------------------- |
| `pnpm dev`     | Sobe o servidor de desenvolvimento (Vite) com HMR |
| `pnpm build`   | Compila TypeScript e gera o build de produção     |
| `pnpm preview` | Serve o build de produção localmente              |
| `pnpm lint`    | Executa o ESLint no projeto                       |

---

## Estrutura do projeto

```
kamban-front/
├── public/                 # Assets estáticos
├── src/
│   ├── api/                # Cliente HTTP (Axios)
│   │   └── api.ts
│   ├── assets/             # Imagens e ícones
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Inputs/         # Input, InputColor
│   │   ├── Layout/
│   │   │   └── Sidebar/    # Menu lateral + NavItem
│   │   ├── Modal/         # Sistema de modais (Portal, Root, Content, etc.)
│   │   ├── Pages/         # Container e exports de página
│   │   └── Tooltip/
│   ├── context/           # Context API
│   │   └── AuthContext.tsx # Autenticação (user, signin, signup, logout)
│   ├── hooks/
│   │   └── useAuth.ts     # Hook de autenticação
│   ├── Interfaces/        # Tipos/contratos (ex.: IBoard)
│   ├── layouts/
│   │   └── AuthLayout.tsx
│   ├── pages/             # Páginas por feature
│   │   ├── Board/         # Página do quadro (colunas + drag and drop)
│   │   │   ├── BoardColumns/
│   │   │   ├── components/ (CreateColumnModal)
│   │   │   └── hooks/     (useDragEndDropHandler)
│   │   ├── Boards/        # Listagem de quadros
│   │   │   └── components/ (CardBoard, CreateBoardModal, DeleteBoardModal, EditBoardModal)
│   │   ├── Dashboard/
│   │   ├── Login/
│   │   └── Register/
│   ├── routes/            # TanStack Router (file-based)
│   │   ├── __root.tsx     # Root + AuthProvider
│   │   ├── _app.tsx       # Layout com Sidebar, proteção por token
│   │   ├── _app/
│   │   │   ├── boards/
│   │   │   │   ├── index.tsx  # Lista de quadros
│   │   │   │   └── $id.tsx   # Quadro por ID
│   │   │   └── dashboard.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── services/          # Chamadas à API
│   │   ├── auth/
│   │   ├── boards/        # getBoards, getBoardById, createBoard, updateBoard, deleteBoard
│   │   └── columns/      # createColumn
│   ├── stores/
│   │   └── boardStore.ts  # Estado do quadro atual (Zustand)
│   ├── types/             # Tipos do router etc.
│   ├── utils/             # cn, formatRelativeDate
│   ├── index.css          # Estilos globais + Tailwind
│   ├── main.tsx           # QueryClientProvider, RouterProvider
│   └── routeTree.gen.ts   # Árvore de rotas gerada
├── .env
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## Funcionalidades

### Autenticação

- **Login**: e-mail e senha; token JWT armazenado em `localStorage`.
- **Registro**: nome, e-mail, senha e nome da organização; redirecionamento para login.
- **Logout**: remove token e redireciona para `/login`.
- Rotas protegidas (`/_app/*`) verificam o token em `beforeLoad` e redirecionam para `/login` se não houver token.

### Quadros (Boards)

- **Listagem** (`/boards`): lista todos os quadros do usuário; botão "Novo quadro".
- **Criação**: modal com nome e cor do quadro.
- **Edição**: modal para alterar nome/cor.
- **Exclusão**: modal de confirmação.
- **Acesso ao quadro**: clique no card leva para `/boards/:id`.

### Quadro individual (`/boards/:id`)

- Exibe nome do quadro e botão para **criar coluna** (modal).
- Se não houver colunas, mostra mensagem orientando a criar uma.
- **Colunas** são exibidas em área com scroll horizontal; cada coluna tem título e área para cards (futuro).

### Drag and drop

- **Colunas**: é possível arrastar e soltar colunas para reordenar.
- A reordenação é feita no **estado local (Zustand)**; a UI atualiza na hora, sem nova requisição a cada movimento.
- Futuramente: drag and drop de **cards** dentro da mesma coluna ou entre colunas (hook já preparado com tipo `CARD`).

### Colunas

- Criação via modal (título) associado ao board atual.
- Colunas vêm no payload do board (`getBoardById`); ordem e lista são controladas pelo `boardStore` após o carregamento inicial.

---

## Arquitetura

### Roteamento (TanStack Router)

- **File-based**: rotas derivadas da estrutura em `src/routes/`.
- **Root** (`__root.tsx`): envolve a aplicação com `AuthProvider`.
- **Layout autenticado** (`_app.tsx`): sidebar + `<Outlet />`; em `beforeLoad` verifica `localStorage.getItem('token')` e redireciona para `/login` se não houver token.
- **Parâmetros**: quadro acessado por `$id` em `_app/boards/$id.tsx`.

### Estado

- **Servidor (cache)**: React Query para boards e board por id; invalidação após criar/editar/deletar board ou criar coluna, conforme uso nos modais.
- **Board atual (UI/drag)**: Zustand (`boardStore`) guarda o board retornado por `getBoardById`; a página do board lê e escreve nesse store (setBoard ao receber dados da query, reorderColumns no drag de colunas). Assim, o drag and drop não depende de nova requisição a cada movimento.

### Fluxo do board

1. **Board** (`pages/Board/index.tsx`): `useQuery(['board', id], getBoardById)` busca o board.
2. **Efeitos**: ao mudar `id`, o store é limpo (`setBoard(null)`); quando a query retorna o board, chama `setBoard(boardFromQuery)`.
3. A UI usa `board` do **store** (nome, colunas).
4. **BoardColumns** lê `board.columns` do store e usa `useDragEndDropHandler('COLUMN')`; no `onDragEnd` chama `reorderColumns(sourceIndex, destinationIndex)` no store.

### Hook de drag and drop

- **`useDragEndDropHandler(type)`** em `pages/Board/hooks/useDragEndDropHandler.ts`.
- **Parâmetro**: `type: 'COLUMN' | 'CARD'`.
- **Retorno**: `{ onDragEnd }`, callback compatível com `DragDropContext` do @hello-pangea/dnd.
- **COLUMN**: chama `reorderColumns(source.index, destination.index)` no `boardStore`.
- **CARD**: reservado para reordenação/movimentação de cards (ainda não implementado).

---

## Rotas

| Rota          | Descrição                   | Proteção    |
| ------------- | --------------------------- | ----------- |
| `/login`      | Login                       | Pública     |
| `/register`   | Registro de usuário         | Pública     |
| `/boards`     | Lista de quadros            | Autenticada |
| `/boards/:id` | Quadro individual (colunas) | Autenticada |
| `/dashboard`  | Dashboard                   | Autenticada |

---

## Estado global (Zustand)

### `boardStore` (`src/stores/boardStore.ts`)

Usado na página do board para manter uma cópia do board atual e permitir atualizações locais (ex.: reordenar colunas) sem refetch imediato.

| Estado / Ação    | Tipo / Assinatura                         | Descrição                                                          |
| ---------------- | ----------------------------------------- | ------------------------------------------------------------------ |
| `board`          | `BoardDetailsDTO \| null`                 | Board atual (id, name, color, organizationId, updatedAt, columns). |
| `setBoard`       | `(board) => void`                         | Define o board (ex.: após getBoardById).                           |
| `reorderColumns` | `(sourceIndex, destinationIndex) => void` | Reordena colunas e atualiza o campo `order` de cada uma.           |
| `setColumns`     | `(columns) => void`                       | Substitui a lista de colunas do board no store.                    |

DTOs principais (em `services/boards/getBoardById.ts`):

- **BoardDetailsDTO**: id, name, color, organizationId, updatedAt, columns.
- **BoardColumnDTO**: id, title, order.

---

## API e serviços

- **Cliente**: `src/api/api.ts` — instância Axios com `baseURL` de `VITE_API_URL` e interceptor que envia `Authorization: Bearer <token>` quando há token em `localStorage`.
- **Auth**: `services/auth/auth.service.ts` — signin, signup.
- **Boards**: `services/boards/` — getBoards, getBoardById, createBoard, updateBoard, deleteBoard.
- **Colunas**: `services/columns/` — createColumn.

Os serviços são usados pelas páginas e modais, em conjunto com React Query (queries e mutations) e, no caso do board atual, com o `boardStore`.

---

## Convenções

- **Alias**: `@/` aponta para `src/` (configurado no Vite e no TypeScript).
- **Componentes**: PascalCase; páginas e features em pastas sob `src/pages/`.
- **Rotas**: file-based em `src/routes/`; arquivo gerado `routeTree.gen.ts` não deve ser editado manualmente.
- **Estilos**: Tailwind CSS; utilitário `cn()` (clsx + tailwind-merge) para classes condicionais.
- **Formulários**: React Hook Form + Zod para validação; @hookform/resolvers para integração.

---

## Próximos passos sugeridos

- Implementar drag and drop de **cards** (tipo `CARD` no `useDragEndDropHandler` e ações no store ou em novo store de cards).
- Persistir a **ordem das colunas** no backend após reorder (ex.: PATCH/PUT e invalidar query do board).
- Tratar erros de API (ex.: 401 para redirect ao login, mensagens amigáveis).
- Testes (unitários e de integração) para stores, hooks e fluxos críticos.
