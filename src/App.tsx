/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Filter, Calendar, Smartphone, Activity, BarChart3, PieChart, Layers, Timer, Globe, Link2, FileText, Users } from 'lucide-react';
import PaymentFunnel from './components/PaymentFunnel';
import ContentAnalysis from './components/ContentAnalysis';
import PlaybackPerformance from './components/PlaybackPerformance';
import UserAcquisition from './components/UserAcquisition';
import PRD from './components/PRD';
import UserAnalysis from './components/UserAnalysis';

export default function App() {
  const [activeTab, setActiveTab] = useState('prd');
  const [selectedApp, setSelectedApp] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [dateRange, setDateRange] = useState('7d');

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl tracking-tight">
            <Activity className="w-6 h-6" />
            <span>DataMatrix V1</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">多应用数据分析中心</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveTab('prd')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'prd' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            产品需求文档
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'users' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            用户分析
          </button>
          <button
            onClick={() => setActiveTab('funnel')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'funnel' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            支付转化漏斗
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'performance' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Timer className="w-4 h-4" />
            播放性能与转化
          </button>
          <button
            onClick={() => setActiveTab('ua')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'ua' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Link2 className="w-4 h-4" />
            投流链路归因
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'content' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <PieChart className="w-4 h-4" />
            剧集和充值分析
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-2">
              <Layers className="w-3 h-3" />
              <span>系统状态</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">ClickHouse</span>
              <span className="text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                在线
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar / Filters */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex flex-col xl:flex-row items-start xl:items-center justify-between shrink-0 gap-4">
          <h1 className="text-xl font-semibold text-slate-800 shrink-0">
            {activeTab === 'funnel' && '支付转化漏斗'}
            {activeTab === 'performance' && '播放性能与转化'}
            {activeTab === 'ua' && '投流链路归因'}
            {activeTab === 'content' && '剧集和充值分析'}
            {activeTab === 'prd' && '产品需求文档'}
            {activeTab === 'users' && '用户分析'}
          </h1>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
              <Smartphone className="w-4 h-4 text-slate-500" />
              <select 
                className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer"
                value={selectedApp}
                onChange={(e) => setSelectedApp(e.target.value)}
              >
                <option value="all">所有 App</option>
                <option value="app_01">应用01</option>
                <option value="app_02">应用02</option>
                <option value="app_03">应用03</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
              <Globe className="w-4 h-4 text-slate-500" />
              <select 
                className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="all">所有国家</option>
                <option value="US">美国</option>
                <option value="TH">泰国</option>
                <option value="ID">印尼</option>
                <option value="UK">英国</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
              <Calendar className="w-4 h-4 text-slate-500" />
              <select 
                className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="today">今日</option>
                <option value="yesterday">昨日</option>
                <option value="7d">近 7 天</option>
                <option value="30d">近 30 天</option>
              </select>
            </div>
            
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
              <Filter className="w-4 h-4" />
              筛选
            </button>
          </div>
        </header>

        {/* Dashboard Content Area */}
        <div className="flex-1 overflow-auto p-8">
          {activeTab === 'funnel' && <PaymentFunnel app={selectedApp} country={selectedCountry} dateRange={dateRange} />}
          {activeTab === 'content' && <ContentAnalysis app={selectedApp} country={selectedCountry} dateRange={dateRange} />}
          {activeTab === 'performance' && <PlaybackPerformance app={selectedApp} country={selectedCountry} dateRange={dateRange} />}
          {activeTab === 'ua' && <UserAcquisition app={selectedApp} country={selectedCountry} dateRange={dateRange} />}
          {activeTab === 'prd' && <PRD />}
          {activeTab === 'users' && <UserAnalysis app={selectedApp} country={selectedCountry} dateRange={dateRange} />}
        </div>
      </main>
    </div>
  );
}
