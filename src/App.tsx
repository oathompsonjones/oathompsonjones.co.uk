import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Social from "./Pages/Contact";
import Error from "./Pages/Error";
import Home from "./Pages/Home";
import Portfolio from "./Pages/Portfolio";
import Projects from "./Pages/Projects";

export default class App extends Component {
    public render() {
        document.title = "oathompsonjones";
        return (
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/portfolio" component={Portfolio} />
                    <Route exact path="/projects" component={Projects} />
                    <Route path="/contact" component={Social} />
                    <Route component={Error} />
                </Switch>
                <Footer />
            </BrowserRouter >
        );
    }
}
