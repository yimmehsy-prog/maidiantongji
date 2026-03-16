import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Facebook, Smartphone, Download, PlayCircle, Link2, AlertCircle, TrendingUp, DollarSign, CreditCard, Share2, PieChart } from 'lucide-react';

const funnelData = [
  { step: '落地页访问', users: 150000, rate: 100 },
  { step: '点击下载', users: 85000, rate: 56.6 },
  { step: '应用激活', users: 32000, rate: 21.3 },
  { step: '剧集播放', users: 24500, rate: 16.3 },
];

const channelDataByCountry: Record<string, any[]> = {
  all: [
    { channel: 'Facebook Ads', type: '自营投流', spend: { amount: 22200, currency: 'USD' }, revenue: { amount: 27750, currency: 'USD' }, installs: '12K', cpi: { amount: 1.85, currency: 'USD' }, roas: '125%' },
    { channel: 'TikTok Ads', type: '自营投流', spend: { amount: 25560, currency: 'USD' }, revenue: { amount: 37828, currency: 'USD' }, installs: '18K', cpi: { amount: 1.42, currency: 'USD' }, roas: '148%' },
    { channel: 'Google Ads', type: '自营投流', spend: { amount: 10500, currency: 'USD' }, revenue: { amount: 9975, currency: 'USD' }, installs: '5K', cpi: { amount: 2.10, currency: 'USD' }, roas: '95%' },
    { channel: 'KOL Affiliate Network', type: '分销网络', spend: { amount: 4500, currency: 'USD' }, revenue: { amount: 11250, currency: 'USD' }, installs: '3.5K', cpi: { amount: 1.28, currency: 'USD' }, roas: '250%' },
    { channel: 'Web Novel Publishers', type: '分销网络', spend: { amount: 100000, currency: 'THB' }, revenue: { amount: 200000, currency: 'THB' }, installs: '2.2K', cpi: { amount: 45, currency: 'THB' }, roas: '200%' },
  ],
  US: [
    { channel: 'Facebook Ads', type: '自营投流', spend: { amount: 15000, currency: 'USD' }, revenue: { amount: 18000, currency: 'USD' }, installs: '8K', cpi: { amount: 1.87, currency: 'USD' }, roas: '120%' },
    { channel: 'TikTok Ads', type: '自营投流', spend: { amount: 18000, currency: 'USD' }, revenue: { amount: 26100, currency: 'USD' }, installs: '12K', cpi: { amount: 1.50, currency: 'USD' }, roas: '145%' },
    { channel: 'Google Ads', type: '自营投流', spend: { amount: 8000, currency: 'USD' }, revenue: { amount: 7200, currency: 'USD' }, installs: '3.5K', cpi: { amount: 2.28, currency: 'USD' }, roas: '90%' },
    { channel: 'KOL Affiliate Network', type: '分销网络', spend: { amount: 3000, currency: 'USD' }, revenue: { amount: 7800, currency: 'USD' }, installs: '2K', cpi: { amount: 1.50, currency: 'USD' }, roas: '260%' },
  ],
  TH: [
    { channel: 'Facebook Ads', type: '自营投流', spend: { amount: 150000, currency: 'THB' }, revenue: { amount: 195000, currency: 'THB' }, installs: '10K', cpi: { amount: 15, currency: 'THB' }, roas: '130%' },
    { channel: 'TikTok Ads', type: '自营投流', spend: { amount: 200000, currency: 'THB' }, revenue: { amount: 320000, currency: 'THB' }, installs: '15K', cpi: { amount: 13.3, currency: 'THB' }, roas: '160%' },
    { channel: 'Web Novel Publishers', type: '分销网络', spend: { amount: 100000, currency: 'THB' }, revenue: { amount: 200000, currency: 'THB' }, installs: '2.2K', cpi: { amount: 45, currency: 'THB' }, roas: '200%' },
  ],
  ID: [
    { channel: 'Facebook Ads', type: '自营投流', spend: { amount: 50000000, currency: 'IDR' }, revenue: { amount: 60000000, currency: 'IDR' }, installs: '20K', cpi: { amount: 2500, currency: 'IDR' }, roas: '120%' },
    { channel: 'TikTok Ads', type: '自营投流', spend: { amount: 80000000, currency: 'IDR' }, revenue: { amount: 112000000, currency: 'IDR' }, installs: '35K', cpi: { amount: 2285, currency: 'IDR' }, roas: '140%' },
    { channel: 'Local Ad Network', type: '分销网络', spend: { amount: 20000000, currency: 'IDR' }, revenue: { amount: 36000000, currency: 'IDR' }, installs: '10K', cpi: { amount: 2000, currency: 'IDR' }, roas: '180%' },
  ]
};

