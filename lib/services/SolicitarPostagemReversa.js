/**
 * @author Cássio Tomchaca
 */
 const soap = require('soap')
 const config = require('../../config.json')
 
 /**
  * Solicita Postagem Reversa
  * @args {Object} data { codAdministrativo, contrato, codigo_servico, cartao, destinatario, coletas_solicitadas }
  */
 module.exports = async ( data , usuarioReverso, senhaReverso) => {
     let params = data;
     let hash = Buffer.from(usuarioReverso + ":" + senhaReverso).toString("base64");
     var auth = "Basic " + hash;
     let functions = await soap.createClientAsync( config[ENV_SIGEP].reversalurl, { wsdl_headers: {Authorization: auth} } );
     functions.addHttpHeader('Authorization', 'Basic ' + hash);
     let result = await functions.solicitarPostagemReversaAsync( params )
     
     if( Array.isArray( result ) ){
         result = result[0];
     }
 
     return result.solicitarPostagemReversa;
 }
 