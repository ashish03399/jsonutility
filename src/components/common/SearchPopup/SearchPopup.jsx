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

  const noDataFound = () =>{
    setTimeout(()=>{
      setPopoverOpen(false)
    }, 2000);
    return <PopoverBody>No Data Found</PopoverBody>
  }
  return (
    <div data-locator={"SearchPopup"} className={'tooltip1 searchPopButton'}>
      <Button id="Popover1" onClick={() => {
        setPopoverOpen(!popoverOpen)
      }} type="button" color="primary">
        {popoverOpen ? 'Hide' : 'Show Filtered Data'}
      </Button>
      <div className={`tooltiptext tooltip-bottom ${popoverOpen ? 'showToolTip' : 'hideToolTip'}`}>
        {props.jsonData?.length > 0 ? <React.Fragment>
          <PopoverHeader
            className={'popverHeader'}>{`Key : ${props.filteredKey}, Total instances: ${props?.jsonData?.length}`}</PopoverHeader>
          <PopoverBody>
            <DynamicTable jsonData={props.jsonData}></DynamicTable>
          </PopoverBody>
        </React.Fragment> : noDataFound()}
      </div>
    </div>
  );
}

export default React.memo(SearchPopup);
