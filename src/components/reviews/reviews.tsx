import * as React from 'react';
import {connect} from 'react-redux';
import {AuthStatus} from '../../constants';
import {Operation as DataOperation} from '../../reducer/data/data.reducer';
import {getReviews} from '../../reducer/data/data.selectors';
import {getAuthStatus} from '../../reducer/user/user.selectors';
import AddReview from '../add-review/add-review';
import Review from '../review/review';
import {ReviewInterface} from "../../types";

interface Props {
  offerId: number;
  onReviewsMount: (offerId: number) => void;
  reviews: Array<ReviewInterface>;
  authStatus: string;
}

class Reviews extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {onReviewsMount, offerId} = this.props;
    onReviewsMount(offerId);
  }

  render() {
    const {reviews, authStatus, offerId} = this.props;
    return <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) =>
          <Review key={review.id} review={review}/>,
        )}
      </ul>
      {authStatus === AuthStatus.AUTH && <AddReview offerId={offerId} />}
    </section>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  onReviewsMount(offerId) {
    dispatch(DataOperation.loadReviews(offerId));
  },
});

const mapStateToProps = (state) => ({
  reviews: getReviews(state),
  authStatus: getAuthStatus(state)
});

export {Reviews};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
