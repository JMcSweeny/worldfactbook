import * as React from 'react';
import * as LazyLoad from 'react-lazy-load';
import styled, { keyframes } from 'styled-components';
import ICountry from '../interfaces/ICountry';
import { findCountryByName } from '../utils';
import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';

// Style
const FlagsDiv = styled.div`
	width: 100%;
	padding-top: 60px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const FadeLazyLoad = styled(LazyLoad)`
	* {
		animation: ${fadeIn} .5s ease-in;
	}
`;

const CountryGridTile = styled(GridTile)`
	cursor: pointer;
`;

// Component
interface IFlagsState {
	searchOpen: boolean;
}

interface IFlagsProps {
	isMobile: boolean;
	isTablet: boolean;
	countries: ICountry[];
}

export default class Flags extends React.Component<IFlagsProps, IFlagsState> {
	constructor(props: any) {
		super(props);

		this.state = {
			searchOpen: false
		};
	}

	private getImageSrc = (country: ICountry): string => {
		return `./dist/images/${country.code}.gif`;
	}
	
	private onCountryClick = (country: ICountry): void => {
		window.location.hash = country.code;
	}
	
	private handleSearch = value => {
		let country = findCountryByName(this.props.countries, value);

		if(country != null) {
			this.onCountryClick(country);
		}
	}

	private handleSearchClose = () => {
		this.setState({
			searchOpen: false
		});
	}

	private handleSearchOpen = () => {
		this.setState({
			searchOpen: true
		});
	}

	private getGridCols = () => {
		if(this.props.isMobile) {
			return 1;
		}

		if(this.props.isTablet) {
			return 2;
		}

		return 4;
	}

	public render() {
		const gridCols = this.getGridCols();
		const offset = this.props.isMobile ? 400 : 1000;

		const flags = this.props.countries.map(country =>
			<FadeLazyLoad height={200} offset={offset} key={country.code}>
				<CountryGridTile title={country.name} onClick={() => this.onCountryClick(country)}>
						<img src={this.getImageSrc(country)} />
				</CountryGridTile>
			</FadeLazyLoad>
		);
	
		return (
			<div>
				<AppBar
					style={{position:'fixed'}}
					title="World Factbook"
					zDepth={2}
					showMenuIconButton={false}
					iconElementRight={<IconButton><SearchIcon /></IconButton>}
					onRightIconButtonTouchTap={this.handleSearchOpen} />
				<FlagsDiv>
					<GridList cellHeight={200} cols={gridCols} padding={0}>
						{flags}
					</GridList>
				</FlagsDiv>
				<Dialog
          title="Search Countries"
          actions={[<FlatButton label="Cancel" onTouchTap={this.handleSearchClose} />]}
          modal={false}
          open={this.state.searchOpen}
          onRequestClose={this.handleSearchClose} >
          <AutoComplete
						hintText="Country Name"
						dataSource={this.props.countries.map(c => c.name)}
						onNewRequest={this.handleSearch}
						floatingLabelText="Country Name"
						fullWidth={true} />
        </Dialog>
			</div>
		);
	}
}