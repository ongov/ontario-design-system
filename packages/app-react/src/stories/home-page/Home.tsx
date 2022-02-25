import React from 'react';
import './Home.scss';
import HomeBanner from './HomeBanner';
import HomeOverview from './HomeOverview';
import HomeGetStarted from './HomeGetStarted';

const Home = () => (
	<>
		<HomeBanner />
		<HomeOverview />
		<HomeGetStarted />
	</>
);
export default Home;
