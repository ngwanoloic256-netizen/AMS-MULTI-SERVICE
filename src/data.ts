/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslationBundle, ServiceItem, DestinationItem, StatsItem, ProcessStep, TestimonialItem, FAQItem } from './types';

export const translations: Record<'FR' | 'EN', TranslationBundle> = {
  FR: {
    nav: {
      home: 'Accueil',
      services: 'Secteurs d\'Expertise',
      destinations: 'Destinations',
      process: 'Notre Méthode',
      testimonials: 'Réussites',
      contact: 'Prendre Rendez-vous',
      bookNow: 'Commencer mon Projet'
    },
    hero: {
      title: 'Votre passerelle vers les',
      highlight: 'opportunités internationales',
      subtitle: 'Nous transformons vos ambitions d\'études, de carrière et de mobilité internationale en un projet concret grâce à un accompagnement personnalisé.',
      ctaPrimary: 'Commencer mon projet',
      ctaSecondary: 'Parler à un conseiller WhatsApp',
      trustPilot: 'Certifié ISO 9001 • Leader de la Mobilité Académique & Professionnelle'
    },
    services: {
      sectionTitle: 'Nos Solutions d\'Accompagnement',
      sectionSubtitle: 'Un écosystème de services haut de gamme construit pour garantir la réussite de votre projet de transition internationale.',
      learnMore: 'En savoir plus',
      close: 'Fermer',
      benefitsTitle: 'Avantages clés',
      includedTitle: 'Ce qui est inclus',
      categories: {
        all: 'Tous nos services',
        studies: 'Études',
        career: 'Carrières',
        visas: 'Visas',
        integration: 'Intégration'
      }
    },
    destinations: {
      sectionTitle: 'Horizons & Destinations',
      sectionSubtitle: 'Explorez les pays d\'accueil les plus prestigieux au monde dotés d\'opportunités exceptionnelles pour vos études et votre carrière.',
      searchPlaceholder: 'Rechercher une destination...',
      allRegions: 'Toutes les régions',
      popularCities: 'Villes de premier plan',
      processingTime: 'Temps de traitement moyen',
      climate: 'Climat & Mode de vie',
      keyStatsTitle: 'Indicateurs clés',
      applyButton: 'Postuler pour cette destination',
      academicTitle: 'Voie Académique (Études)',
      careerTitle: 'Voie Professionnelle (Emploi)',
      visaTitle: 'Exigences Consulaires (Visas)'
    },
    whyChooseUs: {
      sectionTitle: 'AXE-BRIGHT HOLDING SARL en Chiffres',
      sectionSubtitle: 'Notre réputation internationale se mesure à l\'excellence de nos résultats et à la fidélité de nos clients.',
      yearsOfExperience: 'Années d\'Expérience',
      countriesAvailable: 'Destinations Actives',
      successRate: 'Taux de Succès des Dossiers',
      clientsAccompanied: 'Lauréats Accompagnés'
    },
    process: {
      sectionTitle: 'Votre Parcours Vers la Réussite',
      sectionSubtitle: 'Une méthodologie rigoureuse, étape par étape, pour transformer vos aspirations en réalité concrète et sereine.'
    },
    testimonials: {
      sectionTitle: 'Ils ont Réalisé leur Rêve',
      sectionSubtitle: 'Découvrez les témoignages inspirants de ceux qui ont osé l\'aventure internationale et qui excellent aujourd\'hui.'
    },
    faq: {
      sectionTitle: 'Questions Fréquentes',
      sectionSubtitle: 'Tout ce que vous devez savoir pour aborder votre démarche de mobilité avec assurance.'
    },
    booking: {
      sectionTitle: 'Formuler Votre Ambition',
      sectionSubtitle: 'Prenez rendez-vous avec l\'un de nos conseillers experts. Analyse personnalisée et recommandations stratégiques sous 24h.',
      fullName: 'Nom Complet',
      fullNamePlaceholder: 'M. / Mme Jean Dupont',
      phone: 'Téléphone WhatsApp',
      phonePlaceholder: '+237 6XX XX XX XX',
      email: 'Adresse E-mail',
      emailPlaceholder: 'jean.dupont@business.com',
      country: 'Destination Souhaitée',
      countryPlaceholder: 'Ex: Canada, France, USA...',
      projectType: 'Nature du Projet',
      projectPlaceholder: 'Sélectionnez le type de projet',
      projectTypes: {
        studies: 'Études Universitaires / Spécialisation',
        career: 'Opportunités & Carrière Professionnelle',
        visaVisitor: 'Démarches de Visa Visiteur',
        visaWork: 'Démarches de Visa Travailleur',
        visaStudent: 'Démarches de Visa Études',
        other: 'Autre Projet de Mobilité administrative'
      },
      preferredDate: 'Date d\'entretien souhaitée',
      message: 'Expression de vos besoins (Spécificités)',
      messagePlaceholder: 'Décrivez brièvement votre projet, vos diplômes actuels ou votre spécialité professionnelle...',
      submit: 'Valider et Planifier mon Entretien',
      submitting: 'Vérification et Transmission sécurisée...',
      successTitle: 'Demande Reçue avec Succès !',
      successMessage: 'Votre conseiller attitré a été désigné. Un message de validation vous parviendra instantanément sur WhatsApp et par e-mail afin de fixer l\'heure précise de notre première visioconférence stratégique. Bienvenue chez AXE-BRIGHT.',
      fieldsRequired: 'Veuillez remplir tous les champs obligatoires.',
      invalidEmail: 'Veuillez renseigner un e-mail valide.',
      invalidPhone: 'Veuillez saisir un numéro de téléphone ou WhatsApp valide.'
    },
    footer: {
      tagline: 'AXE-BRIGHT HOLDING SARL, leader d\'élite de l\'orientation académique, de l\'intégration professionnelle et des solutions de visa d\'affaires et de mobilités internationales.',
      headquarters: 'Siège Social & Cabinet : Yaoundé, plus précisément au Carrefour Jouvence, Cameroun.',
      quickLinks: 'Liens utiles',
      legal: 'Mentions Légales',
      terms: 'Conditions Générales de Vente',
      privacy: 'Politique de Confidentialité',
      rights: 'Tous droits réservés. Design Premium de Prestige par AXE-BRIGHT HOLDING SARL.'
    }
  },
  EN: {
    nav: {
      home: 'Home',
      services: 'Expertise Sectors',
      destinations: 'Destinations',
      process: 'Our Method',
      testimonials: 'Success Stories',
      contact: 'Book a Consultation',
      bookNow: 'Get Started'
    },
    hero: {
      title: 'Your gateway to elite',
      highlight: 'global opportunities',
      subtitle: 'We turn your academic, career, and international mobility ambitions into a concrete project through personalized, premium consulting.',
      ctaPrimary: 'Begin my project',
      ctaSecondary: 'Contact WhatsApp Specialist',
      trustPilot: 'ISO 9001 Certified • Leader in Academic & Professional Mobility'
    },
    services: {
      sectionTitle: 'Our Bespoke Solutions',
      sectionSubtitle: 'A high-end service ecosystem engineered to ensure the ultimate success of your international transition.',
      learnMore: 'Learn More',
      close: 'Close',
      benefitsTitle: 'Key Benefits',
      includedTitle: 'What is Included',
      categories: {
        all: 'All Services',
        studies: 'Studies',
        career: 'Careers',
        visas: 'Visas',
        integration: 'Integration'
      }
    },
    destinations: {
      sectionTitle: 'Horizons & Destinations',
      sectionSubtitle: 'Explore the world\'s most prestigious hosting nations, offering unique academic and career prospective landscapes.',
      searchPlaceholder: 'Search destinations...',
      allRegions: 'All Regions',
      popularCities: 'Premier Cities',
      processingTime: 'Average processing time',
      climate: 'Climate & Lifestyle',
      keyStatsTitle: 'Key metrics',
      applyButton: 'Apply for this Destination',
      academicTitle: 'Academic Path (Studies)',
      careerTitle: 'Professional Path (Careers)',
      visaTitle: 'Consular Requirements (Visas)'
    },
    whyChooseUs: {
      sectionTitle: 'AXE-BRIGHT HOLDING SARL in Figures',
      sectionSubtitle: 'Our international pedigree is reflected in our client success rate and flawless administrative execution.',
      yearsOfExperience: 'Years of Experience',
      countriesAvailable: 'Active Destinations',
      successRate: 'Visa & Admission Success Rate',
      clientsAccompanied: 'Accompanied Scholars & Professionals'
    },
    process: {
      sectionTitle: 'Your Path to Excellence',
      sectionSubtitle: 'A meticulously structured step-by-step methodology to transform your worldly dreams into a peaceful reality.'
    },
    testimonials: {
      sectionTitle: 'They Reached New Horizons',
      sectionSubtitle: 'Discover the inspiring words of scholars and professionals who trusted AMS and are now rising high.'
    },
    faq: {
      sectionTitle: 'Frequently Asked Questions',
      sectionSubtitle: 'Crucial answers you need to address your international mobility with absolute peace of mind.'
    },
    booking: {
      sectionTitle: 'Formulate Your Ambition',
      sectionSubtitle: 'Schedule your private session with an expert consultant. Get personalized analysis and strategy within 24 hours.',
      fullName: 'Full Name',
      fullNamePlaceholder: 'Mr. / Mrs. John Doe',
      phone: 'WhatsApp Phone Number',
      phonePlaceholder: '+237 6XX XX XX XX',
      email: 'E-mail Address',
      emailPlaceholder: 'john.doe@business.com',
      country: 'Desired Destination',
      countryPlaceholder: 'e.g. Canada, France, USA...',
      projectType: 'Project Nature',
      projectPlaceholder: 'Select your project type',
      projectTypes: {
        studies: 'University Studies / Academic Spec.',
        career: 'Global Career Opportunities & Job Search',
        visaVisitor: 'Visitor Visa Application Processes',
        visaWork: 'Work Visa Application Processes',
        visaStudent: 'Student Visa Application Processes',
        other: 'Other Administrative Relocation project'
      },
      preferredDate: 'Preferred Interview Date',
      message: 'Brief overview of your goals',
      messagePlaceholder: 'Describe your project, current degrees, or field of career expertise...',
      submit: 'Schedule My Private Session',
      submitting: 'Validating & Transmitting securely...',
      successTitle: 'Inquiry Successfully Received!',
      successMessage: 'Your personal high-tier consultant has been assigned. A validation link is on its way to your WhatsApp and email to lock in your exact timezone-aligned video session. Welcoming you to AXE-BRIGHT.',
      fieldsRequired: 'Please fill in all required fields.',
      invalidEmail: 'Please enter a valid email address.',
      invalidPhone: 'Please enter a valid phone number.'
    },
    footer: {
      tagline: 'AXE-BRIGHT HOLDING SARL, premier international consultancy for business and academic relocations, elite placement, and state-grade consular assistance.',
      headquarters: 'Headquarters & Office: Yaoundé, specifically at Carrefour Jouvence, Cameroon.',
      quickLinks: 'Quick Links',
      legal: 'Legal Notice',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      rights: 'All rights reserved. Premium Luxury Design by AXE-BRIGHT HOLDING SARL.'
    }
  }
};

