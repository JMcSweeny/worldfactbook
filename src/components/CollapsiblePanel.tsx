import * as React from 'react';
import styled from 'styled-components';

interface ICollapsiblePanelProps {
  title: string;
}

interface ICollapsiblePanelState {
  open: boolean;
}

const PanelDiv = styled.div`
  border: 1px solid ${props => props.theme.accent};
  border-radius: 3px;
`;

const PanelHeader = styled.header`
  height: 35px;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.lightAccent};
  color: ${props => props.theme.accent};
  cursor: pointer;
`;

const PanelToggle = styled.div`
  width: 40px;
  text-align: center;
  font-size: ${props => props.open ? '2rem' : '1.5rem'};
`;

const PanelTitle = styled.div`
  font-size: 1.1rem;
`;

const PanelContent = styled.div`
  display: ${props => props.open ? 'block' : 'none'};
  padding: 1em;
`;

export default class CollapsiblePanel extends React.Component<ICollapsiblePanelProps, ICollapsiblePanelState> {
  constructor(props: any) {
    super(props);

    this.toggleOpen = this.toggleOpen.bind(this);

    this.state = {
      open: false
    };
  }

  private toggleOpen(): void {
    this.setState({
      open: !this.state.open
    });
  }

  public render() {
    return (
      <PanelDiv>
        <PanelHeader onClick={this.toggleOpen}>
          <PanelToggle open={this.state.open}>{this.state.open ? '-' : '+'}</PanelToggle>
          <PanelTitle>{this.props.title}</PanelTitle>
        </PanelHeader>
        <PanelContent open={this.state.open}>
          {this.props.children}
        </PanelContent>
      </PanelDiv>
    )
  }
}