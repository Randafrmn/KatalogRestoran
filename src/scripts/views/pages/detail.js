import UrlParser from '../../routes/url-parser';
import RestaurantsListSource from '../../data/restaurant-list-source';
import { createRestaurantsDetailTemplate } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import PostReview from '../../utils/review-post';
import FavoriteRestaurant from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    return `
        <div id="restaurant" class="restaurant"></div>
        <div class="restaurant-details">
          <div class="review-form-container">
            <h4 class="review-header">Review Time</h4>
            <form id="review-form">
              <label for="review-name">Name:</label>
              <input type="text" id="review-name" name="review-name" required>
              <label for="review-text">Review:</label>
              <textarea id="review-text" name="review-text" required></textarea>
              <button type="submit" id="submit">Submit Review</button>
            </form>
          </div>
        </div>
        <div id="likeButtonContainer"></div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantsListSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML = createRestaurantsDetailTemplate(restaurant);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurant,
      restaurant: {
        id: restaurant.restaurant.id,
        city: restaurant.restaurant.city,
        name: restaurant.restaurant.name,
        description: restaurant.restaurant.description,
        pictureId: restaurant.restaurant.pictureId,
        rating: restaurant.restaurant.rating,
      },
    });

    const submitReview = document.getElementById('submit');
    submitReview.addEventListener('click', (event) => {
      event.preventDefault();
      PostReview();
    });
  },
};

export default Detail;
