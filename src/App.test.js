import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import App from './App';
let logoImage =
	'https://s3-us-west-2.amazonaws.com/koober/admin/koob/admin-60d326394c3a0.png';

describe('<Logo />', () => {
	it('renders an image', () => {
		const logo = shallow(<App />);

		expect(logo.find('img').prop('src')).toEqual(logoImage);
	});
});
