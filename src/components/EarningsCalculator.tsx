import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calculator,
  // TrendingUp,
  Sparkles,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { AnimatedCounter, SpotlightCard } from './AnimatedComponents';

interface EarningsCalculatorProps {
  onStartCampaign: (details?: {
    name: string;
    type: string;
    budget: string;
  }) => void;
  onJoinCreator: (lane?: string) => void;
}

export const EarningsCalculator: React.FC<EarningsCalculatorProps> = ({
  onStartCampaign,
  onJoinCreator,
}) => {
  const [role, setRole] = useState<'creator' | 'brand'>('creator');
  const [lane, setLane] = useState<'ugc' | 'clipper' | 'influencer'>('ugc');
  const [views, setViews] = useState<number>(150000); // 150K views default

  // Rate calculations in Naira (₦)
  // UGC: Base + View bonus
  // Clipper: Pure view performance
  // Micro-Influencer: Voice + guaranteed views
  const rateConfigs = {
    ugc: {
      name: 'UGC Creator',
      baseFeeNGN: 45000,
      cpmNGN: 220, // ₦220 per 1,000 views
      agencyCPV_NGN: 6.8,
      creatorsCPV_NGN: 0.85,
    },
    clipper: {
      name: 'Clipper',
      baseFeeNGN: 15000,
      cpmNGN: 290, // higher performance share
      agencyCPV_NGN: 8.5,
      creatorsCPV_NGN: 0.72,
    },
    influencer: {
      name: 'Micro & Nano Influencer',
      baseFeeNGN: 60000,
      cpmNGN: 250,
      agencyCPV_NGN: 9.2,
      creatorsCPV_NGN: 0.95,
    },
  };

  const currentConfig = rateConfigs[lane];

  // Creator Payout Calculation in Naira
  const totalPayoutNGN = Math.round(
    currentConfig.baseFeeNGN + (views / 1000) * currentConfig.cpmNGN
  );

  // Brand budget recommendation in Naira
  const brandEstBudgetNGN = Math.round(views * currentConfig.creatorsCPV_NGN);
  const brandTraditionalCostNGN = Math.round(
    views * currentConfig.agencyCPV_NGN
  );
  const brandSavingsPercent = Math.round(
    ((brandTraditionalCostNGN - brandEstBudgetNGN) / brandTraditionalCostNGN) *
      100
  );

  const displayEarnings = totalPayoutNGN;
  const currencySymbol = '₦';

  return (
    <section
      id="calculator"
      className="py-24 md:py-32 bg-transparent text-[#1C1917] relative overflow-hidden border-t border-[#1C1917]/10"
    >
      {/* Parallax Background shapes */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-[#FFDDBF] opacity-60 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 rounded-full bg-[#BAE6FD] opacity-60 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#1C1917]/10 bg-[#BAE6FD] text-[#1C1917] text-xs font-bold uppercase tracking-wider mb-5 shadow-xs"
          >
            <Calculator className="w-3.5 h-3.5 text-[#1C1917]" />
            <span>Interactive Performance Simulator</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1C1917] tracking-tight leading-[1.08] mb-6"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Simulate your earnings &{' '}
            <span className="text-[#FB7185]">performance ROI.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-[#1C1917]/85 font-normal leading-relaxed"
          >
            Transparent math built for the African creator economy. Drag the
            slider to see realistic payouts and campaign cost savings.
          </motion.p>
        </div>

        {/* Interactive Simulator Bento Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <SpotlightCard className="p-5 sm:p-7 md:p-9 rounded-3xl bg-[#FAFAF9] border border-[#1C1917]/10 shadow-xl">
              {/* Role Toggle: Creator vs Brand */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1C1917]/10 mb-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1C1917]/60">
                    I am exploring as a:
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => setRole('creator')}
                      className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        role === 'creator'
                          ? 'bg-[#1C1917] text-white shadow-sm'
                          : 'bg-white border border-[#1C1917]/10 text-[#1C1917]'
                      }`}
                    >
                      Creator / Clipper
                    </button>
                    <button
                      onClick={() => setRole('brand')}
                      className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        role === 'brand'
                          ? 'bg-[#1C1917] text-white shadow-sm'
                          : 'bg-white border border-[#1C1917]/10 text-[#1C1917]'
                      }`}
                    >
                      Brand Marketer
                    </button>
                  </div>
                </div>

                {/* Currency Badge */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1C1917]/60 sm:text-right">
                    Currency:
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#1C1917]/10 mt-2 text-xs font-bold text-[#1C1917]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>₦ Naira (NGN)</span>
                  </div>
                </div>
              </div>

              {/* Creator Lane Selector */}
              <div className="mb-8">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917]/70 mb-3">
                  Select Content Lane
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(['ugc', 'clipper', 'influencer'] as const).map((lKey) => {
                    const lName = rateConfigs[lKey].name;
                    return (
                      <button
                        key={lKey}
                        onClick={() => setLane(lKey)}
                        className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                          lane === lKey
                            ? 'bg-[#BAE6FD]/50 border-[#FB7185] shadow-xs'
                            : 'bg-white border-[#1C1917]/10 hover:border-[#1C1917]/30'
                        }`}
                      >
                        <div className="text-xs sm:text-sm font-bold text-[#1C1917]">
                          {lName}
                        </div>
                        <div className="text-[11px] text-[#1C1917]/60 font-medium mt-0.5">
                          {lKey === 'ugc'
                            ? 'Base + Views'
                            : lKey === 'clipper'
                              ? 'Pure Performance'
                              : 'Voice & Retainers'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* View Count Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1C1917]/70">
                    Estimated Campaign Views
                  </label>
                  <span
                    className="text-2xl font-extrabold text-[#FB7185] tracking-tight"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
                    {views >= 1000000
                      ? `${(views / 1000000).toFixed(1)}M views`
                      : `${Math.round(views / 1000)}K views`}
                  </span>
                </div>

                <input
                  type="range"
                  min="20000"
                  max="1500000"
                  step="10000"
                  value={views}
                  onChange={(e) => setViews(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FB7185]"
                />

                <div className="flex justify-between text-[11px] font-bold text-[#1C1917]/50 mt-2">
                  <span>20K (Micro Brief)</span>
                  <span>500K (Standard)</span>
                  <span>1.5M+ (Viral Campaign)</span>
                </div>
              </div>

              {/* Dynamic Feature Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-[#1C1917]/10 text-xs font-semibold text-[#1C1917]/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span>Escrow-guaranteed before work begins</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FB7185] flex-shrink-0" />
                  <span>No 90-day agency invoice delays</span>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Real-time Output Column (5 cols) */}
          <div className="lg:col-span-5">
            <SpotlightCard className="p-5 sm:p-7 md:p-9 rounded-3xl bg-[#FAFAF9] border border-[#1C1917]/10 shadow-2xl relative overflow-hidden">
              {/* Top Accent Strip */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-[#FB7185]" />

              <div className="flex items-center justify-between pb-4 border-b border-[#1C1917]/10">
                <div className="text-xs font-bold uppercase tracking-wider text-[#1C1917]/70">
                  {role === 'creator'
                    ? 'Estimated Creator Takehome'
                    : 'Recommended Campaign Budget'}
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300">
                  Real-time calc
                </span>
              </div>

              <div className="my-6">
                <div className="text-xs font-semibold text-[#1C1917]/60 mb-1">
                  {role === 'creator'
                    ? `Projected Total for ~${views.toLocaleString()} views`
                    : `Estimated spend for ~${views.toLocaleString()} verified views`}
                </div>
                <div
                  className="text-4xl sm:text-5xl font-extrabold text-[#1C1917] tracking-tight flex items-baseline gap-1"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  <span>{currencySymbol}</span>
                  <AnimatedCounter
                    to={
                      role === 'creator' ? displayEarnings : brandEstBudgetNGN
                    }
                  />
                </div>
              </div>

              {/* Breakdown metrics */}
              <div className="space-y-3 p-4 rounded-2xl bg-white border border-[#1C1917]/10 mb-6">
                {role === 'creator' ? (
                  <>
                    <div className="flex justify-between text-xs font-medium text-[#1C1917]">
                      <span className="text-[#1C1917]/70">
                        Base deliverable rate
                      </span>
                      <span className="font-bold">
                        ₦{currentConfig.baseFeeNGN.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs font-medium text-[#1C1917]">
                      <span className="text-[#1C1917]/70">
                        Performance view bonus
                      </span>
                      <span className="font-bold text-emerald-700">
                        +₦
                        {Math.round(
                          (views / 1000) * currentConfig.cpmNGN
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs font-medium text-[#1C1917] pt-2 border-t border-[#1C1917]/10">
                      <span className="text-[#1C1917]/70">
                        Average payment time
                      </span>
                      <span className="font-bold text-emerald-700">
                        Under 2 hours
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-xs font-medium text-[#1C1917]">
                      <span className="text-[#1C1917]/70">
                        CreatorsRewards CPV
                      </span>
                      <span className="font-bold text-emerald-700">
                        ₦{currentConfig.creatorsCPV_NGN}/view
                      </span>
                    </div>
                    <div className="flex justify-between text-xs font-medium text-[#1C1917]">
                      <span className="text-[#1C1917]/70">
                        Traditional Agency Cost
                      </span>
                      <span className="font-bold text-gray-500 line-through">
                        ₦{brandTraditionalCostNGN.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-[#1C1917] pt-2 border-t border-[#1C1917]/10">
                      <span>Performance Savings</span>
                      <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {brandSavingsPercent}% More Efficient
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Action Button */}
              {role === 'creator' ? (
                <button
                  id="calc-join-creator-btn"
                  onClick={() => onJoinCreator(currentConfig.name)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#FB7185] hover:bg-[#F43F5E] shadow-lg shadow-[#FB7185]/25 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-white flex-shrink-0" />
                  <span className="truncate">
                    Join & Claim This Lane ({currentConfig.name})
                  </span>
                  <ArrowRight className="w-4 h-4 text-white ml-1 flex-shrink-0" />
                </button>
              ) : (
                <button
                  id="calc-start-campaign-btn"
                  onClick={() =>
                    onStartCampaign({
                      name: `${currentConfig.name} Launch`,
                      type: currentConfig.name,
                      budget: `₦${brandEstBudgetNGN.toLocaleString()}`,
                    })
                  }
                  className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#FB7185] hover:bg-[#F43F5E] shadow-lg shadow-[#FB7185]/25 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-white" />
                  <span>Fund Campaign with This Estimate</span>
                  <ArrowRight className="w-4 h-4 text-white ml-1" />
                </button>
              )}
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
};
