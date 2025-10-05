import React, {useState,useContext} from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from 'axios';
import { UserDataContext } from "../context/UserContext";

const UserSignup = ()=>{
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName , setLastName] = useState('')
    const [userData , setUserData] = useSate({})

    const navigate = useNavigate();

    const {user,setUser} = useContext(UserDataContext)


    return(
        <div>
            <div>
                <div>
                    <img className="w-16 mb-10" src/>
                </div>
            </div>
        </div>
    )

}