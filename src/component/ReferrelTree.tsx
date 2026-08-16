import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../types/type';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesUp, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { fetchWholeReferrelTree } from "../redux/slices/referrelTreeSlice";

type InvestmentProps = {
  onClose: () => void;
};

const ReferrelTree = ({ onClose }: InvestmentProps) => {
  const dispatch = useAppDispatch();
  const { fullReferrelTree: wholeTree, loading, error } = useAppSelector(state => state.referreltree);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchWholeReferrelTree()).unwrap();
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div onClick={(e) => { e.stopPropagation() }} className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl bg-linear-to-br from-zinc-900 to-black border border-zinc-800 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg">
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>

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
            <h1 className="text-xl font-semibold text-white mb-4 pr-8">
              {wholeTree?.fullName} <span className="text-zinc-400 font-normal">({wholeTree?.userCode})</span>
            </h1>
            <div className="flex flex-col gap-2">
              {wholeTree?.referralTree.map((level) => (
                <div key={level.userCode} className="flex items-center gap-3 rounded-xl bg-zinc-800/50 border border-zinc-800 px-4 py-3 text-sm">
                  <FontAwesomeIcon icon={faAnglesUp} className="text-zinc-500" />
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-700 text-zinc-300">
                    Lv {level.level}
                  </span>
                  <span className="text-white">
                    {level.fullName} <span className="text-zinc-400">({level.userCode})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferrelTree;