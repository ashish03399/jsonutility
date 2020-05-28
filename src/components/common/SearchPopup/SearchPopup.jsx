import React, {useState, useEffect} from 'react';
import {Button, Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import DynamicTable from "../dynamicTable/DynamicTable";
import style from './SearchPopUp.scss';
import {mockData} from './mockData'

const SearchPopup = props => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);
  useEffect(() => {
    props.jsonData && setPopoverOpen(true)
  }, [props.jsonData]);
  return (
    <div data-locator={"SearchPopup"} className={'tooltip1'}>
      <Button id="Popover1" onClick={() => {
        setPopoverOpen(!popoverOpen)
      }} type="button" color="primary">
        {popoverOpen ? 'Hide ToolTip' : 'Show ToolTip'}
      </Button>
      <div className={`tooltiptext tooltip-bottom ${popoverOpen ? 'showToolTip' : 'hideToolTip'}`}>
        <PopoverHeader className={'popverHeader'}>{`Key : ${props.filterKey}, Total instances: ${props?.jsonData?.length}`}</PopoverHeader>
        <PopoverBody>
          <DynamicTable jsonData={props.jsonData}></DynamicTable>
        </PopoverBody>
      </div>

    </div>
  )
    ;
}

export default React.memo(SearchPopup);
