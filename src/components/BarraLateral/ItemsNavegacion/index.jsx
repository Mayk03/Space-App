import styled from "styled-components";


const ItemListaEstilizado = styled.li`
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    line-height: 28px;
    margin-bottom: 30px;
    color: ${props => props.$activo ? "#7B78E5" : "#D9D9D9"};
    font-family: ${props => props.$activo ? "GandhiSansBold" : "GandhiSansRegular"};
    cursor: pointer;
`

const ItemNavegacion = ({ children, iconoActivo, iconoInactivo, activo = false, onClick }) => {
    return (
      <ItemListaEstilizado $activo={activo} onClick={onClick}>
        <img src={activo ? iconoActivo : iconoInactivo} alt="icono" />
        {children}
      </ItemListaEstilizado>
    );
  };

export default ItemNavegacion;