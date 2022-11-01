import React, { Component } from 'react';
import './Login.css';
import Logo from './logo.png'; //change path once merged
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default class Login extends Component {
  render() {
    return(
      <>
      
      <div class="container-fluid text-center">
          <div class="row content">
           
            <div class="col-sm-8 text-left">
              
              
              <div className = "credentials">
                <form className = "loginform">
                  
                    {/*email is used for username to get rid of animation thing*/}
                    
                    {/*<button type = "submit" className = "loginbtn">Log in</button>*/}
                  <div className = "cardthing">  
                    <Card border="primary" className="LoginCard">
                      <Card.Header>Login to PIMS</Card.Header>
                      <Card.Body>
                      <label className = "username"><p>Username&nbsp;</p></label>
                    <input type = "email" required/>
                    <br></br>   
                    <label className = "password"><p>Password&nbsp;&nbsp;</p></label>
                    <input type = "password" required />
                    <br></br>
                    <Button variant="outline-primary" className = "loginbutton">Login</Button>{' '}
                    <br></br>
                    <br></br>
                        <Card.Title>Credentials</Card.Title>
                          <Card.Text>
                              Please input your username and password given to you by your system administrator
                          </Card.Text>
                          
                        </Card.Body>
                      </Card>
                  </div>
                  
                </form>

                
              </div>
              
              
                
              </div>
            
          </div>
        </div><footer class="container-fluid text-center">
          <p>CS499 Team 3</p>
        </footer></>

        /*<section>
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
        </section>*/
    )
  }
}
