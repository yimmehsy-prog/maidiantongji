import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { Users, UserMinus, UserCheck, ShoppingCart, AlertTriangle, Percent, PlaySquare } from 'lucide-react';

interface UserAnalysisProps {
  app: string;
  country: string;
  dateRange: string;
}

export default function UserAnalysis({ app, country, dateRange }: UserAnalysisProps) {
  // Mock data generation based on props
  const dauData = useMemo(() => {
    const data = [];
    const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 1;
    let baseUS = 12000, baseTH = 8000, baseID = 15000, baseUK = 5000;
    
    for (let i = days; i >= 1; i--) {
      data.push({
        date: `03-${(31 - i).toString().padStart(2, '0')}`,
        US: Math.floor(baseUS + Math.random() * 2000),
        TH: Math.floor(baseTH + Math.random() * 1500),
        ID: Math.floor(baseID + Math.random() * 3000),
        UK: Math.floor(baseUK + Math.random() * 1000),
      });
    }
    return data;
  }, [dateRange]);

  const failedRechargeData = useMemo(() => {
    return [
      { name: '余额不足', value: 40 },
      { name: '中途取消(意愿放弃)', value: 35 },
      { name: '支付通道报错(技术)', value: 15 },
      { name: '卡片拒绝', value: 10 },
    ];
  }, [app, country, dateRange]);

  const FAILED_COLORS = ['#f59e0b', '#ef4444', '#8b5cf6', '#64748b'];

  const intentData = useMemo(() => {
    return [
      { name: '已付费用户', value: 35 },
      { name: '新注册未付费(≤3天)', value: 20 },
      { name: '高留存未付费(>3天)', value: 30 },
      { name: '充值未果活跃用户', value: 15 },
    ];
  }, [app, country, dateRange]);

  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const countryIntentData = useMemo(() => {
    return [
      { country: 'US', users: 4500 },
      { country: 'TH', users: 6200 },
      { country: 'ID', users: 8500 },
      { country: 'UK', users: 1200 },
    ];
  }, [app, dateRange]);

  return (
    <div className="space-y-6">
      {/* Overview Cards - Funnel & Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Top Funnel */}
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">总活跃用户</p>
              <h3 className="text-2xl font-bold text-slate-800">124,500</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Percent className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">付费意愿率</p>
              <h3 className="text-2xl font-bold text-slate-800">45.2%</h3>
              <p className="text-xs text-slate-400 mt-1">触发付费弹窗/DAU</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-slate-100 text-slate-600 rounded-lg">
              <PlaySquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">纯免费用户占比 (仅靠签到领币)</p>
              <h3 className="text-2xl font-bold text-slate-800">25.8%</h3>
              <p className="text-xs text-slate-400 mt-1">从未付过费</p>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Funnel & Alerts */}
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
              <UserCheck className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-500 font-medium">已付费用户 (今日活跃)</p>
              <h3 className="text-2xl font-bold text-slate-800">43,575</h3>
              <div className="flex justify-between mt-1 text-xs text-slate-500">
                <span>今日新增: <strong className="text-emerald-600">12,000</strong></span>
                <span>老客复购: <strong className="text-emerald-600">31,575</strong></span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-violet-100 text-violet-600 rounded-lg">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-500 font-medium">充值未果活跃用户</p>
              <h3 className="text-2xl font-bold text-slate-800">18,675</h3>
              <div className="flex justify-between mt-1 text-xs text-slate-500">
                <span>技术失败: <strong className="text-violet-600">4,500</strong></span>
                <span>意愿放弃: <strong className="text-violet-600">14,175</strong></span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50/30">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-red-600 font-medium">高净值流失预警</p>
              <h3 className="text-2xl font-bold text-red-700">850</h3>
              <p className="text-xs text-red-500 mt-1">累计付费 &gt; $50 且 48h 未活跃</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DAU Trend */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>各国每日活跃用户趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dauData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  {(country === 'all' || country === 'US') && <Line type="monotone" dataKey="US" stroke="#6366f1" strokeWidth={3} dot={false} />}
                  {(country === 'all' || country === 'TH') && <Line type="monotone" dataKey="TH" stroke="#10b981" strokeWidth={3} dot={false} />}
                  {(country === 'all' || country === 'ID') && <Line type="monotone" dataKey="ID" stroke="#f59e0b" strokeWidth={3} dot={false} />}
                  {(country === 'all' || country === 'UK') && <Line type="monotone" dataKey="UK" stroke="#ec4899" strokeWidth={3} dot={false} />}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Payment Intent Segmentation */}
        <Card>
          <CardHeader>
            <CardTitle>活跃用户付费意愿分层</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={intentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={true}
                  >
                    {intentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `${value}%`}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p><strong>洞察:</strong> 注册超3天且持续活跃的未付费用户占比高达 30%，此外有 15% 的活跃用户多次点击充值但未支付成功。这部分“充值未果”用户具有极高的付费意愿，建议重点排查支付链路卡顿，或定向推送限时折扣挽回。</p>
            </div>
          </CardContent>
        </Card>

        {/* High Retention Unpaid by Country */}
        <Card>
          <CardHeader>
            <CardTitle>高留存未付费用户分布 (按国家)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countryIntentData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis dataKey="country" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="users" name="用户数" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={32}>
                    <LabelList dataKey="users" position="right" fill="#64748b" fontSize={12} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actionable Segments Table */}
      <Card>
        <CardHeader>
          <CardTitle>自动化分群规则与运营动作</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-medium">用户池</th>
                  <th className="px-6 py-3 font-medium">细化定义/规则</th>
                  <th className="px-6 py-3 font-medium">运营动作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-indigo-600">高价值区</td>
                  <td className="px-6 py-4 text-slate-600">已付费且今日活跃，余额 &lt; 50 豆。</td>
                  <td className="px-6 py-4 text-slate-800">触发<strong>“续充优惠”</strong>，防止断更流失；<strong>首页周卡月卡限时促销提醒</strong>。</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-emerald-600">高潜转化区</td>
                  <td className="px-6 py-4 text-slate-600">留存 &gt; 3 天未付费，但累计观看 &gt; 20 集。</td>
                  <td className="px-6 py-4 text-slate-800">此时不该给豆子，应给<strong>“首充 $0.99 特惠”</strong>破冰。</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-amber-600">签到活跃区</td>
                  <td className="px-6 py-4 text-slate-600">留存 &gt; 3 天未付费，且连续签到 &gt; 3 天。</td>
                  <td className="px-6 py-4 text-slate-800">在签到成功弹窗中植入<strong>首充特惠</strong>，或引导其分享 App 换豆。</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
