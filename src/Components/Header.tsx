import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Discord from "../Images/Social Logos/Discord.png";
import Facebook from "../Images/Social Logos/Facebook.png";
import GitHub from "../Images/Social Logos/GitHub.png";
import Instagram from "../Images/Social Logos/Instagram.png";
import LinkedIn from "../Images/Social Logos/LinkedIn.png";
import Twitter from "../Images/Social Logos/Twitter.png";

type socialSites = ("Discord" | "Facebook" | "GitHub" | "LinkedIn" | "Instagram" | "Twitter");
const socialLogos: { [s in socialSites]: string } = { Discord, Facebook, GitHub, LinkedIn, Instagram, Twitter };

class SocialNavLink extends Component {
    constructor(public props: { site: socialSites; link: string; }) {
        super(props);
    }

    public render() {
        return (
            <a id={this.props.site.toLowerCase()} className="nav-social-link" href={this.props.link}>
                <img src={socialLogos[this.props.site]} alt={this.props.site} />
                <h3>{this.props.site}</h3>
            </a>
        );
    }
}

export default class Header extends Component {
    public render() {
        return (
            <div id="header">
                <div id="nav">
                    <Link className="nav-list-item" to="/"><h2>Home</h2></Link>
                    <Link className="nav-list-item" to="/portfolio"><h2>Portfolio</h2></Link>
                    <Link className="nav-list-item" to="/projects"><h2>Projects</h2></Link>
                    <div id="nav-dropdown">
                        <Link className="nav-list-item" to="/contact"><h2>Contact</h2></Link>
                        <div id="nav-dropdown-content">
                            <SocialNavLink site="Discord" link="https://discord.com/users/310145094684639235" />
                            <SocialNavLink site="Twitter" link="https://twitter.com/oathompsonjones" />
                            <SocialNavLink site="Facebook" link="https://facebook.com/oathompsonjones" />
                            <SocialNavLink site="Instagram" link="https://instagram.com/oathompsonjones" />
                            <SocialNavLink site="GitHub" link="https://github.com/oathompsonjones" />
                            <SocialNavLink site="LinkedIn" link="https://linkedin.com/in/oathompsonjones" />
                        </div>
                    </div>
                </div>

                <div id="nav-mobile">
                    <div id="nav-dropdown">
                        <Link to=""><h2>☰</h2></Link>
                        <div id="nav-dropdown-content">
                            <Link className="nav-list-item" to="/"><h2>Home</h2></Link>
                            <Link className="nav-list-item" to="/portfolio"><h2>Portfolio</h2></Link>
                            <Link className="nav-list-item" to="/projects"><h2>Projects</h2></Link>
                            <Link className="nav-list-item" to="/contact"><h2>Contact</h2></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
