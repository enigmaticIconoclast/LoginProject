import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {sha256} from 'js-sha256';


export default function Create(){

    const[form, setForm] =useState({
        userName: "",
        saltScore: "",
        password: "",
        reenter: "",
        userType: "",

    });
    const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();

        if(form.password === form.reenter){
            if(form.password.length >= 16){
                
                let saltTemp = Math.floor(Math.random()*1000000000);
                let tempHash = form.password.concat(saltTemp.toString());
                
                console.log(form);

                let hash = (sha256(tempHash));

                form.saltScore = saltTemp;
                form.password = hash;
                form.reenter = hash;
                
                console.log(form);

                const newUser = { ...form};

                await fetch("http://localhost:4000/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newUser),
                }).catch(error => {
                    window.alert(error);
                    return;
                });

                navigate('/Login');
                
            }
            else{
                alert("Password must be at least 16 characters");
            }
        }
        else{
            alert("Passwords Do not Match please Re-Enter");
        }

    }
    
    function handleChange(value){
        return setForm((prev)=>{
            return{...prev, ...value};
        })
    }
    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    onChange={(e) => handleChange({ userName: e.target.value })}
                />
            <br/>
                <label>Password: </label>
                <input
                    type="text"
                    name="password"
                    id="password"
                    onChange={(e) => handleChange({ password: e.target.value })}
                />
            <br/>
                <label>Reenter Password: </label>
                <input
                    type="text"
                    name="reenter"
                    id="reenter"
                    onChange={(e) => handleChange({ reenter: e.target.value })}
                />

            <div onChange={(e=> handleChange({userType: e.target.value}))}>
                <label>User Type:</label><br/>
                <input type="radio" id="customer" name="user_type" value="Customer"/>
                <label for="customer">Customer</label><br/>
                <input type="radio" id="employee" name="user_type" value="Employee"/>
                <label for="employee">Employee</label><br/>
                <input type="radio" id="admin" name="user_type" value="Admin"/>
                <label for="admin">Admin</label>
            <br/>
            </div>
            <button type='submit'>Create User</button>
            </form>
            <div>Password must be 16 Characters long.</div>
        </div>
    );
}