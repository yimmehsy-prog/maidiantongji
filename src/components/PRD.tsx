import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

export default function PRD() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>DataMatrix V1 产品需求文档 (PRD)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <section>
            <h3 className="font-semibold text-lg">1. 项目概述</h3>
            <p className="text-sm text-slate-600">DataMatrix V1 是一个多应用数据分析中心，旨在为运营团队提供各应用的核心运营指标监控与分析，支持多维度筛选（App、国家、时间范围）。</p>
          </section>

          <section>
            <h3 className="font-semibold text-lg">2. 模块功能说明</h3>
            <div className="space-y-4 text-sm text-slate-600">
              <div>
                <h4 className="font-medium text-slate-800">用户分析 (User Analysis)</h4>
                <p>监控各国每日活跃用户 (DAU) 趋势，并对活跃用户进行付费意愿分层。重点识别“低付费意愿/高留存未付费”用户（如：注册时间大于3天，依然有活跃留存但从未付费的用户），为精细化运营和定向促销（如发放折扣券）提供数据支持。</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800">支付转化漏斗 (Payment Funnel)</h4>
                <p>监控用户从点击充值页面到完成支付的全链路转化率。核心指标包括：各步骤转化率、流失率、平均支付耗时。支持按 App、国家、时间维度下钻，用于识别支付流程中的瓶颈环节。</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800">播放性能与转化 (Playback Performance)</h4>
                <p>分析视频播放体验对付费意愿的影响。核心指标包括：首屏加载时间 (FMP)、缓冲率、卡顿率、播放成功率。通过关联播放性能数据与充值转化率，评估技术体验对商业变现的负面影响。</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800">投流链路归因 (User Acquisition)</h4>
                <p>追踪用户从广告点击到激活、留存、付费的完整链路。核心指标包括：各渠道 ROI、LTV (生命周期价值)、CAC (获客成本)、留存率。支持多渠道对比，辅助运营优化投放策略。</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800">剧集和充值分析 (Content & Recharge)</h4>
                <p>分析内容热度与商业化表现的关联。核心指标包括：剧集观看时长、付费渗透率、SKU 销量与销售额占比（订阅、金币、单剧购买）、充值模板转化效果。用于指导内容采购与定价策略。</p>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
