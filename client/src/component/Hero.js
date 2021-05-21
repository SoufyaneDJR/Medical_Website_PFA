import React from 'react'
import styled from "styled-components"
import {motion} from "framer-motion"
import { Button } from '@material-ui/core'
import PlanetOne from '../images/aa.png';
import PlanetTwo from '../images/bb.png';
import PlanetThree from '../images/cc.png';
import PlanetFour from '../images/dd.png';


function Hero() {

  const fadeLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  };

  const Section = styled.section`
  background-color: black;
  height: 88vh;
  display: flex;
  justify-content: center;
  align-items: center;
  `
  const Container = styled.div`
   display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  padding: 3rem calc((100vw - 1300px) / 2);
  @media screen and (max-width: 768px) {
    grid-grid-template-columns: 1fr;}
  ` 
  const ColumnLeft = styled.div`
    display: flex;
  color: #fff;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5rem 2rem;
  
  h1 {
    margin-bottom: 0.5rem;
    font-size: 2rem;
  }
  p {
    margin: 2rem 0;
    font-size: 4rem;
    line-height: 1.1;
    color: white;
  }  
  `
  const Button = styled(motion.button)`
    padding: 1rem 3rem;
    font-size: 1rem;
    border: 2px solid #fff;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    background: transparent;
    color: #fff;
  `

  

const Image = styled(motion.img)`
position: absolute;
width: 100%;
height: 100%;
max-width: 250px;
max-height: 250px;
border-radius: 100%;

`

  const ColumnRight = styled.div`
   display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  
  ${Image}:nth-child(1) {
    top: 10px;
    left: 10px;
    
  }
  ${Image}:nth-child(2) {
    top: 10px;
    right: 10px;
  }
  ${Image}:nth-child(3) {
    top: 280px;
    left: 50px;
  }
  ${Image}:nth-child(4) {
    bottom: 30px;
    right: 75px;
  }
  `
  

  return (
    <div>
      <Section>
        <Container>
          <ColumnLeft>
            <motion.h1
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.1 }}
               >Welcom to HEALTH UP</motion.h1>
            <motion.p
            style={{fontSize:45}}
            variants= {fadeLeft}
            initial='hidden'
            animate='visible'
            transition={{ duration: 0.1 }}
            >Stay safe Stay Healthy</motion.p>
            <Button
            href="services"
            whileHover={{scale:1.1}}
            whileTap={{backgroundColor:'#B3B300', scale:0.9 , border:'none'}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration:0.1 }}
            >Get Started</Button>
          </ColumnLeft>
          <ColumnRight>
          <Image
          src={PlanetOne}
          whileTap={{ scale: 0.9 }}
            drag={true}
            dragConstraints={{ left: 0, right: 250, top: 0, bottom: 50 }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1 } }} />
          <Image
          src={PlanetTwo}
          
          alt='planet'
          whileTap={{ scale: 0.8 }}
          drag={true}
          dragConstraints={{ left: 100, right: 0, top: 0, bottom: 50 }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
         />
          <Image
          src={PlanetThree} 
          whileTap={{ scale: 0.8 }}
          drag={true}
          dragConstraints={{ left: 0, right: 250, top: 0, bottom: 50 }}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}/>
          <Image
          src={PlanetFour} 
          alt='planet'
          whileTap={{ scale: 0.9 }}
          drag={true}
          dragConstraints={{ left: 50, right: 250, top: 0, bottom: 0 }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}/>

          
          </ColumnRight>
        </Container>
      </Section>
    </div>
  )
}

export default Hero
