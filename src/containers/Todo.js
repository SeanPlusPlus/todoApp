import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectUser, fetchPostsIfNeeded, invalidateUser } from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentWillMount() {
    const heroes = [
      'hansolo',
      'lukeskywalker',
      'princessleia',
    ];
    this.setState({
      heroes,
    });
  }

  componentDidMount() {
    const { dispatch, selectedUser } = this.props;
    dispatch(fetchPostsIfNeeded(selectedUser));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedUser !== this.props.selectedUser) {
      const { dispatch, selectedUser } = nextProps;
      dispatch(fetchPostsIfNeeded(selectedUser));
    }
  }

  handleChange(nextUser) {
    this.props.dispatch(selectUser(nextUser));
    this.props.dispatch(fetchPostsIfNeeded(nextUser));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedUser } = this.props;
    dispatch(invalidateUser(selectedUser));
    dispatch(fetchPostsIfNeeded(selectedUser));
  }

  render() {
    const { selectedUser, posts, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <Picker
          value={selectedUser}
          onChange={this.handleChange}
          options={this.state.heroes}
        />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a
              href="#"
              onClick={this.handleRefreshClick}
            >
              Refresh
            </a>
          }
        </p>
        {isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
        }
        {posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        }
      </div>
    );
  }
}

Todo.propTypes = {
  selectedUser: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { selectedUser, postsByUser } = state;
  const {
    isFetching,
    lastUpdated,
    items: posts,
  } = postsByUser[selectedUser] || {
    isFetching: true,
    items: [],
  };

  return {
    selectedUser,
    posts,
    isFetching,
    lastUpdated,
  };
}

export default connect(mapStateToProps)(Todo);
