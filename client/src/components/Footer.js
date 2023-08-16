import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <div style={{margin:"40px 10% 40px 10%",fontWeight:"bold"}}><footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="col-md-4 d-flex align-items-center" style={{marginTop:"40px"}}>
      <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
        
      </Link>
      <span className="text-muted">© 2023 , Inc</span>
    </div>
      <span className='text-muted' style={{marginTop:"40px"}}>All rights reserved</span>
  </footer></div>
  )
}
