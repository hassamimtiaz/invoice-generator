import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { InvoiceItem } from '../types';

interface InvoicePDFProps {
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

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  invoiceInfo: {
    marginBottom: 5,
  },
  billingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8fafc',
  },
  billingBox: {
    width: '45%',
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  billingTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1e293b',
    paddingBottom: 5,
    borderBottom: 1,
    borderBottomColor: '#e2e8f0',
  },
  billingName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 6,
  },
  billingDetails: {
    fontSize: 10,
    color: '#475569',
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulletPoint: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#cbd5e1',
    marginRight: 4,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#999',
    paddingVertical: 5,
  },
  tableCol1: { width: '10%' },
  tableCol2: { width: '25%' },
  tableCol3: { width: '30%' },
  tableCol4: { width: '10%' },
  tableCol5: { width: '12.5%' },
  tableCol6: { width: '12.5%' },
  summary: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '200px',
    marginBottom: 5,
  },
  summaryTotal: {
    fontWeight: 'bold',
    marginTop: 5,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  notes: {
    marginTop: 30,
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

const formatCurrency = (amount: number, currency: { code: string; symbol: string }): string => {
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

const InvoicePDF: React.FC<InvoicePDFProps> = ({
  items,
  subtotal,
  discount,
  tax,
  total,
  currency,
  notes,
  billFrom,
  billTo,
  headerInfo,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>INVOICE</Text>
          <Text style={styles.invoiceInfo}>#{headerInfo.invoiceNumber}</Text>
        </View>
        <View>
          <Text style={styles.invoiceInfo}>Date: {formatDate(headerInfo.invoiceDate)}</Text>
          <Text style={styles.invoiceInfo}>Due Date: {formatDate(headerInfo.dueDate)}</Text>
        </View>
      </View>

      <View style={styles.billingSection}>
        <View style={styles.billingBox}>
          <Text style={styles.billingTitle}>Bill From:</Text>
          <Text style={styles.billingName}>{billFrom.name}</Text>
          <View style={styles.billingDetails}>
            <View style={styles.bulletPoint} />
            <Text>{billFrom.email}</Text>
          </View>
          <View style={styles.billingDetails}>
            <View style={styles.bulletPoint} />
            <Text>{billFrom.phone}</Text>
          </View>
          <View style={styles.billingDetails}>
            <View style={styles.bulletPoint} />
            <Text>{billFrom.address}</Text>
          </View>
        </View>
        <View style={styles.billingBox}>
          <Text style={styles.billingTitle}>Bill To:</Text>
          <Text style={styles.billingName}>{billTo.name}</Text>
          <View style={styles.billingDetails}>
            <View style={styles.bulletPoint} />
            <Text>{billTo.email}</Text>
          </View>
          <View style={styles.billingDetails}>
            <View style={styles.bulletPoint} />
            <Text>{billTo.phone}</Text>
          </View>
          <View style={styles.billingDetails}>
            <View style={styles.bulletPoint} />
            <Text>{billTo.address}</Text>
          </View>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableCol1}>No.</Text>
          <Text style={styles.tableCol2}>Item</Text>
          <Text style={styles.tableCol3}>Description</Text>
          <Text style={styles.tableCol4}>Qty</Text>
          <Text style={styles.tableCol5}>Price</Text>
          <Text style={styles.tableCol6}>Total</Text>
        </View>
        {items.map((item, index) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.tableCol1}>{index + 1}</Text>
            <Text style={styles.tableCol2}>{item.name}</Text>
            <Text style={styles.tableCol3}>{item.description}</Text>
            <Text style={styles.tableCol4}>{item.quantity}</Text>
            <Text style={styles.tableCol5}>{formatCurrency(item.price, currency)}</Text>
            <Text style={styles.tableCol6}>{formatCurrency(item.quantity * item.price, currency)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text>Subtotal:</Text>
          <Text>{formatCurrency(subtotal, currency)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Discount:</Text>
          <Text>-{formatCurrency(discount, currency)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Tax:</Text>
          <Text>{formatCurrency(tax, currency)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.summaryTotal]}>
          <Text>Total:</Text>
          <Text>{formatCurrency(total, currency)}</Text>
        </View>
      </View>

      {notes && (
        <View style={styles.notes}>
          <Text style={styles.notesTitle}>Notes:</Text>
          <Text>{notes}</Text>
        </View>
      )}
    </Page>
  </Document>
);

export default InvoicePDF; 