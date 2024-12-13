import styled from "styled-components"
import GlobalStyles from "./components/GlobalStyles"
import Cabecera from "./components/Cabecera"
import BarraLateral from "./components/BarraLateral"
import Banner from "./components/Banner"
import banner from "./assets/banner.png"
import Galeria from "./components/Galeria"
import fotos from "./fotos.json"
import { useState, useEffect } from "react"
import ModalZoom from "./components/ModalZoom"
import Pie from "./components/Pie"


const FondoGradiente = styled.div`
  background: linear-gradient(174.61deg, #041833 4.16%, #04244F 48%, #154580 96.76%);
  width: 100%;
  min-height: 100vh;
`

const AppContainer = styled.div`

  width: 1280px;
  max-width: 100%;
  margin: 0 auto;
`

const MainContainer = styled.main`

  display: flex;
  gap: 24px;
`

const ContenidoGaleria = styled.section`

  display: flex;
  flex-direction: column;
  flex-grow: 1;

`

const App = () => {

  const [fotosDeGaleria, setFotosDeGaleria] = useState(fotos)
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null)
  const [busqueda, setBusqueda] = useState("");
  const [fotosFiltradasPorBusqueda, setFotosFiltradasPorBusqueda] = useState(fotos);
  const [fotosFiltradasPorTag, setFotosFiltradasPorTag] = useState(fotos);
  const [tagSeleccionado, setTagSeleccionado] = useState(0);


  const normalizeText = (text) => {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  useEffect(() => {
    let resultados = fotosDeGaleria;

    if (busqueda.trim() !== "") {
      const busquedaNormalizada = normalizeText(busqueda);
      resultados = resultados.filter((foto) =>
        normalizeText(foto.titulo).includes(busquedaNormalizada)
      );
    }

    setFotosFiltradasPorBusqueda(resultados);
  }, [busqueda, fotosDeGaleria]);

  useEffect(() => {
    let resultados = fotosDeGaleria;

    if (tagSeleccionado !== 0) {
      resultados = resultados.filter((foto) =>
        foto.tagId === tagSeleccionado
      );
    }

    setFotosFiltradasPorTag(resultados);
  }, [tagSeleccionado, fotosDeGaleria]);

  const obtenerFotosFinales = () => {
    if (busqueda.trim() === "" && tagSeleccionado === 0) {
      return fotosDeGaleria;
    }

    const idsFiltradosPorBusqueda = new Set(fotosFiltradasPorBusqueda.map(foto => foto.id));
    const idsFiltradosPorTag = new Set(fotosFiltradasPorTag.map(foto => foto.id));

    const idsComunes = [...idsFiltradosPorBusqueda].filter(id => idsFiltradosPorTag.has(id));

    return fotosDeGaleria.filter(foto => idsComunes.includes(foto.id));
  };

  const fotosFinales = obtenerFotosFinales();


  const alAlterarFavorito = (foto) => {

    if (foto.id === fotoSeleccionada?.id) {
      setFotoSeleccionada({
        ...fotoSeleccionada,
        favorita: !foto.favorita
      })

    }
    
    setFotosDeGaleria(fotosDeGaleria.map(fotoDeGaleria => {
      return {
        ...fotoDeGaleria,
        favorita: fotoDeGaleria.id === foto.id ? !foto.favorita : fotoDeGaleria.favorita
        };
      })
    );
  }

  return (
    <>
      <FondoGradiente>
        <GlobalStyles />        
        <AppContainer>
          <Cabecera onSearch={(texto) => setBusqueda(texto)} />
          <MainContainer>
            <BarraLateral />
            <ContenidoGaleria>
              <Banner texto="La galeria más completa de fotos del espacio" 
              backgroundImage={banner} />
              <Galeria 
                alSeleccionarFoto={(foto) => setFotoSeleccionada(foto)}
                fotos={fotosFinales}
                alAlterarFavorito={alAlterarFavorito} 
                setTagSeleccionado={setTagSeleccionado} />
            </ContenidoGaleria>
          </MainContainer>
        </AppContainer>
        <ModalZoom foto={fotoSeleccionada} 
          alCerrar={() => setFotoSeleccionada(null)} 
          alAlterarFavorito={alAlterarFavorito} />
        <Pie />
      </FondoGradiente>
    </>
  )
}

export default App;
