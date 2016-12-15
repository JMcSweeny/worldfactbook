import * as React from 'react';
import * as IDetails from '../../interfaces/IDetails';
import CollapsiblePanel from '../CollapsiblePanel';
import SubHeading from './SubHeading';

interface IIntroductionProps {
  Introduction: IDetails.IIntroduction;
}

const Introduction = (props: IIntroductionProps) => {
  return (
    <CollapsiblePanel title="Introduction">
      <SubHeading>Background</SubHeading>
      <p>{props.Introduction.Background.text}</p>
    </CollapsiblePanel>
  );
}

export default Introduction;