import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Free',
    subtitle: 'For casual viewers',
    price: '$0',
    period: 'forever',
    gradient: 'from-slate-500 to-slate-600',
    features: [
      'Real-time subtitle translation',
      '10 languages supported',
      'Basic subtitle styling',
      'Standard accuracy',
      'Ad-supported',
      'YouTube only',
      'Up to 2 hours/day',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Premium',
    subtitle: 'For content lovers',
    price: '$9',
    period: '/month',
    gradient: 'from-indigo-500 to-cyan-500',
    features: [
      'Everything in Free, plus:',
      '100+ languages supported',
      'Advanced subtitle styling',
      'AI-enhanced accuracy',
      'Ad-free experience',
      'All video platforms',
      'Unlimited usage',
      'Offline subtitle caching',
      'Priority support',
      'SRT/TXT download',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    subtitle: 'For teams & businesses',
    price: '$49',
    period: '/month',
    gradient: 'from-violet-500 to-pink-500',
    features: [
      'Everything in Premium, plus:',
      'Team management dashboard',
      'Custom AI model training',
      'API access for integrations',
      'White-label solution',
      'Dedicated account manager',
      'SLA guarantee (99.9% uptime)',
      'Custom integrations',
      'Bulk user management',
      'Advanced analytics',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden scroll-mt-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/5 via-transparent to-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-sm font-medium mb-4">
            <Sparkles size={14} />
            Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Simple, Transparent{' '}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Start for free, upgrade when you need more. No hidden fees, no surprises.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl border card-hover ${
                plan.popular
                  ? 'border-indigo-500/50 bg-white dark:bg-slate-900 shadow-xl shadow-indigo-500/10 md:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:shadow-xl hover:shadow-slate-900/5 dark:hover:shadow-slate-900/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-medium">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{plan.subtitle}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className="text-slate-400 text-sm ml-1">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-3">
                    <Check size={16} className="text-indigo-500 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to={plan.name === 'Enterprise' ? '#' : '/pricing'}
                className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all ${
                  plan.popular
                    ? 'bg-indigo-500 hover:bg-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-500/25'
                    : 'border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
