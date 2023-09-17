import React from "react";
import { Button } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";

import "./style.css";

export default class Main extends React.Component {
    componentDidMount() {
        const { title } = this.props;
        document.title = title;
    }

    componentWillUnmount() {
        document.title ='PfaKSys';
    }

    render() {
        const { children } = this.props;

        const header = React.Children.map(children, child => child.type.displayName === 'Header' ? child : null);
        const body = React.Children.map(children, child => child.type.displayName === 'Body' ? child : null);
        const footer = React.Children.map(children, child => child.type.displayName === 'Footer' ? child : null);

        return (
            <div>
                {header.length > 0 && (
                    <div className="header">
                        {header}
                    </div>
                )}

                {body}

                {footer.length > 0 && (
                    <div className="footer">
                        {footer}
                    </div>
                )}
            </div>
        );
    }
}

export class Header extends React.Component {
    render() {
        const { backButtonText, backButtonLink, children, t } = this.props;

        return (
            <div>
                <div className="title-bar">
                    <h3>
                        {document.title}
                    </h3>

                    {backButtonText && (
                        <Button
                            variant="secondary"
                            href={backButtonLink}
                            className="back-button"
                        >
                            <BiArrowBack size="20" className="me-1" />
                            {backButtonText}
                        </Button>
                    )}
                </div>

                {children}
            </div>
        );
    }
}
Header.displayName = 'Header';
Main.Header = Header;

export class Body extends React.Component {
    render() {
        const { largeHeader, children } = this.props;

        return (
            <div className={'body ' + (largeHeader ? 'large-header' : 'small-header')}>
                {children}
            </div>
        );
    }
}
Body.displayName = 'Body';
Main.Body = Body;

export class Footer extends React.Component {
    render() {
        const { children } = this.props;

        return (
            <div>
                {children}
            </div>
        );
    }
}
Footer.displayName = 'Footer';
Main.Footer = Footer;