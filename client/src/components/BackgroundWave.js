import React from "react";
import "../styles/background.css";

console.log(process.env)

export const BackgroundWave = () => (
    <div className="waveWrapper waveAnimation">
        <div className="waveWrapperInner bgTop">
            <div className="wave waveTop"
                 style={{backgroundImage: `url('${process.env.PUBLIC_URL}/images/wave-top.png')`}}/>
        </div>
        <div className="waveWrapperInner bgMiddle">
            <div className="wave waveMiddle"
                 style={{backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-mid.png')"}}/>
        </div>
        <div className="waveWrapperInner bgBottom">
            <div className="wave waveBottom"
                 style={{backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-bot.png')"}}/>
        </div>
    </div>
)