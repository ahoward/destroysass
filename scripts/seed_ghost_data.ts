// ghost persona and idea data for seeding the destroysaas board

export type GhostPersona = {
  slug: string;
  email: string;
  display_name: string;
  bio: string;
};

export type GhostIdea = {
  creator_slug: string;
  title: string;
  problem: string;
  description: string;
  monthly_ask: number;
  category: string;
};

export type PledgeSpec = {
  pledger_slug: string;
  idea_index: number;
  amount: number;
};

export type CommentSpec = {
  commenter_slug: string;
  idea_index: number;
  body: string;
};

// --- the 11 ghost personas ---

export const GHOSTS: GhostPersona[] = [
  {
    slug: "restaurant",
    email: "ghost+restaurant@destroysaas.coop",
    display_name: "maria santos",
    bio: "three restaurants in albuquerque. drowning in toast, square, and seven different vendor dashboards.",
  },
  {
    slug: "lawfirm",
    email: "ghost+lawfirm@destroysaas.coop",
    display_name: "james okafor",
    bio: "immigration law practice in denver. clio costs us $89/seat and half the features don't work for solo firms.",
  },
  {
    slug: "ranch",
    email: "ghost+ranch@destroysaas.coop",
    display_name: "sarah coldwell",
    bio: "fourth-generation ranch outside boulder. john deere owns more of our data than we do.",
  },
  {
    slug: "nonprofit",
    email: "ghost+nonprofit@destroysaas.coop",
    display_name: "devon reyes",
    bio: "we feed 2,000 families a month and spend 30% of our time fighting donor management software.",
  },
  {
    slug: "contractor",
    email: "ghost+contractor@destroysaas.coop",
    display_name: "mike petrov",
    bio: "15-person crew doing residential in the front range. scheduling is three whiteboards and a prayer.",
  },
  {
    slug: "clinic",
    email: "ghost+clinic@destroysaas.coop",
    display_name: "dr. anika patel",
    bio: "four-provider family practice. our EHR vendor raised prices 40% and we can't switch without losing a year of records.",
  },
  {
    slug: "studio",
    email: "ghost+studio@destroysaas.coop",
    display_name: "kai brennan",
    bio: "design studio doing brand work for food and beverage clients. notion is our brain and we're terrified of it.",
  },
  {
    slug: "logistics",
    email: "ghost+logistics@destroysaas.coop",
    display_name: "elena vasquez",
    bio: "48 routes daily across northern new mexico. our routing software thinks we're in new jersey.",
  },
  {
    slug: "csa",
    email: "ghost+csa@destroysaas.coop",
    display_name: "tom whitehorse",
    bio: "120-member csa outside taos. managing shares, pickups, and crop planning in spreadsheets.",
  },
  {
    slug: "salon",
    email: "ghost+salon@destroysaas.coop",
    display_name: "priya sharma",
    bio: "two salons in santa fe. between booking software, POS, and inventory, we're paying $1,100/month in SaaS.",
  },
  {
    slug: "hvac",
    email: "ghost+hvac@destroysaas.coop",
    display_name: "robert kim",
    bio: "24 techs in the field. our dispatch system costs $3,200/month and the app crashes every other day.",
  },
];

// --- the 15 ideas ---

