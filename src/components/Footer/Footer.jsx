import React from "react";
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="footer navbar-static-bottom">
    <Container>
        <div className="container text-center" style={{'marginTop': '20px', 'marginBottom': '20px'}}>
            <h4>Created by <a target="_blank" rel="noopener noreferrer" href="https://brycebeckenbach.netlify.app/">Bryce Beckenbach</a></h4>
            <div className="social-links-container">
                <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/bryce-beckenbach-52a5276a/" style={{'marginLeft': '5px', 'marginRight': '5px', 'marginBottom': '5px'}}><i className="fab fa-linkedin fa-2x"></i></a>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/bbeckenb" style={{'marginLeft': '5px', 'marginRight': '5px', 'marginBottom': '5px'}}><i className="fab fa-github-square fa-2x"></i></a>
                <a target="_blank" rel="noopener noreferrer" href="mailto:brycebeckenbach@gmail.com" style={{'marginLeft': '5px', 'marginRight': '5px', 'marginBottom': '5px'}}><i className="fas fa-envelope-square fa-2x"></i></a>
            </div>
        </div>
      
    </Container>
  </footer>
  );
}

export default Footer;