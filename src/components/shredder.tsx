import React, { useState } from 'react'


const Shredder = () => {

    const [open, setOpen] = useState(false)

    return (
        <div className="shredder">
            <div onClick={() => {
                setOpen(!open)
            }} className={ open ? "box-head rotate-head" : "box-head"}></div>
            <div className="box" >
                <img className="recycle-icon" src={require("../icons/recycle-symbol.png")}></img>
                <div className="middle"></div>
                <div className="wheel"></div>
            </div>

        </div>
    )

}


export default Shredder;

