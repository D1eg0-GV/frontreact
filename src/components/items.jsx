import React from "react";

// genera una rotacion aleatoria entre -5 y +5 grados basada en el id
function getRotationFromId(id) {
let sum = 0;
for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
  const grados = (sum % 11) - 5; // Entre -5 y +5 grados
return `rotate(${grados}deg)`;
}

export function TodoItem({ todo, eliminarTarea }) {
const { id, title, desc, importante } = todo;
const rotation = getRotationFromId(id);

return (
    <div
    style={{
        background: importante ? "#EC7063" : "#FFFFCC",
        color: "#111",
        width: "200px",
        minHeight: "180px",
        boxShadow: "2px 2px 8px #888",
        padding: "15px 15px 10px 15px",
        position: "relative",
        fontFamily: "inherit",
        marginBottom: "10px",
        transform: rotation,
        transition: "transform 0.2s",
        userSelect: "none",
        marginLeft: "10px",
        marginRight: "10px",
    }}
    >
    <strong style={{ fontSize: "1.1em" }}>{title}</strong>
    <button
        onClick={() => eliminarTarea(id)}
        style={{
        position: "absolute",
        top: "8px",
        right: "10px",
        border: "none",
        background: "transparent",
        color: "#111",
        fontWeight: "bold",
        fontSize: "1.1em",
        }}
        aria-label="Eliminar"
    >
        ×
    </button>
    <div
        style={{
        marginTop: "10px",
        whiteSpace: "pre-line",
        fontFamily: "'Permanent Marker', Arial, sans-serif",
        }}
    >
        {desc}
    </div>
    </div>
);
}