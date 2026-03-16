import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, Legend, Cell } from 'recharts';
import { Timer, AlertCircle, Zap, TrendingDown, PlayCircle, Loader2, CheckCircle2, Activity, XCircle, Bug, ShieldAlert, Power, RefreshCcw } from 'lucide-react';

const loadTimeDistribution = [
  { bucket: '< 1s', users: 45000, dropRate: 1.2 },
  { bucket: '1-2s', users: 25000, dropRate: 3.5 },
  { bucket: '2-3s', users: 12000, dropRate: 8.4 },
  { bucket: '3-5s', users: 5000, dropRate: 25.6 },
  { bucket: '> 5s', users: 2000, dropRate: 68.5 },
];

const appPerformance = [
  { app: 'app_01', avgLoadTime: 1.2, p90LoadTime: 2.5, dropRate: 3.1, crashRate: 0.12 },
  { app: 'app_02', avgLoadTime: 2.8, p90LoadTime: 5.2, dropRate: 12.4, crashRate: 0.85 },
  { app: 'app_03', avgLoadTime: 3.5, p90LoadTime: 6.8, dropRate: 18.2, crashRate: 1.24 },
];

export default function PlaybackPerformance({ app, country, dateRange }: { app: string, country: string, dateRange: string }) {
  return (
    <div className="space-y-6">
      {/* Alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-amber-800">部分地区节点加载延迟预警</h4>
          <p className="text-sm text-amber-700 mt-1">
            监测到 <strong>应用03</strong> 和 <strong>应用02</strong> 在部分地区（如印尼、泰国）的 P90 加载时间超过 5 秒，导致播放前流失率飙升至 12% 以上。建议排查 CDN 节点覆盖或视频首帧预加载策略。
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">平均首帧加载耗时</p>
                <h3 className="text-2xl font-bold text-slate-900">1.8s</h3>
                <p className="text-xs text-rose-600 font-medium mt-1 flex items-center">
                  <TrendingDown className="w-3 h-3 mr-1" /> +0.3s vs last week
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                <Timer className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">P90 加载耗时</p>
                <h3 className="text-2xl font-bold text-slate-900">3.2s</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  90% 的用户在此时间内起播
                </p>
              </div>
              <div className="w-12 h-12 bg-violet-50 rounded-full flex items-center justify-center text-violet-600">
                <Zap className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1 flex items-center gap-1">
                  播放前流失率
                  <div className="group relative">
                    <span className="text-slate-400 cursor-help">ⓘ</span>
                    <div className="absolute left-0 bottom-full mb-2 hidden w-64 rounded-lg bg-slate-900 p-3 text-xs text-white shadow-lg group-hover:block z-10">
                      计算公式: (触发播放但未成功渲染首帧的用户数 / 总触发播放用户数) * 100%
                    </div>
                  </div>
                </p>
                <h3 className="text-2xl font-bold text-slate-900">6.8%</h3>
                <p className="text-xs text-rose-600 font-medium mt-1 flex items-center">
                  <TrendingDown className="w-3 h-3 mr-1" /> +1.2% vs last week
                </p>
              </div>
              <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-600">
                <AlertCircle className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1 flex items-center gap-1">
                  应用崩溃率
                  <div className="group relative">
                    <span className="text-slate-400 cursor-help">ⓘ</span>
                    <div className="absolute left-0 bottom-full mb-2 hidden w-64 rounded-lg bg-slate-900 p-3 text-xs text-white shadow-lg group-hover:block z-10">
                      计算公式: (发生崩溃的启动次数 / 总启动次数) * 100%
                    </div>
                  </div>
                </p>
                <h3 className="text-2xl font-bold text-slate-900">0.45%</h3>
                <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center">
                  <TrendingDown className="w-3 h-3 mr-1" /> -0.05% vs last week
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
                <Bug className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Load Time vs Drop Rate Chart */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>加载时长与流失率关系</CardTitle>
            <CardDescription>加载时间越长，用户放弃播放的比例呈指数级上升</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={loadTimeDistribution} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="bucket" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `${val}%`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar yAxisId="left" dataKey="users" name="触发播放用户数" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={60} />
                  <Line yAxisId="right" type="monotone" dataKey="dropRate" name="流失率 (%)" stroke="#ef4444" strokeWidth={3} dot={{ r: 6, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 8 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* App Performance Table */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>各 App 播放性能大盘</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">App ID</th>
                    <th className="px-4 py-3 text-right">平均耗时</th>
                    <th className="px-4 py-3 text-right">P90 耗时</th>
                    <th className="px-4 py-3 text-right">播放前流失率</th>
                    <th className="px-4 py-3 text-right rounded-tr-lg">崩溃率</th>
                  </tr>
                </thead>
                <tbody>
                  {appPerformance.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.app}</td>
                      <td className="px-4 py-3 text-right text-slate-600 font-mono">{row.avgLoadTime}s</td>
                      <td className="px-4 py-3 text-right text-slate-600 font-mono">
                        <span className={row.p90LoadTime > 5 ? 'text-amber-600 font-bold' : ''}>
                          {row.p90LoadTime}s
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">
                        <span className={row.dropRate > 10 ? 'text-rose-600' : 'text-emerald-600'}>
                          {row.dropRate}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">
                        <span className={row.crashRate > 1 ? 'text-rose-600' : 'text-emerald-600'}>
                          {row.crashRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Playback Performance Tracking Plan */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>播放性能埋点方案</CardTitle>
            <CardDescription>用于监控首帧加载、卡顿率、播放完成度及异常情况的标准埋点流程</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8 mt-4">
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute top-5 left-6 bottom-5 w-0.5 bg-slate-200"></div>
                
                <div className="space-y-8 relative">
                  {/* Step 1 */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm">
                      <PlayCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold text-slate-900">1. 单集触发播放</h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-medium border border-slate-200">video_load_start</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">用户点击播放、上滑切换或自动连播触发时上报。参数：<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">drama_id</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">episode_num</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">network_type</code></p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm">
                      <Zap className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold text-slate-900">2. 首帧渲染</h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-medium border border-slate-200">video_first_frame</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">视频画面首次出现时上报，用于计算首帧加载耗时。参数：<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">load_duration_ms</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">is_cache</code></p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm">
                      <Loader2 className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold text-slate-900">3. 播放卡顿</h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-medium border border-slate-200">video_buffer_start</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-medium border border-slate-200">video_buffer_end</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">因网络原因导致播放停滞及恢复时上报。参数：<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">buffer_duration_ms</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">current_play_time</code></p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm">
                      <Activity className="w-5 h-5 text-violet-600" />
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold text-slate-900">4. 播放心跳</h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-medium border border-slate-200">video_heartbeat</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">播放过程中每隔 5 秒/10 秒上报一次，用于粗略统计在线人数和长时观看。参数：<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">current_play_time</code></p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-slate-600" />
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold text-slate-900">5. 单集播放结束/划走</h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-medium border border-slate-200">video_play_end</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">单集视频自然播放结束、用户上滑切换下一集或主动退出时上报。<strong className="text-slate-900">这是计算精确流失秒数（如1s, 2s）的唯一依据。</strong>参数：<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">watch_duration_ms (精确到毫秒)</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">end_type (finish/swipe/quit)</code></p>
                    </div>
                  </div>

                  {/* Error Step */}
                  <div className="flex gap-4 mt-8">
                    <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm">
                      <XCircle className="w-5 h-5 text-rose-600" />
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold text-slate-900">异常: 播放报错</h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 text-xs font-mono font-medium border border-rose-200">video_error</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">播放器发生致命错误导致无法播放时上报。参数：<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">error_code</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">error_msg</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">cdn_ip</code></p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* App Stability & Crash Tracking Plan */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>应用稳定性与崩溃埋点方案</CardTitle>
            <CardDescription>用于监控应用崩溃、ANR 及内存溢出的标准埋点流程，计算应用崩溃率</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8 mt-4">
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute top-5 left-6 bottom-5 w-0.5 bg-slate-200"></div>
                
                <div className="space-y-8 relative">
                  {/* Step 1 */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm">
                      <Power className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold text-slate-900">1. App 启动</h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-medium border border-slate-200">app_launch</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">每次应用冷启动或热启动时上报，<strong className="text-slate-900">作为计算崩溃率的基数</strong>。参数：<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">launch_type (cold/warm)</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">os_version</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">device_model</code></p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm">
                      <Bug className="w-5 h-5 text-rose-600" />
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold text-slate-900">2. 捕获到崩溃</h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 text-xs font-mono font-medium border border-rose-200">app_crash</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">捕获到 Native 层 (C/C++) 或 Framework 层 (Java/Swift) 致命崩溃时上报。参数：<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">crash_type (java/native/oom)</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">stack_trace</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">free_memory</code></p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm">
                      <ShieldAlert className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold text-slate-900">3. ANR 发生</h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-medium border border-slate-200">app_anr</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">主线程阻塞超过 5 秒导致应用无响应时上报。参数：<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">anr_reason</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">main_thread_stack</code></p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm">
                      <RefreshCcw className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold text-slate-900">4. 崩溃后重启</h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-medium border border-slate-200">app_restart_after_crash</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">应用在崩溃后下一次重新启动时上报，用于补充上报崩溃发生时未能成功发送的日志。参数：<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">previous_crash_id</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">time_since_crash</code></p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
