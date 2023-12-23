import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import * as Yup from 'yup';
import { AuthContext } from "./context/AuthContext";
import { useRouter } from "next/router";
import axios from 'axios';
import { base_url } from "@/util/baseUrl";

const Login = () => {

    const router = useRouter()
    const {dispatch} = useContext(AuthContext);
    let schema = Yup.object().shape({



        email: Yup.string().email("Email should be valid").required("Email is required"),
        password: Yup.string().required("Password is required"),


    });
    const formik = useFormik({
        initialValues: {

            email: '',
            password: '',
            username:'',

        },
        validationSchema: schema,
        onSubmit: async (values) => {
      
           
              
                  createUserWithEmailAndPassword(auth, values.email, values.password)
                  .then((userCredential) => {
                    // Signed in
                    updateProfile(auth.currentUser, {
                        displayName: username
                      });

                    const user = userCredential.user;

                    console.log('User signed up:', user);
                   
                })
                .catch((error) => {
                    // setError(true);
                    console.log(error);
                });
                 
                 
        },
    });


   
    


    return (
        <>
            <div className="row bg">
                <div className="col-4"></div>
                <div className="col-4 padding-50">
                    <div >
                        <form onSubmit={formik.handleSubmit}>
                            <div className="login-title ">
                                <h2 className="login-title ">Secure Dns</h2>
                            </div>
                            <div className="form-field">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    required
                                    onChange={formik.handleChange("username")}
                                />
                            </div>
                            <div className="form-field">
                                <input
                                    type="email"
                                    placeholder="Email / Username"
                                    required
                                    onChange={formik.handleChange("email")}
                                />
                            </div>
                            <div className="form-field">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    onChange={formik.handleChange("password")}
                                />
                            </div>
                            <div className="form-field">
                                <button className="btn" type="submit">Sign Up</button>
                            </div>
                            
                        </form>
                     
                    </div>
                </div>
            </div>
        </>
    )

}


export default Login;