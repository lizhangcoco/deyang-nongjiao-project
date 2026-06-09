import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: '农村产权流转需要哪些基本条件？',
    answer: '农村产权流转需满足以下条件：1. 产权清晰，有合法的权属证明；2. 流转双方自愿平等协商；3. 流转方案符合土地利用总体规划和产业发展规划；4. 涉及农民利益的应当经本集体经济组织成员会议或者成员代表会议讨论通过；5. 需要到农村产权交易机构进行登记备案。',
  },
  {
    question: '土地经营权流转期限有什么规定？',
    answer: '土地经营权流转期限由流转双方协商确定，但不得超过土地承包期的剩余期限。根据相关法律法规，耕地的承包期为30年，草地的承包期为30-50年，林地的承包期为30-70年。流转到期后，流转双方可以协商续期。',
  },
  {
    question: '林权流转需要办理哪些手续？',
    answer: '林权流转需要办理以下手续：1. 向当地林业主管部门申请林木采伐许可（如果涉及采伐）；2. 签订林权流转合同；3. 到农村产权交易机构进行交易鉴证；4. 办理林权变更登记手续；5. 到不动产登记部门办理登记过户。',
  },
  {
    question: '集体经营性建设用地可以自由流转吗？',
    answer: '集体经营性建设用地需要在符合规划的前提下，经过本集体经济组织成员的村民会议三分之二以上成员或者三分之二以上村民代表的同意，并报乡（镇）人民政府批准后，方可入市交易。目前主要通过农村产权交易平台进行公开转让。',
  },
  {
    question: '产权交易需要缴纳哪些费用？',
    answer: '产权交易费用主要包括：1. 交易服务费（按交易金额的一定比例收取）；2. 鉴证费；3. 评估费（如果需要评估）；4. 登记过户费用。具体收费标准可咨询当地农村产权交易机构。',
  },
  {
    question: '如何保障流转双方的合法权益？',
    answer: '为保障流转双方权益，建议：1. 通过农村产权交易机构进行公开交易；2. 签订规范的流转合同，明确双方权利义务；3. 及时办理产权变更登记手续；4. 保留完整的交易凭证和资料；5. 如有纠纷，可通过协商、调解、仲裁或诉讼等方式解决。',
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-card overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-neutral-dark pr-4">{faq.question}</span>
            <ChevronDown
              className={clsx(
                'w-5 h-5 text-primary flex-shrink-0 transition-transform',
                openIndex === index && 'rotate-180'
              )}
            />
          </button>
          <div
            className={clsx(
              'px-5 transition-all duration-300 ease-in-out',
              openIndex === index ? 'py-4 max-h-96' : 'py-0 max-h-0 overflow-hidden'
            )}
          >
            <p className="text-neutral leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
