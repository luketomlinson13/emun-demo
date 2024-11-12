import { TableCell, TableRow, TableRowProps, Typography } from '@mui/material';
import { IDivision } from '../../../data/interfaces/IDivision';
import { IDivisionHeader } from './table/DivisionsTable';

export function DivisionsTableRow(props: IDivisionTableRowProps & TableRowProps) {
  return (
    <TableRow
      onKeyDown={props.onKeyDown}
      tabIndex={-1}
      sx={{
        borderColor: 'primary.main',
      }}
    >
      {props.headers.map((header, index) => (
        <TableCell key={index} align={header.align || 'center'}>
          <Typography>{props.row[header.id]}</Typography>
        </TableCell>
      ))}
    </TableRow>
  );
}

interface IDivisionTableRowProps {
  row: IDivision;
  headers: IDivisionHeader[];
}