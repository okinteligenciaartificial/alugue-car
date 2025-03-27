# Alugue Car - Sistema de Aluguel de Veículos

Sistema de gerenciamento de aluguel de veículos desenvolvido com React, Node.js e PostgreSQL.

## Tecnologias Utilizadas

- Frontend: React, Vite, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Banco de Dados: PostgreSQL
- Containerização: Docker, Docker Compose
- CI/CD: GitHub Actions

## Requisitos

- Docker
- Docker Compose
- Node.js 20+
- Git

## Configuração e Execução

1. Clone o repositório:
```bash
git clone <repository-url>
cd alugue-car
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Execute com Docker Compose:
```bash
docker compose up -d
```

4. Acesse a aplicação:
- Frontend: http://localhost
- Backend: http://localhost:3000

## Estrutura do Projeto

```
.
├── src/
│   ├── components/    # Componentes React
│   ├── contexts/      # Contextos React
│   ├── lib/          # Utilitários e configurações
│   ├── pages/        # Páginas da aplicação
│   └── server/       # Código do backend
├── docker-compose.yml
├── Dockerfile
├── Dockerfile.backend
└── README.md
```

## Desenvolvimento

Para iniciar o ambiente de desenvolvimento:

```bash
npm install
npm run start
```

## Testes

```bash
npm run test        # Executa os testes
npm run test:watch  # Executa os testes em modo watch
```

## CI/CD

O projeto utiliza GitHub Actions para:
- Execução automática de testes
- Verificação de qualidade do código
- Sincronização automática de alterações