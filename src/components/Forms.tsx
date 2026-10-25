"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import NavBar from "./NavBar";
import ConsultationForm from "./forms/ConsultationForm";
import DivorceQuestionnaireForm from "./forms/DivorceQuestionnaireForm";
import { useTranslation } from "@/context/TranslationContext";
import { CalendarCheck, FileText, Shield, CheckCircle, Clock, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export default function Forms() {
  const { t, locale } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialType = searchParams.get("type") === "divorce" ? "divorce" : "consultation";
  const initialFormLang =
    searchParams.get("lang") === "zh" || locale === "zh-Hans" || locale === "zh-Hant"
      ? "zh"
      : "en";

  const [activeTab, setActiveTab] = useState<"consultation" | "divorce">(initialType);
  const [formLang, setFormLang] = useState<"en" | "zh">(initialFormLang);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "divorce" || type === "consultation") {
      setActiveTab(type);
    }
    const lang = searchParams.get("lang");
    if (lang === "zh" || lang === "en") {
      setFormLang(lang);
    }
  }, [searchParams]);

  const handleTabChange = (tab: "consultation" | "divorce") => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", tab);
    params.set("lang", formLang);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleLangChange = (lang: "en" | "zh") => {
    setFormLang(lang);
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", activeTab);
    params.set("lang", lang);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const isZh = locale === "zh-Hans" || locale === "zh-Hant";

  return (
    <div className="min-h-screen bg-zinc-100/70 text-zinc-900 flex flex-col">
      <NavBar />

      {/* Hero Header */}
      <div className="relative pt-32 pb-20 bg-[#0B1B48] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bigBG.png"
            alt="Background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1B48]/90 via-[#0B1B48] to-[#0B1B48]/95"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-[#FFC107] uppercase tracking-wider mb-4 border border-white/10 shadow-xs">
            <Shield className="w-3.5 h-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
            <span>
              {isZh ? "官方直营 • 严格保密" : "Official Portal • Attorney-Client Privileged"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-4 text-balance">
            {isZh
              ? "客户登记与法定问卷中心"
              : "Client Intake & Legal Questionnaires"}
          </h1>
          <div className="h-1 w-24 bg-[#FFC107] mx-auto mb-6 rounded-full"></div>
          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-pretty font-light">
            {isZh
              ? "在线填写保密预约表格或法庭调查问卷，由安胜 · 弘人律师行资深律师团队直接跟进并安排专属咨询。"
              : "Securely submit your consultation booking or family law intake questionnaire directly to Avid Law Corporation lawyers in Richmond, BC."}
          </p>

          {/* Quick Assurance Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-zinc-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#FFC107] shrink-0" strokeWidth={2} aria-hidden="true" />
              <span>Law Society of BC Compliant</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#FFC107] shrink-0" strokeWidth={2} aria-hidden="true" />
              <span className="tabular-nums">1 Business Day Response</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#FFC107] shrink-0" strokeWidth={2} aria-hidden="true" />
              <span>Richmond Central Office</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main id="main-content" className="container mx-auto px-4 sm:px-6 max-w-5xl -mt-8 relative z-20 flex-grow pb-24">
        {/* Navigation Selector Bar */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-lg border border-zinc-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Form Tabs */}
          <div className="grid grid-cols-2 gap-2 w-full md:w-auto">
            <button
              type="button"
              onClick={() => handleTabChange("consultation")}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none transition-[background-color,color,box-shadow,transform] duration-150 ease-out cursor-pointer ${
                activeTab === "consultation"
                  ? "bg-[#0B1B48] text-[#FFC107] shadow-sm"
                  : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100"
              }`}
            >
              <CalendarCheck className="w-4 h-4 shrink-0" strokeWidth={2} aria-hidden="true" />
              <span>{isZh ? "咨询服务预约表" : "Consultation Booking"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("divorce")}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none transition-[background-color,color,box-shadow,transform] duration-150 ease-out cursor-pointer ${
                activeTab === "divorce"
                  ? "bg-[#0B1B48] text-[#FFC107] shadow-sm"
                  : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100"
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" strokeWidth={2} aria-hidden="true" />
              <span>{isZh ? "离婚/家事法问卷" : "Divorce Questionnaire"}</span>
            </button>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs font-semibold text-zinc-600 mr-1">
              {isZh ? "表格语言：" : "Form Language:"}
            </span>
            <div className="inline-flex rounded-lg bg-zinc-100 p-1 border border-zinc-200">
              <button
                type="button"
                onClick={() => handleLangChange("en")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none transition-[background-color,color,box-shadow,transform] duration-150 ease-out cursor-pointer ${
                  formLang === "en"
                    ? "bg-[#0B1B48] text-white shadow-xs"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                English Form
              </button>
              <button
                type="button"
                onClick={() => handleLangChange("zh")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none transition-[background-color,color,box-shadow,transform] duration-150 ease-out cursor-pointer ${
                  formLang === "zh"
                    ? "bg-[#0B1B48] text-white shadow-xs"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                中文表格
              </button>
            </div>
          </div>
        </div>

        {/* Form Component Rendering */}
        {activeTab === "consultation" ? (
          <ConsultationForm key={`consultation-${formLang}`} initialLang={formLang} />
        ) : (
          <DivorceQuestionnaireForm key={`divorce-${formLang}`} initialLang={formLang} />
        )}

        {/* Contact fallback footer */}
        <div className="mt-12 text-center text-xs text-zinc-600 space-y-2">
          <p className="text-pretty">
            {isZh
              ? "如果您在填写过程中遇到任何问题，欢迎随时致电我所办公室获取人工协助："
              : "Need assistance completing this form? Contact our client services team:"}
          </p>
          <div className="flex items-center justify-center gap-4 text-zinc-800 font-semibold font-mono tabular-nums">
            <a href="tel:+16042737565" className="hover:text-[#FFC107] active:scale-[0.97] transition-[color,transform] duration-150 ease-out flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 shrink-0" strokeWidth={2} aria-hidden="true" /> (604) 273-7565
            </a>
            <span aria-hidden="true">•</span>
            <a href="mailto:info@avid-law.com" className="hover:text-[#FFC107] active:scale-[0.97] transition-[color,transform] duration-150 ease-out">
              info@avid-law.com
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