export const IDEAS: GhostIdea[] = [
  // [0] near threshold — AI bookkeeping
  {
    creator_slug: "restaurant",
    title: "collectively-owned AI bookkeeping and back-office agents",
    problem:
      "we spend $2,100/month across three locations on quickbooks, bill.com, gusto, and an accountant who still needs us to manually reconcile everything. AI can do 90% of this but every AI bookkeeping startup wants $500/seat/month and locks in our data.",
    description:
      "a cooperatively-owned suite of AI agents that handle invoicing, expense categorization, payroll prep, and compliance checks. the agents learn from the collective — 50 restaurants training shared models means every member's bookkeeping gets smarter. all data stays in the cooperative. no per-seat gouging.",
    monthly_ask: 150,
    category: "finance",
  },
  // [1] near threshold — knowledge base
  {
    creator_slug: "studio",
    title:
      "a knowledge base we actually own — no notion, no confluence, no vendor lock-in",
    problem:
      "our entire company brain lives in notion. eight people, $96/month, and if notion gets acquired or raises prices again we lose everything. we've tried self-hosting wiki tools and they all rot within 6 months because nobody maintains them.",
    description:
      "graph-based knowledge management built for small teams. clean editor, fast search, shared workspaces, zero vendor lock-in. the cooperative maintains it forever — that's the entire point. your company's knowledge doesn't belong to a VC-backed startup that might pivot to AI chatbots next quarter.",
    monthly_ask: 100,
    category: "communication",
  },
  // [2] mid — supply chain
  {
    creator_slug: "restaurant",
    title:
      "supply chain visibility for small businesses — know your suppliers' suppliers",
    problem:
      "when avian flu hit our egg supplier's supplier, we found out when the delivery truck didn't show up. we had zero visibility into our supply chain beyond the guy we write checks to. enterprise tools for this cost $50K/year.",
    description:
      "an AI-powered supply chain monitoring system owned by the businesses using it. members share anonymized supplier information, and the system maps deep-tier dependencies and monitors for disruptions. when one member's supply chain gets hit, everyone gets early warning. 50 restaurants sharing supplier intelligence means nobody gets blindsided.",
    monthly_ask: 100,
    category: "operations",
  },
  // [3] mid — AI negotiation
  {
    creator_slug: "lawfirm",
    title:
      "ai negotiation agents for vendor contracts — collective bargaining for small business",
    problem:
      "every small business negotiates vendor contracts alone. the landlord knows we need the space, the software vendor knows switching costs are brutal, and we lack the data to know if we're getting ripped off. i see it in my clients every day.",
    description:
      "an AI-powered contract negotiation system owned by the cooperative. members upload vendor contracts, leases, and agreements. the AI learns the collective bargaining position across all members — 'your competitor pays 20% less for the same service.' when a member needs to renegotiate, the AI agent handles it with the full cooperative's intelligence behind it.",
    monthly_ask: 125,
    category: "finance",
  },
  // [4] mid — cybersecurity
  {
    creator_slug: "clinic",
    title:
      "cooperatively-owned cybersecurity monitoring — neighborhood watch for hackers",
    problem:
      "our practice handles HIPAA-protected data and we're a constant phishing target. a real security operations center costs $5K-$50K/month. we have nothing except prayers and a firewall from 2019. 43% of cyberattacks target small businesses and the average breach costs $120K.",
    description:
      "shared threat intelligence and monitoring across a cooperative of small businesses. when one member gets phished, all 50 members get alerted and immunized. locally-hosted AI risk assessment keeps data within the cooperative. one security analyst serving 50 businesses instead of each paying for their own. HIPAA/PCI compliance documentation automated.",
    monthly_ask: 200,
    category: "operations",
  },
  // [5] mid — wildfire
  {
    creator_slug: "ranch",
    title:
      "community wildfire early warning — owned by the communities that need it",
    problem:
      "fire insurance tripled in three years. enterprise wildfire monitoring costs $100K/year. our county notification system is a phone tree that's 20 minutes behind reality. by the time we know about a fire, it's already too late to save equipment.",
    description:
      "ultra-lightweight wildfire prediction models running on cheap hardware, feeding community-owned early warning systems. satellite data, weather stations, community sensor networks. cooperative members share data and the models get smarter with every season. insurance companies incentivized to fund it — communities with early warning qualify for lower premiums.",
    monthly_ask: 75,
    category: "operations",
  },
  // [6] mid — route optimization
  {
    creator_slug: "logistics",
    title:
      "route optimization and dispatch that actually works for small delivery companies",
    problem:
      "our routing software is built for UPS-scale operations and costs $3,500/month. it doesn't understand rural new mexico — dirt roads, acequia crossings, customers who aren't home on tuesdays. we need optimization that speaks our language, not manhattan's.",
    description:
      "a natural-language optimization system for small logistics operations. tell it your constraints in plain english: '3 trucks, 47 deliveries, 8-hour driver limits, no highway 14 on fridays.' it solves and gives you maps and instructions. cooperative members share anonymized route data — better models for everyone. costs $100/month, not $3,500.",
    monthly_ask: 100,
    category: "operations",
  },
  // [7] early — precision ag
  {
    creator_slug: "ranch",
    title:
      "precision agriculture co-op — farming by the numbers, owned by farmers",
    problem:
      "john deere owns our tractor data and charges us to access it. precision ag tools cost $15K/year and they're built for 10,000-acre corporate farms, not our 800 acres. we generate data that feeds their models and we get nothing back.",
    description:
      "soil sensors, weather stations, and drone imagery shared across a cooperative of small farms. AI models train on each farm's data without it leaving the farm. edge deployment — 'should i irrigate field 3 today?' runs on your phone, offline, no API costs. collective seed and fertilizer purchasing negotiated as a bloc.",
    monthly_ask: 100,
    category: "operations",
  },
  // [8] early — donor management
  {
    creator_slug: "nonprofit",
    title:
      "donor management and grant tracking that doesn't cost more than a staff position",
    problem:
      "salesforce nonprofit cloud is $48/user/month and requires a consultant to configure. bloomerang is $359/month for basic features. we're a food bank — every dollar on software is a dollar not feeding families. and when the grant deadline hits, we're copy-pasting between four systems.",
    description:
      "donor management, grant tracking, and reporting built for small nonprofits, owned by the nonprofits using it. shared templates for common grants (USDA, HUD, community foundation). cooperative maintenance means the tool evolves based on what nonprofits actually need, not what a VC thinks they should pay for.",
    monthly_ask: 75,
    category: "finance",
  },
  // [9] early — trades dispatch
  {
    creator_slug: "hvac",
    title:
      "shared scheduling and dispatch for trades — HVAC, plumbing, electrical",
    problem:
      "our dispatch system costs $3,200/month, the mobile app crashes constantly, and when a tech calls in sick the whole schedule falls apart. built for national chains, not a 24-person shop.",
    description:
      "scheduling, dispatch, and job tracking built for trades companies, owned collectively. AI-optimized routing saves fuel. shared parts inventory across cooperative members — 'who has a 3-ton Carrier condenser in stock?' no per-tech pricing that punishes you for growing. cooperatively maintained so the tool survives the vendor.",
    monthly_ask: 125,
    category: "project-management",
  },
  // [10] early — CSA management
  {
    creator_slug: "csa",
    title: "CSA and farm-share management that isn't a spreadsheet",
    problem:
      "120 members, 40 different share configurations, 3 pickup locations, crop rotation planning, and it's all in google sheets. every CSA manager i know has the same problem. the few tools that exist cost $500/month and target 1,000+ member operations.",
    description:
      "share management, pickup coordination, crop planning, and member communication built for small CSAs and cooperatively owned by them. members manage their own shares, swap pickups, see what's in season. farmers plan crops with AI-assisted forecasting trained on the cooperative's collective harvest data.",
    monthly_ask: 75,
    category: "operations",
  },
  // [11] early — salon booking
  {
    creator_slug: "salon",
    title:
      "appointment booking and client management for service businesses — no per-seat scam",
    problem:
      "vagaro, fresha, square appointments — they all start cheap and then it's $1,100/month across two locations once you add inventory, email marketing, and the 'premium' features that should have been included. and they own our client list.",
    description:
      "booking, client management, and basic inventory for salons, spas, and service businesses. cooperatively owned so the client list belongs to you, not the vendor. no per-seat multiplier — flat cooperative membership. shared marketing templates and best practices across the cooperative.",
    monthly_ask: 75,
    category: "operations",
  },
  // [12] early — compliance
  {
    creator_slug: "clinic",
    title:
      "compliance automation for small healthcare and finance — HIPAA/PCI without the consultant",
    problem:
      "HIPAA compliance consulting costs $15K/year. PCI compliance for our small payment processing is another $5K. we're four providers — we can't afford dedicated compliance staff, but the penalties for getting it wrong are existential.",
    description:
      "AI-powered compliance monitoring and documentation, cooperatively owned by the regulated businesses using it. automated policy generation, continuous risk assessment, audit preparation. shared across members so the cost of compliance expertise is split 50 ways. locally-hosted AI keeps all assessment data within the cooperative.",
    monthly_ask: 150,
    category: "operations",
  },
  // [13] early — construction PM
  {
    creator_slug: "contractor",
    title:
      "project management for construction — bids, schedules, and subs in one place",
    problem:
      "procore is $375/month minimum and built for commercial builders. i'm doing residential custom homes with a 15-person crew and 20 subs. i need bid tracking, scheduling, and sub coordination — not enterprise resource planning for a $200M GC.",
    description:
      "bid management, scheduling, and subcontractor coordination for residential builders. cooperatively owned so it evolves based on what residential contractors actually need. shared sub ratings across the cooperative — 'this plumber shows up on time.' AI-assisted scheduling that accounts for weather, material delivery, and inspection bottlenecks.",
    monthly_ask: 100,
    category: "project-management",
  },
  // [14] early — energy trading
  {
    creator_slug: "csa",
    title:
      "peer-to-peer energy trading for community solar — fair pricing, owned by the community",
    problem:
      "community solar developers capture most of the value. members get a small discount but own nothing. our rural community has 40 solar installations and no way to trade energy fairly between neighbors. the utility controls everything.",
    description:
      "equitable peer-to-peer energy trading owned by the community. members with solar sell excess to members without. AI ensures fair pricing — lowest-income members get best rates. works for urban community solar and rural microgrids. the cooperative owns the trading infrastructure, not the utility.",
    monthly_ask: 50,
    category: "operations",
  },
];

