export type ActivityCategory =
  | 'All experiences'
  | 'Attraction tickets'
  | 'Tours & sightseeing'
  | 'Theme parks'
  | 'Food & dining'
  | 'Transport & Wi-Fi';

export type SortOption = 'popular' | 'rating' | 'price-asc' | 'price-desc';

export type CurrencyCode = 'SGD' | 'MYR' | 'USD';

export interface ActivityPackage {
  id: string;
  name: string;
  description: string;
  adultPriceSgd: number;
  childPriceSgd: number;
  originalAdultPriceSgd?: number;
}

export interface Activity {
  id: string;
  title: string;
  category: Exclude<ActivityCategory, 'All experiences'>;
  district: string;
  image: string;
  rating: number;
  reviewCount: number;
  bookedText: string;
  bookedCountNumeric: number;
  priceSgd: number;
  originalPriceSgd?: number;
  instantConfirmation: boolean;
  freeCancellation: boolean;
  klPassEligible: boolean;
  duration: string;
  summary: string;
  highlights: string[];
  included: string[];
  meetingPoint: string;
  packages: ActivityPackage[];
}

export interface CartItem {
  cartItemId: string;
  activity: Activity;
  packageId: string;
  packageName: string;
  date: string;
  adults: number;
  children: number;
  adultPriceSgd: number;
  childPriceSgd: number;
}

export const CATEGORIES: ActivityCategory[] = [
  'All experiences',
  'Attraction tickets',
  'Tours & sightseeing',
  'Theme parks',
  'Food & dining',
  'Transport & Wi-Fi',
];

export const CURRENCY_RATES: Record<CurrencyCode, { symbol: string; rate: number; label: string }> = {
  SGD: { symbol: 'S$', rate: 1, label: 'SGD (S$)' },
  MYR: { symbol: 'RM', rate: 3.32, label: 'MYR (RM)' },
  USD: { symbol: 'US$', rate: 0.74, label: 'USD (US$)' },
};

export function formatPrice(sgdAmount: number, currency: CurrencyCode): string {
  const { symbol, rate } = CURRENCY_RATES[currency];
  const converted = sgdAmount * rate;
  return `${symbol} ${converted.toFixed(2)}`;
}

export const HERO_BANNER_IMAGE = '/src/assets/images/kl_hero_petronas_skyline_1795062376891.jpg';

