import * as React from 'react';
import styled from 'styled-components';
import ICountry from '../interfaces/ICountry';
import * as IDetails from '../interfaces/IDetails';
import Introduction from '../components/Details/Introduction';

interface ICountryDetailsProps {
	country: ICountry;
}

interface ICountryDetailsState {
	details: IDetails.ICountryDetails;
}

const DetailsDiv = styled.div`
	padding: 1em;
`;

const FlagImg = styled.img`
	height: 150px;
	padding: 1em;
`;

const PanelWrapper = styled.div`
	width: 75%;
`;

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

		this.setState({ details });
	}

	public componentDidMount() {
		this.fetchData();
	}

	public render() {
		if(!this.state.details) {
			return <h1>Loading...</h1>;
		}

		let imageSrc = `./dist/images/${this.props.country.code}.gif`;

		return (
			<DetailsDiv>
				<FlagImg src={imageSrc} />
				<PanelWrapper>
					<Introduction Introduction={this.state.details.Introduction}></Introduction>
				</PanelWrapper>
			</DetailsDiv>
		);
	}
}