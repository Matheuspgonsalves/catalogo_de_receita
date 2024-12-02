# Catálogo de Receitas (Desafio de Estágio da SOFEX)

## Sobre o Desafio

Nesta fase do processo seletivo, fui solicitado a desenvolver um código Full Stack. O desafio consiste na criação de um website para catálogo de receitas. O site conta com funcionalidades como autenticação, cadastro de usuários e integração com banco de dados. Mais detalhes sobre as funcionalidades do sistema estão disponíveis na seção [Especificações](#Especificacoes).

Caso queira acessar o site está disponível no link a seguir:
- [Catálogo de Receitas](https://catalogo-de-receita.vercel.app)

## Menu

- [Sobre o Desafio](#sobre-o-desafio)
- [Menu](#menu)
- [Especificações das Funcionalidades](#especificacoes-do-sistema)
- [Diferenciais](#diferenciais)
- [Design System do Projeto](#design-system)
- [Organização das Pastas](#organizacao-das-pastas)
- [Design Patterns](#design-patterns)
- [Ferramentas e Tecnologias Utilizadas](#ferramentas-e-tecnologias-utilizadas)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Desenvolvimento e Testes](#desenvolvimento-e-testes)
- [Como Executar o Projeto](#instrucoes-de-uso)


## Especificacoes do Sistema

As especificações exigidas incluem:

- **Autenticação de Usuário**:
  - Tela de Cadastro de Usuário.
  - Tela de Login.
  - Recuperação de senha por e-mail.
  
- **Gestão de Receitas**:
  - Tela para listar receitas.
  - Tela para adicionar novas receitas.
  - Na tela de listagem, são exibidos cards com opções para Visualizar, Editar e Deletar (CRUD).
  - Soft Delete: as receitas deletadas são marcadas como inativas no banco de dados, mas ainda mantidas para referências futuras.
  - Modal para visualizar, editar e excluir as receitas.

- **Soft Delete**: Receitas deletadas são marcadas como inativas no banco de dados, mas permanecem no sistema para possíveis referências futuras.

## Diferenciais

O diferencial deste projeto foi a implementação de **autenticação com JWT (JSON Web Token)**, proporcionando um sistema de login seguro e eficiente para os usuários. Além disso, implementei uma funcionalidade de **recuperação de senha por e-mail**, oferecendo uma experiência de usuário mais completa e prática. Essas abordagens contribuem para a segurança e usabilidade do sistema, garantindo que os usuários possam recuperar suas credenciais facilmente e de forma segura.

## Design System

Neste projeto, utilizei um **design system** para garantir consistência visual e proporcionar uma experiência de usuário fluída e agradável. O design foi criado para ser moderno, mas ao mesmo tempo acolhedor, refletindo o tema de um catálogo de receitas.

### Paleta de Cores

- **Cor Primária**: `#EC3434` (vermelho intenso), escolhida para ser a cor principal da aplicação. Ela é especialmente destacada na **navbar** e em outros elementos de navegação. Essa cor foi selecionada por sua capacidade de atrair atenção e transmitir energia e paixão, elementos frequentemente associados ao universo culinário.
  
- **Cor de Fundo**: Branco (`#FFFFFF`), utilizado no corpo do site para proporcionar um visual clean e elegante, ideal para destacar os conteúdos e receitas sem sobrecarregar o usuário.

### Tipografia

- **Fontes**:
  - **Sans-serif**: Usada para o corpo do texto, garantindo alta legibilidade e clareza.
  - **Serif**: Para títulos e cabeçalhos, criando um contraste visual que remete à tradição, ideal para a temática de receitas de cozinha.

### Componentes Reutilizáveis

Para garantir uma interface consistente e fácil de manter, desenvolvi componentes reutilizáveis:

- **Navbar**: A barra de navegação usa a cor primária `#EC3434` para destacar as opções principais de navegação do usuário, como "Receitas", "Cadastro" e "Login".
  
- **Botões**: Botões estilizados com a cor primária para ações importantes, como "Adicionar Receita" e "Deletar Receita", com estados de hover e desativados para uma interação fluída.
  
- **Formulários**: Campos de entrada padronizados com validação visual para tornar o preenchimento mais intuitivo e rápido.

## Organizacao das pastas

```bash
catalogo_de_receita/
├── backend/                            # Diretório do backend da aplicação
│   ├── config/                         # Configurações do servidor e banco de dados
│   │   └── db.js                       # Arquivo de configuração para conexão ao banco de dados
│   ├── controllers/                    # Lógica de negócios do backend
│   │   ├── authController.js           # Controlador de autenticação (login, registro, etc.)
│   │   ├── receitaController.js        # Controlador para gerenciar receitas
│   │   └── recuperarSenhaController.js # Controlador para recuperação de senha
│   ├── middlewares/                    # Middlewares do backend
│   │   └── authenticateToken.js        # Middleware para validação de tokens JWT
│   ├── models/                         # Modelos de dados do backend
│   │   ├── Receita.js                  # Modelo de dados para receitas
│   │   └── User.js                     # Modelo de dados para usuários
│   ├── node_modules/                   # Dependências do Node.js instaladas
│   ├── routes/                         # Rotas da aplicação
│   │   ├── authRoutes.js               # Rotas relacionadas à autenticação
│   │   ├── novaReceitaRoutes.js        # Rotas para adicionar novas receitas
│   │   └── recuperarSenhaRoutes.js     # Rotas para recuperação de senha
│   ├── package-lock.json               # Arquivo de bloqueio das dependências do backend
│   ├── package.json                    # Configuração e metadados do projeto backend
│   └── server.js                       # Arquivo principal do backend (inicia o servidor)

├── frontend/                           # Diretório do frontend da aplicação
│   ├── catalogo-receitas/              # Aplicação React do frontend
│   │   ├── node_modules/               # Dependências do Node.js instaladas
│   │   ├── src/                        # Código-fonte do frontend
│   │   │   ├── assets/                 # Arquivos estáticos (imagens, fontes, etc.)
│   │   │   │   └── images/             # Imagens utilizadas na interface
│   │   │   │       └── background/     # Imagens de fundo das páginas
│   │   │   │           ├── cadastro.svg # Imagem de fundo da página de cadastro
│   │   │   │           └── login.svg   # Imagem de fundo da página de login
│   │   │   ├── components/             # Componentes reutilizáveis do frontend
│   │   │   │   ├── Button/             # Botão reutilizável
│   │   │   │   │   ├── Button.css      # Estilos para o botão
│   │   │   │   │   └── Button.jsx      # Componente do botão
│   │   │   │   └── Navbar/             # Barra de navegação
│   │   │   │       ├── Navbar.css      # Estilos para a barra de navegação
│   │   │   │       └── Navbar.jsx      # Componente da barra de navegação
│   │   │   ├── contexts/               # Contextos globais do React
│   │   │   │   └── AuthContext.jsx     # Contexto de autenticação para gerenciar o estado do usuário
│   │   │   ├── pages/                  # Páginas principais da aplicação
│   │   │   │   ├── Cadastro/           # Página de cadastro
│   │   │   │   │   ├── Cadastro.css    # Estilos para a página de cadastro
│   │   │   │   │   └── Cadastro.jsx    # Componente da página de cadastro
│   │   │   │   ├── ListaReceitas/      # Página para listar receitas
│   │   │   │   │   ├── ListaReceitas.css # Estilos para a página de lista de receitas
│   │   │   │   │   └── ListaReceitas.jsx # Componente da página de lista de receitas
│   │   │   │   ├── Login/              # Página de login
│   │   │   │   │   ├── Login.css       # Estilos para a página de login
│   │   │   │   │   └── Login.jsx       # Componente da página de login
│   │   │   │   ├── NovaReceita/        # Página para adicionar uma nova receita
│   │   │   │   │   ├── NovaReceita.css # Estilos para a página de nova receita
│   │   │   │   │   └── NovaReceita.jsx # Componente da página de nova receita
│   │   │   │   ├── RecuperarSenha/     # Página de recuperação de senha
│   │   │   │   │   ├── RecuperarSenha.css # Estilos para a página de recuperação de senha
│   │   │   │   │   └── RecuperarSenha.jsx # Componente da página de recuperação de senha
│   │   │   │   ├── RedefinirSenha/     # Página de redefinição de senha
│   │   │   │   │   ├── RedefinirSenha.css # Estilos para a página de redefinição de senha
│   │   │   │   │   └── RedefinirSenha.jsx # Componente da página de redefinição de senha
│   │   │   ├── routes/                 # Configuração das rotas da aplicação
│   │   │   │   └── Routes.jsx          # Arquivo principal de roteamento
│   │   │   ├── App.jsx                 # Componente raiz da aplicação React
│   │   │   ├── index.css               # Estilos globais da aplicação
│   │   │   └── main.jsx                # Arquivo de entrada da aplicação React
│   │   ├── eslint.config.js            # Configuração do ESLint para linting do código
│   │   ├── index.html                  # Arquivo HTML de entrada do React
│   │   ├── package-lock.json           # Arquivo de bloqueio das dependências do frontend
│   │   ├── package.json                # Configuração e metadados do projeto frontend
│   │   ├── vite.config.js              # Configuração do Vite (bundler)
│   │   └── yarn.lock                   # Arquivo de bloqueio do Yarn
│   └── readme.md                       # Documentação geral do projeto
```

## Design Patterns

### Backend

A estrutura do backend segue o padrão **MVC (Model-View-Controller)**, que divide a aplicação em três partes principais:
- **Model**: Representa as entidades e a interação com o banco de dados. Exemplo: `Receita.js` e `User.js`.
- **Controller**: Contém a lógica de negócios, como no `authController.js` (autenticação) e `receitaController.js` (gerenciamento de receitas).
- **View**: Como o backend serve apenas como uma API, não há uma camada de visualização tradicional.

Além disso, utilizamos:
- **Middleware** para validação de tokens JWT, como no arquivo `authenticateToken.js`.
- **Singleton** para garantir uma única conexão com o banco de dados em `db.js`.

---

### Frontend

O frontend foi desenvolvido com **React** e segue uma arquitetura modular baseada em componentes reutilizáveis. A estrutura do diretório é organizada da seguinte maneira:

- **components/**: Contém os componentes reutilizáveis da interface, como `Button` e `Navbar`, que são utilizados em várias páginas.
- **pages/**: Contém as páginas da aplicação, como `Cadastro`, `Login`, `ListaReceitas`, entre outras. Cada página é composta por componentes específicos, oferecendo uma estrutura limpa e fácil de manter.
- **contexts/**: Utiliza o **Context API** do React para gerenciar o estado global da aplicação, como o estado de autenticação do usuário.
- **assets/**: Armazena os arquivos estáticos, como imagens e fontes, utilizados no frontend. (Apenas imagens para este projeto)

Cada página e componente foi projetado para ser modular e reutilizável, facilitando a manutenção e a escalabilidade da aplicação. A navegação entre as páginas é gerida pelo **React Router**, garantindo uma transição fluida entre as diferentes seções da aplicação.

Essa estrutura promove um código mais limpo, modular e fácil de entender, além de facilitar futuras expansões da aplicação.


## Ferramentas e Tecnologias Utilizadas

### Backend
- **Node.js**: Ambiente de execução para o JavaScript no backend.
- **Express.js**: Framework para criação de APIs e servidores HTTP.
- **MySQL**: Banco de dados relacional para armazenar dados de usuários e receitas.
- **Nodemailer**: Biblioteca para envio de e-mails no backend (exemplo: enviar e-mails de confirmação de cadastro).
- **JWT (JSON Web Token)**: Sistema de autenticação para garantir a segurança e a comunicação entre o frontend e o backend.
- **Bcrypt.js**: Biblioteca para encriptação de senhas de usuários.
- **Cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing) e permitir que o frontend faça requisições ao backend.
- **Dotenv**: Biblioteca para carregar variáveis de ambiente de um arquivo `.env`.
- **Express-validator**: Biblioteca para validar e sanitizar dados nas requisições.
- **MySQL2**: Driver para conectar ao banco de dados MySQL.
- **Sequelize**: ORM (Object-Relational Mapper) para interagir com o banco de dados MySQL de forma mais simples.
  
### Frontend
- **React.js**: Biblioteca para construção da interface de usuário.
- **Vite**: Ferramenta de build e empacotamento rápido para projetos React.
- **Axios**: Biblioteca para realizar requisições HTTP do frontend para o backend.
- **React Router**: Biblioteca para navegação entre páginas no React.
- **React-dom**: Biblioteca para renderizar componentes React no DOM.
- **React**: Biblioteca principal para a criação de componentes de interface.
- **StrictMode**: Modo de desenvolvimento do React para ajudar a identificar problemas no código.
- **createRoot**: Função do React 18 para iniciar a renderização de um aplicativo no DOM.

### Desenvolvimento e Testes
- **Insomnia**: Ferramenta para testar APIs RESTful, garantindo que o backend esteja funcionando corretamente.
- **MySQL Workbench**: Ferramenta gráfica para administração do banco de dados MySQL.

### Outros
- **Git**: Controle de versão para gerenciar o código-fonte do projeto.
- **GitHub**: Plataforma de hospedagem de código e colaboração.

## Instrucoes de Uso

Este repositório contém um projeto que utiliza Node.js, MySQL e Yarn. Para executar o projeto em sua máquina local, siga as instruções abaixo:

### Pré-requisitos

Em sua máquina você deve ter instalado:

- **Node.js**: v20.18.0
- **MySQL**: v8.0.39
- **Yarn**: v1.22.22

Verifique se estas versões estão instaladas corretamente com os seguintes comandos:

```bash
node -v
# v20.18.0

mysql -V
# mysql  Ver 8.0.39 for Win64 on x86_64 (MySQL Community Server - GPL)

yarn -v
# 1.22.22

### Passos para executar
```

#### Clone o repositório do github

    git clone git@github.com:Matheuspgonsalves/catalogo_de_receita.git

#### Acesse o repositório do projeto

    cd catalogo_de_receita

#### Backend

1 - Navegue até o diretório do backend

    cd backend

2 - Instale as dependências

    npm install 

3 -  Crie o arquivo .env com as variáveis de ambiente

```bash
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
PORT=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
```

4 - Inicie o servidor backend: No diretório backend, execute

    npm start

#### Frontend

1 - Navegue até o diretório do frontend

    cd frontend/catalogo-receitas

2 - Instale as dependências do frontend 

    yarn install 

Ou se estiver usando npm, execute

    npm install

3 -  Inicie o servidor do frontend

    yarn dev

Se estiver usando npm, execute:

    npm run dev

4 - Inicie o servidor backend: No diretório backend, execute

    npm start


