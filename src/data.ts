export type MethodStep = {
  short: string
  title: string
  description: string
  outputs: string[]
}

export type Project = {
  id: string
  status: string
  title: string
  summary: string
  details: string[]
  deliverables: string[]
  note: string
}

export const methodSteps: MethodStep[] = [
  {
    short: '需求洞察',
    title: '先问价值，再谈模型。',
    description: '从业务角色、工作流和决策点开始，找出真正值得被 AI 改造的环节，而不是从技术名词反推需求。',
    outputs: ['需求访谈与角色地图', '业务流程与痛点拆解', '场景价值与优先级评估'],
  },
  {
    short: '产品规划',
    title: '把场景，变成清楚的产品。',
    description: '定义用户、任务、边界与验收方式，将模糊想法整理为团队可以讨论、评审和执行的方案。',
    outputs: ['产品路线图与 PRD', 'Agent 任务流与上下文设计', '功能原型与验收标准'],
  },
  {
    short: '原型验证',
    title: '用真实任务，验证关键路径。',
    description: '让真实输入尽早进入原型，验证模型、工具和流程能否协同，也如实记录不能做什么。',
    outputs: ['可交互的产品原型', '提示词与 Skill 设计', '测试样例与问题清单'],
  },
  {
    short: '系统落地',
    title: '接入流程，而不止完成演示。',
    description: '连接知识库、文档、数据和既有业务系统，让 Agent 成为工作流的一部分，并兼顾实施与使用培训。',
    outputs: ['MCP 与业务工具集成', '企业知识与文档处理', '实施 SOP 与使用培训'],
  },
  {
    short: '方法复用',
    title: '交付一次，把经验留下。',
    description: '将实践整理成手册、模板、课程和可复用资产，让下一次交付不必从零开始。',
    outputs: ['FDE 方法手册', '可复用模板与 Skill', '培训体系与组织赋能'],
  },
]

export const projects: Project[] = [
  {
    id: 'finance-agent',
    status: '实践材料',
    title: '金融 Agent 场景与审核 Skill',
    summary: '围绕访前一页纸、贷前／贷中／贷后审核，探索金融业务与 Agent、文档智能和系统集成的结合。',
    details: [
      '从金融业务流程中梳理高价值场景，包括访前准备、材料审核、合同与尽调分析、经营问数和报告生成。',
      '将重复审核任务整理为合同自审、尽调自审、合同尽调互审、材料与系统比对、审核报告五类 Skill，并处理上下文循环、工具接入与报告输出等实际问题。',
    ],
    deliverables: ['场景梳理与创建手册', '五类审核 Skill', 'Mock API 与演示材料'],
    note: '本项展示方案与实践材料，不代表相关场景均已在真实客户环境上线；模拟数据与建设目标不作为实际经营成效。',
  },
  {
    id: 'fde-sop',
    status: '方法沉淀',
    title: 'FDE 标准化 SOP 文档体系',
    summary: '把需求调研、场景评估、原型验证、工具集成、交付验收和培训，整理成可复用的工作方法。',
    details: [
      '围绕 FDE 的真实工作过程，将一次项目中的隐性经验拆解为可执行步骤、标准模板和检查项。',
      '文档体系包含 16 份 Markdown 材料，覆盖业务流程梳理、需求表、现场手册、验收、运营、知识沉淀和培训等方向。',
    ],
    deliverables: ['16 份 SOP 文档', '需求与流程模板', '验收和培训材料'],
    note: '原始文件仍标注为内部评审草案，因此官网仅展示方法与实践范围，不提供原始文件下载，也不表述为组织正式制度。',
  },
  {
    id: 'knowledge-works',
    status: '公开书稿',
    title: '知识作品与内容实验',
    summary: '把专业经验、组织思考与古典思想，整理成书籍、培训材料和视频内容。',
    details: [
      '公开书稿包括《销售与售前分析工具全书》《道德经新解》《Neo Lab：AI原生组织的崛起》，覆盖售前方法、组织变革与人文思考。',
      '同时探索培训网站、汇报 PPT、会议纪要 H5、个人工具与短视频等表达载体，让知识不仅被记录，也能被理解和使用。',
    ],
    deliverables: ['三部可下载书稿', '培训与汇报材料', 'AI 时代生存课视频探索'],
    note: '三部书稿已在下方“公开书稿”栏目提供 PDF 下载；它们属于个人知识作品，不表述为正式出版或公开销售。',
  },
]

