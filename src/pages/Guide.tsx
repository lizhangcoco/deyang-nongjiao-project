import { FileText, CheckCircle, HelpCircle } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import FAQAccordion from '../components/modules/FAQAccordion';
import Card from '../components/common/Card';

const steps = [
  {
    step: 1,
    title: '项目发布',
    description: '转让方向交易所提交产权转让申请，交易所审核通过后在平台发布项目信息',
    icon: FileText,
  },
  {
    step: 2,
    title: '报名登记',
    description: '有意向的受让方在规定时间内完成报名登记，提交相关资质证明材料',
    icon: CheckCircle,
  },
  {
    step: 3,
    title: '交易撮合',
    description: '交易所组织交易撮合活动，确定最终受让方',
    icon: HelpCircle,
  },
  {
    step: 4,
    title: '签订合同',
    description: '交易双方在交易所见证下签订产权转让合同',
    icon: FileText,
  },
  {
    step: 5,
    title: '款项支付',
    description: '受让方按照合同约定支付交易款项',
    icon: CheckCircle,
  },
  {
    step: 6,
    title: '产权过户',
    description: '办理产权变更登记手续，完成产权过户',
    icon: HelpCircle,
  },
];

const documents = [
  {
    type: '土地经营权流转',
    items: [
      '土地承包经营权证或相关权属证明',
      '流转方案（含流转面积、期限、价格等）',
      '村民会议或村民代表会议决议',
      '乡镇人民政府审批意见',
      '身份证明材料',
    ],
  },
  {
    type: '林权转让',
    items: [
      '林权证或不动产登记证明',
      '林木采伐许可（如涉及采伐）',
      '转让方案',
      '集体经济组织决议',
      '受让方资质证明',
    ],
  },
  {
    type: '集体资产转让',
    items: [
      '资产权属证明',
      '资产评估报告',
      '处置方案',
      '村民会议或村民代表会议决议',
      '乡镇人民政府审批意见',
    ],
  },
];

export default function Guide() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative bg-primary py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">交易指南</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            了解农村产权交易流程，轻松完成产权流转
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title="交易流程" subtitle="简单六步，轻松完成农村产权交易" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((item, index) => (
              <div key={index} className="relative">
                <Card hover className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-dark text-lg mb-2">{item.title}</h3>
                      <p className="text-neutral text-sm">{item.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title="所需材料" subtitle="不同类型产权交易所需材料清单" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {documents.map((doc, index) => (
              <Card key={index}>
                <Card.Header className="bg-primary-50">
                  <h3 className="font-bold text-neutral-dark text-lg">{doc.type}</h3>
                </Card.Header>
                <Card.Body>
                  <ul className="space-y-3">
                    {doc.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-neutral text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionTitle title="常见问题" subtitle="解答您在产权交易中的疑问" />
          <FAQAccordion />
        </div>
      </section>
    </div>
  );
}