export const getServicesData = (lang: 'FR' | 'EN'): ServiceItem[] => [
  {
    id: 'studies',
    category: 'studies',
    iconName: 'GraduationCap',
    title: lang === 'FR' ? 'Études Internationales' : 'International Studies',
    description: lang === 'FR' 
      ? 'Intégrez les meilleures universités et Grandes Écoles mondiales grâce à un accompagnement stratégique personnalisé.' 
      : 'Secure admission to top world-ranking universities and graduate schools with targeted strategic consulting.',
    longDescription: lang === 'FR'
      ? 'Notre service d\'orientation académique constitue l\'élite de la préparation universitaire. Nous définissons ensemble un plan d\'études en adéquation parfaite avec vos aptitudes, vos ambitions et les exigences d\'admission sélectives des pays cibles. De la sélection de l\'université à l\'envoi optimal de la candidature, nous gérons chaque détail de votre parcours académique.'
      : 'Our academic orientation service represents the gold standard of university preparation. Together, we define a pathway aligned with your skills, ambitions, and the competitive requirements of elite host countries. From University vetting to complete dossier finalization, we manage every layer.',
    subServices: lang === 'FR' 
      ? [
          'Orientation académique personnalisée',
          'Recherche approfondie et sélection de programmes d\'élite',
          'Accompagnement rigoureux des dossiers de candidatures',
          'Informations claires sur les bourses et possibilités de financement',
          'Soutien à la rédaction de lettres de motivation marquantes'
        ]
      : [
          'Custom academic and career counseling',
          'Rigorous research and vetting of elite programs',
          'Precision filing and management of university applications',
          'Sourcing scholarship and financial aid opportunities',
          'Masterclass assistance with essays and statement of purpose'
        ],
    benefits: lang === 'FR'
      ? ['97% d\'admissions réussies', 'Accès à +500 universités partenaires', 'Optimisation financière de vos études']
      : ['97% success rate in university entry', 'Access to 500+ world-class institutions', 'High financial and tuition optimization'],
  },
  {
    id: 'career',
    category: 'career',
    iconName: 'Briefcase',
    title: lang === 'FR' ? 'Opportunités Professionnelles' : 'Global Careers',
    description: lang === 'FR'
      ? 'Valorisez vos compétences sur le marché du travail mondial et décrochez des postes à forte valeur ajoutée.'
      : 'Leverage your corporate skills globally and land high-caliber job positions matching your professional standards.',
    longDescription: lang === 'FR'
      ? 'Le monde recèle d\'opportunités pour les professionnels qualifiés et ambitieux. AMS HOLDING Sarl vous connecte aux plateformes d\'emploi les plus sélectives et adapte vos outils de candidature aux exigences d\'embauche des structures internationales les plus exigeantes.'
      : 'The global marketplace is filled with room for qualified high-achievers. AMS HOLDING Sarl links your capability directly to key recruiters and builds your professional documents according to top world recruitment regulations.',
    subServices: lang === 'FR'
      ? [
          'Accompagnement stratégique dans la recherche d\'emploi',
          'Optimisation internationale de CV & Lettres de motivation',
          'Préparation intensive aux entretiens d\'embauche internationaux',
          'Création d\'un profil LinkedIn d\'impact mondial',
          'Réseautage professionnel ciblé par zone'
        ]
      : [
          'Strategic coaching for international job seeking',
          'Global resume (CV) translation, formatting, and optimization',
          'High-stakes foreign interview practice and simulations',
          'Global impact LinkedIn profile building',
          'Targeted professional networking across global hubs'
        ],
    benefits: lang === 'FR'
      ? ['Accompagnement par des recruteurs seniors', 'Positionnement sur des salaires attractifs', 'Accélération de carrière prouvée']
      : ['Mentoring by senior global recruiters', 'Targeting elite high-pay sectors', 'Proven career ramp-up speed'],
  },
  {
    id: 'visas',
    category: 'visas',
    iconName: 'FileCheck',
    title: lang === 'FR' ? 'Accompagnement Visa & Consulaire' : 'Consular & Visa Support',
    description: lang === 'FR'
      ? 'Maîtrisez et sécurisez vos démarches consulaires avec des experts pour tous types de visa.'
      : 'Master and secure your consular visa applications with seasoned professionals for error-free filings.',
    longDescription: lang === 'FR'
      ? 'Le visa est la clé finale de votre mobilité. Les refus sont souvent dus à des détails mineurs ou à une mauvaise structure de dossier. Nos anciens officiers administratifs et consultants experts revoient rigoureusement chaque document, s\'assurant d\'une conformité consulaire absolue et d\'une préparation irréprochable à l\'entretien.'
      : 'A visa is the final gateway of your project. Denials are typically caused by minor details or poor document arrangement. Our legal and consular experts audit every piece, securing bulletproof compliance with consular codes and delivering top-tier simulated interview preparations.',
    subServices: lang === 'FR'
      ? [
          'Accompagnement Visa d\'études (Universitaire/Langues)',
          'Constitution de dossier Visa de Travail (Employeurs)',
          'Assistance complète pour les Visas Visiteurs & Affaires',
          'Rassemblement, tri et structuration réglementaire du dossier',
          'Simulations réelles de passage devant l\'officier d\'immigration'
        ]
      : [
          'Academic and language training Visa filings',
          'Employer-sponsored Work Visa dossier management',
          'Business and Visitor high-priority Visa assistance',
          'Meticulous compilation and audit of required financial documents',
          'Authentic-feel mock immigration interview training sessions'
        ],
    benefits: lang === 'FR'
      ? ['Taux d\'approbation supérieur à 95%', 'Zéro stress administratif', 'Suivi consulaire en direct']
      : ['95%+ high approval benchmark', 'Zero administration stress', 'Direct real-time visa status updates'],
  },
  {
    id: 'integration',
    category: 'integration',
    iconName: 'Compass',
    title: lang === 'FR' ? 'Installation & Intégration' : 'Integration & Settling-in',
    description: lang === 'FR'
      ? 'Ne soyez jamais perdu. Nous vous accueillons et facilitons votre intégration dans votre pays d\'accueil.'
      : 'Never feel disoriented. We manage your welcome protocols and ease your settling in the selected nation.',
    longDescription: lang === 'FR'
      ? 'L\'arrivée dans un nouveau pays peut être déstabilisante. AMS HOLDING Sarl reste à vos côtés après l\'obtention du visa pour s\'assurer que votre transition se déroule sous les meilleurs auspices. Du logement aux démarches de banque locale, nous gérons tout.'
      : 'Arriving in an foreign country can feel overwhelming. AMS HOLDING Sarl stays by your side post-visa to anchor your safe and prestigious integration. From pristine room rentals to banking and insurance setup, we cover it all.',
    subServices: lang === 'FR'
      ? [
          'Séances d\'informations pratiques et de coaching avant le départ',
          'Accompagnement à la recherche de logement (Résidence/Privé)',
          'Guidance pour la souscription aux assurances & banques locales',
          'Accueil chaleureux à l\'aéroport et transfert sécurisé',
          'Aide aux démarches d\'enregistrement réglementaires locales'
        ]
      : [
          'Pragmatic pre-departure briefings and cultural adjustments',
          'Vetted local housing/apartment search and lease agreements',
          'Step-by-step local banking and health insurance onboarding',
          'Elite airport greeting services and private transfer',
          'Local registration and administrative standard procedures support'
        ],
    benefits: lang === 'FR'
      ? ['Arrivée sécurisée et clé en main', 'Accès à des réseaux de résidences de standing', 'Réseau d\'anciens lauréats déjà sur place']
      : ['Turnkey stress-free arrival packages', 'Select premium housing network listings', 'Instant local alumnus integration circle'],
  }
];

