# 🥊 Backend Fight 2024

> API desenvolvida para a Rinha de Backend 2024 utilizando TypeScript, Fastify e PostgreSQL

## 📋 Sobre o Projeto

Este projeto foi desenvolvido para participar da Rinha de Backend 2024, um desafio que visa testar a performance e eficiência de APIs construídas com diferentes tecnologias e estratégias de otimização.

## 🚀 Tecnologias

- **TypeScript** - Linguagem principal
- **Fastify** - Framework web performático
- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM** - ORM type-safe para TypeScript
- **Docker** - Containerização
- **Zod** - Validação de schemas

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js (versão 18+)
- pnpm ou npm
- Docker e Docker Compose

### Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/backend-fight-2024.git
   cd backend-fight-2024
   ```

2. **Instale as dependências:**
   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` baseado no `.env.example` (se existir)

4. **Inicie o banco de dados:**
   ```bash
   docker-compose up -d db
   ```

5. **Execute as migrações:**
   ```bash
   pnpm run db:migrate
   ```

6. **Inicie o servidor de desenvolvimento:**
   ```bash
   pnpm run dev
   ```

## 📂 Estrutura do Projeto

```
src/
├── controllers/     # Controladores das rotas
├── db/             # Configuração do banco e schemas
├── routes/         # Definição das rotas
├── services/       # Lógica de negócio
├── types/          # Tipos TypeScript
└── utils/          # Utilitários e helpers
```

## 🔧 Scripts Disponíveis

- `pnpm run dev` - Inicia o servidor em modo desenvolvimento
- `pnpm run build` - Compila o projeto para produção
- `pnpm run start` - Inicia o servidor em modo produção

## 🐳 Docker

Para executar a aplicação completa com Docker:

```bash
docker-compose up -d
```

## 🏆 Performance

Este projeto foi otimizado para alta performance seguindo as diretrizes da Rinha de Backend 2024, incluindo:

- Uso do Fastify para máxima velocidade
- Pool de conexões otimizado com PostgreSQL
- Queries eficientes com Drizzle ORM
- Validação rápida com Zod

## 📝 Licença

Este projeto está sob a licença ISC.