export const libraryBooks = [
  {
    topic: 'AI 组织',
    title: 'Neo Lab：AI 原生组织的崛起',
    subtitle: '从科层制的历史到人机协作的新秩序',
    description: '16 章组织思考，从目标、任务网络、知识积累与责任机制出发，讨论人和智能体如何共同完成可验证的成果。',
    href: 'books/neo-lab-ai-native-organization.pdf',
    filename: 'Neo Lab：AI原生组织的崛起.pdf',
    size: '约 1.8 MB',
  },
  {
    topic: '售前方法',
    title: '销售与售前分析工具全书',
    subtitle: '从客户洞察到赢单复盘的 60 个实战框架',
    description: '面向企业级软件与复杂解决方案业务，将客户发现、资格判断、方案表达、论证、谈判和复盘整理成可使用的工具。',
    href: 'books/sales-presales-analysis-toolkit.pdf',
    filename: '销售与售前分析工具全书.pdf',
    size: '约 7.3 MB',
  },
  {
    topic: '古典新解',
    title: '道德经新解',
    subtitle: '从古典智慧到现代生活的八十一章通识读本',
    description: '逐章呈现原文、白话译解、古注视角与现代场景，在商业、科技、职场、家庭和个人成长之间建立有边界的连接。',
    href: 'books/dao-de-jing-new-interpretation.pdf',
    filename: '道德经新解.pdf',
    size: '约 53 MB',
  },
]

export const timeline = [
  {
    period: '2017—2020',
    title: '软件开发与自动化',
    description: '从 Python、ChatOps、消息处理与业务自动化做起，建立数据中台、ETL 与规则引擎相关技术底座。',
  },
  {
    period: '2020—2021',
    title: '项目与复杂交付',
    description: '面向大型客户推进平台项目，在需求、跨部门协作、验收与售前支持之间建立完整视角。',
  },
  {
    period: '2021—2024',
    title: '云平台产品管理',
    description: '参与云平台、FinOps、智能运维等产品的规划、迭代、运营与协同交付。',
  },
  {
    period: '2024—2026',
    title: '解决方案与 AI 建设',
    description: '将产品线规划、研发团队管理、重点客户方案与 AI 应用建设连接起来。',
  },
  {
    period: '现在',
    title: '企业 AI 与 FDE',
    description: '聚焦 Agent 产品规划、企业办公智能化、行业场景落地与 FDE 方法及组织赋能。',
  },
]

export const publicNotes = [
  {
    year: '2017—2018',
    title: '早期代码与学习足迹',
    source: 'GitHub · codes',
    href: 'https://github.com/njxshr/codes',
  },
  {
    year: '2019',
    title: 'CNN 卷积算法应用——手写数字识别',
    source: '腾讯云开发者社区',
    href: 'https://cloud.tencent.com/developer/article/1415106',
  },
  {
    year: '2020',
    title: '北极星指标',
    source: '腾讯云开发者社区',
    href: 'https://cloud.tencent.com/developer/article/1685703',
  },
  {
    year: '2022',
    title: 'Quest 2 网络排障回答',
    source: '知乎',
    href: 'https://www.zhihu.com/question/459007821/answer/2397645494',
  },
]

export const introText = '我叫李钊，专注企业AI解决方案、Agent应用、企业办公智能化及FDE场景落地，具备AI场景挖掘、业务系统集成与FDE方法建设经验。自2017年起工作，拥有9年企业级软件与数字化经验，曾任解决方案总监、云平台产品经理、软件开发负责人，具备产品线规划、研发团队管理，以及数据中台、ETL数据集成和规则引擎相关研发设计经验。我关注如何把业务需求转化为可交付的产品与方案，并通过FDE手册、培训和工具沉淀为可复用能力。'
