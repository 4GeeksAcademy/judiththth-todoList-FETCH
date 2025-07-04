import React, { useState, useEffect } from "react";


export const Home = () => {

	const [task, setTask] = useState("");

	const [list, setList] = useState([]);

	function addTask() {
		fetch('https://playground.4geeks.com/todo/users/judith', {
			method: "POST",
			body: JSON.stringify({ label: task, done: false }),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(data => {
				console.log(data);
				setTask(""); // limpiar input
				getList();   // recargar lista
			})
			.catch(error => console.log(error));
	}


	function getList() {
		fetch('https://playground.4geeks.com/todo/users/judith', { method: "GET" })
			.then(resp => {
				console.log(resp.ok);
				console.log(resp.status);
				return resp.json();
			})
			.then((data) => {
				console.log(data)
				setList(data.todos)
			})
			.catch((error) => console.log(error))
	}

	useEffect(() => {
		getList()
	}, []);

	return (
		<div className="container d-flex flex-column align-items-center justify-content-center vh-100">
			<h1 className="mb-4" style={{ fontWeight: 100 }}>To-Do List</h1>

			<div className="w-100" style={{ maxWidth: "500px" }}>
				<input className="form-control form-control-lg mb-3 shadow-sm" onChange={(event) => setTask(event.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							addTask();
							setTask("");
						}
					}}
					value={task} placeholder="Write your task"></input>

				<ul className="list-group shadow-sm">
					{list.map((item, index) => (
						<li key={index} className="list-group-item d-flex justify-content-between align-items-center">
							<span>{item.label}</span>
							<button className="btn btn-sm btn-outline-danger" onClick={() => setList(list.filter((_, i) => i !== index))}>×</button>
						</li>
					))}
				</ul>

				<div className="text-muted small mt-2">{list.length} item{list.length !== 1 ? "s" : ""} left</div>
			</div>
		</div>
	);
}

