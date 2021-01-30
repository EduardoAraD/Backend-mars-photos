# Backend-mars-photos

PROJETO ALÉM DE MARTE - BACK-END
 
1. Visão Geral

    O projeto Além de Marte é um sistema que mostra as fotos recentes de Marte em que o usuário pode dar um like e visualizar a quantidade de like das mesmas. Este projeto tem o intuito de mostrar minhas habilidades em projetos Full Stack (Front-end e Back-end), e nesse repositório contém a parte Back-end.

2. Parte Técnica

    O Back-end foi realizado em Node JS com JavaScript e TypeScript. Na configuração foi utilizado a biblioteca  “Eslint” com o padrão standard para a padronização de código para o projeto. E a utilização das bibliotecas “Typeorm” e “Sqlite3” para o banco de dados. Contudo, foi trocado a biblioteca “Sqlite3” para o “Pg” (PostgreSQL) para a realização do deploy do backend na plataforma Heroku.com.

    Foi adicionado quatro bibliotecas para o sistema, o primeiro foi o “Express” para fazer o acesso às rotas url do Back-end. O segundo foi o “Axios” para acessar a api que alimenta o back-end (https://api.nasa.gov/), e ter acesso às fotos e armazená-las no sistema.

    O terceiro é o “dotenv” que serve para acessar as variáveis armazenadas no arquivo “.env” em qualquer parte do sistema. E o último é o “CORS” (Access-Control-Allow-Origin) para requisições.

3. Banco de dados e Rotas

    O banco de dados do sistema é formado por três tabelas, uma chamada “user” em que é guardado o nome do usuário. A segunda tabela é a de “photo” que armazena a url da foto, data que foi tirada e uma descrição. A terceira tabela é chamada de “like”, em que relaciona as fotos que o usuário deu um like.

    Para a utilização da api, foi feito várias rotas para em que podem ser acessados pelo link:

    https://backend-mars-photos-deploy.herokuapp.com/

    as rotas são:
    Users
        .get('/users/:id'): para mostrar um usuário,
        .post('/users'): para criar um usuário,
        .delete('/users/:id'): para deletar um usuário;
    Photos
        .get('/photos'): para mostrar as fotos de marte,
        .post('/photos/:id'): para mostrar uma foto de marte;
    Likes
        .get('/likes/:id'): para mostrar um like,
        .post('/likes'): para criar um like,
        .delete('/likes/:id'): para deletar um like

4. Extras

    Para acessar esse projeto entre pelo link abaixo,

    https://alem-de-marte-eduardoarad.netlify.app

    ou baixar este mesmo repositório e fazer seguintes comandos:

    npm install , se quiser utilizar o npm ou 
    yarn , se quiser utilizar o yarn,

    e assim que terminar de baixar as bibliotecas utilize o comando:

    npm dev  ou  yarn dev

    E por fim, para acessar o repositório do Front-end do projeto entre no link abaixo.

    https://github.com/EduardoAraD/Frontend-mars-photos
