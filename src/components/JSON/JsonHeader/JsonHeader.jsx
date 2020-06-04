import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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
import {getLocalStorage, setLocalStorage, removeKey} from "../../../utils/LocalStorageUtils";
import {FETCH_JSON_DATA} from "../Constant";
import {validateURL} from "../../../utils/validateUrl";
import style from './JSONHeader.scss'

const JsonHeader = (props) => {
  const [showUrl, setShowUrl] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [isUrlValid, setIsUrlValid] = useState();
  const [showJsonSearchType, setShowJsonSearchType] = useState(false);
  let addedUrl = getLocalStorage(JSON_URLS) || [];
  const firstElementkey = addedUrl && addedUrl[0]?.key;
  if (firstElementkey && firstElementkey !== 'reset') {
    addedUrl.unshift({key: 'reset', url: 'reset all'})
  }
  window.setFilterKey = props.sestFilterKey;
  const addUrlInlocalStorage = () => {
    const isUrlAdded = addedUrl.filter(urlObj => {
      return urlObj.url === inputUrl;
    })
    if (isUrlAdded?.length === 0 && inputUrl) {
      addedUrl.push({key: 'url', url: decodeURIComponent(inputUrl)})
      setLocalStorage(JSON_URLS, addedUrl);
    }
  }

  const callApiToFetchJSONDATA = (url) => {
    if (validateURL(url ? url : inputUrl)) {
      setIsUrlValid('true');
      props.callApi(url ? url : inputUrl)
    } else {
      alert("Please enter valid URL");
    }

  }

  const removeAllUrls = () => {
    var r = window.confirm("Are you confirm want to delete all URLs?");
    if (r == true) {
      removeKey(JSON_URLS);
      addedUrl = undefined;
    }
  }
  return <CardHeader className={'jsonheader'}>
    <Row>
      <Col xs="12" md="6">
        <InputGroup>
          <img className='mr-2' height='35' src='./app-logo-2.png' />
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
              {addedUrl?.map((item) => {
                  if (item?.key === 'reset') {
                    return <a tabIndex="-1" onClick={() => {
                      removeAllUrls();
                    }
                    } className="dropdown-header resetAll">Reset all</a>
                  } else {
                    return <DropdownItem key={item?.url} header={item?.key === 'reset'} onClick={() => {
                      setInputUrl(item?.url)
                      callApiToFetchJSONDATA(item?.url);
                    }}>{item?.url}</DropdownItem>
                  }
                }
              )}
            </DropdownMenu>
          </InputGroupButtonDropdown>
          <Input type="text" className={'mb-1'} id="input1-group3" value={inputUrl} onKeyDown={(e) => {
            if (e.key === 'Enter') {
              callApiToFetchJSONDATA();
            }
          }} onChange={(e) => {
            setInputUrl(e.target.value)
          }} name="input1-group3" placeholder="http://"/>
          <InputGroupAddon title={'Hit URL'} className={'fitheight'} addonType="append">
            <Button type="button" onClick={() => callApiToFetchJSONDATA()} color="primary"><i
              className={classnames('fa',
                {'fa-arrow-right': props.apiStatus !== FETCH_JSON_DATA},
                {'fa fa-spinner fa-pulse': props.apiStatus === FETCH_JSON_DATA}
              )}></i></Button>
          </InputGroupAddon>
          {isUrlValid && <InputGroupAddon title={'Refersh API Data'} className={'fitheight ml-1'}>
            <Button type="button" onClick={() => callApiToFetchJSONDATA()} color="primary"><i
              className="fa fa-refresh"></i></Button>
          </InputGroupAddon>}
          {isUrlValid && <InputGroupAddon title={'Add URL'} className={'fitheight ml-1'}>
            <Button type="button" onClick={addUrlInlocalStorage} color="primary"><i className="fa fa-plus"></i></Button>
          </InputGroupAddon>}
        </InputGroup>
      </Col>
      {props.jsonData && <Col xs="12" md="3">
        <InputGroup>
          {/*<InputGroupButtonDropdown className={'fitheight'} addonType="prepend"*/}
          {/*                          isOpen={showJsonSearchType}*/}
          {/*                          toggle={() => {*/}
          {/*                            setShowJsonSearchType(!showJsonSearchType);*/}
          {/*                          }}>*/}
          {/*  <DropdownToggle caret color="primary">*/}
          {/*    Search*/}
          {/*  </DropdownToggle>*/}
          {/*  <DropdownMenu className={showJsonSearchType ? 'show' : ''}>*/}
          {/*    <DropdownItem>Search By Key</DropdownItem>*/}
          {/*    <DropdownItem>Search By Value</DropdownItem>*/}
          {/*    <DropdownItem divider/>*/}
          {/*    <DropdownItem>Separated link</DropdownItem>*/}
          {/*  </DropdownMenu>*/}
          {/*</InputGroupButtonDropdown>*/}
          <Input type="text" value={props.filterKey} onKeyDown={(e) => {
            if (e.key === 'Enter') {
              props.filterData()
            }
          }} onChange={(e) => {
            props.setFilterKey(e.target.value)
          }} className={'mb-1'} id="input1-group3" name="input1-group3" placeholder="JSON key(case sensitive).."/>
          <InputGroupAddon className={classnames('fitheight')} addonType="append">
            <Button type="button" disabled={!props.filterKey} onClick={() => {
              props.filterData()
            }} color="primary"><i className="fa fa-search"></i></Button>
          </InputGroupAddon>
        </InputGroup>

      </Col>}
      <Col xs="12" md="2">
        {props.filteredData && <SearchPopup filteredKey={props.filteredKey} jsonData={props.filteredData}/>}
      </Col>
    </Row>
  </CardHeader>
}


JsonHeader.propTypes = {
  apiStatus: PropTypes.number,
  filteredKey: PropTypes.string,
  filteredData: PropTypes.array
};

export default React.memo(JsonHeader);

