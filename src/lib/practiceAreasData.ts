export type SupportedLocale = 'en' | 'zh-Hans' | 'zh-Hant';

export interface LocalizedString {
  en: string;
  'zh-Hans': string;
  'zh-Hant': string;
}

export interface LocalizedStringArray {
  en: string[];
  'zh-Hans': string[];
  'zh-Hant': string[];
}

export interface KeyProcedure {
  title: string;
  desc: string;
}

export interface LocalizedKeyProcedures {
  en: KeyProcedure[];
  'zh-Hans': KeyProcedure[];
  'zh-Hant': KeyProcedure[];
}

export interface ComparisonTableRow {
  dimension: LocalizedString;
  optionA: LocalizedString;
  optionB: LocalizedString;
}

export interface ComparisonTable {
  title: LocalizedString;
  headers: {
    en: [string, string, string];
    'zh-Hans': [string, string, string];
    'zh-Hant': [string, string, string];
  };
  rows: ComparisonTableRow[];
}

export interface FAQItem {
  question: LocalizedString;
  answer: LocalizedString;
}

export interface PracticeAreaDetail {
  slug: string;
  category: 'corporate' | 'conveyancing' | 'litigation' | 'wills' | 'family';
  title: LocalizedString;
  metaTitle: LocalizedString;
  metaDescription: LocalizedString;
  heroDescription: LocalizedString;
  directAnswer: LocalizedString; // 40-60 words factual summary for AI Overviews / Google Snippets
  statutoryFramework: LocalizedStringArray;
  keyProcedures: LocalizedKeyProcedures;
  comparisonTable: ComparisonTable;
  faqs: FAQItem[];
}

