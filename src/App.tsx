import InvoiceHeader from './components/InvoiceHeader';
import BillingDetails from './components/BillingDetails';
import Items from './components/Items';
import Summary from './components/Summary';
import ErrorBoundary from './components/ErrorBoundary';
import type { InvoiceItem, BillingInfo, HeaderInfo, InvoiceData, SummaryState } from './types/interfaces';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getInitialState } from './utils/initialState';
import './App.scss';

function App() {
  const {
    value: invoiceData,
    setValue: setInvoiceData,
    isLoading,
    error
  } = useLocalStorage<InvoiceData>('invoiceData', () => getInitialState(null));

  const handleStateUpdate = <K extends keyof InvoiceData>(
    key: K,
    value: InvoiceData[K]
  ) => {
    setInvoiceData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="app">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="container">
          <div className="error">
            <h2>Error loading invoice data</h2>
            <p>{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Invoice Generator</h1>
        <ErrorBoundary>
          <InvoiceHeader 
            headerInfo={invoiceData.headerInfo} 
            onHeaderInfoChange={(info: HeaderInfo) => handleStateUpdate('headerInfo', info)} 
          />
        </ErrorBoundary>
        <ErrorBoundary>
          <BillingDetails 
            billFrom={invoiceData.billFrom}
            billTo={invoiceData.billTo}
            onBillFromChange={(info: BillingInfo) => handleStateUpdate('billFrom', info)}
            onBillToChange={(info: BillingInfo) => handleStateUpdate('billTo', info)}
          />
        </ErrorBoundary>
        <ErrorBoundary>
          <Items 
            items={invoiceData.items} 
            onItemsChange={(items: InvoiceItem[]) => handleStateUpdate('items', items)}
            currency={invoiceData.summaryState.selectedCurrency}
          />
        </ErrorBoundary>
        <ErrorBoundary>
          <Summary 
            items={invoiceData.items} 
            billFrom={invoiceData.billFrom}
            billTo={invoiceData.billTo}
            headerInfo={invoiceData.headerInfo}
            summaryState={invoiceData.summaryState}
            onSummaryStateChange={(state: SummaryState) => handleStateUpdate('summaryState', state)}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
