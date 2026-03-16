import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, LineChart, Line, ComposedChart } from 'recharts';
import { DollarSign, TrendingUp, PlaySquare, Percent, Target, Coins } from 'lucide-react';

const revenueData = [
  { date: '03-01', iap: 45000, iaa: 12000 },
  { date: '03-02', iap: 48000, iaa: 13500 },
  { date: '03-03', iap: 46000, iaa: 12800 },
  { date: '03-04', iap: 52000, iaa: 15000 },
  { date: '03-05', iap: 58000, iaa: 16500 },
  { date: '03-06', iap: 61000, iaa: 18000 },
  { date: '03-07', iap: 59000, iaa: 17500 },
];

const adPerformanceData = [
  { date: '03-01', impressions: 1200000, ecpm: 10.0, penetration: 45 },
  { date: '03-02', impressions: 1350000, ecpm: 10.0, penetration: 46 },
  { date: '03-03', impressions: 1280000, ecpm: 10.0, penetration: 45 },
  { date: '03-04', impressions: 1450000, ecpm: 10.3, penetration: 48 },
  { date: '03-05', impressions: 1600000, ecpm: 10.3, penetration: 50 },
  { date: '03-06', impressions: 1750000, ecpm: 10.2, penetration: 52 },
  { date: '03-07', impressions: 1680000, ecpm: 10.4, penetration: 51 },
];

export default function HybridMonetization({ app, country, dateRange, os }: any) {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">总收入 (IAA+IAP)</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-800">$474,300</div>
          <div className="text-sm text-emerald-600 flex items-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" /> +12.5%
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">综合 ARPU</span>
            <Target className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-800">$1.85</div>
          <div className="text-sm text-emerald-600 flex items-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" /> +5.2%
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">广告展示量</span>
            <PlaySquare className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-slate-800">10.3M</div>
          <div className="text-sm text-emerald-600 flex items-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" /> +15.3%
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">平均 eCPM</span>
            <Coins className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-800">$10.17</div>
          <div className="text-sm text-emerald-600 flex items-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" /> +2.1%
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">广告渗透率</span>
            <Percent className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-slate-800">48.5%</div>
          <div className="text-sm text-emerald-600 flex items-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" /> +3.4%
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">收入构成趋势 (IAP vs IAA)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIap" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorIaa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Area type="monotone" dataKey="iap" name="内购收入 (IAP)" stackId="1" stroke="#3b82f6" strokeWidth={2} fill="url(#colorIap)" />
                <Area type="monotone" dataKey="iaa" name="广告收入 (IAA)" stackId="1" stroke="#8b5cf6" strokeWidth={2} fill="url(#colorIaa)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">广告展示量与渗透率</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={adPerformanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(value) => `${value / 1000000}M`} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number, name: string) => {
                    if (name === '广告展示量') return [`${(value / 1000000).toFixed(2)}M`, name];
                    return [`${value}%`, name];
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar yAxisId="left" dataKey="impressions" name="广告展示量" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Line yAxisId="right" type="monotone" dataKey="penetration" name="广告渗透率" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">eCPM 趋势</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={adPerformanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'eCPM']}
              />
              <Line type="monotone" dataKey="ecpm" name="eCPM" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
