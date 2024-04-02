import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from "@material-tailwind/react";
import Navber from "../../components/navbar/Navbar"




const Login = () => {
    const [resetEmail, setResetEmail] = useState("");
    const [resettingPassword, setResettingPassword] = useState(false);

    //navigate
    const navigate = useNavigate();

    const handlePasswordReset = async () => {
        if (resetEmail === "") {
            toast.error("Please enter your email address");
            return;
        }

        try {
            setResettingPassword(true);
            await sendPasswordResetEmail(auth, resetEmail);
            toast.success("Password reset email sent successfully");
            setResetEmail("");
            setResettingPassword(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to send password reset email");
            setResettingPassword(false);
        }
    };

    return (
        <>
            <div className="containerr">
                <Navbar />
            </div>
            <div className='flex justify-center items-center m-28'>
                {/* {loading && <Loader />} */}
                <div className="Reset_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-pink-500 '>
                            Reset Password
                        </h2>
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handlePasswordReset}
                        className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
                        disabled={resettingPassword}
                    >
                        {resettingPassword ? "Sending Email..." : "Reset Password"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/Login')}
                        className="text-pink-500 hover:underline mt-3 block text-center"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </>
    )
}

export default Login;

