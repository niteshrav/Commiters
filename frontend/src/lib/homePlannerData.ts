/** Project planner copy and options from the Commiters homepage demo. */
export type PlannerTypeId =
  | "restaurant"
  | "ecommerce"
  | "software"
  | "web"
  | "ai"
  | "business"
  | "cloud"
  | "modernize"
  | "custom";

export type PlannerListKind = "features" | "pages" | "integrations";

export const PLANNER_TYPES = {
  restaurant: {
    label: 'Restaurant',
    note: 'Guest experience, menus, and reservations',
    mark: 'R',
    lead: 'A guest-facing restaurant presence.',
    pagesName: 'Pages',
    pagesTitle: 'Which pages should the first version include?',
    pagesHint: 'Select the pages guests should be able to access.',
    questions: [
      {id:'r1', label:'How many locations should this cover?', options:[
        {id:'r1a', label:'One location'},
        {id:'r1b', label:'A few locations'},
        {id:'r1c', label:'A group of locations'}
      ]},
      {id:'r2', label:'What is currently available to guests?', options:[
        {id:'r2a', label:'Social profiles only'},
        {id:'r2b', label:'An older website'},
        {id:'r2c', label:'No website at present'},
        {id:'r2d', label:'A standalone reservation tool'}
      ]}
    ],
    features: [
      {id:'rf1', label:'Reservation requests'},
      {id:'rf2', label:'Dietary tags'},
      {id:'rf3', label:'Takeaway hours'},
      {id:'rf4', label:'Seasonal specials'},
      {id:'rf5', label:'Private dining notes'},
      {id:'rf6', label:'Gift cards'},
      {id:'rf7', label:'Multilingual menu'},
      {id:'rf8', label:'Chef notes'}
    ],
    pages: [
      {id:'rp1', label:'Home'},
      {id:'rp2', label:'Menu'},
      {id:'rp3', label:'Story'},
      {id:'rp4', label:'Gallery'},
      {id:'rp5', label:'Location'},
      {id:'rp6', label:'Contact'},
      {id:'rp7', label:'Events'},
      {id:'rp8', label:'Careers'},
      {id:'rp9', label:'Press'}
    ],
    integrations: [
      {id:'ri1', label:'Maps'},
      {id:'ri2', label:'WhatsApp'},
      {id:'ri3', label:'Instagram'},
      {id:'ri4', label:'External booking link'},
      {id:'ri5', label:'Email updates'},
      {id:'ri6', label:'Review highlights'}
    ]
  },
  ecommerce: {
    label: 'E-commerce',
    note: 'Catalogue, cart, and checkout',
    mark: 'E',
    lead: 'A store organised around the catalogue and checkout.',
    pagesName: 'Pages',
    pagesTitle: 'Which pages should the first version include?',
    pagesHint: 'Select the pages a customer should be able to access.',
    questions: [
      {id:'e1', label:'What does the catalogue include?', options:[
        {id:'e1a', label:'Physical goods'},
        {id:'e1b', label:'Digital goods'},
        {id:'e1c', label:'Subscriptions'},
        {id:'e1d', label:'A mixed range'}
      ]},
      {id:'e2', label:'What is the catalogue size?', options:[
        {id:'e2a', label:'A focused catalogue'},
        {id:'e2b', label:'A growing catalogue'},
        {id:'e2c', label:'An extensive catalogue'}
      ]}
    ],
    features: [
      {id:'ef1', label:'Size and colour variants'},
      {id:'ef2', label:'Guest checkout'},
      {id:'ef3', label:'Wishlists'},
      {id:'ef4', label:'Discount codes'},
      {id:'ef5', label:'Shipment tracking'},
      {id:'ef6', label:'Product reviews'},
      {id:'ef7', label:'Related products'},
      {id:'ef8', label:'Saved delivery addresses'}
    ],
    pages: [
      {id:'ep1', label:'Home'},
      {id:'ep2', label:'Catalogue'},
      {id:'ep3', label:'Product'},
      {id:'ep4', label:'Cart'},
      {id:'ep5', label:'Shipping information'},
      {id:'ep6', label:'About'},
      {id:'ep7', label:'Contact'},
      {id:'ep8', label:'Journal'},
      {id:'ep9', label:'Account'}
    ],
    integrations: [
      {id:'ei1', label:'Card payments'},
      {id:'ei2', label:'Carrier rates'},
      {id:'ei3', label:'Stock sync'},
      {id:'ei4', label:'Email receipts'},
      {id:'ei5', label:'Shop analytics'},
      {id:'ei6', label:'WhatsApp support'},
      {id:'ei7', label:'Tax calculation'}
    ]
  },
  software: {
    label: 'Custom software',
    note: 'An application built around a business workflow',
    mark: '\u25A6',
    lead: 'A custom application defined around its primary users.',
    pagesName: 'Screens',
    pagesTitle: 'Which screens should the first version include?',
    pagesHint: 'Select the screens the first release should include.',
    questions: [
      {id:'s1', label:'Who is the primary audience?', options:[
        {id:'s1a', label:'An internal team'},
        {id:'s1b', label:'Customers'},
        {id:'s1c', label:'Teams and customers'},
        {id:'s1d', label:'Partners'}
      ]},
      {id:'s2', label:'What is the starting point?', options:[
        {id:'s2a', label:'A new application'},
        {id:'s2b', label:'Spreadsheet-based processes'},
        {id:'s2c', label:'An existing system'}
      ]}
    ],
    features: [
      {id:'sf1', label:'Permissions by role'},
      {id:'sf2', label:'Approval steps'},
      {id:'sf3', label:'In-application notifications'},
      {id:'sf4', label:'File attachments'},
      {id:'sf5', label:'Change history'},
      {id:'sf6', label:'External API'},
      {id:'sf7', label:'Saved filters'},
      {id:'sf8', label:'Comment history'}
    ],
    pages: [
      {id:'sp1', label:'Sign-in'},
      {id:'sp2', label:'Overview'},
      {id:'sp3', label:'Record list'},
      {id:'sp4', label:'Record detail'},
      {id:'sp5', label:'Reports'},
      {id:'sp6', label:'Settings'},
      {id:'sp7', label:'Team'},
      {id:'sp8', label:'Help'}
    ],
    integrations: [
      {id:'si1', label:'Business email'},
      {id:'si2', label:'Single sign-on'},
      {id:'si3', label:'Existing database'},
      {id:'si4', label:'Team chat'},
      {id:'si5', label:'File storage'},
      {id:'si6', label:'Webhooks'},
      {id:'si7', label:'Calendar'}
    ]
  },
  web: {
    label: 'Business website',
    note: 'A corporate or campaign website',
    mark: '\u2318',
    lead: 'A company website organised around a clear visitor outcome.',
    pagesName: 'Pages',
    pagesTitle: 'Which pages should the first version include?',
    pagesHint: 'Select the pages the first version should include.',
    questions: [
      {id:'w1', label:'What should a visit accomplish?', options:[
        {id:'w1a', label:'Present the services'},
        {id:'w1b', label:'Collect project enquiries'},
        {id:'w1c', label:'Support recruitment'},
        {id:'w1d', label:'Publish articles'}
      ]},
      {id:'w2', label:'How prepared is the source material?', options:[
        {id:'w2a', label:'Ready to publish'},
        {id:'w2b', label:'Requires a structure'},
        {id:'w2c', label:'Still in preparation'}
      ]}
    ],
    features: [
      {id:'wf1', label:'Service sections'},
      {id:'wf2', label:'Team profiles'},
      {id:'wf3', label:'Resource library'},
      {id:'wf4', label:'FAQ block'},
      {id:'wf5', label:'Testimonials'},
      {id:'wf6', label:'Site search'},
      {id:'wf7', label:'Office information'},
      {id:'wf8', label:'Campaign banner'}
    ],
    pages: [
      {id:'wp1', label:'Home'},
      {id:'wp2', label:'Services'},
      {id:'wp3', label:'About'},
      {id:'wp4', label:'Work'},
      {id:'wp5', label:'Insights'},
      {id:'wp6', label:'Contact'},
      {id:'wp7', label:'Careers'},
      {id:'wp8', label:'Legal'}
    ],
    integrations: [
      {id:'wi1', label:'Analytics'},
      {id:'wi2', label:'CRM handoff'},
      {id:'wi3', label:'Live chat'},
      {id:'wi4', label:'Maps'},
      {id:'wi5', label:'Mailing tool'},
      {id:'wi6', label:'Introductory meetings'},
      {id:'wi7', label:'WhatsApp'}
    ]
  },
  ai: {
    label: 'AI automation',
    note: 'A focused workflow with human review',
    mark: '\u2733',
    lead: 'A focused automation with human approval retained.',
    pagesName: 'Interfaces',
    pagesTitle: 'Which interfaces should the first version include?',
    pagesHint: 'Select the interfaces the first version should include.',
    questions: [
      {id:'a1', label:'Where is the repetitive work?', options:[
        {id:'a1a', label:'Customer messages'},
        {id:'a1b', label:'Documents'},
        {id:'a1c', label:'Handoffs'},
        {id:'a1d', label:'Reporting packs'}
      ]},
      {id:'a2', label:'What requires human approval?', options:[
        {id:'a2a', label:'Outgoing replies'},
        {id:'a2b', label:'Record changes'},
        {id:'a2c', label:'Published summaries'},
        {id:'a2d', label:'Exceptions'}
      ]}
    ],
    features: [
      {id:'af1', label:'Extract details from documents'},
      {id:'af2', label:'Draft replies'},
      {id:'af3', label:'Task routing'},
      {id:'af4', label:'Generate short summaries'},
      {id:'af5', label:'Review queue'},
      {id:'af6', label:'Usage log'},
      {id:'af7', label:'Search internal records'},
      {id:'af8', label:'Exception alerts'}
    ],
    pages: [
      {id:'ap1', label:'Intake'},
      {id:'ap2', label:'Work queue'},
      {id:'ap3', label:'Activity'},
      {id:'ap4', label:'Settings'},
      {id:'ap5', label:'Reference'},
      {id:'ap6', label:'Results'}
    ],
    integrations: [
      {id:'ai1', label:'Shared inbox'},
      {id:'ai2', label:'Shared drive'},
      {id:'ai3', label:'Helpdesk'},
      {id:'ai4', label:'Spreadsheets'},
      {id:'ai5', label:'Chat'},
      {id:'ai6', label:'Database'},
      {id:'ai7', label:'Webhooks'}
    ]
  },
  business: {
    label: 'Business systems',
    note: 'A shared system for one team',
    mark: '\u25A4',
    lead: 'A shared workspace for one operational team.',
    pagesName: 'Screens',
    pagesTitle: 'Which screens should the first version include?',
    pagesHint: 'Select the screens the first release should include.',
    questions: [
      {id:'b1', label:'Which team is most affected?', options:[
        {id:'b1a', label:'Operations'},
        {id:'b1b', label:'Sales'},
        {id:'b1c', label:'People team'},
        {id:'b1d', label:'Leadership'}
      ]},
      {id:'b2', label:'Where are updates recorded today?', options:[
        {id:'b2a', label:'Spreadsheets and trackers'},
        {id:'b2b', label:'Disconnected tools'},
        {id:'b2c', label:'Email threads'},
        {id:'b2d', label:'An incomplete system'}
      ]}
    ],
    features: [
      {id:'bf1', label:'Shared records'},
      {id:'bf2', label:'Status pipeline'},
      {id:'bf3', label:'Assignment'},
      {id:'bf4', label:'Reminders'},
      {id:'bf5', label:'Export'},
      {id:'bf6', label:'Activity feed'},
      {id:'bf7', label:'Summary metrics'},
      {id:'bf8', label:'Checklists'}
    ],
    pages: [
      {id:'bp1', label:'Work board'},
      {id:'bp2', label:'Record'},
      {id:'bp3', label:'Assigned work'},
      {id:'bp4', label:'Team'},
      {id:'bp5', label:'Reports'},
      {id:'bp6', label:'Settings'}
    ],
    integrations: [
      {id:'bi1', label:'Email'},
      {id:'bi2', label:'Spreadsheet import'},
      {id:'bi3', label:'Calendar'},
      {id:'bi4', label:'Accounts export'},
      {id:'bi5', label:'Chat'},
      {id:'bi6', label:'File storage'}
    ]
  },
  cloud: {
    label: 'Cloud setup',
    note: 'Release, reliability, and access',
    mark: '\u2601',
    lead: 'An infrastructure review of the current product.',
    pagesName: 'Deliverables',
    pagesTitle: 'Which deliverables should the first phase include?',
    pagesHint: 'Select the deliverables the first phase should include.',
    questions: [
      {id:'c1', label:'What prompted this engagement?', options:[
        {id:'c1a', label:'An upcoming launch'},
        {id:'c1b', label:'Unreliable releases'},
        {id:'c1c', label:'Growth requirements'},
        {id:'c1d', label:'A reliability review'}
      ]},
      {id:'c2', label:'What is in place today?', options:[
        {id:'c2a', label:'A live product'},
        {id:'c2b', label:'A staging environment'},
        {id:'c2c', label:'A single server'},
        {id:'c2d', label:'Not yet deployed'}
      ]}
    ],
    features: [
      {id:'cf1', label:'Environment setup'},
      {id:'cf2', label:'Pipeline checks'},
      {id:'cf3', label:'Alert routing'},
      {id:'cf4', label:'Backup procedure'},
      {id:'cf5', label:'Access review'},
      {id:'cf6', label:'Performance review'},
      {id:'cf7', label:'Release notes'},
      {id:'cf8', label:'Staging parity'}
    ],
    pages: [
      {id:'cp1', label:'Architecture summary'},
      {id:'cp2', label:'Environment inventory'},
      {id:'cp3', label:'Deploy checklist'},
      {id:'cp4', label:'Monitoring overview'},
      {id:'cp5', label:'Runbook'},
      {id:'cp6', label:'Access map'}
    ],
    integrations: [
      {id:'ci1', label:'Source repository'},
      {id:'ci2', label:'Cloud account'},
      {id:'ci3', label:'Error tracking'},
      {id:'ci4', label:'Uptime monitor'},
      {id:'ci5', label:'Log collection'},
      {id:'ci6', label:'Secrets management'}
    ]
  },
  modernize: {
    label: 'Improve a product',
    note: 'A phased improvement of a live product',
    mark: '\u2197',
    lead: 'A phased improvement of a product already in use.',
    pagesName: 'Outputs',
    pagesTitle: 'Which outputs should the first phase include?',
    pagesHint: 'Select the outputs the first phase should include.',
    questions: [
      {id:'m1', label:'What should be addressed first?', options:[
        {id:'m1a', label:'Reliability'},
        {id:'m1b', label:'Speed'},
        {id:'m1c', label:'An outdated interface'},
        {id:'m1d', label:'Missing connections'}
      ]},
      {id:'m2', label:'What must be protected?', options:[
        {id:'m2a', label:'Current users'},
        {id:'m2b', label:'Live data'},
        {id:'m2c', label:'The release calendar'},
        {id:'m2d', label:'Search visibility'}
      ]}
    ],
    features: [
      {id:'mf1', label:'Defect triage'},
      {id:'mf2', label:'Performance improvement'},
      {id:'mf3', label:'Interface refresh'},
      {id:'mf4', label:'Integration repair'},
      {id:'mf5', label:'Content migration'},
      {id:'mf6', label:'Automated checks'},
      {id:'mf7', label:'Accessibility review'},
      {id:'mf8', label:'Phased release notes'}
    ],
    pages: [
      {id:'mp1', label:'Current-state summary'},
      {id:'mp2', label:'Priority list'},
      {id:'mp3', label:'Updated workflows'},
      {id:'mp4', label:'Test log'},
      {id:'mp5', label:'Launch checklist'}
    ],
    integrations: [
      {id:'mi1', label:'Existing sign-in'},
      {id:'mi2', label:'Existing database'},
      {id:'mi3', label:'Analytics'},
      {id:'mi4', label:'Existing payments'},
      {id:'mi5', label:'Existing email'},
      {id:'mi6', label:'Existing APIs'}
    ]
  },
  custom: {
    label: 'Custom',
    note: 'Define a project that is not listed',
    mark: '+',
    lead: 'A project defined by your requirements.',
    pagesName: 'Components',
    pagesTitle: 'Which components should the first version include?',
    pagesHint: 'Select the relevant components, or add a custom item.',
    questions: [
      {id:'u1', label:'Who is the primary user?', options:[
        {id:'u1a', label:'An internal team'},
        {id:'u1b', label:'Your customers'},
        {id:'u1c', label:'A public audience'},
        {id:'u1d', label:'Multiple audiences'}
      ]},
      {id:'u2', label:'What form should the first version take?', options:[
        {id:'u2a', label:'A public website'},
        {id:'u2b', label:'An authenticated application'},
        {id:'u2c', label:'A connected workflow'},
        {id:'u2d', label:'To be defined'}
      ]}
    ],
    features: [
      {id:'uf1', label:'Accounts'},
      {id:'uf2', label:'A primary workflow'},
      {id:'uf3', label:'Search'},
      {id:'uf4', label:'Notifications'},
      {id:'uf5', label:'Files'},
      {id:'uf6', label:'A summary report'}
    ],
    pages: [
      {id:'up1', label:'Introduction'},
      {id:'up2', label:'Primary task'},
      {id:'up3', label:'Library'},
      {id:'up4', label:'Profile'},
      {id:'up5', label:'Help'}
    ],
    integrations: [
      {id:'ui1', label:'Email'},
      {id:'ui2', label:'Existing login'},
      {id:'ui3', label:'Shared files'},
      {id:'ui4', label:'An existing product'}
    ]
  }
};

