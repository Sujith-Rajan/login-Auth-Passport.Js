import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
import Github from "../img/github.png";

const Login = () => {
   const google = () => {
    window.open("http://localhost:8000/auth/google","_self")
   }
   const facebook = () => {
    
   }
   const github = () => {
    window.open("http://localhost:8000/auth/github","_self")
   }

  return (
    <div className='login'>
        <h1 className="loginTitle">Login</h1>
        <div className="wrapper">
            <div className="left">
                <div className="loginButton google" onClick={google}>
                    <img src={Google} alt="" className="icon" />
                    Google
                </div>
                <div className="loginButton facebook" onClick={facebook}>
                    <img src={Facebook} alt="" className="icon" />
                    Facebook
                </div>
                <div className="loginButton github" onClick={github}>
                    <img src={Github} alt="" className="icon" />
                    GitHub
                </div>

            </div>
            <div className="center">
                <div className="line"/>
                    <div className="or">OR</div>
            </div>
            <div className="right">
                <input type="text" placeholder='username' />
                <input type="password" placeholder='password' />
                <button className='submit'>Login</button>
            </div>
              
        </div>
    </div>
  )
}

export default Login