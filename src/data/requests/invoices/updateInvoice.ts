import { IInvoice } from '../../interfaces/IInvoice';

export async function updateInvoice(invoiceData: IInvoice): Promise<boolean> {
  const response = await fetch('/api/updateInvoice', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(invoiceData),
  });

  return response.ok;
}
