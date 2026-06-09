import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TransactionForm } from '../components/TransactionForm'
import { TransactionHeader } from '../components/TransactionHeader'
import { TransactionIntro } from '../components/TransactionIntro'
import { TransactionList } from '../components/TransactionList'
import { createTransaction, fetchTransactions } from '../services/transactionService'

export default function Home() {
  const queryClient = useQueryClient()

  const {
    data: transactions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const mutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  return (
    <main className="min-h-screen bg-transparent px-4 py-8 text-slate-800 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 lg:flex-row">
        <article className="w-full rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/80 backdrop-blur md:p-8 lg:w-[45%]">
          <TransactionIntro />

          <TransactionForm
            onSubmit={(values) => mutation.mutateAsync(values)}
            isSubmitting={mutation.isPending}
            serverError={mutation.error?.response?.data?.error || mutation.error?.message}
          />
        </article>

        <article className="w-full rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/80 backdrop-blur md:p-8 lg:w-[55%]">
          <TransactionHeader total={transactions.length} />
          <TransactionList transactions={transactions} isLoading={isLoading} error={error} />
        </article>
      </section>
    </main>
  )
}
