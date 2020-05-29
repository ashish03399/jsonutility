import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import {Input} from "reactstrap";

import {BEAUTIFY, EDIT, FORMAT, REMOVE_WHITE_SPACE} from "../JsonSubHeader/constants";
import JSONEditorReact from "../JSONEditorReact/JSONEditorReact";


const JsonBody = props => {
  const [jsonInput, setJsonInput] = useState();
  useEffect(() => {
    // const container = document.getElementById("jsoneditor")
    // const options = {}
    // const editor = new JSONEditor(container, options)
    //
    // // set json
    // const initialJson = {
    //   "Array": [1, 2, 3],
    //   "Boolean": true,
    //   "Null": null,
    //   "Number": 123,
    //   "Object": {"a": "b", "c": "d"},
    //   "String": "Hello World"
    // }
    // editor.set(initialJson)
    //
    // // get json
    // const updatedJson = editor.get()
  })

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

  const json = {
    'array': [1, 2, 3],
    'boolean': true,
    'null': null,
    'number': 'four',
    'object': {'a': 'b', 'c': 'd'},
    'string': 'Hello World'
  };

  const modes = ['tree', 'form', 'view', 'code', 'text'];

  const handleInputValue = (e) => {
    debugger
    let value = e.target.value;
    window.asparse = qs.parse;
    window.asstringify = qs.stringify;
    try{
      value = JSON.parse(value);
    }catch(e){
      value = value.replace(/(\w+:)|(\w+ :)/g, function(matchedStr) {
        return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
      });
      value = JSON.parse(value);
    }finally {
      props.setJsonData(value);
    }
  }

  const handleInputStringValue = (e) => {
    const value = e.target.value && e.target.value;
      props.setJsonDataString(value)
  }

  return (
    <React.Fragment>
      {<div id={'renderJson'} contenteditable="true"  className={props.addOnType === FORMAT ? 'showFormatter' : 'hideFormatter'}/>}
      {props.addOnType === EDIT && props.jsonData && <JSONEditorReact
        schema={schema}
        text={JSON.stringify(props.jsonData, null, 2)}
        mode={modes[0]}
        modes={modes}
        indentation={4}
        onChangeText={() => {
        }}
        onModeChange={() => {
        }}
      />}
      {(!props.addOnType || props.addOnType === REMOVE_WHITE_SPACE) && <Input type="textarea" value={typeof props.jsonData === 'object' ? JSON.stringify(props.jsonData) : props.jsonData} onChange={handleInputValue} name="textarea-input" id="textarea-input" spellcheck="false" rows="20" placeholder="Paste your json here..."/>}
      {props.addOnType === BEAUTIFY && <Input type="textarea" value={props.jsonData && JSON.stringify(props.jsonData, null, 2)} onChange={handleInputValue} name="textarea-input" id="textarea-input" spellcheck="false" rows="20" placeholder="Paste your json here..."/>}
    </React.Fragment>
  );
};

JsonBody.propTypes = {};

export default React.memo(JsonBody);
