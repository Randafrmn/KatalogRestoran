import RestaurantListSource from '../../data/restaurant-list-source';
import { createRestaurantsListTemplate } from '../templates/template-creator';

const RestaurantList = {
  async render() {
    return `
        <div class="content">
            <h2 class="content__heading">Restaurant List</h2>
            <div id="restaurants" class="restaurants">
            </div>
        </div>
        `;
  },

  async afterRender() {
    const restaurants = await RestaurantListSource.restaurantList();
    const restaurantContainer = document.querySelector('#restaurants');
    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantsListTemplate(restaurant);
    });
  },
};

export default RestaurantList;
