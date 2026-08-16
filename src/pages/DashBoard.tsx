import Header from "../component/Header"
import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from '../types/type';
import { FetchChartData, FetchDashboardData } from "../redux/slices/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank, faDollarSign, faPercent, faTurnUp } from '@fortawesome/free-solid-svg-icons'
import { faLinktree } from '@fortawesome/free-brands-svg-icons'
import Cards from "../component/Cards";
import { FetchDirectReferrelTree } from "../redux/slices/referrelTreeSlice";
import ReferrelTree from "../component/ReferrelTree";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Outlet } from "react-router-dom";
import { BarChart } from "../component/BarChart";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Footer from "../component/Footer";
import './DashBoard.css'

Chart.register(CategoryScale);

const DashBoard = () => {
  const dispatch = useAppDispatch();
  const dashboardData = useAppSelector(state => state.auth.dashboard);
  const chart = useAppSelector(state => state.auth.chart);
  const directReferrel = useAppSelector(state => state.referreltree.directReferreltree)
  const [referrelTree, setReferrelTree] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    (async () => {
      try {
        await dispatch(FetchDashboardData()).unwrap();
        await dispatch(FetchDirectReferrelTree()).unwrap();
        await dispatch(FetchChartData()).unwrap();
      } catch (error) { console.log(error) }
    })()
  }, [dispatch]);

  const chartData = useMemo(() => ({
    labels: chart?.map((data) => data.date) ?? [],
    datasets: [
      {
        label: "income",
        data: chart?.map((data) => data.totalAmount) ?? [],
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2
      }
    ]
  }), [chart]);

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <div className="pt-17">
        <div className="w-auto h-24 p-4 m-4 rounded-2xl bg-black text-white flex items-center justify-between overflow-hidden">
          <div className="flex items-center gap-4 min-w-0">
            <div className="min-w-0">
              <div className="flex items-baseline gap-2 min-w-0">
                <h1 className="text-base font-semibold truncate">{dashboardData?.fullName}</h1>
                <span className="truncate text-xs text-gray-400">
                  Referred by  <span className="text-base font-semibold text-white">{directReferrel?.referredUserFullName || "No referral"}</span>
                </span>
              </div>

              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-sm text-gray-200 font-semibold">Referral code</span>
                <span className="text-xs text-gray-400 truncate">({dashboardData?.referralCode})</span>
                <CopyToClipboard
                  text={dashboardData?.referralCode || ""}
                  onCopy={handleCopy}
                >
                  <button
                    type="button"
                    className="
                      px-2 py-0.5
                      text-[11px] font-medium
                      text-white
                      bg-white/10
                      border border-white/20
                      rounded-md
                      hover:bg-white/20
                      hover:border-white/30
                      transition-all duration-200
                      active:scale-95
                      whitespace-nowrap
                    "
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setReferrelTree(true)}
            className="
              flex items-center gap-2
              px-4 py-2
              text-sm font-medium
              text-white
              bg-white/10
              border border-white/20
              rounded-lg
              hover:bg-white/20
              hover:border-white/30
              transition-all duration-200
              active:scale-95
              shrink-0
              whitespace-nowrap
            "
          >
            <FontAwesomeIcon icon={faLinktree} />
            <span className="hidden md:inline">View full tree</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          <Cards heading="Wallet balance" value={dashboardData?.walletBalance} icon={<FontAwesomeIcon icon={faPiggyBank} />} />
          <Cards heading="Total invested" value={dashboardData?.totalInvestments} icon={<FontAwesomeIcon icon={faDollarSign} />} />
          <Cards heading="ROI earned" value={dashboardData?.totalROIEarned} icon={<FontAwesomeIcon icon={faPercent} />} />
          <Cards heading="Level income" value={dashboardData?.totalLevelIncomeEarned} icon={<FontAwesomeIcon icon={faTurnUp} />} />
        </div>

        <div className="px-4 pt-4 pb-20">
          <BarChart chartData={chartData} />
        </div>
        <div>
          <Footer/>
        </div>

        {referrelTree && <ReferrelTree onClose={() => setReferrelTree(false)} />}

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashBoard