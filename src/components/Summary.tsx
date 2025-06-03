import { useState, useEffect } from 'react';
import type { InvoiceItem } from '../types';
import '../styles/Summary.scss';

interface SummaryProps {
  items: InvoiceItem[];
}

const Summary = ({ items }: SummaryProps) => {
  const [taxRate, setTaxRate] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const calculatedSubtotal = items.reduce((sum, item) => {
      return sum + (item.quantity * item.price);
    }, 0);
    
    const calculatedTax = (calculatedSubtotal * taxRate) / 100;
    const calculatedTotal = calculatedSubtotal + calculatedTax;

    setSubtotal(calculatedSubtotal);
    setTax(calculatedTax);
    setTotal(calculatedTotal);
  }, [items, taxRate]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
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
          <span className="label">Tax</span>
          <span className="value">{formatCurrency(tax)}</span>
        </div>
        <div className="row total">
          <span className="label">Total</span>
          <span className="value">{formatCurrency(total)}</span>
        </div>
      </div>
      <div className="tax-settings">
        <div className="form-group">
          <label htmlFor="taxRate">Tax Rate (%)</label>
          <input
            type="number"
            id="taxRate"
            value={taxRate}
            onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
            min="0"
            max="100"
            step="0.1"
          />
        </div>
      </div>
    </div>
  );
};

export default Summary; 