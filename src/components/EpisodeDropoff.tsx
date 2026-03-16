import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, ReferenceLine, ComposedChart, PieChart, Pie, Legend, LabelList } from 'recharts';
import { PlaySquare, AlertTriangle, Lock, Unlock, TrendingDown, Clock, Filter, SplitSquareHorizontal } from 'lucide-react';

// 模拟单剧各集播放与流失数据
const episodeDropoffData = [
  { ep: '第1集', views: 100000, dropRate: 15, isPaywall: false },
  { ep: '第2集', views: 85000, dropRate: 12, isPaywall: false },
  { ep: '第3集', views: 74800, dropRate: 10, isPaywall: false },
  { ep: '第4集', views: 67320, dropRate: 8, isPaywall: false },
  { ep: '第5集', views: 61934, dropRate: 9, isPaywall: false },
  { ep: '第6集', views: 56359, dropRate: 7, isPaywall: false },
  { ep: '第7集', views: 52413, dropRate: 6, isPaywall: false },
  { ep: '第8集(付费墙)', views: 49268, dropRate: 65, isPaywall: true }, // 付费墙，流失率剧增
  { ep: '第9集', views: 17243, dropRate: 15, isPaywall: false },
  { ep: '第10集', views: 14656, dropRate: 10, isPaywall: false },
  { ep: '第11集', views: 13190, dropRate: 8, isPaywall: false },
  { ep: '第12集', views: 12134, dropRate: 5, isPaywall: false },
];

// 模拟第一集前60秒留存曲线
const firstEpRetentionData = [
  { time: '0s', retention: 100 },
  { time: '5s', retention: 88 },
  { time: '10s', retention: 75 },
  { time: '15s', retention: 68 },
  { time: '20s', retention: 62 },
  { time: '25s', retention: 58 },
  { time: '30s', retention: 55 }, // 30秒跳出率 = 45%
  { time: '40s', retention: 50 },
  { time: '50s', retention: 46 },
  { time: '60s', retention: 42 },
];

// 付费墙解锁行为分布
const paywallActionData = [
  { name: '内购金币解锁', value: 25 },
  { name: '看广告解锁', value: 10 },
  { name: '直接流失', value: 65 },
];
const COLORS = ['#3b82f6', '#10b981', '#ef4444'];

// 付费墙 A/B 测试数据
const abTestData = [
  { ep: '第5集', groupA: 61934, groupB: 62100 },
  { ep: '第6集', groupA: 56359, groupB: 57500 },
  { ep: '第7集', groupA: 52413, groupB: 53800 },
  { ep: '第8集', groupA: 49268, groupB: 18830 }, // B组在第8集设置付费墙
  { ep: '第9集', groupA: 46800, groupB: 16500 },
  { ep: '第10集', groupA: 44500, groupB: 14800 },
  { ep: '第11集', groupA: 15575, groupB: 13500 }, // A组在第11集设置付费墙
  { ep: '第12集', groupA: 13800, groupB: 12400 },
];

