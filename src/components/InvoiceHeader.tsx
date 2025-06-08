import React from 'react';
import type { InvoiceHeaderProps, HeaderInfo } from '../types/interfaces';
import '../styles/InvoiceHeader.scss';

const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ headerInfo, onHeaderInfoChange }) => {
  const handleChange = (field: keyof HeaderInfo, value: string) => {
    onHeaderInfoChange({
      ...headerInfo,
      [field]: value
    });
  };

  return (
    <div className="invoice-header">
      <div className="header-grid">
        <div className="form-group">
          <label htmlFor="invoiceNumber">Invoice Number</label>
          <input
            type="text"
            id="invoiceNumber"
            value={headerInfo.invoiceNumber}
            onChange={(e) => handleChange('invoiceNumber', e.target.value)}
            placeholder="INV-0001"
          />
        </div>
        <div className="form-group">
          <label htmlFor="invoiceDate">Invoice Date</label>
          <input
            type="date"
            id="invoiceDate"
            value={headerInfo.invoiceDate}
            onChange={(e) => handleChange('invoiceDate', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={headerInfo.dueDate}
            onChange={(e) => handleChange('dueDate', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeader; 