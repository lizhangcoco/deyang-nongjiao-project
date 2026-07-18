# 成都农交所资产管理小程序 (SOE国资监管合规版)

> 严格依据《成农交【2026】59号资产管理办法》+ 国资监管法规群开发
> 微信原生小程序框架 · 完整本地Mock数据 · 即开即用

## 一、技术栈

- 微信小程序原生框架 (WXML/WXSS/JS)
- TypeScript 兼容(ES6+)
- 本地存储模拟后端(可平滑切换至Spring Boot后端)
- 组件化设计(4个全局组件)

## 二、目录结构

```
asset-management-mp/
├── app.js                     # 全局入口 + 阈值配置 + SOE巡检
├── app.json                   # 路由+tabBar+权限
├── app.wxss                   # 全局样式(国企红主题)
├── project.config.json        # 项目配置
├── sitemap.json
├── utils/                     # 工具层
│   ├── enum.js                # 全局枚举(对应59号制度第一部分)
│   ├── storage.js             # 本地存储+ID/编号生成器
│   ├── auth.js                # 鉴权+角色+数据隔离+菜单权限
│   ├── soe-rules.js           # SOE规则引擎(AI判定+审批匹配+三重一大等)
│   ├── mock.js                # 14个测试账号+10项资产+多业务Mock数据
│   └── api.js                 # 13个业务API封装
├── components/                # 全局组件
│   ├── asset-card/            # 资产卡片
│   ├── status-tag/            # 状态标签(10种状态色)
│   ├── approval-flow/         # 审批流可视化
│   └── empty-state/           # 空状态
└── pages/                     # 22个页面
    ├── login/                 # 登录(支持14账号快速切换)
    ├── dashboard/             # 工作台(统计+待办+菜单+SOE预警)
    ├── asset-list/            # 资产台账(搜索+筛选+扫码)
    ├── asset-detail/          # 资产详情(电子标牌+SOE合规提示)
    ├── asset-inbound/         # 入库(AI判定+预算预警+三重一大)
    ├── asset-scrap/           # 报废(评估+集体决策+处置小组)
    ├── asset-receive/         # 领用(高价值三级审签)
    ├── asset-transfer/        # 调拨(双方确认+归口审批)
    ├── inventory/             # 盘点(年终大盘+不定期抽查)
    ├── inventory-scan/        # 盘点扫码(盘盈亏自动标记)
    ├── approval-list/         # 审批中心(待办/已发起/全部)
    ├── major-decision/        # 三重一大(党委会+董事会+录音录像)
    ├── property-reg/          # 产权登记(占有/变动/注销+逾期预警)
    ├── appraisal/             # 资产评估(机构库+备案+增值率)
    ├── exchange/              # 进场交易(挂牌价校验+公示期)
    ├── sasac-report/          # 国资报送(AI自动生成+KPI看板)
    ├── my-assets/             # 我的资产
    ├── leave-clearance/       # 离职清收(锁定拦截)
    ├── ai-assistant/          # AI助手(自然语言查询)
    ├── archive/               # 档案中心(12类台账)
    ├── violation/             # 违规追责(5违规+6处置)
    └── profile/               # 个人中心(子公司制度备案审核)
```

## 三、快速启动

### 1. 导入项目
- 打开微信开发者工具
- 选择"导入项目"
- 项目目录：`asset-management-mp`
- AppID：可使用测试号(或填入正式AppID)

### 2. 测试账号(密码统一123456)

