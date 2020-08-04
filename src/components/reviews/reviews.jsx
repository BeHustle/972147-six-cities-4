import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Operation as DataOperation} from '../../reducer/data/data.reducer.js';
import {getReviews} from '../../reducer/data/data.selectors.js';
import AddReview from '../add-review/add-review.jsx';
import Review from '../review/review.jsx';

class Reviews extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {onReviewsMount, offerId} = this.props;
    onReviewsMount(offerId);
  }

  render() {
    const {reviews} = this.props;
    return <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) =>
          <Review key={review.id} review={review}/>,
        )}
      </ul>
      <AddReview/>
    </section>;
  }
}

Reviews.propTypes = {
  offerId: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    author: PropTypes.exact({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date),
  })),
  onReviewsMount: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onReviewsMount(offerId) {
    dispatch(DataOperation.loadReviews(offerId));
  },
});

const mapStateToProps = (state) => ({
  reviews: getReviews(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
