// pages/ai-assistant/ai-assistant.js
const { assetApi } = require('../../utils/api.js');
const { soe } = require('../../utils/api.js');

Page({
  data: {
    messages: [
      { role: 'assistant', content: '您好,我是成都农交所资产管理AI助手。我可以帮您:\n1. 自然语言查询资产(如"2026年7月采购的电脑")\n2. 智能判定资产类型\n3. 预算预警\n4. 国资监管政策咨询\n\n请输入您的问题。' }
    ],
    inputValue: '',
    quickActions: [
      '查询所有闲置资产',
      '查询2026年采购的电脑',
      '查询经营性资产',
      '查询已报废资产',
      '什么是三重一大？',
      '资产报废流程是什么？'
    ]
  },
  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },
  onSend() {
    const q = this.data.inputValue.trim();
    if (!q) return;
    const messages = this.data.messages.concat([{ role: 'user', content: q }]);
    this.setData({ messages, inputValue: '' });
    // 模拟AI解析与回复
    setTimeout(() => {
      const reply = this.mockAIReply(q);
      this.setData({ messages: this.data.messages.concat([{ role: 'assistant', content: reply }]) });
    }, 600);
  },
  onQuickAction(e) {
    const q = e.currentTarget.dataset.q;
    this.setData({ inputValue: q });
    this.onSend();
  },
  mockAIReply(q) {
    // AI-5 自然语言检索
    if (q.includes('闲置')) {
      const list = assetApi.list({ status: 'idle' });
      return `🔍 检索到 ${list.length} 项闲置资产:\n${list.map(a => `• ${a.asset_name}(${a.asset_code}) ¥${a.original_value}`).join('\n')}`;
    }
    if (q.includes('电脑') && q.includes('采购')) {
      const list = assetApi.list({ keyword: '电脑' });
      return `🔍 检索到 ${list.length} 项电脑资产:\n${list.map(a => `• ${a.asset_name} - ¥${a.original_value} - ${a.status_label}`).join('\n')}`;
    }
    if (q.includes('经营性')) {
      const list = assetApi.list({ category_l1: 'operating' });
      return `🔍 检索到 ${list.length} 项经营性资产:\n${list.map(a => `• ${a.asset_name} ¥${a.original_value}`).join('\n')}`;
    }
    if (q.includes('报废')) {
      const list = assetApi.list({ status: 'scrapped' });
      return `🔍 检索到 ${list.length} 项已报废资产`;
    }
    if (q.includes('三重一大')) {
      return `⚖️ 三重一大决策制度(中纪发〔2010〕3号):\n重大决策、重要干部任免、重大项目安排、大额度资金使用。\n\n本系统触发规则:\n• 单笔资产处置≥100万\n• 单笔采购/投资≥500万\n• 产权变动(任何金额)\n• 年度预算\n• 企业重组\n\n流程:党委会前置研究→董事会集体决策→录音录像→区块链存证`;
    }
    if (q.includes('报废流程')) {
      return `🗑️ 资产报废处置全流程(59号制度M7):\n1. 使用部门线上填报报废申请(报废类型+事由+证件资料)\n2. 大型设备:线上申请第三方鉴定\n3. 归口+使用+财务联合出具处置方案\n4. 总经理办公会线上审批\n5. SOE:账面净值≥10万强制评估+≥100万三重一大\n6. 处置小组(归口/财务/风控法务/纪检)线上留痕\n7. 国家专项:强制上传合规处置证明\n8. 对外转让:自动跳转资产转让流程\n9. 归口更新资产状态→财务账务核销`;
    }
    return `🤖 已收到您的问题"${q}"。\n\n我能处理:\n• 资产查询(闲置/采购/经营性/报废等)\n• 制度咨询(三重一大/报废流程等)\n• 预算预警\n• 国资监管政策\n\n请尝试更具体的提问。`;
  }
});
