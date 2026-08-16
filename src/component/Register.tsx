import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserPlus,faCircleXmark,faIdBadge,faEnvelope,faMobile,faLock,faSquareBinary} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom'
import { registerUser } from '../redux/slices/authSlice';
import type { IFormData } from '../interfaces/IFormData.interface';
import type { IResultData } from '../interfaces/IResultData.interface';
import { useAppDispatch } from '../types/type';

const Register = () => {

    const navigate=useNavigate();
    const dispatch = useAppDispatch()

    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    } = useForm<IFormData>();

    const submitForm = async (data:IFormData) => {
        //console.log("Data:",data);
        const result:IResultData = await dispatch(registerUser(data)).unwrap(); 
        const userCode = result.data?.userCode;
        navigate(`/dashboard/${userCode}`)     
    }

  return (
    <div onClick={()=>navigate("/")} className="pointer-events-auto min-h-screen w-full flex items-center justify-center backdrop-blur-sm px-4 py-8">
        <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button onClick={()=>navigate("/")} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg">
                <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <div className="mb-6">
                <h1 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-slate-900">
                    <FontAwesomeIcon icon={faUserPlus} className="text-slate-700" />
                    Create account
                </h1>
                <p className="mt-1 text-sm text-slate-500">Join using a referral code, if you have one.</p>
            </div>
            <div>
                <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-4">
                    <div>
                        <div className="flex items-center gap-2 border border-slate-300 rounded-md px-3 py-2 focus-within:border-slate-500 focus-within:ring-1 focus-within:ring-slate-500">
                            <FontAwesomeIcon icon={faIdBadge} className="text-slate-400 text-sm" />
                            <input type="text" placeholder="Full Name..." {...register('fullName', {required:"Username Required", maxLength:{value:30, message:"Max 30 chars"}})} className="w-full text-sm text-slate-900 placeholder:text-slate-400 outline-none"/>
                            <span className="text-red-500 text-xs">*</span>
                        </div>
                        {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 border border-slate-300 rounded-md px-3 py-2 focus-within:border-slate-500 focus-within:ring-1 focus-within:ring-slate-500">
                            <FontAwesomeIcon icon={faEnvelope} className="text-slate-400 text-sm" />
                            <input type="text" placeholder="Email Address" {...register('email', {required:"Email Required", pattern:{value:/^[a-z0-9.]+@[a-z]+\.[a-z]+$/, message:"Enter a valid email"}})} className="w-full text-sm text-slate-900 placeholder:text-slate-400 outline-none"/>
                            <span className="text-red-500 text-xs">*</span>
                        </div>
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 border border-slate-300 rounded-md px-3 py-2 focus-within:border-slate-500 focus-within:ring-1 focus-within:ring-slate-500">
                            <FontAwesomeIcon icon={faMobile} className="text-slate-400 text-sm" />
                            <input type="text" placeholder="Mobile Number" {...register('mobileNumber', {required:"Mobile Number Required", pattern:{value:/^\d{10}$/ ,message:"Please Enter a 10 digit mobile number"}})} className="w-full text-sm text-slate-900 placeholder:text-slate-400 outline-none"/>
                            <span className="text-red-500 text-xs">*</span>
                        </div>
                        {errors.mobileNumber && <p className="mt-1 text-xs text-red-500">{errors.mobileNumber.message}</p>}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 border border-slate-300 rounded-md px-3 py-2 focus-within:border-slate-500 focus-within:ring-1 focus-within:ring-slate-500">
                            <FontAwesomeIcon icon={faLock} className="text-slate-400 text-sm" />
                            <input type="password" placeholder="Password..." {...register('password', {required:"Password Required", minLength:{value:6, message:"Password must contain 6 char"}})} className="w-full text-sm text-slate-900 placeholder:text-slate-400 outline-none"/>
                            <span className="text-red-500 text-xs">*</span>
                        </div>
                        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 border border-slate-200 rounded-md px-3 py-2 focus-within:border-slate-400">
                            <FontAwesomeIcon icon={faSquareBinary} className="text-slate-400 text-sm" />
                            <input type="text" placeholder="ReferrelCode..." {...register('referrelCode')} className="w-full text-sm text-slate-900 placeholder:text-slate-400 outline-none"/>
                            <span className="text-slate-400 text-xs whitespace-nowrap">Optional</span>
                        </div>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="mt-2 w-full bg-slate-900 text-white text-sm font-medium rounded-md py-2.5 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed">
                        {isSubmitting ? "processing..." : "Create Account"}
                    </button>
                </form>
            </div>
            <div className="mt-5 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <span onClick={()=>navigate("/login")} className="text-slate-900 font-medium cursor-pointer hover:underline">login</span>
            </div>
        </div>
    </div>
  )
}

export default Register;