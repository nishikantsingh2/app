import { auth } from "@/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import React, { useContext } from "react";
import * as Yup from 'yup';
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

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

        },
        validationSchema: schema,
        onSubmit: async (values) => {
        //  console.log(values)
            // dispach(login(values))


            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;

                   
                    dispatch({ type: "LOGIN", payload: user })
                    // navitage("/")
                    
                    alert("loged in");
                    router.push("/")
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