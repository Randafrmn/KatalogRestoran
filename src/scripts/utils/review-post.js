import RestaurantListSource from '../data/restaurant-list-source';
import UrlParser from '../routes/url-parser';

const PostReview = async () => {
  const url = UrlParser.parseActiveUrlWithoutCombiner();
  const inputReviewName = document.getElementById('review-name');
  const inputReview = document.getElementById('review-text');
  const reviewContainer = document.querySelector('.reviews');

  const dataInput = {
    id: url.id,
    name: inputReviewName.value,
    review: inputReview.value,
  };

  const date = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const newReview = `
    <div class="review">
        <p><strong>${dataInput.name}</strong></p>
        <p>${dataInput.review}</p>
        <p><em>${date}</em></p>
    </div>
  `;

  // Kirim review
  await RestaurantListSource.addReview(dataInput);

  // Tambahkan review baru ke dalam kontainer review
  reviewContainer.innerHTML += newReview;

  // Kosongkan input
  inputReviewName.value = '';
  inputReview.value = '';
};

export default PostReview;
