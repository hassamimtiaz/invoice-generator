import { useState, useEffect } from 'react';
import type { InvoiceItem } from '../types';
import '../styles/Items.scss';

interface ItemErrors {
  name?: string;
  description?: string;
  quantity?: string;
  price?: string;
}

const Items = () => {
  const [items, setItems] = useState<InvoiceItem[]>(() => {
    const savedItems = localStorage.getItem('invoiceItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [errors, setErrors] = useState<{ [key: string]: ItemErrors }>({});

  useEffect(() => {
    localStorage.setItem('invoiceItems', JSON.stringify(items));
  }, [items]);

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
    setItems([...items, newItem]);
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
    setItems(updatedItems);
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  return (
    <div className="items-section">
      <h2>
        Items
        <button onClick={addItem}>Add Item</button>
      </h2>
      <div className="items-list">
        {items.length === 0 ? (
          <div className="empty-state">No items added yet. Click "Add Item" to get started.</div>
        ) : (
          items.map(item => (
            <div key={item.id} className="item">
              <div className="form-group">
                <label htmlFor={`name-${item.id}`}>Name</label>
                <input
                  type="text"
                  id={`name-${item.id}`}
                  value={item.name}
                  onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                  maxLength={100}
                />
                {errors[item.id]?.name && (
                  <span className="error">{errors[item.id].name}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor={`description-${item.id}`}>Description</label>
                <textarea
                  id={`description-${item.id}`}
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  maxLength={500}
                />
                {errors[item.id]?.description && (
                  <span className="error">{errors[item.id].description}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor={`quantity-${item.id}`}>Quantity</label>
                <input
                  type="number"
                  id={`quantity-${item.id}`}
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                  min="1"
                />
                {errors[item.id]?.quantity && (
                  <span className="error">{errors[item.id].quantity}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor={`price-${item.id}`}>Price</label>
                <input
                  type="number"
                  id={`price-${item.id}`}
                  value={item.price}
                  onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                />
                {errors[item.id]?.price && (
                  <span className="error">{errors[item.id].price}</span>
                )}
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteItem(item.id)}
                aria-label="Delete item"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Items; 