import { useContext } from 'react'
import { TransactionsContext } from '../contexts/TransactionsContext'

export const useSummary = () => {
  const { transactions } = useContext(TransactionsContext)

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount
        acc.total += transaction.amount
      } else {
        acc.outcome += transaction.amount
        acc.total -= transaction.amount
      }

      return acc
    },
    {
      total: 0,
      income: 0,
      outcome: 0,
    },
  )
  return summary
}
