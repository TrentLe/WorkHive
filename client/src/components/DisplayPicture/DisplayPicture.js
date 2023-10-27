import React, { useState, useEffect } from 'react'
import './DisplayPicture.css'

const DisplayPicture = ({ user }) => {

    const [displayPicture, setDisplayPicture] = useState("")
    const [stockPic, setStockPic] = useState("")
    const [loadingState, setLoadingState] = useState(true)

    useEffect(() => {
        setDisplayPicture(user?.profilepicture)
        setLoadingState(false)
    }, [user])

    useEffect(() => {
        setStockPic("https://i.ibb.co/znBQMM4/stockimageprofilepicture.png")
    }, [loadingState])


    return (
        <>
            <img className="display-picture" src={displayPicture ? displayPicture : stockPic} alt="their display" />
        </>
    )
}

export default DisplayPicture