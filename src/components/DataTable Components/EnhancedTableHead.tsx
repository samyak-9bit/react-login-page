import * as React from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { TableData } from '../../types/types';
import './Styles.css';
import { HeadCell, Order, EnhancedTableHeadProps } from '../../types/types';



const headCells: readonly { id: keyof TableData; numeric: boolean; disablePadding: boolean; label: string }[] = [
    { id: 'id', numeric: true, disablePadding: true, label: '#' },
    { id: 'name', numeric: false, disablePadding: true, label: 'NAME' },
    { id: 'description', numeric: false, disablePadding: false, label: 'DESCRIPTION' },
    { id: 'status', numeric: true, disablePadding: false, label: 'STATUS' },
    { id: 'rate', numeric: true, disablePadding: false, label: 'RATE' },
    { id: 'balance', numeric: true, disablePadding: false, label: 'BALANCE' },
    { id: 'deposit', numeric: true, disablePadding: false, label: 'DEPOSIT' },
  ];


const EnhancedTableHead: React.FC<EnhancedTableHeadProps> = (props) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

  const createSortHandler = (property: keyof TableData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className="table-header">
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={
              headCell.numeric
                ? headCell.id === 'id'
                  ? 'left'
                  : headCell.id === 'status'
                  ? 'center'
                  : 'right'
                : 'left'
            }
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              color: 'var(--Gray-700, #464F60)',
              fontFamily: 'Inter',
              fontSize: '0.6875rem',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '1rem',
              letterSpacing: '0.0275rem',
              textTransform: 'uppercase',
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell
          sx={{
            color: 'var(--Gray-700, #464F60)',
            fontFamily: 'Inter',
            fontSize: '0.6875rem',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '1rem',
            letterSpacing: '0.0275rem',
            textTransform: 'uppercase',
          }}
          align="center"
        >
          Edit
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
