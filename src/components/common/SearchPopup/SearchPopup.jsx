import React, {useState, useEffect} from 'react';
import {Button, Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import DynamicTable from "../dynamicTable/DynamicTable";
import style from './SearchPopUp.scss';

const SearchPopup = props => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);
  useEffect(() => {
    props.jsonData && setPopoverOpen(true)
  }, [props.jsonData]);
  return (
    <div>
      <Button id="Popover1" type="button">
        {popoverOpen ? 'Hide' : 'Show'}
      </Button>
      <Popover popperClassName={'dynamicTable'} innerClassName={'dynamicTableOverFlow'} placement="bottom" isOpen={popoverOpen} target="Popover1"
               toggle={toggle}>
        <PopoverHeader>Popover Title</PopoverHeader>
        <PopoverBody>
          <DynamicTable jsonData={props.jsonData}></DynamicTable>
        </PopoverBody>
      </Popover>
    </div>
  );
}

export default SearchPopup;