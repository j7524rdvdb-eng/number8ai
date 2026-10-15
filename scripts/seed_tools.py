# One-off seed script used to create data/tools.json (edit tools.json directly from now on).
import json
T=[]
def t(id,name,url,cat,desc,pricing="See site",nz="",nzMade=False):
    T.append(dict(id=id,name=name,url=url,category=cat,description=desc,pricing=pricing,nzNotes=nz,nzMade=nzMade,lastChecked="2026-10-15"))
# Accounting
t("xero-jax","Xero (JAX)","https://www.xero.com/nz/ai-in-accounting/jax/","accounting","Cloud accounting with JAX, an AI companion that answers money questions, drafts quotes and invoices and helps with day-to-day bookkeeping.","JAX features listed as included with Xero plans; one-month-free offer shown on site. See site for plan prices.","NZ-made — founded in Wellington.",True)
t("dext","Dext","https://dext.com/","accounting","AI-powered capture of receipts, bills and invoices, with the data pushed straight into your books.","Free trial; see site for NZ pricing.","Integrates with Xero.")
t("lightyear","Lightyear","https://www.lightyear.cloud/","accounting","AI accounts-payable automation: extracts line items from supplier bills, codes them and syncs them to your accounting software.","Free trial; see site.","Integrates with Xero (listed on the Xero App Store NZ).")
t("spotlight","Spotlight Reporting","https://www.spotlightreporting.com/","accounting","Management reporting, dashboards and cash-flow forecasting, with AI-assisted report commentary.","Free trial; see site.","NZ-made — founded in Wellington. Integrates with Xero.",True)
t("aider","Aider","https://www.aider.ai/","accounting","AI platform for accountants and bookkeepers that automates period close, flags anomalies and produces AI management reports for clients.","From NZ$150/month minimum + GST, 12-month commitment (as stated on site).","NZ-made — based in Takapuna, Auckland. Connects to Xero; NZD pricing.",True)
# Marketing
t("canva","Canva","https://www.canva.com/","marketing","Design platform with Canva AI for generating images, copy and on-brand social graphics.","Free to get started; paid plans — see site.")
t("buffer","Buffer","https://buffer.com/","marketing","Schedule social posts and create, refine and repurpose captions with Buffer's AI Assistant.","Free forever plan available (as stated on site).")
t("hootsuite","Hootsuite","https://www.hootsuite.com/","marketing","Social media management with built-in AI tools for writing posts and planning content.","Free trial; see site.")
t("mailchimp","Mailchimp","https://mailchimp.com/","marketing","Email and SMS marketing with AI tools to help write and optimise campaigns.","Free plan and free trial mentioned on site; see site for pricing.")
t("ocoya","Ocoya","https://www.ocoya.com/","marketing","AI-generated social posts, captions and graphics, plus scheduling across your channels.","From $29/month, free trial (as shown on site).")
t("blaze","Blaze","https://www.blaze.ai/","marketing","AI marketing assistant that plans and creates on-brand content for small businesses.","Free trial; software from $79/month (as shown on site).")
t("yabble","Yabble","https://www.yabble.com/","marketing","AI market research — test ideas on virtual audiences and turn customer feedback into insights fast.","From US$800/month (as stated on site).","NZ-made — Auckland-based.",True)
# Customer service
t("tidio","Tidio","https://www.tidio.com/","customer-service","Live chat plus Lyro, an AI agent that answers customer questions on your website.","Free to start; free trial available.")
t("intercom-fin","Intercom (Fin)","https://www.intercom.com/","customer-service","Customer service platform with Fin, an AI agent that resolves customer questions across chat and email.","From $19 per seat/month + $0.99 per Fin outcome (as shown on site); free trial.")
t("chatbase","Chatbase","https://www.chatbase.co/","customer-service","Build an AI support agent trained on your own website, FAQs and documents.","Free trial; see site.")
t("zendesk","Zendesk","https://www.zendesk.com/","customer-service","AI-powered help desk for handling customer enquiries across email, chat and phone.","14-day free trial (as stated on site).")
# Writing
t("chatgpt","ChatGPT","https://chatgpt.com/","writing","General-purpose AI assistant for writing, research, analysis and brainstorming.","Free to sign up; paid plans — see site.")
t("claude","Claude","https://claude.ai/","writing","AI assistant for writing, analysing documents and working through complex tasks.","See site")
t("gemini","Google Gemini","https://gemini.google.com/","writing","Google's AI assistant for writing, research and planning.","See site")
t("m365-copilot","Microsoft 365 Copilot","https://www.microsoft.com/en-nz/microsoft-365/copilot","writing","AI assistant that works alongside Microsoft 365 apps for documents, email and meetings.","See site")
t("grammarly","Grammarly","https://www.grammarly.com/","writing","AI writing help for clear, professional emails, proposals and documents.","Free plan — $0 USD/month (as shown on site).")
t("perplexity","Perplexity","https://www.perplexity.ai/","writing","AI answer engine that searches the web and cites its sources.","See site")
t("jasper","Jasper","https://www.jasper.ai/","writing","AI marketing content platform for producing on-brand copy at scale.","Free trial; see site.")
# Design
t("firefly","Adobe Firefly","https://firefly.adobe.com/","design","Adobe's generative AI studio for creating images, video and audio from prompts.","See site")
t("photoroom","Photoroom","https://www.photoroom.com/","design","AI product photos: instant background removal and studio-quality listing images.","Free to start; free trial available.")
t("descript","Descript","https://www.descript.com/","design","Edit video and podcasts by editing the transcript, with AI voices and clean-up tools.","Free plan, no credit card required (as stated on site).")
# Scheduling
t("timely","Timely","https://www.gettimely.com/features/ai-smart-automations/","scheduling","Salon, spa and beauty booking software with AI smart automations such as AI-written client texts.","See site","NZ-made — founded in Dunedin.",True)
t("calendly","Calendly","https://calendly.com/","scheduling","Online appointment scheduling with AI meeting tools.","Free to get started; see site.")
t("reclaim","Reclaim.ai","https://reclaim.ai/","scheduling","AI calendar that automatically schedules your tasks, habits and meetings around each other.","Free forever plan (as stated on site).")
# Sales
t("hubspot","HubSpot","https://www.hubspot.com/","sales-crm","CRM for sales, marketing and service with the Breeze AI assistant.","Free tools available; paid plans — see site.")
t("pipedrive","Pipedrive","https://www.pipedrive.com/","sales-crm","Easy-to-use sales CRM with AI features to cut down meeting and sales admin.","14-day free trial, no credit card required (as stated on site).")
# Trades
t("tradify","Tradify","https://www.tradifyhq.com/nz/features/smarttools","trades","Job management for tradies with SmartTools AI — reads supplier bills from photos and writes quote and invoice descriptions.","14-day free trial; see site for plans.","NZ-made. Integrates with Xero.",True)
t("fergus","Fergus","https://fergus.com/nz/assistant/","trades","Job management for trades businesses with Fergus Assistant — create jobs, quotes and invoices by talking or typing.","Free trial; see site.","NZ-made — Auckland-based, with NZ support team.",True)
t("servicem8","ServiceM8","https://www.servicem8.com/","trades","Job management app for trade and service businesses, with AI features for quotes, notes and invoices.","Free trial; see site.","Integrates with Xero.")
# Hospitality
t("nowbookit-sadie","Now Book It (Sadie)","https://www.nowbookit.com/solutions/restaurant-ai-receptionist-sadie/","hospitality","Restaurant reservations with Sadie, an AI phone receptionist that takes, changes and cancels bookings 24/7.","See site","Operates in NZ with an NZ subsidiary (Now Book It Limited, Auckland).")
t("deputy","Deputy","https://www.deputy.com/","hospitality","Rostering, timesheets and HR for shift-based teams, with AI to help build schedules.","Free to start; see site.")
t("sevenrooms","SevenRooms","https://sevenrooms.com/","hospitality","Reservations, guest CRM and marketing for restaurants, with Voice AI for call-in bookings.","See site")
# Retail
t("shopify","Shopify (Sidekick)","https://www.shopify.com/nz","retail","E-commerce platform with Sidekick, an AI assistant that helps you run and grow your online store.","Free to start; see site for plans.")
t("cin7","Cin7","https://www.cin7.com/","retail","Inventory and order management with ForesightAI demand forecasting and replenishment.","Free trial; see site.","NZ-made — Auckland-based. Integrates with Xero.",True)
t("unleashed","Unleashed","https://www.unleashedsoftware.com/","retail","Inventory management with AI demand forecasting and plain-English AI reporting.","14-day free trial, no credit card needed (as stated on site).","NZ-made — founded in Auckland. Integrates with Xero.",True)
t("rocketspark","Rocketspark","https://www.rocketspark.com/nz/","retail","Website builder with Flint AI to draft pages, write content and improve SEO.","See site","NZ-made website builder (as stated on site).",True)
# Admin
t("otter","Otter.ai","https://otter.ai/","admin","AI meeting agent that takes notes, transcribes and summarises your meetings.","Free Basic plan; Business from $19.99/user/month (as shown on site).")
t("fathom","Fathom","https://www.fathom.ai/","admin","AI notetaker that records, transcribes and summarises your calls.","Free forever plan (as stated on site).")
t("zapier","Zapier","https://zapier.com/","admin","Automate workflows between thousands of apps, with AI steps and agents.","Free to start; see site.")
t("notion-ai","Notion AI","https://www.notion.com/product/ai","admin","Notes, docs and wikis with AI built in to search, summarise and write.","See site")
t("fyxer","Fyxer","https://www.fyxer.com/","admin","AI email assistant that organises your inbox, drafts replies and takes meeting notes.","14-day free trial (as stated on site).")
# Legal / HR
t("employment-hero","Employment Hero","https://employmenthero.com/nz/","legal-hr","AI-powered HR, payroll, hiring and rostering in one platform.","See site","Has a dedicated New Zealand product and site.")
t("payhero","PayHero","https://www.payhero.co.nz/","legal-hr","Payroll and time tracking, with a Claude AI connector so you can ask questions about your payroll in plain English.","14-day free trial (as stated on site).","NZ-made payroll software (by FlexiTime). Integrates with Xero.",True)
t("spellbook","Spellbook","https://www.spellbook.com/","legal-hr","AI contract drafting and review for lawyers and businesses.","7-day free trial (as stated on site).")
t("vxt","VXT","https://www.vxt.ai/","legal-hr","Phone system with AI call notes and summaries, built for lawyers and professional services.","See site","NZ-made — NZ startup (NZVC portfolio company).",True)
json.dump(T,open('data/tools.json','w'),indent=2,ensure_ascii=False)
print(len(T),'tools;',sum(x['nzMade'] for x in T),'NZ-made')
