import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Facebook, Smartphone, Download, PlayCircle, Link2, AlertCircle, TrendingUp, DollarSign, CreditCard, Share2, PieChart } from 'lucide-react';

const funnelData = [
  { step: '落地页访问 (Landing Page)', users: 150000, rate: 100 },
  { step: '点击下载 (Store Click)', users: 85000, rate: 56.6 },
  { step: '应用激活 (App Activation)', users: 32000, rate: 21.3 },
  { step: '剧集播放 (Drama Play)', users: 24500, rate: 16.3 },
];

const channelPerformance = [
  { channel: 'Facebook Ads', type: '自营投流 (Direct)', spend: '$22,200', revenue: '$27,750', installs: '12K', cpi: '$1.85', roas: '125%' },
  { channel: 'TikTok Ads', type: '自营投流 (Direct)', spend: '$25,560', revenue: '$37,828', installs: '18K', cpi: '$1.42', roas: '148%' },
  { channel: 'Google Ads', type: '自营投流 (Direct)', spend: '$10,500', revenue: '$9,975', installs: '5K', cpi: '$2.10', roas: '95%' },
  { channel: 'KOL Affiliate Network', type: '分销网络 (Affiliate)', spend: '$4,500', revenue: '$11,250', installs: '3.5K', cpi: '$1.28', roas: '250%' },
  { channel: 'Web Novel Publishers', type: '分销网络 (Affiliate)', spend: '$2,800', revenue: '$5,880', installs: '2.2K', cpi: '$1.27', roas: '210%' },
];

export default function UserAcquisition({ app, country, dateRange }: { app: string, country: string, dateRange: string }) {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">总广告花费 (Total Spend)</p>
                <h3 className="text-2xl font-bold text-slate-900">$65,560</h3>
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
                <p className="text-sm font-medium text-slate-500 mb-1">总归因收入 (Total Revenue)</p>
                <h3 className="text-2xl font-bold text-slate-900">$92,683</h3>
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
                <p className="text-sm font-medium text-slate-500 mb-1">综合 ROAS (Overall ROAS)</p>
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
                <p className="text-sm font-medium text-slate-500 mb-1">分销收入占比 (Affiliate %)</p>
                <h3 className="text-2xl font-bold text-amber-600">18.5%</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <Share2 className="w-6 h-6 text-amber-600" />
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
            <CardDescription>UA Conversion Funnel</CardDescription>
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
            <div>
              <CardTitle className="text-lg">主要渠道表现</CardTitle>
              <CardDescription>Top Channels Performance</CardDescription>
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
                  {channelPerformance.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.channel}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">
                        <span className={`px-2 py-0.5 rounded-full ${row.type.includes('Direct') ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>
                          {row.type.split(' ')[0]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-slate-600 font-mono">{row.spend}</td>
                      <td className="px-4 py-3 text-right text-slate-600 font-mono">{row.revenue}</td>
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
          <CardTitle>投流链路埋点方案 (UA Tracking Plan)</CardTitle>
          <CardDescription>用于归因分析、计算买量 ROI 及监控延迟深度链接 (Deferred Deep Link) 匹配率的标准埋点</CardDescription>
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
                      <h4 className="text-base font-bold text-slate-900">1. 落地页访问 (Landing Page View)</h4>
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
                      <h4 className="text-base font-bold text-slate-900">2. 点击下载 (Store Click)</h4>
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
                      <h4 className="text-base font-bold text-slate-900">3. 应用激活 (App Activation)</h4>
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
                      <h4 className="text-base font-bold text-slate-900">4. 深度链接匹配 (Deep Link Match)</h4>
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
                      <h4 className="text-base font-bold text-slate-900">5. 目标剧集播放 (Target Drama Play)</h4>
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
                      <h4 className="text-base font-bold text-slate-900">异常: 归因失败/匹配失败 (Attribution/Match Failed)</h4>
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
