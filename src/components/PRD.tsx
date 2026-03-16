import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

export default function PRD() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>数据模块说明</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <section>
            <h3 className="font-semibold text-lg">1. 项目概述</h3>
            <p className="text-sm text-slate-600">Drama数据分析中心 是一个多应用数据分析中心，旨在为运营团队提供各应用的核心运营指标监控与分析，支持多维度筛选（App、国家、时间范围、操作系统）。</p>
          </section>

          <section>
            <h3 className="font-semibold text-lg">2. 模块功能说明</h3>
            <div className="space-y-4 text-sm text-slate-600">
              <div>
                <h4 className="font-medium text-slate-800">用户分析</h4>
                <p>分层展示 DAU、付费意愿率、纯免费用户、已付费用户（新客/老客复购）及充值未果用户。新增高净值流失预警监控核心付费用户健康度，并提供自动化分群运营动作指导。</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800">新老用户对比</h4>
                <p>对比新用户与老用户的行为差异。包括 DAU 构成、收入贡献占比、付费转化率及深度参与度（观看集数、时长、ARPU）对比，用于优化新客转化与老客留存策略。</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800">留存分析</h4>
                <p>通过经典留存率（D1, D7, D30）热力图与留存衰减曲线，衡量内容质量与用户粘性。支持同期群分析（Cohort Analysis），追踪不同批次用户的留存表现。</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800">支付转化漏斗</h4>
                <p>监控用户从点击充值页面到完成支付的全链路转化率，识别支付流程中的瓶颈环节。</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800">播放性能与转化</h4>
                <p>关联播放体验数据（FMP、缓冲率、崩溃率）与商业化指标，评估技术体验对变现的影响。</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800">投流链路归因</h4>
                <p>追踪广告点击到激活、留存、付费的完整链路。包含 LTV、ROI、CAC 监控，以及深度链接匹配率分析，优化投放策略。</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800">剧集和充值分析</h4>
                <p>分析剧集热度与商业化表现。包含吸金短剧排行榜、SKU 销量与销售额占比、充值模板销售排行，指导内容采购与定价。</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800">单剧流失与付费墙</h4>
                <p>分析单剧集数漏斗与付费阻断效应。包含各集流失率、首集 30 秒跳出率、付费墙解锁行为分布，并支持付费墙位置的 A/B 测试对比。</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800">混合变现 (IAA + IAP)</h4>
                <p>分析内购与广告收入构成。包含收入趋势对比、广告展示量、渗透率及 eCPM 趋势，用于优化混合变现策略。</p>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
