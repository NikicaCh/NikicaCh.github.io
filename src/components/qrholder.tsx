import React from 'react'
import QRCode from 'qrcode.react';

interface code {
    code: string
}

const QrHolder: React.FC<code> = (props) => {
    return (
        <div className="qr-holder">
            <QRCode value={`https://shredder-app.herokuapp.com/mobile?code=${props.code}`} bgColor="transparent" fgColor="#2f5fa7" renderAs="svg"/>
        </div>
    )
}

export default QrHolder