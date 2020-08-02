import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Operation} from '../../reducer/reducer.js';
import AddReview from '../add-review/add-review.jsx';
import Review from '../review/review.jsx';

const Reviews = ({reviews, offerId, onReviewsMount}) => {
  onReviewsMount(offerId);
  return <section className="property__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
    <ul className="reviews__list">
      {reviews.map((review) =>
        <Review key={review.id} review={review}/>
      )}
    </ul>
    <AddReview/>
  </section>;
};

Reviews.propTypes = {
  offerId: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    author: PropTypes.exact({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string
    }),
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date)
  })),
  onReviewsMount: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onReviewsMount(offerId) {
    dispatch(Operation.loadReviews(offerId));
  }
});

const mapStateToProps = (state) => ({
  reviews: state.reviews
});

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
