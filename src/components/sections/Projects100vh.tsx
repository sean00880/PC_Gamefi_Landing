'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Clock, Flame, CheckCircle, ExternalLink } from 'lucide-react'
import { LIVE_PROJECTS, UPCOMING_PROJECTS, COMPLETED_PROJECTS } from '@/lib/constants'

const StatusBadge = ({ status }: { status: string }) => {
  const config = {
    Live: { icon: Flame, color: 'bg-status-live text-black', label: 'Live Now' },
    Upcoming: { icon: Clock, color: 'bg-status-upcoming text-black', label: 'Coming Soon' },
    Ended: { icon: CheckCircle, color: 'bg-status-ended text-white', label: 'Completed' }
  }[status] || { icon: Clock, color: 'bg-muted text-muted-foreground', label: status }

  const Icon = config.icon

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${config.color}`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  )
}

const ProjectCard = ({ project }: { project: typeof LIVE_PROJECTS[0] }) => {
  const progress = project.totalRaise > 0 ? (project.currentRaise / project.totalRaise) * 100 : 0

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary hover:shadow-xl hover:shadow-primary/10">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div className="absolute left-4 top-4">
          <StatusBadge status={project.status} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <span className="font-mono text-sm text-muted-foreground">${project.ticker}</span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {project.description}
        </p>

        {/* Categories */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.category.map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Progress bar (for live projects) */}
        {project.status === 'Live' && (
          <div className="mb-4">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold text-foreground">{progress.toFixed(0)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Stats row */}
        <div className="flex items-center justify-between border-t border-border pt-4 text-sm">
          <div>
            <span className="block text-muted-foreground">
              {project.status === 'Ended' ? 'Raised' : 'Target'}
            </span>
            <span className="font-semibold text-foreground">
              ${project.totalRaise.toLocaleString()}
            </span>
          </div>
          <div className="text-right">
            <span className="block text-muted-foreground">ROI</span>
            <span className={`font-bold ${project.roi !== 'TBA' ? 'text-primary' : 'text-muted-foreground'}`}>
              {project.roi}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Projects100vh() {
  const featuredProjects = [...LIVE_PROJECTS, ...UPCOMING_PROJECTS, ...COMPLETED_PROJECTS].slice(0, 6)

  return (
    <section className="flex min-h-screen flex-col justify-center bg-background py-20" id="projects">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
              IGO Launchpad
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Featured Projects
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Discover curated GameFi opportunities. From metaverse worlds to play-to-earn games.
            </p>
          </div>
          <Link href="/projects">
            <Button variant="outline" size="lg" className="hidden md:inline-flex">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Status filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            All Projects
          </button>
          <button className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground hover:border-status-live hover:text-status-live transition-colors">
            <Flame className="mr-1.5 inline h-4 w-4" />
            Live ({LIVE_PROJECTS.length})
          </button>
          <button className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground hover:border-status-upcoming hover:text-status-upcoming transition-colors">
            <Clock className="mr-1.5 inline h-4 w-4" />
            Upcoming ({UPCOMING_PROJECTS.length})
          </button>
          <button className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground hover:border-status-ended hover:text-status-ended transition-colors">
            <CheckCircle className="mr-1.5 inline h-4 w-4" />
            Completed ({COMPLETED_PROJECTS.length})
          </button>
        </div>

        {/* Projects grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center md:hidden">
          <Link href="/projects">
            <Button size="lg">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Info banner */}
        <div className="mt-16 rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
          <h3 className="mb-2 text-xl font-semibold text-foreground">
            Want Your Project Listed?
          </h3>
          <p className="mb-4 text-muted-foreground">
            Submit your GameFi project for review and get access to our community of 200K+ investors.
          </p>
          <Button variant="outline">
            Apply Now
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
