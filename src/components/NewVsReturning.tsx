import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { UserPlus, UserCheck, Wallet, PlayCircle, TrendingUp, Repeat } from 'lucide-react';

const dailyActiveData = [
  { date: '03-01', newUsers: 12500, returningUsers: 45000 },
  { date: '03-02', newUsers: 13200, returningUsers: 46200 },
  { date: '03-03', newUsers: 14100, returningUsers: 47500 },
  { date: '03-04', newUsers: 15500, returningUsers: 48100 },
  { date: '03-05', newUsers: 16800, returningUsers: 51000 },
  { date: '03-06', newUsers: 18200, returningUsers: 53500 },
  { date: '03-07', newUsers: 17500, returningUsers: 55200 },
];

const revenueSplitData = [
  { name: '新用户 (首充+首日广告)', value: 35 },
  { name: '老用户 (复购+日常广告)', value: 65 },
];

const COLORS = ['#3b82f6', '#10b981'];

const conversionData = [
  { metric: '付费转化率', new: 4.5, returning: 12.8 }, // 新用户首充 vs 老用户复购
  { metric: '广告渗透率', new: 65.2, returning: 42.5 }, // 新用户更倾向看广告解锁
  { metric: '次日留存预估', new: 46.5, returning: 85.2 }, // 老用户粘性更高
];

const engagementData = [
  { metric: '单日观看集数', new: 15, returning: 28 },
  { metric: '单日停留(分钟)', new: 35, returning: 65 },
  { metric: 'ARPU (USD)', new: 0.85, returning: 2.45 },
];

export default function NewVsReturning({ app, country, dateRange, os }: any) {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">新增用户占比 (DAU)</span>
            <UserPlus className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-800">24.1%</div>
          <div className="text-sm text-slate-500 mt-1">
            日均新增 <span className="text-slate-700 font-medium">15.4K</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">老用户占比 (DAU)</span>
            <UserCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-800">75.9%</div>
          <div className="text-sm text-slate-500 mt-1">
            日均活跃 <span className="text-slate-700 font-medium">49.5K</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">新用户首充转化率</span>
            <Wallet className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-slate-800">4.5%</div>
          <div className="text-sm text-emerald-600 flex items-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" /> +0.2%
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">老用户复购率</span>
            <Repeat className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-slate-800">12.8%</div>
          <div className="text-sm text-emerald-600 flex items-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" /> +1.1%
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">活跃用户构成趋势 (DAU)</CardTitle>
            <CardDescription>每日新增用户与老用户的规模变化</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyActiveData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="colorReturning" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(value) => `${value / 1000}k`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [value.toLocaleString(), '']}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Area type="monotone" dataKey="returningUsers" name="老用户 (Returning)" stackId="1" stroke="#10b981" fill="url(#colorReturning)" />
                  <Area type="monotone" dataKey="newUsers" name="新用户 (New)" stackId="1" stroke="#3b82f6" fill="url(#colorNew)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">大盘收入贡献占比</CardTitle>
            <CardDescription>新老用户对整体营收的贡献度</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-2 flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie
                    data={revenueSplitData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {revenueSplitData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [`${value}%`, '收入占比']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 w-full mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-slate-600">新用户 (35%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-sm text-slate-600">老用户 (65%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">转化与粘性对比 (%)</CardTitle>
            <CardDescription>新老用户在付费、看广告及留存上的比率差异</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="metric" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(val) => `${val}%`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [`${value}%`, '']}
                    cursor={{ fill: '#f8fafc' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="new" name="新用户" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="returning" name="老用户" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">深度参与度对比 (绝对值)</CardTitle>
            <CardDescription>新老用户在观看集数、时长及 ARPU 上的差异</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="metric" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number, name: string, props: any) => {
                      const metric = props.payload.metric;
                      if (metric.includes('ARPU')) return [`$${value}`, name];
                      if (metric.includes('分钟')) return [`${value} 分钟`, name];
                      return [`${value} 集`, name];
                    }}
                    cursor={{ fill: '#f8fafc' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="new" name="新用户" fill="#60a5fa" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="returning" name="老用户" fill="#34d399" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
