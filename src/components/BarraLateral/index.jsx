import styled from "styled-components";
import { useState } from "react";
import ItemNavegacion from "./ItemsNavegacion";

const ListaEstilizada = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const BarraLateral = () => {
  
  const [iconoActivo, setIconoActivo] = useState("Inicio");

  const handleClick = (nombre) => {
    setIconoActivo(nombre);
  };

  return (
    <aside>
      <nav>
        <ListaEstilizada>
          <ItemNavegacion
            iconoActivo="iconos/home-activo.png"
            iconoInactivo="iconos/home-inactivo.png"
            activo={iconoActivo === "Inicio"}
            onClick={() => handleClick("Inicio")}
          >
            Inicio
          </ItemNavegacion>
          <ItemNavegacion
            iconoActivo="iconos/mas-vistas-activo.png"
            iconoInactivo="iconos/mas-vistas-inactivo.png"
            activo={iconoActivo === "Más visitados"}
            onClick={() => handleClick("Más visitados")}
          >
            Más visitados
          </ItemNavegacion>
          <ItemNavegacion
            iconoActivo="/iconos/me-gusta-activo.png"
            iconoInactivo="/iconos/me-gusta-inactivo.png"
            activo={iconoActivo === "Más Me Gusta"}
            onClick={() => handleClick("Más Me Gusta")}
          >
            Más Me Gusta
          </ItemNavegacion>
          <ItemNavegacion
            iconoActivo="/iconos/nuevas-activo.png"
            iconoInactivo="/iconos/nuevas-inactivo.png"
            activo={iconoActivo === "Nuevas"}
            onClick={() => handleClick("Nuevas")}
          >
            Nuevas
          </ItemNavegacion>
          <ItemNavegacion
            iconoActivo="/iconos/sorprendeme-activo.png"
            iconoInactivo="/iconos/sorprendeme-inactivo.png"
            activo={iconoActivo === "Sorpréndeme"}
            onClick={() => handleClick("Sorpréndeme")}
          >
            Sorpréndeme
          </ItemNavegacion>
        </ListaEstilizada>
      </nav>
    </aside>
  );
};

export default BarraLateral;
