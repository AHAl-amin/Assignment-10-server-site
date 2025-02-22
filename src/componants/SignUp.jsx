

import { Link } from "react-router-dom";


import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import { Fade } from 'react-awesome-reveal';







const SignUp = () => {
    const { createUser } = useContext(AuthContext)
    // console.log(authInfo)
    const [signupError, setSignupError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState('');

    const [showPassword, setShowPassword] = useState(false)

    const handleSignUp = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = e.target.photo.value;
        const password = e.target.password.value;
        console.log(name, email, photo, password)


        //  reset error
        setSignupError('')
        setSignupSuccess('')

        if (password.length < 6) {
            setSignupError(' Password should be at least 6 characters');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setSignupError('your password should have at least one uppercase character');
            return;
        }
        else if (!/[a-z]/.test(password)) {
            setSignupError('your password should have at least one lowercase character');
            return;
        }

        createUser(email, password)
            .then(result => {
                console.log(result.user)
                toast.success('Sign up successfully')
            })
            .catch(error => {
                console.error(error);
                toast.error('Email already in use')
            })
    }

   
    return (

        <div className="hero min-h-screen max-w-6xl mx-auto">
             <Helmet>
                <title>LoveToTravel/signUp</title>
            </Helmet>
            <div className="hero-content flex-col ">
                <div className="text-center ">
                    <h1 className="text-5xl font-bold"> <Fade direction="left">Sign up now!</Fade></h1>

                </div>
                <Fade direction="down">

                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSignUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">name</span>
                            </label>
                            <input type="text" placeholder="Your Name" name="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" placeholder="Photo URL" name="photo" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={showPassword ? "text" : "password"} placeholder="password" name="password" className="input input-bordered" required />
                            <span className="absolute top-[50px] right-2" onClick={() => setShowPassword(!showPassword)}>
                                {
                                    showPassword ? <FaEyeSlash /> : <FaEye />
                                }
                            </span>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign up</button>
                        </div>
                        <p>Already have account? please <Link to="/login"><button className="btn btn-link">Login</button></Link>

                        </p>

                        {
                            signupError && <p className="text-red-500">{signupError}</p>
                        }
                        {
                            signupSuccess &&
                            <p className="text-green-500">{signupSuccess}</p>
                        }
                    </form>
                    
                </div>
                </Fade>
                <ToastContainer />
            </div>
        </div>
    );
};

export default SignUp;