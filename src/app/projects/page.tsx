'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AiAssistant } from '@/components/AiAssistant';
import { ProjectCard } from '@/components/ProjectCard';
import { PROJECTS } from '@/lib/constants';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/Button';

type StatusFilter = 'All' | 'Live' | 'Upcoming' | 'Ended';
type CategoryFilter = string;

const CATEGORIES = ['All', 'AI', 'Game', 'DeFi', 'Metaverse', 'Infrastructure', 'SocialFi', 'P2E', 'RWA', 'Strategy'];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      // Search filter
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === 'All' || project.status === statusFilter;

      // Category filter
      const matchesCategory = categoryFilter === 'All' || project.category.includes(categoryFilter);

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchQuery, statusFilter, categoryFilter]);

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setCategoryFilter('All');
  };

  const hasActiveFilters = searchQuery || statusFilter !== 'All' || categoryFilter !== 'All';

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="bg-foreground text-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold display-font mb-4">All Projects</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Explore IGO opportunities across gaming, DeFi, metaverse and more. Find your next investment.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="sticky top-16 md:top-20 z-30 bg-background border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-card-foreground"
              />
            </div>

            {/* Status Filter - Desktop */}
            <div className="hidden md:flex gap-2">
              {(['All', 'Live', 'Upcoming', 'Ended'] as StatusFilter[]).map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                    statusFilter === status
                      ? 'bg-foreground text-background'
                      : 'bg-card border border-border text-foreground hover:bg-muted'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Filter Toggle - Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card text-foreground"
            >
              <Filter size={18} />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-primary"></span>
              )}
            </button>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
                Clear
              </button>
            )}
          </div>

          {/* Mobile Filters Dropdown */}
          {showFilters && (
            <div className="md:hidden mt-4 p-4 bg-card rounded-lg border border-border space-y-4 animate-fade-in">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Status</label>
                <div className="flex flex-wrap gap-2">
                  {(['All', 'Live', 'Upcoming', 'Ended'] as StatusFilter[]).map(status => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1.5 rounded text-sm font-medium ${
                        statusFilter === status
                          ? 'bg-foreground text-background'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded text-sm font-medium ${
                        categoryFilter === cat
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Category Pills - Desktop */}
          <div className="hidden md:flex gap-2 mt-4 overflow-x-auto pb-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  categoryFilter === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-muted-foreground hover:border-foreground/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </p>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-2xl border border-border">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-foreground mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <AiAssistant />
    </main>
  );
}
