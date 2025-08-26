import React, { Component } from "react";
import axios from "axios";
// import React, { useEffect, useState } from "react";

class PersonList extends Component{
    state = {
        users: []
    }
    
    componentDidMount(){
        axios.get(`http://127.0.0.1:3000/users`)
        .then(result=> {
            const users =result.data;
            this.setState({users})
        })
    }

    render(){
        return(
             <ul>
            {
            this.state.users
            .map(user=>
                <li >{user.name}</li>
            )
        }
        </ul>
        )
    }
}

 export default PersonList;
