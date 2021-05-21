import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import { API_KEY } from '../../../keys'
import { useRouter } from 'next/router'
import NotFound from '../../../components/NotFound'
import Tooltip from '@material-ui/core/Tooltip'

const city = ({ actual }) => {

    const router = useRouter()
    const searchInputRef = useRef(null)

    const search = (e) => {
        e.preventDefault();
        const term = searchInputRef.current.value
        if(!term) return;
        router.push(`/city/${term}`)
        searchInputRef.current.value= ""; 
    }

    return (
        <div className="background">
            {actual.name ? 
                <Container>
                    <MainSection>
                        <City>
                            <Image src="/icons/location.svg" width="50px" height=""/>
                            <h1>{actual.name}, {actual.sys.country}</h1>
                        </City>
                        <Description>
                            <h1>{actual.weather[0].main}</h1>
                            <p>{actual.weather[0].description}</p>
                        </Description>
                        <IconDetails>
                            <Tooltip title="Temperature" placement="left">
                                <Item>
                                    <Image src="/icons/temp.svg" width="20px" height=""/>
                                    <p>{actual.main.temp} °C</p><span>(feels like {actual.main.feels_like} °C)</span>  
                                </Item>
                            </Tooltip>
                            <Tooltip title="Humidity" placement="right">
                                <Item>
                                    <Image src="/icons/humidity.svg" width="35px" height=""/>
                                    <p>{actual.main.humidity}%</p>
                                </Item>
                            </Tooltip>
                            <Tooltip title="Wind Speed" placement="right">
                                <Item>
                                    <Image src="/icons/wind.svg" width="35px" height=""/>
                                    <p>{actual.wind.speed} m/s</p>
                                </Item>
                            </Tooltip>
                            <Tooltip title="Atmospheric pressure" placement="right">
                                <Item>
                                    <Image src="/icons/pressure.svg" width="35px" height=""/>
                                    <p>{actual.main.pressure} hPa</p>
                                </Item>
                            </Tooltip>
                        </IconDetails>
                    </MainSection>
                    <InputSection>
                        <Image src="/icons/logo.svg" width="" height=""/>
                        <Input>
                            <p>Search weather conditions for another place...</p>
                            <input type="text" placeholder={actual.name} ref={searchInputRef}/>
                            <button type="submit" onClick={search}>Search</button>
                        </Input>
                        <Image className="image" src="/icons/woman.svg" width="" height=""/>
                    </InputSection>
                </Container>
            :
                <NotFound/>
            }
        </div>
    )
}

export default city;

export const getServerSideProps = async (context) =>{
    const id = context.params.id
    const uri = id;
    const encoded = encodeURI(uri);
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${encoded}&units=metric&appid=${API_KEY}`)
    const actual = await res.json()
  
    return {
        props: {
            actual
        }
    }
}

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 25px;
    height: 100%;

    @media (max-width: 980px) {
        flex-direction: column;
        height: auto;
    }
`

const MainSection = styled.div`
    background: rgb(86,115,140);
    background: linear-gradient(180deg, rgba(86,115,140,0.5) 0%, rgba(8,51,89,0.5) 50%);
    width:800px;
    height: 650px;
    background: rgb(86,115,140);
    background: linear-gradient(180deg, rgba(86,115,140,0.5) 0%, rgba(8,51,89,0.5) 50%);
    border-radius: 25px;
    padding: 10px 50px;

    @media (max-width: 980px) {
        display: flex;
        flex-direction: column;
        width: auto;
        height: auto;
        background: none;
        padding: 5px;
    }
`

const City = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 980px) {
        display: flex;
        flex-direction: column;
    }

    h1 {
        font-size: 50px;
        margin-left: 20px;

        @media (max-width: 980px) {
            font-size: 20px;
            margin-left: 5px;
        }
    }
`

const Description = styled.div`
    color: #9AC1D9;

    @media (max-width: 980px) {
        text-align: center;
    }

    h1 {
        font-weight: 500;
    }
`

const IconDetails = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 980px) {
        grid-template-columns: 1fr;
        justify-content: center;
        text-align: center;
    }
`

const Item = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 400ms ease-in-out;

    p {
        font-size: 30px;
        margin-left: 20px;
    }

    span {
        margin-left: 10px;
    }

    &:hover {
        background: rgba(21,21,21,0.1);
        border-radius: 10px;
        cursor: default;
        transform: scale(0.8);
    }
`

const InputSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 10px 0;
`

const Input = styled.form`
    align-items: flex-start;

    input {
        width: 100%;
        height: 50px;
        border-radius: 10px;
        color: black;
        font-size: 20px;
        padding: 0 10px;

        &:focus{
            outline: none;
        }
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