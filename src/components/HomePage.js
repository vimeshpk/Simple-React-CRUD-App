
import axios from "axios";
import React, { use, useEffect, useState } from "react";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({first_name: '', last_name: ''})
  const [editId, setEditId] = useState(null);
  // Fetch all users (READ)
  const fetchUsers = async() => {
        try{
          const res = await axios.get(`http://127.0.0.1:3000/users`, {
                      headers: {
                        Accept: "application/json"
                      }
                    });
          setUsers(res.data);
          } catch (err) {
            console.error("API error:", err);
          }
    }

    // Add new user (CREATE)
    const addUser = async()=>{
      if(!formData.first_name || !formData.last_name) return alert('Please fill the requied fields');
      try{
        const res = await axios.post(`http://127.0.0.1:3000/users`, formData, {
                      headers: {
                        Accept: "application/json"
                      }
                    });
        setUsers([...users, res.data]);
        setFormData({first_name: '', last_name: ''});           
      }catch(err){
        console.error("Error adding user:", err);
      }
    }
    // Start editing
    const handleEdit = (user)=>{
      setEditId(user.id);
      setFormData({first_name: user.first_name, last_name: user.last_name});
    } 
    // Update user (UPDATE)
    const saveUser =async()=>{
      try{
        await axios.put(`http://localhost:3000/users/${editId}`, formData);
        setUsers(
          users.map((user)=>
          user.id === editId? {...user, ...formData}: user)
        );
        setEditId(null);
        setFormData({first_name: '', last_name: ''});
      }catch(err){
        console.error('API error', err);
      }
    }

    const handleDelete = async(id) =>{
      try{
        await axios.delete(`http://localhost:3000/users/${id}`);
        setUsers(users.filter((user)=> user.id !== id))
         fetchUsers();
      }catch(err){
        console.error('API error', err);
      }
    }
    useEffect(()=>{
      fetchUsers();
    },[])
    return(
      <div style={{ padding: "20px" }}>
        <h2>User Management (CRUD)</h2>
         {/* Create User Form */}
         <div style={{marginBottom: '20px'}}>
          <input type="text" placeholder="Fname" value={formData.first_name} onChange={(e)=>setFormData({
            ...formData, first_name: e.target.value
          })}/>
          <input type="text" placeholder="Lname" value={formData.last_name} onChange={(e)=>setFormData({
            ...formData, last_name: e.target.value
          })}/>
          { editId ? (
            <button onClick={saveUser}>Edit</button>
          ):(
            <button onClick={addUser}>Add</button>
          )}
          {editId && <button onClick={()=>setEditId(null)}>Cancel</button>}
         </div>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>
                    <button onClick={()=> handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>Delete</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
}
export default HomePage;
