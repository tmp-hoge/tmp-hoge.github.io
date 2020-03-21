/* eslint-disable import/first */

/* P O L Y F I L L S */
import "./util/polyfills"; // eslint-disable-line
/* L I B R A R I E S */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
/* A U S P I C E   I M P O R T S */
import configureStore from "./store";
import { initialiseGoogleAnalyticsIfRequired } from "./util/googleAnalytics";
/* S T Y L E S H E E T S */
import "font-awesome/css/font-awesome.css";
import "leaflet/dist/leaflet.css";
import "./css/global.css";
import "./css/browserCompatability.css";
import "./css/bootstrapCustomized.css";
import "./css/static.css";
import "./css/notifications.css";
import "./css/boxed.css";
import "./css/select.css";

/* FONTS */
import 'typeface-lato';

const store = configureStore();

/* set up non-redux state storage for the animation - use this conservitavely! */
if (!window.NEXTSTRAIN) {window.NEXTSTRAIN = {};}

/* google analytics */
initialiseGoogleAnalyticsIfRequired();

/* Using React Hot Loader 4 https://github.com/gaearon/react-hot-loader */

const renderApp = () => {
  const Root = require("./root").default; // eslint-disable-line global-require
  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.getElementById('root')
  );
};

renderApp();

