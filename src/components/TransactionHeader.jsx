export function TransactionHeader({ total }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-slate-100 pb-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">Recent activity</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Your transactions</h2>
      </div>
      <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
        {total} total
      </span>
    </div>
  )
}
