import * as React from 'react';
import Subheader from 'material-ui/Subheader';

const style = {
  paddingLeft: 0,
  lineHeight: '30px',
  fontWeight: 400
};

const StyledSubheader = props => <Subheader {...props} style={style}>{props.children}</Subheader>;

export default StyledSubheader;