import * as PropTypes from 'prop-types';
import * as React from 'react';

class JSONPretty extends React.Component {

  render() {
    const {
      json, data, replacer, space, themeClassName, theme, onJSONPrettyError, onError, silent,
      mainStyle,
      keyStyle,
      valueStyle,
      stringStyle,
      booleanStyle,
      errorStyle,
      ...rest
    } = this.props;

    const styles = {
      mainStyle,
      keyStyle,
      valueStyle,
      stringStyle,
      booleanStyle,
      errorStyle
    };
    let obj = data || json;

  }
}

JSONPretty.propTypes = {
  data: PropTypes.any,
  json: PropTypes.any,
  replacer: PropTypes.func,
  silent: PropTypes.bool,
  space: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  theme: PropTypes.object,
  themeClassName: PropTypes.string,
  onJSONPrettyError: PropTypes.func
};

JSONPretty.defaultProps = {
  data: '',
  json: '',
  silent: true,
  space: 2,
  themeClassName: '__json-pretty__',
};

export default JSONPretty;
