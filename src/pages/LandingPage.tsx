import { Outlet, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <nav className="flex items-center justify-between px-6 py-4 md:px-12">
        <span className="text-xl font-semibold text-slate-900">Nexachain</span>
        <div className="hidden md:flex items-center gap-4 ">
          <span
            onClick={() => navigate("/login")}
            className="text-sm text-slate-700 cursor-pointer hover:text-slate-900"
          >
            Log in
          </span>
          <span
            onClick={() => navigate("/register")}
            className="text-sm px-4 py-2 rounded-md bg-slate-900 text-white cursor-pointer hover:bg-slate-800"
          >
            Get started
          </span>
        </div>
      </nav>

      <section className="flex flex-col items-center text-center px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <h1 className="text-3xl md:text-5xl font-semibold text-slate-900 max-w-4xl leading-tight">
          Grow your wealth, one day at a time
        </h1>
        <p className="mt-4 text-base md:text-lg text-slate-600 max-w-xl">
          Invest with confidence, earn daily returns, and build income through
          a trusted referral network — all from one secure dashboard.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <span
            onClick={() => navigate("/register")}
            className="px-6 py-3 rounded-md bg-slate-900 text-white text-sm font-medium cursor-pointer hover:bg-slate-800 text-center"
          >
            Create an account
          </span>
          <span
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-md border border-slate-300 text-slate-700 text-sm font-medium cursor-pointer hover:bg-slate-50 text-center"
          >
            Log in
          </span>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 md:px-12 pb-20 max-w-5xl mx-auto">
        <div className="border border-slate-200 rounded-lg p-6">
          <div className="text-sm font-medium text-slate-500">Daily returns</div>
          <p className="mt-2 text-sm text-slate-600">
            Track your ROI credited to your wallet every single day, automatically.
          </p>
        </div>
        <div className="border border-slate-200 rounded-lg p-6">
          <div className="text-sm font-medium text-slate-500">Referral network</div>
          <p className="mt-2 text-sm text-slate-600">
            Earn level income from your referral chain, with a full tree view.
          </p>
        </div>
        <div className="border border-slate-200 rounded-lg p-6">
          <div className="text-sm font-medium text-slate-500">Secure wallet</div>
          <p className="mt-2 text-sm text-slate-600">
            Every transaction is protected with JWT authentication and encryption.
          </p>
        </div>
      </section>

      <div className="fixed inset-0 z-50 pointer-events-none">
        <Outlet/>
      </div>
    </div>
  );
};

export default LandingPage;