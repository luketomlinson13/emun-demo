import { NextApiRequest, NextApiResponse } from 'next';
import SheetsService from '../../services/SheetsService';
import { ESheets } from '../../data/enums/ESheets';
import { mapToInterface } from '../../data/mappers/mapToInterface';
import { IPayPeriod } from '../../data/interfaces/IPayPeriod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const googleSheetsService = new SheetsService();

  try {
    const allPayPeriods = await googleSheetsService.setSheet(ESheets.PayPeriods).getAll();
    const mappedPayPeriods = mapToInterface<IPayPeriod>(allPayPeriods);
    res.status(200).json(mappedPayPeriods);
  } catch (error) {
    console.error('Error accessing Google Sheets:', error);
    res.status(500).json({ error: 'Failed to fetch data from Google Sheets' });
  }
}