export const getDestinationsData = (lang: 'FR' | 'EN'): DestinationItem[] => [
  {
    id: 'canada',
    name: lang === 'FR' ? 'Canada' : 'Canada',
    code: 'CA',
    flag: '🇨🇦',
    bgImage: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&q=80&w=1200',
    description: lang === 'FR'
      ? 'Première destination pour l\'immigration francophone et des études universitaires d\'excellence, dotée d\'une politique de transition de travail post-études remarquable.'
      : 'Premier hub for French and English bilingual scholars and skilled tech/business professionals, boasting excellent post-graduation work opportunities.',
    details: {
      education: lang === 'FR' 
        ? 'Universités renommées (UdeM, McGill, Toronto, Laval). Accès aux permis de travail post-diplômes (PTPD).' 
        : 'World-renowned institutions (McGill, Toronto, UBC, Montreal). Access to Post-Graduation Work Permits (PGWP).',
      career: lang === 'FR' 
        ? 'Marché à forte demande (Tech, Ingénierie, Finance, Éducation). Processus Express Entry d\'immigration qualifiée.' 
        : 'High demand sectors (Tech, Engineering, Finance, Health). Seamless Express Entry routing for skilled workers.',
      visa: lang === 'FR' 
        ? 'Permis d\'études rigoureux, Certificat d\'Acceptation du Québec (CAQ) si applicable, garanties financières solides requises.' 
        : 'Rigorous study permit requirements, Quebec Acceptance Certificate (CAQ) if applicable, and strict proof of financial support.'
    },
    keyStats: [
      { label: lang === 'FR' ? 'Satisfaction lauréat' : 'Client satisfaction', value: '98%' },
      { label: lang === 'FR' ? 'Salaire moyen (Débutant)' : 'Avg starting salary', value: '55,000 CA$' },
      { label: lang === 'FR' ? 'Permis post-études' : 'Post-grad work permit', value: '1 à 3 ans' }
    ],
    popularCities: ['Montreal', 'Toronto', 'Vancouver', 'Quebec City'],
    climate: lang === 'FR' ? '4 saisons marquées, hivers froids et étés ensoleillés' : '4 vibrant seasons, cold cozy snowy winters',
    processingTime: lang === 'FR' ? '8 à 12 semaines' : '8 to 12 weeks'
  },
  {
    id: 'france',
    name: lang === 'FR' ? 'France' : 'France',
    code: 'FR',
    flag: '🇫🇷',
    bgImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1200',
    description: lang === 'FR'
      ? 'Capitale de la haute culture, de l\'ingénierie et du management. Écoles de Commerce triplement accréditées et universités publiques à frais modérés.'
      : 'Epicenter of luxury retail, elite engineering, and global management. Features triple-accredited business schools and cost-effective state universities.',
    details: {
      education: lang === 'FR' 
        ? 'Grandes Écoles (HEC, INSEAD, Polytechnique) et Universités d\'État prestigieuses. Droits d\'inscription subventionnés.' 
        : 'Elite Business Schools (HEC, ESSEC, INSEAD) and top Public Universities. Highly subsidized government tuition rates.',
      career: lang === 'FR' 
        ? 'Opportunités dans le luxe, l\'aérospatiale, la tech (Station F) et l\'énergie. Dispositif de Carte Talent disponible.' 
        : 'Great hubs in Luxury, Aerospace, AI, Tech (Station F). Dynamic "Passeport Talent" fast-track visas.',
      visa: lang === 'FR' 
        ? 'Études via Campus France. Obligation d\'un justificatif financier de 615€ minimum par mois d\'études.' 
        : 'Studies validated via Campus France. Strict monthly financial guarantee of €615 minimum required.'
    },
    keyStats: [
      { label: lang === 'FR' ? 'Partenariats Écoles' : 'Elite partner schools', value: '180+' },
      { label: lang === 'FR' ? 'Accès bourses d\'études' : 'Scholarship access', value: 'Élevé' },
      { label: lang === 'FR' ? 'Taux d\'admission AMS' : 'AMS admission rate', value: '99%' }
    ],
    popularCities: ['Paris', 'Lyon', 'Toulouse', 'Bordeaux'],
    climate: lang === 'FR' ? 'Climat tempéré, étés chauds agréables, hivers doux' : 'Temperate climate, warm lovely summers, mild winters',
    processingTime: lang === 'FR' ? '4 à 6 semaines' : '4 to 6 weeks'
  },
  {
    id: 'usa',
    name: lang === 'FR' ? 'États-Unis' : 'United States',
    code: 'US',
    flag: '🇺🇸',
    bgImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1200',
    description: lang === 'FR'
      ? 'La terre des opportunités globales et de la recherche. Le berceau de la Silicon Valley, d\'Harvard et du MIT, offrant un réseautage hors du commun.'
      : 'The absolute land of global scale and disruptive research. Capital of Silicon Valley, Harvard, MIT, and exceptional industry networking.',
    details: {
      education: lang === 'FR' 
        ? 'Ivy League, Universités d\'État majeures. Programmes de recherche généreusement financés par des bourses.' 
        : 'Ivy League, major state research units. Comprehensive master fellowships and assistantship allocations.',
      career: lang === 'FR' 
        ? 'Plus grand marché pour la Tech, l\'Audit, la Finance d\'affaires et les Médias. Dispositif de visa H-1B, L1 ou O1.' 
        : 'Largest tech, finance, corporate and consulting hub. OPT, H-1B, and L1 visas available for top performers.',
      visa: lang === 'FR' 
        ? 'Visa Étudiant F-1 (nécessite le formulaire I-20 délivré par l\'établissement) avec entretien consulaire hautement sélectif.' 
        : 'Student F-1 Visa (requires pre-issued form I-20 from university) with highly evaluated consular test questions.'
    },
    keyStats: [
      { label: lang === 'FR' ? 'Potentiel réseau' : 'Alumni network power', value: 'Maximum' },
      { label: lang === 'FR' ? 'Stage d\'études (OPT)' : 'USA OPT duration', value: '1 à 3 ans' },
      { label: lang === 'FR' ? 'Financements obtenus' : 'Total aid secured', value: 'Premium' }
    ],
    popularCities: ['New York', 'Boston', 'San Francisco', 'Chicago'],
    climate: lang === 'FR' ? 'Vaste diversité climatique selon l\'État choisi' : 'Extremely diverse depending on state, from snowy to sunny',
    processingTime: lang === 'FR' ? '4 à 8 semaines' : '4 to 8 weeks'
  },
  {
    id: 'uk',
    name: lang === 'FR' ? 'Royaume-Uni' : 'United Kingdom',
    code: 'GB',
    flag: '🇬🇧',
    bgImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1200',
    description: lang === 'FR'
      ? 'Tradition académique légendaire au cœur de l\'Europe. Pays de la recherche de pointe, d\'Oxford, de Cambridge et des meilleures écoles de finance.'
      : 'Legendary academic traditions at the crossroads of Europe. Home to elite research, Oxford, Cambridge, and world-leading business hubs.',
    details: {
      education: lang === 'FR' 
        ? 'Universités d\'élite (Russel Group). Diplômes de Master condensés sur 1 an seulement, optimisant le budget.' 
        : 'Elite Russel Group institutions. Highly optimized 1-year Master Degrees, cutting living cost burdens in half.',
      career: lang === 'FR' 
        ? 'La City de Londres, hub mondial de la finance d\'investissement, du consulting strategique et des fintech.' 
        : 'The City of London: global finance core, high-end strategy consultation, and thriving European startups.',
      visa: lang === 'FR' 
        ? 'Student Visa basé sur un système de points. Visa "Graduate" de 2 ans autorisé automatiquement après le diplôme.' 
        : 'Point-based Student Visa system. Automated 2-year Graduate Visa (PSW) upon successful program completion.'
    },
    keyStats: [
      { label: lang === 'FR' ? 'Master d\'études' : 'Master program length', value: '12 mois' },
      { label: lang === 'FR' ? 'Dossier académique' : 'Academic prestige', value: 'Centenaire' },
      { label: lang === 'FR' ? 'Visa Graduate Accordé' : 'PSW success rates', value: '100%' }
    ],
    popularCities: ['London', 'Oxford', 'Cambridge', 'Manchester'],
    climate: lang === 'FR' ? 'Tempéré océanique, saisons douces et pluies d\'Écosse' : 'Temperate oceanic, green mild winters, beautiful spring days',
    processingTime: lang === 'FR' ? '3 à 6 semaines' : '3 to 6 weeks'
  },
  {
    id: 'germany',
    name: lang === 'FR' ? 'Allemagne' : 'Germany',
    code: 'DE',
    flag: '🇩🇪',
    bgImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=1200',
    description: lang === 'FR'
      ? 'La puissance industrielle de l\'Europe. Des études universitaires gratuites ou presque, et une pénurie de main-d\'œuvre spécialisée à combler absolument.'
      : 'The leading industrial force of Europe. Offers tuition-free public universities and supreme technical careers to address key talent scarcity.',
    details: {
      education: lang === 'FR' 
        ? 'Universités de très haut rang technique (TU9). Frais d\'études de 0€ dans la plupart des Länder publics.' 
        : 'Top ranked technical elite institutions (TU9). Zero tuition fees across almost all municipal state universities.',
      career: lang === 'FR' 
        ? 'Fortes opportunités Industrielles (Automobile, Énergie, Chimie, Électronique, IT). Carte Bleue Européenne.' 
        : 'Maximum potential for engineers, computer scientists, and builders. Fast access to the European Blue Card.',
      visa: lang === 'FR' 
        ? 'Obligation de déposer une preuve financière sous forme de "Compte Bloqué" (Sperrkonto) d\'environ 11 900€ requis.' 
        : 'Visa requires a German Blocked Bank Account (Sperrkonto) loaded with approx. €11,900 to cover living security.'
    },
    keyStats: [
      { label: lang === 'FR' ? 'Frais d\'inscription' : 'Tuition fees public', value: '0 €' },
      { label: lang === 'FR' ? 'Droit de travail étudiant' : 'Student working rights', value: '20h/semaine' },
      { label: lang === 'FR' ? 'Secteurs d\'embauche' : 'Hiring rate technical', value: '96%' }
    ],
    popularCities: ['Munich', 'Berlin', 'Frankfurt', 'Stuttgart'],
    climate: lang === 'FR' ? 'Saisons harmonieuses, printemps magnifiques, hivers froids' : 'Vibrant temperate, beautiful forests, mild warm summers',
    processingTime: lang === 'FR' ? '6 à 10 semaines' : '6 to 10 weeks'
  },
  {
    id: 'uae',
    name: lang === 'FR' ? 'Émirats Arabes Unis' : 'United Arab Emirates',
    code: 'AE',
    flag: '🇦🇪',
    bgImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200',
    description: lang === 'FR'
      ? 'La place tournante du Moyen-Orient. Une fiscalité de 0% sur le revenu individuel, des projets d\'envergure futuristes et des campus délocalisés prestigieux.'
      : 'The ultimate luxury trading hub. 0% personal income tax, stunning progressive infrastructure, and ultra-prestigious satellite international campuses.',
    details: {
      education: lang === 'FR' 
        ? 'Campus exclusifs d\'universités internationales de renom (Birmingham Dubai, Sorbonne Abou Dabi, NYU).' 
        : 'Double-degree global campuses from elite partners (University of Birmingham Dubai, Sorbonne Abu Dhabi, NYU).',
      career: lang === 'FR' 
        ? 'Secteur d\'affaires ultra-dynamique, Finance, Immobilier de luxe, Gestion et Nouvelles Technologies. Pas d\'impôt.' 
        : 'High velocity commercial environment, luxurious real estate, consulting wealth, green tech. Zero tax.',
      visa: lang === 'FR' 
        ? 'Résidence de travail parrainée, ou Visa d\'études sponsorisé par l\'université choisie. Visa d\'Or d\'excellence disponible.' 
        : 'Company-sponsored residency permit, or university-linked study sponsorship cards. Premium Golden Visa routes.'
    },
    keyStats: [
      { label: lang === 'FR' ? 'Impôt sur le Revenu' : 'Income tax rate', value: '0%' },
      { label: lang === 'FR' ? 'Sécurité publique' : 'Safety rank world', value: 'Top 3' },
      { label: lang === 'FR' ? 'Qualité immobilière' : 'Housing standard', value: 'Luxueux' }
    ],
    popularCities: ['Dubai', 'Abu Dhabi', 'Sharjah'],
    climate: lang === 'FR' ? 'Climat subtropical chaud et ensoleillé toute l\'année' : 'Arid subtropical, bright beautiful sun 365 days a year',
    processingTime: lang === 'FR' ? '3 à 4 semaines' : '3 to 4 weeks'
  }
];

