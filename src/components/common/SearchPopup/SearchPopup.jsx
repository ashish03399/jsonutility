import React, {useState} from 'react';
import {Button, Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import DynamicTable from "../dynamicTable/DynamicTable";
import style from './SearchPopUp.scss';

const SearchPopup = props => {
  console.log('AAAAA',props);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div>
      <Button id="Popover1" type="button">
        Launch Popover
      </Button>
      <Popover popperClassName={'dynamicTable' }placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
          <PopoverHeader>Popover Title</PopoverHeader>
          <PopoverBody>
            <DynamicTable jsonData={props.jsonData}></DynamicTable>
          </PopoverBody>
      </Popover>
    </div>
  );
}

export default SearchPopup;
