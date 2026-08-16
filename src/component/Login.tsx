import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faCircleXmark, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../types/type';
import { loginUser } from "../redux/slices/authSlice";
import type { IFormData } from "../interfaces/IFormData.interface";
import { useForm } from 'react-hook-form'
import type { IResultData } from "../interfaces/IResultData.interface";

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IFormData>();

    const submitForm = async (data: IFormData) => {
        console.log("Data:", data);
        const result: IResultData = await dispatch(loginUser(data)).unwrap();
        const userCode = result.data?.userCode;
        navigate(`/dashboard/${userCode}`)
    }

    return (
        <div onClick={()=>navigate("/")} className="pointer-events-auto min-h-screen w-full flex items-center justify-center backdrop-blur-sm px-4 py-8">
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 sm:p-8 relative">
                <button onClick={() => navigate("/")} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg">
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
                <div className="mb-6">
                    <h1 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-slate-900">
                        <FontAwesomeIcon icon={faLock} className="text-slate-700" />
                        Log in
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">Enter your details to access your wallet.</p>
                </div>
                <div>
                    <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-4">
                        <div>
                            <div className="flex items-center gap-2 border border-slate-300 rounded-md px-3 py-2 focus-within:border-slate-500 focus-within:ring-1 focus-within:ring-slate-500">
                                <FontAwesomeIcon icon={faEnvelope} className="text-slate-400 text-sm" />
                                <input type="text" placeholder="Email Address" {...register('email', { required: "Email Required" })} className="w-full text-sm text-slate-900 placeholder:text-slate-400 outline-none" />
                                <span className="text-red-500 text-xs">*</span>
                            </div>
                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                        </div>

                        <div>
                            <div className="flex items-center gap-2 border border-slate-300 rounded-md px-3 py-2 focus-within:border-slate-500 focus-within:ring-1 focus-within:ring-slate-500">
                                <FontAwesomeIcon icon={faLock} className="text-slate-400 text-sm" />
                                <input type="password" placeholder="Password..." {...register('password', { required: "Password Required" })} className="w-full text-sm text-slate-900 placeholder:text-slate-400 outline-none" />
                                <span className="text-red-500 text-xs">*</span>
                            </div>
                            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                        </div>

                        <button type="submit" disabled={isSubmitting} className="mt-2 w-full bg-slate-900 text-white text-sm font-medium rounded-md py-2.5 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed">
                            {isSubmitting ? "processing..." : "Log in"}
                        </button>
                    </form>
                </div>
                <div className="mt-5 text-center text-sm text-slate-500">
                    Don't have an account?{" "}
                    <span onClick={()=>navigate("/register")} className="text-slate-900 font-medium cursor-pointer hover:underline">register</span>
                </div>
            </div>
        </div>
    )
}

export default Login