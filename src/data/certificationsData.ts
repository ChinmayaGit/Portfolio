export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  category: 'ai' | 'cloud' | 'security' | 'engineering';
  categoryLabel: string;
  featured?: boolean;
  skills: string[];
}

export const ALL_CERTIFICATIONS: CertificationItem[] = [
  // --- AI & AGENT SYSTEMS ---
  {
    id: 'oracle-fusion-ai-agent-dev',
    title: 'Oracle Fusion AI Agent Studio Certified Developer Professional - Rel 26-2',
    issuer: 'Oracle',
    issueDate: 'Aug 2026',
    category: 'ai',
    categoryLabel: 'AI & Agents',
    featured: true,
    credentialUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=7C08B401E74C98A76EE353B55D7622271FC002A7B68C15FDEEECF47DE01E42E8',
    skills: ['AI Agent Studio', 'Autonomous AI Workflows', 'Oracle Fusion AI', 'Enterprise Tool Calling']
  },
  {
    id: 'claude-certified-dev-foundations',
    title: 'Claude Certified Developer - Foundations',
    issuer: 'Anthropic',
    issueDate: 'Aug 2026',
    expiryDate: 'Aug 2027',
    credentialId: '627a1223-637f-411a-b676-0077ad40de9c',
    credentialUrl: 'https://www.credly.com/badges/627a1223-637f-411a-b676-0077ad40de9c/linked_in_profile',
    category: 'ai',
    categoryLabel: 'AI & Agents',
    featured: true,
    skills: ['Agent Development', 'Application Security', 'Prompt Engineering', 'Claude API']
  },
  {
    id: 'anthropic-ai-fluency',
    title: 'Certificate of Completion: AI Fluency Framework & Foundations',
    issuer: 'Anthropic',
    issueDate: 'May 2026',
    credentialId: 'f5jki6k9tngh',
    credentialUrl: 'https://verify.skilljar.com/c/f5jki6k9tngh',
    category: 'ai',
    categoryLabel: 'AI & Agents',
    featured: true,
    skills: ['Artificial Intelligence (AI)', 'AI Use Case Development', 'Model Alignment', 'LLM Architectures']
  },
  {
    id: 'claude-code-in-action',
    title: 'Claude Code in Action',
    issuer: 'Anthropic',
    issueDate: 'Apr 2026',
    credentialId: 't7nm62cebeyc',
    credentialUrl: 'https://verify.skilljar.com/c/t7nm62cebeyc',
    category: 'ai',
    categoryLabel: 'AI & Agents',
    featured: true,
    skills: ['Agentic AI Workflows', 'GitHub Actions / CI Automation', 'Autonomous Coding', 'Tool Integration']
  },
  {
    id: 'claude-101',
    title: 'Certificate of Completion: Claude 101',
    issuer: 'Anthropic',
    issueDate: 'Apr 2026',
    credentialId: 'o64kgvoe2iqg',
    credentialUrl: 'https://verify.skilljar.com/c/o64kgvoe2iqg',
    category: 'ai',
    categoryLabel: 'AI & Agents',
    featured: false,
    skills: ['Generative AI', 'Claude Artifacts', 'Context Window Mastery']
  },
  {
    id: 'oracle-ai-foundations-2025',
    title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle',
    issueDate: 'Feb 2026',
    expiryDate: 'Feb 2028',
    credentialUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=D987A4FFAE23BA3AA4E677EFE1DAC66D600E92876ED03428641142AB82AD4DDE',
    category: 'ai',
    categoryLabel: 'AI & Agents',
    featured: true,
    skills: ['OCI Generative AI', 'Machine Learning', 'Vector Databases', 'OCI AI Services']
  },
  {
    id: 'oracle-fusion-ai-agent-foundations',
    title: 'Oracle Fusion AI Agent Studio Certified Foundations Associate - Rel 1',
    issuer: 'Oracle',
    issueDate: 'Dec 2025',
    credentialUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=5621AC3AF1D332F05205F391F8F40600BC62FB0BC519B950D2D45873A913EB38',
    category: 'ai',
    categoryLabel: 'AI & Agents',
    featured: false,
    skills: ['AI Agent Studio', 'Fusion Cloud', 'Enterprise Agents']
  },
  {
    id: 'aws-certified-ai-practitioner',
    title: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: 'Aug 2025',
    expiryDate: 'Aug 2028',
    credentialUrl: 'https://www.credly.com/badges/6e8183e1-0c64-4800-9ee6-3d604d35ef9e/linked_in_profile',
    category: 'ai',
    categoryLabel: 'AI & Agents',
    featured: true,
    skills: ['Artificial Intelligence (AI)', 'Amazon Bedrock', 'SageMaker', 'Responsible AI', 'Foundation Models']
  },
  {
    id: 'tech-trek-testing-llms',
    title: 'Tech Trek Testing and Evaluation LLMs',
    issuer: 'ROI Training',
    issueDate: 'Mar 2025',
    credentialId: '138634869',
    credentialUrl: 'https://www.credential.net/742cddd0-35fe-403a-b91c-d30805a5238a',
    category: 'ai',
    categoryLabel: 'AI & Agents',
    featured: false,
    skills: ['LLM Evaluation', 'Benchmark Testing', 'Prompt Robustness', 'Hallucination Mitigation']
  },
  {
    id: 'google-intro-llm',
    title: 'Introduction to Large Language Models',
    issuer: 'Google Cloud Skills Boost',
    issueDate: 'Nov 2023',
    credentialId: '6074786',
    credentialUrl: 'https://www.cloudskillsboost.google/public_profiles/e65ccae1-3942-4e11-a2c9-6b7745813725/badges/6074786',
    category: 'ai',
    categoryLabel: 'AI & Agents',
    featured: false,
    skills: ['Large Language Models (LLM)', 'Transformer Architectures', 'Google Cloud']
  },
  {
    id: 'google-intro-gen-ai',
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud Skills Boost',
    issueDate: 'Nov 2023',
    credentialId: '6075060',
    credentialUrl: 'https://www.cloudskillsboost.google/public_profiles/e65ccae1-3942-4e11-a2c9-6b7745813725/badges/6075060',
    category: 'ai',
    categoryLabel: 'AI & Agents',
    featured: false,
    skills: ['Artificial Intelligence (AI)', 'Generative Models', 'Prompt Engineering']
  },
  {
    id: 'google-responsible-ai',
    title: 'Introduction to Responsible AI',
    issuer: 'Google Cloud Skills Boost',
    issueDate: 'Nov 2023',
    credentialId: '6084039',
    credentialUrl: 'https://www.cloudskillsboost.google/public_profiles/e65ccae1-3942-4e11-a2c9-6b7745813725/badges/6084039',
    category: 'ai',
    categoryLabel: 'AI & Agents',
    featured: false,
    skills: ['Responsible AI', 'AI Ethics', 'Bias Detection', 'Explainable AI']
  },

  // --- CLOUD & ARCHITECTURE ---
  {
    id: 'aws-data-engineer-associate',
    title: 'AWS Certified Data Engineer – Associate',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: 'Feb 2026',
    expiryDate: 'Feb 2029',
    credentialId: '7ebf4313-a5cb-4419-85ad-721c724f29be',
    credentialUrl: 'https://www.credly.com/badges/7ebf4313-a5cb-4419-85ad-721c724f29be/linked_in_profile',
    category: 'cloud',
    categoryLabel: 'Cloud & Data',
    featured: true,
    skills: ['AWS Glue ETL', 'Amazon Redshift', 'Amazon Kinesis', 'AWS Lake Formation', 'Athena', 'Data Pipelines']
  },
  {
    id: 'aws-solutions-architect-associate',
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: 'Jun 2025',
    expiryDate: 'Jun 2028',
    credentialUrl: 'https://www.credly.com/badges/f3167b1d-00c9-45a5-839f-03031e91015d/linked_in_profile',
    category: 'cloud',
    categoryLabel: 'Cloud & Data',
    featured: true,
    skills: ['Multi-tier VPC', 'High Availability', 'S3 & EBS Storage', 'IAM Least Privilege', 'Cost Optimization']
  },
  {
    id: 'google-digital-transformation',
    title: 'Digital Transformation with Google Cloud',
    issuer: 'Google Cloud Training Online',
    issueDate: 'Nov 2023',
    credentialId: '6084458',
    credentialUrl: 'https://www.cloudskillsboost.google/public_profiles/e65ccae1-3942-4e11-a2c9-6b7745813725/badges/6084458',
    category: 'cloud',
    categoryLabel: 'Cloud & Data',
    featured: false,
    skills: ['Google Cloud Strategy', 'Modernization', 'Enterprise Cloud Adoption']
  },
  {
    id: 'google-innovating-data',
    title: 'Innovating with Data and Google Cloud',
    issuer: 'Google Cloud Training Online',
    issueDate: 'Nov 2023',
    credentialId: '6084665',
    credentialUrl: 'https://www.cloudskillsboost.google/public_profiles/e65ccae1-3942-4e11-a2c9-6b7745813725/badges/6084665',
    category: 'cloud',
    categoryLabel: 'Cloud & Data',
    featured: false,
    skills: ['Google Cloud', 'BigQuery', 'Data Governance', 'Analytics Engine']
  },
  {
    id: 'google-app-modernization',
    title: 'Infrastructure and Application Modernization with Google Cloud',
    issuer: 'Google Cloud Training Online',
    issueDate: 'Nov 2023',
    credentialId: '6084804',
    credentialUrl: 'https://www.cloudskillsboost.google/public_profiles/e65ccae1-3942-4e11-a2c9-6b7745813725/badges/6084804',
    category: 'cloud',
    categoryLabel: 'Cloud & Data',
    featured: false,
    skills: ['GKE & Containers', 'Cloud Run', 'Hybrid Infrastructure', 'Microservices']
  },
  {
    id: 'edx-linux-verified',
    title: 'edX Verified Certificate for Introduction to Linux',
    issuer: 'edX / Linux Foundation',
    issueDate: 'Mar 2024',
    credentialId: '150e07c4196d405483a09d592144d237',
    credentialUrl: 'https://courses.edx.org/certificates/150e07c4196d405483a09d592144d237',
    category: 'cloud',
    categoryLabel: 'Cloud & Data',
    featured: false,
    skills: ['Linux Kernel & Shell', 'File Permissions', 'Process Management', 'System Administration']
  },

  // --- CYBERSECURITY & IAM ---
  {
    id: 'sailpoint-identity-security-professional',
    title: 'SailPoint Identity Security Professional Credential',
    issuer: 'SailPoint',
    issueDate: 'Feb 2025',
    credentialId: '67bab2565f9b5c3e1e91e2e1',
    credentialUrl: 'https://api.badgr.io/public/assertions/E809Q901TFmKcXL_funpCw',
    category: 'security',
    categoryLabel: 'Cybersecurity & IAM',
    featured: true,
    skills: ['Cloud Security', 'SailPoint ISC', 'Identity Governance', 'Access Control', 'Compliance Audits']
  },
  {
    id: 'sailpoint-identity-security-leader',
    title: 'SailPoint Identity Security Leader Credential',
    issuer: 'SailPoint',
    issueDate: 'Oct 2024',
    credentialId: 'va5owna7372e',
    credentialUrl: 'https://verify.skilljar.com/c/va5owna7372e',
    category: 'security',
    categoryLabel: 'Cybersecurity & IAM',
    featured: true,
    skills: ['Identity Security Strategy', 'Executive Governance', 'Zero Trust IAM']
  },
  {
    id: 'sailpoint-plan-strategy',
    title: 'Plan Your Identity Security Strategy',
    issuer: 'SailPoint',
    issueDate: 'Oct 2024',
    credentialId: '6n27ojytccao',
    credentialUrl: 'https://verify.skilljar.com/c/6n27ojytccao',
    category: 'security',
    categoryLabel: 'Cybersecurity & IAM',
    featured: false,
    skills: ['Identity Architecture', 'Program Roadmaps', 'Security Posture']
  },
  {
    id: 'sailpoint-manage-projects',
    title: 'Manage Your Implementation Projects',
    issuer: 'SailPoint',
    issueDate: 'Oct 2024',
    credentialId: 'av6wsw6s2v4s',
    credentialUrl: 'https://verify.skilljar.com/c/av6wsw6s2v4s',
    category: 'security',
    categoryLabel: 'Cybersecurity & IAM',
    featured: false,
    skills: ['SailPoint Delivery', 'System Connectors', 'Lifecycle Rules']
  },
  {
    id: 'sailpoint-manage-compliance',
    title: 'Manage Compliance with Identity Security Cloud',
    issuer: 'SailPoint',
    issueDate: 'Feb 2025',
    credentialId: 'ope3sz9ui9qy',
    credentialUrl: 'https://verify.skilljar.com/c/ope3sz9ui9qy',
    category: 'security',
    categoryLabel: 'Cybersecurity & IAM',
    featured: false,
    skills: ['Access Certification', 'SoD Enforcement', 'Audit Readiness']
  },
  {
    id: 'sailpoint-identity-data',
    title: 'Leverage Identity Security Data',
    issuer: 'SailPoint',
    issueDate: 'Mar 2025',
    credentialId: 'i6q333to256q',
    credentialUrl: 'https://verify.skilljar.com/c/i6q333to256q',
    category: 'security',
    categoryLabel: 'Cybersecurity & IAM',
    featured: false,
    skills: ['Identity Analytics', 'Telemetry', 'Privilege Risk Scoring']
  },
  {
    id: 'sailpoint-access-modeling',
    title: 'Identity Security Cloud: Access Modeling',
    issuer: 'SailPoint',
    issueDate: 'Feb 2025',
    credentialId: 'gwzhndir6qku',
    credentialUrl: 'https://verify.skilljar.com/c/gwzhndir6qku',
    category: 'security',
    categoryLabel: 'Cybersecurity & IAM',
    featured: false,
    skills: ['Role-Based Access Control (RBAC)', 'Role Mining', 'Entitlement Management']
  },
  {
    id: 'sailpoint-identitynow-essentials-3',
    title: 'IdentityNow Essentials 3: Compliance',
    issuer: 'SailPoint',
    issueDate: 'Oct 2024',
    credentialId: '2y2sgvdf4fxv',
    credentialUrl: 'https://verify.skilljar.com/c/2y2sgvdf4fxv',
    category: 'security',
    categoryLabel: 'Cybersecurity & IAM',
    featured: false,
    skills: ['Compliance Campaigns', 'Certification Schedules', 'Policy Audits']
  },
  {
    id: 'sailpoint-identitynow-essentials-2',
    title: 'IdentityNow Essentials 2: Provisioning',
    issuer: 'SailPoint',
    issueDate: 'Oct 2024',
    credentialId: 'chq5tbc43udu',
    credentialUrl: 'https://verify.skilljar.com/c/chq5tbc43udu',
    category: 'security',
    categoryLabel: 'Cybersecurity & IAM',
    featured: false,
    skills: ['Automated Provisioning', 'Deprovisioning', 'Birthright Entitlements']
  },
  {
    id: 'sailpoint-identitynow-essentials-1',
    title: 'IdentityNow Essentials 1: Setup and Modeling',
    issuer: 'SailPoint',
    issueDate: 'Oct 2024',
    credentialId: 'ouj9b3e4zrvi',
    credentialUrl: 'https://verify.skilljar.com/c/ouj9b3e4zrvi',
    category: 'security',
    categoryLabel: 'Cybersecurity & IAM',
    featured: false,
    skills: ['Identity Profiles', 'Source Integration', 'Attribute Mapping']
  },
  {
    id: 'sailpoint-ciem-essentials',
    title: 'CIEM Essentials (Cloud Infrastructure Entitlement Management)',
    issuer: 'SailPoint',
    issueDate: 'Mar 2025',
    credentialId: '87imqhxuj5hf',
    credentialUrl: 'https://verify.skilljar.com/c/87imqhxuj5hf',
    category: 'security',
    categoryLabel: 'Cybersecurity & IAM',
    featured: true,
    skills: ['CIEM', 'Multi-Cloud Permissions', 'AWS IAM Auditing', 'Excessive Privilege Mitigation']
  },
  {
    id: 'sailpoint-access-modeling-isc',
    title: 'Access Modeling in Identity Security Cloud',
    issuer: 'SailPoint',
    issueDate: 'Jul 2025',
    credentialId: 'q74fj5jmum9k',
    credentialUrl: 'https://verify.skilljar.com/c/q74fj5jmum9k',
    category: 'security',
    categoryLabel: 'Cybersecurity & IAM',
    featured: false,
    skills: ['Identity Governance', 'Access Hierarchy', 'Zero Trust']
  },
  {
    id: 'google-cloud-security-iam',
    title: 'Google Cloud Security: Identity and Access Management',
    issuer: 'ROI Training',
    issueDate: 'Feb 2025',
    credentialId: '133014601',
    credentialUrl: 'https://www.credential.net/2b6cdb12-a4c5-489c-8382-59712b5489a3',
    category: 'security',
    categoryLabel: 'Cybersecurity & IAM',
    featured: true,
    skills: ['Cloud IAM', 'Workload Identity Federation', 'Service Accounts', 'Conditional Policies']
  },
  {
    id: 'google-cloud-security-web-apps',
    title: 'Google Cloud Security: Securing Web Applications and Services',
    issuer: 'ROI Training',
    issueDate: 'Feb 2025',
    credentialId: '134055554',
    credentialUrl: 'https://www.credential.net/0bce1fd5-7e8a-4f1c-8e8d-a1ca0dd084a0',
    category: 'security',
    categoryLabel: 'Cybersecurity & IAM',
    featured: false,
    skills: ['Cloud Armor', 'WAF Rules', 'API Gateway Security', 'SSL/TLS Policies']
  },
  {
    id: 'google-cloud-security-data',
    title: 'Google Cloud Security: Data Security',
    issuer: 'ROI Training',
    issueDate: 'Feb 2025',
    credentialId: '135168129',
    credentialUrl: 'https://www.credential.net/275e4801-22e0-4ffd-850d-4529f06a7008',
    category: 'security',
    categoryLabel: 'Cybersecurity & IAM',
    featured: false,
    skills: ['Cloud KMS', 'Data Loss Prevention (DLP)', 'Envelope Encryption', 'Data Masking']
  },
  {
    id: 'google-cloud-security-operations',
    title: 'Understanding Google Cloud Security and Operations',
    issuer: 'Cloud Security Podcast by Google',
    issueDate: 'Nov 2023',
    credentialId: '6085113',
    credentialUrl: 'https://www.cloudskillsboost.google/public_profiles/e65ccae1-3942-4e11-a2c9-6b7745813725/badges/6085113',
    category: 'security',
    categoryLabel: 'Cybersecurity & IAM',
    featured: false,
    skills: ['Cloud Security', 'Chronicle SIEM', 'Security Command Center (SCC)']
  },
  {
    id: 'google-cybersecurity-professional',
    title: 'Google Cybersecurity Professional Certificate',
    issuer: 'Google Career Certificates',
    issueDate: 'Jul 2023',
    credentialId: 'LBMN83USZYJL',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/certificate/LBMN83USZYJL',
    category: 'security',
    categoryLabel: 'Cybersecurity & IAM',
    featured: true,
    skills: ['Cybersecurity Foundations', 'Network Security', 'Linux Command Line', 'Python for Security', 'SIEM & IDS/IPS']
  },
  {
    id: 'cisco-cyberops-associate',
    title: 'CyberOps Associate',
    issuer: 'Cisco',
    issueDate: 'Jun 2023',
    credentialUrl: 'https://www.credly.com/badges/de99efd9-ea29-4210-b669-954cf6013825/linked_in_profile',
    category: 'security',
    categoryLabel: 'Cybersecurity & IAM',
    featured: true,
    skills: ['Cybersecurity', 'Security Operations Center (SOC)', 'Packet Analysis', 'Threat Hunting', 'Incident Response']
  },
  {
    id: 'ethical-hacking-internshala',
    title: 'Ethical Hacking Certificate',
    issuer: 'Internshala',
    issueDate: 'Feb 2021',
    credentialId: '1C2743A6-E26C-6177-E8F6-CDDDC6511959',
    credentialUrl: 'https://trainings.internshala.com/verify_certificate',
    category: 'security',
    categoryLabel: 'Cybersecurity & IAM',
    featured: false,
    skills: ['Penetration Testing', 'Vulnerability Assessment', 'OWASP Top 10', 'Web Security']
  },

  // --- ENGINEERING, MOBILE & RESEARCH ---
  {
    id: 'flutter-development-appbrewery',
    title: 'Flutter & Dart Development Bootcamp',
    issuer: 'The App Brewery',
    issueDate: 'Aug 2020',
    credentialId: 'cert_qxxvmdhq',
    category: 'engineering',
    categoryLabel: 'Specialized & Systems',
    featured: true,
    skills: ['Flutter', 'Dart', 'Android Development', 'iOS Development', 'State Management']
  },
  {
    id: 'ucsc-cpp-programming',
    title: 'Programming in C++ Certification',
    issuer: 'University of California, Santa Cruz (Coursera)',
    issueDate: 'Sep 2020',
    credentialId: 'D3RG28C7N4BY',
    credentialUrl: 'https://coursera.org/verify/D3RG28C7N4BY',
    category: 'engineering',
    categoryLabel: 'Specialized & Systems',
    featured: true,
    skills: ['C++', 'Object-Oriented Programming', 'Memory Pointers', 'STL Algorithms']
  },
  {
    id: 'isro-iirs-geoprocessing-python',
    title: 'Geoprocessing using Python',
    issuer: 'Indian Institute of Remote Sensing (IIRS), ISRO',
    issueDate: 'Jan 2021',
    credentialId: '542ead9ebfef50070c8c93cbfbc63284',
    credentialUrl: 'https://certificate.iirs.gov.in',
    category: 'engineering',
    categoryLabel: 'Specialized & Systems',
    featured: true,
    skills: ['Python', 'Geospatial Analytics', 'Remote Sensing (ISRO)', 'GIS Data Modeling']
  },
  {
    id: 'isro-iirs-sar-polarimetry',
    title: 'Advances in SAR-Polarimetry & Interferometry',
    issuer: 'Indian Institute of Remote Sensing (IIRS), ISRO',
    issueDate: 'Dec 2020',
    credentialId: 'fb9252c94c178fdf7e8686d0d023e8f8',
    credentialUrl: 'https://certificate.iirs.gov.in',
    category: 'engineering',
    categoryLabel: 'Specialized & Systems',
    featured: true,
    skills: ['Radar Remote Sensing', 'Satellite Interferometry', 'Signal Processing', 'ISRO Research']
  }
];
