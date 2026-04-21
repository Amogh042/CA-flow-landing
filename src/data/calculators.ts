import {
  Receipt, Landmark, TrendingDown, PieChart, Users, ShieldCheck,
  Building2, Home, LineChart, Percent, LucideIcon,
} from "lucide-react";

export type Category = {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
};

export const categories: Category[] = [
  { id: "tax", name: "Tax Calculators", icon: Receipt, count: 18 },
  { id: "loan", name: "Loans & EMI", icon: Landmark, count: 12 },
  { id: "depreciation", name: "Depreciation", icon: TrendingDown, count: 8 },
  { id: "ratios", name: "Financial Ratios", icon: PieChart, count: 14 },
  { id: "payroll", name: "Payroll & HR", icon: Users, count: 10 },
  { id: "audit", name: "Audit Tools", icon: ShieldCheck, count: 9 },
  { id: "valuation", name: "Business Valuation", icon: Building2, count: 8 },
  { id: "realestate", name: "Real Estate", icon: Home, count: 7 },
  { id: "investment", name: "Investment Tools", icon: LineChart, count: 8 },
  { id: "gst", name: "GST/VAT Tools", icon: Percent, count: 10 },
];

export type Calc = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: LucideIcon;
  pro?: boolean;
};

export const calculators: Calc[] = [
  { id: "income-tax", name: "Income Tax Calculator", description: "Estimate annual tax liability across slabs.", category: "tax", icon: Receipt },
  { id: "emi", name: "EMI Calculator", description: "Monthly installment for any loan amount.", category: "loan", icon: Landmark },
  { id: "gst", name: "GST Calculator", description: "Inclusive & exclusive GST breakdown.", category: "gst", icon: Percent },
  { id: "sip", name: "SIP Returns", description: "Project mutual fund SIP growth.", category: "investment", icon: LineChart },
  { id: "slm", name: "Straight-Line Depreciation", description: "Annual depreciation on fixed assets.", category: "depreciation", icon: TrendingDown },
  { id: "current-ratio", name: "Current Ratio", description: "Short-term liquidity health check.", category: "ratios", icon: PieChart },
  { id: "payroll", name: "Gross to Net Payroll", description: "Compute take-home after deductions.", category: "payroll", icon: Users, pro: true },
  { id: "dcf", name: "DCF Valuation", description: "Discounted cash-flow enterprise value.", category: "valuation", icon: Building2, pro: true },
  { id: "rental-yield", name: "Rental Yield", description: "Gross & net yield on properties.", category: "realestate", icon: Home },
  { id: "audit-sampling", name: "Audit Sampling Size", description: "Statistical sample size for audits.", category: "audit", icon: ShieldCheck, pro: true },
  { id: "compound", name: "Compound Interest", description: "Grow principal over time with compounding.", category: "investment", icon: LineChart },
  { id: "hra", name: "HRA Exemption", description: "House-rent allowance tax exemption.", category: "tax", icon: Receipt },
];

export const countries = [
  { code: "IN", flag: "🇮🇳", name: "India" },
  { code: "GB", flag: "🇬🇧", name: "United Kingdom" },
  { code: "US", flag: "🇺🇸", name: "United States" },
  { code: "AE", flag: "🇦🇪", name: "UAE" },
  { code: "DE", flag: "🇩🇪", name: "Germany" },
  { code: "SG", flag: "🇸🇬", name: "Singapore" },
  { code: "AU", flag: "🇦🇺", name: "Australia" },
];
