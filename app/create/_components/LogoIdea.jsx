import React, { useEffect, useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import axios from "axios";
import Prompt from "@/app/_data/Prompt";
import { Loader2Icon } from "lucide-react";

function LogoIdea({ formData, onHandelInputChange }) {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(formData?.idea || "");

  useEffect(() => {
    console.log("Form Data:", formData); // Log formData to verify it's correct
    generateLogoDesignIdea();
  }, [formData]); // Add formData as a dependency

  const generateLogoDesignIdea = async () => {
    try {
      setLoading(true);
      const PROMPT = Prompt.DESIGN_IDEA_PROMPT
        .replace("{logoType}", formData?.design.title)
        .replace("{logoTitle}", formData.title)
        .replace("{logoDesc}", formData.desc)
        .replace("{logoPrompt}", formData.design.prompt);

      console.log("Generated Prompt:", PROMPT); // Log the generated prompt

      const result = await axios.post("/api/ai-design-ideas", {
        prompt: PROMPT,
      });

      console.log("API Response:", result.data); // Log the API response

      if (!result.data.ideas || result.data.ideas.length === 0) {
        console.warn("No ideas found in the API response.");
      }

      setIdeas(result.data.ideas || []);
    } catch (error) {
      console.error("Error fetching design ideas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Ideas State:", ideas); // Log the ideas state after update
  }, [ideas]);

  useEffect(() => {
    console.log("Component re-rendered");
  });

  

  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoIdeaTitle}
        description={Lookup.LogoIdeaDesc}
      />
      {loading ? (
        <div className="flex items-center justify-center my-10">
          <Loader2Icon className="animate-spin" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-3 mt-6">
          {ideas.map((item, index) => (
            <h2
              key={index}
              onClick={() => {
                setSelectedOption(item);
                onHandelInputChange(item);
              }}
              className={`p-2 rounded-full border px-3 cursor-pointer
                hover:border-primary ${
                  selectedOption === item && "border-primary"
                }`}
            >
              {item}
            </h2>
          ))}
          <h2
            onClick={() => {
              setSelectedOption("Let AI Select the best idea");
              onHandelInputChange("Let AI Select the best idea");
            }}
            className={`p-2 rounded-full border px-3 cursor-pointer
              hover:border-primary ${
                selectedOption === "Let AI Select the best idea" &&
                "border-primary"
              }`}
          >
            Let AI Select the best idea
          </h2>
        </div>
      )}
    </div>
  );
}

export default LogoIdea;