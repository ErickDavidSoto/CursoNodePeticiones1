require('dotenv').config()
const { inquirerMenu, 
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
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
                const lugar = await leerInput('Ciudad:');
                const lugares = await busquedas.ciudad (lugar);
                console.log(lugares);
                //Buscar los Lugares

                //Mostrar Resultados
                console.log ('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:',)
                console.log('Lat:',)
                console.log('Long:',)
                console.log('Temperatura:',)
                console.log('Minima:',)
                console.log('Maxima:',)
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