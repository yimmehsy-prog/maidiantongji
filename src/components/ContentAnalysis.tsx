import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Trophy, TrendingUp, DollarSign, PlayCircle } from 'lucide-react';

const skuSalesData = [
  { name: '$9.99 (周卡)', value: 5040, revenue: 50349 },
  { name: '$19.99 (月卡)', value: 1080, revenue: 21589 },
  { name: '$49.99 (年卡)', value: 280, revenue: 13997 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];

const topDramasData = [
  { id: 'D_10042', name: '霸道总裁爱上我', orders: 1250, revenue: 24500, firstEpisodeCompletion: 85.4 },
  { id: 'D_10089', name: '狼人家族', orders: 980, revenue: 18200, firstEpisodeCompletion: 78.2 },
  { id: 'D_10102', name: '复仇千金', orders: 850, revenue: 15600, firstEpisodeCompletion: 81.5 },
  { id: 'D_10015', name: '吸血鬼日记', orders: 620, revenue: 11800, firstEpisodeCompletion: 72.8 },
  { id: 'D_10201', name: '闪婚蜜爱', orders: 450, revenue: 8900, firstEpisodeCompletion: 68.9 },
];

const templateRankingData = [
  { id: 'TPL_1001', name: 'low_TT小程序 (应用02)', channel: '分销', users: 25200, revenue: 351848, amounts: [{ price: '$9.99', percent: 55 }, { price: '$19.99', percent: 35 }, { price: '$24.99', percent: 10 }] },
  { id: 'TPL_1002', name: 'high_AppStore (应用01)', channel: '自营', users: 18900, revenue: 566911, amounts: [{ price: '$24.99', percent: 40 }, { price: '$49.99', percent: 45 }, { price: '$99.99', percent: 15 }] },
  { id: 'TPL_1003', name: 'mid_GooglePlay (应用03)', channel: '自营', users: 16500, revenue: 294935, amounts: [{ price: '$9.99', percent: 45 }, { price: '$19.99', percent: 40 }, { price: '$24.99', percent: 15 }] },
  { id: 'TPL_1004', name: 'new_user_TT (应用02)', channel: '分销', users: 14200, revenue: 183958, amounts: [{ price: '$4.99', percent: 70 }, { price: '$9.99', percent: 30 }] },
  { id: 'TPL_1005', name: 'vip_retention (应用01)', channel: '自营', users: 8100, revenue: 202419, amounts: [{ price: '$24.99', percent: 85 }, { price: '$49.99', percent: 15 }] },
];

export default function ContentAnalysis({ app, country, dateRange }: { app: string, country: string, dateRange: string }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SKU Sales Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>各充值项销量与销售额占比</CardTitle>
            <CardDescription>包含订阅、金币及单剧购买</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                  <Pie
                    data={skuSalesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="revenue"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {skuSalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number, name: string, props: any) => [
                      `$${value.toLocaleString()} (${props.payload.value} 单)`,
                      '销售额'
                    ]}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Dramas Leaderboard */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>吸金短剧排行榜</CardTitle>
                <CardDescription>按 drama_id 分组成单量</CardDescription>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <Trophy className="w-5 h-5" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-2">
              {topDramasData.map((drama, index) => (
                <div key={drama.id} className="flex items-center p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0
                    ${index === 0 ? 'bg-amber-100 text-amber-600' : 
                      index === 1 ? 'bg-slate-200 text-slate-600' : 
                      index === 2 ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'}`}
                  >
                    {index + 1}
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{drama.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <p className="text-xs text-slate-500 font-mono">{drama.id}</p>
                      <div className="flex items-center gap-1 text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                        <PlayCircle className="w-3 h-3" /> 首集完播: {drama.firstEpisodeCompletion}%
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-bold text-emerald-600">${drama.revenue.toLocaleString()}</p>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center justify-end gap-1">
                      <TrendingUp className="w-3 h-3" /> {drama.orders.toLocaleString()} 单
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recharge Template Ranking */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>充值模板销售额排行</CardTitle>
            <CardDescription>包含模版ID、名称、充值人数及金额分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg w-16">排名</th>
                    <th className="px-4 py-3">模版信息</th>
                    <th className="px-4 py-3">模板来源</th>
                    <th className="px-4 py-3 text-right">充值人数</th>
                    <th className="px-4 py-3 text-right">销售额</th>
                    <th className="px-4 py-3 rounded-tr-lg w-1/3">充值金额分布</th>
                  </tr>
                </thead>
                <tbody>
                  {templateRankingData.map((tpl, index) => (
                    <tr key={tpl.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-medium text-slate-900">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                          ${index === 0 ? 'bg-amber-100 text-amber-600' : 
                            index === 1 ? 'bg-slate-200 text-slate-600' : 
                            index === 2 ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'}`}
                        >
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-900">{tpl.name}</div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">{tpl.id}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${tpl.channel === '自营' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                          {tpl.channel}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-slate-600">{tpl.users.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-bold text-emerald-600">${tpl.revenue.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex h-2.5 w-full rounded-full overflow-hidden">
                          {tpl.amounts.map((amt, i) => (
                            <div 
                              key={i} 
                              style={{ width: `${amt.percent}%`, backgroundColor: COLORS[i % COLORS.length] }}
                              className="h-full"
                              title={`${amt.price}: ${amt.percent}%`}
                            />
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 text-[10px] text-slate-500">
                          {tpl.amounts.map((amt, i) => (
                            <div key={i} className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                              {amt.price} ({amt.percent}%)
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