| 手机号 | 姓名 | 角色 | 用途 |
|---|---|---|---|
| 13800000001 | 系统管理员 | 超级管理员 | 全权限 |
| 13800000002 | 张综合 | 综合部管理员 | 非经营资产归口 |
| 13800000003 | 李数信 | 数信中心管理员 | 信息化资产 |
| 13800000004 | 王战略 | 战略发展部 | 经营性资产 |
| 13800000005 | 赵财务 | 财务部 | 折旧+凭证 |
| 13800000006 | 钱风控 | 风控法务部 | 会签 |
| 13800000007 | 孙纪检 | 纪检工作部 | 会签+追责 |
| 13800000008 | 周一部 | 部门资产管理员 | 部门台账 |
| 13800000009 | 吴员工 | 普通员工 | 我的资产 |
| 13800000010 | 郑子公 | 子公司管理员 | 子公司隔离 |
| 13800000011 | 马董事长 | 董事长 | 三重一大决策 |
| 13800000012 | 冯总经理 | 总经理 | 签发 |
| 13800000013 | 陈书记 | 党委书记 | 党委会前置 |
| 13800000014 | 褚监事 | 监事 | 监督 |

也可在登录页直接点击账号卡片快速登录。

## 四、核心功能演示路径

### 路径1: AI辅助资产入库(59号制度3.1-3.4)
1. 工作台 → 资产入库
2. 填写资产名称、分类、单价、使用年限、存放地点
3. AI自动判定固资/低值、归口部门、原值合计
4. AI预算校验(超预算拦截)
5. AI审批流匹配(<2000综合部/2000-20000双审批/>20000跳采购)
6. AI三重一大识别(≥500万触发)
7. 入库后自动:生成资产编号+电子标牌+产权占有登记申请

### 路径2: SOE三重一大决策
1. 工作台 → 三重一大
2. 发起决策(单笔≥100万自动触发)
3. 党委会前置研究(法定人数校验)
4. 董事会集体决策(录音录像+区块链存证)
5. 决策通过后业务流程方可继续

### 路径3: SOE资产报废全流程
1. 资产详情 → 报废
2. SOE评估必要性判定(账面≥10万强制评估)
3. SOE三重一大预警(原值≥100万)
4. 填写报废类型+事由
5. 大型设备强制第三方鉴定
6. 国家专项强制合规证明
7. 对外转让自动跳转进场交易
8. 提交后:联合处置方案→总办会→处置小组→财务核销

### 路径4: SOE进场交易
1. 工作台 → 进场交易
2. 选择交易类型(转让/出租/投资退出)
3. SOE进场必要性校验(转让一律进场/年租≥100万)
4. 挂牌价校验(不得低于评估价+重新挂牌降幅≤10%)
5. 挂牌成功:公示≥20工作日+双公示(企业内网+国资委)

### 路径5: AI智能助手
1. 工作台 → AI助手
2. 输入"查询所有闲置资产"
3. 输入"什么是三重一大？"
4. 输入"资产报废流程是什么？"

### 路径6: 离职资产清收
1. 工作台 → 离职清收
2. 系统自动带出名下资产
3. 选择内部分配/退回综合部
4. 综合部确认清收 → 离职流程解锁

## 五、SOE合规硬性保障(已落地)

| 合规点 | 实现位置 | 阈值 |
|---|---|---|
| 三重一大集体决策 | soe-rules.js + major-decision页 | 单笔处置≥100万 |
| 党委会前置研究 | major-decision流程 | 所有三重一大 |
| 法定人数校验 | major-decision流程 | 应到过半+出席过半通过 |
| 产权占有/变动/注销登记 | property-reg页 | 入库自动+变动30日内 |
| 产权变动逾期拦截 | app.js巡检 | 30日 |
| 资产评估强制 | soe-rules.js | 账面净值≥10万 |
| 进场交易强制 | soe-rules.js | 转让一律/年租≥100万 |
| 挂牌价≥评估价 | exchange页校验 | 强制 |
| 重新挂牌降幅≤10% | soe-rules.js | 强制 |
| 公示期≥20工作日 | exchange流程 | 强制 |
| 关联交易识别 | soe-rules.js | 关联方库匹配 |
| 国资监管报送 | sasac-report页 | 月/季/年/重大24h |
| 离职资产锁定 | leave-clearance页 | 强制 |
| 子公司数据隔离 | auth.js | 行级隔离 |
| 追责永久存档 | violation页 | 5违规+6处置 |
| 评估报告国资委备案 | appraisal页 | 强制 |
| 国资考核KPI | sasac-report页 | 保值增值+闲置率 |
| 区块链存证 | archive页说明 | 关键档案 |
| SM2/SM4国密 | archive页说明 | 加密+签名 |

