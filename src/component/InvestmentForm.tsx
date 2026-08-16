import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSackDollar, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from '../types/type';
import { createInvestment } from '../redux/slices/investmentSlice';
import type { IInvestmentData } from "../interfaces/IInvestMentData";
import { FetchDashboardData } from "../redux/slices/authSlice";

type InvestmentProps = {
    onClose: () => void;
};

const PLANS = [
    { id: 'starter', name: 'Starter 15', roi: 0.8, days: 15, min: 1000, max: 25000 },
    { id: 'growth', name: 'Growth 30', roi: 1.0, days: 30, min: 5000, max: 60000 },
    { id: 'prime', name: 'Prime 60', roi: 1.2, days: 60, min: 10000, max: 100000 },
];

const formatCurrency = (value: number) => `₹${value.toLocaleString('en-IN')}`;

const getEndDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
};

const InvestmentForm = ({ onClose }: InvestmentProps) => {
    const dispatch = useAppDispatch();
    const balance = useAppSelector(state => state.auth.dashboard?.walletBalance) ?? 0;

    const [selectedPlan, setSelectedPlan] = useState(PLANS[1]);
    const [amount, setAmount] = useState(selectedPlan.min);
    const [submitted, setSubmitted] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const { handleSubmit, setValue, register } = useForm<IInvestmentData>();

    const handlePlanSelect = (plan: typeof PLANS[number]) => {
        setSelectedPlan(plan);
        setAmount(plan.min);
        setValue('amount', plan.min);
        setValue('dailyROIPercent', plan.roi);
        setValue('endDate', getEndDate(plan.days));
        setValue('planDetails', `${plan.name} · ${plan.roi}% daily · ${plan.days} days`);
    };

    const exceedsBalance = amount > balance;
    const dailyReturn = Math.round((amount * selectedPlan.roi) / 100);
    const totalReturn = amount + dailyReturn * selectedPlan.days;

    const submitForm = async (data: IInvestmentData) => {
        setServerError(null);
        setSubmitting(true);
        try {
            await dispatch(createInvestment({ ...data, amount })).unwrap();
            await dispatch(FetchDashboardData()).unwrap();   // ← re-sync wallet balance after success
            setSubmitted(true);
        } catch (error) {
            setServerError(typeof error === 'string' ? error : 'Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div onClick={onClose} className="pointer-events-auto fixed inset-0 flex items-center justify-center backdrop-blur-sm px-4 py-8 z-50">
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg bg-white rounded-lg shadow-xl relative max-h-[90vh] overflow-y-auto">

                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg">
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>

                {!submitted ? (
                    <div className="p-6 sm:p-8">
                        <div className="mb-6">
                            <h1 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                                <FontAwesomeIcon icon={faSackDollar} className="text-slate-700" />
                                New investment
                            </h1>
                            <p className="mt-1 text-sm text-slate-500">
                                Wallet balance <span className="font-medium text-slate-700">{formatCurrency(balance)}</span>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-6">

                            <div>
                                <div className="text-sm font-medium text-slate-700 mb-2">Choose a plan</div>
                                <div className="grid grid-cols-3 gap-2">
                                    {PLANS.map(plan => (
                                        <div
                                            key={plan.id}
                                            onClick={() => handlePlanSelect(plan)}
                                            className={`cursor-pointer rounded-md p-3 border ${selectedPlan.id === plan.id ? 'border-2 border-slate-900' : 'border-slate-200 hover:border-slate-300'}`}
                                        >
                                            <div className="text-sm font-medium text-slate-900">{plan.name}</div>
                                            <div className="text-xs text-slate-500 mt-1">{plan.roi}% daily</div>
                                            <div className="text-xs text-slate-500">{plan.days} days</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label htmlFor="amount" className="text-sm font-medium text-slate-700">Amount to invest</label>
                                    <span className="font-mono text-sm text-slate-900">{formatCurrency(amount)}</span>
                                </div>
                                <input
                                    type="range"
                                    id="amount"
                                    min={selectedPlan.min}
                                    max={selectedPlan.max}
                                    step={500}
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-xs text-slate-400 mt-1">
                                    <span>{formatCurrency(selectedPlan.min)}</span>
                                    <span>{formatCurrency(selectedPlan.max)}</span>
                                </div>
                                {exceedsBalance && (
                                    <p className="mt-2 text-xs text-red-500">This exceeds your wallet balance.</p>
                                )}
                            </div>

                            <div className="bg-slate-50 border border-slate-200 rounded-md p-4">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-500">Daily ROI</span>
                                    <span className="font-mono text-slate-900">{formatCurrency(dailyReturn)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Total return over {selectedPlan.days} days</span>
                                    <span className="font-mono text-emerald-600">{formatCurrency(totalReturn)}</span>
                                </div>
                            </div>

                            {serverError && (
                                <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-md p-3">{serverError}</p>
                            )}

                            <button
                                type="submit"
                                disabled={submitting || exceedsBalance || amount <= 0}
                                className="w-full bg-slate-900 text-white text-sm font-medium rounded-md py-2.5 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? "Processing..." : `Invest ${formatCurrency(amount)}`}
                            </button>

                            <input type="hidden" {...register('dailyROIPercent')} />
                            <input type="hidden" {...register('endDate')} />
                            <input type="hidden" {...register('planDetails')} />
                        </form>
                    </div>
                ) : (
                    <div className="p-6 sm:p-8 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                            <FontAwesomeIcon icon={faCheck} className="text-emerald-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-900">Investment created</h2>
                        <p className="text-sm text-slate-500 mt-1">
                            {formatCurrency(amount)} invested in {selectedPlan.name}
                        </p>
                        <div className="w-full mt-6 bg-slate-50 border border-slate-200 rounded-md p-4 text-left text-sm">
                            <div className="flex justify-between py-1">
                                <span className="text-slate-500">Plan</span>
                                <span className="text-slate-900">{selectedPlan.name}</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-slate-500">Daily ROI</span>
                                <span className="text-slate-900">{selectedPlan.roi}%</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-slate-500">Ends on</span>
                                <span className="text-slate-900">{getEndDate(selectedPlan.days)}</span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-full mt-6 bg-slate-900 text-white text-sm font-medium rounded-md py-2.5 hover:bg-slate-800"
                        >
                            Done
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InvestmentForm;