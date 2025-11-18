import React from "react";

const style = {
  padding: "10px 15px",
  fontSize: "16px",
  backgroundColor: "yellowgreen",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
}
console.log(888)
console.log(__webpack_public_path__, window.location)
const Button = ({ children, onClick }) => {
  console.log('[App Remote] Rendering Button')
  return (
    <button style={style} onClick={onClick}>
      {children || 'Button from Remote'}
    </button>
  )
}

export default Button