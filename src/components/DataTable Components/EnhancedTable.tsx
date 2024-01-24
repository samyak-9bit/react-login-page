import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import { TableData } from '../../types/types';
import { dummyData, dummyDynamicData } from './testData';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { searchInStatement } from './smartSearch';
import './Styles.css';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import { HeadCell,Order } from '../../types/types';
import { carUrl, countryUrl} from './uslStrings';
import axios from 'axios';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: " rgba(244, 247, 252, 0.75);",
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}


function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof TableData>('id');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<TableData[]>(dummyData);
  const [searchInput, setSearchInput] = React.useState<string>("");
  const [urlString,setUrlString]=React.useState<string>(carUrl);
  const [data, setData] = React.useState<Object[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error|null>(null);
  const [keysArray, setKeysArray] = React.useState<string[]>([]);


//dynamic interface generator
// const metaData = dummyDynamicData.type;
// type MetaDataKeys = keyof typeof metaData;
// type Data = {
//   [key in MetaDataKeys]: string; 
// };
// const dynamicInterface: Data = {} as Data;
// for (const key in metaData) {
//   dynamicInterface[key as MetaDataKeys] = (metaData[key as MetaDataKeys]).toLowerCase();
// }
// console.log(dynamicInterface);



  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(urlString); 
  //       setData(response.data.data);
  //       const keysArray = Object.keys(response.data.attributeTypes);
  //       setKeysArray(keysArray);
  //       setRows(response.data);
  //       console.log(data);
  //       console.log(keysArray);
  //     } catch (error) {
  //       setError(error as Error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [urlString]);


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if cached data is available
        const cachedData = localStorage.getItem(`cachedData-${urlString}`);
        const cachedTimestamp = localStorage.getItem('cachedTimestamp');

        if (cachedData && cachedTimestamp) {
          const currentTime = new Date().getTime();
          const elapsedTime = currentTime - parseInt(cachedTimestamp);

          // If the cached data is less than 10 minutes old, use it
          if (elapsedTime < 10 * 60 * 1000) {
            setData((JSON.parse(cachedData)).data);
            setKeysArray(Object.keys(JSON.parse(cachedData).attributeTypes));
            setRows((JSON.parse(cachedData)).data);
            setLoading(false);
            return;
          } else {
            // If the cached data is older than 10 minutes, delete it
            localStorage.removeItem(`cachedData-${urlString}`);
            localStorage.removeItem('cachedTimestamp');
          }
        }

        // If no cached data or the cached data is older than 10 minutes, fetch new data
        const response = await axios.get(urlString);
        setData(response.data.data);
        const newKeysArray = Object.keys(response.data.attributeTypes);
        setKeysArray(newKeysArray);
        setRows(response.data);

        // Cache the new data
        localStorage.setItem(`cachedData-${urlString}`, JSON.stringify(response.data));
        localStorage.setItem('cachedTimestamp', new Date().getTime().toString());

        console.log(data);
        console.log(newKeysArray);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [urlString]);



  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TableData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (searchInput.length !== 0) {
        const newRows = searchInStatement(searchInput, data,keysArray);
        console.log(`NewRows:::::${JSON.stringify(newRows)}`);
        // Use a callback function to update the rows state
        setData((prevRows) => {
          return newRows.length > 0 ? newRows : prevRows;
        });
        // Use the useEffect hook to log the updated rows state
        // React.useEffect(() => {
        console.log(`Rows:::::${rows}`);
        // }, [rows]);
      }
    }
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // const visibleRows = React.useMemo(
  //   () =>
  //     stableSort(rows, getComparator(order, orderBy)).slice(
  //       page * rowsPerPage,
  //       page * rowsPerPage + rowsPerPage,
  //     ),
  //   [order, orderBy, page, rowsPerPage],
  // );

  return (
    <Box sx={{ width: '100%' }}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} setUrlString={setUrlString} handleInputChange={handleInputChange} searchInput={searchInput} handleEnterKeyPress={handleEnterKeyPress} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              dynamicColumns={keysArray}

            />
            {/* <TableBody>
              {data.map((item) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <StyledTableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell align="left" sx={{
                      color: "var(--Gray-900, #171C26)",
                      fontFamily: "Inter",
                      fontSize: "0.875rem",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "1.25rem",
                      letterSpacing: "0.0175rem",
                    }}
                    >{row.id}</TableCell>
                    <TableCell align="left" className='p-0' sx={{
                      color: "var(--Gray-900, #171C26)",
                      fontFamily: "Inter",
                      fontSize: "0.875rem",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "1.25rem",
                      letterSpacing: "0.0175rem",
                    }}
                    >{row.name}<div style={{
                      color: "var(--Gray-500, #687182)",
                      fontFamily: "Inter",
                      fontSize: "0.75rem",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "1.125rem",
                      letterSpacing: "0.0225rem",
                    }}>{row.phone}</div></TableCell>
                    <Tooltip title={row.description}>
                      <TableCell align="left" sx={{
                        color: "var(--Gray-700, #464F60)",
                        fontFamily: "Inter",
                        fontSize: "0.875rem",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "1.25rem",
                        maxWidth: "100px"
                      }}
                      >
                        {row.description.length > 20 ? `${row.description.substring(0, 50)}...` : row.description}
                      </TableCell></Tooltip>

                    <TableCell align="center"><div className={`status status-${row.status.toLowerCase()}`}>{row.status}</div></TableCell>


                    <TableCell align="right" sx={{
                      color: "var(--Gray-700, #464F60)",
                      textAlign: "right",
                      fontVariantNumeric: "lining-nums tabular-nums",
                      fontFamily: "Inter",
                      fontSize: "0.875rem",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "1.25rem",
                    }}
                    >${row.rate}<div className='subtext'>CAD</div></TableCell>
                    <TableCell align="right" sx={{
                      color: row.balance < 0 ? "var(--Red-500, #D12953)" : "var(--Green-500, #14804A)",
                      textAlign: "right",
                      fontVariantNumeric: "lining-nums tabular-nums",
                      fontFamily: "Inter",
                      fontSize: "0.875rem",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "1.25rem",
                    }}>
                      {row.balance < 0 && '-'}
                      ${Math.abs(row.balance)}
                      <div className='subtext'>CAD</div>
                    </TableCell>

                    <TableCell align="right" sx={{
                      color: "var(--Gray-700, #464F60)",
                      textAlign: "right",
                      fontVariantNumeric: "lining-nums tabular-nums",
                      fontFamily: "Inter",
                      fontSize: "0.875rem",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "1.25rem",
                    }}>${row.deposit}<div className='subtext'>CAD</div></TableCell>

                    <TableCell align="center"><EditIcon color='action' /></TableCell>

                  </StyledTableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody> */}
            <TableBody >
              {
                data.map((item,index)=>{
                  if (typeof item === 'object' && item !== null) {
                    const valuesArray = Object.values(item);
                    return (
                      <StyledTableRow
                    hover
                    onClick={(event) => handleClick(event, index)}
                    role="checkbox"
                    // aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    // selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                        {valuesArray.map((value, columnIndex) => (
                          <TableCell key={columnIndex} align="center" sx={{
                            color: "var(--Gray-700, #464F60)",
                            fontFamily: "Inter",
                            fontSize: "0.875rem",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "1.25rem",
                            
                          }}>
                            {typeof value === 'object' ? `${value.rate}, ${value.count}` : value}
                          </TableCell>
                        ))}
                      </StyledTableRow>
                    );
                  }
                  return null;
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
         <p>{JSON.stringify(data)}</p> */}
      </Paper>
     
       )} 
      
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}
