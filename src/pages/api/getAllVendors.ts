import { NextApiRequest, NextApiResponse } from 'next';
import SheetsService from '../../services/SheetsService';
import { ESheets } from '../../data/enums/ESheets';
import { mapToInterface } from '../../data/mappers/mapToInterface';
import { IVendor } from '../../data/interfaces/IVendor';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const googleSheetsService = new SheetsService();

  try {
    const allVendors = await googleSheetsService.setSheet(ESheets.Vendors).getAll();
    const mappedVendors = mapToInterface<IVendor>(allVendors);
    res.status(200).json(mappedVendors);
  } catch (error) {
    console.error('Error accessing Google Sheets:', error);
    res.status(500).json({ error: 'Failed to fetch data from Google Sheets' });
  }
}
