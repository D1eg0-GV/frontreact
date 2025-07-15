import React, { Fragment, useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import { TodoItem } from "./items";

export function Todolist() {
const [todos, setTodos] = useState([]);
const tituloRef = useRef();
const descripcionRef = useRef();
const importanteRef = useRef();

const agregarTarea = () => {
    const title = tituloRef.current.value;
    const desc = descripcionRef.current.value;
    const importante = importanteRef.current.checked;
    if (title !== "" && desc === "") {
        alert("Por favor ingresa una descripción.");
        return;
    }
    if ( desc === "") return;
    setTodos((prevTodos) => [
    ...prevTodos,
    {id: uuid(),title,desc,importante},
    ]);
    tituloRef.current.value = "";
    descripcionRef.current.value = "";
    importanteRef.current.checked = false;
};

const eliminarTarea = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
};

const ConsultarApi = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => {
        const meal = data.meals[0];
        tituloRef.current.value = meal.strMeal;
        // Para que no se vea tan largo el texto en el post it
        const caracteres = meal.strInstructions.length;
        if (caracteres > 150) {
            descripcionRef.current.value = meal.strInstructions.slice(0, 200) + " ...";
        } else {
            descripcionRef.current.value = meal.strInstructions;
        }
        importanteRef.current.checked = false;
    })
};

return (
    <Fragment>
    <h1>Post it Simulator!</h1>
    <div
    style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        paddingLeft: "5rem", 
        alignItems: "center", 
        width: "100%",
    }}
    >
        <input ref={tituloRef} type="text" placeholder="Título" className="form-control" style={{ maxWidth: "200px" }}
        />
        <input ref={descripcionRef} type="text" placeholder="Descripción" className="form-control" style={{ maxWidth: "300px" }}/>
        <div style={{ display: "flex", alignItems: "center" }}>
        <input ref={importanteRef} type="checkbox" id="imp" />
        <label htmlFor="imp" style={{ marginLeft: "5px", marginBottom: 0 }}>Importante!</label>
        </div>
        <button className="btn btn-dark" onClick={agregarTarea}>AGREGAR</button>
        <button className="btn btn-dark" onClick={ConsultarApi}>Pedir una receta</button>
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