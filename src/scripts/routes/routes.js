import RestaurantList from '../views/pages/restaurant-list';
import Favorites from '../views/pages/favorites';
import Detail from '../views/pages/detail';

const routes = {
  '/': RestaurantList,
  '/restaurant-list': RestaurantList,
  '/favorites': Favorites,
  '/detail/:id': Detail,
};

export default routes;
