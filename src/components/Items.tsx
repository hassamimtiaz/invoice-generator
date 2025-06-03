import { useState } from 'react';
import type { InvoiceItem } from '../types';
import '../styles/Items.scss';

// Add TrashIcon component at the top level
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

interface ItemErrors {
  name?: string;
  description?: string;
  quantity?: string;
  price?: string;
}

interface ItemsProps {
  items: InvoiceItem[];
  onItemsChange: (items: InvoiceItem[]) => void;
}

const Items = ({ items, onItemsChange }: ItemsProps) => {
  const [errors, setErrors] = useState<{ [key: string]: ItemErrors }>({});

  const validateItem = (item: InvoiceItem): ItemErrors => {
    const errors: ItemErrors = {};

    if (!item.name.trim()) {
      errors.name = 'Name is required';
    }
    if (item.name.length > 100) {
      errors.name = 'Name must not exceed 100 characters';
    }
    if (item.description.length > 500) {
      errors.description = 'Description must not exceed 500 characters';
    }
    if (item.quantity <= 0) {
      errors.quantity = 'Quantity must be greater than 0';
    }
    if (item.price < 0) {
      errors.price = 'Price cannot be negative';
    }

    return errors;
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      quantity: 1,
      price: 0
    };
    onItemsChange([...items, newItem]);
  };

  const formatNumber = (value: number): string => {
    return value === 0 ? '' : value.toString();
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        const itemErrors = validateItem(updatedItem);
        setErrors(prev => ({
          ...prev,
          [id]: itemErrors
        }));
        return updatedItem;
      }
      return item;
    });
    onItemsChange(updatedItems);
  };

  const deleteItem = (id: string) => {
    onItemsChange(items.filter(item => item.id !== id));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  const hasErrors = Object.keys(errors).some(key => Object.keys(errors[key]).length > 0);

  const renderErrorSummary = () => {
    if (!hasErrors) return null;

    const allErrors: { itemId: string; field: string; message: string; index: number }[] = [];
    Object.entries(errors).forEach(([itemId, itemErrors]) => {
      const itemIndex = items.findIndex(i => i.id === itemId);
      Object.entries(itemErrors).forEach(([field, message]) => {
        const item = items.find(i => i.id === itemId);
        if (item) {
          allErrors.push({
            itemId,
            field,
            message: `Item #${itemIndex + 1} "${item.name || 'Unnamed item'}": ${message}`,
            index: itemIndex
          });
        }
      });
    });

    // Sort errors by item index
    allErrors.sort((a, b) => a.index - b.index);

    return (
      <div className="errors-summary">
        <h3>Please fix the following errors:</h3>
        <ul>
          {allErrors.map((error, index) => (
            <li key={`${error.itemId}-${error.field}-${index}`}>{error.message}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="items-section">
      <h2>
        Items
        <button onClick={addItem}>Add Item</button>
      </h2>
      
      {items.length === 0 ? (
        <div className="empty-state">
          <span>No items added yet. Click "Add Item" to get started.</span>
        </div>
      ) : (
        <>
          <div className="items-table">
            <div className="items-header">
              <div>Item No.</div>
              <div>Item Name</div>
              <div>Description</div>
              <div>Quantity</div>
              <div>Price</div>
              <div></div>
            </div>
            <div className="items-list">
              {items.map((item, index) => (
                <div key={item.id} className="item">
                  <div className="form-group number">
                    {index + 1}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                      maxLength={100}
                      placeholder="Enter item name"
                      className={errors[item.id]?.name ? 'has-error' : ''}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      maxLength={500}
                      placeholder="Enter item description"
                      className={errors[item.id]?.description ? 'has-error' : ''}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      value={formatNumber(item.quantity)}
                      onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                      min="1"
                      placeholder="0"
                      className={errors[item.id]?.quantity ? 'has-error' : ''}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      value={formatNumber(item.price)}
                      onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className={errors[item.id]?.price ? 'has-error' : ''}
                    />
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => deleteItem(item.id)}
                    aria-label="Delete item"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
          {renderErrorSummary()}
        </>
      )}
    </div>
  );
};

export default Items; 