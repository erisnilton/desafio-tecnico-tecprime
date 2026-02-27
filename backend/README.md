# Backend

Esta API foi desenvolvida para atender aos requisitos do desafio técnico da Tecprime.

Confira o detalhamento arquitetural em: [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🚀 Como executar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 22+)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) e Docker Compose

### Passos para inicialização

1.  **Clonar o repositório:**

    ```bash
    git clone git@github.com:erisnilton/desafio-tecnico-tecprime.git
    cd desafio-tecnico-tecprime/backend
    ```

2.  **Instalar dependências:**

    ```bash
    pnpm install
    ```

3.  **Subir o banco de dados (Docker):**

    ```bash
    docker compose up -d
    ```

4.  **Executar migrations e seeds:**

    ```bash
    pnpm run migrate:up
    pnpm seed
    ```

5.  **Executar a API:**
    ```bash
    pnpm run start:dev
    ```

---

## 📡 API Endpoints

Abaixo estão as principais rotas da aplicação:

| Método | Rota          | Descrição                                 | Autenticação |
| :----- | :------------ | :---------------------------------------- | :----------- |
| `POST` | `/auth`       | Realiza o login e retorna o token JWT     | Não          |
| `GET`  | `/auth/me`    | Retorna os dados do usuário logado        | Sim          |
| `POST` | `/users`      | Registra um novo usuário no sistema       | Sim          |
| `GET`  | `/products`   | Lista todos os produtos disponíveis       | Não          |
| `POST` | `/orders`     | Cria um novo pedido para o usuário logado | Sim          |
| `GET`  | `/orders/:id` | Retorna os dados do pedido logado         | Sim          |

## 🛠️ Tecnologias utilizadas

A stack foi escolhida visando **produtividade**, **segurança** e **escalabilidade**:

- **[NestJS (v11)](https://nestjs.com/):** Framework Node.js progressivo que utiliza TypeScript. Escolhido pela sua arquitetura fortemente inspirada no Angular, promovendo o uso de módulos, provedores e controladores que facilitam a criação de aplicações altamente testáveis e escaláveis.
- **[PostgreSQL](https://www.postgresql.org/):** Banco de dados relacional robusto e open-source. Sua confiabilidade e suporte a tipos de dados complexos (como JSONB) garantem uma base sólida para a persistência de dados.
- **[Knex.js](https://knexjs.org/) & [Objection.js](https://vincit.github.io/objection.js/):**
  - O **Knex** atua como um Query Builder SQL flexível e poderoso, facilitando a escrita de queries e o gerenciamento de migrations.
  - O **Objection** é um ORM leve construído sobre o Knex que traz o poder dos modelos e relacionamentos sem esconder o SQL, mantendo a performance elevada.
- **[TypeScript](https://www.typescriptlang.org/):** Adiciona tipagem estática ao JavaScript, permitindo a detecção de erros em tempo de desenvolvimento e melhorando drasticamente a experiência de manutenção e autocompletar do IDE.
- **[Zod](https://zod.dev/):** Biblioteca de declaração e validação de esquemas focada em TypeScript. Utilizada para validar rigorosamente os DTOs de entrada, garantindo que a API só processe dados no formato esperado.
- **[JWT (JSON Web Token)](https://jwt.io/):** Utilizado para autenticação segura e stateless. O token permite que o servidor identifique o usuário em cada requisição sem a necessidade de manter sessões em memória.
- **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js):** Algoritmo de hashing de senhas de última geração, garantindo que as credenciais dos usuários nunca sejam armazenadas em texto puro.

---

## 📈 Melhorias que faria se tivesse mais tempo

- **Unidade e Integração:** Implementar testes unitários e de integração para os principais fluxos da API.
- **Transacionalidade:** Garantir que a criação de pedidos e itens ocorra em uma mesma transação atômica.
- **Real-time:** Implementar WebSockets (Gateways) para notificar alterações de status de pedidos instantaneamente.
- **Documentação:** Integrar o Swagger (`@nestjs/swagger`) para uma interface de testes interativa.
- **Observabilidade:** Adicionar Winston para centralização de logs.
- **Agregação:** Implementar agregações para relatórios de pedidos e usuários.
