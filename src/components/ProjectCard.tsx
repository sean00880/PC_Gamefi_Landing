'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ExternalLink } from 'lucide-react';
import { Button } from './Button';
import type { Project } from '@/lib/types';
import { analyzeProject } from '@/actions/ai';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const result = await analyzeProject(project.name, project.description);
      setAnalysis(result);
    } catch (error) {
      setAnalysis('Analysis unavailable at this time.');
    }
    setLoading(false);
  };

  const progress = project.totalRaise > 0 ? (project.currentRaise / project.totalRaise) * 100 : 0;

  const statusColors = {
    'Live': 'bg-primary text-primary-foreground',
    'Upcoming': 'bg-yellow-500 text-white',
    'Ended': 'bg-muted text-muted-foreground'
  };

  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wide ${statusColors[project.status]}`}>
            {project.status}
          </span>
        </div>
        {project.blockchain && (
          <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-foreground">
            {project.blockchain}
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold display-font text-card-foreground">{project.name}</h3>
            <p className="text-sm font-mono text-muted-foreground">${project.ticker}</p>
          </div>
          <div className="flex gap-1 flex-wrap justify-end">
            {project.category.slice(0, 2).map(cat => (
              <span key={cat} className="text-[10px] bg-muted px-2 py-1 rounded text-muted-foreground font-semibold uppercase">{cat}</span>
            ))}
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{project.description}</p>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Raise</span>
            <span className="font-bold font-mono text-card-foreground">${project.totalRaise.toLocaleString()}</span>
          </div>

          {project.status !== 'Upcoming' && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Raised</span>
              <span className="font-bold font-mono text-primary">${project.currentRaise.toLocaleString()}</span>
            </div>
          )}

          {project.roi !== 'TBA' && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">ROI</span>
              <span className="font-bold font-mono text-primary">{project.roi}</span>
            </div>
          )}
        </div>

        {project.status === 'Live' && (
          <div className="w-full bg-muted h-2 rounded-full mb-6 overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <div className="mt-auto space-y-2">
          <Link href={`/projects/${project.id}`}>
            <Button className="w-full">
              View Detail <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="flex items-center justify-center w-full text-xs text-muted-foreground hover:text-foreground py-2 gap-1 transition-colors"
          >
            <Sparkles size={14} />
            {loading ? 'Analyzing...' : 'AI Quick Analysis'}
          </button>
        </div>

        {analysis && (
          <div className="mt-4 bg-muted/50 p-3 rounded-lg text-xs text-muted-foreground border border-border animate-fade-in">
            <span className="font-bold block mb-1">AI Analysis:</span>
            {analysis}
          </div>
        )}
      </div>
    </div>
  );
};