// --- cross-pledges ---
// each pledge: { pledger_slug, idea_index, amount }
// ghosts can't pledge their own ideas (app-level check)

export const PLEDGES: PledgeSpec[] = [
  // idea 0: AI bookkeeping — target ~$875
  { pledger_slug: "lawfirm", idea_index: 0, amount: 125 },
  { pledger_slug: "clinic", idea_index: 0, amount: 100 },
  { pledger_slug: "salon", idea_index: 0, amount: 100 },
  { pledger_slug: "nonprofit", idea_index: 0, amount: 75 },
  { pledger_slug: "contractor", idea_index: 0, amount: 100 },
  { pledger_slug: "studio", idea_index: 0, amount: 75 },
  { pledger_slug: "hvac", idea_index: 0, amount: 100 },
  { pledger_slug: "logistics", idea_index: 0, amount: 100 },
  { pledger_slug: "csa", idea_index: 0, amount: 100 },

  // idea 1: knowledge base — target ~$800
  { pledger_slug: "restaurant", idea_index: 1, amount: 100 },
  { pledger_slug: "lawfirm", idea_index: 1, amount: 100 },
  { pledger_slug: "nonprofit", idea_index: 1, amount: 75 },
  { pledger_slug: "contractor", idea_index: 1, amount: 75 },
  { pledger_slug: "clinic", idea_index: 1, amount: 100 },
  { pledger_slug: "logistics", idea_index: 1, amount: 75 },
  { pledger_slug: "salon", idea_index: 1, amount: 75 },
  { pledger_slug: "hvac", idea_index: 1, amount: 100 },
  { pledger_slug: "csa", idea_index: 1, amount: 100 },

  // idea 2: supply chain — target ~$475
  { pledger_slug: "logistics", idea_index: 2, amount: 100 },
  { pledger_slug: "csa", idea_index: 2, amount: 75 },
  { pledger_slug: "ranch", idea_index: 2, amount: 100 },
  { pledger_slug: "salon", idea_index: 2, amount: 50 },
  { pledger_slug: "contractor", idea_index: 2, amount: 75 },
  { pledger_slug: "nonprofit", idea_index: 2, amount: 75 },

  // idea 3: AI negotiation — target ~$425
  { pledger_slug: "restaurant", idea_index: 3, amount: 100 },
  { pledger_slug: "clinic", idea_index: 3, amount: 75 },
  { pledger_slug: "salon", idea_index: 3, amount: 75 },
  { pledger_slug: "contractor", idea_index: 3, amount: 100 },
  { pledger_slug: "hvac", idea_index: 3, amount: 75 },

  // idea 4: cybersecurity — target ~$350
  { pledger_slug: "lawfirm", idea_index: 4, amount: 100 },
  { pledger_slug: "salon", idea_index: 4, amount: 50 },
  { pledger_slug: "restaurant", idea_index: 4, amount: 100 },
  { pledger_slug: "nonprofit", idea_index: 4, amount: 50 },
  { pledger_slug: "studio", idea_index: 4, amount: 50 },

  // idea 5: wildfire — target ~$325
  { pledger_slug: "csa", idea_index: 5, amount: 75 },
  { pledger_slug: "contractor", idea_index: 5, amount: 50 },
  { pledger_slug: "nonprofit", idea_index: 5, amount: 50 },
  { pledger_slug: "logistics", idea_index: 5, amount: 75 },
  { pledger_slug: "restaurant", idea_index: 5, amount: 75 },

  // idea 6: route optimization — target ~$275
  { pledger_slug: "restaurant", idea_index: 6, amount: 75 },
  { pledger_slug: "csa", idea_index: 6, amount: 50 },
  { pledger_slug: "contractor", idea_index: 6, amount: 75 },
  { pledger_slug: "hvac", idea_index: 6, amount: 75 },

  // idea 7: precision ag — target ~$200
  { pledger_slug: "csa", idea_index: 7, amount: 100 },
  { pledger_slug: "nonprofit", idea_index: 7, amount: 50 },
  { pledger_slug: "logistics", idea_index: 7, amount: 50 },

  // idea 8: donor management — target ~$175
  { pledger_slug: "clinic", idea_index: 8, amount: 50 },
  { pledger_slug: "csa", idea_index: 8, amount: 50 },
  { pledger_slug: "studio", idea_index: 8, amount: 75 },

  // idea 9: trades dispatch — target ~$150
  { pledger_slug: "contractor", idea_index: 9, amount: 75 },
  { pledger_slug: "logistics", idea_index: 9, amount: 75 },

  // idea 10: CSA management — target ~$125
  { pledger_slug: "ranch", idea_index: 10, amount: 75 },
  { pledger_slug: "nonprofit", idea_index: 10, amount: 50 },

  // idea 11: salon booking — target ~$100
  { pledger_slug: "restaurant", idea_index: 11, amount: 50 },
  { pledger_slug: "studio", idea_index: 11, amount: 50 },

  // idea 12: compliance — target ~$100
  { pledger_slug: "lawfirm", idea_index: 12, amount: 50 },
  { pledger_slug: "salon", idea_index: 12, amount: 50 },

  // idea 13: construction PM — target ~$75
  { pledger_slug: "hvac", idea_index: 13, amount: 75 },

  // idea 14: energy trading — target ~$50
  { pledger_slug: "ranch", idea_index: 14, amount: 50 },
];