export const PLANNER_TYPE_ORDER = ['restaurant','ecommerce','software','web','ai','business','cloud','modernize','custom'];

export const PLANNER_TECH = [
  {id:'recommend', label:'Let Commiters recommend', note:'A suitable approach for this project'},
  {id:'modern', label:'Modern web stack', note:'A modern JavaScript interface and APIs'},
  {id:'headless', label:'API-first', note:'Content and services separated'},
  {id:'current', label:'Fit our current tools', note:'Align with the systems already in use'}
];

export const PLANNER_THEMES = [
  {id:'navy', label:'Navy and blue', note:'Confident and clear', bar:'#10294b', hero:'#0866ff', card:'#edf5ff', accent:'#f4a32b'},
  {id:'linen', label:'Warm linen', note:'Hospitable and calm', bar:'#3d2b22', hero:'#c4784a', card:'#f6efe6', accent:'#efe2d4'},
  {id:'paper', label:'Crisp paper', note:'Light and product-led', bar:'#1c2430', hero:'#d7e3f4', card:'#ffffff', accent:'#0866ff'},
  {id:'ink', label:'Ink and gold', note:'Dark and precise', bar:'#141414', hero:'#2a2a2a', card:'#1b1b1b', accent:'#d4a24c'},
  {id:'grove', label:'Soft grove', note:'Natural and quiet', bar:'#1d3a32', hero:'#2f6f5e', card:'#e7f3ee', accent:'#f2c14e'},
  {id:'night', label:'Night studio', note:'Deep contrast', bar:'#0e1424', hero:'#24345c', card:'#18233c', accent:'#7eb6ff'}
];

