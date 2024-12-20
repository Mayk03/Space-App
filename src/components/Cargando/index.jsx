import React from "react";
import styled from "styled-components";


const Container = styled.div`
    display: flex;
    justify-content: center;
`

const Figure = styled.figure`

    width: 30vw;
`



const Cargando = () =>{
    return (

        <Container>
            <div>
                <Figure>
                    <img src="img/loading.gif"/>
                </Figure> 
            </div>
        </Container>
        
    )
}

export default Cargando;