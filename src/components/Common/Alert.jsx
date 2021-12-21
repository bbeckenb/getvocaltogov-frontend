import React from "react";

function Alert({ type = "danger", message }) {
  console.debug("Alert", "type=", type, "message=", message);
  return (
      <div className={`alert alert-${type}`} role="alert">
            <p className="mb-0 small" key={message}>
              {message}
            </p>
      </div>
  );
}

export default Alert;
