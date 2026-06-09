export function TransactionList({ transactions, isLoading, error }) {
  if (isLoading && transactions.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
        <p className="text-lg font-medium text-slate-700">Loading transactions…</p>
        <p className="mt-1 text-sm">Fetching your latest entries.</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
        Unable to load transactions at the moment. Please try again in a few seconds.
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
        <p className="text-lg font-medium text-slate-700">No transactions yet.</p>
        <p className="mt-1 text-sm">Use the form to add your first transaction.</p>
      </div>
    )
  }

  return (
    <ul className="mt-6 space-y-3">
      {transactions.map((transaction) => (
        <li
          key={transaction.id}
          className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
        >
          <div>
            <p className="text-base font-semibold text-slate-900">{transaction.description}</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
            ${Number(transaction.amount).toFixed(2)}
          </span>
        </li>
      ))}
    </ul>
  )
}