export const getStatsData = (lang: 'FR' | 'EN'): StatsItem[] => [
  {
    value: '1,200+',
    numericValue: 1200,
    label: lang === 'FR' ? 'Lauréats Accompagnés' : 'Successful Candidates',
    iconName: 'Users'
  },
  {
    value: '18+',
    numericValue: 18,
    label: lang === 'FR' ? 'Universités & Partenariats Pays' : 'Active Partner Nations',
    iconName: 'Globe'
  },
  {
    value: '10+',
    numericValue: 10,
    label: lang === 'FR' ? 'Années d\'Expérience' : 'Years of Legacy',
    iconName: 'Award'
  },
  {
    value: '98.4%',
    numericValue: 98,
    label: lang === 'FR' ? 'Taux de Satisfaction' : 'Client Satisfaction Rate',
    iconName: 'ShieldCheck'
  }
];

export const getProcessStepsData = (lang: 'FR' | 'EN'): ProcessStep[] => [
  {
    step: '01',
    title: lang === 'FR' ? 'Audit & Consultation Stratégique' : '1. Strategic Consult & Deep Audit',
    description: lang === 'FR'
      ? 'Entretien approfondi de 45 min avec nos experts. Nous analysons vos antécédents académiques, professionnels et vos budgets pour bâtir la meilleure orientation possible.'
      : 'In-depth 45-minute core discussion. We audit your academic transcripts, career profile, and personal budget goals to draw the most viable vector.'
  },
  {
    step: '02',
    title: lang === 'FR' ? 'Ciblage Réseau & Admissions' : '2. Selective Program Targeting',
    description: lang === 'FR'
      ? 'Sélection des programmes, rédaction premium des lettres, relecture de CV international et soumission guidée des dossiers d\'admission par nos officiers dédiés.'
      : 'Refined school matching, high-grade personal statement preparation, international CV polishing, and targeted submission handling by specialized officers.'
  },
  {
    step: '03',
    title: lang === 'FR' ? 'Ingénierie Consulaire Visa' : '3. Consular Visa Engineering',
    description: lang === 'FR'
      ? 'Modélisation, tri stratégique et assemblage rigoureux du dossier de demande de visa. Simulations régulières de l\'entretien d\'immigration pour dissiper tout stress.'
      : 'Perfect planning, sourcing of financial backup evidence, and seamless compilation of requirements. Intensive mock visa interviews with seasoned advisors.'
  },
  {
    step: '04',
    title: lang === 'FR' ? 'Pre-Departure & Logistique' : '4. Pre-Departure and Logistics',
    description: lang === 'FR'
      ? 'Séminaire stratégique obligatoire d\'intégration, réservation de logements certifiés, transferts aéroportuaires dédiés et ouverture de votre compte bancaire à distance.'
      : 'Compulsory strategic integration briefing, housing assignment, airport shuttle, remote bank account opening and safety networks.'
  }
];

