import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Button, ButtonGroup, CardFooter, Col, Row} from "reactstrap";
import {subHeaderActions} from "./constants";
import style from './JsonSubHeader.scss'

const JsonSubHeader = (props) => {
  const [first, setFirst] = useState(false);
  const [variation, setVariation] = useState(1);
  const {addOnAction, addOnType} = props;
  return <CardFooter className={'subHeader'}>
    <Row>
      <Col xs="6" sm="12" md="6" xl="6">
        <ButtonGroup className={"addOnHeader"} size="sm">
          {subHeaderActions.map(action => {
            return <Button key={action.key} title={action.title}
                           className={classnames('text-inline ', {'activeAddon': addOnType === action.key})}
                           onClick={() => {
                             addOnAction(action.key)
                           }} outline color="dark">
              {variation === 0 ? <i className="cui-justify-left icons font-1xl d-block"/> : action.name}
            </Button>
          })}
        </ButtonGroup>
      </Col>
    </Row>
  </CardFooter>
}

JsonSubHeader.propTypes = {};

export default React.memo(JsonSubHeader);
