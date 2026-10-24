"use client";

import React, { useState } from "react";
import SignaturePad from "@/components/SignaturePad";
import { CheckCircle2, AlertCircle, Upload, Loader2, Building2, User, ShieldCheck } from "lucide-react";

interface ConsultationFormProps {
  initialLang?: "en" | "zh";
  onSuccess?: () => void;
}

export default function ConsultationForm({ initialLang = "en" }: ConsultationFormProps) {
  const [lang, setLang] = useState<"en" | "zh">(initialLang);

  // Form states
  const [entityType, setEntityType] = useState<"individual" | "company">("individual");
  const [sameAsRegistered, setSameAsRegistered] = useState(false);

  // Individual fields
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");

  // Company fields
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [operatingAddress, setOperatingAddress] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [contactPersonPhone, setContactPersonPhone] = useState("");
  const [corporateEmail, setCorporateEmail] = useState("");

  // Common consultation fields
  const [consultationLang, setConsultationLang] = useState("Mandarin 普通话");
  const [consultationAvailability, setConsultationAvailability] = useState("");
  const [consultationMethod, setConsultationMethod] = useState("In-Person 面谈");
  const [inquiryDescription, setInquiryDescription] = useState("");

  // Conflict of interest
  const [hasOpposingParty, setHasOpposingParty] = useState<"no" | "yes">("no");
  const [opposingPartyName, setOpposingPartyName] = useState("");
  const [opposingPartyDob, setOpposingPartyDob] = useState("");

  // Files & Signature
  const [files, setFiles] = useState<File[]>([]);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = {
    formTitle: lang === "en" ? "Consultation Booking Form" : "咨询服务预约表",
    formSubtitle:
      lang === "en"
        ? "Please complete this intake form so our legal team can perform mandatory Law Society conflict checks and schedule your initial consultation."
        : "请填写此预约登记表，以便我们进行卑诗省律师公会要求的利益冲突检索，并为您安排专属律师咨询。",
    langToggleEn: "English Form",
    langToggleZh: "中文表格",
    sec1Title:
      lang === "en"
        ? "1. Client & Entity Information"
        : "1. 委托主体与联系方式",
    entityTypeLabel:
      lang === "en"
        ? "Are you representing an individual or a company?"
        : "代表个人还是企业？",
    individual: lang === "en" ? "Individual (个人)" : "个人 (Individual)",
    company: lang === "en" ? "Company (企业)" : "企业 (Company)",
    clientName: lang === "en" ? "Full Name" : "客户全名",
    address: lang === "en" ? "Residential Address" : "居住地址",
    phone: lang === "en" ? "Phone Number" : "电话号码",
    email: lang === "en" ? "Email Address" : "电子邮箱",
    occupation: lang === "en" ? "Occupation (Optional)" : "职业（选填）",

    companyName: lang === "en" ? "Company Legal Name" : "企业法定名称",
    contactPerson: lang === "en" ? "Authorized Contact Person" : "授权联系人姓名",
    registeredAddress: lang === "en" ? "Registered Office Address" : "企业注册地址",
    operatingAddress: lang === "en" ? "Business Operating Address" : "企业实际营业地址",
    sameAsRegistered:
      lang === "en"
        ? "Same as registered office address"
        : "与注册地址相同",
    companyPhone: lang === "en" ? "Company Phone Number" : "企业办公电话",
    contactPersonPhone:
      lang === "en" ? "Contact Person Direct Phone" : "联系人直接电话",
    corporateEmail: lang === "en" ? "Corporate Email Address" : "企业电子邮箱",

    sec2Title:
      lang === "en" ? "2. Consultation Preferences" : "2. 咨询偏好与事项描述",
    consultLangLabel:
      lang === "en" ? "Preferred Language for Consultation" : "咨询语言偏好",
    availLabel:
      lang === "en"
        ? "Preferred Consultation Availability (Date & Time Slots)"
        : "您方便的咨询时间（建议提供 2-3 个日期与时段）",
    availPlaceholder:
      lang === "en"
        ? "e.g., Next Tuesday afternoon after 2 PM, or Thursday morning"
        : "例如：下周二下午 2:00 之后，或周四上午 10:00",
    methodLabel:
      lang === "en" ? "Preferred Consultation Method" : "选择您希望的咨询方式",
    methodInPerson: lang === "en" ? "In-Person (Richmond Office)" : "面谈（列治文办公室）",
    methodPhone: lang === "en" ? "Telephone" : "电话咨询",
    methodVideo: lang === "en" ? "Video Conference (Zoom / Teams)" : "视频会议（Zoom / Teams）",
    inquiryLabel:
      lang === "en"
        ? "Brief Description of Your Legal Inquiry"
        : "您希望咨询的简要内容或案情概述",
    inquiryPlaceholder:
      lang === "en"
        ? "Please briefly describe the nature of your transaction, agreement, or legal issue..."
        : "请简要阐述您所涉及的法律事务类型、交易背景或核心诉求...",

    sec3Title:
      lang === "en"
        ? "3. Mandatory Conflict of Interest Check"
        : "3. 利益冲突排查（律师公会强制要求）",
    conflictQuestion:
      lang === "en"
        ? "Is there an opposing party, adverse party, or other side in this matter?"
        : "本事务是否涉及对立方、争议相对人或交易对手方？",
    yes: lang === "en" ? "Yes (涉及对立方)" : "是 (涉及对立方)",
    no: lang === "en" ? "No (不涉及对立方 / 单方事务)" : "否 (不涉及对立方 / 单方事务)",
    opposingName:
      lang === "en"
        ? "Opposing Party Full Name (Individual or Corporate Entity)"
        : "对立方全称（个人姓名或公司全称）",
    opposingDob:
      lang === "en"
        ? "Opposing Party Date of Birth (If known)"
        : "对立方出生日期（若知晓，用于精准排查）",

    sec4Title:
      lang === "en"
        ? "4. Supporting Documents & Signature"
        : "4. 相关文件与客户签字",
    filesLabel:
      lang === "en"
        ? "Supporting Documents (Optional, up to 3 files, max 10MB total: PDF, Word, JPG, PNG)"
        : "相关附件（选填，最多 3 个文件，总计不超过 10MB：支持 PDF、Word、图片）",
    signatureLabel: lang === "en" ? "Client Signature" : "客户法定签字",
    clearSign: lang === "en" ? "Clear Signature" : "清除重签",
    signPlaceholder:
      lang === "en"
        ? "Sign your legal signature above using your finger, stylus, or mouse"
        : "请在此处使用手指、触控笔或鼠标签署您的法定签名",
    disclaimer:
      lang === "en"
        ? "Law Society of British Columbia Intake Notice: Submitting this consultation questionnaire is for conflict checking and consultation scheduling purposes only. It does not establish a solicitor-client relationship until a formal written Retainer Agreement is executed with Avid Law Corporation."
        : "卑诗省律师公会登记声明：提交本咨询表仅用于利益冲突检索与咨询安排，在正式签署聘用协议（Retainer Agreement）之前，本提交不构成律师与客户之间的正式委托代理关系。",
    submitBtn: lang === "en" ? "Submit Consultation Request" : "提交预约申请",
    submittingBtn: lang === "en" ? "Submitting Request..." : "正在安全提交...",
    successTitle:
      lang === "en"
        ? "Consultation Request Submitted"
        : "预约申请已成功提交",
    successMsg:
      lang === "en"
        ? "Thank you for contacting Avid Law Corporation. Our intake team has received your information and will perform the required conflict checks before reaching out within 1 business day to confirm your consultation appointment."
        : "感谢您联系安胜 · 弘人律师行。我们的客服团队已收到您的预约信息，将在完成利益冲突排查后，于 1 个工作日内致电或电邮与您确认具体咨询时段。",
    submitAnother: lang === "en" ? "Submit Another Request" : "提交其他预约",
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    if (selected.length > 3) {
      alert(lang === "en" ? "Maximum 3 files allowed." : "最多只能上传 3 个附件。");
      return;
    }
    const totalSize = selected.reduce((acc, f) => acc + f.size, 0);
    if (totalSize > 10 * 1024 * 1024) {
      alert(lang === "en" ? "Total files size exceeds 10MB." : "附件总大小不能超过 10MB。");
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
          : "请在提交前签署您的电子签名。"
      );
      return;
    }

    // Validate required fields
    if (entityType === "individual") {
      if (!clientName.trim() || !address.trim() || !phone.trim() || !email.trim()) {
        setErrorMsg(
          lang === "en"
            ? "Please fill in all required client fields (Name, Address, Phone, Email)."
            : "请完整填写所有必填客户信息（姓名、地址、电话、邮箱）。"
        );
        return;
      }
    } else {
      if (
        !companyName.trim() ||
        !contactPerson.trim() ||
        !registeredAddress.trim() ||
        !companyPhone.trim() ||
        !corporateEmail.trim()
      ) {
        setErrorMsg(
          lang === "en"
            ? "Please fill in all required company fields."
            : "请完整填写所有必填企业信息。"
        );
        return;
      }
    }

    if (!consultationAvailability.trim() || !inquiryDescription.trim()) {
      setErrorMsg(
        lang === "en"
          ? "Please provide your consultation availability and a brief description of inquiry."
          : "请填写您方便的咨询时间及咨询事项简述。"
      );
      return;
    }

    if (hasOpposingParty === "yes" && !opposingPartyName.trim()) {
      setErrorMsg(
        lang === "en"
          ? "Please provide the opposing party's name for conflict check."
          : "请提供对立方名称以完成利益冲突检索。"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Build structured sections for the executive HTML email
      const sections = [
        {
          sectionTitle:
            entityType === "individual"
              ? "Individual Client Details / 个人客户信息"
              : "Corporate Client Details / 企业客户信息",
          rows:
            entityType === "individual"
              ? [
                  { label: "Entity Type / 客户类型", value: "Individual (个人)" },
                  { label: "Client Name / 客户姓名", value: clientName },
                  { label: "Residential Address / 居住地址", value: address },
                  { label: "Phone Number / 电话号码", value: phone },
                  { label: "Email Address / 电子邮箱", value: email },
                  { label: "Occupation / 职业", value: occupation || "Not Provided" },
                ]
              : [
                  { label: "Entity Type / 客户类型", value: "Company (企业)" },
                  { label: "Company Legal Name / 企业法定名称", value: companyName },
                  { label: "Authorized Contact Person / 授权联系人", value: contactPerson },
                  { label: "Registered Office Address / 注册地址", value: registeredAddress },
                  {
                    label: "Operating Address / 实际营业地址",
                    value: sameAsRegistered
                      ? "Same as registered address / 与注册地址相同"
                      : operatingAddress || "Not Provided",
                  },
                  { label: "Company Phone / 企业电话", value: companyPhone },
                  { label: "Contact Phone / 联系人电话", value: contactPersonPhone || companyPhone },
                  { label: "Corporate Email / 企业邮箱", value: corporateEmail },
                ],
        },
        {
          sectionTitle: "Consultation Preferences / 咨询偏好与安排",
          rows: [
            { label: "Preferred Language / 咨询语言偏好", value: consultationLang },
            { label: "Preferred Availability / 方便的咨询时间", value: consultationAvailability },
            { label: "Consultation Method / 期望咨询方式", value: consultationMethod },
            { label: "Inquiry Description / 案情或咨询简述", value: inquiryDescription },
          ],
        },
        {
          sectionTitle: "Law Society Conflict Check / 利益冲突排查",
          rows: [
            {
              label: "Opposing Party Involved? / 是否涉及对立方",
              value: hasOpposingParty === "yes" ? "YES / 涉及对立方" : "NO / 无对立方",
            },
            ...(hasOpposingParty === "yes"
              ? [
                  { label: "Opposing Party Name / 对立方名称", value: opposingPartyName },
                  { label: "Opposing Party DOB / 对立方出生日期", value: opposingPartyDob || "Not Disclosed" },
                ]
              : []),
          ],
        },
      ];

      const formData = new FormData();
      formData.append("formType", "consultation");
      formData.append(
        "formTitle",
        lang === "en"
          ? "Client Consultation Booking Form"
          : "咨询服务预约登记表"
      );
      formData.append(
        "clientName",
        entityType === "individual" ? clientName : `${companyName} (Attn: ${contactPerson})`
      );
      formData.append("clientEmail", entityType === "individual" ? email : corporateEmail);
      formData.append("clientPhone", entityType === "individual" ? phone : companyPhone);
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
        throw new Error(result.error || "Failed to submit form.");
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
    setClientName("");
    setAddress("");
    setPhone("");
    setEmail("");
    setOccupation("");
    setCompanyName("");
    setContactPerson("");
    setRegisteredAddress("");
    setOperatingAddress("");
    setCompanyPhone("");
    setContactPersonPhone("");
    setCorporateEmail("");
    setConsultationAvailability("");
    setInquiryDescription("");
    setHasOpposingParty("no");
    setOpposingPartyName("");
    setOpposingPartyDob("");
    setFiles([]);
    setSignatureDataUrl(null);
    setIsSubmitted(false);
    setErrorMsg(null);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl border border-zinc-200 text-center max-w-2xl mx-auto my-8">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1B48] mb-4">
          {t.successTitle}
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-8 text-sm sm:text-base">
          {t.successMsg}
        </p>

        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 text-left mb-8 space-y-2 text-xs sm:text-sm text-zinc-700">
          <div className="flex justify-between border-b border-zinc-200 pb-2">
            <span className="font-semibold text-zinc-500">
              {lang === "en" ? "Client:" : "客户主体："}
            </span>
            <span className="font-bold text-[#0B1B48]">
              {entityType === "individual" ? clientName : companyName}
            </span>
          </div>
          <div className="flex justify-between border-b border-zinc-200 pb-2">
            <span className="font-semibold text-zinc-500">
              {lang === "en" ? "Contact:" : "联系方式："}
            </span>
            <span>
              {entityType === "individual" ? `${phone} | ${email}` : `${companyPhone} | ${corporateEmail}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-zinc-500">
              {lang === "en" ? "Consultation Mode:" : "咨询方式："}
            </span>
            <span>{consultationMethod}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-lg border border-zinc-300 text-zinc-700 hover:bg-zinc-50 font-medium text-sm transition-colors cursor-pointer"
          >
            {t.submitAnother}
          </button>
          <a
            href={`/${lang === "en" ? "en" : "zh-Hans"}`}
            className="px-6 py-3 rounded-lg bg-[#0B1B48] text-white hover:bg-[#132763] font-medium text-sm transition-colors inline-block"
          >
            {lang === "en" ? "Return to Homepage" : "返回网站首页"}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden max-w-3xl mx-auto my-6">
      {/* Top Banner & Language Switcher */}
      <div className="bg-[#0B1B48] p-6 sm:p-8 text-white relative">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#FFC107] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Avid Law • Client Intake</span>
          </div>

          {/* In-Form Language Toggle */}
          <div className="inline-flex rounded-lg bg-white/15 p-1 border border-white/20">
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                lang === "en"
                  ? "bg-[#FFC107] text-zinc-950 shadow"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {t.langToggleEn}
            </button>
            <button
              type="button"
              onClick={() => setLang("zh")}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                lang === "zh"
                  ? "bg-[#FFC107] text-zinc-950 shadow"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {t.langToggleZh}
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          {t.formTitle}
        </h1>
        <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
          {t.formSubtitle}
        </p>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-10">
        {/* Honeypot field (hidden) */}
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
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{lang === "en" ? "Action Required" : "请完善以下信息"}</p>
              <p>{errorMsg}</p>
            </div>
          </div>
        )}

        {/* SECTION 1: Entity & Contact Info */}
        <div className="space-y-6">
          <div className="border-b border-zinc-200 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0B1B48] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0B1B48] text-[#FFC107] inline-flex items-center justify-center text-xs">
                1
              </span>
              {t.sec1Title}
            </h2>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-zinc-700 mb-2">
              {t.entityTypeLabel} <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-md">
              <button
                type="button"
                onClick={() => setEntityType("individual")}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                  entityType === "individual"
                    ? "border-[#0B1B48] bg-[#0B1B48]/5 text-[#0B1B48] ring-2 ring-[#0B1B48]"
                    : "border-zinc-300 hover:border-zinc-400 text-zinc-600 bg-white"
                }`}
              >
                <User className="w-4 h-4" />
                <span>{t.individual}</span>
              </button>
              <button
                type="button"
                onClick={() => setEntityType("company")}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                  entityType === "company"
                    ? "border-[#0B1B48] bg-[#0B1B48]/5 text-[#0B1B48] ring-2 ring-[#0B1B48]"
                    : "border-zinc-300 hover:border-zinc-400 text-zinc-600 bg-white"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>{t.company}</span>
              </button>
            </div>
          </div>

          {/* Conditional Entity Inputs */}
          {entityType === "individual" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  {t.clientName} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Michael Zhang / 张伟"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-[#0B1B48] focus:border-[#0B1B48] outline-none text-sm transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  {t.address} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, Unit, City, Province, Postal Code"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-[#0B1B48] focus:border-[#0B1B48] outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  {t.phone} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. (604) 123-4567"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-[#0B1B48] focus:border-[#0B1B48] outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  {t.email} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-[#0B1B48] focus:border-[#0B1B48] outline-none text-sm transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  {t.occupation}
                </label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="e.g. Software Engineer, Business Owner, Realtor"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-[#0B1B48] focus:border-[#0B1B48] outline-none text-sm transition-all"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  {t.companyName} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Pacific Holdings Ltd. / 加拿大太平洋控股有限公司"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-[#0B1B48] focus:border-[#0B1B48] outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  {t.contactPerson} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. John Chen (Director)"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-[#0B1B48] focus:border-[#0B1B48] outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  {t.corporateEmail} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={corporateEmail}
                  onChange={(e) => setCorporateEmail(e.target.value)}
                  placeholder="corporate@company.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-[#0B1B48] focus:border-[#0B1B48] outline-none text-sm transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  {t.registeredAddress} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={registeredAddress}
                  onChange={(e) => setRegisteredAddress(e.target.value)}
                  placeholder="Official Registered Office Address in BC Records"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-[#0B1B48] focus:border-[#0B1B48] outline-none text-sm transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-zinc-700">
                    {t.operatingAddress}
                  </label>
                  <label className="inline-flex items-center gap-1.5 text-xs text-zinc-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sameAsRegistered}
                      onChange={(e) => setSameAsRegistered(e.target.checked)}
                      className="rounded border-zinc-300 text-[#0B1B48] focus:ring-[#0B1B48]"
                    />
                    <span>{t.sameAsRegistered}</span>
                  </label>
                </div>
                {!sameAsRegistered && (
                  <input
                    type="text"
                    value={operatingAddress}
                    onChange={(e) => setOperatingAddress(e.target.value)}
                    placeholder="Operating Business Address if different from registered"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-[#0B1B48] focus:border-[#0B1B48] outline-none text-sm transition-all"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  {t.companyPhone} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={companyPhone}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                  placeholder="e.g. (604) 987-6543"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-[#0B1B48] focus:border-[#0B1B48] outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  {t.contactPersonPhone} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={contactPersonPhone}
                  onChange={(e) => setContactPersonPhone(e.target.value)}
                  placeholder="e.g. (778) 555-0199"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-[#0B1B48] focus:border-[#0B1B48] outline-none text-sm transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: Consultation Preferences */}
        <div className="space-y-6">
          <div className="border-b border-zinc-200 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0B1B48] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0B1B48] text-[#FFC107] inline-flex items-center justify-center text-xs">
                2
              </span>
              {t.sec2Title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                {t.consultLangLabel} <span className="text-red-500">*</span>
              </label>
              <select
                value={consultationLang}
                onChange={(e) => setConsultationLang(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-[#0B1B48] focus:border-[#0B1B48] outline-none text-sm bg-white cursor-pointer"
              >
                <option value="Mandarin 普通话">Mandarin 普通话</option>
                <option value="Cantonese 粤语">Cantonese 粤语</option>
                <option value="English 英语">English 英语</option>
                <option value="Korean 韩语">Korean 韩语</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                {t.methodLabel} <span className="text-red-500">*</span>
              </label>
              <select
                value={consultationMethod}
                onChange={(e) => setConsultationMethod(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-[#0B1B48] focus:border-[#0B1B48] outline-none text-sm bg-white cursor-pointer"
              >
                <option value="In-Person (Richmond Office) 面谈（列治文办公室）">
                  {t.methodInPerson}
                </option>
                <option value="Telephone 电话咨询">{t.methodPhone}</option>
                <option value="Video Conference (Zoom / Teams) 视频会议">
                  {t.methodVideo}
                </option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                {t.availLabel} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={consultationAvailability}
                onChange={(e) => setConsultationAvailability(e.target.value)}
                placeholder={t.availPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-[#0B1B48] focus:border-[#0B1B48] outline-none text-sm transition-all"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                {t.inquiryLabel} <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={inquiryDescription}
                onChange={(e) => setInquiryDescription(e.target.value)}
                placeholder={t.inquiryPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-[#0B1B48] focus:border-[#0B1B48] outline-none text-sm transition-all resize-y"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Conflict of Interest */}
        <div className="space-y-6">
          <div className="border-b border-zinc-200 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0B1B48] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0B1B48] text-[#FFC107] inline-flex items-center justify-center text-xs">
                3
              </span>
              {t.sec3Title}
            </h2>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-zinc-700 mb-2">
              {t.conflictQuestion} <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-md">
              <button
                type="button"
                onClick={() => setHasOpposingParty("no")}
                className={`p-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                  hasOpposingParty === "no"
                    ? "border-[#0B1B48] bg-[#0B1B48]/5 text-[#0B1B48] ring-2 ring-[#0B1B48]"
                    : "border-zinc-300 text-zinc-600 bg-white"
                }`}
              >
                {t.no}
              </button>
              <button
                type="button"
                onClick={() => setHasOpposingParty("yes")}
                className={`p-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                  hasOpposingParty === "yes"
                    ? "border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-600"
                    : "border-zinc-300 text-zinc-600 bg-white"
                }`}
              >
                {t.yes}
              </button>
            </div>
          </div>

          {hasOpposingParty === "yes" && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-4 animate-fadeIn">
              <div>
                <label className="block text-xs font-semibold text-zinc-900 mb-1">
                  {t.opposingName} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={opposingPartyName}
                  onChange={(e) => setOpposingPartyName(e.target.value)}
                  placeholder="Full legal name of opposing person or business"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-amber-300 bg-white text-zinc-900 focus:ring-2 focus:ring-amber-500 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-900 mb-1">
                  {t.opposingDob}
                </label>
                <input
                  type="date"
                  value={opposingPartyDob}
                  onChange={(e) => setOpposingPartyDob(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-amber-300 bg-white text-zinc-900 focus:ring-2 focus:ring-amber-500 outline-none text-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTION 4: Attachments & Signature */}
        <div className="space-y-6">
          <div className="border-b border-zinc-200 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0B1B48] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0B1B48] text-[#FFC107] inline-flex items-center justify-center text-xs">
                4
              </span>
              {t.sec4Title}
            </h2>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              {t.filesLabel}
            </label>
            <div className="border border-zinc-300 rounded-xl p-4 bg-zinc-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-300 hover:border-[#0B1B48] rounded-lg text-xs font-semibold text-zinc-800 transition-colors shadow-sm">
                <Upload className="w-4 h-4 text-[#0B1B48]" />
                <span>{lang === "en" ? "Select Files" : "选择文件"}</span>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <div className="text-xs text-zinc-500 text-center sm:text-right">
                {files.length === 0
                  ? lang === "en"
                    ? "No files selected (Optional)"
                    : "未选择任何文件（可选）"
                  : `${files.length} file(s) selected: ${files.map((f) => f.name).join(", ")}`}
              </div>
            </div>
          </div>

          {/* Signature Pad */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              {t.signatureLabel} <span className="text-red-500">*</span>
            </label>
            <SignaturePad
              onChange={(dataUrl) => setSignatureDataUrl(dataUrl)}
              clearLabel={t.clearSign}
              placeholder={t.signPlaceholder}
              required
            />
          </div>

          {/* Law Society Disclaimer */}
          <div className="p-4 rounded-xl bg-zinc-100 border border-zinc-200 text-xs text-zinc-600 leading-relaxed">
            <p className="font-semibold text-zinc-800 mb-1">
              ⚖️ {lang === "en" ? "Legal Notice" : "法律说明"}
            </p>
            {t.disclaimer}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-xl bg-[#0B1B48] text-[#FFC107] font-bold text-base hover:bg-[#132763] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
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
