import React from 'react'
import { useEffect, useState } from 'react'
import Playground from '../components/Playground.jsx'
import Dice from '../components/Dice.jsx'
const LudoBoard = () => {
    useEffect(() => {

        if (window.innerWidth < 774) {

            setDiceForMobile({
                dice1: {position:"absolute", backgroundColor: "yellow" },
                dice2: {position:"absolute", backgroundColor: "green" },
                dice3: {position:"absolute", backgroundColor: "red" },
                dice4: {position:"absolute", backgroundColor: "rgb(36,113,255)" }
            })
        }
    }, [])
    const [diceForMobile, setDiceForMobile] = useState({
        dice1: { position:"absolute", backgroundColor: "yellow" },
        dice2: { position:"absolute", backgroundColor: "green" },
        dice3: { position:"absolute", backgroundColor: "red" },
        dice4: { position:"absolute", backgroundColor: "rgb(36,113,255)" }
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
