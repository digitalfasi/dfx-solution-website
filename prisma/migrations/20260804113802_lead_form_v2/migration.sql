-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'MEETING_BOOKED', 'PROPOSAL_SENT', 'NEGOTIATION', 'WON', 'LOST', 'SPAM');

-- CreateEnum
CREATE TYPE "LeadPriority" AS ENUM ('HOT', 'WARM', 'COLD');

-- CreateEnum
CREATE TYPE "PrimaryService" AS ENUM ('WEBSITE_DEVELOPMENT', 'META_ADS', 'GOOGLE_ADS', 'SEO', 'SOCIAL_MEDIA_MARKETING', 'AI_AUTOMATION', 'CRM_DEVELOPMENT', 'CUSTOM_SOFTWARE_DEVELOPMENT', 'SAAS_DEVELOPMENT', 'BRANDING', 'MULTIPLE_SERVICES', 'NOT_SURE');

-- CreateEnum
CREATE TYPE "Industry" AS ENUM ('HEALTHCARE_HOSPITAL', 'DENTAL_CLINIC', 'EDUCATION', 'REAL_ESTATE', 'ECOMMERCE', 'RETAIL', 'RESTAURANT_CAFE', 'MANUFACTURING', 'LEATHER_INDUSTRY', 'JEWELLERY', 'FINANCE', 'TRAVEL_TOURISM', 'CONSTRUCTION', 'AUTOMOBILE', 'TECHNOLOGY', 'OTHER');

-- CreateEnum
CREATE TYPE "CompanySize" AS ENUM ('JUST_STARTED', 'SIZE_1_10', 'SIZE_11_50', 'SIZE_51_200', 'SIZE_200_PLUS');

-- CreateEnum
CREATE TYPE "MarketingBudget" AS ENUM ('UNDER_25K', 'RANGE_25K_50K', 'RANGE_50K_1L', 'RANGE_1L_3L', 'ABOVE_3L', 'NOT_DECIDED');

-- CreateEnum
CREATE TYPE "PrimaryGoal" AS ENUM ('GENERATE_MORE_LEADS', 'INCREASE_SALES', 'BUILD_PREMIUM_WEBSITE', 'IMPROVE_SEO', 'RUN_META_ADS', 'RUN_GOOGLE_ADS', 'AI_AUTOMATION', 'CRM_DEVELOPMENT', 'SAAS_DEVELOPMENT', 'BRAND_AWARENESS', 'NEED_COMPLETE_GROWTH_STRATEGY');

-- CreateEnum
CREATE TYPE "Timeline" AS ENUM ('IMMEDIATELY', 'WITHIN_1_MONTH', 'WITHIN_3_MONTHS', 'JUST_EXPLORING');

-- CreateEnum
CREATE TYPE "HearAboutUs" AS ENUM ('GOOGLE_SEARCH', 'INSTAGRAM', 'FACEBOOK', 'LINKEDIN', 'REFERRAL', 'YOUTUBE', 'WHATSAPP', 'EXISTING_CLIENT', 'OTHER');

-- CreateEnum
CREATE TYPE "ProjectBudget" AS ENUM ('UNDER_50K', 'RANGE_50K_1L', 'RANGE_1L_3L', 'RANGE_3L_5L', 'ABOVE_5L', 'NEED_RECOMMENDATION');

-- CreateEnum
CREATE TYPE "LeadActivityType" AS ENUM ('CREATED', 'STATUS_CHANGED', 'NOTE_ADDED', 'CALL_LOGGED', 'EMAIL_SENT', 'FOLLOW_UP_SCHEDULED');

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL DEFAULT '+91',
    "company" TEXT NOT NULL,
    "website" TEXT,
    "industry" "Industry" NOT NULL,
    "primaryService" "PrimaryService" NOT NULL,
    "companySize" "CompanySize" NOT NULL,
    "marketingBudget" "MarketingBudget" NOT NULL,
    "primaryGoal" "PrimaryGoal" NOT NULL,
    "timeline" "Timeline" NOT NULL,
    "hearAboutUs" "HearAboutUs" NOT NULL,
    "projectBudget" "ProjectBudget" NOT NULL,
    "message" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "leadScore" INTEGER NOT NULL DEFAULT 0,
    "priority" "LeadPriority" NOT NULL DEFAULT 'COLD',
    "source" TEXT,
    "medium" TEXT,
    "campaign" TEXT,
    "term" TEXT,
    "content" TEXT,
    "gclid" TEXT,
    "fbclid" TEXT,
    "landingPage" TEXT,
    "referrer" TEXT,
    "browser" TEXT,
    "device" TEXT,
    "os" TEXT,
    "screenResolution" TEXT,
    "timezone" TEXT,
    "language" TEXT,
    "country" TEXT,
    "city" TEXT,
    "ipAddress" TEXT,
    "clientId" TEXT,
    "sessionId" TEXT,
    "clientRequestId" TEXT,
    "assignedTo" TEXT,
    "followUpDate" TIMESTAMP(3),
    "proposalSentAt" TIMESTAMP(3),
    "invoiceSentAt" TIMESTAMP(3),
    "closedAt" TIMESTAMP(3),

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lead_notes" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lead_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "call_logs" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "outcome" TEXT,
    "notes" TEXT,
    "calledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,

    CONSTRAINT "call_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lead_activities" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "type" "LeadActivityType" NOT NULL,
    "description" TEXT NOT NULL,
    "metadata" JSONB,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lead_activities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "leads_leadId_key" ON "leads"("leadId");

-- CreateIndex
CREATE UNIQUE INDEX "leads_clientRequestId_key" ON "leads"("clientRequestId");

-- CreateIndex
CREATE INDEX "leads_email_idx" ON "leads"("email");

-- CreateIndex
CREATE INDEX "leads_phone_idx" ON "leads"("phone");

-- CreateIndex
CREATE INDEX "leads_status_idx" ON "leads"("status");

-- CreateIndex
CREATE INDEX "leads_priority_idx" ON "leads"("priority");

-- CreateIndex
CREATE INDEX "leads_createdAt_idx" ON "leads"("createdAt");

-- CreateIndex
CREATE INDEX "lead_notes_leadId_idx" ON "lead_notes"("leadId");

-- CreateIndex
CREATE INDEX "call_logs_leadId_idx" ON "call_logs"("leadId");

-- CreateIndex
CREATE INDEX "lead_activities_leadId_idx" ON "lead_activities"("leadId");

-- AddForeignKey
ALTER TABLE "lead_notes" ADD CONSTRAINT "lead_notes_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "call_logs" ADD CONSTRAINT "call_logs_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_activities" ADD CONSTRAINT "lead_activities_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;
