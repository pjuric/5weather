import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

function NotFound() {

    const router = useRouter()

    return (
        <Container>
            <h1>Place not found!</h1>
            <p>Please enter a valid name of the city.</p>
            <button onClick={() => router.back()}>Go Back</button>
        </Container>
    )

}

export default NotFound

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    h1 {
        font-size: 60px;
    }

    button{
        border-radius: 5px;
        width:100px;
        height: 40px;
        border: none;
        font-size: 15px;
        margin-top: 10px;
        cursor: pointer;

        &:hover {
            opacity: 0.9;
        }
    }
`