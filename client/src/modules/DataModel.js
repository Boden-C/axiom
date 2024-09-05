"use strict";

class DataModel {

    constructor() {
        this.title = "";
        this.author = "";
        this.avatar = "";
        this.description = "";
        this.tags = [];
        this.attachments = [];
        this.timestamp = Date.now();
        this.interaction = Object;
    }

    timestampToString() {
        return this.timestamp.toString();
    }

}

export default DataModel;