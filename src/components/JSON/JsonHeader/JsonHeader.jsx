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
import {JSON_URLS} from "./Constants";
import {getLocalStorage, setLocalStorage} from "../../../utils/LocalStorageUtils";

const JsonHeader = (props) => {
  const [showUrl, setShowUrl] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [showJsonSearchType, setShowJsonSearchType] = useState(false);
  const addedUrl = getLocalStorage(JSON_URLS) || [];

  const addUrlInlocalStorage = () => {
    const isUrlAdded = addedUrl.filter(urlObj=>{
      return urlObj.url === inputUrl;
    })
    if(isUrlAdded?.length === 0 && inputUrl){
      addedUrl.push({key:'url', url:decodeURIComponent(inputUrl)})
      setLocalStorage(JSON_URLS, addedUrl);
    }
  }

  return <CardHeader>
    <Row>
      <Col xs="12" md="7">
        <InputGroup>
          <InputGroupButtonDropdown
            className={'fitheight'}
            addonType="prepend"
            isOpen={showUrl}
            toggle={() => {
            setShowUrl(!showUrl);
          }}>
            <DropdownToggle caret color="primary">
              URL
            </DropdownToggle>
            <DropdownMenu className={showUrl ? 'show' : ''}>
              {addedUrl?.map((item) =>
                <DropdownItem onClick={()=>{setInputUrl(item?.url)}}>{item?.url} </DropdownItem>
              )}
            </DropdownMenu>
          </InputGroupButtonDropdown>
          <Input type="text" className={'mb-1'} id="input1-group3" value={inputUrl} onChange={(e)=>{setInputUrl(e.target.value)}}name="input1-group3" placeholder="URL"/>
          <InputGroupAddon title={'Hit URL'} className={'fitheight'} addonType="append">
            <Button type="button" onClick={() => {
              props.getData()
            }} color="primary"><i className="fa fa-arrow-right"></i></Button>
          </InputGroupAddon>
          <InputGroupAddon title={'Refersh API Data'} className={'fitheight ml-1'}>
            <Button type="button" onClick={() => {
              props.getData()
            }} color="primary"><i className="fa fa-refresh"></i></Button>
          </InputGroupAddon>
          <InputGroupAddon title={'Add URL'} className={'fitheight ml-1'}>
            <Button type="button" onClick={addUrlInlocalStorage} color="primary"><i className="fa fa-plus"></i></Button>
          </InputGroupAddon>
        </InputGroup>
      </Col>
      <Col xs="12" md="4">
        <InputGroup>
          <InputGroupButtonDropdown className={'fitheight'} addonType="prepend"
                                    isOpen={showJsonSearchType}
                                    toggle={() => {
                                      setShowJsonSearchType(!showJsonSearchType);
                                    }}>
            <DropdownToggle caret color="primary">
              Search
            </DropdownToggle>
            <DropdownMenu className={showJsonSearchType ? 'show' : ''}>
              <DropdownItem>Search By Key</DropdownItem>
              <DropdownItem>Search By Value</DropdownItem>
              <DropdownItem divider/>
              <DropdownItem>Separated link</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
          <Input type="text" value={props.filterKey} onChange={(e) => {
            props.setFilterKey(e.target.value)
          }} className={'mb-1'} id="input1-group3" name="input1-group3" placeholder="Key/Value"/>
          <InputGroupAddon className={'fitheight'} addonType="append">
            <Button type="button" onClick={() => {
              props.filterData()
            }} color="primary"><i className="fa fa-search"></i></Button>
          </InputGroupAddon>
        </InputGroup>

      </Col>
      <Col xs="12" md="2">
        {props.filteredData && <SearchPopup jsonData={props.filteredData}/>}
      </Col>
    </Row>
  </CardHeader>
}


JsonHeader.propTypes = {};

export default JsonHeader;
