import { useState } from 'react';
import '../styles/BillingDetails.scss';

interface BillingInfo {
  name: string;
  email: string;
  address: string;
  phone: string;
}

interface BillingDetailsProps {
  billFrom: BillingInfo;
  billTo: BillingInfo;
  onBillFromChange: (details: BillingInfo) => void;
  onBillToChange: (details: BillingInfo) => void;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
}

const BillingDetails = ({ 
  billFrom, 
  billTo, 
  onBillFromChange, 
  onBillToChange 
}: BillingDetailsProps) => {
  const [fromErrors, setFromErrors] = useState<ValidationErrors>({});
  const [toErrors, setToErrors] = useState<ValidationErrors>({});

  const validateField = (name: string, value: string): string | undefined => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    switch (name) {
      case 'name':
        if (value.length > 50) {
          return 'Name must not exceed 50 characters';
        }
        if (value.trim().length === 0) {
          return 'Name is required';
        }
        break;
      case 'email':
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        break;
      case 'address':
        if (value.length > 500) {
          return 'Address must not exceed 500 characters';
        }
        if (value.trim().length === 0) {
          return 'Address is required';
        }
        break;
      case 'phone':
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(value)) {
          return 'Please enter a valid phone number';
        }
        break;
    }
  };

  const handleBillFromChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFromErrors(prev => ({
      ...prev,
      [name]: error
    }));

    onBillFromChange({
      ...billFrom,
      [name]: value
    });
  };

  const handleBillToChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setToErrors(prev => ({
      ...prev,
      [name]: error
    }));

    onBillToChange({
      ...billTo,
      [name]: value
    });
  };

  return (
    <div className="billing-section">
      <div className="billing-box">
        <h2>Bill From</h2>
        <div className="form-group">
          <label htmlFor="fromName">Name</label>
          <input
            type="text"
            id="fromName"
            name="name"
            value={billFrom.name}
            onChange={handleBillFromChange}
            placeholder="Your Name or Company Name"
            maxLength={50}
          />
          {fromErrors.name && <span className="error">{fromErrors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="fromEmail">Email</label>
          <input
            type="email"
            id="fromEmail"
            name="email"
            value={billFrom.email}
            onChange={handleBillFromChange}
            placeholder="your@email.com"
          />
          {fromErrors.email && <span className="error">{fromErrors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="fromPhone">Phone</label>
          <input
            type="tel"
            id="fromPhone"
            name="phone"
            value={billFrom.phone}
            onChange={handleBillFromChange}
            placeholder="+1 234 567 8900"
          />
          {fromErrors.phone && <span className="error">{fromErrors.phone}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="fromAddress">Address</label>
          <textarea
            id="fromAddress"
            name="address"
            value={billFrom.address}
            onChange={handleBillFromChange}
            placeholder="Street Address&#10;City, State, ZIP&#10;Country"
            maxLength={500}
          />
          {fromErrors.address && <span className="error">{fromErrors.address}</span>}
        </div>
      </div>

      <div className="billing-box">
        <h2>Bill To</h2>
        <div className="form-group">
          <label htmlFor="toName">Name</label>
          <input
            type="text"
            id="toName"
            name="name"
            value={billTo.name}
            onChange={handleBillToChange}
            placeholder="Client Name"
            maxLength={50}
          />
          {toErrors.name && <span className="error">{toErrors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="toEmail">Email</label>
          <input
            type="email"
            id="toEmail"
            name="email"
            value={billTo.email}
            onChange={handleBillToChange}
            placeholder="client@email.com"
          />
          {toErrors.email && <span className="error">{toErrors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="toPhone">Phone</label>
          <input
            type="tel"
            id="toPhone"
            name="phone"
            value={billTo.phone}
            onChange={handleBillToChange}
            placeholder="+1 234 567 8900"
          />
          {toErrors.phone && <span className="error">{toErrors.phone}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="toAddress">Address</label>
          <textarea
            id="toAddress"
            name="address"
            value={billTo.address}
            onChange={handleBillToChange}
            placeholder="Street Address&#10;City, State, ZIP&#10;Country"
            maxLength={500}
          />
          {toErrors.address && <span className="error">{toErrors.address}</span>}
        </div>
      </div>
    </div>
  );
};

export default BillingDetails; 