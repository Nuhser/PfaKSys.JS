import React from "react";

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

                <div className="body">
                    {body}
                </div>

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
        const { children} = this.props;

        return (
            <div>
                <h3>{document.title}</h3>
                {children}
            </div>
        );
    }
}
Header.displayName = 'Header';
Main.Header = Header;

export class Body extends React.Component {
    render() {
        const { children} = this.props;

        return (
            <div>
                {children}
            </div>
        );
    }
}
Body.displayName = 'Body';
Main.Body = Body;

export class Footer extends React.Component {
    render() {
        const { children} = this.props;

        return (
            <div>
                {children}
            </div>
        );
    }
}
Footer.displayName = 'Footer';
Main.Footer = Footer;