export interface InvoiceItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

export interface BillingInfo {
  name: string;
  email: string;
  address: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  billFrom: BillingInfo;
  billTo: BillingInfo;
  items: InvoiceItem[];
} 