
const Navbar = () => {
    const handleLogout = () => {

        // signOut(auth).then(() => {
        window.localStorage.clear();
        alert("loged out")
        window.location.reload();
    
    
        // }).catch((error) => {
    
        //   alert(error)
        // });
      }
    

    return (
        <>
            {/* <nav className="navbar navbar-expand-lg navbar-dark " style={{background: "#060606"}}> */}
            <nav className="navbar navbar-expand-lg navbar-dark " >

                <div className="container">

                
                <a className="navbar-brand" href="/">Secure DNS</a>
                {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}

                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        {/* <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="#">Contact Us</a>
                        </li> */}
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" /> */}
                        <button className='btn-sm btn-danger ' onClick={handleLogout} >Logout</button>
                        {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
                    </form>
                </div>
                </div>
            </nav>
        </>
    )
}


export default Navbar;