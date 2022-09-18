import React, { Component } from 'react';
import './Login.css';

export default class Login extends Component {
  render() {
    return(
        <section>
            <h1>Log in</h1>
            <div class = "credentials">
                <form class = "loginform">
                    <label for = "username"><p>Username</p></label>
                    <input type = "text" required />

                    <label for = "password"><p>Password</p></label>
                    <input type = "password" required />

                    <button type = "submit" class = "loginbtn">Log in</button>
                </form>
            </div>
        </section>
    )
  }
}
