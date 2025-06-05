import type { InvoiceData } from '../types/interfaces';
import { currencies } from '../constants/currencies';

const getDefaultState = (): InvoiceData => ({
  items: [],
  billFrom: {
    name: '',
    email: '',
    address: '',
    phone: ''
  },
  billTo: {
    name: '',
    email: '',
    address: '',
    phone: ''
  },
  headerInfo: {
    invoiceNumber: 'INV-001',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date().toISOString().split('T')[0]
  },
  summaryState: {
    taxRate: 0,
    discountRate: 0,
    selectedCurrency: currencies[0],
    notes: ''
  }
});

export const getInitialState = (savedData: string | null): InvoiceData => {
  if (!savedData) return getDefaultState();

  try {
    const parsedData = JSON.parse(savedData);
    return {
      items: Array.isArray(parsedData.items) ? parsedData.items : [],
      billFrom: {
        name: parsedData.billFrom?.name || '',
        email: parsedData.billFrom?.email || '',
        address: parsedData.billFrom?.address || '',
        phone: parsedData.billFrom?.phone || ''
      },
      billTo: {
        name: parsedData.billTo?.name || '',
        email: parsedData.billTo?.email || '',
        address: parsedData.billTo?.address || '',
        phone: parsedData.billTo?.phone || ''
      },
      headerInfo: {
        invoiceNumber: parsedData.headerInfo?.invoiceNumber || 'INV-001',
        invoiceDate: parsedData.headerInfo?.invoiceDate || new Date().toISOString().split('T')[0],
        dueDate: parsedData.headerInfo?.dueDate || new Date().toISOString().split('T')[0]
      },
      summaryState: {
        taxRate: parsedData.summaryState?.taxRate || 0,
        discountRate: parsedData.summaryState?.discountRate || 0,
        selectedCurrency: parsedData.summaryState?.selectedCurrency || currencies[0],
        notes: parsedData.summaryState?.notes || ''
      }
    };
  } catch (error) {
    console.error('Error parsing saved data:', error);
    return getDefaultState();
  }
}; 