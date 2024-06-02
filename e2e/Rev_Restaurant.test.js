/* eslint-disable no-undef */
Feature('Adding Review');

Scenario('adding a review to a restaurant', async ({ I }) => {
  I.amOnPage('/');

  I.seeElement('.restaurant_name a');

  const firstRestaurant = locate('.restaurant_name a').first();
  I.click(firstRestaurant);

  I.seeElement('#review-form');

  const reviewName = 'Test User';
  const reviewText = 'This is a test review';
  I.fillField('#review-name', reviewName);
  I.fillField('#review-text', reviewText);

  I.click('#submit');

  I.wait(3);

  I.seeElement('.reviews');
  I.see(reviewName, '.review');
  I.see(reviewText, '.review');
});
