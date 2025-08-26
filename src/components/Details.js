import React from "react";
import { useLocation } from 'react-router-dom';

export default function Details(){
  const location= useLocation();
  const {message} = location.state || {message: 'No data received'}
 return(
    <div>Details Page
      <p>Message: {message}</p>
    </div>
 )   
}