import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: '#131E25',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%',
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function Modal({ children, onClose }) {

  return ReactDom.createPortal(
    <>
    {/* alag div mein render hoga ye sab root class wale mein nahi hoga */}
      <div style={OVERLAY_STYLES} />
      <div className="overflow-scroll" style={MODAL_STYLES}>
        <button className='btn bg-danger fs-4' style={{ marginLeft: "90%", marginTop: "10px",fontFamily: "'Signika Negative', sans-serif", width: "50px",
    height: "50px"}} onClick={onClose}> X </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  )
}