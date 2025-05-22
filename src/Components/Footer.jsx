import React from 'react';
import { FaAppleAlt, FaPlay, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaFirefoxBrowser, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaAngleRight, FaArrowUp, FaCopyright } from 'react-icons/fa';
import '../Styles/Components_styles/footer.css';
import { NavLink } from 'react-router-dom';


const Footer = () => {
  return (
    <>
      {/* Footer Start */}
      <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
        <div className="container py-5 border-start-0 border-end-0" style={{ border: '1px solid', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
          <div className="row g-5">
            <div className="col-md-6 col-lg-6 col-xl-4">
              <div className="footer-item">
                <a href="/" className="p-0">
                  <h4 className="text-white"><i className="fas fa-search-dollar me-3"></i>GetJob</h4>
                </a>
                <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing...</p>
                <div className="d-flex">
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-2">
              <div className="footer-item">
                <h4 className="text-white mb-4">Quick Links</h4>
                <NavLink to="/"><FaAngleRight className="me-2" /> Accueil</NavLink>
                <NavLink to="/Connection" ><FaAngleRight className="me-2" /> Se Connecter</NavLink>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-3">
              <div className="footer-item">
                <h4 className="text-white mb-4">Support</h4>
                <a href="#"><FaAngleRight className="me-2" /> Privacy Policy</a>
                <a href="#"><FaAngleRight className="me-2" /> Terms & Conditions</a>
                <a href="#"><FaAngleRight className="me-2" /> Support</a>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-3">
              <div className="footer-item">
                <h4 className="text-white mb-4">Contact Info</h4>
                <div className="d-flex align-items-center">
                  <FaMapMarkerAlt className="text-primary me-3" />
                  <p className="text-white mb-0">Douala, Cameroun</p>
                </div>
                <div className="d-flex align-items-center">
                  <FaEnvelope className="text-primary me-3" />
                  <p className="text-white mb-0">getjob@gmail.com</p>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <FaPhoneAlt className="text-primary me-3" />
                  <p className="text-white mb-0">(+237) 690 48 49 04</p>
                </div>
                <div className="d-flex">
                  <a className="btn btn-primary btn-sm-square rounded-circle me-3" href="#">
                    <FaFacebookF className="text-white" />
                  </a>
                  <a className="btn btn-primary btn-sm-square rounded-circle me-3" href="#">
                    <FaTwitter className="text-white" />
                  </a>
                  <a className="btn btn-primary btn-sm-square rounded-circle me-3" href="#">
                    <FaInstagram className="text-white" />
                  </a>
                  <a className="btn btn-primary btn-sm-square rounded-circle me-0" href="https://www.linkedin.com/in/durel-kenfack-017b952a1/">
                    <FaLinkedinIn className="text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}
      
      {/* Copyright Start */}
      <div className="copyrigth">
        <div className=" text-center ">
              <span className="text-body">
                <NavLink to="/" className="border-bottom text-white" >
                  <FaCopyright className="text-light me-2" />GetJob
                </NavLink>, All right reserved.
              </span>
        </div>
      </div>
      {/* Copyright End */}

    </>
  );
};

export default Footer;