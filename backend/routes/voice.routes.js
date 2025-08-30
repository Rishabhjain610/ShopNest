const express=require('express');
const VoiceRouter=express.Router();
const {bot}=require('../controller/gemini.voicebot.controller');
VoiceRouter.post('/voicebot',bot)
module.exports=VoiceRouter;
// const express = require("express");
// const VoiceRouter = express.Router();
// const { bot } = require("../controller/gemini.voicebot.controller");

// VoiceRouter.post("/voicebot", bot);

// module.exports = VoiceRouter;