export const practiceAreasData: PracticeAreaDetail[] = [
  {
    slug: 'business-purchase-sale',
    category: 'corporate',
    title: {
      en: 'Buying & Selling a Business in BC (Asset vs. Share Purchase)',
      'zh-Hans': '卑诗省企业买卖与商业交割（资产收购 vs 股权收购）',
      'zh-Hant': '卑詩省企業買賣與商業交割（資產收購 vs 股權收購）',
    },
    metaTitle: {
      en: 'Buying & Selling a Business in BC | Asset & Share Purchase Lawyers',
      'zh-Hans': '卑诗省企业买卖与商业收购律师 | 资产与股权交易',
      'zh-Hant': '卑詩省企業買賣與商業收購律師 | 資產與股權交易',
    },
    metaDescription: {
      en: 'Corporate legal counsel for buying and selling businesses in British Columbia. Expert guidance on asset purchases, share transactions, PPSA due diligence, and tax elections.',
      'zh-Hans': '卑诗省企业买卖与商业并购专业律师服务，专精资产收购、股权转让、PPSA抵押尽职调查、商业租约转让与交割清算。',
      'zh-Hant': '卑詩省企業買賣與商業併購專業律師服務，專精資產收購、股權轉讓、PPSA抵押盡職調查、商業租約轉讓與交割清算。',
    },
    heroDescription: {
      en: 'Comprehensive transactional legal counsel for business acquisitions, mergers, and sales across British Columbia under the Business Corporations Act.',
      'zh-Hans': '依据卑诗省商业公司法及相关税务法规，为买卖双方提供全流程商业收购、尽职调查与法律交割服务。',
      'zh-Hant': '依據卑詩省商業公司法及相關稅務法規，為買賣雙方提供全流程商業收購、盡職調查與法律交割服務。',
    },
    directAnswer: {
      en: 'Buying or selling a business in British Columbia proceeds either as an asset purchase or a share purchase under the BC Business Corporations Act. The transaction involves letters of intent, lien searches under the Personal Property Security Act, lease assignment approvals, tax elections under Section 22 and 167, and formal closing documentation.',
      'zh-Hans': '在卑诗省买卖企业依据《卑诗省商业公司法》主要分为资产收购与股权收购两种架构。法律流程涵盖签署意向书、通过《个人财产担保法》（PPSA）注册处进行留置权尽调、商业租约转让审批、加拿大税法第22条及167条联合申报，以及交割资金清算与法律交割文件签署。',
      'zh-Hant': '在卑詩省買賣企業依據《卑詩省商業公司法》主要分為資產收購與股權收購兩種架構。法律流程涵蓋簽署意向書、透過《個人財產擔保法》（PPSA）註冊處進行留置權盡調、商業租約轉讓審批、加拿大稅法第22條及167條聯合申報，以及交割資金清算與法律交割文件簽署。',
    },
    statutoryFramework: {
      en: [
        'BC Business Corporations Act [SBC 2002] c. 57',
        'Personal Property Security Act (PPSA) [RSBC 1996] c. 359',
        'Income Tax Act (Canada) ss. 22 & 167',
        'Competition Act (Canada) [RSC 1985] c. C-34',
      ],
      'zh-Hans': [
        '卑诗省商业公司法（BC Business Corporations Act）[SBC 2002] c. 57',
        '个人财产担保法（Personal Property Security Act - PPSA）[RSBC 1996] c. 359',
        '加拿大联邦所得税法（Income Tax Act）第22条及167条',
        '加拿大竞争法（Competition Act）[RSC 1985] c. C-34',
      ],
      'zh-Hant': [
        '卑詩省商業公司法（BC Business Corporations Act）[SBC 2002] c. 57',
        '個人財產擔保法（Personal Property Security Act - PPSA）[RSBC 1996] c. 359',
        '加拿大聯邦所得稅法（Income Tax Act）第22條及167條',
        '加拿大競爭法（Competition Act）[RSC 1985] c. C-34',
      ],
    },
    keyProcedures: {
      en: [
        {
          title: 'Letter of Intent (LOI) & Structuring',
          desc: 'Negotiation of core deal terms, exclusivity periods, deposit escrow conditions, and asset versus share purchase classification.',
        },
        {
          title: 'Comprehensive Due Diligence & PPSA Searches',
          desc: 'Examining corporate minute books, financial records, litigation history, and registered security interests under the BC Personal Property Registry.',
        },
        {
          title: 'Commercial Lease Assignment & Landlord Approval',
          desc: 'Navigating landlord covenants, assignment requirements, personal indemnities, and landlord consent agreements.',
        },
        {
          title: 'Definitive Purchase Agreement & Closing Adjustments',
          desc: 'Drafting representations, warranties, indemnities, non-compete covenants, inventory adjustments, and statutory tax elections.',
        },
      ],
      'zh-Hans': [
        {
          title: '意向书（LOI）与交易架构设计',
          desc: '明确核心交割条款、排他期、定金托管条件，以及资产收购与股权收购的最优税务架构确立。',
        },
        {
          title: '全面尽职调查与PPSA抵押检索',
          desc: '调取公司会议记录薄、审计财务账目、查验未结诉讼，并在卑诗个人财产登记处调取动产留置权与银行质押担保。',
        },
        {
          title: '商业租约转让与房东审批',
          desc: '审查商业租约转让条款、处理房东资格审批、协调无限连带担保责任及签署三方转让确认协议。',
        },
        {
          title: '正式买卖协议草拟与资金交割清算',
          desc: '起草权责陈述与保证条款、竞业禁止约定、存货交割盘点调整及执行第22条与第167条税务联合申报。',
        },
      ],
      'zh-Hant': [
        {
          title: '意向書（LOI）與交易架構設計',
          desc: '明確核心交割條款、排他期、定金託管條件，以及資產收購與股權收購的最優稅務架構確立。',
        },
        {
          title: '全面盡職調查與PPSA抵押檢索',
          desc: '調取公司會議記錄簿、審計財務賬目、查驗未結訴訟，並在卑詩個人財產登記處調取動產留置權與銀行質押擔保。',
        },
        {
          title: '商業租約轉讓與房東審批',
          desc: '審查商業租約轉讓條款、處理房東資格審批、協調無限連帶擔保責任及簽署三方轉讓確認協議。',
        },
        {
          title: '正式買賣協議草擬與資金交割清算',
          desc: '起草權責陳述與保證條款、競業禁止約定、存貨交割盤點調整及執行第22條與第167條稅務聯合申報。',
        },
      ],
    },
    comparisonTable: {
      title: {
        en: 'Asset Purchase vs. Share Purchase in British Columbia',
        'zh-Hans': '卑诗省资产收购与股权收购机制对比',
        'zh-Hant': '卑詩省資產收購與股權收購機制對比',
      },
      headers: {
        en: ['Key Dimension', 'Asset Purchase (APA)', 'Share Purchase (SPA)'],
        'zh-Hans': ['核心对比维度', '资产收购协议（APA）', '股权收购协议（SPA）'],
        'zh-Hant': ['核心對比維度', '資產收購協議（APA）', '股權收購協議（SPA）'],
      },
      rows: [
        {
          dimension: {
            en: 'Liabilities Assumed',
            'zh-Hans': '历史债务与法律责任承担',
            'zh-Hant': '歷史債務與法律責任承擔',
          },
          optionA: {
            en: 'Buyer selects specific assets; pre-existing debts and historic liabilities remain with the seller entity.',
            'zh-Hans': '买方仅购买选定的特定资产，目标公司既往商业债务与历史法律责任由卖方自行承担。',
            'zh-Hant': '買方僅購買選定的特定資產，目標公司既往商業債務與歷史法律責任由賣方自行承擔。',
          },
          optionB: {
            en: 'Buyer acquires corporate shares, automatically inheriting all historical corporate liabilities, debts, and audits.',
            'zh-Hans': '买方购入公司股份，依法全盘继承公司设立以来的所有历史负债、税务审计与法律责任。',
            'zh-Hant': '買方購入公司股份，依法全盤繼承公司設立以來的所有歷史負債、稅務審計與法律責任。',
          },
        },
        {
          dimension: {
            en: 'Tax Treatment for Parties',
            'zh-Hans': '买卖双方税务处理机制',
            'zh-Hant': '買賣雙方稅務處理機制',
          },
          optionA: {
            en: 'Buyer steps up asset cost bases for future depreciation; seller may incur recapture and income tax.',
            'zh-Hans': '买方可重新评估设备资产成本基础用于折旧抵税；卖方可能产生折旧收回及常规收入税。',
            'zh-Hant': '買方可重新評估設備資產成本基礎用於折舊抵稅；賣方可能產生折舊收回及常規收入稅。',
          },
          optionB: {
            en: 'Qualifying individual sellers may claim the Lifetime Capital Gains Exemption (LCGE); buyer inherits historical basis.',
            'zh-Hans': '符合条件的卖方个人可使用加拿大终身资本利得免税额（LCGE）；买方继承原有历史折旧基数。',
            'zh-Hant': '符合條件的賣方個人可使用加拿大終身資本利得免稅額（LCGE）；買方繼承原有歷史折舊基數。',
          },
        },
        {
          dimension: {
            en: 'Third-Party & Lease Consents',
            'zh-Hans': '第三方合同及租约转让要求',
            'zh-Hant': '第三方合同及租約轉讓要求',
          },
          optionA: {
            en: 'Requires explicit written assignment agreements from landlords, suppliers, and individual employment re-offers.',
            'zh-Hans': '须逐项取得房东、供应商的书面转让许可，员工劳动关系须解除并由买方重新提供录用合同。',
            'zh-Hant': '須逐項取得房東、供應商的書面轉讓許可，員工勞動關係須解除並由買方重新提供錄用合同。',
          },
          optionB: {
            en: 'Contracts remain with the company; however, lease "change of control" clauses frequently require landlord approval.',
            'zh-Hans': '公司对外合同主体保持不变；但商业租约中的“控制权变更”条款通常仍需取得房东书面同意。',
            'zh-Hant': '公司對外合同主體保持不變；但商業租約中的「控制權變更」條款通常仍需取得房東書面同意。',
          },
        },
        {
          dimension: {
            en: 'Statutory Registry Filings',
            'zh-Hans': '法定注册处备案手续',
            'zh-Hant': '法定註冊處備案手續',
          },
          optionA: {
            en: 'PPSA lien discharges, Bulk Sales provisions, and joint GST/PST tax election filings (ss. 22 & 167).',
            'zh-Hans': '个人财产担保（PPSA）留置权注销、大宗货物交割核实及联邦税务第22条、167条联合申报。',
            'zh-Hant': '個人財產擔保（PPSA）留置權註銷、大宗貨物交割核實及聯邦稅務第22條、167條聯合申報。',
          },
          optionB: {
            en: 'Director resolutions, share ledger entries, share certificate transfers, and BC Corporate Registry updates.',
            'zh-Hans': '董事会转让决议、股东名册更新、股份凭证签发及卑诗省公司登记处（BC Registry）高管变更。',
            'zh-Hant': '董事會轉讓決議、股東名冊更新、股份憑證簽發及卑詩省公司登記處（BC Registry）高管變更。',
          },
        },
      ],
    },
    faqs: [
      {
        question: {
          en: 'What is the difference between an asset purchase and a share purchase in BC?',
          'zh-Hans': '在卑诗省买卖企业，资产收购与股权收购的核心区别是什么？',
          'zh-Hant': '在卑詩省買賣企業，資產收購與股權收購的核心區別是什麼？',
        },
        answer: {
          en: 'In an asset purchase, the buyer acquires specified operating assets and equipment while leaving pre-closing debts and corporate liabilities with the seller company. In a share purchase, the buyer acquires shares of the corporation itself, assuming ownership of all corporate history, contracts, assets, and liabilities. Tax implications differ significantly between the structures.',
          'zh-Hans': '资产收购中，买方仅挑选购买特定商业设备、库存与无形资产，原公司既往债务由卖方保留；股权收购中，买方收购公司全部股份，全盘接收公司的所有资产、合同及历史未决法律责任。两者的税收政策与风险承担差异显著。',
          'zh-Hant': '資產收購中，買方僅挑選購買特定商業設備、庫存與無形資產，原公司既往債務由賣方保留；股權收購中，買方收購公司全部股份，全盤接收公司的所有資產、合同及歷史未決法律責任。兩者的稅收政策與風險承擔差異顯著。',
        },
      },
      {
        question: {
          en: 'Why is a PPSA registry search essential before purchasing a BC business?',
          'zh-Hans': '购买卑诗省企业前，为什么必须进行PPSA个人财产担保检索？',
          'zh-Hant': '購買卑詩省企業前，為什麼必須進行PPSA個人財產擔保檢索？',
        },
        answer: {
          en: 'Under the Personal Property Security Act (PPSA) of British Columbia, creditors register security interests against equipment, inventory, and accounts. A formal PPSA search reveals registered liens, bank chattel mortgages, and leasing claims. Unreleased liens remain attached to the purchased assets, exposing an unwary purchaser to repossession risks by third-party secured lenders.',
          'zh-Hans': '依据卑诗省《个人财产担保法》（PPSA），金融机构及债权人会对企业动产、设备及应收账款登记担保权益。PPSA检索可排查设备上是否存在未解除的银行质押或租赁留置权。未解除的抵押会附着于资产之上，导致买方资产面临被第三方债权人依法查封拍卖的风险。',
          'zh-Hant': '依據卑詩省《個人財產擔保法》（PPSA），金融機構及債權人會對企業動產、設備及應收賬款登記擔保權益。PPSA檢索可排查設備上是否存在未解除的銀行質押或租賃留置權。未解除的抵押會附著於資產之上，導致買方資產面臨被第三方債權人依法查封拍賣的風險。',
        },
      },
      {
        question: {
          en: 'Does purchasing a business automatically transfer the commercial premises lease?',
          'zh-Hans': '收购企业是否会自动承继原有的商业店铺或办公室租约？',
          'zh-Hant': '收購企業是否會自動承繼原有的商業店鋪或辦公室租約？',
        },
        answer: {
          en: 'No. Standard BC commercial leases contain covenants prohibiting assignment or transfer without prior written landlord consent. The purchaser must submit financial records and references for landlord approval. In share transactions, "change of corporate control" clauses in modern commercial leases also trigger landlord consent requirements prior to transaction completion.',
          'zh-Hans': '不会。卑诗省绝大多数商业租约均严格禁止未经房东书面许可转让租约。买方须提供财务背景及信誉审查以获房东批准。即使采取股权收购模式，多数现代商业租约亦包含“控制权变更”条款，仍需提前向房东报批，否则构成严重违约。',
          'zh-Hant': '不會。卑詩省絕大多數商業租約均嚴格禁止未經房東書面許可轉讓租約。買方須提供財務背景及信譽審查以獲房東批准。即使採取股權收購模式，多數現代商業租約亦包含「控制權變更」條款，仍需提前向房東報批，否則構成嚴重違約。',
        },
      },
      {
        question: {
          en: 'What are Section 22 and Section 167 elections under the Canadian Income Tax Act?',
          'zh-Hans': '加拿大所得税法第22条与第167条联合申报选举有何法律作用？',
          'zh-Hant': '加拿大所得稅法第22條與第167條聯合申報選舉有何法律作用？',
        },
        answer: {
          en: 'Section 22 allows buyer and seller to jointly elect on the tax treatment of accounts receivable, enabling bad debt deductions for the purchaser. Section 167 allows the parties to execute a joint election exempting the transfer of all or substantially all operating assets from Goods and Services Tax (GST), avoiding upfront cash tax payments.',
          'zh-Hans': '第22条联合申报允许买卖双方约定应收账款的税务处理，确保买方未来可对坏账据实计提税务扣减；第167条联合申报允许双方在转让企业全部或绝大部分营运资产时免除商品及服务税（GST），避免买方在交割时垫付巨额现金税款。',
          'zh-Hant': '第22條聯合申報允許買賣雙方約定應收賬款的稅務處理，確保買方未來可對壞賬據實計提稅務扣減；第167條聯合申報允許雙方在轉讓企業全部或絕大部分營運資產時免除商品及服務稅（GST），避免買方在交割時墊付巨額現金稅款。',
        },
      },
    ],
  },
  {
    slug: 'commercial-leasing',
    category: 'corporate',
    title: {
      en: 'Commercial Leasing & NNN Negotiations in British Columbia',
      'zh-Hans': '卑诗省商业租约与三净租赁（NNN Lease）谈判与法律审查',
      'zh-Hant': '卑詩省商業租約與三淨租賃（NNN Lease）談判與法律審查',
    },
    metaTitle: {
      en: 'Commercial Leasing Lawyers in BC | NNN Lease Review & Negotiations',
      'zh-Hans': '卑诗省商业租赁律师 | NNN三净租约谈判与法律审查',
      'zh-Hant': '卑詩省商業租賃律師 | NNN三淨租約談判與法律審查',
    },
    metaDescription: {
      en: 'Expert legal counsel for commercial landlords and tenants in British Columbia. Diligent review of Offers to Lease, Triple Net (NNN) clauses, personal indemnities, and assignments.',
      'zh-Hans': '卑诗省商业地产租赁法律服务，专精商业租约审查、三净租赁（NNN）营运杂费分摊谈判、个人连带担保责任及租约转让违约救济。',
      'zh-Hant': '卑詩省商業地產租賃法律服務，專精商業租約審查、三淨租賃（NNN）營運雜費分攤談判、個人連帶擔保責任及租約轉讓違約救濟。',
    },
    heroDescription: {
      en: 'Strategic commercial lease drafting, risk assessment, and dispute mitigation for retail, office, and industrial properties under BC commercial tenancy laws.',
      'zh-Hans': '为商铺、写字楼及工业物业的房东与租客提供深入的商业租约草拟、条款风险防范及三净费用权益谈判。',
      'zh-Hant': '為商鋪、寫字樓及工業物業的房東與租客提供深入的商業租約草擬、條款風險防範及三淨費用權益談判。',
    },
    directAnswer: {
      en: 'Commercial leasing in British Columbia is primarily governed by common law and the Commercial Tenancy Act. Unlike residential leases, commercial agreements allow broad landlord discretion over triple net (NNN) operating costs, personal indemnities, default remedies, and restoration covenants, making rigorous legal review essential prior to executing binding offers.',
      'zh-Hans': '卑诗省商业租赁主要由普通法与《商业租赁法》（Commercial Tenancy Act）管辖。与受保护的住宅租赁不同，卑诗省商业租约赋予房东在三净租赁（NNN）营运成本分摊、无限连带担保、违约查封救济及退租原状恢复条款上的广泛自由度，租客必须在签署任何具约束力的要约前完成法律审查。',
      'zh-Hant': '卑詩省商業租賃主要由普通法與《商業租賃法》（Commercial Tenancy Act）管轄。與受保護的住宅租賃不同，卑詩省商業租約賦予房東在三淨租賃（NNN）營運成本分攤、無限連帶擔保、違約查封救濟及退租原狀恢復條款上的廣泛自由度，租客必須在簽署任何具約束力的要約前完成法律審查。',
    },
    statutoryFramework: {
      en: [
        'Commercial Tenancy Act [RSBC 1996] c. 57',
        'Rent Distress Act [RSBC 1996] c. 403',
        'Law and Equity Act [RSBC 1996] c. 253',
        'Land Title Act [RSBC 1996] c. 250 (Part 3 - Leases exceeding 3 years)',
      ],
      'zh-Hans': [
        '卑诗省商业租赁法（Commercial Tenancy Act）[RSBC 1996] c. 57',
        '卑诗省租金扣押救济法（Rent Distress Act）[RSBC 1996] c. 403',
        '卑诗省普通法与衡平法法案（Law and Equity Act）[RSBC 1996] c. 253',
        '卑诗省土地所有权法（Land Title Act）第3部分（3年以上长期租约登记）',
      ],
      'zh-Hant': [
        '卑詩省商業租賃法（Commercial Tenancy Act）[RSBC 1996] c. 57',
        '卑詩省租金扣押救濟法（Rent Distress Act）[RSBC 1996] c. 403',
        '卑詩省普通法與衡平法法案（Law and Equity Act）[RSBC 1996] c. 253',
        '卑詩省土地所有權法（Land Title Act）第3部分（3年以上長期租約登記）',
      ],
    },
    keyProcedures: {
      en: [
        {
          title: 'Offer to Lease Review & Condition Precedents',
          desc: 'Analyzing binding economic commitments, exclusivity terms, permit contingencies, and landlord work letter conditions before execution.',
        },
        {
          title: 'Operating Cost (CAM) Audit & Capping',
          desc: 'Negotiating capital cost exclusions, administration fees, management fee caps, and audit verification rights within Triple Net structures.',
        },
        {
          title: 'Personal Indemnity & Guarantee Containment',
          desc: 'Restricting personal guarantor exposure through fixed-dollar caps, declining balance schedules, and early release milestones.',
        },
        {
          title: 'Assignment, Subletting & Change of Control Covenants',
          desc: 'Securing commercially reasonable landlord consent standards, release of assignor upon transfer, and clear sublease procedures.',
        },
      ],
      'zh-Hans': [
        {
          title: '租赁要约（Offer to Lease）审查与先决条件设定',
          desc: '在签署具备法律约束力的要约前，明确市政审批附带条件、免租期条款及房东工程交楼技术标准。',
        },
        {
          title: '营运成本（CAM/NNN）审计与封顶谈判',
          desc: '严格剔除资本性结构维修摊销、限制房东管理费上浮比例，并为租客确立年度实际账目独立审计查阅权。',
        },
        {
          title: '个人连带担保责任限额与退出机制',
          desc: '通过设定担保最高赔偿限额、逐年递减机制或经营达标后自动解除担保条款，最大化保护个人资产。',
        },
        {
          title: '租约转让、分租与公司控制权变更规范',
          desc: '确立房东无正当理由不得拒绝转让的法律标准，明确转让后原租客责任免除程序及分租利润分配比例。',
        },
      ],
      'zh-Hant': [
        {
          title: '租賃要約（Offer to Lease）審查與先決條件設定',
          desc: '在簽署具備法律約束力的要約前，明確市政審批附帶條件、免租期條款及房東工程交樓技術標準。',
        },
        {
          title: '營運成本（CAM/NNN）審計與封頂談判',
          desc: '嚴格剔除資本性結構維修攤銷、限制房東管理費上浮比例，並為租客確立年度實際賬目獨立審計查閱權。',
        },
        {
          title: '個人連帶擔保責任限額與退出機制',
          desc: '透過設定擔保最高賠償限額、逐年遞減機制或經營達標後自動解除擔保條款，最大化保護個人資產。',
        },
        {
          title: '租約轉讓、分租與公司控制權變更規範',
          desc: '確立房東無正當理由不得拒絕轉讓的法律標準，明確轉讓後原租客責任免除程序及分租利潤分配比例。',
        },
      ],
    },
    comparisonTable: {
      title: {
        en: 'Offer to Lease (Binding) vs. Formal Commercial Lease Agreement',
        'zh-Hans': '商业租赁要约（Binding Offer）与正式商业租约合同对比',
        'zh-Hant': '商業租賃要約（Binding Offer）與正式商業租約合同對比',
      },
      headers: {
        en: ['Key Dimension', 'Offer to Lease (LOI)', 'Formal Commercial Lease Agreement'],
        'zh-Hans': ['核心对比维度', '租赁要约（Offer to Lease）', '正式商业租赁合同（Lease Agreement）'],
        'zh-Hant': ['核心對比維度', '租賃要約（Offer to Lease）', '正式商業租賃合同（Lease Agreement）'],
      },
      rows: [
        {
          dimension: {
            en: 'Legal Enforceability',
            'zh-Hans': '法律约束力与生效状态',
            'zh-Hant': '法律約束力與生效狀態',
          },
          optionA: {
            en: 'Binding once essential terms are agreed upon, unless expressly subject to solicitor review conditions.',
            'zh-Hans': '一旦双方签署且核心要素明确即具法律约束力，除非明确载明附带律师审核满意的先决条件。',
            'zh-Hant': '一旦雙方簽署且核心要素明確即具法律約束力，除非明確載明附帶律師審核滿意的先決條件。',
          },
          optionB: {
            en: 'Definitive comprehensive agreement detailing all day-to-day legal obligations, liabilities, and procedures.',
            'zh-Hans': '最终正式合同，全方位界定日常租赁履行、权责归属、保险赔付及法律违约诉讼规则。',
            'zh-Hant': '最終正式合同，全方位界定日常租賃履行、權責歸屬、保險賠付及法律違約訴訟規則。',
          },
        },
        {
          dimension: {
            en: 'Operational Cost Scope',
            'zh-Hans': '营运杂费与附加租金界定',
            'zh-Hant': '營運雜費與附加租金界定',
          },
          optionA: {
            en: 'Briefly references "standard Triple Net operating costs" without detailed expense inclusion formulas.',
            'zh-Hans': '通常仅笼统简述为“标准NNN三净杂费”，缺乏详细的支出剔除明细与分摊计算公式。',
            'zh-Hant': '通常僅籠統簡述為「標準NNN三淨雜費」，缺乏詳細的支出剔除明細與分攤計算公式。',
          },
          optionB: {
            en: 'Extensive provisions (40-70 pages) defining CAM inclusions, structural repair obligations, and capital amortizations.',
            'zh-Hans': '长达数十页详尽条款，细致规定公共区域维护费范围、屋顶地基大修分摊比例及资本折旧列支。',
            'zh-Hant': '長達數十頁詳盡條款，細緻規定公共區域維護費範圍、屋頂地基大修分攤比例及資本折舊列支。',
          },
        },
        {
          dimension: {
            en: 'Assignment & Sublease Standards',
            'zh-Hans': '转让、转租及控制权变更标准',
            'zh-Hant': '轉讓、轉租及控制權變更標準',
          },
          optionA: {
            en: 'States landlord consent is required; rarely clarifies whether consent cannot be unreasonably withheld.',
            'zh-Hans': '通常仅写明“需经房东书面同意”，往往未明确约定房东不得无理拖延或拒绝的法定救济。',
            'zh-Hant': '通常僅寫明「需經房東書面同意」，往往未明確約定房東不得無理拖延或拒絕的法定救濟。',
          },
          optionB: {
            en: 'Defines exact qualification criteria, administrative transfer fees, and whether original tenant is released.',
            'zh-Hans': '详尽约定受让人资质审查标准、转让手续费上限、分租租金差价归属以及原租客的法定连带免责。',
            'zh-Hant': '詳盡約定受讓人資質審查標準、轉讓手續費上限、分租租金差價歸屬以及原租客的法定連帶免責。',
          },
        },
        {
          dimension: {
            en: 'Default & Distraint Remedies',
            'zh-Hans': '违约查封与租金扣押救济',
            'zh-Hant': '違約查封與租金扣押救濟',
          },
          optionA: {
            en: 'Rarely details default cure periods, notice requirements, or landlord re-entry procedures.',
            'zh-Hans': '极少涉及违约宽限期、催告送达形式及房东收回物业更换门锁的具体法定程序。',
            'zh-Hant': '極少涉及違約寬限期、催告送達形式及房東收回物業更換門鎖的具體法定程序。',
          },
          optionB: {
            en: 'Explicitly details notice cure timelines, rent acceleration, and distraint rights under the Rent Distress Act.',
            'zh-Hans': '依据《租金扣押救济法》明确约定租金催缴期、全部未到期租金加速到期及依法查封拍卖动产的权利。',
            'zh-Hant': '依據《租金扣押救濟法》明確約定租金催繳期、全部未到期租金加速到期及依法查封拍賣動產的權利。',
          },
        },
      ],
    },
    faqs: [
      {
        question: {
          en: 'What costs are included in a Triple Net (NNN) commercial lease in BC?',
          'zh-Hans': '卑诗省商业地产中的三净租赁（Triple Net / NNN）包含哪些费用？',
          'zh-Hant': '卑詩省商業地產中的三淨租賃（Triple Net / NNN）包含哪些費用？',
        },
        answer: {
          en: 'A Triple Net (NNN) lease requires the tenant to pay base rent plus additional rent covering three operational expenses: municipal property taxes, building insurance, and common area maintenance (CAM). Tenants must scrutinize CAM provisions to ensure landlords cannot pass through structural capital replacements or unauthorized administrative markups without clear contractual caps.',
          'zh-Hans': '三净租赁（NNN）要求租客除支付基本净租金外，按租赁面积比例承担三项营运杂费：市政商业物业税、建筑综合保险及公共区域维护管理费（CAM）。租客须重点审查合同，防止房东将房屋主体结构大修或不合理的行政管理费擅自计入杂费账单。',
          'zh-Hant': '三淨租賃（NNN）要求租客除支付基本淨租金外，按租賃面積比例承擔三項營運雜費：市政商業物業稅、建築綜合保險及公共區域維護管理費（CAM）。租客須重點審查合同，防止房東將房屋主體結構大修或不合理的行政管理費擅自計入雜費賬單。',
        },
      },
      {
        question: {
          en: 'Is an Offer to Lease legally binding before signing the full commercial lease?',
          'zh-Hans': '在签署正式商业租约合同之前，意向性要约（Offer to Lease）是否具有法律效力？',
          'zh-Hant': '在簽署正式商業租約合同之前，意向性要約（Offer to Lease）是否具有法律效力？',
        },
        answer: {
          en: 'Yes. Under BC common law, if an Offer to Lease identifies the parties, premises, commencement date, term, and rent, courts treat it as an enforceable binding agreement. If a prospective tenant signs without explicit legal conditions precedent, they may be forced into standard landlord-favourable terms later.',
          'zh-Hans': '具有法律效力。依卑诗省普通法判例，一旦要约明确记载了签约主体、物业位置、起租日期、租期及租金核心条款，法院即推定其构成具有强制执行力的约束性协议。租客若未在签署时载明律师满意先决条件，后续将无法单方面推翻苛刻条款。',
          'zh-Hant': '具有法律效力。依卑詩省普通法判例，一旦要約明確記載了簽約主體、物業位置、起租日期、租期及租金核心條款，法院即推定其構成具有強制執行力的約束性協議。租客若未在簽署時載明律師滿意先決條件，後續將無法單方面推翻苛刻條款。',
        },
      },
      {
        question: {
          en: 'Can a commercial landlord seize tenant goods for unpaid rent in BC?',
          'zh-Hans': '如果商业租客拖欠租金，房东在卑诗省是否有权查封或扣押租客的店内财物？',
          'zh-Hant': '如果商業租客拖欠租金，房東在卑詩省是否有權查封或扣押租客的店內財物？',
        },
        answer: {
          en: 'Yes. Under the Rent Distress Act and the Commercial Tenancy Act, commercial landlords possess the statutory remedy of commercial distress (distraint). A landlord may enter premises to seize tenant goods and chattels to satisfy accrued rent arrears, provided statutory appraisal and auction notice requirements are strictly observed.',
          'zh-Hans': '有权查封。依据卑诗省《租金扣押救济法》（Rent Distress Act）及《商业租赁法》，房东享有法定扣押动产的救济权。在严格遵守法定催告与评估程序的前提下，房东可委托专业执法官查封商铺内属于租客的货物与设备，并依法公开拍卖以抵扣拖欠租金。',
          'zh-Hant': '有權查封。依據卑詩省《租金扣押救濟法》（Rent Distress Act）及《商業租賃法》，房東享醫療法定扣押動產的救濟權。在嚴格遵守法定催告與評估程序的前提下，房東可委託專業執法官查封商鋪內屬於租客的貨物與設備，並依法公開拍賣以抵扣拖欠租金。',
        },
      },
      {
        question: {
          en: 'What is a personal indemnity or guarantee clause in a commercial lease?',
          'zh-Hans': '商业租约中的个人连带担保责任（Personal Indemnity / Guarantee）意味着什么？',
          'zh-Hant': '商業租約中的個人連帶擔保責任（Personal Indemnity / Guarantee）意味著什麼？',
        },
        answer: {
          en: 'Landlords routinely require corporate tenant principals to sign personal indemnities. An indemnifier remains personally liable for rent, property damage, and future lease payments if the corporate tenant defaults or enters insolvency. Independent legal representation ensures indemnities are capped by dollar amount or expire after a fixed term.',
          'zh-Hans': '商业房东通常要求有限责任公司的主要股东签署个人担保。一旦公司租客违约退租或破产，担保人将以个人全部家庭资产对拖欠租金、物业损害及未来剩余租期租金承担无限连带赔偿责任。律师介入通常能为担保人设立最高赔偿上限或约定提前退出机制。',
          'zh-Hant': '商業房東通常要求有限責任公司的主要股東簽署個人擔保。一旦公司租客違約退租或破產，擔保人將以個人全部家庭資產對拖欠租金、物業損害及未來剩餘租期租金承擔無限連帶賠償責任。律師介入通常能為擔保人設立最高賠償上限或約定提前退出機制。',
        },
      },
    ],
  },
  {
    slug: 'shareholder-agreements',
    category: 'corporate',
    title: {
      en: "Shareholders' Agreements & Corporate Governance in BC",
      'zh-Hans': '卑诗省股东协议与公司治理（法定章程 vs 独家股东协议）',
      'zh-Hant': '卑詩省股東協議與公司治理（法定章程 vs 獨家股東協議）',
    },
    metaTitle: {
      en: "BC Shareholders' Agreement Lawyers | Corporate Governance & Buy-Sell",
      'zh-Hans': '卑诗省股东协议律师 | 公司治理与霰弹枪买卖机制',
      'zh-Hant': '卑詩省股東協議律師 | 公司治理與霰彈槍買賣機制',
    },
    metaDescription: {
      en: "Custom Shareholders' Agreements under the BC Business Corporations Act. Protect partner equity with shotgun clauses, transfer restrictions, valuation formulas, and dispute remedies.",
      'zh-Hans': '卑诗省股东协议与合伙人法律顾问，依据商业公司法定制霰弹枪强制买卖、股份转让限制、大股东拖售权、小股东随售权及估值争议化解条款。',
      'zh-Hant': '卑詩省股東協議與合夥人法律顧問，依據商業公司法定制霰彈槍強制買賣、股份轉讓限制、大股東拖售權、小股東隨售權及估值爭議化解條款。',
    },
    heroDescription: {
      en: 'Drafting robust private governance frameworks and equity protection mechanisms for multi-shareholder corporations under the BC Business Corporations Act.',
      'zh-Hans': '为卑诗省私人企业合伙人量身定制股东协议，明确控制权边界、资金追加规则及股份退出救济机制。',
      'zh-Hant': '為卑詩省私人企業合夥人量身定制股東協議，明確控制權邊界、資金追加規則及股份退出救濟機制。',
    },
    directAnswer: {
      en: "A Shareholders' Agreement in British Columbia establishes private governance rules under the BC Business Corporations Act. It protects minority and majority shareholders by governing share transfers, capital calls, board appointment rights, valuation formulas, and dispute mechanisms such as shotgun buy-sell clauses, preventing deadlocks and costly oppression litigation.",
      'zh-Hans': '卑诗省股东协议依据《卑诗省商业公司法》为私人企业量身定制内部治理规范。协议界定股份转让限制、增资追加注资规则、董事会席位委任权、企业估值计算准则，并设立霰弹枪（Shotgun）强制买卖与僵局化解机制，有效保障大股东控股权与小股东合法权益，规避高昂诉讼。',
      'zh-Hant': '卑詩省股東協議依據《卑詩省商業公司法》為私人企業量身定制內部治理規範。協議界定股份轉讓限制、增資追加注資規則、董事會席位委任權、企業估值計算準則，並設立霰彈槍（Shotgun）強制買賣與僵局化解機制，有效保障大股東控股權與小股東合法權益，規避高昂訴訟。',
    },
    statutoryFramework: {
      en: [
        'BC Business Corporations Act [SBC 2002] c. 57 (ss. 137, 142, 227 & 324)',
        'BC Securities Act [RSBC 1996] c. 418 (Private Issuer Exemptions)',
        'Income Tax Act (Canada) s. 85 & s. 86 (Rollovers & Capital Reorganizations)',
      ],
      'zh-Hans': [
        '卑诗省商业公司法（BC Business Corporations Act）第137、142、227及324条',
        '卑诗省证券法（BC Securities Act）私人发行人豁免条款',
        '加拿大联邦所得税法第85条及86条（股份置换与资本重组）',
      ],
      'zh-Hant': [
        '卑詩省商業公司法（BC Business Corporations Act）第137、142、227及324條',
        '卑詩省證券法（BC Securities Act）私人發行人豁免條款',
        '加拿大聯邦所得稅法第85條及86條（股份置換與資本重組）',
      ],
    },
    keyProcedures: {
      en: [
        {
          title: 'Management Rights & Board Composition',
          desc: 'Structuring director nomination thresholds, officer appointment parameters, and unanimous supermajority voting rights for fundamental changes.',
        },
        {
          title: 'Transfer Restrictions & Pre-emptive Rights',
          desc: 'Drafting strict Right of First Refusal (ROFR), pre-emptive subscription rights, and permitted transfer exemptions to family holding trusts.',
        },
        {
          title: 'Drag-Along & Tag-Along Co-Sale Rights',
          desc: 'Enabling majority owners to compel 100% company sales while protecting minority investors with identical exit pricing and conditions.',
        },
        {
          title: 'Shotgun Buy-Sell & Valuation Protocols',
          desc: 'Establishing enforceable mandatory buyout triggers, Chartered Business Valuator (CBV) appointment rules, and structured payment schedules.',
        },
      ],
      'zh-Hans': [
        {
          title: '管理权限划分与董事会席位配置',
          desc: '确立董事提名门槛、高级管理人员任免规程，以及针对公司重大资本重组的一票否决与绝对多数表决机制。',
        },
        {
          title: '股份转让限制与优先认购权',
          desc: '拟定严格的优先购买权（ROFR）、反稀释优先认购权，并明确向家族控股信托或直系亲属合法转让的豁免通道。',
        },
        {
          title: '领售权（Drag-Along）与随售权（Tag-Along）',
          desc: '确保大股东在引入第三方收购时有权强制少数股东协同售股，同时保障小股东享有同等估值与交割条件的随售权利。',
        },
        {
          title: '霰弹枪强制买卖与专业估值条款',
          desc: '设立化解不可调和僵局的霰弹枪强制买卖程序、加拿大注册商业估值师（CBV）指定办法及分期付款保证机制。',
        },
      ],
      'zh-Hant': [
        {
          title: '管理權限劃分與董事會席位配置',
          desc: '確立董事提名門檻、高級管理人員任免規程，以及針對公司重大資本重組的一票否決與絕對多數表決機制。',
        },
        {
          title: '股份轉讓限制與優先認購權',
          desc: '擬定嚴格的優先購買權（ROFR）、反稀釋優先認購權，並明確向家族控股信託或直系親屬合法轉讓的豁免通道。',
        },
        {
          title: '領售權（Drag-Along）與隨售權（Tag-Along）',
          desc: '確保大股東在引入第三方收購時有權強制少數股東協同售股，同時保障小股東享有同等估值與交割條件的隨售權利。',
        },
        {
          title: '霰彈槍強制買賣與專業估值條款',
          desc: '設立化解不可調和僵局的霰彈槍強制買賣程序、加拿大註冊商業估值師（CBV）指定辦法及分期付款保證機制。',
        },
      ],
    },
    comparisonTable: {
      title: {
        en: 'Default BC Articles of Incorporation vs. Unanimous Shareholder Agreement (USA)',
        'zh-Hans': '卑诗省法定公司章程与独家股东协议（USA）机制对比',
        'zh-Hant': '卑詩省法定公司章程與獨家股東協議（USA）機制對比',
      },
      headers: {
        en: ['Key Dimension', 'Default BC Articles of Incorporation', 'Unanimous Shareholder Agreement (USA)'],
        'zh-Hans': ['核心对比维度', '法定公司登记章程（Articles）', '独家股东协议（USA）'],
        'zh-Hant': ['核心對比維度', '法定公司登記章程（Articles）', '獨家股東協議（USA）'],
      },
      rows: [
        {
          dimension: {
            en: 'Privacy & Confidentiality',
            'zh-Hans': '保密性与外部公示状态',
            'zh-Hant': '保密性與外部公示狀態',
          },
          optionA: {
            en: 'Part of official company records book; standard statutory clauses are accessible to regulatory authorities.',
            'zh-Hans': '属于公司法定名册公开文件，政府监管机关及法定利害关系人均可依法调取查阅。',
            'zh-Hant': '屬於公司法定名冊公開文件，政府監管機關及法定利害關係人均可依法調取查閱。',
          },
          optionB: {
            en: 'Strictly private commercial contract between shareholders; financial terms and valuation formulas remain confidential.',
            'zh-Hans': '完全私密的商业保密合同，股东之间的特殊权益、估值公式及利益分配对任何第三方完全保密。',
            'zh-Hant': '完全私密的商業保密合同，股東之間的特殊權益、估值公式及利益分配對任何第三方完全保密。',
          },
        },
        {
          dimension: {
            en: 'Share Transfer Restrictions',
            'zh-Hans': '股份转让与退出限制',
            'zh-Hant': '股份轉讓與退出限制',
          },
          optionA: {
            en: 'Broad, vague director discretion to decline transfers, lacking timelines, pricing mechanisms, or ROFR.',
            'zh-Hans': '仅简单赋予董事会拒绝转让的模糊酌处权，缺乏明确的转让程序、时限及价格衡量标准。',
            'zh-Hant': '僅簡單賦予董事會拒絕轉讓的模糊酌處權，缺乏明確的轉讓程序、時限及價格衡量標準。',
          },
          optionB: {
            en: 'Precise Right of First Refusal (ROFR), tag-along, drag-along, and involuntary transfer rules upon death or divorce.',
            'zh-Hans': '严密规定优先受让权、强制领售、小股东随售，以及股东死亡、破产或婚姻破裂时的强制回购。',
            'zh-Hant': '嚴密規定優先受讓權、強制領售、小股東隨售，以及股東死亡、破產或婚姻破裂時的強制回購。',
          },
        },
        {
          dimension: {
            en: 'Deadlock & Dispute Remedies',
            'zh-Hans': '僵局化解与争端解决机制',
            'zh-Hant': '僵局化解與爭端解決機制',
          },
          optionA: {
            en: 'Silent on operational deadlocks, leaving parties no recourse except costly court liquidation under section 324.',
            'zh-Hans': '对合伙人经营僵局完全无解，当事人只能被迫依据商业公司法第324条申请高昂的法院清算清盘。',
            'zh-Hant': '對合夥人經營僵局完全無解，當事人只能被迫依據商業公司法第324條申請高昂的法院清算清盤。',
          },
          optionB: {
            en: 'Structured shotgun buy-sell clauses, mandatory arbitration, and third-party accounting valuation mechanisms.',
            'zh-Hans': '内设霰弹枪强制买卖条款、保密仲裁机制及由独立注册估值师（CBV）裁决估值的退场通道。',
            'zh-Hant': '內設霰彈槍強制買賣條款、保密仲裁機制及由獨立註冊估值師（CBV）裁決估值的退場通道。',
          },
        },
        {
          dimension: {
            en: 'Director Liability Transfer',
            'zh-Hans': '董事法定权力与责任移转',
            'zh-Hant': '董事法定權力與責任移轉',
          },
          optionA: {
            en: 'Management powers remain strictly with directors who bear all statutory fiduciary and environmental liabilities.',
            'zh-Hans': '公司管理权依法保留于董事会，董事须独自承担所有法定受托义务及员工薪酬、税务连带责任。',
            'zh-Hant': '公司管理權依法保留於董事會，董事須獨自承擔所有法定受託義務及員工薪酬、稅務連帶責任。',
          },
          optionB: {
            en: 'Can legally strip directors of specified powers and transfer management authority and liabilities to shareholders.',
            'zh-Hans': '依据《商业公司法》第137条，可依法剥夺董事特定职权并将其管理权力与法定责任直接转移给股东。',
            'zh-Hant': '依據《商業公司法》第137條，可依法剝奪董事特定職權並將其管理權力與法定責任直接轉移給股東。',
          },
        },
      ],
    },
    faqs: [
      {
        question: {
          en: 'What is a "Shotgun Clause" in a BC Shareholders\' Agreement?',
          'zh-Hans': '卑诗省股东协议中的“霰弹枪条款”（Shotgun Clause）是如何运作的？',
          'zh-Hant': '卑詩省股東協議中的「霰彈槍條款」（Shotgun Clause）是如何運作的？',
        },
        answer: {
          en: 'A shotgun clause allows a shareholder to offer to buy out another shareholder at a designated share price. The recipient must either accept the offer to sell their shares at that price or purchase the initiating shareholder\'s shares at the identical valuation. It resolves irreconcilable corporate deadlocks by forcing fair pricing.',
          'zh-Hans': '霰弹枪条款允许一位股东向另一位股东发出书面买断要约，载明每股收购对价。接收方必须在法定限期内二选一：要么接受该价格向对方出售全部股份退场，要么以完全相同的价格反向收购对方的全部股份。该机制能强制出价方给出客观公允的估值。',
          'zh-Hant': '霰彈槍條款允許一位股東向另一位股東發出書面買斷要約，載明每股收購對價。接收方必須在法定限期內二選一：要麼接受該價格向對方出售全部股份退場，要麼以完全相同的價格反向收購對方的全部股份。該機制能強制出價方給出客觀公允的估值。',
        },
      },
      {
        question: {
          en: 'How do Tag-Along and Drag-Along rights protect business partners?',
          'zh-Hans': '领售权（Drag-Along）与随售权（Tag-Along）如何保障不同股东的权益？',
          'zh-Hant': '領售權（Drag-Along）與隨售權（Tag-Along）如何保障不同股東的權益？',
        },
        answer: {
          en: 'Tag-along rights protect minority shareholders by ensuring they can join a majority share sale to a third-party purchaser on identical terms. Drag-along rights protect majority shareholders by compelling minority holders to sell their shares if an institutional buyer requires 100% equity acquisition of the BC corporation.',
          'zh-Hans': '随售权保护小股东权益，确保大股东向第三方出售控股权时，小股东有权按完全相同的价格条件协同退出；领售权则保护控股股东，当第三方买家要求收购公司100%整体股权时，大股东有权强制小股东按相同条件共同出让股份，避免交易流产。',
          'zh-Hant': '隨售權保護小股東權益，確保大股東向第三方出售控股權時，小股東有權按完全相同的價格條件協同退出；領售權則保護控股股東，當第三方買家要求收購公司100%整體股權時，大股東有權強制小股東按相同條件共同出讓股份，避免交易流產。',
        },
      },
      {
        question: {
          en: 'Why are default Articles of Incorporation insufficient for private businesses?',
          'zh-Hans': '为什么仅有公司注册处默认章程（Articles）无法有效保护私人企业合伙人？',
          'zh-Hant': '為什麼僅有公司註冊處默認章程（Articles）無法有效保護私人企業合夥人？',
        },
        answer: {
          en: 'Default Articles under the BC Business Corporations Act provide basic administrative rules but omit mechanisms for shareholder divorce, insolvency, critical funding calls, or voluntary exits. Without a tailored agreement, business disputes often lead to corporate deadlock or expensive oppression litigation in the BC Supreme Court.',
          'zh-Hans': '卑诗省标准法定章程仅提供基础行政运转规则，完全缺失针对股东离婚析产、破产危机、紧急追加注资以及自愿退股的规制条款。若无定制股东协议，一旦合伙人理念不合，极易导致经营僵局瘫痪，最终不得不诉诸卑诗最高法院进行昂贵的司法诉讼。',
          'zh-Hant': '卑詩省標準法定章程僅提供基礎行政運轉規則，完全缺失針對股東離婚析產、破產危機、緊急追加注資以及自願退股的規制條款。若無定制股東協議，一旦合夥人理念不合，極易導致經營僵局癱瘓，最終不得不訴諸卑詩最高法院進行昂貴的司法訴訟。',
        },
      },
      {
        question: {
          en: 'Can a Shareholders\' Agreement restrict outgoing shareholders from competing?',
          'zh-Hans': '股东协议是否可以有效限制退股股东在当地开展同业竞争？',
          'zh-Hant': '股東協議是否可以有效限制退股股東在當地開展同業競爭？',
        },
        answer: {
          en: 'Yes. Well-drafted agreements incorporate enforceable restrictive covenants, including non-competition, non-solicitation, and confidentiality clauses. Under BC law, non-compete clauses must be reasonable in geographic scope, duration, and subject matter to protect legitimate corporate proprietary interests without violating public policy.',
          'zh-Hans': '可以有效限制。经过专业律师起草的协议会载入竞业禁止、客户与员工劝诱禁止及商业秘密保护条款。依卑诗省判例，针对退股股东的竞业限制必须在时间期限、地理区域及业务范围上具备商业合理性，以保护公司正当权益而不违反反垄断公共政策。',
          'zh-Hant': '可以有效限制。經過專業律師起草的協議會載入競業禁止、客戶與員工勸誘禁止及商業秘密保護條款。依卑詩省判例，針對退股股東的競業限制必須在時間期限、地理區域及業務範圍上具備商業合理性，以保護公司正當權益而不違反反壟斷公共政策。',
        },
      },
    ],
  },
  {
    slug: 'commercial-real-estate',
    category: 'conveyancing',
    title: {
      en: 'Commercial Real Estate Acquisitions, Financing & Development in BC',
      'zh-Hans': '卑诗省商业地产收购、融资与土地开发（标准合同 vs 深度尽调买卖协议）',
      'zh-Hant': '卑詩省商業地產收購、融資與土地開發（標準合同 vs 深度盡調買賣協議）',
    },
    metaTitle: {
      en: 'BC Commercial Real Estate Lawyers | Acquisitions, LOTR & Financing',
      'zh-Hans': '卑诗省商业地产买卖律师 | 土地开发、LOTR申报与商业贷款',
      'zh-Hant': '卑詩省商業地產買賣律師 | 土地開發、LOTR申報與商業貸款',
    },
    metaDescription: {
      en: 'Commercial real estate legal counsel in BC. Strategic guidance on property acquisitions, Land Title Office filings, LOTR transparency reports, environmental due diligence, and financing.',
      'zh-Hans': '卑诗省商业地产交易法律服务，专精写字楼、零售广场与工业用地收购、LTO土地产权登记、LOTR土地透明登记申报、环境尽职调查及商业抵押贷款交割。',
      'zh-Hant': '卑詩省商業地產交易法律服務，專精寫字樓、零售廣場與工業用地收購、LTO土地產權登記、LOTR土地透明登記申報、環境盡職調查及商業抵押貸款交割。',
    },
    heroDescription: {
      en: 'Structuring high-value commercial property purchases, institutional financing, Land Title registrations, and development projects across British Columbia.',
      'zh-Hans': '为商业物业买家、机构投资者及土地开发商提供全流程产权尽调、市政规划合规、银行商业抵押与法定税费统筹服务。',
      'zh-Hant': '為商業物業買家、機構投資者及土地開發商提供全流程產權盡調、市政規劃合規、銀行商業抵押與法定稅費統籌服務。',
    },
    directAnswer: {
      en: 'Commercial real estate transactions in British Columbia require specialized structuring under the Land Title Act and Land Owner Transparency Act. Legal counsel manages environmental investigations, municipal zoning due diligence, institutional financing, Land Title Office filings, and Property Transfer Tax planning, ensuring clear marketable title and statutory compliance.',
      'zh-Hans': '卑诗省商业房地产交易依据《土地所有权法》与《土地所有人透明度法》（LOTA）进行监管。法律团队负责环境污染尽职调查、市政规划区划审查、金融机构商业贷款抵押设立、卑诗土地所有权办公室（LTO）登记及土地所有权透明登记（LOTR）申报，确保产权清晰合规并优化财产转让税（PTT）。',
      'zh-Hant': '卑詩省商業房地產交易依據《土地所有權法》與《土地所有人透明度法》（LOTA）進行監管。法律團隊負責環境污染盡職調查、市政規劃區劃審查、金融機構商業貸款抵押設立、卑詩土地所有權辦公室（LTO）登記及土地所有人透明登記（LOTR）申報，確保產權清晰合規並優化財產轉讓稅（PTT）。',
    },
    statutoryFramework: {
      en: [
        'Land Title Act [RSBC 1996] c. 250',
        'Land Owner Transparency Act (LOTA) [SBC 2019] c. 23',
        'Property Transfer Tax Act [RSBC 1996] c. 378',
        'Environmental Management Act [SBC 2003] c. 53',
      ],
      'zh-Hans': [
        '卑诗省土地所有权法（Land Title Act）[RSBC 1996] c. 250',
        '土地所有人透明度法（Land Owner Transparency Act - LOTA）[SBC 2019] c. 23',
        '卑诗省财产转让税法（Property Transfer Tax Act）[RSBC 1996] c. 378',
        '卑诗省环境管理法（Environmental Management Act）[SBC 2003] c. 53',
      ],
      'zh-Hant': [
        '卑詩省土地所有權法（Land Title Act）[RSBC 1996] c. 250',
        '土地所有人透明度法（Land Owner Transparency Act - LOTA）[SBC 2019] c. 23',
        '卑詩省財產轉讓稅法（Property Transfer Tax Act）[RSBC 1996] c. 378',
        '卑詩省環境管理法（Environmental Management Act）[SBC 2003] c. 53',
      ],
    },
    keyProcedures: {
      en: [
        {
          title: 'Title Due Diligence & Encumbrance Review',
          desc: 'Examining registered charges, restrictive covenants, statutory rights-of-way, easements, and municipal development agreements at the Land Title Office.',
        },
        {
          title: 'Environmental Audits & Phase 1/2 Assessments',
          desc: 'Assessing historical commercial contamination risks and remediation liabilities under the BC Environmental Management Act.',
        },
        {
          title: 'LOTR Transparency Declarations & Reports',
          desc: 'Complying with mandatory beneficial ownership disclosure under LOTA for corporate buyers and nominee holding entities.',
        },
        {
          title: 'Commercial Lending & LTO Electronic Registration',
          desc: 'Drafting mortgage security instruments, general assignments of rents, personal guarantees, and coordinating electronic Land Title Office closing filings.',
        },
      ],
      'zh-Hans': [
        {
          title: '土地所有权产权尽调与负担查验',
          desc: '在卑诗土地所有权办公室调取地契，深入核实通行权、法定地役权、建筑限制性公约及市政开发协议。',
        },
        {
          title: '环境污染评估与第1/2阶段场地审查',
          desc: '针对加油站、工业厂房或干洗店等商业物业排查历史污染，规避《环境管理法》下的连带清理修复巨额法律责任。',
        },
        {
          title: 'LOTR土地透明登记申报与报告提交',
          desc: '严格执行《土地所有人透明度法》（LOTA）强制规定，穿透查验并向卑诗省官方申报公司买家的实际控股自然人。',
        },
        {
          title: '商业贷款抵押设立与LTO电子登记交割',
          desc: '草拟商业贷款抵押文书、租金收益转让协议，并在交割日通过卑诗LTO电子系统完成产权与按揭过户。',
        },
      ],
      'zh-Hant': [
        {
          title: '土地所有權產權盡調與負擔查驗',
          desc: '在卑詩土地所有權辦公室調取地契，深入核實通行權、法定地役權、建築限制性公約及市政開發協議。',
        },
        {
          title: '環境污染評估與第1/2階段場地審查',
          desc: '針對加油站、工業廠房或乾洗店等商業物業排查歷史污染，規避《環境管理法》下的連帶清理修復巨額法律責任。',
        },
        {
          title: 'LOTR土地透明登記申報與報告提交',
          desc: '嚴格執行《土地所有人透明度法》（LOTA）強制規定，穿透查驗並向卑詩省官方申報公司買家的實際控股自然人。',
        },
        {
          title: '商業貸款抵押設立與LTO電子登記交割',
          desc: '草擬商業貸款抵押文書、租金收益轉讓協議，並在交割日透過卑詩LTO電子系統完成產權與按揭過戶。',
        },
      ],
    },
    comparisonTable: {
      title: {
        en: 'Standard BC Real Estate Contract vs. Commercial Purchase Agreement with Custom Warranties',
        'zh-Hans': '卑诗标准地产买卖合同与定制商业地产深度尽调协议机制对比',
        'zh-Hant': '卑詩標準地產買賣合同與定制商業地產深度盡調協議機制對比',
      },
      headers: {
        en: ['Key Dimension', 'Standard BC Real Estate Board Contract', 'Custom Commercial Purchase Agreement'],
        'zh-Hans': ['核心对比维度', '卑诗地产局标准格式合同', '深度定制商业买卖协议（SPA）'],
        'zh-Hant': ['核心對比維度', '卑詩地產局標準格式合同', '深度定制商業買賣協議（SPA）'],
      },
      rows: [
        {
          dimension: {
            en: 'Due Diligence Timeframe',
            'zh-Hans': '尽职调查周期与权限',
            'zh-Hant': '盡職調查週期與權限',
          },
          optionA: {
            en: '7 to 14 days focused primarily on standard mortgage financing and basic title search review.',
            'zh-Hans': '通常仅有7至14天，仅能满足常规房屋贷款审批及最基础的产权无抵押检索。',
            'zh-Hant': '通常僅有7至14天，僅能滿足常規房屋貸款審批及最基礎的產權無抵押檢索。',
          },
          optionB: {
            en: '30 to 90 days for Phase 1/2 environmental audits, geotechnical drilling, zoning compliance, and lease audits.',
            'zh-Hans': '长达30至90天，包含一/二期环境评估、地质勘探、市政规划合规审查及现有商业租约逐项审计。',
            'zh-Hant': '長達30至90天，包含一/二期環境評估、地質勘探、市政規劃合規審查及現有商業租約逐項審計。',
          },
        },
        {
          dimension: {
            en: 'Environmental Representations',
            'zh-Hans': '环境污染与地下油罐陈述保证',
            'zh-Hant': '環境污染與地下油罐陳述保證',
          },
          optionA: {
            en: 'Property is sold "as-is, where-is" with minimal seller warranties regarding historic contamination.',
            'zh-Hans': '依“现状交付”原则出售，卖方极少提供关于地下油罐或历史危险化学品污染的陈述担保。',
            'zh-Hant': '依「現狀交付」原則出售，賣方極少提供關於地下油罐或歷史危險化學品污染的陳述擔保。',
          },
          optionB: {
            en: 'Specific seller representations, warranties, and post-closing indemnities regarding environmental liabilities.',
            'zh-Hans': '卖方须签署专项陈述保证与交割后赔偿承诺，明确免除买方对过往一切历史环境污染的法律责任。',
            'zh-Hant': '賣方須簽署專項陳述保證與交割後賠償承諾，明確免除買方對過往一切歷史環境污染的法律責任。',
          },
        },
        {
          dimension: {
            en: 'Municipal Zoning & Permits',
            'zh-Hans': '市政规划区划与开发许可配合',
            'zh-Hant': '市政規劃區劃與開發許可配合',
          },
          optionA: {
            en: 'Buyer bears all zoning risks; no obligation for seller to assist with development authorizations.',
            'zh-Hans': '买方自行承担区划风险，卖方无任何法律义务协助买方申请改建许可或提交再分区申请。',
            'zh-Hant': '買方自行承擔區劃風險，賣方無任何法律義務協助買方申請改建許可或提交再分區申請。',
          },
          optionB: {
            en: 'Requires seller to execute municipal authorizations, sign rezoning submissions, and provide permits.',
            'zh-Hans': '明确要求卖方在交割前签署授权委托书，无条件配合买方向市政府推进再分区或建筑许可流程。',
            'zh-Hant': '明確要求賣方在交割前簽署授權委託書，無條件配合買方向市政府推進再分區或建築許可流程。',
          },
        },
        {
          dimension: {
            en: 'Existing Tenant Estoppels',
            'zh-Hans': '在租商户租约与无违约确认',
            'zh-Hant': '在租商戶租約與無違約確認',
          },
          optionA: {
            en: 'Basic rent apportionment on statement of adjustments without mandatory tenant estoppel delivery.',
            'zh-Hans': '仅在交割调整表上按天结算租金，交割前无须租客出具正式法律确认函。',
            'zh-Hant': '僅在交割調整表上按天結算租金，交割前無須租客出具正式法律確認函。',
          },
          optionB: {
            en: 'Mandatory delivery of signed Tenant Estoppel Certificates verifying rents, deposits, and absence of landlord breach.',
            'zh-Hans': '强制要求全体商业租客在交割前签署并交付租客承诺确认书（Estoppel），锁定无欠租与无违约状态。',
            'zh-Hant': '強制要求全體商業租客在交割前簽署並交付租客承諾確認書（Estoppel），鎖定無欠租與無違約狀態。',
          },
        },
      ],
    },
    faqs: [
      {
        question: {
          en: 'What is the Land Owner Transparency Registry (LOTR) requirement in BC?',
          'zh-Hans': '卑诗省买卖物业时，土地所有人透明登记（LOTR）申报有何法律要求？',
          'zh-Hant': '卑詩省買賣物業時，土地所有人透明登記（LOTR）申報有何法律要求？',
        },
        answer: {
          en: 'Under the Land Owner Transparency Act (LOTA), whenever an interest in BC real property is registered in the Land Title Office, the buyer must file a Transparency Declaration. If the buyer is a "relevant corporation," it must also file a Transparency Report disclosing "reporting individuals" who hold 25% or more of voting shares or economic interest.',
          'zh-Hans': '依据卑诗省《土地所有人透明度法》（LOTA），在土地所有权办公室登记任何产权转让时，买方必须提交透明度声明。若买家为公司实体或合伙企业，必须同时提交透明度报告，穿透披露持有公司25%以上股份、投票权或实际经济收益的自然人信息。',
          'zh-Hant': '依據卑詩省《土地所有人透明度法》（LOTA），在土地所有權辦公室登記任何產權轉讓時，買方必須提交透明度聲明。若買家為公司實體或合夥企業，必須同時提交透明度報告，穿透披露持有公司25%以上股份、投票權或實際經濟收益的自然人信息。',
        },
      },
      {
        question: {
          en: 'How does Property Transfer Tax (PTT) apply to commercial real estate in BC?',
          'zh-Hans': '卑诗省商业房地产交易如何计算财产转让税（Property Transfer Tax / PTT）？',
          'zh-Hant': '卑詩省商業房地產交易如何計算財產轉讓稅（Property Transfer Tax / PTT）？',
        },
        answer: {
          en: 'British Columbia levies Property Transfer Tax (PTT) on commercial property transfers registered with the Land Title Office at 1% on the first $200,000, 2% on the portion between $200,000 and $2,000,000, and 3% on amounts exceeding $2,000,000. Structuring acquisitions through corporate holding entities can optimize long-term transfer tax liabilities.',
          'zh-Hans': '商业地产在土地所有权办公室过户时须缴纳财产转让税：前20万按1%征收，20万至200万部分按2%征收，超过200万以上部分按3%征收。境外商业买家无需缴纳海外买家附加税。通过控股公司架构持有并在未来进行股权交易可合法规避PTT。',
          'zh-Hant': '商業地產在土地所有權辦公室過戶時須繳納財產轉讓稅：前20萬按1%徵收，20萬至200萬部分按2%徵收，超過200萬以上部分按3%徵收。境外商業買家無需繳納海外買家附加稅。透過控股公司架構持有並在未來進行股權交易可合法規避PTT。',
        },
      },
      {
        question: {
          en: 'Why are Phase 1 and Phase 2 Environmental Site Assessments critical?',
          'zh-Hans': '商业地产收购中，一期与二期场地环境评估（ESA）为何至关重要？',
          'zh-Hant': '商業地產收購中，一期與二期場地環境評估（ESA）為何至關重要？',
        },
        answer: {
          en: 'Under the BC Environmental Management Act, current and prior owners face joint and absolute retroactive liability for environmental contamination on commercial land. A Phase 1 assessment reviews historical land usage. If contamination indicators exist, an intrusive Phase 2 soil/groundwater investigation is necessary before removing purchase conditions.',
          'zh-Hans': '依据卑诗省《环境管理法》，土地现业主与历史业主对土地历史污染承担追溯性的严格连带清理责任。一期环境评估审查历史用地记录；一旦发现潜在污染迹象，必须进行二期土壤及地下水钻孔采样检测，避免买方背负数百万元的环境清理连带账单。',
          'zh-Hant': '依據卑詩省《環境管理法》，土地現業主與歷史業主對土地歷史污染承擔追溯性的嚴格連帶清理責任。一期環境評估審查歷史用地記錄；一旦發現潛在污染跡象，必須進行二期土壤及地下水鑽孔採樣檢測，避免買方背負數百萬元的環境清理連帶賬單。',
        },
      },
      {
        question: {
          en: 'What is a Tenant Estoppel Certificate in commercial acquisitions?',
          'zh-Hans': '商业地产收购中的租客保证确认书（Tenant Estoppel Certificate）起何作用？',
          'zh-Hant': '商業地產收購中的租客保證確認書（Tenant Estoppel Certificate）起何作用？',
        },
        answer: {
          en: 'A Tenant Estoppel Certificate is a legally binding statement signed by an existing commercial tenant confirming the current lease terms, monthly base and additional rent, prepaid deposits, renewal options, and that the landlord is not in contractual default. It protects buyers against hidden tenant rent disputes.',
          'zh-Hans': '租客保证确认书是由在租商户签署的具有法律约束力的声明文件，用以向买方确认租约真实版本、当前月租金与押金数额、租约到期日与续租权，并确认原房东目前不存在任何违约行为。该文件防止买方交割后遭遇隐蔽的租客欠租索赔或纠纷。',
          'zh-Hant': '租客保證確認書是由在租商戶簽署的具有法律約束力的聲明文件，用以向買方確認租約真實版本、當前月租金與押金數額、租約到期日與續租權，並確認原房東目前不存在任何違約行為。該文件防止買方交割後遭遇隱蔽的租客欠租索賠或糾紛。',
        },
      },
    ],
  },
  {
    slug: 'shareholder-commercial-disputes',
    category: 'litigation',
    title: {
      en: 'Shareholder, Partnership & Contract Litigation in BC Supreme Court',
      'zh-Hans': '卑诗省股东纠纷、合伙人争议与商事合同诉讼（压制救济 vs 派生诉讼）',
      'zh-Hant': '卑詩省股東糾紛、合夥人爭議與商事合同訴訟（壓制救濟 vs 派生訴訟）',
    },
    metaTitle: {
      en: 'BC Shareholder Dispute & Commercial Litigation Lawyers | Supreme Court',
      'zh-Hans': '卑诗省股东纠纷与商业诉讼律师 | 卑诗最高法院压制救济',
      'zh-Hant': '卑詩省股東糾紛與商業訴訟律師 | 卑詩最高法院壓制救濟',
    },
    metaDescription: {
      en: 'Skilled trial counsel for shareholder disputes, partnership breakups, and contract breaches before the Supreme Court of British Columbia under the Business Corporations Act.',
      'zh-Hans': '卑诗省最高法院商业诉讼大律师，代理股东压制救济诉讼、公司派生诉讼、合伙人决裂清算、商业合同违约及紧急财产冻结禁制令。',
      'zh-Hant': '卑詩省最高法院商業訴訟大律師，代理股東壓制救濟訴訟、公司派生訴訟、合夥人決裂清算、商業合同違約及緊急財產凍結禁制令。',
    },
    heroDescription: {
      en: 'Rigorous advocacy in high-stakes corporate disputes, oppression remedies, partnership disputes, and breach of commercial contracts across British Columbia.',
      'zh-Hans': '在卑诗省各级法院为当事人代理重大商事诉讼，追回被侵占资产并申请司法强制估值回购。',
      'zh-Hant': '在卑詩省各級法院為當事人代理重大商事訴訟，追回被侵佔資產並申請司法強制估值回購。',
    },
    directAnswer: {
      en: 'Commercial and shareholder litigation in British Columbia is litigated before the Supreme Court of British Columbia under the Supreme Court Civil Rules and the Business Corporations Act. Counsel utilizes statutory oppression remedies, interim injunctions, Norwich orders, and court-supervised buyout mechanisms to protect business assets and enforce partner agreements.',
      'zh-Hans': '卑诗省商事合同与股东争议由卑诗省最高法院（BC Supreme Court）依据《民事诉讼规则》与《卑诗省商业公司法》审理。诉讼律师运用压制救济（Oppression Remedy）、派生诉讼、禁制令（Injunction）、诺威治命令（Norwich Order）及法院强制股份估值买断程序，捍卫当事人商业权益并追回资产损失。',
      'zh-Hant': '卑詩省商事合同與股東爭議由卑詩省最高法院（BC Supreme Court）依據《民事訴訟規則》與《卑詩省商業公司法》審理。訴訟律師運用壓制救濟（Oppression Remedy）、派生訴訟、禁制令（Injunction）、諾威治命令（Norwich Order）及法院強制股份估值買斷程序，捍衛當事人商業權益並追回資產損失。',
    },
    statutoryFramework: {
      en: [
        'BC Business Corporations Act [SBC 2002] c. 57 (ss. 227 & 232)',
        'Supreme Court Civil Rules (BC Reg. 168/2009)',
        'Partnership Act [RSBC 1996] c. 348',
        'Limitation Act [SBC 2012] c. 13',
      ],
      'zh-Hans': [
        '卑诗省商业公司法（BC Business Corporations Act）第227条（压制救济）及第232条（派生诉讼）',
        '卑诗省最高法院民事诉讼规则（Supreme Court Civil Rules）BC Reg. 168/2009',
        '卑诗省合伙法（Partnership Act）[RSBC 1996] c. 348',
        '卑诗省诉讼时效法（Limitation Act）[SBC 2012] c. 13',
      ],
      'zh-Hant': [
        '卑詩省商業公司法（BC Business Corporations Act）第227條（壓制救濟）及第232條（派生訴訟）',
        '卑詩省最高法院民事訴訟規則（Supreme Court Civil Rules）BC Reg. 168/2009',
        '卑詩省合夥法（Partnership Act）[RSBC 1996] c. 348',
        '卑詩省訴訟時效法（Limitation Act）[SBC 2012] c. 13',
      ],
    },
    keyProcedures: {
      en: [
        {
          title: 'Emergency Injunctions & Mareva Freezing Orders',
          desc: 'Urgent applications to the BC Supreme Court to freeze disputed bank accounts and restrain directors from dissipating corporate assets.',
        },
        {
          title: 'Oppression Remedy Applications (Section 227)',
          desc: 'Litigating claims where minority shareholders face unfair prejudice, exclusion from management, or unlawful dilution of shares.',
        },
        {
          title: 'Court-Ordered Financial Accounting & Records Inspection',
          desc: 'Compelling recalcitrant directors to produce hidden accounting ledgers, bank transactions, and corporate minutes under court supervision.',
        },
        {
          title: 'Judicial Fair Value Share Buyouts & Receiverships',
          desc: 'Obtaining court orders compelling majority shareholders to purchase equity at full fair value without minority discounts.',
        },
      ],
      'zh-Hans': [
        {
          title: '紧急禁制令与Mareva财产冻结命令',
          desc: '向卑诗省最高法院紧急申请单方禁制令，依法冻结涉案公司银行账户，制止个别股东非法隐匿或转移公款。',
        },
        {
          title: '压制救济诉讼（商业公司法第227条）',
          desc: '为遭遇控股股东恶意边缘化、剥夺分红权或恶意稀释股份的小股东提起诉讼，维护其合法合理商业预期。',
        },
        {
          title: '司法审计与强制账册查阅清查',
          desc: '依据公司法与诉讼程序规则，强制违规董事交出隐匿财务账目、资金流水记录并接受出庭宣誓盘问。',
        },
        {
          title: '法院强制公允价值回购与接管清盘',
          desc: '聘请注册估值专家（CBV）出具鉴定报告，推动法官裁定加害方按不打折的“公允价值”全资回购受害者股权。',
        },
      ],
      'zh-Hant': [
        {
          title: '緊急禁制令與Mareva財產凍結命令',
          desc: '向卑詩省最高法院緊急申請單方禁制令，依法凍結涉案公司銀行賬戶，制止個別股東非法隱匿或轉移公款。',
        },
        {
          title: '壓制救濟訴訟（商業公司法第227條）',
          desc: '為遭遇控股股東惡意邊緣化、剝奪分紅權或惡意稀釋股份的小股東提起訴訟，維護其合法合理商業預期。',
        },
        {
          title: '司法審計與強制賬冊查閱清查',
          desc: '依據公司法與訴訟程序規則，強制違規董事交出隱匿財務賬目、資金流水記錄並接受出庭宣誓盤問。',
        },
        {
          title: '法院強制公允價值回購與接管清盤',
          desc: '聘請註冊估值專家（CBV）出具鑑定報告，推動法官裁定加害方按不打折的「公允價值」全資回購受害者股權。',
        },
      ],
    },
    comparisonTable: {
      title: {
        en: 'Oppression Remedy (BC BCA s. 227) vs. Derivative Action (BC BCA s. 232)',
        'zh-Hans': '卑诗股东压制救济诉讼（s. 227）与公司派生诉讼（s. 232）机制对比',
        'zh-Hant': '卑詩股東壓制救濟訴訟（s. 227）與公司派生訴訟（s. 232）機制對比',
      },
      headers: {
        en: ['Key Dimension', 'Oppression Remedy (BC BCA s. 227)', 'Derivative Action (BC BCA s. 232)'],
        'zh-Hans': ['核心对比维度', '股东压制救济（BC BCA s. 227）', '公司派生诉讼（BC BCA s. 232）'],
        'zh-Hant': ['核心對比維度', '股東壓制救濟（BC BCA s. 227）', '公司派生訴訟（BC BCA s. 232）'],
      },
      rows: [
        {
          dimension: {
            en: 'Nature of Aggrieved Party',
            'zh-Hans': '受害方主体性质',
            'zh-Hant': '受害方主體性質',
          },
          optionA: {
            en: 'Brought by a shareholder personally aggrieved by oppressive, unfairly prejudicial conduct directed toward them.',
            'zh-Hans': '由权益受到侵害的股东以个人名义直接发起，针对损害其自身合理预期与个人利益的行为。',
            'zh-Hant': '由權益受到侵害的股東以個人名義直接發起，針對損害其自身合理預期與個人利益的行為。',
          },
          optionB: {
            en: 'Brought on behalf of the company itself for wrongs committed directly against the corporate entity.',
            'zh-Hans': '由股东代表公司向违规董事或第三方提起诉讼，追究侵占公司资产或损害公司整体利益的行为。',
            'zh-Hant': '由股東代表公司向違規董事或第三方提起訴訟，追究侵佔公司資產或損害公司整體利益的行為。',
          },
        },
        {
          dimension: {
            en: 'Pre-Action Leave of Court',
            'zh-Hans': '起诉前置法院许可程序',
            'zh-Hant': '起訴前置法院許可程序',
          },
          optionA: {
            en: 'No preliminary leave required; proceedings are initiated directly by Notice of Civil Claim or Petition.',
            'zh-Hans': '无需法院事先准许，原告可直接向卑诗最高法院递交民事民事诉状（Notice of Civil Claim）立案。',
            'zh-Hant': '無需法院事先准許，原告可直接向卑詩最高法院遞交民事民事訴狀（Notice of Civil Claim）立案。',
          },
          optionB: {
            en: 'Requires preliminary court leave under section 232 demonstrating good faith and company benefit.',
            'zh-Hans': '必须先行依据第232条向法院申请起诉许可（Leave），证明起诉符合公司最佳利益且出于善意。',
            'zh-Hant': '必須先行依據第232條向法院申請起訴許可（Leave），證明起訴符合公司最佳利益且出於善意。',
          },
        },
        {
          dimension: {
            en: 'Direct Financial Recovery',
            'zh-Hans': '判决赔偿金归属',
            'zh-Hant': '判決賠償金歸屬',
          },
          optionA: {
            en: 'Court can order financial compensation or mandatory share buyouts paid directly to the plaintiff shareholder.',
            'zh-Hans': '法院可判决加害方以公允价值直接回购原告股东的股份，或直接向受害股东个人支付巨额损害赔偿金。',
            'zh-Hant': '法院可判決加害方以公允價值直接回購原告股東的股份，或直接向受害股東個人支付巨額損害賠償金。',
          },
          optionB: {
            en: 'Any damages or restitution ordered by the court are paid directly into the corporate treasury, not to the shareholder.',
            'zh-Hans': '法院判决追回的所有被侵占款项与违约赔偿金全额归还至公司账户，不能直接入个人腰包。',
            'zh-Hant': '法院判決追回的所有被侵佔款項與違約賠償金全額歸還至公司賬戶，不能直接入個人腰包。',
          },
        },
        {
          dimension: {
            en: 'Legal Costs & Funding Orders',
            'zh-Hans': '诉讼费用承担与资金资助命令',
            'zh-Hant': '訴訟費用承擔與資金資助命令',
          },
          optionA: {
            en: 'Plaintiff shareholder carries their own litigation costs risk until successful trial costs adjudication.',
            'zh-Hans': '原告股东个人先行承担自身诉讼开支，胜诉后由法官依据民事规则判令败诉方承担法定诉讼费。',
            'zh-Hant': '原告股東個人先行承擔自身訴訟開支，勝訴後由法官依據民事規則判令敗訴方承擔法定訴訟費。',
          },
          optionB: {
            en: 'Court has statutory authority under section 232 to order the company to fund or advance plaintiff legal costs.',
            'zh-Hans': '卑诗最高法院有法定权力直接命令公司承担甚至预先垫付原告股东打官司所产生的律师费。',
            'zh-Hant': '卑詩最高法院有法定權力直接命令公司承擔甚至預先墊付原告股東打官司所產生的律師費。',
          },
        },
      ],
    },
    faqs: [
      {
        question: {
          en: 'What constitutes "oppression" under section 227 of the BC Business Corporations Act?',
          'zh-Hans': '卑诗省商业公司法第227条所指的“股东压制”（Oppression）包含哪些具体情形？',
          'zh-Hant': '卑詩省商業公司法第227條所指的「股東壓制」（Oppression）包含哪些具體情形？',
        },
        answer: {
          en: 'Conduct is oppressive or unfairly prejudicial when majority shareholders or directors act in a manner that defeats the reasonable expectations of a shareholder. Examples include excluding a founding partner from management, withholding declared dividends while awarding inflated executive bonuses, or diluting equity to force out minority investors.',
          'zh-Hans': '当大股东或董事的行为违反诚实信用原则并挫败股东合理的商业预期时，即构成法定压制。典型情形包括：无正当理由将合伙创始人排挤出管理层、恶意拒绝派发合理股息却为自己发放高额薪酬、隐匿公司账目或通过不正当增资恶意稀释小股东股权。',
          'zh-Hant': '當大股東或董事的行為違反誠實信用原則並挫敗股東合理的商業預期時，即構成法定壓制。典型情形包括：無正當理由將合夥創始人排擠出管理層、惡意拒絕派發合理股息卻為自己發放高額薪酬、隱匿公司賬目或透過不正當增資惡意稀釋小股東股權。',
        },
      },
      {
        question: {
          en: 'What is an interim injunction in BC commercial litigation?',
          'zh-Hans': '在卑诗省商事诉讼中，什么是紧急临时禁制令（Interim Injunction）？',
          'zh-Hant': '在卑詩省商事訴訟中，什麼是緊急臨時禁制令（Interim Injunction）？',
        },
        answer: {
          en: 'An interim injunction is an urgent order issued by the BC Supreme Court restraining a defendant from taking harmful actions before trial—such as draining bank accounts, dissipating corporate assets, or soliciting clients in breach of a restrictive covenant. Claimants must prove irreparable harm and a strong prima facie case.',
          'zh-Hans': '临时禁制令是卑诗省最高法院在案件开庭审理前签发的紧急司法禁令，强制禁止被告从事转移财产、毁灭关键证据、变卖核心专利或招揽原公司客户等不可逆转的有害行为。申请人须向法官确凿证明若不及早制止，原告将蒙受无法用金钱弥补的“不可挽回之损失”。',
          'zh-Hant': '臨時禁制令是卑詩省最高法院在案件開庭審理前簽發的緊急司法禁令，強制禁止被告從事轉移財產、毀滅關鍵證據、變賣核心專利或招攬原公司客戶等不可逆轉的有害行為。申請人須向法官確鑿證明若不及早制止，原告將蒙受無法用金錢彌補的「不可挽回之損失」。',
        },
      },
      {
        question: {
          en: 'How does the BC Supreme Court determine fair value in a forced share buyout?',
          'zh-Hans': '在强制买断股份诉讼中，卑诗最高法院如何裁定股份的“公允价值”（Fair Value）？',
          'zh-Hant': '在強制買斷股份訴訟中，卑詩最高法院如何裁定股份的「公允價值」（Fair Value）？',
        },
        answer: {
          en: 'When ordering a share buyout under section 227, the court determines "fair value" rather than discounted market value. Courts typically rely on expert chartered business valuator (CBV) evidence and will usually eliminate minority discounts if the claimant was unfairly forced out of a quasi-partnership business.',
          'zh-Hans': '依据第227条裁定股权回购时，法院确定的是“公允价值”而非一般市场流通折价。法庭主要参考独立注册商业估值师（CBV）出具的专家报告。对于类合伙制的私人企业，若小股东无辜遭受压制排挤，法院通常坚决剔除“少数股权折价”及“非流动性折价”，全额保护原告利益。',
          'zh-Hant': '依據第227條裁定股權回購時，法院確定的是「公允價值」而非一般市場流通折價。法庭主要參考獨立註冊商業估值師（CBV）出具的專家報告。對於類合夥制的私人企業，若小股東無辜遭受壓制排擠，法院通常堅決剔除「少數股權折價」及「非流動性折價」，全額保護原告利益。',
        },
      },
      {
        question: {
          en: 'What are the limitation periods for filing a commercial lawsuit in BC?',
          'zh-Hans': '在卑诗省提起商业违约或股东索赔诉讼，法定诉讼时效期限是多久？',
          'zh-Hant': '在卑詩省提起商業違約或股東索賠訴訟，法定訴訟時效期限是多久？',
        },
        answer: {
          en: 'Under the Limitation Act [SBC 2012] c. 13, the basic limitation period is two years from the date the claim is discovered (when the claimant knew or reasonably ought to have known of the injury, loss, or contract breach). Commercial claims must be filed within this window.',
          'zh-Hans': '依据卑诗省《诉讼时效法》（Limitation Act），商事诉讼的基本诉讼时效为两年，自原告知道或理应知道遭受侵权损失或合同违约之日（起算发现日）起计算。超过两年未向法院立案起诉的，将丧失法定诉权。',
          'zh-Hant': '依據卑詩省《訴訟時效法》（Limitation Act），商事訴訟的基本訴訟時效為兩年，自原告知道或理應知道遭受侵權損失或合同違約之日（起算發現日）起計算。超過兩年未向法院立案起訴的，將喪失法定訴權。',
        },
      },
    ],
  },
  {
    slug: 'wills-probate-estate-planning',
    category: 'wills',
    title: {
      en: 'BC Wills, Probate Administration & Estate Planning under WESA',
      'zh-Hans': '卑诗省遗嘱信托、遗产认证与财富传承规划（遗嘱认证 vs 生前信托）',
      'zh-Hant': '卑詩省遺囑信託、遺產認證與財富傳承規劃（遺囑認證 vs 生前信託）',
    },
    metaTitle: {
      en: 'BC Wills & Estate Planning Lawyers | Probate, Trusts & POA under WESA',
      'zh-Hans': '卑诗省遗嘱与遗产信托律师 | WESA遗产认证、授权书与财富规划',
      'zh-Hant': '卑詩省遺囑與遺產信託律師 | WESA遺產認證、授權書與財富規劃',
    },
    metaDescription: {
      en: 'Comprehensive estate planning and probate legal services in BC under WESA. Expert drafting of Wills, Enduring Powers of Attorney, Representation Agreements, Alter Ego Trusts, and Grants of Probate.',
      'zh-Hans': '卑诗省遗嘱与遗产法律服务，依据WESA法案专精法定遗嘱、持久授权书（POA）、医疗代表协议、生前独享信托（Alter Ego Trust）及卑诗最高法院遗嘱认证（Grant of Probate）。',
      'zh-Hant': '卑詩省遺囑與遺產法律服務，依據WESA法案專精法定遺囑、持久授權書（POA）、醫療代表協議、生前獨享信託（Alter Ego Trust）及卑詩最高法院遺囑認證（Grant of Probate）。',
    },
    heroDescription: {
      en: 'Guiding BC families and business owners through tax-efficient succession, personal capacity documentation, probate administration, and trust structuring under WESA.',
      'zh-Hans': '依据卑诗省《遗嘱、遗产及继承法》（WESA），为各界家庭与企业主构建合法合规、高效省税的财富保障与资产传承规划。',
      'zh-Hant': '依據卑詩省《遺囑、遺產及繼承法》（WESA），為各界家庭與企業主構建合法合規、高效省稅的財富保障與資產傳承規劃。',
    },
    directAnswer: {
      en: 'Estate planning and probate administration in British Columbia are governed by the Wills, Estates and Succession Act (WESA). The process encompasses drafting wills, enduring powers of attorney, personal representation agreements, establishing inter vivos trusts, submitting Grant of Probate applications to the BC Supreme Court, and managing estate distribution.',
      'zh-Hans': '卑诗省遗嘱信托、遗产规划与认证程序受《遗嘱、遗产及继承法》（WESA）管辖。法律服务涵盖起草法定遗嘱、持久授权书（Power of Attorney）、医疗代表协议（Representation Agreement）、设立生前信托（Alter Ego Trust）、向卑诗最高法院申请遗嘱认证证书（Grant of Probate）及遗产执行清算。',
      'zh-Hant': '卑詩省遺囑信託、遺產規劃與認證程序受《遺囑、遺產及繼承法》（WESA）管轄。法律服務涵蓋起草法定遺囑、持久授權書（Power of Attorney）、醫療代表協議（Representation Agreement）、設立生前信托（Alter Ego Trust）、向卑詩最高法院申請遺囑認證證書（Grant of Probate）及遺產執行清算。',
    },
    statutoryFramework: {
      en: [
        'Wills, Estates and Succession Act (WESA) [SBC 2009] c. 13',
        'Probate Fee Act [RSBC 1999] c. 4',
        'Power of Attorney Act [RSBC 1996] c. 370',
        'Representation Agreement Act [RSBC 1996] c. 405',
      ],
      'zh-Hans': [
        '卑诗省遗嘱、遗产及继承法（WESA）[SBC 2009] c. 13',
        '卑诗省遗产认证费法案（Probate Fee Act）[RSBC 1999] c. 4',
        '卑诗省授权书法（Power of Attorney Act）[RSBC 1996] c. 370',
        '卑诗省医疗代表协议法（Representation Agreement Act）[RSBC 1996] c. 405',
      ],
      'zh-Hant': [
        '卑詩省遺囑、遺產及繼承法（WESA）[SBC 2009] c. 13',
        '卑詩省遺產認證費法案（Probate Fee Act）[RSBC 1999] c. 4',
        '卑詩省授權書法（Power of Attorney Act）[RSBC 1996] c. 370',
        '卑詩省醫療代表協議法（Representation Agreement Act）[RSBC 1996] c. 405',
      ],
    },
    keyProcedures: {
      en: [
        {
          title: 'Comprehensive Will & Testament Drafting',
          desc: 'Formulating legal distribution of real property, corporate shares, personal effects, and appointing reliable executors and legal guardians for minors.',
        },
        {
          title: 'Enduring Power of Attorney & Representation Agreements',
          desc: 'Executing lifetime personal capacity instruments granting legal authority for financial management and healthcare decisions under BC statutes.',
        },
        {
          title: 'Inter Vivos & Alter Ego Trust Structuring',
          desc: 'Establishing rollover-eligible trusts for clients aged 65+ to legitimately bypass probate taxes and maintain complete succession confidentiality.',
        },
        {
          title: 'BC Supreme Court Grant of Probate Applications',
          desc: 'Preparing official P1 to P10 probate notices, affidavit verifications, asset valuations, and resolving beneficiary clearances.',
        },
      ],
      'zh-Hans': [
        {
          title: '全面法定遗嘱起草与受托人设立',
          desc: '规范不动产、公司股权与金融资产的传承分配方案，设立未成年子女法定监护人及指定执行人。',
        },
        {
          title: '持久授权书（POA）与医疗代表协议（RA9）',
          desc: '签署应对突发失能情况的法律文件，授权指定代表合法管理财务银行账目及作出法定医疗护理决断。',
        },
        {
          title: '生前独享信托（Alter Ego Trust）避税避债规划',
          desc: '为65岁以上长者量身架构生前信托，资产免除遗嘱认证程序、省下1.4%认证费并严格保障家族资产隐秘。',
        },
        {
          title: '卑诗省最高法院遗嘱认证（Grant of Probate）',
          desc: '准备P1至P10法定认证申请文书、宣誓资产清单、完成全体法定继承人公示送达并申领法庭认证执行令。',
        },
      ],
      'zh-Hant': [
        {
          title: '全面法定遺囑起草與受託人設立',
          desc: '規範不動產、公司股權與金融資產的傳承分配方案，設立未成年子女法定監護人及指定執行人。',
        },
        {
          title: '持久授權書（POA）與醫療代表協議（RA9）',
          desc: '簽署應對突發失能情況的法律文件，授權指定代表合法管理財務銀行賬目及作出法定醫療護理決斷。',
        },
        {
          title: '生前獨享信託（Alter Ego Trust）避稅避債規劃',
          desc: '為65歲以上長者量身架構生前信託，資產免除遺囑認證程序、省下1.4%認證費並嚴格保障家族資產隱秘。',
        },
        {
          title: '卑詩省最高法院遺囑認證（Grant of Probate）',
          desc: '準備P1至P10法定認證申請文書、宣誓資產清單、完成全體法定繼承人公示送達並申領法庭認證執行令。',
        },
      ],
    },
    comparisonTable: {
      title: {
        en: 'Probated Estate (WESA Grant of Probate) vs. Inter Vivos / Alter Ego Trust Transfer',
        'zh-Hans': '卑诗省遗嘱法院认证与生前信托（Alter Ego Trust）机制对比',
        'zh-Hant': '卑詩省遺囑法院認證與生前信託（Alter Ego Trust）機制對比',
      },
      headers: {
        en: ['Key Dimension', 'Probated Estate (Will & Court Grant)', 'Inter Vivos / Alter Ego Trust'],
        'zh-Hans': ['核心对比维度', '常规遗嘱与法院认证程序', '生前信托 / 独享信托（Alter Ego Trust）'],
        'zh-Hant': ['核心對比維度', '常規遺囑與法院認證程序', '生前信託 / 獨享信託（Alter Ego Trust）'],
      },
      rows: [
        {
          dimension: {
            en: 'Probate Fees (Probate Tax)',
            'zh-Hans': '卑诗省遗产认证费（Probate Tax）',
            'zh-Hant': '卑詩省遺產認證費（Probate Tax）',
          },
          optionA: {
            en: 'Subject to BC statutory probate fees of approximately 1.4% on all estate assets exceeding $50,000.',
            'zh-Hans': '超过5万加元以上的全部遗产部分均须依法缴纳约1.4%的卑诗省法定遗产认证费。',
            'zh-Hant': '超過5萬加元以上的全部遺產部分均須依法繳納約1.4%的卑詩省法定遺產認證費。',
          },
          optionB: {
            en: 'Assets held within the trust pass outside the estate, completely legally avoiding BC probate fees.',
            'zh-Hans': '信托名下资产不计入遗产认证范围，完全合法免除任何卑诗省遗产认证费。',
            'zh-Hant': '信託名下資產不計入遺產認證範圍，完全合法免除任何卑詩省遺產認證費。',
          },
        },
        {
          dimension: {
            en: 'Privacy & Public Registry Access',
            'zh-Hans': '隐私保密性与法庭档案公示',
            'zh-Hant': '隱私保密性與法庭檔案公示',
          },
          optionA: {
            en: 'Probate filings and will documents become public records in the BC Supreme Court registry accessible to anyone.',
            'zh-Hans': '向最高法院递交的认证申请及遗嘱全本均成为公共档案，任何公众人士皆可调取查阅。',
            'zh-Hant': '向最高法院遞交的認證申請及遺囑全本均成為公共檔案，任何公眾人士皆可調取查閱。',
          },
          optionB: {
            en: 'Trust deeds, asset inventories, and distribution terms remain strictly private between trustees and beneficiaries.',
            'zh-Hans': '信托契约、财产明细及受益人收益份额仅在受托人与受益人之间保密流转，不对外公示。',
            'zh-Hant': '信託契約、財產明細及受益人收益份額僅在受託人與受益人之間保密流轉，不對外公示。',
          },
        },
        {
          dimension: {
            en: 'Distribution Timeline',
            'zh-Hans': '遗产解冻与分配时间周期',
            'zh-Hant': '遺產解凍與分配時間週期',
          },
          optionA: {
            en: 'Typically requires 6 to 18 months for probate grant issuance, creditor notices, and tax clearance certificates.',
            'zh-Hans': '通常需要等待6至18个月方能取得法院认证令并完成债权人清偿，资产在此期间处于冻结状态。',
            'zh-Hant': '通常需要等待6至18個月方能取得法院認證令並完成債權人清償，資產在此期間處於凍結狀態。',
          },
          optionB: {
            en: 'Successor trustees can distribute assets or continue managing assets immediately upon death without court delay.',
            'zh-Hans': '接任受托人无需等待任何法院文书，在过世后即可立即行使权限分配或继续投资管理信托资产。',
            'zh-Hant': '接任受託人無需等待任何法院文書，在過世後即可立即行使權限分配或繼續投資管理信託資產。',
          },
        },
        {
          dimension: {
            en: 'WESA Will Variation Claims (Section 60)',
            'zh-Hans': 'WESA第60条遗嘱变更诉讼抗辩',
            'zh-Hant': 'WESA第60條遺囑變更訴訟抗辯',
          },
          optionA: {
            en: 'Biological/adopted children and spouses can initiate WESA s. 60 claims arguing inadequate maintenance.',
            'zh-Hans': '配偶或亲生/领养子女有权依据WESA第60条向最高法院提起遗嘱修改诉讼，主张未获合理抚养分配。',
            'zh-Hant': '配偶或親生/領養子女有權依據WESA第60條向最高法院提起遺囑修改訴訟，主張未獲合理撫養分配。',
          },
          optionB: {
            en: 'Assets legally transferred into trust prior to death are generally insulated from statutory WESA will variation claims.',
            'zh-Hans': '生前合法转移至信托名下的资产不属于遗产范围，通常可有效抵御WESA遗嘱修改诉讼争产风险。',
            'zh-Hant': '生前合法轉移至信託名下的資產不屬於遺產範圍，通常可有效抵禦WESA遺囑修改訴訟爭產風險。',
          },
        },
      ],
    },
    faqs: [
      {
        question: {
          en: 'What is the difference between a Will, a Power of Attorney, and a Representation Agreement?',
          'zh-Hans': '在卑诗省，遗嘱、持久授权书（POA）与医疗代表协议（RA）有何区别？',
          'zh-Hant': '在卑詩省，遺囑、持久授權書（POA）與醫療代表協議（RA）有何區別？',
        },
        answer: {
          en: 'A Will dictates how your estate assets are distributed after death. A Power of Attorney authorizes an agent to manage your financial, legal, and property affairs during your lifetime if you become incapacitated. A Representation Agreement authorizes a trusted representative to make personal and healthcare decisions under the Representation Agreement Act.',
          'zh-Hans': '遗嘱仅在立遗嘱人过世后生效，用于分配死后遗产及指派未成年子女监护人；持久授权书（POA）在生前失能时生效，授权他人代管银行账户及房产；医疗代表协议（RA9）则专门授权指定亲友在当事人丧失意识时做出医疗救治决断。',
          'zh-Hant': '遺囑僅在立遺囑人過世後生效，用於分配死後遺產及指派未成年子女監護人；持久授權書（POA）在生前失能時生效，授權他人代管銀行賬戶及房產；醫療代表協議（RA9）則專門授權指定親友在當事人喪失意識時做出醫療救治決斷。',
        },
      },
      {
        question: {
          en: 'How much are BC Probate Fees and when are they required?',
          'zh-Hans': '卑诗省最高法院遗产认证费（Probate Fee）具体如何收取？何时必须办理？',
          'zh-Hant': '卑詩省最高法院遺產認證費（Probate Fee）具體如何收取？何時必須辦理？',
        },
        answer: {
          en: 'Under the Probate Fee Act, British Columbia levies zero probate fee on estates up to $25,000, $208 on estates between $25,000 and $50,000, and $14 per each $1,000 of value exceeding $50,000 (roughly 1.4%). Financial institutions and the Land Title Office require a Grant of Probate before releasing sole accounts or transferring real estate.',
          'zh-Hans': '依据《遗产认证费法》，2.5万以下免征；2.5万至5万收取固定208加元；超过5万部分按每千元14加元（约1.4%）征收。凡以逝者个人独名持有的商业银行存款、投资理财账户或独立产权房产，金融机构及土地局均强制要求出具法院认证令方可解冻过户。',
          'zh-Hant': '依據《遺產認證費法》，2.5萬以下免徵；2.5萬至5萬收取固定208加元；超過5萬部分按每千元14加元（約1.4%）徵收。凡以逝者個人獨名持有的商業銀行存款、投資理財賬戶或獨立產權房產，金融機構及土地局均強制要求出具法院認證令方可解凍過戶。',
        },
      },
      {
        question: {
          en: "Can an adult independent child challenge a parent's Will in British Columbia?",
          'zh-Hans': '在卑诗省，已经经济独立的成年子女是否有权起诉推翻父母的遗嘱？',
          'zh-Hant': '在卑詩省，已經經濟獨立的成年子女是否有權起訴推翻父母的遺囑？',
        },
        answer: {
          en: 'Yes. Under Section 60 of WESA, spouses and children (including financially independent adult children) can petition the BC Supreme Court to vary a Will if the deceased failed to make "adequate provision for their proper maintenance and support" based on legal and moral obligations.',
          'zh-Hans': '有权起诉。依卑诗省WESA第60条，配偶及亲生或合法领养子女（包括已完全成年的独立子女）有权向最高法院提起“遗嘱变更诉讼”（Will Variation）。若法官认定遗嘱人在分配遗产时未尽到法律与道德上的合理分配责任，法院有权直接改判分配比例。',
          'zh-Hant': '有權起訴。依卑詩省WESA第60條，配偶及親生或合法領養子女（包括已完全成年的獨立子女）有權向最高法院提起「遺囑變更訴訟」（Will Variation）。若法官認定遺囑人在分配遺產時未盡到法律與道德上的合理分配責任，法院有權直接改判分配比例。',
        },
      },
      {
        question: {
          en: 'What is an Alter Ego Trust and who qualifies in BC?',
          'zh-Hans': '什么是生前独享信托（Alter Ego Trust）？在卑诗省设立有何法律门槛？',
          'zh-Hant': '什麼是生前獨享信託（Alter Ego Trust）？在卑詩省設立有何法律門檻？',
        },
        answer: {
          en: 'An Alter Ego Trust is an inter vivos trust permitted under the Canadian Income Tax Act for individuals aged 65 or older. Assets transferred into the trust do not trigger immediate capital gains. Upon death, trust assets pass directly to named beneficiaries without passing through probate, ensuring privacy and eliminating BC probate tax.',
          'zh-Hans': '生前独享信托是加拿大所得税法允许设立的生前信托，设立人须年满65周岁且为加拿大税务居民。将资产注入信托时不触发资本利得税；设立人过世后，信托财产直接由后任受托人依约分配，完全绕开法庭认证程序，兼具合法避税与彻底保密之效。',
          'zh-Hant': '生前獨享信託是加拿大所得稅法允許設立的生前信託，設立人須年滿65周歲且為加拿大稅務居民。將資產注入信託時不觸發資本利得稅；設立人過世後，信託財產直接由後任受託人依約分配，完全繞開法庭認證程序，兼具合法避稅與徹底保密之效。',
        },
      },
    ],
  },
];

export function getPracticeAreaBySlug(slug: string): PracticeAreaDetail | undefined {
  return practiceAreasData.find((area) => area.slug === slug);
}

export function getAllPracticeAreaSlugs(): string[] {
  return practiceAreasData.map((area) => area.slug);
}
