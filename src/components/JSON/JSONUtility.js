import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view'
import * as jsonpath from 'jsonpath';
import {renderjson} from './renderjson';
import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser';
import JSONPretty from 'react-json-pretty';


import {data} from '../../thirdParty/axios/mockData/data.js'
import {
  UncontrolledCollapse,
  Button,
  CardBody,
  Card,
  Col,
  Row,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Badge,
  InputGroup,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupAddon, CardFooter, ButtonGroup
} from 'reactstrap';
import styles from './styles.scss'
import {getApi} from '../../thirdParty/axios/axisConfig'
import SearchPopup from "../common/SearchPopup/SearchPopup";
import JsonHeader from "./JsonHeader/JsonHeader";
import JsonSubHeader from "./JsonSubHeader/JsonSubHeader";
import {BEAUTIFY, CLEAR, FORMAT, REMOVE_WHITE_SPACE, SAMPLE_JSON} from "./JsonSubHeader/constants";
import JsonBody from "./JSONBody/JSONBody";
import {sample1} from "./SampleJSON/jsonsample";

var beautify = require('js-beautify').js;


const isAPiDebugMode = true;
const JsonUtility = () => {
  const [jsonData, setJsonData] = useState();
  const [jsonDataString, setJsonDataString] = useState();
  const [error, setError] = useState();
  const [filteredData, setfilteredData] = useState();
  const [filterKey, setFilterKey] = useState();
  const [addOnType, setAddOnType] = useState();
  const resetAllData = () => {
    setJsonData('');
    setfilteredData(null);
    setError(null);
    setAddOnType(null);
    setFilterKey('');
  }

  const formatData = (jsonData) => {
    console.log('jsonDatajsonData', typeof jsonData, 'Data-->', jsonData)
    setJsonData(jsonData)
    setJsonDataString(jsonData)
    setAddOnType(FORMAT);
    renderjson.set_show_to_level(4)
    renderjson.set_depth_identifier(' > ')
    document.getElementById("renderJson").innerHTML = '';
    document.getElementById("renderJson").appendChild(
      renderjson(jsonData)
    );
  }

  const callApi = (inputUrl) => {
    resetAllData();
    if (isAPiDebugMode && !inputUrl) { // TODO: WILL REMOVE
      formatData(data);
      return;
    }

    // removing last child
    document.getElementById("renderJson").innerHTML = '';
    getApi(inputUrl).then((response) => {
      formatData(response);
    }).catch(e => {
      setError(e);
    })
  }

  const filterData = () => {
    const filterTT = filterKey || 'MilitaryProgramId';
    if (jsonData) {
      const tt = jsonpath.nodes(jsonData, `$..${filterTT}`);
      setfilteredData(tt);
    }
  }

  const addOnAction = (type) => {
    setAddOnType(type)
    debugger
    let obj = {}
    console.log('addOnAction-->jsonDataString', jsonDataString)
    obj.data = jsonDataString;
    // console.log('addOnAction-->jsonData', jsonData)
    console.log('addOnAction-->jsonData', obj, obj.data)
    if (type === FORMAT) {
      formatData(JSON.parse(JSON.stringify(jsonData)));
    } else if (type === CLEAR) {
      resetAllData();
    } else if(type === SAMPLE_JSON) {
      formatData(sample1)
    }
    // const textt = document.getElementById('textarea-input').value;
    // if(type === BEAUTIFY){
    //   document.getElementById('textarea-input').value = JSON.stringify(textt, null, 2)
    // }else if(type === CLEAR) {
    //   document.getElementById('textarea-input').value = ''
    // } else if (type === REMOVE_WHITE_SPACE){
    //   document.getElementById('textarea-input').value = JSON.stringify()
    // }
  }

  const getInputText = (addOnType) => {
    return {
      [BEAUTIFY]: JSON.stringify(jsonData, null, 2),
      [REMOVE_WHITE_SPACE]: JSON.stringify(jsonData),
      [CLEAR]: ''
    }[addOnType]
  }
  return <Row className={'ml-0 mr-0'}>
    <Col xs="12" md="12" className={'mt-4'}>
      <Card>
        <JsonHeader
          callApi={callApi}
          filterKey={filterKey}
          setFilterKey={setFilterKey}
          filterData={filterData}
          filteredData={filteredData}
          jsonData={jsonData}
        />
        <JsonSubHeader addOnAction={addOnAction} addOnType={addOnType}/>
        <CardBody className={'bodySroll'}>
          <Col xs="12" md="12">
              <JsonBody jsonData={jsonData} jsonDataString={jsonDataString} setJsonDataString={setJsonDataString}
                        setJsonData={setJsonData} addOnType={addOnType}/>

              {/*{addOnType !== FORMAT && <Input type="textarea" name="textarea-input" id="textarea-input" rows="20" />}*/}

              {/*</Input>}*/}
              {/*{addOnType !== FORMAT && <div name="jsonDiv" contenteditable="true"  id="jsonDiv" rows="20">*/}
              {/*  <pre>{getInputText(addOnType)}</pre>*/}
              {/*</div>}*/}


              {/*<pre>*/}
              {/*  {renderjson({ hello: [1,2,3,4], there: { a:1, b:2, c:["hello", null] } }, {*/}
              {/*  decodeEntities:false*/}
              {/*}).length}*/}
              {/*</pre
            {/*  {renderjson({ hello: [1,2,3,4], there: { a:1, b:2, c:["hello", null] } }, {*/}
              {/*  decodeEntities:false*/}
              {/*}).length}*/}
              {/*</pre>*/}
              {/*<div>*/}
              {/*  <ReactJson src={{ hello: [1,2,3,4], there: { a:1, b:2, c:["hello", null] } }} />*/}
              {/*</div>}*/}
              {/*  <pre>{ hello: [1,2,3,4], there: { a:1, b:2, c:["hello", null] } }</pre>*/}
              {/*final for format --> <pre>{JSON.stringify(data, , 2)}</pre>*/}


              {/*<JSONPretty id="json-pretty" data={data}></JSONPretty>*/}
            </Col>
        </CardBody>
      </Card>
    </Col>
  </Row>
}

JsonUtility.propTypes = {};

export default JsonUtility;
