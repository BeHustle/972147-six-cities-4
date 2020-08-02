import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ActionCreator} from '../../reducer/reducer.js';
import {Sorts} from '../../constants.js';

const activeSortClass = `places__option--active`;
const hoveredSortListClass = `places__options--opened`;

class SortList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };
    this._handleCardListHover = this._handleCardListHover.bind(this);
  }

  _handleCardListHover(isMouseEnter) {
    this.setState({
      hovered: isMouseEnter
    });
  }

  render() {
    const {activeSort, sorts, onSortClick} = this.props;
    return <form
      onMouseEnter={() => this._handleCardListHover(true)}
      onMouseLeave={() => this._handleCardListHover(false)}
      className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0">
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${this.state.hovered && hoveredSortListClass}`}>
        {sorts.map((key) =>
          <li
            onClick={(evt) => onSortClick(evt, Sorts[key])}
            key={key}
            className={`places__option ${Sorts[key] === activeSort && activeSortClass}`}
            tabIndex="0">
            {Sorts[key]}
          </li>
        )}
      </ul>
    </form>;
  }
}

SortList.propTypes = {
  sorts: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  activeSort: PropTypes.string.isRequired,
  onSortClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSortClick(evt, sort) {
    evt.preventDefault();
    dispatch(ActionCreator.changeSort(sort));
  },
});

const mapStateToProps = (state) => ({
  sorts: Object.keys(state.sorts),
  activeSort: state.activeSort,
});

export default connect(mapStateToProps, mapDispatchToProps)(SortList);
