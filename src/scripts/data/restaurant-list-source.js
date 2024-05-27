import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantListSource {
  static async restaurantList() {
    try {
      const response = await fetch(API_ENDPOINT.RESTAURANT_LIST);
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      return response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async addReview(review) {
    try {
      const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: review.id,
          name: review.name,
          review: review.review,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add review');
      }

      return response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default RestaurantListSource;
