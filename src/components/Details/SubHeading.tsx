import * as React from 'react';
import styled from 'styled-components';

const SubHeading = styled.h3`
  color: ${props => props.theme.main};
  padding: 0;
  margin: 0;
`;

export default props => <SubHeading>{props.children}</SubHeading>;