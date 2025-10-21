import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";\


export  const CaptainHome  = ()=>{
 const [ridePopupPanel, setRidePopupPanel] = usseState(false)
 const [confirmRidePopupPanel, setConfirmRidePanel] = useState(false)
 const ridePopupPanelRef = useRef(null)
 const confirmRidePopupPanelRef = useRef(null)
 const [ride , setRide] = useState(null)

 const {socket}= useContext(SocketContext)
 const {captain}  = useContext(CaptainDataContext)
}

export default CaptainHome;