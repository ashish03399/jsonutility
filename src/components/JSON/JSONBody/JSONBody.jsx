import React from 'react';
import PropTypes from 'prop-types';
import {FORMAT} from "../JsonSubHeader/constants";

const JsonBody = props => {
  return (
    <React.Fragment>
      {<div id={'renderJson'} contenteditable="true"  className={props.addOnType === FORMAT ? 'showFormatter' : 'hideFormatter'}/>}
      {/*final for format --> <pre>{JSON.stringify(data, , 2)}</pre>*/}
    </React.Fragment>
  );
};

JsonBody.propTypes = {

};

export default React.memo(JsonBody);
