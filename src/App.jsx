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
  const [fotosFiltradas, setFotosFiltradas] = useState(fotos);


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

  useEffect(() => {
    if (busqueda.trim() === "") {
      setFotosFiltradas(fotosDeGaleria);
    } else {
      const resultados = fotosDeGaleria.filter((foto) =>
        foto.titulo.toLowerCase().includes(busqueda.toLowerCase())
      );
      setFotosFiltradas(resultados);
    }
  }, [busqueda, fotosDeGaleria]);

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
              <Galeria alSeleccionarFoto={(foto) => setFotoSeleccionada(foto)}
                fotos={fotosFiltradas}
                alAlterarFavorito={alAlterarFavorito} />
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
