export const FORMAT = 1;
export const BEAUTIFY = 2;
export const REMOVE_WHITE_SPACE = 3;
export const CLEAR = 4;
export const ASC = 5;
export const DESC = 6;
export const SAMPLE_JSON = 7;
export const EDIT = 8;
export const subHeaderActions = [
  {
    key: FORMAT,
    name: 'Tree',
    title: 'Show Data in tree format',
    isMobile:true
  }, {
    key: BEAUTIFY,
    name: 'Beautify',
    title: 'Only formatted data',
    isMobile:true
  }, {
    key: REMOVE_WHITE_SPACE,
    name: 'Remove White Space',
    title: 'Remove white space from JSON',
    isMobile:true
  }, {
    key: CLEAR,
    name: 'Clear',
    title: 'Remove all data',
    isMobile:true
  }, {
    key: SAMPLE_JSON,
    name: 'Sample JSON',
    title: 'Get Sample data',
    isMobile:true
  }
]

const demo =  [{
  key: ASC,
  name: 'Ascending',
  title: 'Ascending',
  isMobile:true
}, {
  key: DESC,
  name: 'Descending',
  title: 'Descending',
  isMobile:true
}, {
  key: EDIT,
  name: 'Advance Editable',
  title: 'Advance Editable',
  isMobile:true
}]
