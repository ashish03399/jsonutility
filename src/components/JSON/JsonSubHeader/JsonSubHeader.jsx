import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup, CardFooter, Col, Row} from "reactstrap";
import {FORMAT, subHeaderActions} from "./constants";


const JsonSubHeader = (props) => {
  const [first, setFirst] = useState(false);
  const [variation, setVariation] = useState(1);
  const { addOnAction } = props;
  return <CardFooter className={'subHeader'}>
    <Row>
      <Col xs="6" sm="4" md="1" xl="6">
        <ButtonGroup size="sm">
          {subHeaderActions.map(action=>{
            return <Button title={action.name} onClick={() => {addOnAction(action.key)}} outline color="dark">
              {variation === 0 ? <i className="cui-justify-left icons font-1xl d-block" /> : action.name}
            </Button>
          })}
          {/*<Button title={"format"} outline color="dark">*/}
          {/*  {variation === 0 ? <i onClick={() => {addOnAction(FORMAT)}} className="cui-justify-left icons font-1xl d-block" /> : 'Format'}*/}
          {/*</Button>*/}
          {/*<Button title="beautify" outline color="dark">*/}
          {/*  {variation === 0 ? <i onClick={() => {addOnAction(BEAUTIFY)}} className="cui-cui-sort-ascending icons font-1xl d-block" /> : 'Remove White Space'}*/}
          {/*</Button>*/}
          {/*<Button title="beautify" outline color="dark">*/}
          {/*  {variation === 0 ? <i onClick={() => {addOnAction(REMOVE_WHITE_SPACE)}} className="cui-cui-sort-ascending icons font-1xl d-block" /> : 'Clear'}*/}
          {/*</Button>*/}
          {/*<Button title="beautify" outline color="dark">*/}
          {/*  {variation === 0 ? <i onClick={() => {addOnAction(CLEAR)}} className="cui-cui-sort-ascending icons font-1xl d-block" /> : 'Ascending'}*/}
          {/*</Button>*/}
          {/*<Button title="remove white space" outline color="dark">*/}
          {/*  {variation === 0 ? <i onClick={() => {addOnAction(ASC)}} className="cui-cui-sort-ascending icons font-1xl d-block" /> : 'Desending'}*/}
          {/*</Button>*/}
          {/*<Button title="beautify" outline color="dark">*/}
          {/*  {variation === 0 ? <i onClick={() => {addOnAction(DESC)}} className="cui-cui-sort-ascending icons font-1xl d-block" /> : 'Beautify'}*/}
          {/*</Button>*/}
        </ButtonGroup>
      </Col>
    </Row>
  </CardFooter>
}

JsonSubHeader.propTypes = {

};

export default JsonSubHeader;
