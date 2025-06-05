import React, { useState } from 'react';
import type { BillingDetailsProps, BillingInfo } from '../types/interfaces';
import '../styles/BillingDetails.scss';

interface ValidationErrors {
  [key: string]: string;
}

const BillingDetails: React.FC<BillingDetailsProps> = ({
  billFrom,
  billTo,
  onBillFromChange,
  onBillToChange
}) => {
  const [fromErrors, setFromErrors] = useState<ValidationErrors>({});
  const [toErrors, setToErrors] = useState<ValidationErrors>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
  };

  const handleBillFromChange = (field: keyof BillingInfo, value: string) => {
    let errors = { ...fromErrors };
    
    switch (field) {
      case 'email':
        if (value && !validateEmail(value)) {
          errors.email = 'Please enter a valid email address';
        } else {
          delete errors.email;
        }
        break;
      case 'phone':
        if (value && !validatePhone(value)) {
          errors.phone = 'Please enter a valid phone number';
        } else {
          delete errors.phone;
        }
        break;
      case 'name':
        if (!value.trim()) {
          errors.name = 'Name is required';
        } else {
          delete errors.name;
        }
        break;
    }

    setFromErrors(errors);
    onBillFromChange({
      ...billFrom,
      [field]: value
    });
  };

  const handleBillToChange = (field: keyof BillingInfo, value: string) => {
    let errors = { ...toErrors };
    
    switch (field) {
      case 'email':
        if (value && !validateEmail(value)) {
          errors.email = 'Please enter a valid email address';
        } else {
          delete errors.email;
        }
        break;
      case 'phone':
        if (value && !validatePhone(value)) {
          errors.phone = 'Please enter a valid phone number';
        } else {
          delete errors.phone;
        }
        break;
      case 'name':
        if (!value.trim()) {
          errors.name = 'Name is required';
        } else {
          delete errors.name;
        }
        break;
    }

    setToErrors(errors);
    onBillToChange({
      ...billTo,
      [field]: value
    });
  };

  return (
    <div className="billing-details-form">
      <div className="billing-section">
        <h3>Bill From</h3>
        <div className="form-group">
          <label htmlFor="fromName">Name *</label>
          <input
            type="text"
            id="fromName"
            value={billFrom.name}
            onChange={(e) => handleBillFromChange('name', e.target.value)}
            placeholder="Your Name"
            className={fromErrors.name ? 'has-error' : ''}
          />
          {fromErrors.name && <span className="error">{fromErrors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="fromEmail">Email</label>
          <input
            type="email"
            id="fromEmail"
            value={billFrom.email}
            onChange={(e) => handleBillFromChange('email', e.target.value)}
            placeholder="your@email.com"
            className={fromErrors.email ? 'has-error' : ''}
          />
          {fromErrors.email && <span className="error">{fromErrors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="fromAddress">Address</label>
          <textarea
            id="fromAddress"
            value={billFrom.address}
            onChange={(e) => handleBillFromChange('address', e.target.value)}
            placeholder="Your Address"
            rows={3}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fromPhone">Phone</label>
          <input
            type="tel"
            id="fromPhone"
            value={billFrom.phone}
            onChange={(e) => handleBillFromChange('phone', e.target.value)}
            placeholder="Your Phone (e.g., +1 234 567 8900)"
            className={fromErrors.phone ? 'has-error' : ''}
          />
          {fromErrors.phone && <span className="error">{fromErrors.phone}</span>}
        </div>
      </div>

      <div className="billing-section">
        <h3>Bill To</h3>
        <div className="form-group">
          <label htmlFor="toName">Name *</label>
          <input
            type="text"
            id="toName"
            value={billTo.name}
            onChange={(e) => handleBillToChange('name', e.target.value)}
            placeholder="Client Name"
            className={toErrors.name ? 'has-error' : ''}
          />
          {toErrors.name && <span className="error">{toErrors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="toEmail">Email</label>
          <input
            type="email"
            id="toEmail"
            value={billTo.email}
            onChange={(e) => handleBillToChange('email', e.target.value)}
            placeholder="client@email.com"
            className={toErrors.email ? 'has-error' : ''}
          />
          {toErrors.email && <span className="error">{toErrors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="toAddress">Address</label>
          <textarea
            id="toAddress"
            value={billTo.address}
            onChange={(e) => handleBillToChange('address', e.target.value)}
            placeholder="Client Address"
            rows={3}
          />
        </div>
        <div className="form-group">
          <label htmlFor="toPhone">Phone</label>
          <input
            type="tel"
            id="toPhone"
            value={billTo.phone}
            onChange={(e) => handleBillToChange('phone', e.target.value)}
            placeholder="Client Phone (e.g., +1 234 567 8900)"
            className={toErrors.phone ? 'has-error' : ''}
          />
          {toErrors.phone && <span className="error">{toErrors.phone}</span>}
        </div>
      </div>
    </div>
  );
};

export default BillingDetails; 