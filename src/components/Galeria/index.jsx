import styled from "styled-components";
import Titulo from "../Titulo";
import Populares from "./Populares";
import Tags from "./Tags";
import Imagen from "./Imagen";



const GaleriaContainer = styled.div`
    display: flex;
    gap: 24px;
`

const SeccionFluida = styled.section`
    flex-grow: 1;
`
const ImagenesContainer = styled.section`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
`

const Galeria = ({ fotos = [], alSeleccionarFoto, alAlterarFavorito, setTagSeleccionado }) => {
    return (
      <>
        <Tags setTagSeleccionado={setTagSeleccionado} />
        <GaleriaContainer>
          <SeccionFluida>
            <Titulo>Navegue por la galería</Titulo>
            <ImagenesContainer>
              {fotos.map(foto => (
                <Imagen
                  alAlterarFavorito={alAlterarFavorito}
                  alSolicitarZoom={alSeleccionarFoto}
                  key={foto.id}
                  foto={foto}
                />
              ))}
            </ImagenesContainer>
          </SeccionFluida>
          <Populares />
        </GaleriaContainer>
      </>
    );
  };

export default Galeria;