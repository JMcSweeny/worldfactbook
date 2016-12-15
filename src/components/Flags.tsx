import * as React from 'react';
import styled from 'styled-components';
import ICountry from '../interfaces/ICountry';
import { AppBar, Avatar, List, ListItem } from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';

interface IFlagsProps {
	countries: ICountry[]
}

const FlagsDiv = styled.div`
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	padding-top: 1em;
	background-color: ${grey900};
`;

export default class Flags extends React.Component<IFlagsProps, {}> {
	constructor(props: any) {
		super(props);
	}

	public render() {
		const flags = this.props.countries.map((country: ICountry) => {
			const imageSrc = `./dist/images/${country.code}.gif`;
			const href = `#/${country.code}`;

			return (
				<ListItem
					leftAvatar={<Avatar src={imageSrc} />}
					primaryText={country.name} />
			);
		});

		return (
			<div>
				<AppBar title="World Factbook" />
				<FlagsDiv>
					<List>
						{flags}
					</List>
				</FlagsDiv>
			</div>
		);
	}
}