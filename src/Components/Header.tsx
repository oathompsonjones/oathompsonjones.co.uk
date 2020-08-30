import React, { Component } from "react";
import Discord from "../Images/Social Logos/Discord.png";
import Facebook from "../Images/Social Logos/Facebook.png";
import GitHub from "../Images/Social Logos/GitHub.png";
import Instagram from "../Images/Social Logos/Instagram.png";
import LinkedIn from "../Images/Social Logos/LinkedIn.png";
import Twitter from "../Images/Social Logos/Twitter.png";

type socialSites = ("Discord" | "Facebook" | "GitHub" | "LinkedIn" | "Instagram" | "Twitter");
const socialLogos: { [s in socialSites]: string } = { Discord, Facebook, GitHub, LinkedIn, Instagram, Twitter };

class NavLink extends Component {
    constructor(public readonly props: { label: string; link: string; }) {
        super(props);
    }

    public render() {
        // /#/link is needed for the HashRouter
        const link: string = `/#${this.props.link}`;
        return (
            <div className="nav-list-item">
                <a href={link}>
                    <h2>{this.props.label}</h2>
                </a>
            </div>
        );
    }
}

class SocialNavLink extends Component {
    constructor(public props: { site: string; link: string; }) {
        super(props);
    }

    public render() {
        return (
            <a id={this.props.site.toLowerCase()} className="nav-social-link" href={this.props.link}>
                <img src={socialLogos[this.props.site as socialSites]} alt={this.props.site} />
                <h3>{this.props.site}</h3>
            </a>
        );
    }
}

export default class Header extends Component {
    public render() {
        return (
            <div id="header">
                <ul id="nav">
                    <NavLink label="Home" link="/" />
                    <NavLink label="Portfolio" link="/portfolio" />
                    <NavLink label="Projects" link="/projects" />
                    <li id="nav-dropdown" className="nav-list-item">
                        <a href="/#/contact">
                            <h2>Contact</h2>
                        </a>
                        <div id="nav-dropdown-content">
                            <SocialNavLink site="Discord" link="https://discord.com/users/310145094684639235" />
                            <SocialNavLink site="Twitter" link="https://twitter.com/oathompsonjones" />
                            <SocialNavLink site="Facebook" link="https://facebook.com/oathompsonjones" />
                            <SocialNavLink site="Instagram" link="https://instagram.com/oathompsonjones" />
                            <SocialNavLink site="GitHub" link="https://github.com/oathompsonjones" />
                            <SocialNavLink site="LinkedIn" link="https://linkedin.com/in/oathompsonjones" />
                        </div>
                    </li>
                </ul>

                <ul id="nav-mobile">
                    <li id="nav-dropdown" className="nav-list-item">
                        <a href={document.URL}>
                            <h2>☰</h2>
                        </a>
                        <div id="nav-dropdown-content">
                            <NavLink label="Home" link="/" />
                            <NavLink label="Portfolio" link="/portfolio" />
                            <NavLink label="Projects" link="/projects" />
                            <NavLink label="Contact" link="/contact" />
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
