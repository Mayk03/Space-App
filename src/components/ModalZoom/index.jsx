import Imagen from "../Galeria/Imagen";
import styled from "styled-components";
import BotonIcono from "../BotonIcono";
import useFotoModal from "../../Hooks/UseFotoModal";

const Overlay = styled.div`
background-color:rgba(0,0,0,.7);
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`

const DialogEstilizado = styled.dialog`
    position: absolute;
    top: 294px;
    background: transparent;
    padding: 0;
    border: 0;
    width: 1156px;
    display: flex;
    justify-content: center;
    form {
        button {
            position: relative;
            top: 20px;
            right: 60px;
        }
    }
`

const ModalZoom = () => {

    const {estaAbiertoModal, fotoSeleccionada,cerrarModal} = useFotoModal();

    return <>
        {estaAbiertoModal && <>
        <Overlay />
            <DialogEstilizado open={!!fotoSeleccionada} onClose={() => cerrarModal() }>
                <Imagen foto={fotoSeleccionada} expandida={true} />
                <form method="dialog">
                    <BotonIcono>
                        <img src="/iconos/cerrar.png" alt="Icono de cerrar" />
                    </BotonIcono>
                </form>
            </DialogEstilizado>
        </>}
    
    </>
}

export default ModalZoom;