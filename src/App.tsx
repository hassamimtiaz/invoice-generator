import { useState, useEffect } from 'react'
import InvoiceHeader from './components/InvoiceHeader'
import BillingDetails from './components/BillingDetails'
import Items from './components/Items'
import Summary from './components/Summary'
import type { InvoiceItem } from './types'
import './App.scss'

function App() {
  const [items, setItems] = useState<InvoiceItem[]>(() => {
    const savedItems = localStorage.getItem('invoiceItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('invoiceItems', JSON.stringify(items));
  }, [items]);

  return (
    <div className="app">
      <div className="container">
        <h1>Invoice Generator</h1>
        <InvoiceHeader />
        <BillingDetails />
        <Items items={items} onItemsChange={setItems} />
        <Summary items={items} />
      </div>
    </div>
  )
}

export default App
