import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import type { InvoiceItem } from '../types';
import InvoicePDF from './InvoicePDF';
import '../styles/InvoiceModal.scss';

const DocumentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    />
  </svg>
);

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  currency: {
    code: string;
    symbol: string;
  };
  notes: string;
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

const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  tax,
  total,
  currency,
  notes,
  billFrom,
  billTo,
  headerInfo
}) => {
  if (!isOpen) return null;

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-title">
            <DocumentIcon />
            <span>Invoice Preview</span>
          </div>
          <button className="close-button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        
        <div className="invoice-preview">
          <div className="invoice-header">
            <div className="header-left">
              <h2>INVOICE</h2>
              <p className="invoice-number">#{headerInfo.invoiceNumber}</p>
            </div>
            <div className="header-right">
              <div className="date-row">
                <span>Invoice Date:</span>
                <span>{formatDate(headerInfo.invoiceDate)}</span>
              </div>
              <div className="date-row">
                <span>Due Date:</span>
                <span>{formatDate(headerInfo.dueDate)}</span>
              </div>
            </div>
          </div>

          <div className="billing-section">
            <div className="bill-from">
              <h3>Bill From:</h3>
              <div className="billing-details">
                <p>{billFrom.name}</p>
                <p>{billFrom.email}</p>
                <p>{billFrom.phone}</p>
                <p>{billFrom.address}</p>
              </div>
            </div>

            <div className="bill-to">
              <h3>Bill To:</h3>
              <div className="billing-details">
                <p>{billTo.name}</p>
                <p>{billTo.email}</p>
                <p>{billTo.phone}</p>
                <p>{billTo.address}</p>
              </div>
            </div>
          </div>

          <div className="items-section">
            <table>
              <thead>
                <tr>
                  <th>Item No.</th>
                  <th>Item Name</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(item.price)}</td>
                    <td>{formatCurrency(item.quantity * item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="summary-section">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Discount:</span>
              <span>-{formatCurrency(discount)}</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          {notes && (
            <div className="notes-section">
              <h3>Notes:</h3>
              <p>{notes}</p>
            </div>
          )}

          <div className="actions-section">
            <PDFDownloadLink
              document={
                <InvoicePDF
                  items={items}
                  subtotal={subtotal}
                  discount={discount}
                  tax={tax}
                  total={total}
                  currency={currency}
                  notes={notes}
                  billFrom={billFrom}
                  billTo={billTo}
                  headerInfo={headerInfo}
                />
              }
              fileName={`invoice-${headerInfo.invoiceNumber}.pdf`}
              className="download-pdf-button"
            >
              {({ blob, url, loading, error }) => (
                <>
                  <DownloadIcon />
                  {loading ? 'Generating PDF...' : 'Download Invoice PDF'}
                </>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal; 