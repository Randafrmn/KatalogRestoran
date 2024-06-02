import FavoriteRestaurant from '../../data/favorite-restaurant-idb';
import { createRestaurantsListTemplate } from '../templates/template-creator';

const Favorites = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Favorites Restaurant</h2>
        <div id="restaurants" class="restaurants">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurant.getAllRestaurant();
    const restaurantContainer = document.querySelector('#restaurants');

    if (restaurants.length === 0) {
      restaurantContainer.innerHTML = '<p class="restaurant-empty">Add your favorite restaurant</p>';
    } else {
      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML += createRestaurantsListTemplate(restaurant);
      });
    }

    setTimeout(() => {
      const skeletonElements = restaurantContainer.querySelectorAll('.skeleton');
      skeletonElements.forEach((element) => {
        element.classList.remove('skeleton');
      });
    }, 500);
  },
};

export default Favorites;
