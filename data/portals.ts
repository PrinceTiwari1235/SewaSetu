export interface Portal {
  id: string
  name: string
  url: string
  category: string
  description: string
  icon: string
  tags: string[]
  featured?: boolean
}

export const categories = [
  { id: 'identity',   label: 'Identity & Civil',    icon: '🪪' },
  { id: 'jobs',       label: 'Jobs & Exams',         icon: '📋' },
  { id: 'tax',        label: 'Revenue & Tax',        icon: '💰' },
  { id: 'land',       label: 'Land & Property',      icon: '🏗️' },
  { id: 'transport',  label: 'Transport & License',  icon: '🚗' },
  { id: 'education',  label: 'Education',            icon: '🎓' },
  { id: 'health',     label: 'Health & Insurance',   icon: '🏥' },
  { id: 'business',   label: 'Business & Trade',     icon: '🏢' },
  { id: 'social',     label: 'Social Security',      icon: '🛡️' },
  { id: 'utilities',  label: 'Utilities',            icon: '⚡' },
  { id: 'legal',      label: 'Legal & Grievance',    icon: '⚖️' },
  { id: 'finance',    label: 'Finance & Banking',    icon: '🏦' },
]

export const portals: Portal[] = [
  // Identity & Civil
  { id: 'nagarik',     name: 'Nagarik App',                    url: 'https://nagarikapp.gov.np',                   category: 'identity',  description: '61+ integrated government services in one place — NID, passport, PAN, land records, bank account, driving license and more.', icon: '🪪', tags: ['NID','PAN','Passport','Voter ID'], featured: true },
  { id: 'donidcr',     name: 'DONIDCR Citizen Portal',         url: 'https://citizenportal.donidcr.gov.np/en',     category: 'identity',  description: 'National ID card application & status, birth/death/marriage registration.', icon: '🆔', tags: ['National ID','Birth Cert','Marriage'] },
  { id: 'passport',    name: 'Department of Passports',        url: 'https://nepalpassport.gov.np',                category: 'identity',  description: 'Machine-readable passport application, renewal, and lost passport forms.', icon: '📘', tags: ['Passport','MRP','Renewal'], featured: true },
  { id: 'immigration', name: 'Nepal Immigration',              url: 'https://nepaliport.immigration.gov.np',       category: 'identity',  description: 'Online visa application, visa extension, trekking permit, visa transfer.', icon: '✈️', tags: ['Visa','Trekking Permit','Extension'] },
  { id: 'election',    name: 'Election Commission',            url: 'https://election.gov.np',                    category: 'identity',  description: 'Voter ID registration and voter list verification.', icon: '🗳️', tags: ['Voter ID','Voter List'] },

  // Jobs & Exams
  { id: 'psc',         name: 'Public Service Commission',      url: 'https://psc.gov.np',                         category: 'jobs', description: 'Federal government job vacancies, exam notices, results and merit lists.', icon: '📋', tags: ['Lok Sewa','Civil Service','Vacancy'], featured: true },
  { id: 'psconline',   name: 'PSC Online Application',         url: 'https://psconline1.psc.gov.np',              category: 'jobs', description: 'Online application form for civil service vacancies and admit card download.', icon: '📝', tags: ['Application','Admit Card'], featured: true },
  { id: 'tsc',         name: 'Teachers Service Commission',    url: 'https://tsc.gov.np',                         category: 'jobs', description: 'Teacher vacancy applications, exam forms, and results.', icon: '👨‍🏫', tags: ['Teacher','TSC','Vacancy'] },
  { id: 'army',        name: 'Nepal Army Recruitment',         url: 'https://nepaliarmy.mil.np',                  category: 'jobs', description: 'Army recruitment applications and exam notices.', icon: '🎖️', tags: ['Army','Recruitment'] },
  { id: 'police',      name: 'Nepal Police',                   url: 'https://nepalpolice.gov.np',                 category: 'jobs', description: 'Police recruitment and police clearance certificate application.', icon: '👮', tags: ['Police','Clearance','Recruitment'] },
  { id: 'psc_koshi',   name: 'Koshi Province PSC',            url: 'https://psc.koshi.gov.np',                   category: 'jobs', description: 'Koshi province government job applications.', icon: '📋', tags: ['Koshi','Province','Vacancy'] },
  { id: 'psc_madhesh', name: 'Madhesh Province PSC',          url: 'https://ppsc.madhesh.gov.np',                category: 'jobs', description: 'Madhesh province government job applications.', icon: '📋', tags: ['Madhesh','Province','Vacancy'] },
  { id: 'psc_bagmati', name: 'Bagmati Province PSC',          url: 'https://ppsc.bagmati.gov.np',                category: 'jobs', description: 'Bagmati province government job applications.', icon: '📋', tags: ['Bagmati','Province','Vacancy'] },
  { id: 'psc_gandaki', name: 'Gandaki Province PSC',          url: 'https://ppsc.gandaki.gov.np',                category: 'jobs', description: 'Gandaki province government job applications.', icon: '📋', tags: ['Gandaki','Province','Vacancy'] },
  { id: 'psc_lumbini', name: 'Lumbini Province PSC',          url: 'https://ppsc.lumbini.gov.np',                category: 'jobs', description: 'Lumbini province government job applications.', icon: '📋', tags: ['Lumbini','Province','Vacancy'] },

  // Revenue & Tax
  { id: 'ird',         name: 'IRD Taxpayer Portal',            url: 'https://ird.gov.np/taxpayer-portal',         category: 'tax', description: 'PAN registration, online tax filing, VAT registration, TDS returns and income tax.', icon: '💰', tags: ['PAN','Tax','VAT','TDS'], featured: true },
  { id: 'customs',     name: 'Department of Customs',          url: 'https://customs.gov.np',                    category: 'tax', description: 'Import/export customs declarations and duty calculations.', icon: '📦', tags: ['Customs','Import','Export'] },
  { id: 'nnsw',        name: 'Nepal National Single Window',   url: 'https://nnsw.gov.np',                       category: 'tax', description: 'Trade facilitation and single-window trade document submission.', icon: '🪟', tags: ['Trade','Single Window','Documents'] },
  { id: 'nrb',         name: 'Nepal Rastra Bank',              url: 'https://nrb.org.np',                        category: 'tax', description: 'Forex registration and financial licensing forms.', icon: '🏦', tags: ['Forex','Licensing','NRB'] },

  // Land & Property
  { id: 'dolma',       name: 'Dept. of Land Management',       url: 'https://dolma.gov.np',                      category: 'land', description: 'Land ownership records, land tax payment, and archive services.', icon: '🏗️', tags: ['Land Record','Tax','Survey'] },
  { id: 'survey',      name: 'Survey Department',              url: 'https://dos.gov.np',                        category: 'land', description: 'Land survey, parcel maps, and topographic data.', icon: '🗺️', tags: ['Survey','Map','Parcel'] },
  { id: 'dudbc',       name: 'Dept. of Urban Development',     url: 'https://dudbc.gov.np',                      category: 'land', description: 'Building permit applications and urban development approvals.', icon: '🏠', tags: ['Building Permit','Urban','Construction'] },

  // Transport
  { id: 'dotm',        name: 'Dept. of Transport Management',  url: 'https://dotm.gov.np',                       category: 'transport', description: 'New driving license, renewal, written test booking, vehicle registration, trial test appointment.', icon: '🚗', tags: ['Driving License','Vehicle','Test'], featured: true },
  { id: 'smartlicense',name: 'Smart Driving License',          url: 'https://smartlicense.dotm.gov.np',          category: 'transport', description: 'Smart driving license card application and tracking.', icon: '💳', tags: ['Smart License','Card','Tracking'] },

  // Education
  { id: 'tu_exam',     name: 'TU Examination Controller',      url: 'https://exam.tu.edu.np',                    category: 'education', description: 'Tribhuvan University exam form fill-up, admit card, and result checking.', icon: '🎓', tags: ['TU','Exam Form','Admit Card'], featured: true },
  { id: 'neb',         name: 'National Examination Board',     url: 'https://neb.gov.np',                        category: 'education', description: 'SEE, Grade 11 & 12 exam forms and results.', icon: '📚', tags: ['SEE','Grade 11','Grade 12','NEB'], featured: true },
  { id: 'ctevt',       name: 'CTEVT',                          url: 'https://ctevt.org.np',                      category: 'education', description: 'TSLC and Diploma-level admission and exam forms for technical education.', icon: '🔧', tags: ['TSLC','Diploma','Technical'] },
  { id: 'mec',         name: 'Medical Education Commission',   url: 'https://mec.gov.np',                        category: 'education', description: 'MBBS and other medical entrance exam application forms.', icon: '🩺', tags: ['MBBS','Medical','Entrance'] },
  { id: 'ku',          name: 'Kathmandu University',           url: 'https://ku.edu.np',                         category: 'education', description: 'KU admission and exam applications.', icon: '🎓', tags: ['KU','Admission','Exam'] },

  // Health
  { id: 'hib',         name: 'Health Insurance Board',         url: 'https://hib.gov.np',                        category: 'health', description: 'Government health insurance enrollment and claim forms.', icon: '🏥', tags: ['Health Insurance','Enrollment','Claim'], featured: true },
  { id: 'nmc',         name: 'Nepal Medical Council',          url: 'https://nmc.org.np',                        category: 'health', description: 'Doctor and health professional registration and renewal forms.', icon: '👨‍⚕️', tags: ['Doctor','Registration','Medical Council'] },
  { id: 'dda',         name: 'Dept. of Drug Administration',   url: 'https://dda.gov.np',                        category: 'health', description: 'Drug registration, pharmacy license and pharmaceutical business forms.', icon: '💊', tags: ['Drug License','Pharmacy','Registration'] },

  // Business
  { id: 'ocr',         name: 'Office of Company Registrar',    url: 'https://ocr.gov.np',                        category: 'business', description: 'Company registration, annual compliance filings and company data access.', icon: '🏢', tags: ['Company Registration','OCR','Compliance'], featured: true },
  { id: 'dofe',        name: 'Foreign Employment Dept.',        url: 'https://dofe.gov.np',                       category: 'business', description: 'Foreign employment permit, labour agreement and individual consent forms.', icon: '✈️', tags: ['Foreign Employment','Labour','Permit'] },
  { id: 'doind',       name: 'Dept. of Industry',              url: 'https://doind.gov.np',                      category: 'business', description: 'Industry registration and Foreign Direct Investment application forms.', icon: '🏭', tags: ['Industry','FDI','Registration'] },

  // Social Security
  { id: 'ssf',         name: 'Social Security Fund',           url: 'https://ssf.gov.np',                        category: 'social', description: 'Contributory social security enrollment and claim forms for workers.', icon: '🛡️', tags: ['Social Security','SSF','Workers'], featured: true },
  { id: 'epf',         name: 'Employees Provident Fund',       url: 'https://epf.gov.np',                        category: 'social', description: 'Provident fund enrollment and withdrawal application forms.', icon: '💼', tags: ['EPF','Provident Fund','Pension'] },
  { id: 'cit',         name: 'Citizen Investment Trust',       url: 'https://cit.gov.np',                        category: 'social', description: 'Nagarik Lagani Kosh retirement savings enrollment forms.', icon: '📈', tags: ['CIT','Retirement','Savings'] },

  // Utilities
  { id: 'nea',         name: 'Nepal Electricity Authority',    url: 'https://nea.org.np',                        category: 'utilities', description: 'New electricity connection application, meter service and billing.', icon: '⚡', tags: ['Electricity','NEA','Connection'] },
  { id: 'kukl',        name: 'KUKL Water Supply',              url: 'https://kukl.gov.np',                       category: 'utilities', description: 'Water connection application forms for Kathmandu Valley.', icon: '💧', tags: ['Water','Connection','KUKL'] },
  { id: 'ntc',         name: 'Nepal Telecom',                  url: 'https://ntc.net.np',                        category: 'utilities', description: 'SIM registration and telecom service application forms.', icon: '📱', tags: ['SIM','Telecom','NTC'] },

  // Legal & Grievance
  { id: 'hellosarkar', name: 'Hello Sarkar / Mero Gunaso',     url: 'https://hellosarkar.gov.np',                category: 'legal', description: 'Citizen grievance and complaint filing against government services.', icon: '📣', tags: ['Grievance','Complaint','Citizens'], featured: true },
  { id: 'rti',         name: 'Right to Information Commission',url: 'https://rti.gov.np',                        category: 'legal', description: 'RTI request forms to access government information.', icon: '📰', tags: ['RTI','Information','Request'] },
  { id: 'supremecourt',name: 'Supreme Court Nepal',            url: 'https://supremecourt.gov.np',               category: 'legal', description: 'Case filing and court application forms.', icon: '⚖️', tags: ['Court','Case Filing','Legal'] },

  // Finance & Banking
  { id: 'meroshare',   name: 'Meroshare (CDSC)',               url: 'https://meroshare.cdsc.com.np',             category: 'finance', description: 'IPO/Share application, DEMAT account management and portfolio tracking.', icon: '📊', tags: ['IPO','DEMAT','Shares'], featured: true },
  { id: 'connectips',  name: 'ConnectIPS',                     url: 'https://connectips.com',                   category: 'finance', description: 'Online government payment, tax payment and interbank fund transfers.', icon: '💳', tags: ['Payment','Tax Payment','Transfer'] },
  { id: 'sebon',       name: 'Securities Board of Nepal',      url: 'https://sebon.gov.np',                     category: 'finance', description: 'IPO application, securities registration and capital market forms.', icon: '📈', tags: ['Securities','IPO','Capital Market'] },
]

export const featuredPortals = portals.filter(p => p.featured)

export const stats = [
  { value: '50+', label: 'Government Portals' },
  { value: '14',  label: 'Service Categories' },
  { value: '200+', label: 'Form Types Covered' },
  { value: '10M+', label: 'Citizens Served' },
]
