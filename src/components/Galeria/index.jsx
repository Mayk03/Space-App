import styled from "styled-components";
import Titulo from "../Titulo";
import Populares from "./Populares";
import Tags from "./Tags";
import Imagen from "./Imagen";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import Cargando from "../Cargando";

const GaleriaContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const SeccionFluida = styled.section`
  flex-grow: 1;
`;

const ImagenesContainer = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
`;

const Galeria = () => {
  const { state } = useContext(GlobalContext);

  const filteredFotos = state.fotosDeGaleria.filter((foto) => {
    const matchesConsulta =
      state.consulta === "" ||
      foto.titulo
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .includes(
          state.consulta
            .toLocaleLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
        );

    const matchesTags =
      state.tagsSeleccionados.length === 0 ||
      state.tagsSeleccionados.includes(foto.tagId);

    return matchesConsulta && matchesTags;
  });

  return state.fotosDeGaleria.length === 0 ? (
    <Cargando />
  ) : (
    <>
      <Tags />
      <GaleriaContainer>
        <SeccionFluida>
          <Titulo>Navegue por la galería</Titulo>
          <ImagenesContainer>
            {filteredFotos.map((foto) => (
              <Imagen
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
