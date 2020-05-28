import React from 'react';
import PropTypes from 'prop-types';
import {Badge, CardBody, Pagination, PaginationItem, PaginationLink, Table} from "reactstrap";
import styles from './dynamicTable.scss'

const DynamicTable = props => {
  const tableContent = props.jsonData?.map((data) => {
    return <tr>
      <td className={'single-line'}>{data?.path?.slice(1,data.path.length-1).join('.')}</td>
      <td className={'single-line'}>{data?.path[data.path.length-1]}</td>
      <td className={'jsonValue'}>{''+JSON.stringify(data?.value)}</td>
    </tr>


  })
  return (
    <Table hover bordered striped responsive size="sm">
      <thead>
      <tr>
        <th>Path</th>
        <th>Key</th>
        <th>Value</th>
      </tr>
      </thead>
      <tbody>
      {tableContent}
      </tbody>
    </Table>
  );
};

DynamicTable.propTypes = {};

export default React.memo(DynamicTable);
