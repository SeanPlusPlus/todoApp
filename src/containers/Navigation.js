import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { fetchNavIfNeeded } from '../actions';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchNavIfNeeded());
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { links } = this.props;
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">Todo App</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {links.items.map((l, i) =>
                <NavItem key={i}>
                  <NavLink href="/">{l.title}</NavLink>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

Navigation.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const navLinks = state.navLinks.data || { items: [] };
  return {
    links: navLinks,
  };
}

export default connect(mapStateToProps)(Navigation);
