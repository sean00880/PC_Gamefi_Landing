'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const FAQ_ITEMS = [
  {
    question: 'What is the platform fee and when is it charged?',
    answer:
      'The platform fee is a percentage of the total funds raised during your IGO. It is automatically deducted from the raised amount when you finalize the sale. The fee percentage depends on your subscription tier: Free (7%), Starter (5%), Professional (3%), or Enterprise (2%).',
  },
  {
    question: 'How do listing fees work?',
    answer:
      'Listing fees are one-time payments required to submit your project for review and listing on the platform. Standard listings ($500) go through our regular review queue (5-7 days), Priority listings ($2,000) get expedited review (24-48 hours), and Featured listings ($5,000) include homepage placement and marketing support. Subscribers get discounts: Starter 25% off, Professional 50% off, Enterprise free listings.',
  },
  {
    question: 'Can I upgrade my subscription mid-cycle?',
    answer:
      'Yes! You can upgrade your subscription at any time. When you upgrade, you\'ll immediately gain access to all the benefits of your new tier. We\'ll prorate the remaining time on your current subscription and apply it as a credit toward your new plan.',
  },
  {
    question: 'What smart contract templates are included?',
    answer:
      'All tiers include access to our Standard Tax Token template. Higher tiers unlock additional templates: Starter adds Zero-Tax Token, Professional adds Deflationary and Reflection tokens, and Enterprise includes all templates plus custom contract development. All contracts are audited and battle-tested.',
  },
  {
    question: 'How does the staking tier system affect my benefits?',
    answer:
      'Staking PCGF tokens gives you additional benefits beyond your subscription. Higher staking tiers (Bronze through Quantum) provide allocation multipliers for participating in IGOs, early access to sales, and increased APY rewards. Staking benefits stack with your subscription benefits.',
  },
  {
    question: 'What happens if my sale doesn\'t reach its minimum goal?',
    answer:
      'If a sale fails to reach its minimum (soft cap) by the end date, all contributors can claim full refunds. No platform fees are charged on failed sales. Your listing fee is non-refundable, but we offer a 50% discount on your next listing attempt.',
  },
  {
    question: 'Are there any hidden fees?',
    answer:
      'No hidden fees. You only pay: (1) the subscription fee (if applicable), (2) the one-time listing fee for each project, and (3) the platform fee on successfully raised funds. Gas fees for blockchain transactions are paid separately by users interacting with smart contracts.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'For subscriptions and listing fees, we accept major credit cards, crypto payments (ETH, USDC, USDT), and PCGF tokens (with a 10% discount). Enterprise customers can also pay via wire transfer or invoice.',
  },
  {
    question: 'Is there a free trial for paid plans?',
    answer:
      'We don\'t offer traditional free trials, but our Free tier lets you experience the platform with full functionality. The main differences are the platform fee percentage and access to advanced contract templates. You can launch a real project on Free tier and upgrade anytime.',
  },
  {
    question: 'How do refunds work for subscriptions?',
    answer:
      'Monthly subscriptions can be cancelled anytime with no refund for the current period. Annual subscriptions can be refunded within 14 days if you haven\'t used any paid features. After that, you can cancel but will retain access until your billing period ends.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              FAQ
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about our pricing and platform.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className="rounded-2xl border border-border bg-background overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="pr-4 font-semibold text-foreground">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="border-t border-border px-6 pb-6 pt-4">
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 rounded-2xl border border-border bg-muted/30 p-8 text-center">
          <h3 className="mb-2 text-xl font-bold text-foreground">
            Still have questions?
          </h3>
          <p className="mb-6 text-muted-foreground">
            Our team is here to help. Reach out and we'll get back to you within 24 hours.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90">
              Contact Support
            </button>
            <button className="rounded-xl border border-border bg-background px-6 py-3 font-semibold text-foreground hover:bg-muted">
              Join Discord
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
