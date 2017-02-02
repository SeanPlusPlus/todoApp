import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchNavIfNeeded } from '../actions';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchNavIfNeeded());
  }

  render() {
    const { links } = this.props;
    console.log(links.items);
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
        <a className="navbar-brand" href="#">Todo App</a>
        <div>
          <ul className="navbar-nav mr-auto">
            {links.items.map((link, i) =>
              <li key={i} className="nav-item">{link.title}</li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const navLinks = state.navLinks.data || { items: [] };
  return {
    links: navLinks,
  };
}

export default connect(mapStateToProps)(Nav);
