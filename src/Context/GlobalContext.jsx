import { createContext, useEffect, useReducer } from "react";

export const GlobalContext = createContext();

const initialState = {
  consulta: "",
  fotosDeGaleria: [],
  fotoSeleccionada: null,
  modalAbierto: false,
};

const reduce = (state, action) => {
  switch (action.type) {
    case "SET_CONSULTA":
      return { ...state, consulta: action.payload };
    case "SET_FOTOS_DE_GALERIA":
      return { ...state, fotosDeGaleria: action.payload };
    case "SET_FOTO_SELECCIONADA":
      return {
        ...state, 
        fotoSeleccionada: action.payload,
        modalAbierto: action.payload != null ? true : false
      };
    case "ALTERAR_FAVORITO":
      const fotosDeGaleria = state.fotosDeGaleria.map(fotoDeGaleria => {
        return {
          ...fotoDeGaleria,
          favorita: fotoDeGaleria.id === action.payload.id ? !action.payload.favorita : fotoDeGaleria.favorita
        };
      })
    if (action.payload.id === state.fotoSeleccionada?.id) {
      return {...state, 
        fotosDeGaleria: fotosDeGaleria,
        fotoSeleccionada: {
          ...state.fotoSeleccionada, favorita: !state.fotoSeleccionada.favorita
        }
      }
    }else{
      return {
        ...state, fotosDeGaleria: fotosDeGaleria
      }
    };
    default:
      return state;
  }
};

const GlobalContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reduce, initialState);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:3000/fotos");
      const data = await res.json();
      dispatch({ type: "SET_FOTOS_DE_GALERIA", payload: data });
    };

    setTimeout(() => getData(), 5000);
  }, []);


  
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;