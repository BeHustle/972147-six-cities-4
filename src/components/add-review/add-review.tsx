import * as React from 'react';
import {connect} from 'react-redux';
import {CommentMessage, CommentStatus} from '../../constants';
import {ReviewLength} from '../../constants';
import {Operation as DataOperation, setCommentStatus} from '../../reducer/data/data.reducer';
import {getCommentStatus} from '../../reducer/data/data.selectors';

interface Props {
  offerId: number;
  commentStatus: string;
  onFormSubmit: (obj: {rating: number; comment: string}, offerId: number) => void;
  resetCommentStatus: () => void;
}

interface State {
  formInSubmitting: boolean;
  isTextareaCorrect: boolean;
  rating: number;
}

class AddReview extends React.PureComponent<Props, State> {
  private textAreaRef: React.RefObject<HTMLTextAreaElement>;
  private submitBtnRef: React.RefObject<HTMLButtonElement>;
  private formRef: React.RefObject<HTMLFormElement>;
  private messageRef: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);
    this.textAreaRef = React.createRef();
    this.submitBtnRef = React.createRef();
    this.formRef = React.createRef();
    this.messageRef = React.createRef();
    this.state = {
      formInSubmitting: false,
      isTextareaCorrect: false,
      rating: 0,
    };
    this._handleRatingChange = this._handleRatingChange.bind(this);
    this._handleTextAreaChange = this._handleTextAreaChange.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  componentDidUpdate() {
    this.submitBtnRef.current.disabled = !((this.state.rating !== null) && this.state.isTextareaCorrect);
    this.textAreaRef.current.disabled = false;
    if (this.state.formInSubmitting) {
      this.submitBtnRef.current.disabled = true;
      this.textAreaRef.current.disabled = true;
      switch (this.props.commentStatus) {
        case CommentStatus.FAIL:
          this._handleErrorFormSubmit();
          break;
        case CommentStatus.SUCCESS:
          this._handleSuccessFormSubmit();
          break;
        default:
          break;
      }
    }
  }

  _handleRatingChange(evt) {
    this.setState({
      rating: parseInt(evt.currentTarget.value, 10)
    });
  }

  _handleTextAreaChange() {
    if (this.textAreaRef.current.value.length >= ReviewLength.MIN
      && this.textAreaRef.current.value.length <= ReviewLength.MAX) {
      this.setState({
        isTextareaCorrect: true,
      });
    } else {
      this.setState({
        isTextareaCorrect: false,
      });
    }
  }

  _handleSuccessFormSubmit() {
    this.messageRef.current.innerText = CommentMessage.SUCCESS;
    this.messageRef.current.style.color = `green`;
    this.messageRef.current.style.display = `block`;
    this.setState({
      isTextareaCorrect: false,
      formInSubmitting: false,
      rating: null,
    });
    this.formRef.current.reset();
    this.props.resetCommentStatus();
  }

  _handleErrorFormSubmit() {
    this.messageRef.current.innerText = CommentMessage.ERROR;
    this.messageRef.current.style.color = `red`;
    this.messageRef.current.style.display = `block`;
    this.setState({
      formInSubmitting: false
    });
    this.props.resetCommentStatus();
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    this.props.onFormSubmit({
      rating: this.state.rating,
      comment: this.textAreaRef.current.value
    }, this.props.offerId);
    this.messageRef.current.innerText = ``;
    this.messageRef.current.style.color = `inherit`;
    this.messageRef.current.style.display = `none`;
    this.setState({
      formInSubmitting: true
    });
  }

  render() {
    return <form onSubmit={this._handleFormSubmit} ref={this.formRef} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" onChange={this._handleRatingChange} type="radio" />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" onChange={this._handleRatingChange} type="radio" />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" onChange={this._handleRatingChange} type="radio" />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" onChange={this._handleRatingChange} type="radio" />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" onChange={this._handleRatingChange} type="radio" />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea onChange={this._handleTextAreaChange} ref={this.textAreaRef} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" />
      <div ref={this.messageRef} style={{
        textAlign: `right`,
        marginTop: `10px`,
        marginBottom: `10px`,
        fontWeight: 500,
        display: `none`
      }} />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button ref={this.submitBtnRef} disabled={true} className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit(comment, offerId) {
    dispatch(DataOperation.addComment(comment, offerId));
  },
  resetCommentStatus() {
    dispatch(setCommentStatus(CommentStatus.NOT_SEND));
  }
});

const mapStateToProps = (state) => ({
  commentStatus: getCommentStatus(state)
});

export {AddReview};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
