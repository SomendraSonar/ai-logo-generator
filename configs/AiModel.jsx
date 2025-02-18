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
            {text: "Based on Logo of type Modern Mascot Logos Generate a text prompt to create Logo for Logo title/Brand name : Indian Spice with decription: Indian Restaurent and refering to prompt:A vibrant logo featuring a friendly, animated character with a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds personality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—such as small decorative touches or natural accents—enhance the overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character.. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format with ideas field\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, here are 5 logo ideas based on your request, presented in JSON format:\n\n```json\n{\n  \"ideas\": [\n    \"Spice Chef Mascot\",\n    \"Friendly Elephant Chef\",\n    \"Smiling Curry Cook\",\n    \"Vibrant Spice Character\",\n    \"Indian Flavor Friend\"\n  ]\n}\n```\n\nThese ideas aim to capture the essence of a modern mascot logo for an Indian restaurant called \"Indian Spice\", incorporating a friendly, animated character and elements of Indian cuisine.\n"},
          ],
        },
      ],
    });
    
    export const AILogoPrompt = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a text prompt to create Logo for Logo Title/Brand name : indian Restaurent ,with description: Indian restro , with Color combination of Ocean Blues, also include the {logoIdea} and include Minimalists And Elegants Logos design idea and Referring to this Logo Prompt:Create a sophisticated and elegant logo design that is inspired by nature and vintage aesthetics. The logo should incorporate elements of symbolism, intricate details, and a touch of mystery. Use a combination of typography, line art, and subtle color palettes to create a timeless and visually striking design. The logo should convey a sense of luxury, tradition, and quality.  Give me result in JSON portal with prompt field only"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I am currently unable to generate pixel-based images, as that capability is only enabled for early testers. However, I can provide you with the text prompt in JSON format as requested.\n\n```json\n{\n  \"prompt\": \"Create a minimalist and elegant logo for an Indian restaurant called \\\"[Restaurant Name - suggest a short, memorable name here]\\\", with a sophisticated and luxurious feel. Use a color combination of Ocean Blues to evoke tranquility and freshness. Incorporate [logoIdea - specify an Indian-related image/symbol here, e.g., a stylized lotus flower, a paisley pattern, or a minimalist depiction of a spice]. Draw inspiration from nature and vintage aesthetics. The design should include intricate details and a touch of mystery, using a combination of elegant typography and fine line art. The logo should convey tradition, quality, and a sense of upscale dining.\"\n}\n```\n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
 