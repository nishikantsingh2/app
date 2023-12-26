import Navbar from '@/component/navbar'
import { base_url } from '@/util/baseUrl'
import axios from 'axios'
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useRouter } from 'next/router'
import ProtectedPage from '@/Authentication/protected-page'
import {  Field, Form, Formik, useFormik } from 'formik'
// import { NextApiRequest, NextApiResponse } from 'next';
// import WGEasyWrapper from 'wg-easy-wrapper';
const WGEasyWrapper = require('wg-easy-wrapper');

export default function Home() {

  const { currentUser } = useContext(AuthContext)
  const user = [currentUser]
  const router = useRouter()

  const [isVpnon,setIsVpnon] = useState("")
  // console.log(isVpnon)

  const formik = useFormik({
    initialValues: {

      
      vpn_status: false, 

    },
    // validationSchema: schema,
    onSubmit: async (values) => {
      // console.log(values.vpn_status)
       setIsVpnon(values.vpn_status);

      if(values.vpn_status===true){
        const response = await axios.post(`${base_url}user/wireguardapi`);
        console.log(response.data.config1)

        // start new 

        const serverConfContent = `[Interface]\nAddress = ${response.data.config1.wgInterface.address[0]}\n\nPrivateKey = ${response.data.config1.wgInterface.privateKey}\n\n[Peer]\nPublicKey = ${response.data.config1.peers[0].publicKey}\nEndpoint = ${response.data.config1.peers[0].endpoint}\nPersistentKeepalive = ${response.data.config1.peers[0].persistentKeepalive}\nAllowedIPs = ${response.data.config1.peers[0].allowedIps[0]}\nPresharedKey = ${response.data.config1.preSharedKey}`;

        // Create a blob and temporary URL
        const blob = new Blob([serverConfContent], { type: 'text/plain' });
        const downloadUrl = window.URL.createObjectURL(blob);
      
        // Create hidden anchor element and trigger download
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = 'server.conf';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      
        // Revoke the temporary URL after download
        window.URL.revokeObjectURL(downloadUrl);
      }
      else{
       
        console.log("off")
      }
     
    },
  });
 

  const handleCheckboxChange = () => {
    // Ma the form submissionually triggern when the checkbox changes
    formik.handleSubmit();
  };
  const handleclick = async () => {
    const wgEasy = new WGEasyWrapper('https://localhost:3000', 'sfrwerfwe');
    await wgEasy.create('newClient');

console.log(await wgEasy.getRelease())
  }
  
  return (
    <>
      <ProtectedPage />
      <Head>
        <title>Secure Dns</title>
        <meta name="description" content="Developed by cyber peace" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar className='background-black' />
      <div className='row background-black'>
      

        <div className="container">
          <div className="row justify-content-center align-items-center pt-4 ">
            <div className="col-md-6 ">
            
              <h2 style={{ color: "white", margin: "20px", textAlign: 'center', marginTop: '153px',fontFamily: "Open Sans", background: '#150d48' , border:' 1px solid #00ff9c',
  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', borderRadius:'20px'}}>Let's connect to Secure dns </h2>
   {/* <h2 style={{ color: "white", margin: "20px", textAlign: 'center', fontFamily: "Open Sans"}}> Secure dns {isVpnon==true?"ON":"OFF"} </h2> */}
           
            </div>
          </div>
        </div>

        

        
        <div className='toggle'>
          <div >

          
            <form onSubmit={formik.handleSubmit}>
              <div className="content">

                <input
                  type="checkbox"
                  id="btn"
                  name="vpn_status"
                 
                  onChange={(e) => {
                    formik.handleChange(e);
                    handleCheckboxChange();
                  }}
                  checked={formik.values.vpn_status}
                />
                <label htmlFor="btn">
                  <span className="thumb"></span>
                </label>
                <div className="lights">
                  <span className="light-off"></span>
                  <span className="light-on"></span>
                </div>

              </div>
            </form>

            
          </div>


        </div>

      </div>


    </>
  )
}
