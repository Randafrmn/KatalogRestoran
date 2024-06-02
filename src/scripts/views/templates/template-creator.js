import CONFIG from '../../globals/config';

const createRestaurantsDetailTemplate = (restaurant) => `
<div class="restaurant-details">
    <h2 class="restaurant-details__title">${restaurant.restaurant.name}</h2>
    <img class="restaurant-details__poster lazyload" crossorigin="anonymous" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.restaurant.pictureId}" alt="${restaurant.restaurant.name}" />
    <div class="restaurant-details__info">
      <h3>Address</h3>
      <p>${restaurant.restaurant.address}</p>
      <h4>City</h4>
      <p>${restaurant.restaurant.city}</p>
      <h4>Description</h4>
      <p>${restaurant.restaurant.description}</p>
      <div class="menu-section">
        <div class="menu-column">
          <h4>Food Menu</h4>
          <table class="menu-table">
            <tbody>
              ${restaurant.restaurant.menus.foods.map((food) => `<tr><td>${food.name}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div class="menu-column">
          <h4>Drink Menu</h4>
          <table class="menu-table">
            <tbody>
              ${restaurant.restaurant.menus.drinks.map((drink) => `<tr><td>${drink.name}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <h4>Customer Reviews</h4>
      <div class="reviews">
        ${restaurant.restaurant.customerReviews.map((review) => `
          <div class="review">
            <p><strong>${review.name}</strong></p>
            <p>${review.review}</p>
            <p><em>${review.date}</em></p>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
`;

const createRestaurantsListTemplate = (restaurant) => `
  <div class="restaurant-list">
    <div class="restaurant-list__header skeleton">
      <div class="restaurant-list__header__city">
        <h2 class="restaurant_city">${restaurant.city}</h2>
      </div>
      <img class="restaurant-list__header__poster lazyload" crossorigin="anonymous" alt="${restaurant.name}"
            data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}">
      <div class="restaurant-list__header__rating">
        <p>⭐️<span class="restaurant-list__header__rating__score">${restaurant.rating}</span></p>
      </div>
    </div>
    <div class="restaurant-list__content">
        <h3 class="restaurant_name skeleton"><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h3>
      <p class="skeleton">${restaurant.description}</p>
    </div>
  </div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantsListTemplate,
  createRestaurantsDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
};
