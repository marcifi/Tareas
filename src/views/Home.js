import React from 'react';
import swal from 'sweetalert';
import {useState} from 'react'

/*prevent default: Previene que al apretar el botón submit se refresque la página*/
/*se pone React.useState para no importar useState arribita, en el import de la primera línea
        */

const Home = props => {

    const [lista, setLista] = useState([
    ])
    const [user, setUser] = useState('')
    const [task, setTask] = useState('')
    const [bool, setBool] = useState(true)
    const [index, setIndex] = useState(null)

    const addTask = event => {
        event.preventDefault()
        if (!user || !task) {
            swal("Error", "Ambos campos deben ser llenados", "error");
        }
        else {
            setLista([
                ...lista,
                {
                    id: lista.length > 0 ? (lista.length) + 1 : 1,
                    user: user,
                    task: task
                }
            ]);
            swal("Agregado", "Tarea agregada exitosamente", "success")
            resetForm()
        }
    }

    const resetForm = () => {
        setUser("")
        setTask("")
    }

    const deleteTask = currentLista => {
        const copyLista = lista
        const newLista = copyLista.filter(lista => lista !== currentLista)
        setLista(newLista)
        swal("Eliminado", "Tarea eliminada exitosamente", "error")
    }

    const getLista = (user, task, i) => {
        setBool(false)
        setUser(user)
        setTask(task)
        setIndex(i)
    }

    const editTask = (event) => {
        event.preventDefault()
        console.log(index)
        lista[index].user = user
        lista[index].task = task
        swal("Editado", "Tarea editada exitosamente", "success")
        setBool(true)
        resetForm()
    }

    return (

        <div className="mt-3 container">


            <div className="row">

                <div className="col-6 mitad1">

                    <h2>{bool ? "Creador de Tareas" : "Editor de Tareas"} </h2>

                    <form onSub
                    mit={bool ? event => addTask(event) : event => editTask(event)} >

                        <div className="m-3 form-group">
                            <label htmlFor="InputUser">Usuario</label>
                            <input id="InputUser" value={user} type="text" className="form-control in_user" onChange={(event) => setUser(event.target.value)} />
                        </div>

                        <div className="m-3 form-group">
                            <label htmlFor="InputTask">Descripción</label>
                            <input id="InputTask" value={task} type="text" className="form-control in_task" onChange={(event) => setTask(event.target.value)} />
                        </div>

                        <small className="ml-3 mt-4 form-text text-muted">* Ambos campos son obligatorios.</small>
                        <button type="submit" className={`ml-3 btn ${bool ? "btn-primary" : "btn-success"} `} >{bool ? "Agregar" : "Editar"} </button>

                    </form>

                </div>


                <div className="col-6 mitad2">

                    <table className="m-3 table">

                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Descirpción</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                lista.length > 0 &&
                                lista.map((list, i) => (
                                    <tr key={i}>
                                        <th scope="row">{list.id}</th>
                                        <td>{list.user}</td>
                                        <td>{list.task}</td>
                                        <td>
                                            <i className="mt-2 ml-3 text-success fas fa-pencil-alt" onClick={() => { getLista(list.user, list.task, i) }}></i>
                                            <i className="mt-2 ml-3 text-danger fas fa-trash-alt" onClick={() => { deleteTask(list) }} ></i>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    )
}

export default Home;