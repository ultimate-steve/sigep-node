/**
 * @author Waldson Vital dos Santos
 */
const soap = require('soap')
const config = require('../../config.json')
const convert = require('xml-js')

/**
 * Solicita Postagem Reversa
 * @args {Object} data { usuario, senha, codAdministrativo, contrato, codigo_servico, cartao, destinatario, coletas_solicitadas }
 */
module.exports = async ( data ) => {
    let params = data;

    let functions = await soap.createClientAsync( config[ENV_SIGEP].reversalurl );
    let result = await functions.solicitarPostagemReversa( params )

    if( Array.isArray( result ) ){
        result = result[0]
    }

    result = convert.xml2json( result.return )

    return result
}