export const getTestimonialsData = (lang: 'FR' | 'EN'): TestimonialItem[] => [
  {
    id: 't1',
    name: 'Samuel Ebanda',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    destination: lang === 'FR' ? 'Canada (HEC Montréal)' : 'Canada (HEC Montreal)',
    flag: '🇨🇦',
    rating: 5,
    role: lang === 'FR' ? 'Lauréat Étudiant - M.Sc Finance' : 'Scholastic Candidate - M.Sc Finance',
    text: lang === 'FR'
      ? 'Grâce aux spécialistes d\'AMS HOLDING Sarl, j\'ai décroché mon admission à HEC Montréal et mon permis d\'étude en un temps record de 6 semaines. Leur accompagnement financier m\'a évité les pièges habituels.'
      : 'Thanks to AMS HOLDING specialists, I secured my high-priority HEC Montreal ticket and study visa in a record 6 weeks. Their rigorous financial dossier framework secured quick approval.'
  },
  {
    id: 't2',
    name: 'Emilie Dubois',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    destination: lang === 'FR' ? 'France (INSA Lyon)' : 'France (INSA Lyon)',
    flag: '🇫🇷',
    rating: 5,
    role: lang === 'FR' ? 'Ingénieure Informatique Intégrée' : 'Onboarded software developer',
    text: lang === 'FR'
      ? 'Le professionnalisme d\'AMS est incomparable. Ils m\'ont conseillée sur la préparation de mes examens et m\'ont accompagnée jusqu\'à l\'installation dans ma résidence étudiante à Lyon.'
      : 'The elite standards of AMS is outstanding. They coached me on the Campus France exams and personally managed my dormitory settling-in details around Lyon.'
  },
  {
    id: 't3',
    name: 'Marc-André K.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    destination: lang === 'FR' ? 'Émirats Arabes Unis (Dubaï)' : 'United Arab Emirates (Dubai)',
    flag: '🇦🇪',
    rating: 5,
    role: lang === 'FR' ? 'Consultant IT Finance - Recrutement Direct' : 'IT Finance Consultant - Direct Hire',
    text: lang === 'FR'
      ? 'J\'étais sceptique au départ quant aux opportunités d\'emploi à Dubaï. AMS a refait mon CV en anglais technique, m\'a mise en relation avec un recruteur de premier plan, et géré mon permis de travail.'
      : 'I was hesitant about corporate relocations to Dubai. AMS optimized my IT resume according to local standards, targeted top recruiters, and structured my residence card effortlessly.'
  }
];

