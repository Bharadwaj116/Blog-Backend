const asyncHandler = require("express-async-handler");

const Topics = require("../models/topicModel")

const chooseTopics = asyncHandler(async (request, response) => {
    console.log("The request body is :", request.body);
    const { selected_topics } = request.body;
    if (!selected_topics) {
      response.status(400);
      throw new Error("Field is mandatory !");
    }
    const topics = await Topics.create({
        selected_topics,
        user_id: request.user.id,
    });
  
    response.status(200).json(topics);
  });


  module.exports ={chooseTopics};