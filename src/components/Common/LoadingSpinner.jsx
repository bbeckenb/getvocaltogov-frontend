import React from "react";
import "./LoadingSpinner.css";
import { Spinner } from 'react-bootstrap';
// import UserContext from '../../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

/** Loading message used by components that fetch API data. */

function LoadingSpinner({ waitingOn = '' }) {
  return (
      <div className="LoadingSpinner text-info">
        Loading {waitingOn}...
        <Spinner animation="grow" variant="info" />
      </div>
  );
}

export default LoadingSpinner;