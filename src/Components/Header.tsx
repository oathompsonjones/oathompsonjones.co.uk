import "./Header.css";
import React, { Component } from "react";
import Discord from "../Images/Social Logos/Discord.png";
import Facebook from "../Images/Social Logos/Facebook.png";
import GitHub from "../Images/Social Logos/GitHub.png";
import Instagram from "../Images/Social Logos/Instagram.png";
import { Link } from "react-router-dom";
import LinkedIn from "../Images/Social Logos/LinkedIn.png";
import Twitter from "../Images/Social Logos/Twitter.png";

type SocialSites = ("discord" | "facebook" | "gitHub" | "instagram" | "linkedIn" | "twitter");
const socialLogos: { [s in SocialSites]: string } = {
    discord: Discord,
    facebook: Facebook,
    gitHub: GitHub,
    instagram: Instagram,
    linkedIn: LinkedIn,
    twitter: Twitter
};

class SocialNavLink extends Component {
    public constructor(public props: { link: string; site: SocialSites; }) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <a id={this.props.site.toLowerCase()} className="nav-social-link" href={this.props.link}>
                <img src={socialLogos[this.props.site]} alt={this.props.site} />
                <h3>{this.props.site.split("").map((x, i) => i === 0 ? x.toUpperCase() : x).join("")}</h3>
            </a>
        );
    }
}

export default class Header extends Component {
    public render(): JSX.Element {
        return (
            <div id="header">
                <div id="nav">
                    <Link className="nav-list-item" to="/"><h2>Home</h2></Link>
                    <Link className="nav-list-item" to="/portfolio"><h2>Portfolio</h2></Link>
                    <Link className="nav-list-item" to="/projects"><h2>Projects</h2></Link>
                    <div id="nav-dropdown">
                        <Link className="nav-list-item" to="/contact"><h2>Contact</h2></Link>
                        <div id="nav-dropdown-content">
                            <SocialNavLink site="discord" link="https://discord.com/users/310145094684639235" />
                            <SocialNavLink site="twitter" link="https://twitter.com/oathompsonjones" />
                            <SocialNavLink site="facebook" link="https://facebook.com/oathompsonjones" />
                            <SocialNavLink site="instagram" link="https://instagram.com/oathompsonjones" />
                            <SocialNavLink site="gitHub" link="https://github.com/oathompsonjones" />
                            <SocialNavLink site="linkedIn" link="https://linkedin.com/in/oathompsonjones" />
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
