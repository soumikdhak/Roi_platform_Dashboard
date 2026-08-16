import{useAppSelector} from '../types/type'
import { extractFirstLetter } from '../utils/extractFirstLetter';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faRightFromBracket,faPlus} from '@fortawesome/free-solid-svg-icons'
import {useAppDispatch} from '../types/type'
import { logoutUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InvestmentForm from './InvestmentForm';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user);
  const dashboardData = useAppSelector(state => state.auth.dashboard);

  const name = typeof user?.fullName === 'string'?user.fullName:""
  const firstletter:string = extractFirstLetter(name);

  const [investmentModal, setInvestmentModal] = useState(false);

  const logoutHandler = async ()=>{
    try {
      await dispatch(logoutUser()).unwrap();

      navigate("/login")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className='flex items-center justify-between px-6 py-4 md:px-12 border-b border-slate-200 bg-white'>
        <div className='flex items-center gap-3'>
          <span className='w-9 h-9 flex items-center justify-center rounded-full bg-slate-900 text-white text-sm font-medium'>{firstletter}</span>
          <div className='flex flex-col leading-tight'>
            <span className='text-sm font-medium text-slate-900'>{user?.fullName}</span>
            <span className='text-xs text-green-500'>{dashboardData?.activeInvestments} active Invesments</span>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <div onClick={()=>setInvestmentModal(true)} className='flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md bg-slate-900 text-white cursor-pointer hover:bg-slate-800'>
            <FontAwesomeIcon icon={faPlus} className='cursor-pointer text-xs'/>
            <span className='hidden sm:inline'>New Investment</span>
          </div>
          <div onClick={logoutHandler} className='flex items-center gap-2 text-sm text-slate-600 px-3 py-2 rounded-md cursor-pointer hover:bg-slate-50 hover:text-slate-900'>
            <FontAwesomeIcon icon={faRightFromBracket} className='cursor-pointer text-xs'/>
            <span className='hidden sm:inline'>Logout</span>
          </div>
        </div>
      </div>
      {investmentModal&&<InvestmentForm onClose={()=>setInvestmentModal(false)}/>}
    </div>
  )
}

export default Header