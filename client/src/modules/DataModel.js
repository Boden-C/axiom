"use strict";

class DataModel {
  /**
   * @param {string} [title]
   * @param {string} [author]
   * @param {URL} [avatar]
   * @param {string} [description]
   * @param {string[]} [tags]
   * @param {URL[]} [attachments]
   * @param {Date} [timestamp]
   */
  constructor(title = undefined, author = undefined, avatar = undefined, description = undefined, tags = undefined, attachments = undefined, timestamp = undefined) {
    this.title = title;
    this.author = author;
    this.avatar = avatar;
    this.description = description;
    this.tags = tags;
    this.attachments = attachments;
    this.timestamp = timestamp;
  }

  /**
   * @param {Object} obj
   * @param {string} [obj.title]
   * @param {string} [obj.author]
   * @param {URL} [obj.avatar]
   * @param {string} [obj.description]
   * @param {string[]} [obj.tags]
   * @param {URL[]} [obj.attachments]
   * @param {Date} [obj.timestamp]
   * @returns {DataModel}
   */
  static newFromObject({ title, author, avatar, description, tags, attachments, timestamp } = {}) {
    return new DataModel(title, author, avatar, description, tags, attachments, timestamp);
  }

  /**
   * @param {Object} obj
   * @param {string} [obj.title]
   * @param {string} [obj.author]
   * @param {URL} [obj.avatar]
   * @param {string} [obj.description]
   * @param {string[]} [obj.tags]
   * @param {URL[]} [obj.attachments]
   * @param {Date} [obj.timestamp]
   * @returns {DataModel}
   */
  fromObject({ title, author, avatar, description, tags, attachments, timestamp } = {}) {
    this.title = title;
    this.author = author;
    this.avatar = avatar;
    this.description = description;
    this.tags = tags;
    this.attachments = attachments;
    this.timestamp = timestamp;
    return this;
  }
}

export default DataModel;

