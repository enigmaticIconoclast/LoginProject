import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {sha256} from 'js-sha256';


export default function Create(){

    const[form, setForm] =useState({
        userName: "",
        password: "",

    });
    const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();

        
        
        const userResponse = await fetch("http://localhost:4000/login-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: form.userName}),
        }).catch(error => {
            window.alert(error);
            return;
        });
        const salt =await userResponse.json();
        
        if(salt.saltScore)
        {
            let hash = sha256(form.password.concat(salt.saltScore.toString()));
            form.password = hash;
            const credentials = {...form}
            const passResponse = await fetch("http://localhost:4000/login-password",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            }).catch(error => {
                window.alert(error);
                return;
            });

            const loggedIn = await passResponse.json();
            if(loggedIn.signedIn)
            {
                alert("You are logged in!");
                navigate("/");
            }
            else{
                alert("Invalid Password");
            }

        }
        else{
            alert("Invalid Username");
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
                <h1>Login:</h1>
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
            <button type='submit'>Login</button>
            </form>
        </div>
    );
}