import ReactGA from 'react-ga4';

export const initGA = () => {
    ReactGA.initialize('G-D369625P1R');
};

export const trackPageView = (url) => {
    ReactGA.send({ hitType: 'pageview', page: url });
};