export const getFAQData = (lang: 'FR' | 'EN'): FAQItem[] => [
  {
    id: 'faq1',
    category: 'general',
    question: lang === 'FR' ? 'Combien de temps à l\'avance dois-je débuter mes démarches ?' : 'How far in advance should I start my application?',
    answer: lang === 'FR'
      ? 'Il est vivement conseillé de commencer l\'orientation académique et professionnelle 6 à 9 mois avant la rentrée ou la rentrée universitaire visée. Cela laisse le temps de préparer les examens linguistiques, de sécuriser l\'admission et de soumettre la demande de visa sereinement.'
      : 'We highly suggest initializing your acadmic or professional mapping process 6 to 9 months before your selected target semester or relocation date. This secures maximum room to sit language requirements, obtain fast school approvals, and approach consular steps with comfort.'
  },
  {
    id: 'faq2',
    category: 'finances',
    question: lang === 'FR' ? 'Proposez-vous des garanties ou cautionnements financiers pour le visa ?' : 'Do you provide financial backing guarantees for visas?',
    answer: lang === 'FR'
      ? 'Nous vous guidons quant aux justificatifs appropriés (comptes bloqués comme en Allemagne ou justificatifs bancaires d\'hébergeurs). Nous n\'octroyons pas de prêts financiers, mais notre cellule d\'ingénierie financière audite et assure la présentation irréprochable de vos fonds selon les lois consulaires.'
      : 'We provide structured advice and audits on acceptable consular financial proof (such as Blocked Sperrkonto accounts in Germany or parent funding certificates). We do not grant personal loans directly, but our financial audit cell strictly aligns your family funds to meet immigration standards.'
  },
  {
    id: 'faq4',
    category: 'success',
    question: lang === 'FR' ? 'Quel est votre taux de réussite pour l\'obtention des visas ?' : 'What is your historical visa approval success rate?',
    answer: lang === 'FR'
      ? 'Sur l\'année écoulée, notre équipe affiche un taux de réussite exceptionnel de 98.4% sur l\'admission universitaire et de plus de 95% sur la validation des visas grâce à l\'expertise de nos anciens cadres d\'ambassades et auditeurs.'
      : 'Over the past analytical year, our elite team of former administrative officials secured a top 98.4% university admission rate and over 95% final visa acceptance benchmark through rigorous validation checklists.'
  }
];
