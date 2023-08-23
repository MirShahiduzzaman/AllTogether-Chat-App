import React, { useContext } from "react";
import { Context } from '../context';
import { useRouter } from "next/router";
import axios from 'axios';

// const path = require('path')
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
// require('dotenv').config({ path: '../.env' })

export default function Auth() {
  const { username, secret, setUsername, setSecret } = useContext(Context);

  const router = useRouter();

  function onSubmit(e){
    e.preventDefault();

    if (username.length == 0 || secret.length == 0)
      return;

    axios.put(
      "https://api.chatengine.io/users/",
      {username: username, secret: secret},
      {headers: {"Private-key": process.env.NEXT_PUBLIC_API_KEY}}
    )
    .then(r => router.push('/chats'));
  }
  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
          <div className="auth-title">AllTogether</div>

          <div className="input-container">
            <input
              placeholder="Username"
              className="text-input"
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              className="text-input"
              onChange={e => setSecret(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button" >
            Login / Sign Up
          </button>
        </form>
      </div>

      <div className="instruct">
        For testing, can use these logins:
        
        <ul>
          <li>user: mir, pass: hello</li>
          <li>user: matin, pass: world</li>
          <li>user: brainy, pass: math</li>
          <li>user: messi, pass: mess</li>
          <li>user: renaldo, pass: penalty</li>
        </ul>
      </div>

      
    </div>
  );
}
