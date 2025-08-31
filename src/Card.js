import { Link, useNavigate } from 'react-router-dom'
import PP from "./assets/elc.jpg"
import PL from "./assets/plumber.jpg"
import CP from "./assets/carpenter.jpg"
import GR from "./assets/garage.jpg"
import AC from "./assets/ac.jpg"
function Card(){
     const navigate = useNavigate();

     return(
        <>
        <h1 className="title">Our Services</h1>
        <div className="con">
        <Link to="/service/electrician" className="card" onClick={(e) => { e.preventDefault(); navigate('/service/electrician'); }} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
             <img className="elec" src={PP} alt="profile photo"></img>
             <h2 className="elec-title">Electrician</h2>
        </Link>
        <Link to="/service/plumber" className="card" onClick={(e) => { e.preventDefault(); navigate('/service/plumber'); }} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                 <img className="elec" src={PL} alt="profile photo"></img>
                 <h2 className="elec-title">Plumber</h2>
        </Link>
        <Link to="/service/carpenter" className="card" onClick={(e) => { e.preventDefault(); navigate('/service/carpenter'); }} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                 <img className="elec" src={CP} alt="profile photo"></img>
                 <h2 className="elec-title">Carpenter</h2>
        </Link>
        <Link to="/service/mechanic" className="card" onClick={(e) => { e.preventDefault(); navigate('/service/mechanic'); }} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                 <img className="elec" src={GR} alt="profile photo"></img>
                 <h2 className="elec-title">Machanic</h2>
        </Link>
        <Link to="/service/ac-repair" className="card" onClick={(e) => { e.preventDefault(); navigate('/service/ac-repair'); }} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                 <img className="elec" src={AC} alt="profile photo"></img>
                 <h2 className="elec-title">AC Repair</h2>
        </Link>
          
             </div>
             </>

     )
}

export default Card
