import React, { useState, useEffect } from "react";



//create your first component
const Home = () => {

	const [task, setTask] = useState("");

	const [list, setList] = useState([]);

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
	}

	function getList() {
		fetch('https://playground.4geeks.com/todo/users/judiththth', { method: "GET" })
			.then((response) => response.json())
			.then((data) => data)
			.catch((error) => console.log(error)
	}

	// if (event.keyCode === 13) {
	// 	// cuando se hace enter, se añade la tarea a una lista
	// 	let updatedList = list.concat(task)
	// 	setList(updatedList)
	// 	setTask("")
	// }

	return (
		<div className="container d-flex flex-column align-items-center justify-content-center vh-100">
			<h1 className="mb-4" style={{ fontWeight: 100 }}>To-Do List</h1>

			<div className="w-100" style={{ maxWidth: "500px" }}>
				<input className="form-control form-control-lg mb-3 shadow-sm" onChange={(event) => setTask(event.target.value)} onKeyDown={addTask} value={task} placeholder="Write your task"></input>

				<ul className="list-group shadow-sm">
					{list.map((item, index) => (
						<li key={index} className="list-group-item d-flex justify-content-between align-items-center">
							<span>{item}</span>
							<button className="btn btn-sm btn-outline-danger" onClick={() => setList(list.filter((_, i) => i !== index))}>×</button>
						</li>
					))}
				</ul>

				<div className="text-muted small mt-2">{list.length} item{list.length !== 1 ? "s" : ""} left</div>
			</div>
		</div>
	);
}


export default Home;