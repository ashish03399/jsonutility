import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup, CardFooter, Col, Row} from "reactstrap";

const JsonSubHeader = () => {
  const [first, setFirst] = useState(false);

  return <CardFooter className={'subHeader'}>
    <Row>
      <Col xs="6" sm="4" md="1" xl="2">
        <ButtonGroup size="sm">
          <Button outline color="dark">
            <i onClick={() => {
              {
              }
            }} className="cui-justify-left icons font-1xl d-block"></i>
          </Button>
          <Button outline color="dark">
            <i onClick={() => {
              {
              }
            }} className="cui-sort-ascending icons font-1xl d-block"></i>
          </Button>
          <Button outline color="dark">
            <i onClick={() => {
              {
              }
            }} className="cui-sort-descending icons font-1xl d-block"></i>
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
  </CardFooter>
}

JsonSubHeader.propTypes = {

};

export default JsonSubHeader;
