import * as React from 'react';
import styled from 'styled-components';
import Flags from './Flags';
import CountryDetails from './CountryDetails';
import ICountry from '../interfaces/ICountry';
import { findCountryByCode } from '../utils';

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { grey100 } from 'material-ui/styles/colors';

// Style
const AppWrapper = styled.div`
  background-color: ${grey100};
  width: 100%;
  height: 100%;
  overflow: auto;
`;

interface IAppState {
  route: string;
  countries: ICountry[];
  isMobile: boolean;
  isTablet: boolean
}

interface IMediaQuery {
  mQL: MediaQueryList;
  propName: string;
}

export default class App extends React.Component<{}, IAppState> {
  private mediaQueries: IMediaQuery[];

	constructor(props: any) {
		super(props);

    this.handleMediaChange = this.handleMediaChange.bind(this);
    this.handleHashChange = this.handleHashChange.bind(this);

		let mqlMobile = window.matchMedia('(max-width: 769px)');
    let mqlTablet = window.matchMedia('(max-width: 1025px)');

    this.mediaQueries = [
      {
        mQL: mqlMobile,
        propName: 'isMobile'
      },
      {
        mQL: mqlTablet,
        propName: 'isTablet'
      }
    ];

		this.state = {
      route: this.getRoute(),
      countries: null,
      isMobile: mqlMobile.matches,
      isTablet: mqlTablet.matches
    };
	}

	private handleMediaChange(mql) {
    let newState = {...this.state};

    for(let mediaQuery of this.mediaQueries) {
      newState[mediaQuery.propName] = mediaQuery.mQL.matches;
    }

		this.setState(newState);
	}

  private handleHashChange() {
      this.setState({
        ...this.state,
        route: this.getRoute()
      });
  }

  private getRouteComponent(route: string): JSX.Element {
    if(route == '/') {
      return <Flags {...this.state} />;
    }

    let country = findCountryByCode(this.state.countries, this.state.route);

    return <CountryDetails country={country} />;
  }



  private getRoute() {
    let route = window.location.hash.substr(1);

    if(route == '') {
      return '/';
    }

    return route;
  }

  private async fetchData(): Promise<void> {
		const response = await fetch('./dist/data/countries.json');
		const countries = await response.json();

		this.sortCountries(countries);

		this.setState({ 
      ...this.state,
      countries 
    });
	}

	private sortCountries(countries: ICountry[]): void {
		countries.sort((a: ICountry, b: ICountry) => {
				if (a.name < b.name) {
					return -1;
				}

				if (a.name > b.name) {
					return 1;
				}

				return 0;
			});
	}

	public componentDidMount() {
		window.addEventListener('hashchange', this.handleHashChange);
    
    for(let mediaQuery of this.mediaQueries) {
      mediaQuery.mQL.addListener(this.handleMediaChange);
    }

    this.fetchData();
	}

	public componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange);

		for(let mediaQuery of this.mediaQueries) {
      mediaQuery.mQL.removeListener(this.handleMediaChange);
    }
	}

	public render() {
    if(!this.state.countries) {
      return <div>Loading...</div>;
    }

    const RouteComponent = this.getRouteComponent(this.state.route);

    return (
      <MuiThemeProvider>
        <AppWrapper>
          {RouteComponent}
        </AppWrapper>
      </MuiThemeProvider>
    );
	}
}