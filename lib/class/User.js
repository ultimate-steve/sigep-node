/**
 * @author Walson Vital dos Santos
 */
 const servicesSIGEP = require('./Services')

 /**
  * @class
  */
 class Init {
     constructor(){
         //important
         this.usuario = null
         this.senha = null
         this.codAdministrativo = null
         this.idContrato = null
         this.idCartaoPostagem = null
         this.identificador = null //CNPJ
         this.cepOrigem = null
         this.clienteData = {}
 
         //bind
         this.init = this.init.bind( this )
         this.getUser = this.getUser.bind( this )
         this.getContrato = this.getContrato.bind( this )
         this.getServicos = this.getServicos.bind( this )
         this._setClienteData = this._setClienteData( this )
     }
 
     //init
     init({ usuario, senha, usuarioReverso, senhaReverso, codAdministrativo, idContrato, idCartaoPostagem, identificador, cepOrigem = null, env = "production" }){
 
         this.usuario = usuario
         this.senha = senha
         this.usuarioReverso = usuarioReverso
         this.senhaReverso = senhaReverso
         this.codAdministrativo = codAdministrativo
         this.idContrato = idContrato
         this.idCartaoPostagem = idCartaoPostagem
         this.identificador = identificador
         this.cepOrigem = cepOrigem
 
         global.ENV_SIGEP = env
 
         return new servicesSIGEP( this )
     }
 
     /**
      * Get user Data.
      */
     getUser(){
         return {
             usuario: this.usuario,
             senha: this.senha,
             usuarioReverso: this.usuarioReverso,
             senhaReverso: this.senhaReverso,
             codAdministrativo: this.codAdministrativo,
             idContrato: this.idContrato,
             idCartaoPostagem: this.idCartaoPostagem,
             identificador: this.identificador,
             cepOrigem: this.cepOrigem,
             clienteData: this.clienteData
         }
     }
 
     getContrato( idContrato = null ){
         return this.clienteData.contratos.find(( val ) => {
             if(idContrato){
                 return val.contratoPK.numero === idContrato
             }
 
             return val.contratoPK.numero === this.idContrato
         })
     }
 
     getServicos( idCartaoPostagem ){
         let cartao = null
         if( idCartaoPostagem ){
             cartao = this.getContrato().cartoesPostagem.find(( val ) => {
                 return val.numero === idCartaoPostagem
             })
         }else{
             cartao = this.getContrato().cartoesPostagem.find(( val ) => {
                 return val.numero === this.idCartaoPostagem
             })
 
         }
 
         if(cartao){
             return cartao.servicos
         }else{
             throw Error("Não foi encontrado cartão de postagem")
         }
     }
 
     _setClienteData( data ){
         this.clienteData = {
             ...this.clienteData,
             ...data
         }
     }
 
 }
 
 module.exports = new Init()
 