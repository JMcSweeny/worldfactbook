import * as React from 'react';
import styled from 'styled-components';
import ICountry from '../interfaces/ICountry';
import Topic from './Topic';
import { getFlagImage, getMapImage, getKeys } from '../utils';

// Material UI
import AppBar from 'material-ui/AppBar';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';

// Style
const DetailsDiv = styled.div`
	padding: 1em;
`;

const MediaSection = styled.section`
	width: 100%;
	height: 250px;
	display: flex;
	align-items: center;

	@media(max-width: 769px) {
		height: 450px;
		flex-direction: column;
		justify-content: center;
	}
`;

const FlagImg = styled.img`
	height: 150px;
`;

const MapImage = styled.img`
	height: 250px;
	margin-left: 1em;

	@media(max-width: 769px) {
		margin-left: 0;
		margin-top: 1em;
	}
`;

const DetailsSection = styled.section`
	padding: .5em 0;
`;

interface ICountryDetailsProps {
  country: ICountry;
}

interface ICountryDetailsState {
  details: any;
}

export default class CountryDetails extends React.Component<ICountryDetailsProps, ICountryDetailsState> {
  constructor(props: any) {
    super(props);

    this.state = {
      details: null
    };
  }

  private async fetchData(): Promise<void> {
    const response = await fetch(`./dist/data/${this.props.country.code}.json`);
    const details = await response.json();

    this.setState({
      details
    });
  }

  private onBack = () => {
    window.location.hash = '';
  }

  private getTopics = (detailName: string) => {
    return getKeys(this.state.details[detailName]).map(topicName => {
      return <Topic
        key={topicName}
        name={topicName}
        data={this.state.details[detailName][topicName]} />;
    });
  }

  private getDetailsSections() {
    return getKeys(this.state.details).map((detailName, index) => {
      const Topics = this.getTopics(detailName);

      return (
        <DetailsSection key={detailName}>
          <Card initiallyExpanded={index == 0}>
            <CardHeader
              title={detailName}
              actAsExpander={true}
              showExpandableButton={true} />
            <CardText expandable={true}>
              {Topics}
            </CardText>
          </Card>
        </DetailsSection>
      )
    });
  }

  public componentDidMount() {
    this.fetchData();
  }

  public render() {
    if (!this.state.details) {
      return <h1>Loading...</h1>;
    }

    const DetailsSections = this.getDetailsSections();

    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this.onBack}
          iconElementLeft={<IconButton><ArrowBack /></IconButton>}
          title={this.props.country.name}
          zDepth={2} />
        <DetailsDiv>
          <MediaSection>
            <FlagImg src={getFlagImage(this.props.country)} />
            <MapImage src={getMapImage(this.props.country)} />
          </MediaSection>
          {DetailsSections}
        </DetailsDiv>
      </div>
    );
  }
}