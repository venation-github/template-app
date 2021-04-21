import React, { useState } from 'react'
import '../App.css'
import axios from '../config/axios'
import "bulma/css/bulma.css";
import {
    Link,
} from "react-router-dom";
// import { getRole, setRole } from '../redux/action';
// import { useDispatch, useSelector } from 'react-redux'

export default function Login(props) {
    // const dispatch = useDispatch()
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")

    function login() {
        axios.post('/login', {
            email,
            password
        })
            .then(function (response) {
                localStorage.token = response.data.token
                props.history.push('/')
                window.location.reload();
            })
    }

    if (localStorage.token) {
        return (
            <h1>You Already Logged In</h1>
        )
    }
    return (
        <>
            <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>Welcome, Please Login</h1>

            <form className="form"
                style={{ justifyContent: "center", alignContent: "center", marginTop: "100px", width: "50%", display: "inline-block" }}
                onSubmit={(e) => {
                    e.preventDefault()
                    login()
                }}>
                <div className="field">
                    <label className="label is-family-code">Email</label>
                    <input className="input" type="email" placeholder="Enter your valid email" onChange={e => setemail(e.target.value)} />
                </div>

                <div className="field">
                    <label className="label is-family-code">Password</label>
                    <input className="input" type="password" placeholder="Password" onChange={e => setpassword(e.target.value)} />
                </div>

                <div className="field">
                    <div className="control">
                        <button className="button is-black">Login</button>
                    </div>
                    <p>Doesn't Have Account? Register <Link to="/register">Here</Link></p>
                </div>
            </form>
        </>
    )
}