export const KL_ACTIVITIES: Activity[] = [
  {
    id: 'petronas-twin-towers',
    title: 'Petronas Twin Towers Admission Ticket',
    category: 'Attraction tickets',
    district: 'KLCC',
    image: '/src/assets/images/kl_petronas_skybridge_1795062377077.jpg',
    rating: 4.8,
    reviewCount: 18420,
    bookedText: '300K+ booked',
    bookedCountNumeric: 300000,
    priceSgd: 34.5,
    originalPriceSgd: 42.0,
    instantConfirmation: true,
    freeCancellation: false,
    klPassEligible: true,
    duration: '1 hour',
    summary:
      'Ascend to the 41st-floor Skybridge connecting the world’s tallest twin skyscrapers and continue to the 86th-floor Observation Deck for panoramic views across Kuala Lumpur.',
    highlights: [
      'Walk across the iconic double-decker Skybridge suspended 170 meters above street level',
      'Take in 360-degree skyline views from the 86th-floor Observation Deck',
      'Pre-booked timed entry slot with mobile QR voucher redemption',
    ],
    included: [
      'Timed admission to Skybridge (Level 41/42)',
      'Admission to Observation Deck (Level 86)',
      'Interactive digital exhibits and gift shop access',
    ],
    meetingPoint: 'Concourse Level, Petronas Twin Towers, Kuala Lumpur City Centre',
    packages: [
      {
        id: 'petronas-standard',
        name: 'Skybridge & Observation Deck (Non-Malaysian)',
        description: 'Standard timed entry ticket for international visitors aged 13+.',
        adultPriceSgd: 34.5,
        childPriceSgd: 17.5,
        originalAdultPriceSgd: 42.0,
      },
      {
        id: 'petronas-aquaria-combo',
        name: 'Combo: Petronas Twin Towers + Aquaria KLCC',
        description: 'Same-day dual attraction entry with skip-the-counter e-tickets.',
        adultPriceSgd: 49.0,
        childPriceSgd: 29.5,
        originalAdultPriceSgd: 65.0,
      },
    ],
  },
  {
    id: 'batu-caves-cultural-tour',
    title: 'Batu Caves & Kuala Lumpur Half-Day Cultural Tour',
    category: 'Tours & sightseeing',
    district: 'Gombak',
    image: '/src/assets/images/kl_batu_caves_stairs_1795062376915.jpg',
    rating: 4.7,
    reviewCount: 9140,
    bookedText: '100K+ booked',
    bookedCountNumeric: 100000,
    priceSgd: 28.9,
    originalPriceSgd: 36.0,
    instantConfirmation: true,
    freeCancellation: true,
    klPassEligible: true,
    duration: '4 hours',
    summary:
      'Climb the 272 colorful steps past the towering golden statue of Lord Murugan into the 400-million-year-old limestone Cathedral Cave, paired with Royal Selangor Visitor Centre and Batik craft stops.',
    highlights: [
      'Morning visit to Batu Caves ahead of midday crowds and heat',
      'Insightful commentary from a licensed English-speaking guide',
      'Round-trip air-conditioned hotel pickup from central Kuala Lumpur',
    ],
    included: [
      'Round-trip transfer from KL city center hotels',
      'English-speaking driver-guide',
      'Guided stops at Batu Caves and Royal Selangor Pewter',
    ],
    meetingPoint: 'Hotel lobby pickup within Kuala Lumpur Golden Triangle / KLCC',
    packages: [
      {
        id: 'batu-shared',
        name: 'Shared Morning Tour (Hotel Pickup Included)',
        description: 'Small-coach morning departure at 09:00 AM with hotel pickup.',
        adultPriceSgd: 28.9,
        childPriceSgd: 22.0,
        originalAdultPriceSgd: 36.0,
      },
      {
        id: 'batu-private',
        name: 'Private Morning Tour (Per Pax, Min 2)',
        description: 'Dedicated air-conditioned MPV with flexible departure timing.',
        adultPriceSgd: 46.5,
        childPriceSgd: 36.0,
        originalAdultPriceSgd: 58.0,
      },
    ],
  },
  {
    id: 'sunway-lagoon-ticket',
    title: 'Sunway Lagoon Malaysia Admission Ticket',
    category: 'Theme parks',
    district: 'Bandar Sunway',
    image: '/src/assets/images/kl_sunway_lagoon_1795062377136.jpg',
    rating: 4.7,
    reviewCount: 24610,
    bookedText: '500K+ booked',
    bookedCountNumeric: 500000,
    priceSgd: 49.8,
    originalPriceSgd: 62.5,
    instantConfirmation: true,
    freeCancellation: false,
    klPassEligible: false,
    duration: 'Full day',
    summary:
      'Spend an action-packed day across six themed zones—Water Park, Amusement Park, Wildlife Park, Extreme Park, Scream Park, and Nickelodeon Lost Lagoon—featuring over 90 rides and slides.',
    highlights: [
      'All-day access to 6 adventure zones including Vuvuzela and Surf Beach',
      'Direct QR barcode entry without queuing at the ticketing counters',
      'Optional Quack Xpress wristband upgrade to bypass ride queues',
    ],
    included: [
      '1-day entry to all 6 Sunway Lagoon parks',
      'Access to over 90 rides, water slides, and wildlife exhibits',
      'Direct gate entry via mobile voucher',
    ],
    meetingPoint: 'Sunway Lagoon Main Entrance, 3 Jalan PJS 11/11, Bandar Sunway',
    packages: [
      {
        id: 'sunway-all-parks',
        name: '1-Day All-Parks Admission Ticket',
        description: 'Full access to all 6 themed zones (closed on Tuesdays except public holidays).',
        adultPriceSgd: 49.8,
        childPriceSgd: 41.5,
        originalAdultPriceSgd: 62.5,
      },
      {
        id: 'sunway-express',
        name: 'Admission + Quack Xpress Fast Lane',
        description: 'Includes priority express lane access on 21 selected rides and slides.',
        adultPriceSgd: 78.0,
        childPriceSgd: 69.5,
        originalAdultPriceSgd: 96.0,
      },
    ],
  },
  {
    id: 'menara-kl-tower',
    title: 'Menara KL Tower Observation & Sky Deck Ticket',
    category: 'Attraction tickets',
    district: 'Bukit Nanas',
    image: '/src/assets/images/kl_tower_menara_1795062376594.jpg',
    rating: 4.6,
    reviewCount: 11830,
    bookedText: '200K+ booked',
    bookedCountNumeric: 200000,
    priceSgd: 19.2,
    originalPriceSgd: 26.0,
    instantConfirmation: true,
    freeCancellation: true,
    klPassEligible: true,
    duration: '1–2 hours',
    summary:
      'Step onto the open-air Sky Deck at 300 meters or the glass-floored Sky Box for the single best vantage point of both the Petronas Twin Towers and Merdeka 118.',
    highlights: [
      'Unobstructed skyline views capturing the Petronas Twin Towers from above',
      'Choose between indoor Observation Deck or open-air Sky Deck & Sky Box',
      'Located beside KL Forest Eco Park canopy walkway',
    ],
    included: [
      'Tower elevator ride to selected viewing deck',
      'Binocular viewing stations on Observation Deck',
      'Complimentary digital souvenir photo pass (Sky Deck package)',
    ],
    meetingPoint: 'Menara Kuala Lumpur Lobby, Jalan Punchak, Off Jalan P. Ramlee',
    packages: [
      {
        id: 'kl-tower-obs',
        name: 'Indoor Observation Deck Ticket',
        description: 'Access to the 276m climate-controlled 360-degree viewing gallery.',
        adultPriceSgd: 19.2,
        childPriceSgd: 12.0,
        originalAdultPriceSgd: 26.0,
      },
      {
        id: 'kl-tower-skybox',
        name: 'Sky Deck + Sky Box + Observation Deck',
        description: 'Full access including the outdoor rooftop terrace and glass Sky Box.',
        adultPriceSgd: 31.5,
        childPriceSgd: 21.0,
        originalAdultPriceSgd: 40.0,
      },
    ],
  },
  {
    id: 'aquaria-klcc',
    title: 'Aquaria KLCC Admission Ticket',
    category: 'Attraction tickets',
    district: 'KLCC',
    image: '/src/assets/images/kl_aquaria_klcc_1795062376580.jpg',
    rating: 4.7,
    reviewCount: 15920,
    bookedText: '400K+ booked',
    bookedCountNumeric: 400000,
    priceSgd: 18.5,
    originalPriceSgd: 23.0,
    instantConfirmation: true,
    freeCancellation: true,
    klPassEligible: true,
    duration: '1.5–2 hours',
    summary:
      'Explore 5,000+ aquatic and land creatures beneath Kuala Lumpur Convention Centre, highlighted by a 90-meter transparent underwater tunnel with moving walkway.',
    highlights: [
      'Walk through the 90-meter oceanarium tunnel surrounded by sand tiger sharks and rays',
      'Daily scheduled feeding sessions at the Flooded Forest and Touch Pool',
      'Air-conditioned indoor attraction steps away from Suria KLCC',
    ],
    included: [
      'Single-entry admission to Aquaria KLCC',
      'Access to all 8 marine and freshwater exhibit zones',
      'Daily educational feeding schedules',
    ],
    meetingPoint: 'Concourse Level, Kuala Lumpur Convention Centre, KLCC',
    packages: [
      {
        id: 'aquaria-weekday',
        name: 'Standard Admission (Weekday)',
        description: 'Valid Monday through Friday excluding Malaysian public holidays.',
        adultPriceSgd: 18.5,
        childPriceSgd: 14.5,
        originalAdultPriceSgd: 23.0,
      },
      {
        id: 'aquaria-anyday',
        name: 'Any-Day Flexi Admission',
        description: 'Valid any day of the week including weekends and public holidays.',
        adultPriceSgd: 21.0,
        childPriceSgd: 16.5,
        originalAdultPriceSgd: 25.5,
      },
    ],
  },
  {
    id: 'genting-highlands-skyway',
    title: 'Genting Highlands & Awana SkyWay Day Tour',
    category: 'Tours & sightseeing',
    district: 'Genting Highlands',
    image: '/src/assets/images/kl_genting_skyway_1795062376461.jpg',
    rating: 4.6,
    reviewCount: 7850,
    bookedText: '90K+ booked',
    bookedCountNumeric: 90000,
    priceSgd: 24.0,
    originalPriceSgd: 32.0,
    instantConfirmation: true,
    freeCancellation: true,
    klPassEligible: false,
    duration: '8 hours',
    summary:
      'Escape the tropical city heat with a seamless coach transfer from KL Sentral to Genting Highlands and glide above 130-million-year-old rainforest canopy on the Awana SkyWay gondola.',
    highlights: [
      'Two-way Awana SkyWay cable car ride with complimentary stop at Chin Swee Caves Temple',
      'Cool mountain air at 1,800 meters above sea level',
      'Free time at SkyAvenue shopping, dining, and SkyWorlds perimeter',
    ],
    included: [
      'Round-trip express coach from KL Sentral',
      'Two-way standard gondola Awana SkyWay ticket',
      'Stopover access at Chin Swee Station',
    ],
    meetingPoint: 'KL Sentral Bus Terminal (Lower Ground Floor)',
    packages: [
      {
        id: 'genting-coach-cable',
        name: 'Round-Trip Coach + Two-Way SkyWay Gondola',
        description: 'Includes express bus from KL Sentral and round-trip cable car.',
        adultPriceSgd: 24.0,
        childPriceSgd: 21.0,
        originalAdultPriceSgd: 32.0,
      },
      {
        id: 'genting-glass-floor',
        name: 'Round-Trip Coach + Glass-Floor Gondola',
        description: 'Upgraded glass-bottom cabin with panoramic valley views.',
        adultPriceSgd: 31.0,
        childPriceSgd: 27.5,
        originalAdultPriceSgd: 40.0,
      },
    ],
  },
  {
    id: 'klia-ekspres-train',
    title: 'KLIA Ekspres Airport Train Ticket (KLIA ↔ KL Sentral)',
    category: 'Transport & Wi-Fi',
    district: 'KL Sentral',
    image: '/src/assets/images/kl_klia_ekspres_train_1795062376916.jpg',
    rating: 4.9,
    reviewCount: 32100,
    bookedText: '800K+ booked',
    bookedCountNumeric: 800000,
    priceSgd: 14.9,
    originalPriceSgd: 16.5,
    instantConfirmation: true,
    freeCancellation: false,
    klPassEligible: false,
    duration: '28 mins',
    summary:
      'Bypass Kuala Lumpur highway traffic with the non-stop high-speed airport rail link connecting KLIA Terminal 1 & 2 directly to KL Sentral in 28 minutes.',
    highlights: [
      'Direct QR gate scan—walk straight onto the platform with zero counter queues',
      'Onboard complimentary 4G Wi-Fi and dedicated luggage racks',
      'Trains depart every 15–20 minutes from early morning until midnight',
    ],
    included: [
      'Non-stop express rail transfer between KLIA T1/T2 and KL Sentral',
      'Complimentary onboard Wi-Fi',
      'Open-dated ticket valid for 30 days from selected date',
    ],
    meetingPoint: 'KLIA / KLIA2 Express Platform or KL Sentral Departure Hall',
    packages: [
      {
        id: 'klia-single',
        name: 'Single Trip Express Ticket (KLIA T1/T2 ↔ KL Sentral)',
        description: 'Valid for travel in either direction between airport and city.',
        adultPriceSgd: 14.9,
        childPriceSgd: 6.8,
        originalAdultPriceSgd: 16.5,
      },
      {
        id: 'klia-return',
        name: 'Return Trip Express Ticket',
        description: 'Two trips valid within 1 month for seamless arrival and departure.',
        adultPriceSgd: 28.5,
        childPriceSgd: 12.9,
        originalAdultPriceSgd: 33.0,
      },
    ],
  },
  {
    id: 'skyline-luge-kl',
    title: 'Skyline Luge Kuala Lumpur Admission Ticket',
    category: 'Theme parks',
    district: 'Gamuda Luge Gardens',
    image: '/src/assets/images/kl_skyline_luge_1795062376513.jpg',
    rating: 4.8,
    reviewCount: 4290,
    bookedText: '50K+ booked',
    bookedCountNumeric: 50000,
    priceSgd: 16.8,
    originalPriceSgd: 21.0,
    instantConfirmation: true,
    freeCancellation: true,
    klPassEligible: true,
    duration: '1.5 hours',
    summary:
      'Race down Malaysia’s first gravity-fueled Luge tracks through 650+ meters of sweeping corners, tunnels, and illuminated hillside curves, paired with the scenic Skyride chairlift.',
    highlights: [
      '4 distinct gravity tracks with banked curves, hairpins, and tunnels',
      'Includes scenic Skyride chairlift ascent back to the summit',
      'Evening LED-lit night luge sessions available on weekends',
    ],
    included: [
      'Selected number of Luge rides & Skyride chairlift rides',
      'Safety helmet rental and first-timer rider briefing',
      'Instant mobile QR voucher access',
    ],
    meetingPoint: 'Gamuda Luge Gardens, Rawang (25 mins north of KL City Center)',
    packages: [
      {
        id: 'luge-3-rides',
        name: '3 Luge & Skyride Combo',
        description: 'Three full descents and chairlift rides for one rider.',
        adultPriceSgd: 16.8,
        childPriceSgd: 16.8,
        originalAdultPriceSgd: 21.0,
      },
      {
        id: 'luge-5-rides',
        name: '5 Luge & Skyride Combo',
        description: 'Best value for trying all four hillside tracks.',
        adultPriceSgd: 23.0,
        childPriceSgd: 23.0,
        originalAdultPriceSgd: 28.5,
      },
    ],
  },
  {
    id: 'kl-hop-on-hop-off',
    title: 'KL Hop-On Hop-Off Sightseeing Bus Pass',
    category: 'Tours & sightseeing',
    district: 'City Center',
    image: '/src/assets/images/kl_hop_on_bus_1795062376573.jpg',
    rating: 4.4,
    reviewCount: 3640,
    bookedText: '40K+ booked',
    bookedCountNumeric: 40000,
    priceSgd: 17.5,
    originalPriceSgd: 22.0,
    instantConfirmation: true,
    freeCancellation: true,
    klPassEligible: true,
    duration: '24 or 48 hours',
    summary:
      'Discover over 60 Kuala Lumpur landmarks at your own pace aboard an open-top double-decker bus covering both the City Route and Garden Route with onboard audio commentary.',
    highlights: [
      '27 convenient stops including Bukit Bintang, Petaling Street, Merdeka Square, and KLCC',
      'Open-top upper deck seating for unobstructed heritage architecture photos',
      'Unlimited boarding within 24 or 48 consecutive hours',
    ],
    included: [
      '24-hour or 48-hour unlimited Hop-On Hop-Off pass',
      'Multi-language onboard audio commentary',
      'Printed city route map',
    ],
    meetingPoint: 'Board at Stop 1 (Sungei Wang Plaza, Bukit Bintang) or any marked stop',
    packages: [
      {
        id: 'hoho-24h',
        name: '24-Hour Hop-On Hop-Off Day Pass',
        description: 'Unlimited City & Garden route rides from 09:00 AM to 06:00 PM.',
        adultPriceSgd: 17.5,
        childPriceSgd: 9.5,
        originalAdultPriceSgd: 22.0,
      },
      {
        id: 'hoho-48h',
        name: '48-Hour Hop-On Hop-Off Pass',
        description: 'Two full days of unlimited sightseeing across central KL.',
        adultPriceSgd: 23.5,
        childPriceSgd: 13.0,
        originalAdultPriceSgd: 29.0,
      },
    ],
  },
  {
    id: 'jalan-alor-food-tour',
    title: 'Jalan Alor & Chinatown Evening Street Food Walk',
    category: 'Food & dining',
    district: 'Bukit Bintang',
    image: '/src/assets/images/kl_jalan_alor_food_1795062377023.jpg',
    rating: 4.9,
    reviewCount: 1980,
    bookedText: '20K+ booked',
    bookedCountNumeric: 20000,
    priceSgd: 44.0,
    originalPriceSgd: 52.0,
    instantConfirmation: true,
    freeCancellation: true,
    klPassEligible: false,
    duration: '3.5 hours',
    summary:
      'Taste Kuala Lumpur after dark with a local culinary guide through hidden back-alley kopitiams, Petaling Street stalls, and the sizzling hawker grills of Jalan Alor.',
    highlights: [
      'Sample 8+ iconic Malaysian dishes including charcoal satay, laksa, and durian puffs',
      'Small group capped at 10 travelers for authentic local stall seating',
      'Learn the heritage stories behind Malay, Chinese, and Indian street cuisines',
    ],
    included: [
      '8 curated local food tastings and 2 traditional beverages',
      'Licensed English-speaking local foodie guide',
      'Guided walk from Chinatown to Jalan Alor',
    ],
    meetingPoint: 'Pasar Seni LRT Station (Main Concourse Exit)',
    packages: [
      {
        id: 'food-small-group',
        name: 'Small Group Evening Food Walk (8+ Tastings)',
        description: 'Starts daily at 05:30 PM; vegetarian substitutes available on request.',
        adultPriceSgd: 44.0,
        childPriceSgd: 32.0,
        originalAdultPriceSgd: 52.0,
      },
      {
        id: 'food-private',
        name: 'Private Foodie Tour with Hotel Drop-Off',
        description: 'Customizable menu with private guide and return hotel transfer.',
        adultPriceSgd: 72.0,
        childPriceSgd: 52.0,
        originalAdultPriceSgd: 85.0,
      },
    ],
  },
  {
    id: 'putrajaya-cruise-tour',
    title: 'Putrajaya Pink Mosque & Traditional River Cruise Tour',
    category: 'Tours & sightseeing',
    district: 'Putrajaya',
    image: '/src/assets/images/kl_putrajaya_mosque_1795062376331.jpg',
    rating: 4.7,
    reviewCount: 2540,
    bookedText: '30K+ booked',
    bookedCountNumeric: 30000,
    priceSgd: 31.5,
    originalPriceSgd: 39.0,
    instantConfirmation: true,
    freeCancellation: true,
    klPassEligible: false,
    duration: '4 hours',
    summary:
      'Journey south of Kuala Lumpur to Malaysia’s garden administrative capital, featuring the rose-granite Putra Mosque and a serene traditional Perahu Dondang Sayang lake cruise.',
    highlights: [
      'Admire Putra Mosque’s intricate rose-tinted dome from land and water',
      '45-minute scenic lake cruise passing Seri Wawasan Bridge and Perdana Putra',
      'Convenient afternoon departure with KL city hotel pickup',
    ],
    included: [
      'Round-trip air-conditioned transport from central KL hotels',
      'Putrajaya Lake sightseeing boat cruise ticket',
      'Mosque robe rental and English-speaking guide',
    ],
    meetingPoint: 'KL City Center Hotel Lobby Pickup',
    packages: [
      {
        id: 'putrajaya-shared',
        name: 'Half-Day Shared Tour with Lake Cruise',
        description: 'Afternoon departure at 02:00 PM including traditional boat ride.',
        adultPriceSgd: 31.5,
        childPriceSgd: 24.0,
        originalAdultPriceSgd: 39.0,
      },
      {
        id: 'putrajaya-private',
        name: 'Private Putrajaya Sunset Tour',
        description: 'Dedicated vehicle and guide timed for golden-hour photography.',
        adultPriceSgd: 54.0,
        childPriceSgd: 42.0,
        originalAdultPriceSgd: 66.0,
      },
    ],
  },
  {
    id: 'klook-pass-kl',
    title: 'Klook Pass Kuala Lumpur (Save up to 42%)',
    category: 'Attraction tickets',
    district: 'Citywide',
    image: '/src/assets/images/kl_hero_petronas_skyline_1795062376891.jpg',
    rating: 4.8,
    reviewCount: 5320,
    bookedText: '70K+ booked',
    bookedCountNumeric: 70000,
    priceSgd: 48.0,
    originalPriceSgd: 82.0,
    instantConfirmation: true,
    freeCancellation: true,
    klPassEligible: true,
    duration: '30 days validity',
    summary:
      'Bundle your favorite Kuala Lumpur attractions—including Petronas Twin Towers, Aquaria KLCC, Menara KL Tower, Skyline Luge, and Batu Caves tours—under one flexible mobile pass.',
    highlights: [
      'Save up to 42% compared to purchasing standalone attraction tickets',
      'Reserve your preferred attraction dates at any time within 30 days',
      'Includes instant mobile QR vouchers for 15+ participating landmarks',
    ],
    included: [
      'Choice of 2, 3, or 4 participating Kuala Lumpur attractions',
      '30-day activation window from first attraction visit',
      '100% digital reservation management',
    ],
    meetingPoint: 'Redeem directly at each participating Kuala Lumpur attraction',
    packages: [
      {
        id: 'kl-pass-2',
        name: '2-Attraction Choice Pass',
        description: 'Pick any 2 top Kuala Lumpur landmarks or tours within 30 days.',
        adultPriceSgd: 48.0,
        childPriceSgd: 36.0,
        originalAdultPriceSgd: 82.0,
      },
      {
        id: 'kl-pass-4',
        name: '4-Attraction Explorer Pass',
        description: 'Maximum savings across 4 headline attractions and day tours.',
        adultPriceSgd: 86.0,
        childPriceSgd: 64.0,
        originalAdultPriceSgd: 148.0,
      },
    ],
  },
];

