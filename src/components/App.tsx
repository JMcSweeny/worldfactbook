import * as React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Flags from './Flags';
import CountryDetails from './CountryDetails';
import ICountry from '../interfaces/ICountry';

interface IAppState {
  route: string;
  countries: ICountry[];
}

export default class App extends React.Component<{}, IAppState> {
	constructor(props: any) {
		super(props);

		this.state = {
      route: this.getRoute(),
      countries: null
    };
	}

  private getRouteComponent(route: string): JSX.Element {
    if(route == '/') {
      return <Flags countries={this.state.countries} />;
    }

    let country = this.findCountryByCode(this.state.route);

    return <CountryDetails country={country} />;
  }

  private findCountryByCode(code: string): ICountry {
    for(let country of this.state.countries) {
      if(country.code == code) {
        return country;
      }
    }
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
		window.addEventListener('hashchange', () => {
      this.setState({
        ...this.state,
        route: this.getRoute()
      });
    });

    this.fetchData();
	}

	public render() {
    if(!this.state.countries) {
      return <div>Loading...</div>;
    }

    const RouteComponent = this.getRouteComponent(this.state.route);

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        {RouteComponent}
      </MuiThemeProvider>
    );
	}
}