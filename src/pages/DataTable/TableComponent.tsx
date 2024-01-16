import React from 'react'
import {
    Table,
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
  } from '@table-library/react-table-library/table';
  import { useTheme } from '@table-library/react-table-library/theme';
  import { getTheme } from '@table-library/react-table-library/baseline';
  import { dummyData } from './testData';
import { TableData } from '../../types/types';

const TableComponent = () => {

  const theme = useTheme(getTheme());
  return (
    <div>
      <Table data={dummyData} >
      {(tableList:TableData[]) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" data-testid="flexCheckDefault"/></HeaderCell>
              <HeaderCell><b>#</b></HeaderCell>
              <HeaderCell>NAME</HeaderCell>
              <HeaderCell>DESCRIPTION</HeaderCell>
              <HeaderCell>STATUS</HeaderCell>
              <HeaderCell>RATE</HeaderCell>
              <HeaderCell>BALANCE</HeaderCell>
              <HeaderCell>DEPOSIT</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item:TableData) => (
              <Row key={item.id} item={item}>
                <Cell><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" data-testid="flexCheckDefault"/></Cell>
                <Cell>{item.id}</Cell>
                <Cell>{item.name}<br/>{item.phone}</Cell>
                <Cell>{item.description}</Cell>
                <Cell>{item.status}</Cell>
                <Cell>{item.rate}</Cell>
                <Cell>{item.balance}</Cell>
                <Cell>{item.deposit}</Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
      </Table>
    </div>
  )
}

export default TableComponent
