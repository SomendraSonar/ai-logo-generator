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
  const [error, setError] = useState("");

  const hasRequiredData = () => {
    return formData?.design?.title && formData?.title && formData?.desc && formData?.design?.prompt;
  };

  useEffect(() => {
    const generateIdeas = async () => {
      try {
        if (!hasRequiredData()) {
          setError("Please complete the form to generate ideas");
          return;
        }

        setLoading(true);
        setError("");

        const PROMPT = Prompt.DESIGN_IDEA_PROMPT
          .replace("{logoType}", formData.design?.title || "")
          .replace("{logoTitle}", formData.title || "")
          .replace("{logoDesc}", formData.desc || "")
          .replace("{logoPrompt}", formData.design?.prompt || "");

        const result = await axios.post("/api/ai-design-ideas", { prompt: PROMPT });

        if (!result.data?.ideas?.length) {
          setError("No ideas found. Please try again.");
          return;
        }

        setIdeas(result.data.ideas);
      } catch (error) {
        console.error("Error fetching design ideas:", error);
        setError("Failed to generate ideas. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    generateIdeas();
  }, [formData]);

  const handleSelectIdea = (idea) => {
    setSelectedOption(idea);
    onHandelInputChange(idea);
  };

  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoIdeaTitle}
        description={Lookup.LogoIdeaDesc}
      />

      {error && (
        <div className="text-red-500 my-4">{error}</div>
      )}

      {loading ? (
        <div className="flex items-center justify-center my-10">
          <Loader2Icon className="animate-spin" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-3 mt-6">
          {ideas.map((item, index) => (
            <h2
              key={`idea-${index}-${item.substring(0, 5)}`}
              onClick={() => handleSelectIdea(item)}
              className={`p-2 rounded-full border px-3 cursor-pointer transition-colors
                hover:border-primary ${selectedOption === item ? "border-primary bg-primary/10" : ""}`}
            >
              {item}
            </h2>
          ))}
          
          <h2
            onClick={() => handleSelectIdea("Let AI Select the best idea")}
            className={`p-2 rounded-full border px-3 cursor-pointer transition-colors
              ${selectedOption === "Let AI Select the best idea" ? "border-primary bg-primary/10" : "hover:border-primary"}`}
          >
            Let AI Select the best idea
          </h2>
        </div>
      )}
    </div>
  );
}

export default LogoIdea;
