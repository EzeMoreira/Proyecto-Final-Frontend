import React from 'react'
import { Link } from 'react-router-dom';
import "../../css/footer.css"
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
    return (
        <>
            <div className="Footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-5 col-12 ft-1">
                            <h3><span>Tu</span>Café</h3>
                            <p>Your favorite coffee shop since 2023.</p>
                            <div className="footer-icons">
                               <Link to="/does-not-exist"><i class="fa-brands fa-facebook"><FaFacebook /></i></Link>
                               <Link to="/does-not-exist"><i class="fa-brands fa-twitter"><FaTwitter /></i></Link> 
                               <Link to="/does-not-exist"><i class="fa-brands fa-instagram"><FaInstagram /></i></Link>
                               <Link to="/does-not-exist"><i class="fa-brands fa-linkedin-in"><FaLinkedin /></i></Link>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-12 ft-2">
                            <h5>Quick Links</h5>
                            <ul>
                                <li className="nav-item">
                                    <a className="" href="/menu">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/about">About Us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/contact">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-4 col-12 ft-3">
                            <h5>Quick Links</h5>
                            <p><i className="fa-solid fa-phone-volume"></i> +54 381#######</p>
                            <p><i className="fa-solid fa-envelope"></i> tucafe@gmail.com</p>
                            <p><i className="fa-solid fa-paper-plane"></i> Tucumán, Argentina.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer