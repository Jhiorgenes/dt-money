import { GlobalStyles } from './styles/global'
import { ThemeProvider } from 'styled-components'
import { Transactions } from './pages/Transactions'
import { defaultTheme } from './styles/themes/default'
import { TransacionsProvider } from './contexts/TransactionsContext'

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TransacionsProvider>
        <Transactions />
      </TransacionsProvider>
      <GlobalStyles />
    </ThemeProvider>
  )
}
