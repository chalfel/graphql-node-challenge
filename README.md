<h1 align="center">Bem Vindo ao Digital Bank Challenge 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <img alt="Coverage" src="https://img.shields.io/badge/coverage-95%25-green" />
</p>

## Tecnologias utilizadas
 - *GraphQl*
 - *NodeJS*
 - *Jest*
 - *Docker*
 - *MongoDB*
 - *Mongoose*
 - *Husky*
 - *Eslint*


## Instalação
Primeiramente é necessário possuir:
 - NodeJS
 - Docker
 - Yarn(opcional)
 
 Tendo os mesmos instalados, basta executar o comando
```sh
yarn
ou
npm install
```

## Execução em ambiente de dev

Primeiramente, é necessário iniciar o container do MongoDB utilizando o comando:
```sh
docker-compose -f docker-compose.dev.yml up
```
Após isso, basta executar o seguinte comando: 
```sh
yarn dev
```
Após isso, acessar o endereço http://localhost:3333/graphql

## Execução em produção

```sh
docker-compose up -d
```
Após isso, acessar o endereço http://localhost:3333/graphql

## Executar testes

```sh
yarn test
```

## Autor

👤 **Caio Felix**

* Website: https://github.com/chalfel
* Github: [@chalfel](https://github.com/chalfel)
* LinkedIn: [@caio-felix](https://linkedin.com/in/caio-felix)


***
