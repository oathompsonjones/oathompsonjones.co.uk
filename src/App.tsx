import "./App.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import Error from "./Pages/Error";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Portfolio from "./Pages/Portfolio";
import Projects from "./Pages/Projects";
import Social from "./Pages/Contact";

export default class App extends Component {
    public render(): JSX.Element {
        document.title = "oathompsonjones";
        return (
            <HashRouter>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/portfolio" component={Portfolio} />
                    <Route exact path="/projects" component={Projects} />
                    <Route exact path="/contact" component={Social} />
                    <Route component={Error} />
                </Switch>
                <div style={{ height: 0.01 }} />
            </HashRouter>
        );
    }
}
