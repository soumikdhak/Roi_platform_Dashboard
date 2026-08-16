import type { IFilter } from '../interfaces/IFilter.interface';
import { fetchReferrelIncomeofLoggedInUser } from '../redux/slices/referrelIncomeSlice';
import { useAppDispatch, useAppSelector } from '../types/type';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const ReferrelIncome = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { referralIncomes, pagination, loading, error } = useAppSelector(state => state.rlis);
  const dashboardData = useAppSelector(state => state.auth.dashboard)
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const filter: IFilter = { page, limit };

    (async () => {
      try {
        await dispatch(fetchReferrelIncomeofLoggedInUser(filter)).unwrap();
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch, page]);

  const totalPages = pagination?.totalPages ?? 1;

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return;
    setPage(p);
  };

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div onClick={() => navigate(`/dashboard/${dashboardData?.userCode}`)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-4xl rounded-2xl bg-transparent p-2 sm:p-8">
        <button onClick={() => navigate(`/dashboard/${dashboardData?.userCode}`)} className="absolute top-4 right-4 text-zinc-400 hover:text-white text-lg transition-colors">
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>

        <h1 className="text-xl font-semibold text-white mb-4 pr-8">Referral Income</h1>

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
                      <th className="px-4 py-2 text-xs uppercase tracking-wider text-zinc-500 font-medium">ROI Code</th>
                      <th className="px-4 py-2 text-xs uppercase tracking-wider text-zinc-500 font-medium">To User</th>
                      <th className="px-4 py-2 text-xs uppercase tracking-wider text-zinc-500 font-medium">From User</th>
                      <th className="px-4 py-2 text-xs uppercase tracking-wider text-zinc-500 font-medium">Amount</th>
                      <th className="px-4 py-2 text-xs uppercase tracking-wider text-zinc-500 font-medium">Date</th>
                      <th className="px-4 py-2 text-xs uppercase tracking-wider text-zinc-500 font-medium">Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referralIncomes?.map((rli) => (
                      <tr key={rli.roiCode} className="border-b border-zinc-800/60 last:border-0 hover:bg-white/5 transition-colors">
                        <td className="px-4 py-2 text-zinc-300 font-mono text-xs">{rli.roiCode}</td>
                        <td className="px-4 py-2 text-zinc-300">{rli.toUser}</td>
                        <td className="px-4 py-2 text-zinc-300">{rli.fromUser}</td>
                        <td className="px-4 py-2 text-white font-medium">₹{rli.amount}</td>
                        <td className="px-4 py-2 text-zinc-400">{rli.date}</td>
                        <td className="px-4 py-2">
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                            Lv {rli.level}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1 mt-4">
                  <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-sm text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>

                  {getPageNumbers()[0] > 1 && (
                    <>
                      <button
                        onClick={() => goToPage(1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-sm text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        1
                      </button>
                      {getPageNumbers()[0] > 2 && <span className="text-zinc-600 px-1">...</span>}
                    </>
                  )}

                  {getPageNumbers().map((p) => (
                    <button
                      key={p}
                      onClick={() => goToPage(p)}
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                        p === page
                          ? "bg-white text-black"
                          : "text-zinc-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {p}
                    </button>
                  ))}

                  {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                    <>
                      {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                        <span className="text-zinc-600 px-1">...</span>
                      )}
                      <button
                        onClick={() => goToPage(totalPages)}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-sm text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-sm text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              )}
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

export default ReferrelIncome