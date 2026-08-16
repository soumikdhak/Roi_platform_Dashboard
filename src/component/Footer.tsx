import { NavLink } from "react-router-dom"
import { useAppSelector } from '../types/type'

const Footer = () => {
  const user = useAppSelector(state => state.auth.user);
  const userCode = user?.userCode

  const linkClass = ({ isActive, isPending }: { isActive: boolean; isPending: boolean }) =>
    `flex-1 text-center py-3 text-sm font-medium transition-colors ${
      isActive
        ? "text-zinc-100"
        : isPending
        ? "text-zinc-500"
        : "text-zinc-400 hover:text-zinc-300"
    }`;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-1/3 flex items-center gap-1 bg-transparent backdrop-blur-md border border-white/10 rounded-full px-2 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
      <NavLink to={`/Dashboard/${userCode}/investments`} className={linkClass}>
        Investments
      </NavLink>
      <NavLink to={`/Dashboard/${userCode}/roiHistory`} className={linkClass}>
        ROI History
      </NavLink>
      <NavLink to={`/Dashboard/${userCode}/referrelIncome`} className={linkClass}>
        RLI History
      </NavLink>
    </div>
  )
}

export default Footer