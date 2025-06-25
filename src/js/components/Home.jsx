import React, { useState } from "react";



//create your first component
const Home = () => {

	const [task, setTask] = useState("");

	const [list, setList] = useState([]);

	const [user, setUser] = useState("");

	function addTask() {

	fetch('https://playground.4geeks.com/todo/todos/judiththth', {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Será true si la respuesta es exitosa
        console.log(resp.status); // El código de estado 201, 300, 400, etc.
        return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
    })
    .then(data => {
        // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        // Manejo de errores
        console.log(error);
    });

	function addUser() {
		
	}
		// if (event.keyCode === 13) {
		// 	// cuando se hace enter, se añade la tarea a una lista
		// 	let updatedList = list.concat(task)
		// 	setList(updatedList)
		// 	setTask("")
		// }
	}

	return (
		<div className="text-center">
			<input className="user" onChange={(event) => setUser(event.target.value)} onKeyDown={addUser}value={user} placeholder="User"></input>
			<h1>{user}'s To-Do List</h1>
			<input className="task" onChange={(event) => setTask(event.target.value)} onKeyDown={addTask} value={task} placeholder="Write your task"></input>
			<div>
				<ul>{list.map((item, index) => (
					<li key={index}>{item}<button className="btn" onClick={() => setList(list.filter((_, i) => i !== index))}>X</button></li>
				))}
				</ul>
			</div>
		</div>
	);
};

export default Home;