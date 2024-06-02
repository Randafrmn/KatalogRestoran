/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking and Unliking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorites');
});

Scenario('showing empty favorite Restaurant', ({ I }) => {
  I.seeElement('#restaurants');
  I.see('Add your favorite restaurant', '.restaurant-empty');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Add your favorite restaurant', '.restaurant-empty');

  I.amOnPage('/');

  I.seeElement('.restaurant_name a');
  const firstRestaurant = locate('.restaurant_name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');
  I.seeElement('.restaurant-list');
  const likedRestaurantName = await I.grabTextFrom('.restaurant_name');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.see('Add your favorite restaurant', '.restaurant-empty');

  I.amOnPage('/');

  I.seeElement('.restaurant_name a');
  const firstRestaurant = locate('.restaurant_name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');
  I.seeElement('.restaurant-list');
  const likedRestaurantName = await I.grabTextFrom('.restaurant_name');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  // Unlike the restaurant
  I.click(locate('.restaurant_name a').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');
  I.see('Add your favorite restaurant', '.restaurant-empty');
});
