import { useEffect, useState } from 'react';
import { IOrder, orders } from '../../data/ordersMock';
import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { CustomInput } from '../shared/CustomInput';
import { OrdersTableRow } from './OrdersTableRow';
import { CustomTableContainer } from '../shared/CustomTableContainer';
import { createDirectOrder } from '../../functions/createDirectOrder';
import { IEnterCommissionsRow } from '../payments/enter-commissions/EnterCommissions';

export interface IOrderHeader {
  label: string;
  id: keyof IOrder;
  align: 'left' | 'right' | 'center';
  type?: 'currency' | 'date' | 'string';
}

const orderHeaders: IOrderHeader[] = [
  {
    label: 'Order #',
    align: 'left',
    id: 'orderNumber',
  },
  {
    label: 'Customer',
    align: 'left',
    id: 'customerName',
  },
  {
    label: 'PO #',
    align: 'left',
    id: 'poNumber',
  },
  {
    label: 'Source',
    align: 'center',
    id: 'source',
  },
  {
    label: 'Vendor',
    align: 'left',
    id: 'vendorName',
  },
  {
    label: 'Amount',
    align: 'right',
    id: 'amount',
    type: 'currency',
  },
  {
    label: 'Balance',
    align: 'right',
    id: 'balance',
    type: 'currency',
  },
  {
    label: 'Order Date',
    align: 'center',
    id: 'orderDate',
    type: 'date',
  },
  {
    label: 'Ship Date',
    align: 'center',
    id: 'shipDate',
    type: 'date',
  },
  {
    label: 'Ship City',
    align: 'left',
    id: 'shipCity',
  },
  {
    label: 'Ship State',
    align: 'center',
    id: 'shipState',
  },
  {
    label: 'Rep',
    align: 'left',
    id: 'rep',
  },
  {
    label: 'Writing Rep',
    align: 'left',
    id: 'writingRep',
  },
  {
    label: 'Generated From',
    align: 'center',
    id: 'generatedFrom',
  },
  {
    label: 'Status',
    align: 'center',
    id: 'status',
  },
];

export enum EOrderButtons {
  directOrder = 'Create Direct Order',
  newCustomer = 'Add New Customer',
}

export function OrdersTable(props: IOrdersTableProps) {
  const [searchText, setSearchText] = useState(props.initialSearchText || '');
  const rows = orders;
  const [filteredRows, setFilteredRows] = useState(rows);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  useEffect(() => {
    setSearchText(props.initialSearchText || '');
  }, [props.initialSearchText]);

  /**
   * As search text changes we filter the rows
   */
  useEffect(() => {
    setSelectedRow(null);
    if (searchText === '') {
      setFilteredRows(rows);
    } else {
      setFilteredRows(
        rows.filter((row) =>
          Object.values(row).some((value) => value.toString().toLowerCase().includes(searchText.toLowerCase()))
        )
      );
    }
  }, [rows, searchText]);

  const confirmMatch = (type?: EOrderButtons) => {
    switch (type) {
      case EOrderButtons.directOrder:
        props.onConfirmMatch?.(createDirectOrder(props.commissionRow));
        break;
      case EOrderButtons.newCustomer:
        props.onConfirmMatch?.(createDirectOrder(props.commissionRow, true));
        break;
      default:
        if (selectedRow === null) {
          setSelectedRow(0);
          return;
        } else {
          props.onConfirmMatch?.(filteredRows[selectedRow]);
        }
        break;
    }
    setSearchText('');
    setSelectedRow(null);
  };

  return (
    <CustomTableContainer
      tabIndex={0}
      header={
        <Stack direction='row' alignItems='center' gap={2}>
          <Typography variant='h5' fontWeight='bold' p={2}>
            {props.header || 'View Orders'}
          </Typography>
          {selectedRow !== null && (
            <Button variant='outlined' sx={{ my: 2 }} onClick={() => props.onConfirmMatch?.(filteredRows[selectedRow])}>
              Confirm Match
            </Button>
          )}
        </Stack>
      }
      taskBar={
        <Stack direction='row' justifyContent='space-between' p={1} gap={3}>
          <CustomInput
            type='search'
            size='small'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ marginTop: 0 }}
            onKeyDown={(event) => {
              if (props.clickable) {
                if (event.key === 'Enter') {
                  confirmMatch();
                } else if (event.key === 'Tab') {
                  event.preventDefault();
                  setSelectedRow((prevRow) =>
                    prevRow === null ? 0 : prevRow + 1 === filteredRows.length ? 0 : prevRow + 1
                  );
                }
              }
            }}
          />
          <Stack direction='row' gap={2} alignItems='center'>
            {Object.values(EOrderButtons).map((button) => (
              <Button
                key={button}
                variant='contained'
                onClick={() => confirmMatch(button)}
                sx={{ whiteSpace: 'nowrap' }}
              >
                {button}
              </Button>
            ))}
          </Stack>
        </Stack>
      }
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {orderHeaders.map((header, index) => (
              <TableCell
                key={index}
                align={header.align || 'left'}
                sx={{ fontSize: '1.2rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}
              >
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row, index) => (
            <OrdersTableRow
              key={index}
              row={row}
              headers={orderHeaders}
              selected={selectedRow === index}
              onClick={props.clickable ? () => setSelectedRow(index) : undefined}
              onKeyDown={(event) => {
                if (props.clickable) {
                  if (event.key === 'Enter') {
                    confirmMatch();
                  } else if (event.key === 'Tab') {
                    event.preventDefault();
                    setSelectedRow((prevRow) =>
                      prevRow === null ? 0 : prevRow + 1 === filteredRows.length ? 0 : prevRow + 1
                    );
                  }
                }
              }}
            />
          ))}
        </TableBody>
      </Table>
    </CustomTableContainer>
  );
}

interface IOrdersTableProps {
  initialSearchText?: string;
  clickable?: boolean;
  onConfirmMatch?: (order: IOrder) => void;
  header?: string;
  commissionRow?: IEnterCommissionsRow;
}
