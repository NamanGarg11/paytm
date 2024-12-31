import React, { useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Password from "../components/password";
import Textbox from "../components/Textbox";


const Signup = () => {
  const [FirstName,setFirstName]=useState("");
  const [LastName,setLastName]=useState("");
  const [username,setusername]=useState("");
  const [password,setPassword]=useState("");

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">          
         <Heading heading={"Sign Up to ur Account"}/>
         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
         <form action="#" method="POST" className="space-y-6">
         <Textbox onchange={e=>{
                setFirstName(e.target.value);
              }}name={"FirstName"} type={"text"}/>
              <Textbox  onchange={e=>{
                setLastName(e.target.value);
              }}name={"LastName"} type={"text"}/>
              <Textbox onchange={
                e=>{
              setusername(e.target.value);
                }
              }name={"Email Address"} type={"email"} />
              <Password onchange={
                e=>{
              setPassword(e.target.value);
                }
              }/>
           <Button onClick={async()=>{
              const response= await axios.post('http://localhost:5000/api/v1/user/signup',{
                  FirstName,
                  LastName,
                  username,
                  password
                })
                localStorage.setItem("token",response.data.token)
          }}
            name={"Sign Up"}/>
         </form>

       
       </div>
     </div>
   </>
  )
}

export default Signup