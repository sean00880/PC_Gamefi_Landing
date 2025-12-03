import { STATS } from '@/lib/constants'

export function StatsSection() {
  return (
    <section className="border-y border-border bg-foreground py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-8 divide-y divide-background/20 md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0">
          <div className="flex flex-col items-center space-y-2 text-center md:items-start md:pl-8">
            <span className="text-sm font-medium uppercase tracking-wider text-background/60">
              ATH Avg ROI
            </span>
            <span className="text-4xl font-bold text-primary dark:text-green-500 md:text-5xl">
              {STATS.athRoi}
            </span>
          </div>

          <div className="flex flex-col items-center space-y-2 pt-8 text-center md:items-start md:pl-8 md:pt-0">
            <span className="text-sm font-medium uppercase tracking-wider text-background/60">
              Total Raised
            </span>
            <span className="text-4xl font-bold text-background md:text-5xl">
              {STATS.totalRaised}
            </span>
          </div>

          <div className="flex flex-col items-center space-y-2 pt-8 text-center md:items-start md:pl-8 md:pt-0">
            <span className="text-sm font-medium uppercase tracking-wider text-background/60">
              Total Users
            </span>
            <span className="text-4xl font-bold text-background md:text-5xl">
              {STATS.totalUsers}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
