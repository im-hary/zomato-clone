import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './sy.css';
import g from '../assets/google.png';
import f from '../assets/facebook.png';
import x from '../assets/x-lg.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import usericon from '../assets/person-circle.svg';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

function Header() {
    const [modalOpen, setModalOpen] = useState(false);
    const [account, setCreateaccount] = useState(false);
    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Optionally, you can verify the token here or get user info
            setIsLoggedIn(true);
            setUser({ email: loginEmail }); // Replace with actual user info
        }
    }, []);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const createAccount = () => {
        setCreateaccount(true);
    };

    const closeAccount = () => {
        setCreateaccount(false);
    };

    const submitSignup = async (e) => {
        e.preventDefault();
        setError('');
        if (Password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await axios.post('http://localhost:8080/signup', { Firstname, Lastname, Email, Password });
            closeAccount();
            setFirstname('');
            setLastname('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            navigate('/');
        } catch (err) {
            setError('Signup failed. Please try again.');
            console.log(err);
        }
    };

    const submitLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:8080/login', { Email: loginEmail, Password: loginPassword });
            localStorage.setItem('token', response.data.token);
            setIsLoggedIn(true);
            setUser({ email: loginEmail }); // Replace with actual user info
            navigate('/');
            closeModal();
            setLoginEmail('');
            setLoginPassword('');
        } catch (err) {
            setError('Login failed. Please try again.');
            console.log(err);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
        navigate('/');
    };

    const customStyle = {
        content: {
            top: '15%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-40%, -10%)',
            textAlign: 'center',
            width: '350px',
            height: '90vh',
            border: '3px solid black',
            backgroundColor: "transparent",
            backdropFilter: 'blur(9px)'
        },
    };

    const customStyleMobile = {
        content: {
            top: '15%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-30%',
            transform: 'translate(-50%, -10%)',
            textAlign: 'center',
            width: '90%',
            height: '90vh',
            border: '3px solid black',
            backgroundColor: "transparent",
            backdropFilter: 'blur(9px)'
        },
    };

    const getModalStyles = () => {
        return window.innerWidth <= 500 ? customStyleMobile : customStyle;
    };

    return (
        <div className='row'>
            <div className='navbar navbar-expand bg-danger p-1 mt-0'>
                <div className='container'>
                    <Link to ='/' className='navbar-brand'>
                        <div className='d-flex justify-content-center align-item-center'>
                            <div id="icon" className='text-danger bg-light d-flex justify-content-center align-item-center p-4'>
                                <h1 className='d-flex justify-content-center align-item-center' style={{ fontSize: "40px" }}>Z</h1>
                            </div>
                        </div>
                        </Link>

                    <ul className='navbar-nav ms-auto'>
                        {isLoggedIn ? (
                            <>
                                <li className='nav-item'>
                                    <img src={usericon} alt="" width='40px' height='40px'/><span className='navbar-text text-light m-2'> {user.email}</span>
                                </li>
                                <li className='nav-item'>
                                    <button className='btn btn-outline-light' onClick={logout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='nav-item'>
                                    <button className='btn btn-outline-light' id="login" onClick={openModal}>Login</button>
                                </li>
                                <li className='nav-item ml-2'>
                                    <button className='btn btn-outline-light' onClick={createAccount}>Create Account</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
            <div id='log'>
                <Modal isOpen={modalOpen} onRequestClose={closeModal} style={getModalStyles()}>
                    <button className='btn d-flex' onClick={closeModal}><img src={x} alt="" style={{ background: "none" }} /></button>
                    <h2 id='ln' className='text-center'>LOGIN</h2>
                    {error && <h6 className="text-danger">{error}</h6>}
                    <form onSubmit={submitLogin}>
                        <div>
                            <input type="email" placeholder='Enter your email...' className='m-1 mt-3 p-1' style={{ width: "300px" }} value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                            <input type="password" placeholder='Enter your Password...' className='m-1 mt-3 p-1' style={{ width: "300px", height: "35px" }} value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                        </div>
                        <div className='d-flex justify-content-center m-4'>
                            <button className='btn btn-dark rounded m-3 border border-light' type="submit">Login</button>
                            <button className='btn btn-light m-3 rounded border border-dark' type="button" onClick={closeModal}>Cancel</button>
                        </div>
                    </form>
                    <span className='text-center'><p>or</p></span>
                    <div className='d-flex flex-column column-gap-3'>
                        <button className='btn btn-light m-3 border border-dark'><img src={g} alt="" />Sign in with Google </button>
                        <button className='btn btn-light m-3 border border-dark'><img src={f} alt="" />Sign in with Facebook</button>
                    </div>
                    <div><p className='text-center'>Don't have an account? <a href='#' onClick={createAccount}>Sign Up</a></p></div>
                </Modal>
            </div>

            <div id='sign'>
                <Modal isOpen={account} onRequestClose={closeAccount} style={getModalStyles()}>
                    <form onSubmit={submitSignup} >
                        <button className='btn d-flex' onClick={closeAccount}><img src={x} alt="" /></button>
                        <h2 id='ln' className='text-center'>SIGN UP</h2>
                        {error && <p className="text-danger">{error}</p>}
                        <div className='m-3 p-3'>
                            <input type='text' placeholder='Enter your firstname' className='m-4' onChange={(e) => setFirstname(e.target.value)} value={Firstname} /><br />
                            <input type='text' placeholder='Enter your lastname' className='m-4' onChange={(e) => setLastname(e.target.value)} value={Lastname} /><br />
                            <input type='email' placeholder='Enter your email' className='m-4' onChange={(e) => setEmail(e.target.value)} value={Email} /><br />
                            <input type='password' placeholder='Enter your password' className='m-4' onChange={(e) => setPassword(e.target.value)} value={Password} /><br />
                            <input type='password' placeholder='Confirm password' className='m-4' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} /><br />
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button className='btn btn-dark rounded m-3 border border-light' type="submit">Sign Up</button>
                            <button className='btn btn-light m-3 rounded border border-dark' type="button" onClick={closeAccount}>Cancel</button>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
}

export default Header;
