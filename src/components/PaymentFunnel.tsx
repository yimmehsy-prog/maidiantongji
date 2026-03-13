import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { ArrowRight, AlertTriangle } from 'lucide-react';

const funnelData = [
  { step: '收银台曝光 (Checkout View)', count: 10000, rate: 100, color: '#3b82f6' },
  { step: '发起支付 (Initiate)', count: 4000, rate: 40, color: '#8b5cf6' },
  { step: '支付成功 (Success)', count: 640, rate: 16, color: '#10b981' },
];

const appFunnelData = [
  { app: 'drama_us_01', view: 5000, initiate: 2200, success: 396, successRate: 18 },
  { app: 'drama_th_02', view: 3000, initiate: 1050, success: 147, successRate: 14 },
  { app: 'drama_id_03', view: 2000, initiate: 750, success: 97, successRate: 12.9 },
];

const skuFunnelData = [
  { sku: '$9.99', view: 6000, initiate: 2800, success: 504, successRate: 18 },
  { sku: '$19.99', view: 3000, initiate: 900, success: 108, successRate: 12 },
  { sku: '$49.99', view: 1000, initiate: 300, success: 28, successRate: 9.3 },
];

const countryFunnelData = [
  { country: '美国 (US)', view: 4500, initiate: 1900, success: 361, successRate: 19 },
  { country: '泰国 (TH)', view: 3000, initiate: 1050, success: 147, successRate: 14 },
  { country: '印尼 (ID)', view: 1500, initiate: 600, success: 72, successRate: 12 },
  { country: '英国 (UK)', view: 1000, initiate: 450, success: 60, successRate: 13.3 },
];

const userTypeFunnelData = [
  { type: '新用户 (New)', view: 7000, initiate: 2500, success: 350, successRate: 14 },
  { type: '老用户 (Returning)', view: 3000, initiate: 1500, success: 290, successRate: 19.3 },
];

const paymentMethodFunnelData = [
  { method: '信用卡 (Credit Card)', view: 5000, initiate: 2000, success: 360, successRate: 18 },
  { method: 'PayPal', view: 3000, initiate: 1200, success: 204, successRate: 17 },
  { method: 'Apple/Google Pay', view: 1500, initiate: 600, success: 60, successRate: 10 },
  { method: '本地钱包 (Local Wallet)', view: 500, initiate: 200, success: 16, successRate: 8 },
];

const dropOffReasons = [
  { reason: '用户主动取消 (User Cancelled)', users: 1850, events: 2100, percentage: 55.0, color: '#94a3b8' },
  { reason: '余额不足 (Insufficient Funds)', users: 650, events: 890, percentage: 19.3, color: '#f59e0b' },
  { reason: '风控拦截 (Risk Control)', users: 420, events: 450, percentage: 12.5, color: '#ef4444' },
  { reason: '网络超时 (Network Timeout)', users: 280, events: 310, percentage: 8.3, color: '#f97316' },
  { reason: '支付网关错误 (Gateway Error)', users: 160, events: 180, percentage: 4.8, color: '#8b5cf6' },
];

