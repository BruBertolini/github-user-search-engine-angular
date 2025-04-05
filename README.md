# Github User Search Engine - Angular

Este projeto tem como objetivo criar uma aplicação simples em Angular para buscar e exibir informações sobre usuários do GitHub, incluindo seus repositórios públicos.

## Como Executar a Aplicação

### 1. Executando Localmente

Para rodar a aplicação localmente, siga os passos abaixo:

1. Baixe o código do repositório.
2. Instale as dependências utilizando o comando:

~~~bash
npm install
~~~

3. Execute o comando abaixo para iniciar a aplicação:
~~~bash
npm run start
~~~

A aplicação estará disponível em http://localhost:4200/[http://localhost:4200/].

### Via Docker

Se preferir rodar a aplicação em um ambiente dockerizado, siga os passos abaixo:

1. Construa a imagem Docker:

~~~bash
docker build -t github-username-search-engine .
~~~

2. Execute a aplicação no Docker:
~~~bash
docker run -p 4201:4200 github-username-search-engine
~~~

A aplicação estará disponível em http://localhost:4201/[http://localhost:4201/].

### Aplicação Publicada

Esta aplicação também está publicada, você pode acessar aqui[https://frolicking-empanada-3195bb.netlify.app/] 

## Funcionalidades

Esta aplicação foi construida de maneira simples para atender a estes requisitos:

1. Eu, como usuário, preciso de um campo onde inserir um usuário do GitHub e, clicando em um botão ou pressionando enter, a aplicação faça uma busca e me envie para uma página com o resultado dessa pesquisa listando os repositórios do usuário localizado. Se o usuário não existir, preciso receber um alerta da aplicação
2. Eu, como usuário, gostaria de receber um feedback de carregamento enquanto a aplicação busca os dados do usuário que eu digitei
3. Eu, como usuário, gostaria de receber o feedback da aplicação quando o usuário inserido no campo de busca não for válido de acordo com as regras de validação do GitHub
4. Eu, como usuário, gostaria de receber uma notificação caso perca a conexão com a internet durante a busca dos dados pela aplicação
5. Eu, como usuário, gostaria de poder acessar os dados de usuários que já pesquisei de modo offline

### Bibliotecas utilizadas

1. Para a configuração de dados offline, utilizei a biblioteca ngx-indexed-db[https://www.npmjs.com/package/ngx-indexed-db].
2. Para a configuração de internacionalização, utilizei a biblioteca ngx-translate [https://www.npmjs.com/package/@ngx-translate/core]
3. Para a estilização, utilizei a biblioteca bootstrap[https://www.npmjs.com/package/bootstrap]