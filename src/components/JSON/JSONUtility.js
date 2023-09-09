import React, {useState} from 'react';
import * as jsonpath from 'jsonpath';
import {renderjson} from './renderjson';
import {
  CardBody,
  Card,
  Col,
  Row, ListGroupItem,
} from 'reactstrap';
import styles from './styles.scss'
import {getApi} from '../../thirdParty/axios/axisConfig'
import JsonHeader from "./JsonHeader/JsonHeader";
import JsonSubHeader from "./JsonSubHeader/JsonSubHeader";
import {CLEAR, FORMAT, REMOVE_WHITE_SPACE, SAMPLE_JSON} from "./JsonSubHeader/constants";
import JsonBody from "./JSONBody/JSONBody";
import {sample1} from "./SampleJSON/jsonsample";
import {FETCH_JSON_DATA, FETCH_JSON_DATA_FAILED, FETCH_JSON_DATA_SUCCESS} from "./Constant";

const JsonUtility = () => {
  const [jsonData, setJsonData] = useState();
  const [apiStatus, setApiStatus] = useState();
  const [jsonDataString, setJsonDataString] = useState();
  const [error, setError] = useState();
  const [filteredData, setfilteredData] = useState();
  const [filteredKey, setFilteredKey] = useState();
  const [filterKey, setFilterKey] = useState();
  const [addOnType, setAddOnType] = useState();
  const resetAllData = () => {
    console.log('resetAllDataCalled');
    setJsonData('');
    setJsonDataString('');
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
    renderjson.setClickEvent((keyName) => {
      alert(keyName);
    })
    renderjson.set_depth_identifier(' > ')
    document.getElementById("renderJson").innerHTML = '';
    document.getElementById("renderJson").appendChild(
      renderjson(jsonData)
    );
  }

  const callApi = (inputUrl) => {
    resetAllData();
    setApiStatus(FETCH_JSON_DATA);

    // removing last child
    document.getElementById("renderJson").innerHTML = '';
    getApi(inputUrl).then((response) => {
      setApiStatus(FETCH_JSON_DATA_SUCCESS);
      formatData(response);
    }).catch(e => {
      setApiStatus(FETCH_JSON_DATA_FAILED);
      setError(e);
      setTimeout(()=>{
        setError();
      }, 3000)
    })
  }

  const filterData = () => {
    if (jsonData) {
      const tt = jsonpath.nodes(jsonData, `$..${filterKey}`);
      setFilteredKey(filterKey);
      setfilteredData(tt);
    }
  }

  const getParseJson = (json) => {
    try {
      json = JSON.parse(json);
    } catch (e) {
      json = json.replace(/(\w+:)|(\w+ :)/g, function (matchedStr) {
        return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
      });
      json = JSON.parse(json);
    } finally {
      return json;
    }
  }

  const addOnAction = (type) => {
    if (type === FORMAT) {
      const parsedJson = getParseJson(jsonData)
      if(typeof parsedJson === 'object'){
        formatData(getParseJson(jsonData));
      }else{
        alert('Invalid JSON')
      }

      // formatData(jsonData);
    } else if (type === CLEAR) {
      resetAllData();
    } else if (type === SAMPLE_JSON) {
      formatData(sample1)
    } else if (type === REMOVE_WHITE_SPACE) {
      setJsonDataString(jsonData)
      setAddOnType(type)
    }else{
      setAddOnType(type)
    }
  }

  return <Row className={'ml-0 mr-0'}>
    <Col xs="12" md="12" className={'mt-2'}>
      <Card className={'mb-1'}>
        <JsonHeader
          callApi={callApi}
          filterKey={filterKey}
          setFilterKey={setFilterKey}
          filterData={filterData}
          filteredData={filteredData}
          jsonData={jsonData}
          filteredKey={filteredKey}
          apiStatus={apiStatus}
        />
        {error && <ListGroupItem className={'errorAnimation'} action color="danger">{JSON.stringify(error.message)}</ListGroupItem>}
        <JsonSubHeader
          addOnAction={addOnAction}
          addOnType={addOnType}/>
        <CardBody className={'bodySroll'}>
          <Col xs="12" md="12" className={'jsonBodyContainer'}>
            <JsonBody
              jsonData={jsonData}
              jsonDataString={jsonDataString}
              setJsonDataString={setJsonDataString}
              setJsonData={setJsonData}
              addOnType={addOnType}/>
          </Col>
        </CardBody>
      </Card>
    </Col>
  </Row>
}

JsonUtility.propTypes = {};

export default JsonUtility;
