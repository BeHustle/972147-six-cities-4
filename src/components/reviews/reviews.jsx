import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AddReview from '../add-review/add-review.jsx';
import Review from '../review/review.jsx';

const Reviews = ({reviews, offerId}) => {
  const filteredReviews = reviews.filter((review) => review.offerId === offerId);
  return <section className="property__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{filteredReviews.length}</span></h2>
    <ul className="reviews__list">
      {filteredReviews.map((review) =>
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
    offerId: PropTypes.number.isRequired,
    author: PropTypes.exact({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string
    }),
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date)
  }))
};

const mapStateToProps = (state) => ({
  reviews: state.reviews
});

export default connect(mapStateToProps)(Reviews);
