import React, {Fragment, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

const Formulario = ({crearCita}) => {

    // Crear state de citas
    const [cita, actualizarCita] = useState({
        paciente: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })

    const [error, actualizarError] = useState(false)

    //Funcion que se ejecuta al escribir en el formulario
    const handleChange = (e) =>{
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    //extraer valores
    const {paciente,fecha,hora,sintomas} = cita;

    //enviar formulario
    const submitCita = a => {
        a.preventDefault();
        console.log(paciente)
        //validaciones
        if(paciente.trim() === '' || hora.trim() === '' 
        || fecha.trim() === '' || sintomas.trim() === ''){
            actualizarError(true)
            return;
        }
        //eliminar el mensaje de error
        actualizarError(false)

        //asignar id
        cita.id = uuidv4();

        //crear cita
        crearCita(cita)

        //reiniciar form
        actualizarCita({
            paciente: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return ( 
        <Fragment>
            <h2> Crear Cita</h2>

            {error ? <p className="alerta-error">Llenar todos los campos</p>
            : null}

            <form
            onSubmit={submitCita}
            
            > 
                <label>Nombre Paciente</label>
                <input
                    type="text"
                    name="paciente"
                    className="u-full-width"
                    placeholder="Nombre Paciente"
                    onChange={handleChange}
                    value={paciente}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handleChange}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={handleChange}
                    value={hora}
                />
                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={handleChange}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar</button>
            </form>
        </Fragment>
     );
}


export default Formulario;