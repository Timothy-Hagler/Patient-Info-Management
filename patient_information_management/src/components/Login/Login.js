import React, { Component } from 'react';
import './Login.css';

export default class Login extends Component {
  render() {
    return(
        <section>
            <h1>Log in</h1>
            <div className = "credentials">
                <form className = "loginform">
                    <label htmlFor = "username"><p>Username</p></label>
                    <input type = "text" required />

                    <label htmlFor = "password"><p>Password</p></label>
                    <input type = "password" required />

                    <button type = "submit" className = "loginbtn">Log in</button>
                </form>
            </div>
        </section>
    )
  }
}
