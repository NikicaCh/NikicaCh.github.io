import React, { useState } from 'react'

const Woman = (props) => {
    
    const [rotate, setRotate] = useState(false)

    return (
        <div className="woman" onClick={() => {
            setRotate(!rotate)
        }}>
            <img className= { rotate ? `woman-${props.type}` : `woman-${props.type} woman-rotate`} src={require(`../icons/me.png`)}></img>
        </div>
    )
}


export default Woman;