import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import { useState } from 'react'
import logo from '../../assets/dt-money.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from '../NewTransactionModal'

export const Header = () => {
  const [open, setOpen] = useState(false)

  function closeModalAfterSubmit() {
    setOpen(false)
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logo} alt="" />
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova Transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal
            onCloseModalAfterSubmit={closeModalAfterSubmit}
          />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