export default function EpisodeDropoff({ app, country, dateRange, os }: any) {
  const [selectedDrama, setSelectedDrama] = useState('drama_01');
  const [viewMode, setViewMode] = useState<'standard' | 'ab_test'>('standard');

  return (
    <div className="space-y-6">
      {/* 顶部单剧选择器 */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
            <PlaySquare className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">单剧流失与付费墙分析</h2>
            <p className="text-xs text-slate-500">深入分析单部剧集的集数漏斗与付费阻断效应</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* 视图切换 */}
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('standard')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'standard' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              标准视图
            </button>
            <button
              onClick={() => setViewMode('ab_test')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                viewMode === 'ab_test' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <SplitSquareHorizontal className="w-4 h-4" />
              A/B 测试对比
            </button>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select 
              className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer"
              value={selectedDrama}
              onChange={(e) => setSelectedDrama(e.target.value)}
            >
              <option value="drama_01">《霸道总裁的秘密契约》 (爆款)</option>
              <option value="drama_02">《狼人家族的复仇》 (连载中)</option>
              <option value="drama_03">《闪婚亿万富翁》 (完结)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 核心指标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">第一集 30秒跳出率</span>
            <Clock className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold text-slate-800">45.0%</div>
          <div className="text-sm text-rose-600 flex items-center mt-1">
            <TrendingDown className="w-3 h-3 mr-1" /> 较均值高 5% (需优化开头)
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">付费墙到达率 (第8集)</span>
            <Lock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-800">49.2%</div>
          <div className="text-sm text-emerald-600 flex items-center mt-1">
            <TrendingDown className="w-3 h-3 mr-1" /> 表现优异
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">付费墙综合解锁率</span>
            <Unlock className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-800">35.0%</div>
          <div className="text-sm text-slate-500 mt-1">
            内购 25% + 广告 10%
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">付费墙直接流失率</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-800">65.0%</div>
          <div className="text-sm text-amber-600 flex items-center mt-1">
            <AlertTriangle className="w-3 h-3 mr-1" /> 阻断效应强烈
          </div>
        </div>
      </div>

      {viewMode === 'standard' ? (
        <>
          {/* 各集流失漏斗图 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">单部剧集各集播放量与流失率</CardTitle>
              <CardDescription>直观展示用户在哪一集大量流失，红色柱子代表设置了付费墙的集数</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={episodeDropoffData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="ep" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(val) => `${val / 1000}k`} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(val) => `${val}%`} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: number, name: string) => {
                        if (name === '流失率') return [`${value}%`, name];
                        return [value.toLocaleString(), name];
                      }}
                      cursor={{ fill: '#f8fafc' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar yAxisId="left" dataKey="views" name="播放量 (人次)" radius={[4, 4, 0, 0]} maxBarSize={50}>
                      {episodeDropoffData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.isPaywall ? '#ef4444' : '#3b82f6'} />
                      ))}
                      <LabelList dataKey="views" position="top" formatter={(val: number) => `${(val / 1000).toFixed(1)}k`} style={{ fontSize: '10px', fill: '#64748b' }} />
                    </Bar>
                    <Line yAxisId="right" type="monotone" dataKey="dropRate" name="流失率" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* 底部两列图表 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 第一集 30秒跳出率 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">第一集前 60 秒完播留存曲线</CardTitle>
                <CardDescription>用于诊断剧集开头是否足够吸引人（黄金前 3 秒/30 秒）</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={firstEpRetentionData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(val) => `${val}%`} domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: number) => [`${value}%`, '留存率']}
                      />
                      <ReferenceLine x="30s" stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: '30秒跳出节点', fill: '#ef4444', fontSize: 12 }} />
                      <Line type="monotone" dataKey="retention" name="留存率" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* 付费墙转化拆解 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">付费墙用户行为流向 (第 8 集)</CardTitle>
                <CardDescription>到达付费墙的用户最终是如何选择的</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full mt-2 flex flex-col items-center justify-center">
                  <ResponsiveContainer width="100%" height="80%">
                    <PieChart>
                      <Pie
                        data={paywallActionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {paywallActionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: number) => [`${value}%`, '占比']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-6 w-full mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-slate-600">内购解锁</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span className="text-sm text-slate-600">看广告解锁</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                      <span className="text-sm text-slate-600">直接流失</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          {/* A/B 测试对比视图 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">付费墙位置 A/B 测试对比</CardTitle>
                <CardDescription>对比不同集数设置付费墙对后续播放量和整体收入的影响</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={abTestData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="ep" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(val) => `${val / 1000}k`} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: number) => [value.toLocaleString(), '播放量']}
                      />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      
                      {/* B组付费墙标记 */}
                      <ReferenceLine x="第8集" stroke="#10b981" strokeDasharray="3 3" label={{ position: 'top', value: 'B组付费墙 (第8集)', fill: '#10b981', fontSize: 12 }} />
                      <Line type="monotone" dataKey="groupB" name="B组 (第8集收费)" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                      
                      {/* A组付费墙标记 */}
                      <ReferenceLine x="第11集" stroke="#3b82f6" strokeDasharray="3 3" label={{ position: 'top', value: 'A组付费墙 (第11集)', fill: '#3b82f6', fontSize: 12 }} />
                      <Line type="monotone" dataKey="groupA" name="A组 (第11集收费)" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="bg-blue-50 border-blue-100">
                <CardContent className="p-4">
                  <h4 className="font-bold text-blue-900 mb-2">A组 (第11集收费 - 延迟变现)</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex justify-between"><span>到达付费墙人数:</span> <span className="font-bold">44,500</span></li>
                    <li className="flex justify-between"><span>付费墙转化率:</span> <span className="font-bold">35.0%</span></li>
                    <li className="flex justify-between"><span>单集平均收入:</span> <span className="font-bold">$0.85</span></li>
                    <li className="flex justify-between pt-2 border-t border-blue-200"><span>预估总收入:</span> <span className="font-bold text-lg">$13,238</span></li>
                  </ul>
                  <p className="text-xs text-blue-600 mt-3 bg-blue-100/50 p-2 rounded">
                    结论：养鱼期长，到达付费墙的人数少，但用户粘性高，转化率好。
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-emerald-50 border-emerald-100">
                <CardContent className="p-4">
                  <h4 className="font-bold text-emerald-900 mb-2">B组 (第8集收费 - 提前变现)</h4>
                  <ul className="space-y-2 text-sm text-emerald-800">
                    <li className="flex justify-between"><span>到达付费墙人数:</span> <span className="font-bold">53,800</span></li>
                    <li className="flex justify-between"><span>付费墙转化率:</span> <span className="font-bold">35.0%</span></li>
                    <li className="flex justify-between"><span>单集平均收入:</span> <span className="font-bold">$0.85</span></li>
                    <li className="flex justify-between pt-2 border-t border-emerald-200"><span>预估总收入:</span> <span className="font-bold text-lg">$16,005</span></li>
                  </ul>
                  <p className="text-xs text-emerald-600 mt-3 bg-emerald-100/50 p-2 rounded">
                    结论：到达付费墙基数大，虽然流失提前，但整体收入比 A 组高出 20.9%。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
