'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;
    let count;
    if (ctx.query._q) {
      entities = await strapi.services.page.search(ctx.query);
    } else {
      entities = await strapi.services.page.find(ctx.query);
    }
    const isHome = entities.map(({slug})=>slug).includes('home');
    if (isHome) {
      const counter = await strapi.services.counter.find();
      count = counter.count;
    }

    return entities.map((entity) => {
      if (entity.slug === 'home') {
        return sanitizeEntity({...entity, components: entity.components.map((component)=> ({...component, title: `${count} ${component.title}`}))}, { model: strapi.models.page });
      } else {
        return sanitizeEntity(entity, { model: strapi.models.page });
      }
    });
  },
};
