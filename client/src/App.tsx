import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Error from "./Pages/Error";
import Footer from "./Components/Footer";
import Gallery from "./Pages/Gallery";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Portfolio from "./Pages/Portfolio";

export default class App extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones";
        return (
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/portfolio" component={Portfolio}/>
                    <Route exact path="/gallery" component={Gallery}/>
                    <Route exact path="/contact" component={Contact}/>
                    <Route component={Error}/>
                </Switch>
                <Footer/>
            </BrowserRouter>
        );
    }
}
