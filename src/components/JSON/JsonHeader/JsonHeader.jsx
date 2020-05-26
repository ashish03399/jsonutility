import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle, Input,
  InputGroup, InputGroupAddon,
  InputGroupButtonDropdown,
  Row
} from "reactstrap";
import SearchPopup from "../../common/SearchPopup/SearchPopup";

const JsonHeader = (props) => {
  const [first, setFirst] = useState(false);
  return <CardHeader>
    <Row>
      <Col xs="12" md="4">
        <InputGroup>
          <InputGroupButtonDropdown className={'fitheight'} addonType="prepend"
                                    isOpen={first}
                                    toggle={() => {
                                      setFirst(!first);
                                    }}>
            <DropdownToggle caret color="primary">
              URL
            </DropdownToggle>
            <DropdownMenu className={first ? 'show' : ''}>
              <DropdownItem>Add </DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
          <Input type="text" className={'mb-1'} id="input1-group3" name="input1-group3" placeholder="Username"/>
          <InputGroupAddon className={'fitheight'} addonType="append">
            <Button type="button" onClick={() => {
              props.getData()
            }} color="primary"><i className="fa fa-twitter"></i></Button>
          </InputGroupAddon>
        </InputGroup>
      </Col>
      <Col xs="6" md="1">
        <Button color="primary" className={'mb-1 ml-2'} id="toggleCollapse1">Toggle</Button>
      </Col>
      <Col xs="6" md="2">
        <Button color="primary" className={'mb-1 ml-2'} id="toggleCollapse1">Saisha Bansal</Button>
      </Col>
      <Col xs="12" md="4">
        <InputGroup>
          <InputGroupButtonDropdown className={'fitheight'} addonType="prepend"
                                    isOpen={first}
                                    toggle={() => {
                                      setFirst(!first);
                                    }}>
            <DropdownToggle caret color="primary">
              Search In JSON
            </DropdownToggle>
            <DropdownMenu className={first ? 'show' : ''}>
              <DropdownItem>Search By Key</DropdownItem>
              <DropdownItem>Search By Value</DropdownItem>
              <DropdownItem divider/>
              <DropdownItem>Separated link</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
          <Input type="text" value={props.filterKey} onChange={(e) => {
            props.setFilterKey(e.target.value)
          }} className={'mb-1'} id="input1-group3" name="input1-group3" placeholder="Username"/>
          <InputGroupAddon className={'fitheight'} addonType="append">
            <Button type="button" onClick={() => {
              props.filterData()
            }} color="primary"><i className="fa fa-search"></i></Button>
          </InputGroupAddon>
        </InputGroup>

      </Col>
      <Col xs="12" md="1">
        <SearchPopup jsonData={props.filteredData}/>
      </Col>
    </Row>
  </CardHeader>
}


JsonHeader.propTypes = {

};

export default JsonHeader;
