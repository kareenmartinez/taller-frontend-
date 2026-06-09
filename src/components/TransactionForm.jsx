import { useForm } from 'react-hook-form'

export function TransactionForm({ onSubmit, isSubmitting, serverError }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: '',
      description: '',
    },
  })

  const submitHandler = async (values) => {
    await onSubmit({
      amount: Number(values.amount),
      description: values.description.trim(),
    })

    reset()
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit(submitHandler)} noValidate>
      <label className="block text-sm font-medium text-slate-700">
        Transaction Amount
        <input
          type="number"
          step="0.01"
          min="0.01"
          placeholder="0.00"
          className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          {...register('amount', {
            required: 'Enter a valid amount greater than zero.',
            validate: (value) => Number(value) > 0 || 'Amount must be greater than zero.',
          })}
        />
        {errors.amount && <span className="mt-1 block text-xs text-rose-600">{errors.amount.message}</span>}
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Transaction Description
        <input
          type="text"
          maxLength="80"
          placeholder="e.g. Team lunch"
          className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          {...register('description', {
            required: 'Please add a description for the transaction.',
            minLength: { value: 2, message: 'Description must be at least 2 characters.' },
          })}
        />
        {errors.description && <span className="mt-1 block text-xs text-rose-600">{errors.description.message}</span>}
      </label>

      {serverError ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{serverError}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Saving…' : 'Save transaction'}
      </button>
    </form>
  )
}