## 六、AI智能能力(10项已落地)

| 编号 | 能力 | 实现位置 |
|---|---|---|
| AI-1 | 资产自动判定(固资/低值+归口) | soe-rules.js judgeAsset |
| AI-2 | 审批流自动匹配 | soe-rules.js matchApprovalFlow |
| AI-3 | 资料预审拦截 | (预留接口,实际生产OCR) |
| AI-4 | 盘点辅助识别(扫码+盘盈亏) | inventory-scan页 |
| AI-5 | 台账智能检索(自然语言) | ai-assistant页 |
| AI-6 | 预算预警 | soe-rules.js checkBudget |
| AI-7 | 三重一大智能识别 | soe-rules.js identifyMajorDecision |
| AI-8 | 关联交易智能识别 | soe-rules.js identifyRelatedParty |
| AI-9 | 国资监管报送智能生成 | sasac-report页 onAutoGenerate |
| AI-10 | 资产保值增值智能分析 | soe-rules.js calculateKPI |

## 七、与59号制度条款对应表

| 制度条款 | 实现位置 |
|---|---|
| 1.1 资产分类定义 | utils/enum.js |
| 1.1.2 价值分级判定 | soe-rules.js judgeAsset |
| 1.1.3 资产状态10枚举 | enum.js ASSET_STATUS |
| 1.1.4 报废类型 | enum.js SCRAP_TYPE |
| 1.1.5 组织层级 | enum.js ORG_LEVEL |
| 1.1.6 部门归口7类 | enum.js DEPT_ROLE |
| 2.1-2.9 9类角色权限 | auth.js + mock.js测试账号 |
| 3.1 预算前置强制 | soe-rules.js checkBudget |
| 3.2 分级审批流 | soe-rules.js matchApprovalFlow |
| 3.3 特殊资产流程 | asset-inbound页跳转逻辑 |
| 3.4 入库标准流程 | asset-inbound页 |
| 3.5 电子标牌9字段 | asset-detail页 |
| M2 领用/调拨/离职 | receive/transfer/leave-clearance页 |
| M3 维修>2万跳采购 | soe-rules.js maintenance分支 |
| M4 装修三级金额 | soe-rules.js matchRenovationFlow |
| M4 投资属性校验 | (预留流程跳转) |
| M5 盘点三方协同 | inventory + inventory-scan页 |
| M6 招商转让 | exchange页 |
| M7 报废全流程 | asset-scrap页 |
| M7 国家专项合规 | asset-scrap页 has_special_regulation |
| M7 报废对外转让 | asset-scrap页 is_transfer_out |
| M8 月度折旧 | (后端批处理,前端展示) |
| M8 已提足折旧不删除 | asset-card字段 still_in_use |
| 第五部分 5违规6处置 | violation页 + enum.js |
| 第六部分 6项AI | soe-rules.js + ai-assistant页 |
| 第七部分 附则 | app.js thresholds + profile页制度信息 |

## 八、生产部署提示

1. **后端切换**:将`utils/api.js`中所有`storage.get/insert/update`替换为`wx.request`调用Spring Boot后端API。
2. **数据隔离**:MyBatis-Plus多租户插件+`owner_org_id`行级隔离。
3. **审批流**:接入Flowable 7,前端`approval-flow`组件已适配。
4. **AI服务**:将`utils/soe-rules.js`中的规则函数替换为Python FastAPI微服务调用。
5. **区块链**:接入长安链/蚂蚁链SDK,关键档案哈希上链。
6. **国密**:集成SM2/SM4 SDK,替换`storage.js`的明文存储。
7. **外部对接**:国资监管平台/成都农交所/产权交易所API对接。

## 九、版本信息

- 版本：v1.0.0 SOE
- 制度版本：成农交【2026】59号
- 生效日期：2026年7月17日
- 废止：成农交〔2022〕92号
- 开发：依据用户全权委托独立完成