export interface TravelTip {
  title: string;
  body: string;
}

export const KL_TRAVEL_TIPS: TravelTip[] = [
  {
    title: 'Fastest route from KLIA to downtown',
    body: 'Take the KLIA Ekspres non-stop train from Terminal 1 or 2 directly to KL Sentral in 28 minutes, then connect via LRT Kelana Jaya Line to KLCC or Masjid Jamek.',
  },
  {
    title: 'When to visit Batu Caves & sky decks',
    body: 'Book Petronas Twin Towers and Menara KL slots around 5:30 PM for daylight-to-twilight skyline views, and visit Batu Caves before 9:30 AM to beat midday humidity.',
  },
  {
    title: 'Modest attire for mosques & caves',
    body: 'At Batu Caves and Putra Mosque, shoulders and knees must be covered. Putra Mosque provides complimentary hooded robes at the entrance, while sarongs are available at Batu Caves.',
  },
  {
    title: 'Bundle attractions to save up to 42%',
    body: 'If you plan to visit Petronas Twin Towers, Aquaria KLCC, and KL Tower on the same trip, the Klook Pass Kuala Lumpur locks in lower bundled rates with 30-day flexibility.',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const KL_FAQS: FaqItem[] = [
  {
    question: 'Do I need to print my Kuala Lumpur attraction vouchers?',
    answer:
      'No printing is required for the attractions listed here. Simply present your mobile QR e-voucher at the Petronas Twin Towers concourse, Aquaria KLCC entrance, Sunway Lagoon turnstiles, or KLIA Ekspres fare gates.',
  },
  {
    question: 'Are prices shown in Singapore Dollars (SGD) inclusive of taxes?',
    answer:
      'Yes. All listed SGD prices reflect current en-SG rates including applicable Malaysian service taxes. You can also switch display currency between SGD, MYR, and USD in the filter toolbar or footer.',
  },
  {
    question: 'How far in advance should I book Petronas Twin Towers tickets?',
    answer:
      'Weekend and late-afternoon Skybridge slots frequently sell out 3 to 5 days ahead. Booking online guarantees your exact timed entry window without waiting at the early-morning ticket queue.',
  },
  {
    question: 'What happens if my flight is delayed or plans change?',
    answer:
      'KLIA Ekspres tickets are open-dated for 30 days from your selected date. Activities marked with Free cancellation allow full refunds up to 24 hours before the scheduled tour start time.',
  },
];
