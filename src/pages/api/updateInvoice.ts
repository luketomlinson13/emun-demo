// pages/api/updateInvoice.ts
import { NextApiRequest, NextApiResponse } from 'next';
import SheetsService from '../../services/SheetsService';
import { ESheets } from '../../data/enums/ESheets';

export default async function updateInvoice(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sheetsService = new SheetsService();
    sheetsService.setSheet(ESheets.Invoices);

    if (req.method !== 'PATCH') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    await sheetsService.update(req.body);

    res.status(200).json({ message: 'Invoice updated successfully' });
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ error: 'Failed to update invoice in Google Sheets' });
  }
}
