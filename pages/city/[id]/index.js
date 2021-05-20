import Image from 'next/image'
import React, { useState } from 'react'
import styled from 'styled-components';
import { API_KEY } from '../../../keys'

const city = ({ actual }) => {

    return (
        <div className="background">
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
                        <Item>
                            <Image src="/icons/temp.svg" width="20px" height=""/>
                            <p>{actual.main.temp} °C</p> <span>(feels like {actual.main.feels_like} °C)</span>
                        </Item>
                        <Item>
                            <Image src="/icons/humidity.svg" width="35px" height=""/>
                            <p>{actual.main.humidity}%</p>
                        </Item>
                        <Item>
                            <Image src="/icons/wind.svg" width="35px" height=""/>
                            <p>{actual.wind.speed} m/s</p>
                        </Item>
                        <Item>
                            <Image src="/icons/pressure.svg" width="35px" height=""/>
                            <p>{actual.main.pressure} hPa</p>
                        </Item>
                    </IconDetails>
                </MainSection>
                <InputSection>
                    
                </InputSection>
            </Container>
        </div>
    )
}

export default city;

export const getServerSideProps = async (context) =>{
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${context.params.id}&units=metric&appid=${API_KEY}`)
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
`

const City = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;

    h1 {
        font-size: 50px;
        margin-left: 20px;
    }
`

const Description = styled.div`
    color: #9AC1D9;

    h1 {
        font-weight: 500;
    }
`

const IconDetails = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`

const Item = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    p {
        font-size: 30px;
        margin-left: 20px;
    }

    span {
        margin-left: 10px;
    }
`

const InputSection = styled.div`

`