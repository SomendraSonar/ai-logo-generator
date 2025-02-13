const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
    export const AIDesignIdea = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Based on Logo of type modern mascot  Logos Generate a text prompt to create Logo for Logo title/Brand name : Indian Spice with description: Indian  Restaurant and referring to prompt:A vibrant logo featuring a friendly, animated character with a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds personality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—such as small decorative touches or natural accents—enhance the overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character.. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format with idea field"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, I can help you generate some logo ideas in JSON format based on your modern mascot logo concept for \"Indian Spice\" restaurant.\n\n```json\n[\n  {\n    \"idea\": \"Smiling Chef Elephant Mascot\"\n  },\n  {\n    \"idea\": \"Spice Jar Character Holding Naan\"\n  },\n  {\n    \"idea\": \"Curry Pot Winking Mascot\"\n  },\n  {\n    \"idea\": \"Friendly Tiger Serving Biryani\"\n  },\n  {\n    \"idea\": \"Animated Turbaned Chef Mascot\"\n  }\n]\n```\n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
