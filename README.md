# Donkey Web — Frontend

> **Trabalho Prático** da cadeira de **Computação em Cloud**  
> Mestrado em Inteligência Artificial e Ciência de Dados (IACD)

Aplicação web desenvolvida em **Angular 21** que serve de frontend para a plataforma *Donkey*, permitindo que produtores registem burros e patrocinadores publiquem posts associados a esses animais. A comunicação com o backend é feita via REST API.

---

## Pré-requisitos

| Ferramenta | Versão mínima |
|---|---|
| Node.js | 22 |
| npm | 10 |
| Angular CLI | 21 |
| Docker *(opcional)* | 20 |

---

## Execução em modo de desenvolvimento

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar o ambiente

Por defeito, o ambiente de desenvolvimento aponta para uma API local em `http://localhost:8080`.  
O ficheiro de configuração é [`src/environments/environment.development.ts`](src/environments/environment.development.ts):

```ts
export const environment = {
  apiUrl: 'http://localhost:8080'
};
```

Para apontar para a API de produção (Google Cloud Run), edite [`src/environments/environment.ts`](src/environments/environment.ts):

```ts
export const environment = {
  apiUrl: 'https://donkey-api-210165239795.europe-west1.run.app'
};
```

### 3. Iniciar o servidor de desenvolvimento

```bash
npm start
# ou
ng serve
```

A aplicação ficará disponível em **http://localhost:4200**.

---

## Build de produção

```bash
npm run build
```

Os artefactos são gerados em `dist/donkey-web/browser/`.

---

## Execução com Docker

O projeto inclui um `Dockerfile` multi-stage que compila a aplicação e a serve com **Nginx**.

### Construir a imagem

```bash
docker build -t donkey-web .
```

### Executar o container

```bash
docker run -p 8080:8080 donkey-web
```

A aplicação ficará disponível em **http://localhost:8080**.

A porta pode ser configurada através da variável de ambiente `PORT`:

```bash
docker run -e PORT=3000 -p 3000:3000 donkey-web
```

---

## Estrutura do projeto

```
src/
├── app/
│   ├── components/
│   │   ├── home/           # Página principal — listagem de posts
│   │   ├── login/          # Autenticação
│   │   ├── register/       # Registo de utilizador
│   │   ├── create-donkey/  # Registo de burro (Produtor)
│   │   └── create-post/    # Publicação de post (Patrocinador)
│   ├── guards/             # Guardas de rotas por papel (PRODUCER / SPONSOR)
│   ├── models/             # Interfaces TypeScript (User, Donkey, Post)
│   └── services/           # Serviços HTTP (auth, donkeys, posts, storage)
├── environments/           # Configuração de ambientes (dev / prod)
└── assets/
```

### Papéis de utilizador

| Papel | Permissões |
|---|---|
| `PRODUCER` | Registar novos burros |
| `SPONSOR` | Criar posts associados a burros |

---

## Variáveis de ambiente relevantes

| Variável | Descrição | Valor padrão |
|---|---|---|
| `PORT` | Porta exposta pelo Nginx (Docker) | `8080` |
| `apiUrl` | URL base da REST API | Ver `environment.ts` |
