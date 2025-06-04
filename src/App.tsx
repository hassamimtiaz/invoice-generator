import { useState, useEffect } from 'react'
import InvoiceHeader from './components/InvoiceHeader'
import BillingDetails from './components/BillingDetails'
import Items from './components/Items'
import Summary from './components/Summary'
import type { InvoiceItem } from './types'
import './App.scss'

interface BillingInfo {
  name: string;
  email: string;
  address: string;
  phone: string;
}

interface InvoiceHeaderInfo {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
}

interface InvoiceData {
  items: InvoiceItem[];
  billFrom: BillingInfo;
  billTo: BillingInfo;
  headerInfo: InvoiceHeaderInfo;
}

function App() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(() => {
    try {
      const savedData = localStorage.getItem('invoiceData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        return {
          items: Array.isArray(parsedData.items) ? parsedData.items : [],
          billFrom: {
            name: parsedData.billFrom?.name || '',
            email: parsedData.billFrom?.email || '',
            address: parsedData.billFrom?.address || '',
            phone: parsedData.billFrom?.phone || ''
          },
          billTo: {
            name: parsedData.billTo?.name || '',
            email: parsedData.billTo?.email || '',
            address: parsedData.billTo?.address || '',
            phone: parsedData.billTo?.phone || ''
          },
          headerInfo: {
            invoiceNumber: parsedData.headerInfo?.invoiceNumber || 'INV-001',
            invoiceDate: parsedData.headerInfo?.invoiceDate || new Date().toISOString().split('T')[0],
            dueDate: parsedData.headerInfo?.dueDate || new Date().toISOString().split('T')[0]
          }
        };
      }
    } catch (error) {
      console.error('Error loading invoice data:', error);
    }
    return {
      items: [],
      billFrom: {
        name: '',
        email: '',
        address: '',
        phone: ''
      },
      billTo: {
        name: '',
        email: '',
        address: '',
        phone: ''
      },
      headerInfo: {
        invoiceNumber: 'INV-001',
        invoiceDate: new Date().toISOString().split('T')[0],
        dueDate: new Date().toISOString().split('T')[0]
      }
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
    } catch (error) {
      console.error('Error saving invoice data:', error);
    }
  }, [invoiceData]);

  const handleItemsChange = (items: InvoiceItem[]) => {
    setInvoiceData(prev => ({
      ...prev,
      items
    }));
  };

  const handleBillFromChange = (billFrom: BillingInfo) => {
    setInvoiceData(prev => ({
      ...prev,
      billFrom
    }));
  };

  const handleBillToChange = (billTo: BillingInfo) => {
    setInvoiceData(prev => ({
      ...prev,
      billTo
    }));
  };

  const handleHeaderInfoChange = (headerInfo: InvoiceHeaderInfo) => {
    setInvoiceData(prev => ({
      ...prev,
      headerInfo
    }));
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Invoice Generator</h1>
        <InvoiceHeader 
          headerInfo={invoiceData.headerInfo} 
          onHeaderInfoChange={handleHeaderInfoChange} 
        />
        <BillingDetails 
          billFrom={invoiceData.billFrom}
          billTo={invoiceData.billTo}
          onBillFromChange={handleBillFromChange}
          onBillToChange={handleBillToChange}
        />
        <Items 
          items={invoiceData.items} 
          onItemsChange={handleItemsChange} 
        />
        <Summary 
          items={invoiceData.items} 
          billFrom={invoiceData.billFrom}
          billTo={invoiceData.billTo}
          headerInfo={invoiceData.headerInfo}
        />
      </div>
    </div>
  )
}

export default App
