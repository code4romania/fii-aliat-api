'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async increment(ctx) {
    const res = await strapi.query('counter').findOne();
    const entity = await strapi.query('counter').update(res.id, {count: res.count + 1});
    return { count: entity.count };
  },
};
