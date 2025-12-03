import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AiAssistant } from "@/components/AiAssistant";
import { Button } from "@/components/Button";
import { PROJECTS } from "@/lib/constants";
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  Twitter,
  Send,
  Calendar,
  Users,
  Target,
  Shield,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import { ProjectAnalysis } from "./project-analysis";

// Generate static params for all known projects
export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    id: project.id,
  }));
}

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const progress = project.totalRaise > 0 ? (project.currentRaise / project.totalRaise) * 100 : 0;

  const statusColors: Record<string, string> = {
    Live: "bg-primary text-primary-foreground",
    Upcoming: "bg-status-upcoming text-white",
    Ended: "bg-muted text-muted-foreground",
  };

  const statusIcons: Record<string, React.ReactNode> = {
    Live: <TrendingUp className="h-4 w-4" />,
    Upcoming: <Clock className="h-4 w-4" />,
    Ended: <CheckCircle className="h-4 w-4" />,
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-64 w-full overflow-hidden md:h-96">
        <Image
          src={project.imageUrl}
          alt={project.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-black/50 to-transparent" />

        {/* Back Button */}
        <div className="absolute left-4 top-4 z-10">
          <Link href="/projects">
            <Button
              variant="secondary"
              size="sm"
              className="border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> All Projects
            </Button>
          </Link>
        </div>

        {/* Status Badge */}
        <div className="absolute right-4 top-4 z-10">
          <span
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold ${statusColors[project.status]}`}
          >
            {statusIcons[project.status]}
            {project.status}
          </span>
        </div>

        {/* Project Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex flex-wrap gap-2">
              {project.category.map((cat) => (
                <span
                  key={cat}
                  className="rounded bg-white/20 px-3 py-1 text-xs font-semibold uppercase text-white backdrop-blur-md"
                >
                  {cat}
                </span>
              ))}
            </div>
            <h1 className="display-font mb-2 text-4xl font-bold text-white md:text-6xl">
              {project.name}
            </h1>
            <p className="font-mono text-2xl text-white/70">${project.ticker}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Details */}
          <div className="space-y-8 lg:col-span-2">
            {/* Description */}
            <div className="rounded-2xl bg-card p-6 shadow-sm md:p-8">
              <h2 className="display-font mb-4 text-2xl font-bold text-card-foreground">About</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{project.description}</p>

              {/* Links */}
              <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-6">
                {project.website && (
                  <a href={project.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Globe className="mr-2 h-4 w-4" /> Website
                    </Button>
                  </a>
                )}
                {project.twitter && (
                  <a href={project.twitter} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Twitter className="mr-2 h-4 w-4" /> Twitter
                    </Button>
                  </a>
                )}
                {project.telegram && (
                  <a href={project.telegram} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Send className="mr-2 h-4 w-4" /> Telegram
                    </Button>
                  </a>
                )}
              </div>
            </div>

            {/* AI Analysis Section - Client Component */}
            <ProjectAnalysis projectName={project.name} projectDescription={project.description} />

            {/* Key Information */}
            <div className="rounded-2xl bg-card p-6 shadow-sm md:p-8">
              <h2 className="display-font mb-6 text-2xl font-bold text-card-foreground">Key Information</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                    <Target className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Blockchain</span>
                    <p className="text-lg font-bold text-card-foreground">{project.blockchain || "Multi-chain"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                    <Calendar className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Start Date</span>
                    <p className="text-lg font-bold text-card-foreground">{project.startDate || "TBA"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                    <Users className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Participants</span>
                    <p className="text-lg font-bold text-card-foreground">
                      {project.participants > 0 ? project.participants.toLocaleString() : "TBA"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                    <Shield className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">KYC Required</span>
                    <p className="text-lg font-bold text-card-foreground">{project.kycRequired ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats Card */}
          <div className="space-y-6">
            <div className="sticky top-24 rounded-2xl bg-card p-6 shadow-sm">
              <h3 className="display-font mb-6 text-lg font-bold text-card-foreground">Raise Details</h3>

              {/* Progress Bar */}
              {project.status !== "Upcoming" && (
                <div className="mb-6">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-bold text-card-foreground">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border py-3">
                  <span className="text-muted-foreground">Total Raise</span>
                  <span className="font-mono text-lg font-bold text-card-foreground">
                    ${project.totalRaise.toLocaleString()}
                  </span>
                </div>

                {project.status !== "Upcoming" && (
                  <div className="flex items-center justify-between border-b border-border py-3">
                    <span className="text-muted-foreground">Current Raised</span>
                    <span className="font-mono text-lg font-bold text-primary">
                      ${project.currentRaise.toLocaleString()}
                    </span>
                  </div>
                )}

                {project.roi !== "TBA" && (
                  <div className="flex items-center justify-between border-b border-border py-3">
                    <span className="text-muted-foreground">ATH ROI</span>
                    <span className="font-mono text-2xl font-bold text-primary">{project.roi}</span>
                  </div>
                )}

                <div className="flex items-center justify-between py-3">
                  <span className="text-muted-foreground">Categories</span>
                  <div className="flex flex-wrap justify-end gap-1">
                    {project.category.map((cat) => (
                      <span key={cat} className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                {project.status === "Live" && (
                  <Button className="w-full" size="lg">
                    Participate Now <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {project.status === "Upcoming" && (
                  <Button className="w-full" size="lg" variant="outline">
                    Get Notified
                  </Button>
                )}
                {project.status === "Ended" && (
                  <Button className="w-full" size="lg" variant="secondary" disabled>
                    Sale Ended
                  </Button>
                )}

                {project.website && (
                  <a href={project.website} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full" variant="outline">
                      Visit Project <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <AiAssistant />
    </main>
  );
}
