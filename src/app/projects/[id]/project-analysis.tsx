"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/Button";
import { analyzeProject } from "@/actions/ai";

interface ProjectAnalysisProps {
  projectName: string;
  projectDescription: string;
}

export function ProjectAnalysis({ projectName, projectDescription }: ProjectAnalysisProps) {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const result = await analyzeProject(projectName, projectDescription);
      setAnalysis(result);
    } catch {
      setAnalysis("Analysis unavailable at this time.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm md:p-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="display-font text-2xl font-bold">AI Analysis</h2>
        <Sparkles className="h-6 w-6 text-[#7FF252]" />
      </div>

      {analysis ? (
        <div className="rounded-lg border border-[#7FF252]/20 bg-[#F0FDF4] p-6">
          <p className="leading-relaxed text-gray-700">{analysis}</p>
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="mb-4 text-gray-500">Get an AI-powered analysis of this project</p>
          <Button onClick={handleAnalyze} disabled={loading}>
            {loading ? (
              <>
                <span className="mr-2 animate-spin">⏳</span>
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Analysis
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
