import React from "react";
// import { useActionData, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home(){
  const navigate = useNavigate();
  const goToDetails = ()=> {
    navigate('/details', {state: {message: 'Hellowwww'}});
  };

  const goToPersonList=()=>{
    navigate('/person_list', {state: {message: 'Personal List'}})
  }
  return(
   <div>
    <h1>Home Page</h1>
    <button onClick={goToDetails}>Go to Details</button>
    <button onClick={goToPersonList}>Go to Personal</button>
   </div>
  );
}