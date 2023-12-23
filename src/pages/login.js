import { auth } from "@/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import * as Yup from 'yup';
import { AuthContext } from "./context/AuthContext";
import { useRouter } from "next/router";
import axios from 'axios';
import { base_url } from "@/util/baseUrl";

const Login = () => {

    const router = useRouter()
    const { dispatch } = useContext(AuthContext);
    let schema = Yup.object().shape({



        email: Yup.string().email("Email should be valid").required("Email is required"),
        password: Yup.string().required("Password is required"),


    });
    const formik = useFormik({
        initialValues: {

            email: '',
            password: '',

        },
        validationSchema: schema,
        onSubmit: async (values) => {

            try {
                const response = await axios.post(base_url + 'user/login', values);
                const user = response.data;

                dispatch({ type: "LOGIN", payload: user })
                router.push('/')
                console.log(response);
            } catch (error) {
                console.error(error);
            }



        },
    });


    //  check user present or not 
    let user;
    if (typeof window !== 'undefined') {
        user = JSON.parse(localStorage.getItem("user"));

    }

    useEffect(() => {

        if (user) {
            console.log("user present")
            router.push("/")

        } else {
            console.log("No present")
        }

    }, [])



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
                                <button className="btn" type="submit">Log in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
           
        </>
    )

}


export default Login;