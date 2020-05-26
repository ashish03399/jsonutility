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

var beautify = require('js-beautify').js;



const JsonUtility = () => {
  const [jsonData, setJsonData] = useState();
  const [filteredData, setfilteredData] = useState();
  const [filterKey, setFilterKey] = useState();
  const getJsonData = () => {
    getApi('./thirdParty/axios/mockData/data.js').then((response) => {
      setJsonData(data)
    }).catch(e => {
      // const res = beautify(JSON.stringify(data))
      // console.log(renderjson)
      window.renderjson = renderjson;
      window.ReactHtmlParser = ReactHtmlParser;
      //{ hello: [1,2,3,4], there: { a:1, b:2, c:["hello", null] } }
      renderjson.set_show_to_level(4)
      renderjson.set_depth_identifier(' > ')
      const res = renderjson({
        hello: [1, "2a", "3a", 4],
        there: {a: 1, b: {"meddile": {'a2a': 'a2aV'}}, c: ["hello11", {helloaguan: [{aa: "aaV"}, {bb: "bbV"}]}]}
      });
      document.getElementById("reactTest").appendChild(
        res
      );
      setJsonData(data)
    })
  }

  const filterData = () => {
    const filterTT = filterKey || 'MilitaryProgramId';
    if(jsonData)
      setfilteredData(jsonpath.nodes(jsonData, `$..${filterTT}`));
  }

  return <Row>
    <Col xs="12" md="11" className={'mt-4'}>
      <Card>
        <JsonHeader
          getData={getJsonData}
          filterKey={filterKey}
          setFilterKey={setFilterKey}
          filterData={filterData}
          filteredData={filteredData}
          dataState={jsonData}
        />
        <JsonSubHeader />
        <CardBody>
          <Col xs="12" md="12">
            {/*<Input type="textarea" name="textarea-input" id="textarea-input" rows="20" value={dataState}*/}
            <div id={'reactTest'}>

            </div>
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
            {/*</div>*/}
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
