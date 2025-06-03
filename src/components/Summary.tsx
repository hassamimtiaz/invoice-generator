import { useState, useEffect } from 'react';
import type { InvoiceItem } from '../types';
import '../styles/Summary.scss';

interface SummaryProps {
  items: InvoiceItem[];
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

const Summary = ({ items }: SummaryProps) => {
  const [taxRate, setTaxRate] = useState<number>(0);
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);

  useEffect(() => {
    const calculatedSubtotal = items.reduce((sum, item) => {
      return sum + (item.quantity * item.price);
    }, 0);
    
    const calculatedDiscount = (calculatedSubtotal * discountRate) / 100;
    const subtotalAfterDiscount = calculatedSubtotal - calculatedDiscount;
    const calculatedTax = (subtotalAfterDiscount * taxRate) / 100;
    const calculatedTotal = subtotalAfterDiscount + calculatedTax;

    setSubtotal(calculatedSubtotal);
    setDiscount(calculatedDiscount);
    setTax(calculatedTax);
    setTotal(calculatedTotal);
  }, [items, taxRate, discountRate]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCurrency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatRate = (value: number): string => {
    return value === 0 ? '' : value.toString();
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
            value={selectedCurrency.code}
            onChange={(e) => {
              const currency = currencies.find(c => c.code === e.target.value);
              if (currency) setSelectedCurrency(currency);
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
            value={formatRate(discountRate)}
            onChange={(e) => setDiscountRate(parseFloat(e.target.value) || 0)}
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
            value={formatRate(taxRate)}
            onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
            min="0"
            max="100"
            step="0.1"
            placeholder="0.0"
          />
        </div>
      </div>
    </div>
  );
};

export default Summary; 