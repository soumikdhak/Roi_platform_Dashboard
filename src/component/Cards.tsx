import type { ReactNode } from "react";

export interface IProps {
  heading: string,
  value?: number,
  icon: ReactNode
}

const Cards = ({ heading, value, icon }: IProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-zinc-900 to-black border border-zinc-800 p-6 min-w-55 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:border-zinc-700 hover:-translate-y-0.5 transition-all duration-300">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

      <div className="relative flex items-center justify-between mb-4">
        <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-800/80 text-white text-lg">
          {icon}
        </span>
      </div>

      <h1 className="relative text-xs uppercase tracking-wider text-zinc-400 font-medium mb-1">
        {heading}
      </h1>

      <h3 className="relative text-3xl font-semibold text-white tracking-tight">
        ₹{value?.toLocaleString('en-IN') ?? 0}
      </h3>
    </div>
  )
}

export default Cards