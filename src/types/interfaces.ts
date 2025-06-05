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
  phone: string;
}

export interface HeaderInfo {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
}

export interface Currency {
  code: string;
  symbol: string;
}

export interface SummaryState {
  taxRate: number;
  discountRate: number;
  selectedCurrency: Currency;
  notes: string;
}

export interface InvoiceData {
  items: InvoiceItem[];
  billFrom: BillingInfo;
  billTo: BillingInfo;
  headerInfo: HeaderInfo;
  summaryState: SummaryState;
}

export interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  currency: Currency;
  notes: string;
  billFrom: BillingInfo;
  billTo: BillingInfo;
  headerInfo: HeaderInfo;
}

export interface BillingDetailsProps {
  billFrom: BillingInfo;
  billTo: BillingInfo;
  onBillFromChange: (info: BillingInfo) => void;
  onBillToChange: (info: BillingInfo) => void;
}

export interface InvoiceHeaderProps {
  headerInfo: HeaderInfo;
  onHeaderInfoChange: (info: HeaderInfo) => void;
}

export interface ItemsProps {
  items: InvoiceItem[];
  currency: Currency;
  onItemsChange: (items: InvoiceItem[]) => void;
}

export interface SummaryProps {
  items: InvoiceItem[];
  billFrom: BillingInfo;
  billTo: BillingInfo;
  headerInfo: HeaderInfo;
  summaryState: SummaryState;
  onSummaryStateChange: (state: SummaryState) => void;
}

export interface InvoicePDFProps {
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  currency: Currency;
  notes: string;
  billFrom: BillingInfo;
  billTo: BillingInfo;
  headerInfo: HeaderInfo;
} 