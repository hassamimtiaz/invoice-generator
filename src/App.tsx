import InvoiceHeader from './components/InvoiceHeader'
import BillingDetails from './components/BillingDetails'
import Items from './components/Items'
import './App.scss'

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1>Invoice Generator</h1>
        <InvoiceHeader />
        <BillingDetails />
        <Items />
      </div>
    </div>
  )
}

export default App