// --- comments ---
export const COMMENTS: CommentSpec[] = [
  {
    commenter_slug: "lawfirm",
    idea_index: 0,
    body: "my clients ask me about bookkeeping software constantly. every option is either too expensive or too complicated. a cooperative approach makes so much sense here — the data gets better the more businesses participate.",
  },
  {
    commenter_slug: "clinic",
    idea_index: 0,
    body: "we're spending $1,800/month on billing software that still requires a full-time person to manage. if AI can handle the routine stuff and the cooperative owns the models, that's a game-changer for small practices.",
  },
  {
    commenter_slug: "restaurant",
    idea_index: 1,
    body: "we tried notion, then confluence, then just went back to google docs. the problem isn't the tool — it's that nobody maintains it. a cooperative that guarantees ongoing maintenance is exactly what we need.",
  },
  {
    commenter_slug: "lawfirm",
    idea_index: 1,
    body: "for legal work, knowledge management is existential. every case builds on prior research. losing access to that history because a vendor pivots would be catastrophic.",
  },
  {
    commenter_slug: "ranch",
    idea_index: 2,
    body: "had a hay supplier go bankrupt last fall with no warning. if we'd known their feed supplier had raised prices 40%, we would have diversified months earlier. this is exactly the kind of collective intelligence small operations need.",
  },
  {
    commenter_slug: "salon",
    idea_index: 3,
    body: "our product supplier raised prices 25% this year. when i called to negotiate, they said 'take it or leave it.' if 50 salons were negotiating together? different conversation entirely.",
  },
  {
    commenter_slug: "ranch",
    idea_index: 5,
    body: "lost a barn and two outbuildings in the marshall fire. our county's warning system was a text message that arrived 40 minutes after we could see the smoke. this needs to exist.",
  },
  {
    commenter_slug: "hvac",
    idea_index: 6,
    body: "our routing software doesn't know that the rio grande bridge closes for maintenance every other thursday. we end up re-routing manually half the time. something that actually learns our territory would save us hours every week.",
  },
  {
    commenter_slug: "contractor",
    idea_index: 9,
    body: "when a tech calls in sick, it takes our dispatcher 45 minutes to rearrange the day. AI that understands our constraints could do that in seconds. and sharing parts inventory across companies? that alone would pay for the membership.",
  },
  {
    commenter_slug: "nonprofit",
    idea_index: 10,
    body: "every CSA i know runs on spreadsheets and email. it's embarrassing. the commercial tools are designed for industrial agriculture, not a 120-member community farm.",
  },
];