export const PLANNER_TIMELINES = [
  {id:'t2', label:'2 to 4 weeks', note:'A focused first release'},
  {id:'t1', label:'1 to 2 months', note:'A standard delivery'},
  {id:'t3', label:'3 to 4 months', note:'A broader release'},
  {id:'phase', label:'Milestone by milestone', note:'Sequenced delivery'},
  {id:'later', label:'Confirm after discovery', note:'The timeline follows discovery'}
];

export const PLANNER_STEPS = [
  {id:'type', label:'Type'},
  {id:'questions', label:'Details'},
  {id:'features', label:'Features'},
  {id:'tech', label:'Technology'},
  {id:'theme', label:'Theme'},
  {id:'pages', label:'Pages'},
  {id:'integrations', label:'Integrations'},
  {id:'timeline', label:'Timing'},
  {id:'blueprint', label:'Blueprint'}
];

export const PLANNER_HINTS = {
  type: 'Select the closest project type, or Custom if none apply.',
  questions: 'These questions change with the project type.',
  features: 'Select the relevant capabilities, or add a custom item. This is not a confirmed scope.',
  tech: 'A preference only. The approach is confirmed during consultation.',
  theme: 'A visual direction for the blueprint, not a final design.',
  integrations: 'Optional. Select the relevant integrations, or add a custom one.',
  timeline: 'An indicative range only. The schedule is confirmed during consultation.',
  blueprint: 'Review the blueprint, then download it or send it to Commiters.'
};

export const PLANNER_ERRORS = {
  type: 'Select a project type to continue.',
  questions: 'Answer each question to continue.',
  tech: 'Select a technology preference to continue.',
  theme: 'Select a visual direction to continue.',
  timeline: 'Select a timeline to continue.'
};