export default function UserAcquisition({ app, country, dateRange }: { app: string, country: string, dateRange: string }) {
  const [localCountry, setLocalCountry] = useState('all');

  const formatCurrency = (val: { amount: number, currency: string }) => {
    if (val.currency === 'USD') return `$${val.amount.toLocaleString()}`;
    if (val.currency === 'THB') return `฿${val.amount.toLocaleString()}`;
    if (val.currency === 'IDR') return `Rp ${val.amount.toLocaleString()}`;
    return `${val.amount.toLocaleString()} ${val.currency}`;
  };

  const currentChannelData = channelDataByCountry[localCountry] || channelDataByCountry['all'];

  const exchangeRates: Record<string, number> = {
    USD: 1,
    THB: 1 / 35, // Approx 35 THB = 1 USD
    IDR: 1 / 15000, // Approx 15000 IDR = 1 USD
  };

  const totalSpendUSD = currentChannelData.reduce((acc, curr) => {
    const rate = exchangeRates[curr.spend.currency] || 1;
    return acc + curr.spend.amount * rate;
  }, 0);

  const totalRevenueUSD = currentChannelData.reduce((acc, curr) => {
    const rate = exchangeRates[curr.revenue.currency] || 1;
    return acc + curr.revenue.amount * rate;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">总广告花费</p>
                <h3 className="text-xl font-bold text-slate-900">
                  ${Math.round(totalSpendUSD).toLocaleString()} USD
                </h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-rose-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">总归因收入</p>
                <h3 className="text-xl font-bold text-slate-900">
                  ${Math.round(totalRevenueUSD).toLocaleString()} USD
                </h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">综合 ROAS</p>
                <h3 className="text-2xl font-bold text-emerald-600">141%</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
                <PieChart className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">分销收入占比</p>
                <h3 className="text-2xl font-bold text-amber-600">18.5%</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <Share2 className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">获客成本</p>
                <h3 className="text-2xl font-bold text-slate-900">$2.05</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-sky-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">销售成本</p>
                <h3 className="text-2xl font-bold text-slate-900">$2.68</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-violet-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Funnel Chart */}
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">投流链路转化漏斗</CardTitle>
            <CardDescription>用于分析广告点击到应用激活的转化率</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 80, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="step" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} width={110} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [value.toLocaleString(), '用户数']}
                  />
                  <Bar dataKey="users" radius={[0, 4, 4, 0]} barSize={24}>
                    <LabelList 
                      dataKey="users" 
                      position="right" 
                      content={(props: any) => {
                        const { x, y, width, height, value, index } = props;
                        if (value === undefined || value === null) return null;
                        const rate = funnelData[index || 0]?.rate || 0;
                        return (
                          <text x={x + width + 5} y={y + height / 2 + 4} fill="#475569" fontSize={10} fontWeight={600}>
                            {rate}%
                          </text>
                        );
                      }}
                    />
                    {funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#94a3b8' : index === 1 ? '#60a5fa' : index === 2 ? '#818cf8' : '#34d399'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Channel Performance Table */}
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-6">
              <div>
                <CardTitle className="text-lg">主要渠道表现</CardTitle>
                <CardDescription>各渠道花费、收入及 ROI</CardDescription>
              </div>
              
              {/* Country Selector */}
              <div className="flex items-center bg-slate-100 p-1 rounded-lg">
                <button 
                  onClick={() => setLocalCountry('all')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${localCountry === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Global
                </button>
                <button 
                  onClick={() => setLocalCountry('US')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${localCountry === 'US' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  US
                </button>
                <button 
                  onClick={() => setLocalCountry('TH')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${localCountry === 'TH' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  TH
                </button>
                <button 
                  onClick={() => setLocalCountry('ID')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${localCountry === 'ID' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  ID
                </button>
              </div>
            </div>
            {/* Alert embedded in header area */}
            <div className="hidden md:flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              TikTok 转化率提升 4.2%
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                  <tr>
                    <th className="px-4 py-3">渠道</th>
                    <th className="px-4 py-3">类型</th>
                    <th className="px-4 py-3 text-right">花费</th>
                    <th className="px-4 py-3 text-right">收入</th>
                    <th className="px-4 py-3 text-right">激活</th>
                    <th className="px-4 py-3 text-right">ROAS</th>
                  </tr>
                </thead>
                <tbody>
                  {currentChannelData.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.channel}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">
                        <span className={`px-2 py-0.5 rounded-full ${row.type.includes('Direct') ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>
                          {row.type.split(' ')[0]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-slate-600 font-mono">{formatCurrency(row.spend)}</td>
                      <td className="px-4 py-3 text-right text-slate-600 font-mono">{formatCurrency(row.revenue)}</td>
                      <td className="px-4 py-3 text-right text-slate-600 font-mono">{row.installs}</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">
                        <span className={parseInt(row.roas) > 100 ? 'text-emerald-600' : 'text-rose-600'}>
                          {row.roas}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* UA Tracking Plan */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>投流链路埋点方案</CardTitle>
          <CardDescription>用于归因分析、计算买量 ROI 及监控延迟深度链接匹配率的标准埋点</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8 mt-4">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute top-5 left-6 bottom-5 w-0.5 bg-slate-200"></div>
              
              <div className="space-y-8 relative">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm">
                    <Facebook className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-slate-900">1. 落地页访问</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-medium border border-slate-200">landing_page_view</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">用户点击 FB/TikTok 广告进入 Web 落地页时触发。参数：<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">ad_channel</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">campaign_id</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">drama_id</code></p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm">
                    <Download className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-slate-900">2. 点击下载</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-medium border border-slate-200">store_click</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">用户在落地页点击 "Download App" 或 "Watch in App" 跳转应用市场时触发。参数：<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">ad_channel</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">drama_id</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">target_os (ios/android)</code></p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm">
                    <Smartphone className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-slate-900">3. 应用激活</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-medium border border-slate-200">app_activation</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">用户首次下载并打开 App 时触发，通常由 Adjust/AppsFlyer 等三方归因 SDK 自动上报。参数：<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">attribution_provider</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">network</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">campaign</code></p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm">
                    <Link2 className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-slate-900">4. 深度链接匹配</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-medium border border-slate-200">deeplink_match</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">App 启动后成功解析出落地页传递的短剧 ID 时触发。<strong className="text-slate-900">这是确保用户不流失的关键。</strong>参数：<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">match_type (direct/deferred)</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">target_drama_id</code></p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm">
                    <PlayCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-slate-900">5. 目标剧集播放</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-medium border border-slate-200">video_load_start</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">用户成功被路由到对应短剧并开始播放时触发。需携带来源标识以计算 ROI。参数：<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">drama_id</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">enter_source (ad_deeplink)</code></p>
                  </div>
                </div>

                {/* Error Step */}
                <div className="flex gap-4 mt-8">
                  <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm">
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-slate-900">异常: 归因失败/匹配失败</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 text-xs font-mono font-medium border border-rose-200">deeplink_failed</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">用户通过广告下载 App，但未能成功跳转到目标短剧（如剪切板被清空、归因 SDK 延迟过高）。参数：<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">fail_reason</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">device_info</code></p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
