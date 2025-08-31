const express=require('express');
const ChatRouter=express.Router();
const {bot}=require('../controller/gemini.chatbot.controller');
ChatRouter.post('/chatbot',bot)
module.exports=ChatRouter;
// const express = require("express");
// const VoiceRouter = express.Router();
// const { bot } = require("../controller/gemini.voicebot.controller");

// VoiceRouter.post("/voicebot", bot);

module.exports = ChatRouter;
