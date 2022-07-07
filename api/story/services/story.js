'use strict';
const { isDraft } = require('strapi-utils').contentTypes;
const { omit, set } = require('lodash');
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async create(data, { files } = {}) {
    const validData = await strapi.entityValidator.validateEntityCreation(
      strapi.models.restaurant,
      data,
      { isDraft: isDraft(data, strapi.models.story) }
    );

    const entry = await strapi.query('story').create({...validData, published_at: null});

    if (files) {
      // automatically uploads the files based on the entry and the model
      await strapi.entityService.uploadFiles(entry, files, {
        model: 'story',
        // if you are using a plugin's model you will have to add the `source` key (source: 'users-permissions')
      });
      return this.findOne({ id: entry.id });
    }

    return entry;
  }
};
