import React from "react";
import "./LoadingSpinner.css";

/** Loading message used by components that fetch API data. */

function LoadingSpinner({ waitingOn = '' }) {
  return (
      <div className="LoadingSpinner">
        Loading {waitingOn} ...
      </div>
  );
}

export default LoadingSpinner;