export default function PaymentFunnel({ app, country, dateRange }: { app: string, country: string, dateRange: string }) {
  return (
    <div className="space-y-6">
      {/* Alert */}
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-rose-800">支付成功率预警 (Payment Success Rate Alert)</h4>
          <p className="text-sm text-rose-600 mt-1">
            当前整体支付成功率仅为 <strong>16%</strong>，低于目标值 (25%)。建议重点排查 `drama_id_03` 及 `$49.99` 高客单价套餐的支付链路流失原因。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Funnel Chart */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>整体支付转化漏斗 (Overall Payment Funnel)</CardTitle>
            <CardDescription>基于设备/用户去重计算 (Deduplicated by Device/User)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={funnelData}
                  layout="vertical"
                  margin={{ top: 20, right: 80, left: 40, bottom: 20 }}
                  barSize={60}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="step" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#475569', fontSize: 13, fontWeight: 500 }} 
                    width={180}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number, name: string, props: any) => [
                      `${value.toLocaleString()} (${props.payload.rate}%)`,
                      '用户数 (Users)'
                    ]}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList 
                      dataKey="rate" 
                      position="right" 
                      content={(props: any) => {
                        const { x, y, width, height, value } = props;
                        const entry = props.payload;
                        if (!entry) return null;
                        return (
                          <text x={x + width + 5} y={y + height / 2 + 4} fill="#334155" fontWeight="bold" fontSize={14}>
                            {`${entry.count?.toLocaleString() ?? 0} (${value}%)`}
                          </text>
                        );
                      }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Funnel Stats */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>转化率概览 (Conversion Rates)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8 mt-4">
              <div className="relative">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-medium text-slate-500">曝光 -&gt; 发起支付</span>
                  <span className="text-2xl font-bold text-slate-900">40.0%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div className="bg-violet-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>

              <div className="relative">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-medium text-slate-500">发起支付 -&gt; 成功</span>
                  <span className="text-2xl font-bold text-rose-600">16.0%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div className="bg-rose-500 h-2.5 rounded-full" style={{ width: '16%' }}></div>
                </div>
              </div>

              <div className="relative pt-4 border-t border-slate-100">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-medium text-slate-800">总转化率 (Total)</span>
                  <span className="text-3xl font-black text-emerald-600">6.4%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '6.4%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* App Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>各 App 漏斗拆解 (Funnel by App)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">App ID</th>
                    <th className="px-4 py-3 text-right">曝光 (View)</th>
                    <th className="px-4 py-3 text-right">发起 (Init)</th>
                    <th className="px-4 py-3 text-right">成功 (Success)</th>
                    <th className="px-4 py-3 text-right rounded-tr-lg">成功率 (Rate)</th>
                  </tr>
                </thead>
                <tbody>
                  {appFunnelData.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.app}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{row.view.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{row.initiate.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{row.success.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">
                        <span className={row.successRate < 15 ? 'text-rose-600' : 'text-emerald-600'}>
                          {row.successRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Country Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>各国家/地区漏斗拆解 (Funnel by Country)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">国家/地区</th>
                    <th className="px-4 py-3 text-right">曝光 (View)</th>
                    <th className="px-4 py-3 text-right">发起 (Init)</th>
                    <th className="px-4 py-3 text-right">成功 (Success)</th>
                    <th className="px-4 py-3 text-right rounded-tr-lg">成功率 (Rate)</th>
                  </tr>
                </thead>
                <tbody>
                  {countryFunnelData.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.country}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{row.view.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{row.initiate.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{row.success.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">
                        <span className={row.successRate < 15 ? 'text-rose-600' : 'text-emerald-600'}>
                          {row.successRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* SKU Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>各价格档位漏斗拆解 (Funnel by SKU Price)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">SKU 价格</th>
                    <th className="px-4 py-3 text-right">曝光 (View)</th>
                    <th className="px-4 py-3 text-right">发起 (Init)</th>
                    <th className="px-4 py-3 text-right">成功 (Success)</th>
                    <th className="px-4 py-3 text-right rounded-tr-lg">成功率 (Rate)</th>
                  </tr>
                </thead>
                <tbody>
                  {skuFunnelData.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.sku}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{row.view.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{row.initiate.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{row.success.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">
                        <span className={row.successRate < 10 ? 'text-rose-600' : 'text-emerald-600'}>
                          {row.successRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* User Type Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>新老用户漏斗拆解 (Funnel by User Type)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">用户类型</th>
                    <th className="px-4 py-3 text-right">曝光 (View)</th>
                    <th className="px-4 py-3 text-right">发起 (Init)</th>
                    <th className="px-4 py-3 text-right">成功 (Success)</th>
                    <th className="px-4 py-3 text-right rounded-tr-lg">成功率 (Rate)</th>
                  </tr>
                </thead>
                <tbody>
                  {userTypeFunnelData.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.type}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{row.view.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{row.initiate.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{row.success.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">
                        <span className={row.successRate < 15 ? 'text-rose-600' : 'text-emerald-600'}>
                          {row.successRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>支付方式漏斗拆解 (Funnel by Payment Method)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">支付方式</th>
                    <th className="px-4 py-3 text-right">曝光 (View)</th>
                    <th className="px-4 py-3 text-right">发起 (Init)</th>
                    <th className="px-4 py-3 text-right">成功 (Success)</th>
                    <th className="px-4 py-3 text-right rounded-tr-lg">成功率 (Rate)</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentMethodFunnelData.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.method}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{row.view.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{row.initiate.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{row.success.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">
                        <span className={row.successRate < 15 ? 'text-rose-600' : 'text-emerald-600'}>
                          {row.successRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Drop-off Reasons */}
        <Card>
          <CardHeader>
            <CardTitle>支付失败/流失原因 (Drop-off Reasons)</CardTitle>
            <CardDescription>基于“发起支付”但未“支付成功”的错误事件统计</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5 mt-4">
              {dropOffReasons.map((item, i) => (
                <div key={i} className="relative">
                  <div className="flex justify-between items-end mb-1.5">
                    <span className="text-sm font-medium text-slate-700">{item.reason}</span>
                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-900">{item.percentage}%</span>
                      <span className="text-xs text-slate-500 ml-2">
                        ({item.users.toLocaleString()}人 / {item.events.toLocaleString()}次)
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: item.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
