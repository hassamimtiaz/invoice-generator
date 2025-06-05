import React, { useState } from 'react';
import type { SummaryProps, InvoiceItem, Currency } from '../types/interfaces';
import { currencies } from '../constants/currencies';
import InvoiceModal from './InvoiceModal';
import '../styles/Summary.scss';

const Summary: React.FC<SummaryProps> = ({
  items,
  billFrom,
  billTo,
  headerInfo,
  summaryState,
  onSummaryStateChange
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateSubtotal = (items: InvoiceItem[]): number => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const calculateDiscount = (subtotal: number): number => {
    return (subtotal * summaryState.discountRate) / 100;
  };

  const calculateTax = (subtotal: number, discount: number): number => {
    return ((subtotal - discount) * summaryState.taxRate) / 100;
  };

  const calculateTotal = (subtotal: number, discount: number, tax: number): number => {
    return subtotal - discount + tax;
  };

  const handleCurrencyChange = (currency: Currency) => {
    onSummaryStateChange({
      ...summaryState,
      selectedCurrency: currency
    });
  };

  const handleStateChange = (field: keyof typeof summaryState, value: number | string) => {
    onSummaryStateChange({
      ...summaryState,
      [field]: value
    });
  };

  const subtotal = calculateSubtotal(items);
  const discount = calculateDiscount(subtotal);
  const tax = calculateTax(subtotal, discount);
  const total = calculateTotal(subtotal, discount, tax);

  return (
    <div className="summary-section">
      <div className="summary-content">
        <div className="rates-section">
          <div className="form-group">
            <label htmlFor="taxRate">Tax Rate (%)</label>
            <input
              type="number"
              id="taxRate"
              value={summaryState.taxRate === 0 ? '' : summaryState.taxRate}
              onChange={(e) => handleStateChange('taxRate', e.target.value === '' ? 0 : parseFloat(e.target.value))}
              min="0"
              max="100"
              step="0.1"
              placeholder="0.0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="discountRate">Discount Rate (%)</label>
            <input
              type="number"
              id="discountRate"
              value={summaryState.discountRate === 0 ? '' : summaryState.discountRate}
              onChange={(e) => handleStateChange('discountRate', e.target.value === '' ? 0 : parseFloat(e.target.value))}
              min="0"
              max="100"
              step="0.1"
              placeholder="0.0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="currency">Currency</label>
            <select
              id="currency"
              value={summaryState.selectedCurrency.code}
              onChange={(e) => {
                const selectedCurrency = currencies.find((c: Currency) => c.code === e.target.value);
                if (selectedCurrency) handleCurrencyChange(selectedCurrency);
              }}
            >
              {currencies.map((currency: Currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} ({currency.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="notes-section">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            value={summaryState.notes}
            onChange={(e) => handleStateChange('notes', e.target.value)}
            placeholder="Any additional notes..."
          />
        </div>

        <div className="totals-section">
          <div className="total-row">
            <span>Subtotal:</span>
            <span>
              {summaryState.selectedCurrency.symbol}
              {subtotal.toFixed(2)}
            </span>
          </div>
          <div className="total-row">
            <span>Discount ({summaryState.discountRate}%):</span>
            <span>
              {summaryState.selectedCurrency.symbol}
              {discount.toFixed(2)}
            </span>
          </div>
          <div className="total-row">
            <span>Tax ({summaryState.taxRate}%):</span>
            <span>
              {summaryState.selectedCurrency.symbol}
              {tax.toFixed(2)}
            </span>
          </div>
          <div className="total-row grand-total">
            <span>Total:</span>
            <span>
              {summaryState.selectedCurrency.symbol}
              {total.toFixed(2)}
            </span>
          </div>
        </div>

        <button className="preview-btn" onClick={() => setIsModalOpen(true)}>
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