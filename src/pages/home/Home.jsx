import React from 'react'
import './Home.css'
import BG from '../../assets/homebg.png'
import Illus from '../../assets/homeillus.png'
import Logo from '../../assets/logo.png'

const Home = () => {
    return (
        <div className="home-con">
            <div className="intro-con">
                <div className="intro-line">
                    <span>The New Standard For <br />
                        <div className="intro-line2">
                            <span>Seamless Synergy</span>
                        </div></span>
                </div>


                <div className="intro-line3">
                    <span>Reimagining collaboration with every click. <br /> Where your vision seamlessly meets action, and innovation takes the lead.</span>
                </div>

                <a href="/login">
                    <button className="getstartedbtn" >
                        Get started with <img className='homebtnlogo' src={Logo} alt="" />
                    </button>
                </a>
            </div>

            <div className="illus-con">
                <img src={Illus} alt="" />
            </div>
        </div>
    )
}

export default Home