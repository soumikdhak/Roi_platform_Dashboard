import { useAppDispatch, useAppSelector } from '../types/type';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { fetchLoggedInUserInvestment } from '../redux/slices/investmentSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const Investment = () => {
  const value = 'newest'
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { investments, loading, error } = useAppSelector(state => state.investment);
  const dashboardData = useAppSelector(state => state.auth.dashboard);

      useEffect(() => {    
        (async () => {
          try {
            await dispatch(fetchLoggedInUserInvestment(value)).unwrap();
          } catch (error) {
            console.log(error);
          }
        })();
      }, [dispatch]);

  return (
    <div onClick={() => navigate(`/dashboard/${dashboardData?.userCode}`)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-4xl rounded-2xl bg-transparent p-2 sm:p-8">
        <button onClick={() => navigate(`/dashboard/${dashboardData?.userCode}`)} className="absolute top-4 right-4 text-zinc-400 hover:text-white text-lg transition-colors">
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>

        <h1 className="text-xl font-semibold text-white mb-4 pr-8">Investments</h1>

        <div>
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <p className="text-zinc-400 text-sm">Loading...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-10">
              <p className="text-red-400 text-sm">Something went wrong: {error}</p>
            </div>
          ) : (
            <div>
              <div className="overflow-x-auto rounded-xl border border-zinc-800">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-zinc-900/60 border-b border-zinc-800">
                      <th className="px-4 py-2 text-xs uppercase tracking-wider text-zinc-500 font-medium">User Code</th>
                      <th className="px-4 py-2 text-xs uppercase tracking-wider text-zinc-500 font-medium">Investment Code</th>
                      <th className="px-4 py-2 text-xs uppercase tracking-wider text-zinc-500 font-medium">ROI(%)</th>
                      <th className="px-4 py-2 text-xs uppercase tracking-wider text-zinc-500 font-medium">Amount</th>
                      <th className="px-4 py-2 text-xs uppercase tracking-wider text-zinc-500 font-medium">Start Date</th>
                      <th className="px-4 py-2 text-xs uppercase tracking-wider text-zinc-500 font-medium">End Date</th>
                      <th className="px-4 py-2 text-xs uppercase tracking-wider text-zinc-500 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investments?.map((inv) => (
                      <tr key={inv.investmentCode} className="border-b border-zinc-800/60 last:border-0 hover:bg-white/5 transition-colors">
                        <td className="px-4 py-2 text-zinc-300 font-mono text-xs">{inv.refUserCode}</td>
                        <td className="px-4 py-2 text-zinc-300">{inv.investmentCode}</td>
                        <td className="px-4 py-2 text-zinc-300">{inv.dailyROIPercent}</td>
                        <td className="px-4 py-2 text-white font-medium">₹{inv.amount}</td>
                        <td className="px-4 py-2 text-zinc-400">{inv.startDate}</td>
                        <td className="px-4 py-2 text-zinc-400">{inv.endDate}</td>
                        <td className="px-4 py-2">
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                            {inv.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <Footer />
      </div>
    </div>
  )
}

export default Investment
