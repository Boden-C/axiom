"use strict";

import DataModel from "./DataModel.js";

let message = new DataModel("title","red");
let message2 = DataModel.newFromObject({title: "title", author: "red"});

console.log(message.attachments.join(","));
console.log(message2.tags.join(","));   
console.log(message2.times)