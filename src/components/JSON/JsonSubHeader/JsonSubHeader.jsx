import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup, CardFooter, Col, Row} from "reactstrap";
import {FORMAT, subHeaderActions} from "./constants";
import style from './JsonSubHeader.scss'

const JsonSubHeader = (props) => {
  const [first, setFirst] = useState(false);
  const [variation, setVariation] = useState(1);
  const { addOnAction, addOnType } = props;
  console.log('addOnType',addOnType)
  return <CardFooter className={'subHeader'}>
    <Row>
      <Col xs="6" sm="4" md="1" xl="6">
        <ButtonGroup size="sm">
          {subHeaderActions.map(action=>{
            debugger
            console.log('addOnType11',addOnType)
            const activeClass  = (addOnType === action.key) && 'activeAddon';
            return <Button title={action.title} className={'text-inline ' +activeClass} onClick={() => {addOnAction(action.key)}} outline color="dark">
              {variation === 0 ? <i className="cui-justify-left icons font-1xl d-block" /> : action.name}
            </Button>
          })}
        </ButtonGroup>
      </Col>
    </Row>
  </CardFooter>
}

JsonSubHeader.propTypes = {

};

export default React.memo(JsonSubHeader);
