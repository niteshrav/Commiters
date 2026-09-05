import { isMongoConnected } from "../cms/config/database";
import { Lead } from "../models/Lead";
import {
  buildB2bLeadCard,
  companyDomainFromEmail,
  type LeadInterest,
  type LeadNextAction,
  type LeadSource,
  type LeadStatus,
} from "./b2bLeadCard";

export type InternalLeadInput = {
  source: LeadSource;
  name: string;
  email: string;
  serviceNeeded?: string;
  message?: string;
  submittedAt: Date;
};

export type InternalLeadRecord = {
  status: LeadStatus;
  source: LeadSource;
  name: string;
  email: string;
  companyDomain: string;
  interest: LeadInterest;
  suggestedNextAction: LeadNextAction;
  serviceNeeded: string;
  message: string;
  submittedAt: Date;
};

export type InternalLeadRow = {
  id: string;
  status: LeadStatus;
  source: LeadSource;
  name: string;
  email: string;
  companyDomain: string;
  interest: LeadInterest;
  suggestedNextAction: LeadNextAction;
  serviceNeeded: string;
  message: string;
  submittedAt: string;
  createdAt: string;
};

export function buildInternalLeadRecord(input: InternalLeadInput): InternalLeadRecord {
  const email = input.email.trim().toLowerCase();
  const card = buildB2bLeadCard({
    email,
    serviceNeeded: input.serviceNeeded,
    source: input.source,
  });

  return {
    status: "NEW",
    source: input.source,
    name: input.name.trim(),
    email,
    companyDomain: card.companyDomain || companyDomainFromEmail(email),
    interest: card.interest,
    suggestedNextAction: card.suggestedNextAction,
    serviceNeeded: input.serviceNeeded ?? "",
    message: input.message ?? "",
    submittedAt: input.submittedAt,
  };
}

export async function saveInternalLead(input: InternalLeadInput): Promise<InternalLeadRecord | null> {
  if (!isMongoConnected()) return null;

  const record = buildInternalLeadRecord(input);
  await Lead.create(record);
  return record;
}

export async function listInternalLeads(): Promise<InternalLeadRow[]> {
  if (!isMongoConnected()) {
    throw new Error("MongoDB is not connected.");
  }

  const docs = await Lead.find().sort({ createdAt: -1 }).lean();
  return docs.map((doc) => ({
    id: String(doc._id),
    status: doc.status,
    source: doc.source,
    name: doc.name,
    email: doc.email,
    companyDomain: doc.companyDomain,
    interest: doc.interest,
    suggestedNextAction: doc.suggestedNextAction,
    serviceNeeded: doc.serviceNeeded,
    message: doc.message,
    submittedAt: new Date(doc.submittedAt).toISOString(),
    createdAt: new Date(doc.createdAt).toISOString(),
  }));
}
