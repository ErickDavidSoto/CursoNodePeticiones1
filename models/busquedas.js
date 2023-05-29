const axios = require('axios');
const qs = require('qs');
require('dotenv').config()


class Busquedas {

    historial = []

    constructor(){
        //TODO: leer BD si existe
    }

    

    async ciudad( lugar = '' ) {
       
        let test =[];

        try {

            await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
            {
                params : {
                    'access_token': process.env.MAPBOX_KEY,
                    'limit': 1,
                    'language': 'es'
                }    
            }).then(response =>{
                
              test =  response.data.features.map( lugar => {
                    return [lugar.id ,lugar.place_name,lugar.center[0],lugar.center[1]];
                });
                
            })
            .catch(error => {
                    console.log('OCURRIO UN ERROR:',error);
            }) ;
            
        } catch (error) {
            throw error
        }

        return test;
    }

    
    async token ( usuario = '', clave = '') {
        let token =''
        try {
            //Peticion http
       
             await axios.post('https://productores.segurossura.com.ar/Security/token',
                qs.stringify ({
                    username: usuario,
                    password: clave,
                    grant_type: 'password',
                    store:'B2B'
                })
            ,
            {
                headers:{
                    Accept:'application/json',
                    Content_Type:'application/x-www-form-urlencoded'
                }
             }).then(response =>{
                token =response.data.access_token;

             })
             .catch(error => {
                     console.log('OCURRIO UN ERROR:',error);
             }) ;
    
        } catch (error) {
            console.log('EXPLOTO:',error);
        }

        return token;
        
    }

    async marca ( token = '') {



        try {

            await axios.get(`https://preproduccionproductores.segurossura.com.ar/Motor/api/Marca/`,
            {
                headers:{
                    Authorization : `bearer ${ token }`, 
                    Accept:'application/json',
                    Content_Type:'application/json'
                }
             }).then(response =>{
                
                 console.log(response.data);   
                //return [lugar.id ,lugar.place_name,lugar.center[0],lugar.center[1]];

            })
            .catch(error => {
                    console.log('OCURRIO UN ERROR:',error);
            }) ;
            
        } catch (error) {
            throw error
        }

    }

}

module.exports= Busquedas