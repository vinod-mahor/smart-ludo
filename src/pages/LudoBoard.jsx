import React from 'react'
import { useEffect, useState } from 'react'
import Playground from '../components/Playground.jsx'
import Dice from '../components/Dice.jsx'
const LudoBoard = () => {
    useEffect(() => {

        if (window.innerWidth < 774) {

            setDiceForMobile({
                dice1: { position: "absolute", top: "810px", left: '100px', backgroundColor: "yellow", height: "100px", width: "100px" },
                dice2: { position: "absolute", top: "810px", left: '200px', backgroundColor: "green", height: "100px", width: "100px" },
                dice3: { position: "absolute", top: "810px", left: '300px', backgroundColor: "red", height: "100px", width: "100px" },
                dice4: { position: "absolute", top: "810px", left: '400px', backgroundColor: "rgb(36,113,255)", height: "100px", width: "100px" }
            })
        }
    }, [])
    const [diceForMobile, setDiceForMobile] = useState({
        dice1: { position: "absolute", left: "1vw", top: "3em", backgroundColor: "yellow" },
        dice2: { position: "absolute", left: "1vw", bottom: "0vh", backgroundColor: "green" },
        dice3: { position: "absolute", right: "1vw", bottom: "0vh", backgroundColor: "red" },
        dice4: { position: "absolute", right: "1vw", top: "3em", backgroundColor: "rgb(36,113,255)" }
    })



    return (
        <>
            <Playground />
            <Dice props={diceForMobile.dice1} />
            <Dice props={diceForMobile.dice2} />
            <Dice props={diceForMobile.dice3} />
            <Dice props={diceForMobile.dice4} />
        </>
    )
}

export default LudoBoard
