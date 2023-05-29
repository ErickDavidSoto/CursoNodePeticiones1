require('dotenv').config()
const { inquirerMenu, 
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist,
    listarLugares
} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');


const main  = async () => {
 
    const busquedas = new Busquedas();
    let opt = '';
    let token = ''

    do {
        // Imprimir el menú
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Mostrar mensaje
                //Busco la ciudad
                const lugar = await leerInput('Ciudad:');
                //mBusco la ciudad
                const lugares = await busquedas.ciudad (lugar);
                //listo ciudades con esos nombres
                const id = await listarLugares(lugares);
                //selecciono una ciudad
                const lugarselec = lugares.find( l => l[0] === id);

                //busco el clima
                const tiempo = await busquedas.climaLugar(lugarselec[2],lugarselec[3]);
                console.log(tiempo);
                //Mostrar Resultados
                console.log ('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:',lugarselec[1]);
                console.log('Lat:',lugarselec[2]);
                console.log('Long:',lugarselec[3]);
                console.log('Temperatura:',tiempo.max);
                console.log('Minima:',tiempo.min);
                console.log('Maxima:',tiempo.temp);
                console.log('Como está el clima:',  tiempo.desc.green );

            break;

            case 2:
            break;

            case 3:
            break;

            case 4:
                const usuario = await leerInput('usuario:');
                const clave = await leerInput('clave:');
                token = await busquedas.token ( usuario , clave );
                
                
            break;

            case 5:
                console.log('El token es :',token);
                await busquedas.marca ( token );

            break;
             
        }


        //guardarDB( tareas.listadoArr );

        await pausa();

    } while( opt !== 0 );

}


main ();