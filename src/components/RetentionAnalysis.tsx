import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Users, CalendarDays, TrendingUp, Target } from 'lucide-react';

const retentionCurveData = [
  { day: '次日 (D1)', rate: 46.5 },
  { day: 'D2', rate: 33.8 },
  { day: 'D3', rate: 29.1 },
  { day: 'D4', rate: 26.4 },
  { day: 'D5', rate: 24.8 },
  { day: 'D6', rate: 23.1 },
  { day: '7日 (D7)', rate: 22.5 },
  { day: '14日 (D14)', rate: 16.2 },
  { day: '30日 (D30)', rate: 11.8 },
];

const cohortData = [
  { date: '03-01', size: 12500, d1: 46.2, d2: 33.1, d3: 29.5, d4: 26.1, d5: 24.5, d6: 22.8, d7: 22.4, d14: 16.1, d30: 11.5 },
  { date: '03-02', size: 13200, d1: 45.8, d2: 32.8, d3: 28.4, d4: 25.8, d5: 24.1, d6: 22.5, d7: 21.8, d14: 15.5, d30: 10.9 },
  { date: '03-03', size: 14100, d1: 44.5, d2: 31.5, d3: 27.2, d4: 24.5, d5: 23.2, d6: 21.5, d7: 20.5, d14: 14.8, d30: null },
  { date: '03-04', size: 15500, d1: 47.1, d2: 34.2, d3: 29.8, d4: 27.1, d5: 25.5, d6: 23.8, d7: 23.1, d14: null, d30: null },
  { date: '03-05', size: 16800, d1: 46.5, d2: 33.5, d3: 28.9, d4: 26.5, d5: 24.8, d6: null, d7: null, d14: null, d30: null },
  { date: '03-06', size: 18200, d1: 48.2, d2: 35.1, d3: 30.5, d4: 28.2, d5: null, d6: null, d7: null, d14: null, d30: null },
  { date: '03-07', size: 17500, d1: 47.8, d2: 34.8, d3: null, d4: null, d5: null, d6: null, d7: null, d14: null, d30: null },
];

const getHeatmapColor = (value: number | null) => {
  if (value === null) return 'bg-slate-50 text-transparent';
  if (value >= 45) return 'bg-indigo-600 text-white font-semibold';
  if (value >= 35) return 'bg-indigo-500 text-white font-semibold';
  if (value >= 25) return 'bg-indigo-400 text-white font-medium';
  if (value >= 20) return 'bg-indigo-300 text-slate-800 font-medium';
  if (value >= 15) return 'bg-indigo-200 text-slate-800';
  if (value >= 10) return 'bg-indigo-100 text-slate-800';
  return 'bg-slate-100 text-slate-500';
};

export default function RetentionAnalysis({ app, country, dateRange, os }: any) {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">平均次留 (D1)</span>
            <CalendarDays className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-slate-800">46.5%</div>
          <div className="text-sm text-emerald-600 flex items-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" /> +2.1%
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">平均 7日留存 (D7)</span>
            <Target className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-800">22.5%</div>
          <div className="text-sm text-emerald-600 flex items-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" /> +1.5%
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">平均 30日留存 (D30)</span>
            <Users className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-slate-800">11.8%</div>
          <div className="text-sm text-emerald-600 flex items-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" /> +0.8%
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">留存健康度评分</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">A-</div>
          <div className="text-sm text-slate-500 mt-1">
            高于行业基准 15%
          </div>
        </div>
      </div>

      {/* Retention Curve */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">平均留存衰减曲线</CardTitle>
          <CardDescription>展示用户在首次激活后 30 天内的平均留存率变化趋势</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={retentionCurveData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `${val}%`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`${value.toFixed(1)}%`, '留存率']}
                />
                <Line type="monotone" dataKey="rate" name="平均留存率" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Cohort Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">同期群留存热力图 (Cohort Analysis)</CardTitle>
          <CardDescription>按每日新增用户批次，追踪其在后续每一天的留存表现</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-sm text-center border-collapse">
              <thead>
                <tr>
                  <th className="p-3 text-slate-500 font-medium border-b border-slate-200 text-left">日期</th>
                  <th className="p-3 text-slate-500 font-medium border-b border-slate-200">新增用户</th>
                  <th className="p-3 text-slate-500 font-medium border-b border-slate-200">次日</th>
                  <th className="p-3 text-slate-500 font-medium border-b border-slate-200">2日</th>
                  <th className="p-3 text-slate-500 font-medium border-b border-slate-200">3日</th>
                  <th className="p-3 text-slate-500 font-medium border-b border-slate-200">4日</th>
                  <th className="p-3 text-slate-500 font-medium border-b border-slate-200">5日</th>
                  <th className="p-3 text-slate-500 font-medium border-b border-slate-200">6日</th>
                  <th className="p-3 text-slate-500 font-medium border-b border-slate-200">7日</th>
                  <th className="p-3 text-slate-500 font-medium border-b border-slate-200">14日</th>
                  <th className="p-3 text-slate-500 font-medium border-b border-slate-200">30日</th>
                </tr>
              </thead>
              <tbody>
                {cohortData.map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 last:border-0">
                    <td className="p-3 text-slate-700 font-medium text-left">{row.date}</td>
                    <td className="p-3 text-slate-600">{row.size.toLocaleString()}</td>
                    <td className="p-1"><div className={`py-2 px-1 rounded ${getHeatmapColor(row.d1)}`}>{row.d1 ? `${row.d1}%` : ''}</div></td>
                    <td className="p-1"><div className={`py-2 px-1 rounded ${getHeatmapColor(row.d2)}`}>{row.d2 ? `${row.d2}%` : ''}</div></td>
                    <td className="p-1"><div className={`py-2 px-1 rounded ${getHeatmapColor(row.d3)}`}>{row.d3 ? `${row.d3}%` : ''}</div></td>
                    <td className="p-1"><div className={`py-2 px-1 rounded ${getHeatmapColor(row.d4)}`}>{row.d4 ? `${row.d4}%` : ''}</div></td>
                    <td className="p-1"><div className={`py-2 px-1 rounded ${getHeatmapColor(row.d5)}`}>{row.d5 ? `${row.d5}%` : ''}</div></td>
                    <td className="p-1"><div className={`py-2 px-1 rounded ${getHeatmapColor(row.d6)}`}>{row.d6 ? `${row.d6}%` : ''}</div></td>
                    <td className="p-1"><div className={`py-2 px-1 rounded ${getHeatmapColor(row.d7)}`}>{row.d7 ? `${row.d7}%` : ''}</div></td>
                    <td className="p-1"><div className={`py-2 px-1 rounded ${getHeatmapColor(row.d14)}`}>{row.d14 ? `${row.d14}%` : ''}</div></td>
                    <td className="p-1"><div className={`py-2 px-1 rounded ${getHeatmapColor(row.d30)}`}>{row.d30 ? `${row.d30}%` : ''}</div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
