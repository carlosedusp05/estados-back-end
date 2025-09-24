/**************************************************************************************
 * Objetivo: API responsável em criar end-points referente estados e cidades
 * Data: 15/09/2025
 * Autor: Carlos Eduardo 
 * Versão: 1.0
 * 
 * Observações: Instalar dependencias para criar a API
 *      express     - npm install express       --save  Instala as dependencias para criar API
 *      cors        - npm install cors          --save  Instala as dependencias para configurara as permissões de uma API
 *      body-parser - npm install body-parser   --save  Instala as dependencias para receber os tipos de dados via POST ou PUT
 *************************************************************************************/

//Import das dependencias 
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Import do arquivo de funções  
const dados = require('./modulo/funcoes.js')

//Define a porta padrão da API, se for em um servidor de nuvem não temos acesso a porta
//em execução local podemos falar definir uma porta livre
const PORT = process.PORT || 8080

//Instancia na classe do express
const app = express()

app.use((request, response, next)=>{
    response.header('Acess-Control-Allow-Origin', '*')//IP de Origem
    response.header('Acess-Control-Allow-Methods', 'GET')//Métodos (Vebos) do protocolo HTTP

    app.use(cors())
    next()//Proximo
})

//Request  -> recebe os dados da API
//Response -> envia od dados na API

//EindPoints
app.get('/v1/estados', function(request, response){
    let estados = dados.getAllEstados()

    response.status(estados.statuscode)
    response.json(estados)
})

app.get('/v1/estado/capital/', function(request, response){
    let sigla = request.query.uf
    let capitalSigla = dados.getCapitalBySigla(sigla)

    response.status(capitalSigla.statuscode)
    response.json(capitalSigla)
})

app.get('/v1/estado/:uf', function(request, response){
    let sigla = request.params.uf
    let estadoSigla = dados.getEstadoBySigla(sigla)

    response.status(estadoSigla.statuscode)
    response.json(estadoSigla)
})

app.get('/v1/regiao/:regiao', function(request, response){
    let regiao = request.params.regiao
    let estadoRegiao = dados.getEstadosByRegiao(regiao)

    response.status(estadoRegiao.statuscode)
    response.json(estadoRegiao)
})

app.get('/v1/pais/:pais', function(request, response){
    let pais = request.params.pais
    let paisCapitais = dados.getCapitalEstadosByPais(pais)

    response.status(paisCapitais.statuscode)
    response.json(paisCapitais)
})

app.get('/v1/sigla/:sigla', function(request, response){
    let sigla = request.params.sigla
    let siglaEstados = dados.getCidadesBySigla(sigla)

    response.status(siglaEstados.statuscode)
    response.json(siglaEstados)
})



app.get('/v1/regiao/estado/:id', function(request, response){
    let regiaoEstados = request.query.regiao
    let sigla = request.query.uf
    let id = request.params.id
    
    console.log(regiaoEstados)
    console.log(sigla)
    console.log(id)
})

//Start da API
app.listen(PORT, function(){
    console.log('api está aguardando...')
})