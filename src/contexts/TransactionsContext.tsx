import { api } from '../lib/axios'
import { createContext, ReactNode, useEffect, useState } from 'react'

interface TransactionsProviderType {
  children: ReactNode
}

interface ITransaction {
  id: number
  amount: number
  category: string
  createdAt: string
  description: string
  type: 'income' | 'outcome'
}

interface ICreateTransaction {
  amount: number
  category: string
  description: string
  type: 'income' | 'outcome'
}

interface ITransactionsContextType {
  transactions: ITransaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransactions: (data: ICreateTransaction) => Promise<void>
}

export const TransactionsContext = createContext({} as ITransactionsContextType)

export const TransacionsProvider = ({ children }: TransactionsProviderType) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(response.data)
  }

  async function createTransactions(data: ICreateTransaction) {
    const { description, amount, category, type } = data
    const response = await api.post('/transactions', {
      description,
      amount,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransactions }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
