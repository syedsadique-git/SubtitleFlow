import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with basic subtitle translation.',
    gradient: 'from-slate-500 to-slate-600',
    features: [
      'Real-time subtitle translation',
      '10 languages supported',
      'Basic subtitle styling',
      'Standard AI accuracy',
      'Ad-supported experience',
      'YouTube only',
      'Up to 2 hours/day',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Premium',
    price: '$9',
    period: '/month',
    description: 'For content lovers who want the best experience.',
    gradient: 'from-indigo-500 to-cyan-500',
    features: [
      'Everything in Free',
      '100+ languages supported',
      'Advanced subtitle styling & themes',
      'AI-enhanced accuracy with context',
      'Ad-free experience',
      'All video platforms',
      'Unlimited usage',
      'Offline subtitle caching',
      'Priority customer support',
      'SRT/TXT subtitle download',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$49',
    period: '/month',
    description: 'For teams and businesses needing custom solutions.',
    gradient: 'from-violet-500 to-pink-500',
    features: [
      'Everything in Premium',
      'Team management dashboard',
      'Custom AI model training',
      'Full API access',
      'White-label solution',
      'Dedicated account manager',
      '99.9% uptime SLA',
      'Custom integrations',
      'Bulk user management',
      'Advanced analytics & reporting',
      'SSO & SAML authentication',
      'Custom contract & invoicing',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

const comparisons = [
  { feature: 'Real-time translation', free: true, premium: true, enterprise: true },
  { feature: 'Languages supported', free: '10', premium: '100+', enterprise: '100+' },
  { feature: 'Video platforms', free: 'YouTube', premium: 'All', enterprise: 'All' },
  { feature: 'Ad-free', free: false, premium: true, enterprise: true },
  { feature: 'Subtitle styling', free: 'Basic', premium: 'Advanced', enterprise: 'Advanced' },
  { feature: 'AI accuracy', free: 'Standard', premium: 'Enhanced', enterprise: 'Custom' },
  { feature: 'Usage limit', free: '2 hrs/day', premium: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Offline caching', free: false, premium: true, enterprise: true },
  { feature: 'Priority support', free: false, premium: true, enterprise: true },
  { feature: 'API access', free: false, premium: false, enterprise: true },
  { feature: 'Team management', free: false, premium: false, enterprise: true },
]

export default function PricingPage() {
  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-sm font-medium mb-4">
            <Sparkles size={14} />
            Pricing
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
            Simple, Transparent{' '}
            <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Start for free, upgrade when you need more. No hidden fees, no surprises, cancel anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                plan.popular
                  ? 'border-indigo-500/50 bg-white dark:bg-slate-900 shadow-xl shadow-indigo-500/10 md:scale-105'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-medium">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className="text-slate-400 text-sm ml-1">{plan.period}</span>
              </div>

              {plan.name === 'Enterprise' ? (
                <a
                  href="#contact"
                  className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all mb-8 ${
                    plan.popular
                      ? 'bg-indigo-500 hover:bg-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-500/25'
                      : 'border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {plan.cta}
                </a>
              ) : (
                <Link
                  to="/download"
                  className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all mb-8 ${
                    plan.popular
                      ? 'bg-indigo-500 hover:bg-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-500/25'
                      : 'border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {plan.cta}
                </Link>
              )}

              <ul className="space-y-3">
                {plan.features.map(f => (
                  <li key={f} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-3">
                    <Check size={16} className="text-indigo-500 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-center mb-8">Compare Plans</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="text-left py-3 pr-4 font-semibold">Feature</th>
                  <th className="text-center py-3 px-4 font-semibold">Free</th>
                  <th className="text-center py-3 px-4 font-semibold text-indigo-500">Premium</th>
                  <th className="text-center py-3 pl-4 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map(row => (
                  <tr key={row.feature} className="border-b border-slate-100 dark:border-slate-800/50">
                    <td className="py-3 pr-4 text-slate-600 dark:text-slate-400">{row.feature}</td>
                    <td className="text-center py-3 px-4">
                      {typeof row.free === 'boolean' ? (
                        row.free ? <Check size={16} className="text-indigo-500 mx-auto" /> : <span className="text-slate-300">—</span>
                      ) : (
                        <span className="text-slate-600 dark:text-slate-400">{row.free}</span>
                      )}
                    </td>
                    <td className="text-center py-3 px-4">
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? <Check size={16} className="text-indigo-500 mx-auto" /> : <span className="text-slate-300">—</span>
                      ) : (
                        <span className="text-slate-600 dark:text-slate-400">{row.premium}</span>
                      )}
                    </td>
                    <td className="text-center py-3 pl-4">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? <Check size={16} className="text-indigo-500 mx-auto" /> : <span className="text-slate-300">—</span>
                      ) : (
                        <span className="text-slate-600 dark:text-slate-400">{row.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
