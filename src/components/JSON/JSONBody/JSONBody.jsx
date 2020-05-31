import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Input} from "reactstrap";

import {ASC, BEAUTIFY, EDIT, FORMAT, REMOVE_WHITE_SPACE} from "../JsonSubHeader/constants";
import JSONEditorReact from "../JSONEditorReact/JSONEditorReact";
import style from './JSONBody.scss'
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

const JsonBody = props => {
  let inputVal = '';
  const schema = {
    title: 'Example Schema',
    type: 'object',
    properties: {
      array: {
        type: 'array',
        items: {
          type: 'number'
        }
      },
      boolean: {
        type: 'boolean'
      },
      number: {
        type: 'number'
      }
    },
    required: ['array', 'string', 'boolean']
  };

  const modes = ['tree', 'form', 'view', 'code', 'text'];

  const handleFinalValue = () => {
    let value = props.jsonDataString;
    if (value) {
      try {
        value = JSON.parse(value);

      } catch (e) {
        if (value.replace) {
          value = value.replace(/(\w+:)|(\w+ :)/g, function (matchedStr) {
            return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
          });
          value = JSON.parse(value);
        }
      } finally {
        props.setJsonData(value);
      }
    }
  }


  const handleInputOnBlur = (e) => {
    let value = inputVal;
    if (value) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        if (value && value.replace) {
          value = value.replace(/(\w+:)|(\w+ :)/g, function (matchedStr) {
            return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
          });
          try {
            value = JSON.parse(value);
          } catch (e) {
            console.log(e);
          }
        }
      } finally {
        props.setJsonData(value);
        props.setJsonDataString(inputVal);
      }
    }
  }

  const handleInputFromBeautify = (inputValue) => {
    let value = inputValue;
    if (value) {
      inputVal = value;
      props.setJsonData(value);
    }
  }

  const handleInputValue = (e) => {
    let value = e.target.value;
    props.setJsonDataString(value);
  }

  // typeof props.jsonDataString === 'object' ? JSON.stringify(props.jsonDataString) : props.jsonDataString

  const getJsonData = (json, src) => {
    if(typeof json === 'string' && json && json.length > 100){
      try{
        json = JSON.parse(json)
      }catch(e){}
    }
    if (json) {
      if (typeof json === 'object') {
        // return src === BEAUTIFY ? JSON.stringify(json, null, 2) : JSON.stringify(json)
        return {
          [BEAUTIFY]: () => JSON.stringify(json, null, 2),
          [REMOVE_WHITE_SPACE]: () => JSON.stringify(json)
        }[src]();
      }
      return json;
    }
    return '';
  }

  return (
    <React.Fragment>
      {<div id={'renderJson'}
            className={props.addOnType === FORMAT ? 'showFormatter' : 'hideFormatter'}/>}

      {(!props.addOnType || props.addOnType === BEAUTIFY) &&
      <JSONEditorReact
        schema={schema}
        text={getJsonData(props.jsonData, BEAUTIFY)}
        mode={modes[3]}
        modes={modes}
        // indentation={4}
        onChangeText={(text) => {
          handleInputFromBeautify(text)
        }}
        onBlur={() => {
          handleInputOnBlur()
        }}
      />}
      {(props.addOnType === REMOVE_WHITE_SPACE) &&
      <Input
        type="textarea"
        className={'preCss beatuyfyMode'}
        value={getJsonData(props.jsonDataString, REMOVE_WHITE_SPACE)}
        onChange={handleInputValue}
        onBlur={handleFinalValue}
        onFocus={() => {
          console.log('Alert()')
        }}
        name="textarea-input"
        id="textarea-input11"
        spellCheck="false"
        placeholder="Paste your json here..."
      />}
    </React.Fragment>
  );
};

JsonBody.propTypes = {};

export default React.memo(JsonBody);
