import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

export default function PRD() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>DataMatrix V1 产品需求文档</CardTitle>
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
                <h4 className="font-medium text-slate-800">用户分析</h4>
                <p>采用“流量漏斗流转”结构，分层展示 DAU、付费意愿率、纯免费用户（仅靠签到领币）、已付费用户（新客/老客复购）及充值未果用户（技术失败/意愿放弃）。新增高净值流失预警（Whale Churn）监控核心付费用户健康度。同时提供“自动化分群规则与运营动作”指导，针对高价值区、高潜转化区和签到活跃区提供明确的干预策略（如：首页限时促销提醒、首充破冰特惠等），实现从“看数据”到“用数据”的闭环。</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800">支付转化漏斗</h4>
                <p>监控用户从点击充值页面到完成支付的全链路转化率。核心指标包括：各步骤转化率、流失率、平均支付耗时。支持按 App、国家、时间维度下钻，用于识别支付流程中的瓶颈环节。</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800">播放性能与转化</h4>
                <p>分析视频播放体验对付费意愿的影响。核心指标包括：首屏加载时间 (FMP)、缓冲率、卡顿率、播放成功率。通过关联播放性能数据与充值转化率，评估技术体验对商业变现的负面影响。</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800">投流链路归因</h4>
                <p>追踪用户从广告点击到激活、留存、付费的完整链路。核心指标包括：各渠道 ROI、LTV (生命周期价值)、CAC (获客成本)、留存率。支持多渠道对比，辅助运营优化投放策略。</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800">剧集和充值分析</h4>
                <p>分析内容热度与商业化表现的关联。核心指标包括：剧集观看时长、付费渗透率、SKU 销量与销售额占比（订阅、金币、单剧购买）、充值模板转化效果。用于指导内容采购与定价策略。</p>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
