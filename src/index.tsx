import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'whatwg-fetch';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App';

injectTapEventPlugin();

ReactDOM.render(
	<App />,
  document.getElementById('root')
);