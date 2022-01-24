import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import Error from "./Pages/Error";
import Gallery from "./Pages/Gallery";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Portfolio from "./Pages/Portfolio";
import Projects from "./Pages/Projects";
import Social from "./Pages/Contact";

export default class App extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones";
        return (
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/portfolio" component={Portfolio}/>
                    <Route exact path="/projects" component={Projects}/>
                    <Route exact path="/gallery" component={Gallery}/>
                    <Route exact path="/contact" component={Social}/>
                    <Route component={Error}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
