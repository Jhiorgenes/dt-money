import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import * as zod from 'zod'
import { useContext } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { TransactionsContext } from '../../contexts/TransactionsContext'

const createNewTransactionSchema = zod.object({
  amount: zod.number(),
  category: zod.string(),
  description: zod.string(),
  type: zod.enum(['income', 'outcome']),
})

type createNewTransactionsInputs = zod.infer<typeof createNewTransactionSchema>

interface NewTransactionModalProps {
  onCloseModalAfterSubmit: () => void
}

export const NewTransactionModal = ({
  onCloseModalAfterSubmit,
}: NewTransactionModalProps) => {
  const {
    reset,
    control,
    register,
    handleSubmit,

    formState: { isSubmitting },
  } = useForm<createNewTransactionsInputs>({
    resolver: zodResolver(createNewTransactionSchema),
    defaultValues: {
      type: 'income',
    },
  })
  const { createTransactions } = useContext(TransactionsContext)

  async function handleCreateNewTransaction(data: createNewTransactionsInputs) {
    const { description, amount, category, type } = data

    await createTransactions({
      description,
      amount,
      category,
      type,
    })

    reset()
    onCloseModalAfterSubmit()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            {...register('description')}
            type="text"
            placeholder="Descrição"
            required
          />
          <input
            {...register('amount', { valueAsNumber: true })}
            type="number"
            placeholder="Preço"
            required
          />
          <input
            {...register('category')}
            type="text"
            placeholder="Categoria"
            required
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <TransactionType
                onValueChange={field.onChange}
                value={field.value}
              >
                <TransactionTypeButton variant="income" value="income">
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>
                <TransactionTypeButton variant="outcome" value="outcome">
                  <ArrowCircleDown size={24} />
                  Saida
                </TransactionTypeButton>
              </TransactionType>
            )}
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
