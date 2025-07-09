import React, { Fragment, useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import { TodoItem } from "./items";

export function Todolist() {
const [todos, setTodos] = useState([]);
const titleRef = useRef();
const descRef = useRef();
const impRef = useRef();

const agregarTarea = () => {
    const title = titleRef.current.value;
    const desc = descRef.current.value;
    const importante = impRef.current.checked;
    if ( desc === "") return;
    setTodos((prevTodos) => [
    ...prevTodos,
    {id: uuid(),title,desc,importante},
    ]);
    titleRef.current.value = "";
    descRef.current.value = "";
    impRef.current.checked = false;
};

const eliminarTarea = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
};

return (
    <Fragment>
    <h1>Post It Simulator!</h1>
    <div
    style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        justifyContent: "center", // Centra horizontalmente
        alignItems: "center",     // Centra verticalmente
        width: "100%",
    }}
    >
        <input
        ref={titleRef}
        type="text"
        placeholder="Título"
        className="form-control"
        style={{ maxWidth: "200px" }}
        />
        <input ref={descRef} type="text" placeholder="Descripción" className="form-control" style={{ maxWidth: "300px" }}/>
        <div style={{ display: "flex", alignItems: "center" }}>
        <input ref={impRef} type="checkbox" id="imp" />
        <label htmlFor="imp" style={{ marginLeft: "5px", marginBottom: 0 }}>Importante!</label>
        </div>
        <button className="btn btn-dark" onClick={agregarTarea}>AGREGAR</button>
    </div>
    <div
        style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        }}
    >
        {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} eliminarTarea={eliminarTarea} />
        ))}
    </div>
    </Fragment>
);
}