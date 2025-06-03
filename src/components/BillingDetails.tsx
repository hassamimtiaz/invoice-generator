import { useState } from 'react';
import '../styles/BillingDetails.scss';

interface BillingInfo {
  name: string;
  email: string;
  address: string;
}

const BillingDetails = () => {
  const [billFrom, setBillFrom] = useState<BillingInfo>({
    name: '',
    email: '',
    address: ''
  });

  const [billTo, setBillTo] = useState<BillingInfo>({
    name: '',
    email: '',
    address: ''
  });

  const handleBillFromChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBillFrom(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBillToChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBillTo(prev => ({
      ...prev,
      [name]: value
    }));
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
            placeholder="Your Company Name"
          />
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
        </div>
        <div className="form-group">
          <label htmlFor="fromAddress">Address</label>
          <textarea
            id="fromAddress"
            name="address"
            value={billFrom.address}
            onChange={handleBillFromChange}
            placeholder="Street Address&#10;City, State, ZIP&#10;Country"
          />
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
          />
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
        </div>
        <div className="form-group">
          <label htmlFor="toAddress">Address</label>
          <textarea
            id="toAddress"
            name="address"
            value={billTo.address}
            onChange={handleBillToChange}
            placeholder="Street Address&#10;City, State, ZIP&#10;Country"
          />
        </div>
      </div>
    </div>
  );
};

export default BillingDetails; 