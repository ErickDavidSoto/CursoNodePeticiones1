const axios = require('axios');
const qs = require('qs');
require('dotenv').config()


class Busquedas {

    historial = []

    constructor(){
        //TODO: leer BD si existe
    }

    

    async ciudad( lugar = '' ) {
       
        let ciudad =[];

        try {

            await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
            {
                params : {
                    'access_token': process.env.MAPBOX_KEY,
                    'limit': 3,
                    'language': 'es'
                }    
            }).then(response =>{
                
                ciudad =  response.data.features.map( lugar => {
                    return [lugar.id ,lugar.place_name,lugar.center[0],lugar.center[1]];
                });
                
            })
            .catch(error => {
                    console.log('OCURRIO UN ERROR:',error);
            }) ;
            
        } catch (error) {
            throw error
        }

        return ciudad;
    }

 
    async climaLugar (lat,lon) {
        let clima = []
        try {

            console.log('entro al clima');
            await axios.get("https://api.openweathermap.org/data/2.5/weather?",
            {
                params : {
                    lat,
                    lon,
                    'appid':process.env.OPENWEATHER_KEY,//'f369635965b00ad16ced5da4da4b9f3b',
                    'lang': 'es',
                    units: 'metric'                   
                }    
            })
            .then(response =>{
                
                const { weather, main } = response.data;
 
                const objeto = {
                    desc: weather[0].description,
                    min: main.temp_min,
                    max: main.temp_max,
                    temp: main.temp
                }
                 
                clima = objeto;
                // clima = response.data(tiempo =>{
                //     return [tiempo.weather[0].description,
                //             tiempo.main[2],
                //             tiempo.main[3],
                //             tiempo.temp[0]]
                //});
            })
            .catch(error=>{
                console.log(error);
            });
            
        } catch (error) {
            console.log(error)
        }

        return clima;
  
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