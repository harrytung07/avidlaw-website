"use client";

import React, { useState } from "react";
import SignaturePad from "@/components/SignaturePad";
import {
  CheckCircle2,
  AlertCircle,
  Upload,
  Loader2,
  Plus,
  Trash2,
  HeartCrack,
  ShieldCheck,
} from "lucide-react";

interface ChildItem {
  fullName: string;
  dob: string;
  residingWith: string;
}

interface DivorceFormProps {
  initialLang?: "en" | "zh";
  onSuccess?: () => void;
}

export default function DivorceQuestionnaireForm({
  initialLang = "en",
}: DivorceFormProps) {
  const [lang, setLang] = useState<"en" | "zh">(initialLang);

  // Section 1: Client Information
  const [clientName, setClientName] = useState("");
  const [clientDob, setClientDob] = useState("");
  const [clientPob, setClientPob] = useState("");
  const [clientGender, setClientGender] = useState("Female 女");
  const [clientStatusBeforeMarriage, setClientStatusBeforeMarriage] =
    useState("Never Married 未婚");
  const [clientSurnameBeforeMarriage, setClientSurnameBeforeMarriage] =
    useState("");
  const [clientSurnameAtBirth, setClientSurnameAtBirth] = useState("");
  const [clientResideInBcSince, setClientResideInBcSince] = useState("");
  const [clientResidenceAddress, setClientResidenceAddress] = useState("");
  const [useAsMailingAddress, setUseAsMailingAddress] = useState("yes");
  const [clientMailingAddress, setClientMailingAddress] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientOccupation, setClientOccupation] = useState("");
  const [clientAnnualIncome, setClientAnnualIncome] = useState("");

  // Section 2: Spouse Information
  const [spouseName, setSpouseName] = useState("");
  const [spouseDob, setSpouseDob] = useState("");
  const [spousePob, setSpousePob] = useState("");
  const [spouseGender, setSpouseGender] = useState("Male 男");
  const [spouseStatusBeforeMarriage, setSpouseStatusBeforeMarriage] =
    useState("Never Married 未婚");
  const [spouseSurnameBeforeMarriage, setSpouseSurnameBeforeMarriage] =
    useState("");
  const [spouseSurnameAtBirth, setSpouseSurnameAtBirth] = useState("");
  const [spouseResideInBcSince, setSpouseResideInBcSince] = useState("");
  const [spouseResidenceAddress, setSpouseResidenceAddress] = useState("");
  const [spousePhoneEmail, setSpousePhoneEmail] = useState("");
  const [spouseOccupationIncome, setSpouseOccupationIncome] = useState("");

  // Section 3: Marriage & Separation Particulars
  const [relationshipType, setRelationshipType] = useState("Legally Married 合法结婚");
  const [cohabitationDate, setCohabitationDate] = useState("");
  const [marriageDate, setMarriageDate] = useState("");
  const [marriagePlace, setMarriagePlace] = useState("");
  const [marriageCertificate, setMarriageCertificate] = useState(
    "Yes - English 原件为英文"
  );
  const [isSeparated, setIsSeparated] = useState("yes");
  const [separationDate, setSeparationDate] = useState("");
  const [sameRoofSeparation, setSameRoofSeparation] = useState("No 否");
  const [groundsForDivorce, setGroundsForDivorce] = useState(
    "Separation for at least 1 year 分居满一年"
  );
  const [existingAgreements, setExistingAgreements] = useState("None 无");

  // Section 4: Children
  const [hasChildren, setHasChildren] = useState("no");
  const [children, setChildren] = useState<ChildItem[]>([
    { fullName: "", dob: "", residingWith: "" },
  ]);
  const [parentingArrangements, setParentingArrangements] = useState("");
  const [childSupportArrangements, setChildSupportArrangements] = useState("");

  // Section 5: Property & Debts
  const [realEstateInfo, setRealEstateInfo] = useState("");
  const [bankAccountsInfo, setBankAccountsInfo] = useState("");
  const [corporateInterests, setCorporateInterests] = useState("");
  const [excludedPropertyClaims, setExcludedPropertyClaims] = useState("");
  const [familyDebts, setFamilyDebts] = useState("");

  // Section 6: Spousal Support, Protection, Signature
  const [spousalSupportClaim, setSpousalSupportClaim] = useState("Undecided 待律师评估");
  const [urgentProtectionOrder, setUrgentProtectionOrder] = useState("No 否");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = {
    title:
      lang === "en"
        ? "Divorce & Family Law Client Intake Questionnaire"
        : "离婚与家事法律事务调查问卷",
    subtitle:
      lang === "en"
        ? "Confidential intake questionnaire under the British Columbia Family Law Act and federal Divorce Act. All information provided is strictly privileged."
        : "依据卑诗省《家庭法》（Family Law Act）与加拿大《离婚法》（Divorce Act）制定的保密调查问卷。您提供的一切信息受律师执业特权严格保护。",
    langToggleEn: "English Questionnaire",
    langToggleZh: "中文问卷",

    sec1: lang === "en" ? "Section 1: Client Information" : "第一部分：委托人基本信息",
    sec2: lang === "en" ? "Section 2: Spouse Information" : "第二部分：配偶/对方基本信息",
    sec3:
      lang === "en"
        ? "Section 3: Marriage & Separation Particulars"
        : "第三部分：婚姻与分居详情（FLA / Divorce Act）",
    sec4:
      lang === "en"
        ? "Section 4: Children of the Marriage (If Applicable)"
        : "第四部分：未成年子女与抚养安排（如适用）",
    sec5:
      lang === "en"
        ? "Section 5: Family Property, Excluded Property & Debt"
        : "第五部分：家庭财产、除外财产与共同债务（FLA Part 5）",
    sec6:
      lang === "en"
        ? "Section 6: Spousal Support, Protection & Signature"
        : "第六部分：配偶赡养费、紧急保护令与签字",

    addChild: lang === "en" ? "Add Another Child" : "添加另一名子女",
    removeChild: lang === "en" ? "Remove Child" : "删除",
    clearSign: lang === "en" ? "Clear Signature" : "清除重签",
    signPlaceholder:
      lang === "en"
        ? "Sign your legal signature above using your finger, stylus, or mouse"
        : "请在此处使用手指、触控笔或鼠标签署您的法定签名",
    submitBtn: lang === "en" ? "Submit Confidential Questionnaire" : "提交保密问卷",
    submittingBtn: lang === "en" ? "Submitting Securely…" : "正在安全提交…",
    successTitle:
      lang === "en" ? "Questionnaire Submitted Successfully" : "家事问卷已安全提交",
    successMsg:
      lang === "en"
        ? "Thank you for completing this intake questionnaire. Our experienced family law attorneys will review the particulars, conduct conflict clearance, and contact you within 1 business day."
        : "感谢您完整填写家事问卷。我们的资深家事法律师团队将即刻检阅案情材料并进行利益排查，于 1 个工作日内与您联系，安排下一步会面或咨询。",
    submitAnother: lang === "en" ? "Submit Another Questionnaire" : "填写另一份问卷",
  };

  const handleAddChild = () => {
    setChildren([...children, { fullName: "", dob: "", residingWith: "" }]);
  };

  const handleRemoveChild = (index: number) => {
    setChildren(children.filter((_, idx) => idx !== index));
  };

  const handleChildChange = (
    index: number,
    field: keyof ChildItem,
    value: string
  ) => {
    const updated = [...children];
    updated[index][field] = value;
    setChildren(updated);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    if (selected.length > 5) {
      alert(lang === "en" ? "Maximum 5 files allowed." : "最多只能上传 5 个文件。");
      return;
    }
    const totalSize = selected.reduce((acc, f) => acc + f.size, 0);
    if (totalSize > 15 * 1024 * 1024) {
      alert(lang === "en" ? "Total files size exceeds 15MB." : "附件总大小不能超过 15MB。");
      return;
    }
    setFiles(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validate Signature
    if (!signatureDataUrl) {
      setErrorMsg(
        lang === "en"
          ? "Please provide your signature before submitting."
          : "请在问卷末尾签署您的电子签名。"
      );
      return;
    }

    // Required Client Fields
    if (
      !clientName.trim() ||
      !clientDob.trim() ||
      !clientPob.trim() ||
      !clientSurnameBeforeMarriage.trim() ||
      !clientSurnameAtBirth.trim() ||
      !clientResideInBcSince.trim() ||
      !clientResidenceAddress.trim() ||
      !clientPhone.trim() ||
      !clientEmail.trim()
    ) {
      setErrorMsg(
        lang === "en"
          ? "Please fill in all required client fields in Section 1."
          : "请完整填写第一部分中所有带星号的必填信息（姓名、出生日期、出生地、婚前姓、出生姓、来BC日期、地址、电话、邮箱）。"
      );
      return;
    }

    // Required Spouse Fields
    if (!spouseName.trim() || !spouseDob.trim()) {
      setErrorMsg(
        lang === "en"
          ? "Please fill in the spouse's full legal name and date of birth in Section 2."
          : "请填写第二部分配偶的全名及出生日期。"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const sections = [
        {
          sectionTitle: "Section 1: Client Particulars / 委托人基本信息",
          rows: [
            { label: "Full Legal Name / 姓名", value: clientName },
            { label: "Date of Birth / 出生日期", value: clientDob },
            { label: "Place of Birth / 出生城市及国家", value: clientPob },
            { label: "Gender / 性别", value: clientGender },
            { label: "Status Before Marriage / 婚前状况", value: clientStatusBeforeMarriage },
            { label: "Surname Before Marriage / 婚前姓", value: clientSurnameBeforeMarriage },
            { label: "Surname at Birth / 出生时姓氏", value: clientSurnameAtBirth },
            { label: "Resided in BC Since / 来BC省居住日期", value: clientResideInBcSince },
            { label: "Residence Address / 住家地址", value: clientResidenceAddress },
            {
              label: "Mailing Address / 通讯地址",
              value:
                useAsMailingAddress === "yes"
                  ? "Same as residence / 与住家地址相同"
                  : clientMailingAddress || "Not Provided",
            },
            { label: "Phone Number / 电话", value: clientPhone },
            { label: "Email / 电子邮箱", value: clientEmail },
            { label: "Occupation & Employer / 职业及雇主", value: clientOccupation || "Not Stated" },
            { label: "Annual Income (Line 15000) / 年收入", value: clientAnnualIncome || "Not Stated" },
          ],
        },
        {
          sectionTitle: "Section 2: Spouse Particulars / 配偶基本信息",
          rows: [
            { label: "Spouse Full Name / 配偶全名", value: spouseName },
            { label: "Spouse DOB / 配偶出生日期", value: spouseDob },
            { label: "Spouse POB / 配偶出生城市及国家", value: spousePob || "Not Stated" },
            { label: "Spouse Gender / 配偶性别", value: spouseGender },
            { label: "Spouse Status Before Marriage / 配偶婚前状况", value: spouseStatusBeforeMarriage },
            { label: "Spouse Surname Before Marriage / 配偶婚前姓", value: spouseSurnameBeforeMarriage || "Not Stated" },
            { label: "Spouse Surname at Birth / 配偶出生时姓氏", value: spouseSurnameAtBirth || "Not Stated" },
            { label: "Spouse Resided in BC Since / 配偶来BC居住日期", value: spouseResideInBcSince || "Not Stated" },
            { label: "Spouse Address / 配偶住家地址", value: spouseResidenceAddress || "Not Disclosed" },
            { label: "Spouse Phone & Email / 配偶电话及邮箱", value: spousePhoneEmail || "Not Disclosed" },
            { label: "Spouse Occupation & Income / 配偶职业及年收入", value: spouseOccupationIncome || "Not Disclosed" },
          ],
        },
        {
          sectionTitle: "Section 3: Marriage & Separation / 婚姻与分居详情 (FLA)",
          rows: [
            { label: "Relationship Type / 关系类型", value: relationshipType },
            { label: "Cohabitation Date / 开始同居日期", value: cohabitationDate || "Not Applicable" },
            { label: "Marriage Date / 结婚登记日期", value: marriageDate || "Not Stated" },
            { label: "Marriage Place / 结婚登记地点", value: marriagePlace || "Not Stated" },
            { label: "Marriage Certificate / 结婚证原件", value: marriageCertificate },
            { label: "Currently Separated? / 是否已分居", value: isSeparated === "yes" ? "YES / 已分居" : "NO / 未分居" },
            ...(isSeparated === "yes"
              ? [
                  { label: "Separation Date / 分居日期", value: separationDate || "Not Stated" },
                  { label: "Same Roof Separation? / 同一屋檐下分居", value: sameRoofSeparation },
                ]
              : []),
            { label: "Grounds for Divorce / 离婚理由", value: groundsForDivorce },
            { label: "Existing Agreements / 现有协议", value: existingAgreements },
          ],
        },
        {
          sectionTitle: "Section 4: Children & Parenting / 未成年子女与抚养诉求",
          rows: [
            {
              label: "Dependent Children? / 是否有未成年子女",
              value: hasChildren === "yes" ? `YES (${children.length} children)` : "NO",
            },
            ...(hasChildren === "yes"
              ? children.map((c, i) => ({
                  label: `Child ${i + 1} / 子女 ${i + 1}`,
                  value: `${c.fullName || "Unnamed"} (DOB: ${c.dob || "N/A"}) - Residing with: ${c.residingWith || "N/A"}`,
                }))
              : []),
            ...(hasChildren === "yes"
              ? [
                  { label: "Parenting Time Plan / 抚养安排诉求", value: parentingArrangements || "Pending Counsel Advice" },
                  { label: "Child Support Claims / 抚养费及特殊开支", value: childSupportArrangements || "Pending Calculation" },
                ]
              : []),
          ],
        },
        {
          sectionTitle: "Section 5: Property, Excluded Assets & Debt / 财产、除外财产与债务",
          rows: [
            { label: "Real Estate Properties / 房产信息", value: realEstateInfo || "None Reported" },
            { label: "Bank Accounts & Pensions / 银行及养老金", value: bankAccountsInfo || "None Reported" },
            { label: "Business Interests / 股权与商业利益", value: corporateInterests || "None Reported" },
            { label: "Excluded Property (FLA s. 85) / 除外财产主张", value: excludedPropertyClaims || "None Reported" },
            { label: "Family Debts / 共同债务", value: familyDebts || "None Reported" },
          ],
        },
        {
          sectionTitle: "Section 6: Support, Urgent Relief & Objectives / 赡养费、保护令与诉求",
          rows: [
            { label: "Spousal Support Claim / 配偶赡养费", value: spousalSupportClaim },
            { label: "Urgent Order Needed? (FLA s. 91) / 紧急保护令或财产冻结令", value: urgentProtectionOrder },
            { label: "Key Objectives & Notes / 核心诉求与补充说明", value: additionalNotes || "None" },
          ],
        },
      ];

      const formData = new FormData();
      formData.append("formType", "divorce");
      formData.append(
        "formTitle",
        lang === "en"
          ? "Family Law & Divorce Intake Questionnaire"
          : "离婚与家事法律事务调查问卷"
      );
      formData.append("clientName", clientName);
      formData.append("clientEmail", clientEmail);
      formData.append("clientPhone", clientPhone);
      formData.append("locale", lang);
      formData.append("sections", JSON.stringify(sections));
      formData.append("signatureDataUrl", signatureDataUrl);
      formData.append("_gotcha", honeypot);

      files.forEach((file) => {
        formData.append("files", file);
      });

      const res = await fetch("/api/forms/submit", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to submit questionnaire.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Submission failed:", err);
      setErrorMsg(
        err.message ||
          (lang === "en"
            ? "Network error submitting form. Please call our office directly."
            : "提交失败，请检查网络或直接致电我所办公室。")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setErrorMsg(null);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl border border-zinc-200 text-center max-w-2xl mx-auto my-8">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1B48] mb-4 text-balance">
          {t.successTitle}
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-8 text-sm sm:text-base text-pretty">
          {t.successMsg}
        </p>

        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 text-left mb-8 space-y-2 text-xs sm:text-sm text-zinc-700">
          <div className="flex justify-between border-b border-zinc-200 pb-2">
            <span className="font-semibold text-zinc-600">Client / 委托人:</span>
            <span className="font-bold text-[#0B1B48]">{clientName}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-200 pb-2">
            <span className="font-semibold text-zinc-600">Contact / 联系方式:</span>
            <span className="font-mono tabular-nums">{clientPhone} • {clientEmail}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-zinc-600">Spouse / 对方:</span>
            <span>{spouseName}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-lg border border-zinc-300 text-zinc-700 hover:bg-zinc-50 font-medium text-sm active:scale-[0.97] transition-[background-color,border-color,transform] duration-150 ease-out cursor-pointer"
          >
            {t.submitAnother}
          </button>
          <a
            href={`/${lang === "en" ? "en" : "zh-Hans"}`}
            className="px-6 py-3 rounded-lg bg-[#0B1B48] text-white hover:bg-[#132763] font-medium text-sm active:scale-[0.97] transition-[background-color,transform] duration-150 ease-out inline-block"
          >
            {lang === "en" ? "Return to Homepage" : "返回网站首页"}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden max-w-4xl mx-auto my-6">
      {/* Top Banner */}
      <div className="bg-[#0B1B48] p-6 sm:p-8 text-white relative">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#FFC107] uppercase tracking-wider">
            <HeartCrack className="w-3.5 h-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
            <span>BC Family Law Act • Confidential Intake</span>
          </div>

          <div className="inline-flex rounded-lg bg-white/15 p-1 border border-white/20">
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-md text-xs font-semibold active:scale-[0.96] transition-[background-color,color,box-shadow,transform] duration-150 ease-out cursor-pointer ${
                lang === "en"
                  ? "bg-[#FFC107] text-zinc-950 shadow-xs"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {t.langToggleEn}
            </button>
            <button
              type="button"
              onClick={() => setLang("zh")}
              className={`px-3 py-1 rounded-md text-xs font-semibold active:scale-[0.96] transition-[background-color,color,box-shadow,transform] duration-150 ease-out cursor-pointer ${
                lang === "zh"
                  ? "bg-[#FFC107] text-zinc-950 shadow-xs"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {t.langToggleZh}
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2 text-balance">
          {t.title}
        </h1>
        <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-2xl text-pretty font-light">
          {t.subtitle}
        </p>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-12">
        {/* Honeypot */}
        <input
          type="text"
          name="_gotcha"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />
            <div>
              <p className="font-semibold">{lang === "en" ? "Action Required" : "请完善以下信息"}</p>
              <p className="text-pretty">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* SECTION 1: Client Information */}
        <div className="space-y-6">
          <div className="border-b border-zinc-200 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0B1B48] flex items-center gap-2 text-balance">
              <span className="w-6 h-6 rounded-full bg-[#0B1B48] text-[#FFC107] inline-flex items-center justify-center text-xs font-mono tabular-nums shrink-0">
                1
              </span>
              {t.sec1}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="divorce-client-name" className="block text-xs font-semibold text-zinc-700 mb-1">
                Full Legal Name / 姓名 <span className="text-red-500">*</span>
              </label>
              <input
                id="divorce-client-name"
                type="text"
                required
                autoComplete="name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Jennifer Lin / 林芳"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out"
              />
            </div>

            <div>
              <label htmlFor="divorce-client-dob" className="block text-xs font-semibold text-zinc-700 mb-1">
                Date of Birth / 出生日期 <span className="text-red-500">*</span>
              </label>
              <input
                id="divorce-client-dob"
                type="date"
                required
                autoComplete="bday"
                value={clientDob}
                onChange={(e) => setClientDob(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out font-mono tabular-nums"
              />
            </div>

            <div>
              <label htmlFor="divorce-client-pob" className="block text-xs font-semibold text-zinc-700 mb-1">
                Place of Birth / 出生城市及国家 <span className="text-red-500">*</span>
              </label>
              <input
                id="divorce-client-pob"
                type="text"
                required
                value={clientPob}
                onChange={(e) => setClientPob(e.target.value)}
                placeholder="e.g. Shanghai, China / Vancouver, Canada"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out"
              />
            </div>

            <div>
              <label htmlFor="divorce-client-gender" className="block text-xs font-semibold text-zinc-700 mb-1">
                Gender / 性别 <span className="text-red-500">*</span>
              </label>
              <select
                id="divorce-client-gender"
                value={clientGender}
                onChange={(e) => setClientGender(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm bg-white cursor-pointer transition-[border-color,box-shadow] duration-150 ease-out"
              >
                <option value="Female 女">Female 女</option>
                <option value="Male 男">Male 男</option>
                <option value="Other 其他">Other 其他</option>
              </select>
            </div>

            <div>
              <label htmlFor="divorce-client-status-before-marriage" className="block text-xs font-semibold text-zinc-700 mb-1">
                Status Before Marriage / 婚前状况 <span className="text-red-500">*</span>
              </label>
              <select
                id="divorce-client-status-before-marriage"
                value={clientStatusBeforeMarriage}
                onChange={(e) => setClientStatusBeforeMarriage(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm bg-white cursor-pointer transition-[border-color,box-shadow] duration-150 ease-out"
              >
                <option value="Never Married 未婚">Never Married 未婚</option>
                <option value="Divorced 离异">Divorced 离异</option>
                <option value="Widowed 丧偶">Widowed 丧偶</option>
              </select>
            </div>

            <div>
              <label htmlFor="divorce-client-surname-before-marriage" className="block text-xs font-semibold text-zinc-700 mb-1">
                Surname Before Marriage / 婚前姓 <span className="text-red-500">*</span>
              </label>
              <input
                id="divorce-client-surname-before-marriage"
                type="text"
                required
                value={clientSurnameBeforeMarriage}
                onChange={(e) => setClientSurnameBeforeMarriage(e.target.value)}
                placeholder="e.g. Lin"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out"
              />
            </div>

            <div>
              <label htmlFor="divorce-client-surname-at-birth" className="block text-xs font-semibold text-zinc-700 mb-1">
                Surname at Birth / 出生时姓氏 <span className="text-red-500">*</span>
              </label>
              <input
                id="divorce-client-surname-at-birth"
                type="text"
                required
                value={clientSurnameAtBirth}
                onChange={(e) => setClientSurnameAtBirth(e.target.value)}
                placeholder="Per birth certificate"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out"
              />
            </div>

            <div>
              <label htmlFor="divorce-client-reside-in-bc-since" className="block text-xs font-semibold text-zinc-700 mb-1">
                Resided in BC Since / 来BC省日期 (YYYY-MM) <span className="text-red-500">*</span>
              </label>
              <input
                id="divorce-client-reside-in-bc-since"
                type="text"
                required
                value={clientResideInBcSince}
                onChange={(e) => setClientResideInBcSince(e.target.value)}
                placeholder="e.g. 2015-08"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out font-mono tabular-nums"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="divorce-client-residence-address" className="block text-xs font-semibold text-zinc-700 mb-1">
                Residence Address / 住家地址 <span className="text-red-500">*</span>
              </label>
              <input
                id="divorce-client-residence-address"
                type="text"
                required
                autoComplete="street-address"
                value={clientResidenceAddress}
                onChange={(e) => setClientResidenceAddress(e.target.value)}
                placeholder="Street address, City, BC, Postal Code"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out"
              />
            </div>

            <div className="sm:col-span-3">
              <div className="flex items-center gap-6 mb-2">
                <span className="text-xs font-semibold text-zinc-700">
                  Use this as Mailing Address? / 是否作为通讯地址?
                </span>
                <label className="inline-flex items-center gap-1.5 text-xs text-zinc-700 cursor-pointer">
                  <input
                    type="radio"
                    name="mailingToggle"
                    value="yes"
                    checked={useAsMailingAddress === "yes"}
                    onChange={() => setUseAsMailingAddress("yes")}
                  />
                  <span>Yes 是</span>
                </label>
                <label className="inline-flex items-center gap-1.5 text-xs text-zinc-700 cursor-pointer">
                  <input
                    type="radio"
                    name="mailingToggle"
                    value="no"
                    checked={useAsMailingAddress === "no"}
                    onChange={() => setUseAsMailingAddress("no")}
                  />
                  <span>No 否</span>
                </label>
              </div>
              {useAsMailingAddress === "no" && (
                <input
                  id="divorce-client-mailing-address"
                  type="text"
                  autoComplete="street-address"
                  value={clientMailingAddress}
                  onChange={(e) => setClientMailingAddress(e.target.value)}
                  placeholder="Mailing address if different from residence"
                  className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out"
                />
              )}
            </div>

            <div>
              <label htmlFor="divorce-client-phone" className="block text-xs font-semibold text-zinc-700 mb-1">
                Phone Number / 电话号码 <span className="text-red-500">*</span>
              </label>
              <input
                id="divorce-client-phone"
                type="tel"
                required
                autoComplete="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="e.g. (604) 123-4567"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out"
              />
            </div>

            <div>
              <label htmlFor="divorce-client-email" className="block text-xs font-semibold text-zinc-700 mb-1">
                Email Address / 电子邮箱 <span className="text-red-500">*</span>
              </label>
              <input
                id="divorce-client-email"
                type="email"
                required
                autoComplete="email"
                spellCheck={false}
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="client@email.com"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out"
              />
            </div>

            <div>
              <label htmlFor="divorce-client-occupation" className="block text-xs font-semibold text-zinc-700 mb-1">
                Occupation & Employer / 职业及雇主
              </label>
              <input
                id="divorce-client-occupation"
                type="text"
                autoComplete="organization-title"
                value={clientOccupation}
                onChange={(e) => setClientOccupation(e.target.value)}
                placeholder="e.g. Accountant, ABC Company"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="divorce-client-annual-income" className="block text-xs font-semibold text-zinc-700 mb-1">
                Annual Income (Line 15000 of CRA Notice of Assessment) / 年收入-根据税单
              </label>
              <input
                id="divorce-client-annual-income"
                type="text"
                value={clientAnnualIncome}
                onChange={(e) => setClientAnnualIncome(e.target.value)}
                placeholder="e.g. $85,000 CAD"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out font-mono tabular-nums"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Spouse Information */}
        <div className="space-y-6">
          <div className="border-b border-zinc-200 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0B1B48] flex items-center gap-2 text-balance">
              <span className="w-6 h-6 rounded-full bg-[#0B1B48] text-[#FFC107] inline-flex items-center justify-center text-xs font-mono tabular-nums shrink-0">
                2
              </span>
              {t.sec2}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="divorce-spouse-name" className="block text-xs font-semibold text-zinc-700 mb-1">
                Spouse&apos;s Full Legal Name / 配偶姓名 <span className="text-red-500">*</span>
              </label>
              <input
                id="divorce-spouse-name"
                type="text"
                required
                autoComplete="off"
                value={spouseName}
                onChange={(e) => setSpouseName(e.target.value)}
                placeholder="Full legal name of spouse / other party"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out"
              />
            </div>

            <div>
              <label htmlFor="divorce-spouse-dob" className="block text-xs font-semibold text-zinc-700 mb-1">
                Spouse&apos;s Date of Birth / 配偶出生日期 <span className="text-red-500">*</span>
              </label>
              <input
                id="divorce-spouse-dob"
                type="date"
                required
                value={spouseDob}
                onChange={(e) => setSpouseDob(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out font-mono tabular-nums"
              />
            </div>

            <div>
              <label htmlFor="divorce-spouse-pob" className="block text-xs font-semibold text-zinc-700 mb-1">
                Spouse&apos;s Place of Birth / 配偶出生城市及国家
              </label>
              <input
                id="divorce-spouse-pob"
                type="text"
                value={spousePob}
                onChange={(e) => setSpousePob(e.target.value)}
                placeholder="City, Country"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out"
              />
            </div>

            <div>
              <label htmlFor="divorce-spouse-gender" className="block text-xs font-semibold text-zinc-700 mb-1">
                Spouse&apos;s Gender / 配偶性别
              </label>
              <select
                id="divorce-spouse-gender"
                value={spouseGender}
                onChange={(e) => setSpouseGender(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm bg-white cursor-pointer transition-[border-color,box-shadow] duration-150 ease-out"
              >
                <option value="Male 男">Male 男</option>
                <option value="Female 女">Female 女</option>
                <option value="Other 其他">Other 其他</option>
              </select>
            </div>

            <div>
              <label htmlFor="divorce-spouse-status-before-marriage" className="block text-xs font-semibold text-zinc-700 mb-1">
                Status Before Marriage / 配偶婚前状况
              </label>
              <select
                id="divorce-spouse-status-before-marriage"
                value={spouseStatusBeforeMarriage}
                onChange={(e) => setSpouseStatusBeforeMarriage(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm bg-white cursor-pointer transition-[border-color,box-shadow] duration-150 ease-out"
              >
                <option value="Never Married 未婚">Never Married 未婚</option>
                <option value="Divorced 离异">Divorced 离异</option>
                <option value="Widowed 丧偶">Widowed 丧偶</option>
              </select>
            </div>

            <div>
              <label htmlFor="divorce-spouse-surname-before-marriage" className="block text-xs font-semibold text-zinc-700 mb-1">
                Spouse Surname Before Marriage / 婚前姓
              </label>
              <input
                id="divorce-spouse-surname-before-marriage"
                type="text"
                value={spouseSurnameBeforeMarriage}
                onChange={(e) => setSpouseSurnameBeforeMarriage(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out"
              />
            </div>

            <div>
              <label htmlFor="divorce-spouse-surname-at-birth" className="block text-xs font-semibold text-zinc-700 mb-1">
                Spouse Surname at Birth / 出生时姓氏
              </label>
              <input
                id="divorce-spouse-surname-at-birth"
                type="text"
                value={spouseSurnameAtBirth}
                onChange={(e) => setSpouseSurnameAtBirth(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out"
              />
            </div>

            <div>
              <label htmlFor="divorce-spouse-reside-in-bc-since" className="block text-xs font-semibold text-zinc-700 mb-1">
                Resided in BC Since / 来BC省日期 (YYYY-MM)
              </label>
              <input
                id="divorce-spouse-reside-in-bc-since"
                type="text"
                value={spouseResideInBcSince}
                onChange={(e) => setSpouseResideInBcSince(e.target.value)}
                placeholder="e.g. 2016-03"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out font-mono tabular-nums"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="divorce-spouse-residence-address" className="block text-xs font-semibold text-zinc-700 mb-1">
                Spouse&apos;s Residence Address (Required for court service) / 配偶住家地址（用于法庭文书送达）
              </label>
              <input
                id="divorce-spouse-residence-address"
                type="text"
                autoComplete="off"
                value={spouseResidenceAddress}
                onChange={(e) => setSpouseResidenceAddress(e.target.value)}
                placeholder="Current physical address of spouse for formal service"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="divorce-spouse-phone-email" className="block text-xs font-semibold text-zinc-700 mb-1">
                Spouse Phone & Email / 配偶联系电话及电子邮箱
              </label>
              <input
                id="divorce-spouse-phone-email"
                type="text"
                autoComplete="off"
                spellCheck={false}
                value={spousePhoneEmail}
                onChange={(e) => setSpousePhoneEmail(e.target.value)}
                placeholder="e.g. (778) 123-4567, spouse@email.com"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out"
              />
            </div>

            <div>
              <label htmlFor="divorce-spouse-occupation-income" className="block text-xs font-semibold text-zinc-700 mb-1">
                Spouse Occupation & Estimated Income / 配偶职业及年收入
              </label>
              <input
                id="divorce-spouse-occupation-income"
                type="text"
                value={spouseOccupationIncome}
                onChange={(e) => setSpouseOccupationIncome(e.target.value)}
                placeholder="e.g. Sales Director, ~$120,000"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out font-mono tabular-nums"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Marriage & Separation Particulars */}
        <div className="space-y-6">
          <div className="border-b border-zinc-200 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0B1B48] flex items-center gap-2 text-balance">
              <span className="w-6 h-6 rounded-full bg-[#0B1B48] text-[#FFC107] inline-flex items-center justify-center text-xs font-mono tabular-nums shrink-0">
                3
              </span>
              {t.sec3}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="divorce-relationship-type" className="block text-xs font-semibold text-zinc-700 mb-1">
                Relationship Type / 关系类型
              </label>
              <select
                id="divorce-relationship-type"
                value={relationshipType}
                onChange={(e) => setRelationshipType(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm bg-white cursor-pointer transition-[border-color,box-shadow] duration-150 ease-out"
              >
                <option value="Legally Married 合法结婚">Legally Married 合法结婚</option>
                <option value="Common-Law 同居伴侣 (FLA Spouse)">
                  Common-Law 同居伴侣 (FLA Spouse)
                </option>
              </select>
            </div>

            <div>
              <label htmlFor="divorce-cohabitation-date" className="block text-xs font-semibold text-zinc-700 mb-1">
                Date of Cohabitation / 开始同居日期 (FLA Property Valuation Start)
              </label>
              <input
                id="divorce-cohabitation-date"
                type="date"
                value={cohabitationDate}
                onChange={(e) => setCohabitationDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out font-mono tabular-nums"
              />
            </div>

            <div>
              <label htmlFor="divorce-marriage-date" className="block text-xs font-semibold text-zinc-700 mb-1">
                Date of Marriage / 结婚登记日期
              </label>
              <input
                id="divorce-marriage-date"
                type="date"
                value={marriageDate}
                onChange={(e) => setMarriageDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out font-mono tabular-nums"
              />
            </div>

            <div>
              <label htmlFor="divorce-marriage-place" className="block text-xs font-semibold text-zinc-700 mb-1">
                Place of Marriage / 结婚地点 (City, Country)
              </label>
              <input
                id="divorce-marriage-place"
                type="text"
                value={marriagePlace}
                onChange={(e) => setMarriagePlace(e.target.value)}
                placeholder="e.g. Richmond, BC / Beijing, China"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="divorce-marriage-certificate" className="block text-xs font-semibold text-zinc-700 mb-1">
                Do you have the Original Marriage Certificate? / 是否有结婚证原件？
              </label>
              <select
                id="divorce-marriage-certificate"
                value={marriageCertificate}
                onChange={(e) => setMarriageCertificate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm bg-white cursor-pointer transition-[border-color,box-shadow] duration-150 ease-out"
              >
                <option value="Yes - English Certificate 原件为英文结婚证">
                  Yes - English Certificate 原件为英文结婚证
                </option>
                <option value="Yes - Foreign Certificate (Needs Certified Translation) 外文结婚证（需翻译公证）">
                  Yes - Foreign Certificate (Needs Certified Translation) 外文结婚证（需翻译公证）
                </option>
                <option value="No - Lost / Missing 暂无原件">No - Lost / Missing 暂无原件</option>
              </select>
            </div>

            <div>
              <label htmlFor="divorce-is-separated" className="block text-xs font-semibold text-zinc-700 mb-1">
                Are you currently separated? / 目前是否已分居？
              </label>
              <select
                id="divorce-is-separated"
                value={isSeparated}
                onChange={(e) => setIsSeparated(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm bg-white cursor-pointer transition-[border-color,box-shadow] duration-150 ease-out"
              >
                <option value="yes">Yes 已分居</option>
                <option value="no">No 尚未分居</option>
              </select>
            </div>

            {isSeparated === "yes" && (
              <>
                <div>
                  <label htmlFor="divorce-separation-date" className="block text-xs font-semibold text-zinc-700 mb-1">
                    Date of Separation / 分居日期
                  </label>
                  <input
                    id="divorce-separation-date"
                    type="date"
                    value={separationDate}
                    onChange={(e) => setSeparationDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm transition-[border-color,box-shadow] duration-150 ease-out font-mono tabular-nums"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="divorce-same-roof-separation" className="block text-xs font-semibold text-zinc-700 mb-1">
                    Living separate and apart under the same roof? / 是否同一屋檐下分房分居？
                  </label>
                  <select
                    id="divorce-same-roof-separation"
                    value={sameRoofSeparation}
                    onChange={(e) => setSameRoofSeparation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm bg-white cursor-pointer transition-[border-color,box-shadow] duration-150 ease-out"
                  >
                    <option value="No 否（已搬离不同住所）">No 否（已搬离至不同住所）</option>
                    <option value="Yes 是（因经济/子女原因同一屋檐下分房独立生活）">
                      Yes 是（因经济/子女原因同一屋檐下分房独立生活）
                    </option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label htmlFor="divorce-grounds-for-divorce" className="block text-xs font-semibold text-zinc-700 mb-1">
                Grounds for Divorce / 离婚法定理由
              </label>
              <select
                id="divorce-grounds-for-divorce"
                value={groundsForDivorce}
                onChange={(e) => setGroundsForDivorce(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm bg-white cursor-pointer transition-[border-color,box-shadow] duration-150 ease-out"
              >
                <option value="Separation for at least 1 year 分居满一年 (No-Fault)">
                  Separation for at least 1 year 分居满一年 (No-Fault)
                </option>
                <option value="Adultery 婚内出轨">Adultery 婚内出轨</option>
                <option value="Cruelty 身体或精神虐待">Cruelty 身体或精神虐待</option>
              </select>
            </div>

            <div>
              <label htmlFor="divorce-existing-agreements" className="block text-xs font-semibold text-zinc-700 mb-1">
                Existing Agreements / 是否已签有协议？
              </label>
              <select
                id="divorce-existing-agreements"
                value={existingAgreements}
                onChange={(e) => setExistingAgreements(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none text-sm bg-white cursor-pointer transition-[border-color,box-shadow] duration-150 ease-out"
              >
                <option value="None 无任何协议">None 无任何协议</option>
                <option value="Prenuptial Agreement 婚前协议">
                  Prenuptial Agreement 婚前协议
                </option>
                <option value="Marriage Agreement 婚内协议">Marriage Agreement 婚内协议</option>
                <option value="Separation Agreement 分居协议">
                  Separation Agreement 分居协议
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 4: Children of the Marriage */}
        <div className="space-y-6">
          <div className="border-b border-zinc-200 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0B1B48] flex items-center gap-2 text-balance">
              <span className="w-6 h-6 rounded-full bg-[#0B1B48] text-[#FFC107] inline-flex items-center justify-center text-xs font-mono tabular-nums shrink-0">
                4
              </span>
              {t.sec4}
            </h2>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-zinc-700 mb-2">
              Are there dependent children? / 是否有未成年或经济未独立的子女？
            </label>
            <div className="flex gap-4">
              <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-zinc-800 py-1 px-2.5 rounded-lg border border-zinc-200 hover:border-zinc-300 active:scale-[0.98] transition-[background-color,border-color,transform] duration-150 ease-out">
                <input
                  type="radio"
                  name="childrenToggle"
                  value="no"
                  checked={hasChildren === "no"}
                  onChange={() => setHasChildren("no")}
                />
                <span>No 无子女</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-zinc-800 py-1 px-2.5 rounded-lg border border-zinc-200 hover:border-zinc-300 active:scale-[0.98] transition-[background-color,border-color,transform] duration-150 ease-out">
                <input
                  type="radio"
                  name="childrenToggle"
                  value="yes"
                  checked={hasChildren === "yes"}
                  onChange={() => setHasChildren("yes")}
                />
                <span>Yes 有子女</span>
              </label>
            </div>
          </div>

          {hasChildren === "yes" && (
            <div className="space-y-4 p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              {children.map((child, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-white border border-zinc-200 relative space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0B1B48] uppercase tracking-wider font-mono tabular-nums">
                      Child {idx + 1} / 子女 {idx + 1}
                    </span>
                    {children.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveChild(idx)}
                        aria-label={`${t.removeChild} ${idx + 1}`}
                        className="text-red-500 hover:text-red-700 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none rounded active:scale-[0.96] transition-[color,transform] duration-150 ease-out text-xs flex items-center gap-1 cursor-pointer p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
                        <span>{t.removeChild}</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label htmlFor={`child-name-${idx}`} className="block text-[11px] font-semibold text-zinc-600 mb-1">
                        Child Full Name / 子女姓名
                      </label>
                      <input
                        id={`child-name-${idx}`}
                        type="text"
                        value={child.fullName}
                        onChange={(e) => handleChildChange(idx, "fullName", e.target.value)}
                        placeholder="Child's legal name"
                        className="w-full px-3 py-1.5 rounded border border-zinc-300 text-sm focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none transition-[border-color,box-shadow] duration-150 ease-out"
                      />
                    </div>
                    <div>
                      <label htmlFor={`child-dob-${idx}`} className="block text-[11px] font-semibold text-zinc-600 mb-1">
                        Date of Birth / 出生日期
                      </label>
                      <input
                        id={`child-dob-${idx}`}
                        type="date"
                        value={child.dob}
                        onChange={(e) => handleChildChange(idx, "dob", e.target.value)}
                        className="w-full px-3 py-1.5 rounded border border-zinc-300 text-sm focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none transition-[border-color,box-shadow] duration-150 ease-out font-mono tabular-nums"
                      />
                    </div>
                    <div>
                      <label htmlFor={`child-residing-${idx}`} className="block text-[11px] font-semibold text-zinc-600 mb-1">
                        Currently Residing With / 目前与谁同住
                      </label>
                      <input
                        id={`child-residing-${idx}`}
                        type="text"
                        value={child.residingWith}
                        onChange={(e) => handleChildChange(idx, "residingWith", e.target.value)}
                        placeholder="e.g. Mother / Father / Shared"
                        className="w-full px-3 py-1.5 rounded border border-zinc-300 text-sm focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none transition-[border-color,box-shadow] duration-150 ease-out"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddChild}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-zinc-300 text-xs font-semibold text-[#0B1B48] hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:outline-none active:scale-[0.96] transition-[background-color,border-color,transform] duration-150 ease-out shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
                <span>{t.addChild}</span>
              </button>

              <div className="grid grid-cols-1 gap-3 pt-2">
                <div>
                  <label htmlFor="divorce-parenting-arrangements" className="block text-xs font-semibold text-zinc-700 mb-1">
                    Proposed Guardianship & Parenting Time / 期望的监护权与抚养时间安排诉求
                  </label>
                  <textarea
                    id="divorce-parenting-arrangements"
                    rows={2}
                    value={parentingArrangements}
                    onChange={(e) => setParentingArrangements(e.target.value)}
                    placeholder="e.g. Primary residence with Mother, alternating weekends with Father…"
                    className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none transition-[border-color,box-shadow] duration-150 ease-out resize-y"
                  />
                </div>
                <div>
                  <label htmlFor="divorce-child-support" className="block text-xs font-semibold text-zinc-700 mb-1">
                    Child Support & Section 7 Special Expenses / 抚养费及特殊费用诉求（学费、课外班等）
                  </label>
                  <textarea
                    id="divorce-child-support"
                    rows={2}
                    value={childSupportArrangements}
                    onChange={(e) => setChildSupportArrangements(e.target.value)}
                    placeholder="e.g. Seeking federal guideline table amount plus 50% private school tuition…"
                    className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none transition-[border-color,box-shadow] duration-150 ease-out resize-y"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 5: Property, Excluded Property & Debts */}
        <div className="space-y-6">
          <div className="border-b border-zinc-200 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0B1B48] flex items-center gap-2 text-balance">
              <span className="w-6 h-6 rounded-full bg-[#0B1B48] text-[#FFC107] inline-flex items-center justify-center text-xs font-mono tabular-nums shrink-0">
                5
              </span>
              {t.sec5}
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="divorce-real-estate" className="block text-xs font-semibold text-zinc-700 mb-1">
                Real Estate Properties / 名下房产概况（地址、产权人比例、估值、房贷余额）
              </label>
              <textarea
                id="divorce-real-estate"
                rows={2}
                value={realEstateInfo}
                onChange={(e) => setRealEstateInfo(e.target.value)}
                placeholder="e.g. 123 Main St, Richmond (Joint tenancy, ~$1.8M, mortgage $600k)"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none transition-[border-color,box-shadow] duration-150 ease-out resize-y"
              />
            </div>

            <div>
              <label htmlFor="divorce-bank-accounts" className="block text-xs font-semibold text-zinc-700 mb-1">
                Bank Accounts, Investments & Pensions / 银行存款、投资、股票及养老金
              </label>
              <textarea
                id="divorce-bank-accounts"
                rows={2}
                value={bankAccountsInfo}
                onChange={(e) => setBankAccountsInfo(e.target.value)}
                placeholder="e.g. TD Savings, RBC RRSP accounts, BC Public Service Pension…"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none transition-[border-color,box-shadow] duration-150 ease-out resize-y"
              />
            </div>

            <div>
              <label htmlFor="divorce-corporate-interests" className="block text-xs font-semibold text-zinc-700 mb-1">
                Business Interests & Corporate Shares / 公司股权或商业投资利益
              </label>
              <textarea
                id="divorce-corporate-interests"
                rows={2}
                value={corporateInterests}
                onChange={(e) => setCorporateInterests(e.target.value)}
                placeholder="e.g. 50% shares in ABC Trading Ltd., private holding company…"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none transition-[border-color,box-shadow] duration-150 ease-out resize-y"
              />
            </div>

            <div>
              <label htmlFor="divorce-excluded-property" className="block text-xs font-semibold text-zinc-700 mb-1">
                Excluded Property Claims (FLA s. 85) / 是否有婚前财产、父母赠与或遗产继承需主张除外财产？
              </label>
              <textarea
                id="divorce-excluded-property"
                rows={2}
                value={excludedPropertyClaims}
                onChange={(e) => setExcludedPropertyClaims(e.target.value)}
                placeholder="e.g. $200k gift from parents towards home purchase, pre-marriage condo in China…"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none transition-[border-color,box-shadow] duration-150 ease-out resize-y"
              />
            </div>

            <div>
              <label htmlFor="divorce-family-debts" className="block text-xs font-semibold text-zinc-700 mb-1">
                Family Debts / 共同债务概况（信用卡、信贷额度、亲友借款等）
              </label>
              <textarea
                id="divorce-family-debts"
                rows={2}
                value={familyDebts}
                onChange={(e) => setFamilyDebts(e.target.value)}
                placeholder="e.g. Line of credit $50k at BMO, vehicle loan $25k…"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none transition-[border-color,box-shadow] duration-150 ease-out resize-y"
              />
            </div>
          </div>
        </div>

        {/* SECTION 6: Spousal Support, Protection & Signature */}
        <div className="space-y-6">
          <div className="border-b border-zinc-200 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0B1B48] flex items-center gap-2 text-balance">
              <span className="w-6 h-6 rounded-full bg-[#0B1B48] text-[#FFC107] inline-flex items-center justify-center text-xs font-mono tabular-nums shrink-0">
                6
              </span>
              {t.sec6}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="divorce-spousal-support" className="block text-xs font-semibold text-zinc-700 mb-1">
                Spousal Support Claim / 是否主张配偶赡养费？
              </label>
              <select
                id="divorce-spousal-support"
                value={spousalSupportClaim}
                onChange={(e) => setSpousalSupportClaim(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 text-sm bg-white cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none transition-[border-color,box-shadow] duration-150 ease-out"
              >
                <option value="Undecided 待律师评估">Undecided 待律师评估</option>
                <option value="Yes (I am seeking spousal support) 主张要求对方支付">
                  Yes (Seeking spousal support) 要求对方支付
                </option>
                <option value="No (Mutual waiver expected) 双方各自放弃">
                  No (Mutual waiver expected) 双方各自放弃
                </option>
              </select>
            </div>

            <div>
              <label htmlFor="divorce-urgent-protection" className="block text-xs font-semibold text-zinc-700 mb-1">
                Urgent Order Needed? (FLA s. 91) / 是否需紧急申请保护令或资产冻结令？
              </label>
              <select
                id="divorce-urgent-protection"
                value={urgentProtectionOrder}
                onChange={(e) => setUrgentProtectionOrder(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-900 text-sm bg-white cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none transition-[border-color,box-shadow] duration-150 ease-out"
              >
                <option value="No 否（常规协商/诉讼）">No 否（常规协商/诉讼）</option>
                <option value="Yes 是（存在转移财产或人身安全紧急风险）">
                  Yes 是（存在转移隐匿财产或人身安全紧急风险）
                </option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="divorce-additional-notes" className="block text-xs font-semibold text-zinc-700 mb-1">
                Additional Notes / Key Objectives / 核心诉求与补充说明
              </label>
              <textarea
                id="divorce-additional-notes"
                rows={3}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="What are your main goals (e.g., amicable uncontested divorce, child custody focus, protecting business assets)?"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:border-[#0B1B48] focus-visible:outline-none transition-[border-color,box-shadow] duration-150 ease-out resize-y text-pretty"
              />
            </div>
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Supporting Documents / 相关文件（结婚证复印件、协议草案、判决书等，选填）
            </label>
            <div className="border border-zinc-300 rounded-xl p-4 bg-zinc-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-300 hover:border-[#0B1B48] focus-within:ring-2 focus-within:ring-[#0B1B48] active:scale-[0.96] rounded-lg text-xs font-semibold text-zinc-800 transition-[background-color,border-color,box-shadow,transform] duration-150 ease-out shadow-xs">
                <Upload className="w-4 h-4 text-[#0B1B48] shrink-0" strokeWidth={2} aria-hidden="true" />
                <span>{lang === "en" ? "Select Documents" : "选择文件"}</span>
                <input
                  type="file"
                  multiple
                  aria-label={lang === "en" ? "Upload supporting documents" : "上传相关文件"}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <div className="text-xs text-zinc-600 text-center sm:text-right text-pretty">
                {files.length === 0
                  ? lang === "en"
                    ? "No files selected (Optional)"
                    : "未选择文件（可选）"
                  : `${files.length} file(s): ${files.map((f) => f.name).join(", ")}`}
              </div>
            </div>
          </div>

          {/* Signature */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Client Signature / 委托人电子签名 <span className="text-red-500">*</span>
            </label>
            <SignaturePad
              onChange={(dataUrl) => setSignatureDataUrl(dataUrl)}
              clearLabel={t.clearSign}
              placeholder={t.signPlaceholder}
              required
            />
          </div>

          <div className="p-4 rounded-xl bg-zinc-100 border border-zinc-200 text-xs text-zinc-600 leading-relaxed text-pretty">
            <p className="font-semibold text-zinc-800 mb-1">
              ⚖️ Solicitor-Client Privilege Notice / 律师保密特权说明
            </p>
            {lang === "en"
              ? "All information provided in this questionnaire is transmitted under strict solicitor-client confidence. Submitting this questionnaire does not create a formal retainer until mutually confirmed in writing by Avid Law Corporation."
              : "您在问卷中所填写的全部内容受律师执业保密特权严格保护。提交本问卷不构成正式聘用，直至双方签署正式代理协议（Retainer Agreement）。"}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-xl bg-[#0B1B48] text-[#FFC107] font-bold text-base shadow-lg shadow-[#0B1B48]/20 hover:bg-[#132763] hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-[background-color,box-shadow,transform] duration-150 ease-out flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin shrink-0" strokeWidth={2} aria-hidden="true" />
                <span>{t.submittingBtn}</span>
              </>
            ) : (
              <span>{t.submitBtn}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
