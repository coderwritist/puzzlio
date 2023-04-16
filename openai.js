const door1chat = async (hist) => 
{
    if(hist.length> 25)
    {
        while(hist.length<=25)
            hist.pop();
    }
    messages1 = [{role: "system", content: "You are a funny riddler, you ask the user a riddle and talk them through the puzzle till they find an answer. If the user finally gives the correct answer, your response must be exactly this: 'Great, that's the correct answer, bye!'. The riddle you will be asking is: 'I can be cracked, I can be made. I can be told, I can be played. What am I?' and the answer is 'a joke'"}]
    for(let i = 0; i<hist.length; i++)
    {
        if(i%2 === 0)
        messages1.push({role: "user", content: hist[i]})
        else
        messages1.push({role: "assistant", content: hist[i]})
    }
    // console.log(messages1);
    const { Configuration, OpenAIApi, errors} = require("openai");

    const configuration = new Configuration({
    apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    console.log("Goin to openai...")
    try {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages1,
    temperature: 0.2,
  });
  return(completion.data.choices[0].message.content);

} catch (err) {
    console.log(err.message)
    console.log(err.response.data.error.message)
    if(err.response.data.error.message.includes("Rate limit reached"))
    {
        return("Rate limit error");
    }
    if(err.response.data.error.message.includes("quota"))
        console.log("I am in")
        return("API key expired");
    }
}


const door3chat = async (hist) => 
{
    if(hist.length> 25)
    {
        while(hist.length<=25)
            hist.pop();
    }
    messages1 = [{role: "system", content: "You are a funny riddler in a game, you have talked with the player already, but now you are here not to ask a riddle, but to waste the players time. Just chat with the player and give them subtle clues that you are wasting their time, do not say it outright, say things like 'Maybe I am here to just distract you' and 'I am probably a dead end, you are wasting your time' say dead end in the conversation atleast once."}]
    for(let i = 0; i<hist.length; i++)
    {
        if(i%2 === 0)
        messages1.push({role: "user", content: hist[i]})
        else
        messages1.push({role: "assistant", content: hist[i]})
    }
    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
    apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    console.log("Goin to openai...")
    try {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages1,
    temperature: 0.2,
  });
  return(completion.data.choices[0].message.content);

} catch (err) {
    console.log(err.message)
    console.log(err.response.data.error.message)
    if(err.response.data.error.message.includes("Rate limit reached"))
    {
        return("Rate limit error");
    }
    if(err.response.data.error.message.includes("quota"))
        console.log("I am in")
        return("API key expired");
    }


}



const door2final = async (hist) => 
{
    if(hist.length> 25)
    {
        while(hist.length<=25)
            hist.pop();
    }
    messages1 = [{role: "system", content: "You are a funny riddler (who responds exactly with the phrase 'correct answer' when the user gives the correct answer) in a game, you are here to ask the user another riddle, you have talked with the player already, so say stuff like 'welcome back' and 'hello! long time no see'. you will ask this riddle 'You have two ropes and a lighter. Each rope takes exactly one hour to burn from one end to the other, but the burning speed is not constant (i.e. it might burn faster or slower at different points), Using these two ropes and the lighter, how can you measure exactly 45 minutes?' and the answer is 'Light both ends of the first rope and one end of the second rope simultaneously.The first rope will burn completely in 30 minutes (since it is burning from both ends), while the second rope will have burned halfway. At this point, light the other end of the second rope. The second rope will take an additional 15 minutes to burn completely (since it is burning from both ends now), for a total of 45 minutes.' in other words 'burn one rope from both ends and another from one end, when the first rope burns completely burn the other end of the second rope , once the second rope burns completely we will have 45 minutes' the user may explain that logic in any way. Talk the user through the puzzle and give them hints that they are on the right track, but do not give them the answer outright. If the user gives the correct answer, your response must be exactly the phrase 'correct answer'"}]
    for(let i = 0; i<hist.length; i++)
    {
        if(i%2 === 0)
        messages1.push({role: "user", content: hist[i]})
        else
        messages1.push({role: "assistant", content: hist[i]})
    }
    // console.log(messages1);
    const { Configuration, OpenAIApi,errors} = require("openai");

    const configuration = new Configuration({
    apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    console.log("Goin to openai...")
    try {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages1,
    temperature: 0.2,
  });
  return(completion.data.choices[0].message.content);
}
catch (err) {
    console.log(err.message)
    console.log(err.response.data.error.message)
    if(err.response.data.error.message.includes("Rate limit reached"))
    {
        return("Rate limit error");
    }
    if(err.response.data.error.message.includes("quota"))
        console.log("I am in")
        return("API key expired");
    }


}



module.exports = {door1chat, door3chat, door2final};

// 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