import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {setActiveSort} from '../../reducer/app/app.reducer';
import {getActiveSort} from '../../reducer/app/app.selectors';
import {Sorts} from '../../constants';

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
    const {activeSort, onSortClick} = this.props;
    const sortsKeys = Object.keys(Sorts);
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
        {sortsKeys.map((key) =>
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
  activeSort: PropTypes.string.isRequired,
  onSortClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSortClick(evt, sort) {
    evt.preventDefault();
    dispatch(setActiveSort(sort));
  },
});

const mapStateToProps = (state) => ({
  activeSort: getActiveSort(state),
});

export {SortList};

export default connect(mapStateToProps, mapDispatchToProps)(SortList);
