import * as React from 'react';
import styled from 'styled-components';
import { getKeys } from '../utils';
import Subheader from './SubHeader';
import { grey800 } from 'material-ui/styles/colors';

// Style
const ContentWrapper = styled.div`
  margin-bottom: 1em;
`;

const SubTopic = styled.span`
  font-weight: bold;
  color: ${grey800};
  margin-right: 5px;
`;

// Component
interface ITopicProps {
  name: string;
  data: any;
}

export default class Topic extends React.Component<ITopicProps, {}> {
  constructor(props) {
    super(props);
  }

  private getContent() {
    if(this.props.data.text) {
      return <ContentWrapper>{this.props.data.text}</ContentWrapper>
    }

    const SubTopics = getKeys(this.props.data).map(key => {
      return <div key={key}><SubTopic>{key}</SubTopic>{this.props.data[key].text}</div>
    });

    return <ContentWrapper>{SubTopics}</ContentWrapper>;
  }

  public render() {
    const Content = this.getContent();

    return (
      <div>
        <Subheader>{this.props.name}</Subheader>
        {Content}
      </div>
    );
  }
}