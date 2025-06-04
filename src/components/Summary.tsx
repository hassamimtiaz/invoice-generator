import { useState, useEffect } from 'react';
import type { InvoiceItem } from '../types';
import InvoiceModal from './InvoiceModal';
import '../styles/Summary.scss';

interface SummaryProps {
  items: InvoiceItem[];
  billFrom: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
  billTo: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
  headerInfo: {
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
  };
}

type Currency = {
  code: string;
  symbol: string;
};

const currencies: Currency[] = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' },
  { code: 'PKR', symbol: 'Rs' }
];

interface SummaryState {
  taxRate: number;
  discountRate: number;
  selectedCurrency: Currency;
  notes: string;
}

const Summary = ({ items, billFrom, billTo, headerInfo }: SummaryProps) => {
  const [summaryState, setSummaryState] = useState<SummaryState>(() => {
    try {
      const savedState = localStorage.getItem('summaryState');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        return {
          taxRate: parsedState.taxRate || 0,
          discountRate: parsedState.discountRate || 0,
          selectedCurrency: parsedState.selectedCurrency || currencies[0],
          notes: parsedState.notes || ''
        };
      }
    } catch (error) {
      console.error('Error loading summary state:', error);
    }
    return {
      taxRate: 0,
      discountRate: 0,
      selectedCurrency: currencies[0],
      notes: ''
    };
  });

  const [subtotal, setSubtotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('summaryState', JSON.stringify(summaryState));
  }, [summaryState]);

  useEffect(() => {
    const calculatedSubtotal = items.reduce((sum, item) => {
      return sum + (item.quantity * item.price);
    }, 0);
    
    const calculatedDiscount = (calculatedSubtotal * summaryState.discountRate) / 100;
    const subtotalAfterDiscount = calculatedSubtotal - calculatedDiscount;
    const calculatedTax = (subtotalAfterDiscount * summaryState.taxRate) / 100;
    const calculatedTotal = subtotalAfterDiscount + calculatedTax;

    setSubtotal(calculatedSubtotal);
    setDiscount(calculatedDiscount);
    setTax(calculatedTax);
    setTotal(calculatedTotal);
  }, [items, summaryState.taxRate, summaryState.discountRate]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: summaryState.selectedCurrency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatRate = (value: number): string => {
    return value === 0 ? '' : value.toString();
  };

  const handleStateChange = (key: keyof SummaryState, value: any) => {
    setSummaryState(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="summary-section">
      <h2>Summary</h2>
      <div className="calculations">
        <div className="row">
          <span className="label">Subtotal</span>
          <span className="value">{formatCurrency(subtotal)}</span>
        </div>
        <div className="row">
          <span className="label">Discount</span>
          <span className="value">-{formatCurrency(discount)}</span>
        </div>
        <div className="row">
          <span className="label">Tax</span>
          <span className="value">{formatCurrency(tax)}</span>
        </div>
        <div className="row total">
          <span className="label">Total</span>
          <span className="value">{formatCurrency(total)}</span>
        </div>
      </div>
      <div className="rate-settings">
        <div className="form-group">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            value={summaryState.selectedCurrency.code}
            onChange={(e) => {
              const currency = currencies.find(c => c.code === e.target.value);
              if (currency) handleStateChange('selectedCurrency', currency);
            }}
          >
            {currencies.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.code} ({currency.symbol})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="discountRate">Discount Rate (%)</label>
          <input
            type="number"
            id="discountRate"
            value={formatRate(summaryState.discountRate)}
            onChange={(e) => handleStateChange('discountRate', parseFloat(e.target.value) || 0)}
            min="0"
            max="100"
            step="0.1"
            placeholder="0.0"
          />
        </div>
        <div className="form-group">
          <label htmlFor="taxRate">Tax Rate (%)</label>
          <input
            type="number"
            id="taxRate"
            value={formatRate(summaryState.taxRate)}
            onChange={(e) => handleStateChange('taxRate', parseFloat(e.target.value) || 0)}
            min="0"
            max="100"
            step="0.1"
            placeholder="0.0"
          />
        </div>
      </div>
      <div className="notes-section">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          value={summaryState.notes}
          onChange={(e) => handleStateChange('notes', e.target.value)}
          placeholder="Add any additional notes or payment terms..."
          rows={4}
        />
      </div>
      <div className="preview-section">
        <button className="preview-button" onClick={() => setIsModalOpen(true)}>
          Preview Invoice
        </button>
      </div>

      <InvoiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        items={items}
        subtotal={subtotal}
        discount={discount}
        tax={tax}
        total={total}
        currency={summaryState.selectedCurrency}
        notes={summaryState.notes}
        billFrom={billFrom}
        billTo={billTo}
        headerInfo={headerInfo}
      />
    </div>
  );
};

export default Summary; 