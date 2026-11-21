export interface Sephira {
  id: string;
  number: number; // 0 for Da'ath, 1-10 for Sephiroth
  name: string;
  hebrewName: string;
  translation: string;
  pillar: 'Severity' | 'Mildness' | 'Mercy';
  coordinates: { x: number; y: number }; // Relative percentage position on diagram
  
  // Golden Dawn Color Scales
  colors: {
    atziluth: string; // King Scale (HEX/CSS)
    briah: string;    // Queen Scale
    yetzirah: string; // Prince Scale
    assiah: string;   // Princess Scale
  };
  colorDescriptions: {
    atziluth: string;
    briah: string;
    yetzirah: string;
    assiah: string;
  };

  // Primary Qabalistic Attributions
  divineName: string;
  archangel: string;
  angelicOrder: string;
  astrological: string;
  element: string;
  chakraOrBodyPart: string;
  magicalImage: string;
  spiritualExperience: string;
  virtue: string;
  vice: string;
  symbols: string[];
  preciousStone: string;
  incenseAndPlants: string;
  tarotCards: string;

  // Esoteric Commentary & Descriptions
  overview: string;
  dionFortuneInsight: string;
  regardieInsight: string;
  pathworkingGuidance: string;
}

export interface Path {
  id: string;
  number: number; // 11 to 32
  name: string; // e.g. "The Scintillating Intelligence"
  fromSephiraId: string;
  toSephiraId: string;
  hebrewLetter: string;
  hebrewLetterName: string;
  letterMeaning: string;
  tarotKey: string;
  tarotCardName: string;
  attributionType: 'Element' | 'Planet' | 'Zodiac';
  attribution: string; // e.g. "Air", "Mercury", "Aries"
  symbolIcon: string; // e.g. "♈", "🜁", "☿"

  // Path Color Scales
  colors: {
    atziluth: string;
    briah: string;
    yetzirah: string;
    assiah: string;
  };

  overview: string;
  pathworkingMeditation: string;
}

export interface PillarInfo {
  id: 'Severity' | 'Mildness' | 'Mercy';
  title: string;
  hebrewName: string;
  symbolicColor: string;
  sephirothIds: string[];
  quality: string;
  description: string;
}

export const PILLARS_DATA: Record<string, PillarInfo> = {
  Severity: {
    id: 'Severity',
    title: 'Pillar of Severity (Left)',
    hebrewName: 'Boaz (בֹּעַז)',
    symbolicColor: '#1e293b', // Dark Obsidian
    sephirothIds: ['binah', 'geburah', 'hod'],
    quality: 'Form, Restriction, Passive Female Principle (Binah/Form/Passivity)',
    description: 'The Pillar of Form and Discipline. Represents contraction, structure, judgment, and discernment. It balances the expansive energy of the Pillar of Mercy by giving it boundaries and container.'
  },
  Mildness: {
    id: 'Mildness',
    title: 'Pillar of Mildness (Middle)',
    hebrewName: 'Pillar of Equilibrium',
    symbolicColor: '#eab308', // Gold / Sun
    sephirothIds: ['kether', 'daath', 'tiphareth', 'yesod', 'malkuth'],
    quality: 'Consciousness, Harmony, Synthesis, Direct Line of Divine Grace',
    description: 'The Axis of Consciousness and Ascent. Known as the Middle Way or the Shekinah path. It harmonizes the extremes of Force (Mercy) and Form (Severity) into pure spiritual equilibrium.'
  },
  Mercy: {
    id: 'Mercy',
    title: 'Pillar of Mercy (Right)',
    hebrewName: 'Jachin (יָכִין)',
    symbolicColor: '#e0e7ff', // Radiant White/Silver
    sephirothIds: ['chokmah', 'chesed', 'netzach'],
    quality: 'Force, Expansion, Active Male Principle (Chokmah/Force/Wisdom)',
    description: 'The Pillar of Dynamic Energy and Expansion. Represents unbridled creation, boundless love, illumination, and outward radiance. Requires the Pillar of Severity to prevent chaotic dissipation.'
  }
};

export const SEPHIROTH_DATA: Sephira[] = [
  {
    id: 'kether',
    number: 1,
    name: 'Kether',
    hebrewName: 'כֶּתֶר',
    translation: 'Crown',
    pillar: 'Mildness',
    coordinates: { x: 50, y: 8 },
    colors: {
      atziluth: '#FFFFFF',
      briah: '#F8FAFC',
      yetzirah: '#F1F5F9',
      assiah: '#E2E8F0'
    },
    colorDescriptions: {
      atziluth: 'Brilliant Pure White Light',
      briah: 'Pure White Light Radiance',
      yetzirah: 'Pure White Light Sparkles',
      assiah: 'White Flecked with Gold'
    },
    divineName: 'Eheieh (אהיה - "I Am That I Am")',
    archangel: 'Metatron (Prince of the Countenance)',
    angelicOrder: 'Chaioth ha-Qadesh (Holy Living Creatures)',
    astrological: 'Rashith ha-Gilgalim (First Swirlings / Primum Mobile)',
    element: 'Pure Divine Spirit / Source Light',
    chakraOrBodyPart: 'Cranium / Above the Head (Crown Chakra)',
    magicalImage: 'An Ancient Beard King Seen in Profile (Solely the Right Side)',
    spiritualExperience: 'Union with God / Complete Enlightenment',
    virtue: 'Attainment / Completion of the Great Work',
    vice: 'None (Pure Potential before Dualistic Fall)',
    symbols: ['Point', 'Crown', 'Swastika / Spiral', 'Ring Pass-Not'],
    preciousStone: 'Diamond',
    incenseAndPlants: 'Ambergris / Lotus',
    tarotCards: 'The Four Aces',
    overview: 'Kether is the supreme source of all manifestation, the primordial unity prior to all differentiation and duality. It is the unmanifest root from which the Tree of Life germinates.',
    dionFortuneInsight: 'In "The Mystical Qabalah", Dion Fortune describes Kether as the point within the circle, the first manifestation out of the Ain Soph Aur. It is pure being without form, the source of all life and spirit.',
    regardieInsight: 'Israel Regardie emphasizes Kether as the supreme spiritual center in humanity—the Divine Spark (Yechidah) above individual ego consciousness.',
    pathworkingGuidance: 'Meditate on absolute silence and pure brilliant white light above the crown of your head. Dissolve all concepts of self and other into the infinite I AM.'
  },
  {
    id: 'chokmah',
    number: 2,
    name: 'Chokmah',
    hebrewName: 'חָכְמָה',
    translation: 'Wisdom',
    pillar: 'Mercy',
    coordinates: { x: 80, y: 20 },
    colors: {
      atziluth: '#38BDF8',
      briah: '#0284C7',
      yetzirah: '#0369A1',
      assiah: '#0C4A6E'
    },
    colorDescriptions: {
      atziluth: 'Pure Soft Blue',
      briah: 'Grey',
      yetzirah: 'Pearl-Grey Iridescent',
      assiah: 'White Flecked Red, Blue, & Yellow'
    },
    divineName: 'Yah (יה - "The Lord")',
    archangel: 'Raziel (Herald of Deity / Secret Keeper)',
    angelicOrder: 'Auphanim (Wheels / Galaxies)',
    astrological: 'Mazloth (Sphere of Fixed Stars / Zodiac)',
    element: 'Dynamic Creative Fire / Archetypal Masculine',
    chakraOrBodyPart: 'Left Side of Face / Right Brain',
    magicalImage: 'A Bearded Man / Powerful Kingship Figure',
    spiritualExperience: 'The Vision of God Face to Face',
    virtue: 'Devotion / Pure Energy Impulse',
    vice: 'Bigotry / Blind Unguided Energy',
    symbols: ['The Lingam', 'The Phallus', 'The Line', 'The Inner Robe of Glory'],
    preciousStone: 'Star Ruby / Turquoise / Sapphire',
    incenseAndPlants: 'Musk / Hashish / Frankincense',
    tarotCards: 'The Four Twos',
    overview: 'Chokmah is the Great Father (Abba), the dynamic kinetic energy of creation pushing outward from Kether. It is pure wisdom, kinetic impulse, and spiritual force.',
    dionFortuneInsight: 'Dion Fortune highlights Chokmah as the primordial masculine force—the Great Stimulator that fertilizes Binah (the Great Mother).',
    regardieInsight: 'Regardie describes Chokmah as the cosmic energy in motion before it is contained or structured into matter.',
    pathworkingGuidance: 'Visualize a boundless cosmic night filled with swirling galaxies and infinite electric potential, feeling the vital surge of divine life force.'
  },
  {
    id: 'binah',
    number: 3,
    name: 'Binah',
    hebrewName: 'בִּינָה',
    translation: 'Understanding',
    pillar: 'Severity',
    coordinates: { x: 20, y: 20 },
    colors: {
      atziluth: '#A855F7',
      briah: '#000000',
      yetzirah: '#4C1D95',
      assiah: '#3B0764'
    },
    colorDescriptions: {
      atziluth: 'Crimson',
      briah: 'Black',
      yetzirah: 'Dark Brown',
      assiah: 'Grey Flecked Pink'
    },
    divineName: 'YHVH Elohim (יהוה אלהים - "Lord God")',
    archangel: 'Tzaphkiel (Beholder of God / Watcher)',
    angelicOrder: 'Aralim (Thrones / Strong Ones)',
    astrological: 'Shabbathai (Sphere of Saturn)',
    element: 'Archetypal Water / Great Sea (Marah)',
    chakraOrBodyPart: 'Right Side of Face / Left Brain',
    magicalImage: 'A Mature Woman / A Matron / The Queen on Her Throne',
    spiritualExperience: 'Vision of Sorrow / Understanding of Karma',
    virtue: 'Silence / Discipline / Purity',
    vice: 'Avarice / Melancholy / Rigidity',
    symbols: ['The Yoni', 'The Chalice / Cup', 'The Outer Robe of Concealment'],
    preciousStone: 'Pearl / Star Sapphire / Onyx',
    incenseAndPlants: 'Myrrh / Cypress / Belladonna',
    tarotCards: 'The Four Threes',
    overview: 'Binah is the Great Mother (Ama/Aima), the archetype of Form, Gestation, and Matrix. She receives the raw force of Chokmah and gives it shape, time, and limit.',
    dionFortuneInsight: 'Fortune notes that Binah is the root of form and time. She is both the Giver of Life and the Weaver of Fate and Death through physical birth.',
    regardieInsight: 'Regardie focuses on Binah as the cosmic womb from which all archetype patterns crystallize into tangible reality.',
    pathworkingGuidance: 'Contemplate the quiet stillness of the dark deep sea, receiving form into sacred space and honoring the boundaries that enable existence.'
  },
  {
    id: 'daath',
    number: 0,
    name: "Da'ath",
    hebrewName: 'דַּעַת',
    translation: 'Knowledge (The Hidden Sphere / Abyss)',
    pillar: 'Mildness',
    coordinates: { x: 50, y: 32 },
    colors: {
      atziluth: '#818CF8',
      briah: '#4338CA',
      yetzirah: '#312E81',
      assiah: '#1E1B4B'
    },
    colorDescriptions: {
      atziluth: 'Lavender / Violet Electric',
      briah: 'Deep Royal Purple',
      yetzirah: 'Prismatic Iridescent Void',
      assiah: 'Deep Indigo Flecked Gold'
    },
    divineName: 'YHVH Elohim (Concealed Aspect) / Choronzon (Guardian of Abyss)',
    archangel: 'Metatron (Upper Aspect) & Raziel (Secret Aspect)',
    angelicOrder: 'Seraphim / Cosmic Messengers',
    astrological: 'Sirius / Pluto / The Void',
    element: 'Ether / Akasha / Cosmic Mind',
    chakraOrBodyPart: 'Throat / Neck (Throat Chakra)',
    magicalImage: 'A Head with Two Faces Looking Both Ways / Janus / Invisible Presence',
    spiritualExperience: 'Crossing the Abyss / Realization of Divine Truth',
    virtue: 'Detachment / Transcendence of Illusion',
    vice: 'Intellectual Pride / Madness / Dispersion',
    symbols: ['The Abyss', 'The Bridge', 'The Prism', 'The Scroll of Mystery'],
    preciousStone: 'Alexandrite / Black Diamond',
    incenseAndPlants: 'Nightshade / Wormwood',
    tarotCards: 'The Mystery of the Blank Card',
    overview: "Da'ath is not a standard Sephira, but the mystical union of Chokmah (Wisdom) and Binah (Understanding), creating Knowledge. It lies over the perilous Abyss separating the Supernal Triad from lower creation.",
    dionFortuneInsight: "Dion Fortune describes Da'ath as the gateway between the divine realm of archetypes and the psychological mind of humanity.",
    regardieInsight: "Regardie notes that crossing Da'ath requires relinquishing ego-identity completely to be reborn in higher spiritual awareness.",
    pathworkingGuidance: "Stand courageously at the edge of the Abyss, surrendering limited intellectual certainty to step across the void into divine revelation."
  },
  {
    id: 'chesed',
    number: 4,
    name: 'Chesed',
    hebrewName: 'חֶסֶד',
    translation: 'Mercy / Loving Kindness (Gedulah)',
    pillar: 'Mercy',
    coordinates: { x: 80, y: 44 },
    colors: {
      atziluth: '#2563EB',
      briah: '#1D4ED8',
      yetzirah: '#1E40AF',
      assiah: '#1E3A8A'
    },
    colorDescriptions: {
      atziluth: 'Deep Violet Blue',
      briah: 'Blue',
      yetzirah: 'Deep Purple Blue',
      assiah: 'Deep Azure Flecked Yellow'
    },
    divineName: 'El (אל - "The Almighty")',
    archangel: 'Tzadkiel (Righteousness of God)',
    angelicOrder: 'Chasmalim (Brilliant / Shining Ones)',
    astrological: 'Tzedek (Sphere of Jupiter)',
    element: 'Water of Life / Benevolent Majesty',
    chakraOrBodyPart: 'Left Arm / Shoulder',
    magicalImage: 'A Mighty Crowned King Seated on His Throne',
    spiritualExperience: 'Vision of Love and Benevolence',
    virtue: 'Obedience / Generosity / Compassion',
    vice: 'Tyranny / Hypocrisy / Gluttony',
    symbols: ['The Tetrahedron / Pyramid', 'The Scepter', 'The Orb', 'The Crook'],
    preciousStone: 'Amethyst / Lapis Lazuli / Sapphire',
    incenseAndPlants: 'Cedar / Cinnamon / Nutmeg',
    tarotCards: 'The Four Fours',
    overview: 'Chesed is the first sphere of manifested governance, embodying divine grace, abundance, expansion, order, and loving organization.',
    dionFortuneInsight: 'In "The Mystical Qabalah", Fortune describes Chesed as the ideal ruler and builder who establishes order, law, and prosperity throughout creation.',
    regardieInsight: 'Regardie highlights Chesed as the benevolent preserver that organizes raw force into loving harmony.',
    pathworkingGuidance: 'Feel a royal azure warmth expand from your heart, wrapping all living beings in boundless unconditional grace and protection.'
  },
  {
    id: 'geburah',
    number: 5,
    name: 'Geburah',
    hebrewName: 'גְּבוּרָה',
    translation: 'Severity / Strength (Din)',
    pillar: 'Severity',
    coordinates: { x: 20, y: 44 },
    colors: {
      atziluth: '#EF4444',
      briah: '#DC2626',
      yetzirah: '#B91C1C',
      assiah: '#991B1B'
    },
    colorDescriptions: {
      atziluth: 'Orange-Red',
      briah: 'Scarlet Red',
      yetzirah: 'Bright Scarlet',
      assiah: 'Red Flecked Black'
    },
    divineName: 'Elohim Gibor (אלהים גבור - "God of Might")',
    archangel: 'Camael (He Who Sees God / Archangel of Fire)',
    angelicOrder: 'Seraphim (Fiery Serpents)',
    astrological: 'Madim (Sphere of Mars)',
    element: 'Fiery Purifying Strength',
    chakraOrBodyPart: 'Right Arm / Shoulder',
    magicalImage: 'A Mighty Warrior in his Chariot with Sword',
    spiritualExperience: 'Vision of Power and Justice',
    virtue: 'Energy / Courage / Righteous Action',
    vice: 'Cruelty / Destructiveness / Wrath',
    symbols: ['The Pentagram', 'The Sword', 'The Spear', 'The Scourge / Whip'],
    preciousStone: 'Ruby / Garnet',
    incenseAndPlants: 'Tobacco / Dragon\'s Blood / Pepper',
    tarotCards: 'The Four Fives',
    overview: 'Geburah is the sphere of strength, judgment, purification, and destruction of obsolete forms. It ensures balance by pruning what is decayed.',
    dionFortuneInsight: 'Fortune notes that Geburah is essential for spiritual health—it is the surgeon\'s knife that cuts away spiritual cancer so the body can heal.',
    regardieInsight: 'Regardie emphasizes Geburah as the dynamic energy necessary to overcome obstacles, break inertia, and enforce divine law.',
    pathworkingGuidance: 'Visualize a brilliant scarlet flame burning away all illusions, weakness, and fear, leaving only pure tempered spiritual steel.'
  },
  {
    id: 'tiphareth',
    number: 6,
    name: 'Tiphareth',
    hebrewName: 'תִּפְאֶרֶת',
    translation: 'Beauty / Harmony',
    pillar: 'Mildness',
    coordinates: { x: 50, y: 56 },
    colors: {
      atziluth: '#F59E0B',
      briah: '#D97706',
      yetzirah: '#B45309',
      assiah: '#78350F'
    },
    colorDescriptions: {
      atziluth: 'Clear Pink Rose',
      briah: 'Yellow Gold',
      yetzirah: 'Rich Salmon Pink',
      assiah: 'Golden Amber'
    },
    divineName: 'YHVH Eloah Ve-Daath (יהוה אלוה ודעת - "Lord God of Knowledge")',
    archangel: 'Raphael (Divine Physician / Healing Light)',
    angelicOrder: 'Malachim (Kings / Messenger Angels)',
    astrological: 'Shemesh (Sphere of the Sun)',
    element: 'Solar Light & Solar Consciousness',
    chakraOrBodyPart: 'Heart / Breast (Heart Chakra / Tiphareth Center)',
    magicalImage: 'A Crowned King / A Child / A Sacrificed God (Solar Hero)',
    spiritualExperience: 'Vision of Harmony / Knowledge & Conversation of Holy Guardian Angel',
    virtue: 'Devotion to the Great Work / Balance',
    vice: 'Pride / Ego Inflation',
    symbols: ['The Rose Cross', 'The Hexagram', 'The Cube', 'The Golden Chalice'],
    preciousStone: 'Topaz / Yellow Diamond / Gold',
    incenseAndPlants: 'Olibanum (Frankincense) / Laurel / Heliotrope',
    tarotCards: 'The Four Sixes',
    overview: 'Tiphareth is the central sun of the Tree of Life, synthesizing all surrounding spheres. It represents Christ/Osiris consciousness, beauty, redemption, and heart illumination.',
    dionFortuneInsight: 'In "The Mystical Qabalah", Fortune describes Tiphareth as the heart of the Tree, where human consciousness transforms into divine consciousness.',
    regardieInsight: 'Regardie highlights Tiphareth as the meeting point where the Holy Guardian Angel connects with the aspiring soul.',
    pathworkingGuidance: 'Focus on your heart center. See a radiant golden sun blooming like a Tudor rose, broadcasting unconditional light, healing, and peace to every cell.'
  },
  {
    id: 'netzach',
    number: 7,
    name: 'Netzach',
    hebrewName: 'נֵצַח',
    translation: 'Victory / Endurance',
    pillar: 'Mercy',
    coordinates: { x: 80, y: 68 },
    colors: {
      atziluth: '#10B981',
      briah: '#059669',
      yetzirah: '#047857',
      assiah: '#065F46'
    },
    colorDescriptions: {
      atziluth: 'Amber Green',
      briah: 'Emerald Green',
      yetzirah: 'Bright Yellow Green',
      assiah: 'Olive Flecked Gold'
    },
    divineName: 'YHVH Tzabaoth (יהוה צבאות - "Lord of Hosts")',
    archangel: 'Haniel (Grace of God / Archangel of Venus)',
    angelicOrder: 'Elohim (Gods / Divine Beings)',
    astrological: 'Nogah (Sphere of Venus)',
    element: 'Emotional Fire / Artistic Passion',
    chakraOrBodyPart: 'Loin / Pelvis / Right Leg',
    magicalImage: 'A Beautiful Naked Woman',
    spiritualExperience: 'Vision of Beauty Triumphant',
    virtue: 'Unselfishness / Passionate Creation',
    vice: 'Unchastity / Lust / Emotional Mania',
    symbols: ['The Lamp', 'The Girdle', 'The Rose', 'The Emerald'],
    preciousStone: 'Emerald',
    incenseAndPlants: 'Rose / Benzoin / Myrtle',
    tarotCards: 'The Four Sevens',
    overview: 'Netzach is the sphere of emotion, artistic creativity, instinct, nature dynamics, romance, and victory through endurance.',
    dionFortuneInsight: 'Fortune explains Netzach as the realm of elemental nature spirits, raw feelings, group mind, and artistic inspiration.',
    regardieInsight: 'Regardie notes that Netzach governs the astral matrix of desire and devotion that drives human motivation.',
    pathworkingGuidance: 'Immerse yourself in a lush emerald garden bathed in rosy sunlight, feeling deep passion, artistic joy, and emotional liberation.'
  },
  {
    id: 'hod',
    number: 8,
    name: 'Hod',
    hebrewName: 'הוֹד',
    translation: 'Splendor / Glory',
    pillar: 'Severity',
    coordinates: { x: 20, y: 68 },
    colors: {
      atziluth: '#F97316',
      briah: '#EA580C',
      yetzirah: '#C2410C',
      assiah: '#9A3412'
    },
    colorDescriptions: {
      atziluth: 'Violet-Purple',
      briah: 'Orange',
      yetzirah: 'Reddish-Brown',
      assiah: 'Yellowish-Brown Flecked White'
    },
    divineName: 'Elohim Tzabaoth (אלהים צבאות - "God of Hosts")',
    archangel: 'Michael (Who is Like God / Sun-Mercury Archangel)',
    angelicOrder: 'Beni Elohim (Sons of the Gods)',
    astrological: 'Kokab (Sphere of Mercury)',
    element: 'Intellectual Water / Formative Logic',
    chakraOrBodyPart: 'Loin / Pelvis / Left Leg',
    magicalImage: 'An Hermaphrodite / Hermes / Thoth figure',
    spiritualExperience: 'Vision of Splendor / Understanding of Hermetic Secrets',
    virtue: 'Truthfulness / Rigorous Intellectual Honesty',
    vice: 'Falsehood / Deceit / Over-intellectualization',
    symbols: ['The Caduceus', 'The Magic Apron', 'The Names of Power', 'The Scroll'],
    preciousStone: 'Opal / Fire Opal / Mercury',
    incenseAndPlants: 'Storax / Lavender / Marjoram',
    tarotCards: 'The Four Eights',
    overview: 'Hod is the sphere of intellect, concrete mind, communication, science, ritual magic, mathematics, and structured logic.',
    dionFortuneInsight: 'In "The Mystical Qabalah", Fortune describes Hod as the realm of intellectual forms, magic symbols, and rational analysis.',
    regardieInsight: 'Regardie highlights Hod as the mental architecture where thoughts are organized into coherent systems and words of power.',
    pathworkingGuidance: 'Visualize a shimmering orange hall filled with sacred geometric glyphs, golden scrolls, and precise intellectual clarity.'
  },
  {
    id: 'yesod',
    number: 9,
    name: 'Yesod',
    hebrewName: 'יְסוֹד',
    translation: 'Foundation',
    pillar: 'Mildness',
    coordinates: { x: 50, y: 80 },
    colors: {
      atziluth: '#A855F7',
      briah: '#7E22CE',
      yetzirah: '#6B21A8',
      assiah: '#581C87'
    },
    colorDescriptions: {
      atziluth: 'Deep Violet',
      briah: 'Purple',
      yetzirah: 'Very Dark Purple',
      assiah: 'Citrine Flecked Azure'
    },
    divineName: 'Shaddai El Chai (שדי אל חי - "Almighty Living God")',
    archangel: 'Gabriel (Strong Man of God / Archangel of Moon)',
    angelicOrder: 'Kerubim (Strong Ones / Guardians)',
    astrological: 'Levanah (Sphere of the Moon)',
    element: 'Astral Ether / Subconscious Waters',
    chakraOrBodyPart: 'Reproductive Organs / Sacral Chakra',
    magicalImage: 'A Beautiful Strong Man / Atlas Bearing the Earth',
    spiritualExperience: 'Vision of the Mechanism of the Universe',
    virtue: 'Independence / Purity of Intent',
    vice: 'Idleness / Illusion / Self-Deception',
    symbols: ['The Sandals', 'The Perfumes', 'The Mirror', 'The Crescent Moon'],
    preciousStone: 'Quartz Crystal / Moonstone',
    incenseAndPlants: 'Jasmine / Ginseng / Camphor',
    tarotCards: 'The Four Nines',
    overview: 'Yesod is the Astral Etheric Foundation, the subconscious reservoir and blueprint layer where energy crystallizes immediately before becoming physical matter.',
    dionFortuneInsight: 'Fortune notes that Yesod is the lens through which higher forces pass to materialize in Malkuth. It governs dreams, instincts, and memory.',
    regardieInsight: 'Regardie describes Yesod as the etheric aura that feeds physical biology and stores subconscious archetypes.',
    pathworkingGuidance: 'Stand under a silver full moon watching translucent purple currents weave the etheric blueprint of physical reality.'
  },
  {
    id: 'malkuth',
    number: 10,
    name: 'Malkuth',
    hebrewName: 'מַלְכוּת',
    translation: 'Kingdom (The Earth)',
    pillar: 'Mildness',
    coordinates: { x: 50, y: 92 },
    colors: {
      atziluth: '#F59E0B',
      briah: '#10B981',
      yetzirah: '#1E3A8A',
      assiah: '#111827'
    },
    colorDescriptions: {
      atziluth: 'Yellow / Gold / Four Elements',
      briah: 'Citrine, Olive, Russet, & Black',
      yetzirah: 'Citrine, Olive, Russet Flecked Gold',
      assiah: 'Black Rayed Yellow'
    },
    divineName: 'Adonai Melekh / Adonai Ha-Aretz (אדני המלך - "Lord King of Earth")',
    archangel: 'Sandalphon (Co-Brother / Heavenly Choir Leader)',
    angelicOrder: 'Ashim (Souls of Fire / Elemental Spirits)',
    astrological: 'Cholem ha-Yesodoth (Sphere of Four Elements / Earth)',
    element: 'Earth (Physical Matter - Four Elements Combined)',
    chakraOrBodyPart: 'Feet / Ankles (Base/Root Chakra)',
    magicalImage: 'A Young Woman Crowned and Throned',
    spiritualExperience: 'Vision of the Holy Guardian Angel in Matter',
    virtue: 'Discernment / Practical Application / Groundedness',
    vice: 'Inertia / Materialism / Laziness',
    symbols: ['The Altar of Double Cube', 'The Equal Armed Cross', 'The Magic Circle'],
    preciousStone: 'Rock Crystal / Salt / Granite',
    incenseAndPlants: 'Dittany of Crete / Patchouli',
    tarotCards: 'The Four Tens',
    overview: 'Malkuth is the physical physical universe, the receptacle for all preceding 9 Sephiroth. It is the manifest Kingdom where spiritual potential meets solid physical reality.',
    dionFortuneInsight: 'Fortune stresses that Malkuth is not evil or fallen—it is the holy temple of the Shekinah, where spirit experiences sensory creation.',
    regardieInsight: 'Regardie emphasizes Malkuth as the necessary anchor for spiritual realization—the starting and ending point of the Great Work.',
    pathworkingGuidance: 'Feel your feet rooted deep into the fertile earth, honoring your physical body as a sacred living temple of divine spirit.'
  }
];

export const PATHS_DATA: Path[] = [
  {
    id: 'path-11',
    number: 11,
    name: 'The Scintillating Intelligence',
    fromSephiraId: 'kether',
    toSephiraId: 'chokmah',
    hebrewLetter: 'א',
    hebrewLetterName: 'Aleph',
    letterMeaning: 'Ox (Primary Force / Breath)',
    tarotKey: '0',
    tarotCardName: 'The Fool',
    attributionType: 'Element',
    attribution: 'Air',
    symbolIcon: '🜁',
    colors: {
      atziluth: '#FEF08A',
      briah: '#FDE047',
      yetzirah: '#EAB308',
      assiah: '#CA8A04'
    },
    overview: 'Connects the supreme unity of Kether to the dynamic wisdom of Chokmah. Represents the original cosmic breath and pure unconditioned divine potential.',
    pathworkingMeditation: 'Step off the cliff of rational fear into the boundless ether of absolute trust, guided by divine spirit.'
  },
  {
    id: 'path-12',
    number: 12,
    name: 'The Intelligence of Transparency',
    fromSephiraId: 'kether',
    toSephiraId: 'binah',
    hebrewLetter: 'ב',
    hebrewLetterName: 'Beth',
    letterMeaning: 'House (Container / Mind)',
    tarotKey: 'I',
    tarotCardName: 'The Magician',
    attributionType: 'Planet',
    attribution: 'Mercury',
    symbolIcon: '☿',
    colors: {
      atziluth: '#F97316',
      briah: '#EA580C',
      yetzirah: '#C2410C',
      assiah: '#9A3412'
    },
    overview: 'Connects Kether to Binah. Represents the conscious intention directing elemental forces to construct reality.',
    pathworkingMeditation: 'Raise your right hand to heaven and point your left hand to earth, becoming a clear conduit for divine manifestation.'
  },
  {
    id: 'path-13',
    number: 13,
    name: 'The Unifying Intelligence',
    fromSephiraId: 'kether',
    toSephiraId: 'tiphareth',
    hebrewLetter: 'ג',
    hebrewLetterName: 'Gimel',
    letterMeaning: 'Camel (Crossing the Desert / Sanctuary)',
    tarotKey: 'II',
    tarotCardName: 'The High Priestess',
    attributionType: 'Planet',
    attribution: 'Moon',
    symbolIcon: '☽',
    colors: {
      atziluth: '#E0E7FF',
      briah: '#C7D2FE',
      yetzirah: '#A5B4FC',
      assiah: '#818CF8'
    },
    overview: 'The long path connecting Kether down the Middle Pillar across the Abyss directly to Tiphareth. Governs memory, intuition, and divine sanctuary.',
    pathworkingMeditation: 'Sit between the black and white pillars before the veil of the temple, listening to the quiet whisper of cosmic memory.'
  },
  {
    id: 'path-14',
    number: 14,
    name: 'The Illuminating Intelligence',
    fromSephiraId: 'chokmah',
    toSephiraId: 'binah',
    hebrewLetter: 'ד',
    hebrewLetterName: 'Daleth',
    letterMeaning: 'Door (Gateway of Generation)',
    tarotKey: 'III',
    tarotCardName: 'The Empress',
    attributionType: 'Planet',
    attribution: 'Venus',
    symbolIcon: '♀',
    colors: {
      atziluth: '#10B981',
      briah: '#059669',
      yetzirah: '#047857',
      assiah: '#065F46'
    },
    overview: 'Unites the Father (Chokmah) and Mother (Binah) across the top of the Tree. The gateway of love, abundance, and organic fertility.',
    pathworkingMeditation: 'Pass through the golden doorway of love into a meadow of flowers, celebrating the abundant fertility of creation.'
  },
  {
    id: 'path-15',
    number: 15,
    name: 'The Constitutive Intelligence',
    fromSephiraId: 'chokmah',
    toSephiraId: 'tiphareth',
    hebrewLetter: 'ה',
    hebrewLetterName: 'Heh',
    letterMeaning: 'Window (Vision / Breathing)',
    tarotKey: 'IV',
    tarotCardName: 'The Emperor',
    attributionType: 'Zodiac',
    attribution: 'Aries',
    symbolIcon: '♈',
    colors: {
      atziluth: '#EF4444',
      briah: '#DC2626',
      yetzirah: '#B91C1C',
      assiah: '#991B1B'
    },
    overview: 'Connects Wisdom to Heart Consciousness. Establishes order, authority, vision, and leadership.',
    pathworkingMeditation: 'Look through the window of spiritual authority, governing your lower nature with wisdom and noble purpose.'
  },
  {
    id: 'path-16',
    number: 16,
    name: 'The Triumphant Intelligence',
    fromSephiraId: 'chokmah',
    toSephiraId: 'chesed',
    hebrewLetter: 'ו',
    hebrewLetterName: 'Vau',
    letterMeaning: 'Nail / Hook (Binding Spirit to Soul)',
    tarotKey: 'V',
    tarotCardName: 'The Hierophant',
    attributionType: 'Zodiac',
    attribution: 'Taurus',
    symbolIcon: '♉',
    colors: {
      atziluth: '#FB923C',
      briah: '#F97316',
      yetzirah: '#EA580C',
      assiah: '#C2410C'
    },
    overview: 'Connects Chokmah to Chesed along the Pillar of Mercy. The voice of inner initiation and traditional sacred wisdom.',
    pathworkingMeditation: 'Receive the solemn whisper of the ancient teacher, linking your human mind to divine revelation.'
  },
  {
    id: 'path-17',
    number: 17,
    name: 'The Disposing Intelligence',
    fromSephiraId: 'binah',
    toSephiraId: 'tiphareth',
    hebrewLetter: 'ז',
    hebrewLetterName: 'Zain',
    letterMeaning: 'Sword (Discernment / Separation)',
    tarotKey: 'VI',
    tarotCardName: 'The Lovers',
    attributionType: 'Zodiac',
    attribution: 'Gemini',
    symbolIcon: '♊',
    colors: {
      atziluth: '#FDE047',
      briah: '#EAB308',
      yetzirah: '#CA8A04',
      assiah: '#A16207'
    },
    overview: 'Connects Binah to Tiphareth. Represents spiritual choice, union of opposites, and discrimination between divine and temporal.',
    pathworkingMeditation: 'Unite masculine and feminine polarities under the angel Raphael, choosing spiritual devotion over dualistic division.'
  },
  {
    id: 'path-18',
    number: 18,
    name: 'The House of Influence Intelligence',
    fromSephiraId: 'binah',
    toSephiraId: 'geburah',
    hebrewLetter: 'ח',
    hebrewLetterName: 'Cheth',
    letterMeaning: 'Fence / Enclosure (Protection)',
    tarotKey: 'VII',
    tarotCardName: 'The Chariot',
    attributionType: 'Zodiac',
    attribution: 'Cancer',
    symbolIcon: '♋',
    colors: {
      atziluth: '#38BDF8',
      briah: '#0284C7',
      yetzirah: '#0369A1',
      assiah: '#0C4A6E'
    },
    overview: 'Connects Binah to Geburah down the Pillar of Severity. The holy armor carrying divine soul through victory over lower astral instincts.',
    pathworkingMeditation: 'Steer your silver chariot forward guided by spiritual purpose, maintaining complete mastery over dual sphinxes.'
  },
  {
    id: 'path-19',
    number: 19,
    name: 'The Intelligence of the Secret Spiritual Activities',
    fromSephiraId: 'chesed',
    toSephiraId: 'geburah',
    hebrewLetter: 'ט',
    hebrewLetterName: 'Teth',
    letterMeaning: 'Serpent (Kundalini / Vital Force)',
    tarotKey: 'VIII / XI',
    tarotCardName: 'Strength / Lust',
    attributionType: 'Zodiac',
    attribution: 'Leo',
    symbolIcon: '♌',
    colors: {
      atziluth: '#FACC15',
      briah: '#EAB308',
      yetzirah: '#CA8A04',
      assiah: '#854D0E'
    },
    overview: 'Horizontal path bridging Chesed (Mercy) and Geburah (Severity). Governs the mastery of passions through gentle spiritual grace.',
    pathworkingMeditation: 'Gently place your hands upon the lion of passion, transmuting raw desire into radiant spiritual power.'
  },
  {
    id: 'path-20',
    number: 20,
    name: 'The Intelligence of Will',
    fromSephiraId: 'chesed',
    toSephiraId: 'tiphareth',
    hebrewLetter: 'י',
    hebrewLetterName: 'Yod',
    letterMeaning: 'Hand (The Primordial Spark / Seed)',
    tarotKey: 'IX',
    tarotCardName: 'The Hermit',
    attributionType: 'Zodiac',
    attribution: 'Virgo',
    symbolIcon: '♍',
    colors: {
      atziluth: '#84CC16',
      briah: '#65A30D',
      yetzirah: '#4D7C0F',
      assiah: '#3F6212'
    },
    overview: 'Connects Chesed to Tiphareth. The lone seeker holding the lantern of truth to light the path for sincere seekers.',
    pathworkingMeditation: 'Hold up your golden lantern atop the mountain peak, quietly guiding souls with patient, humble wisdom.'
  },
  {
    id: 'path-21',
    number: 21,
    name: 'The Intelligence of Conciliation',
    fromSephiraId: 'chesed',
    toSephiraId: 'netzach',
    hebrewLetter: 'כ',
    hebrewLetterName: 'Kaph',
    letterMeaning: 'Grasping Hand / Palm (Receptive Form)',
    tarotKey: 'X',
    tarotCardName: 'Wheel of Fortune',
    attributionType: 'Planet',
    attribution: 'Jupiter',
    symbolIcon: '♃',
    colors: {
      atziluth: '#818CF8',
      briah: '#4338CA',
      yetzirah: '#312E81',
      assiah: '#1E1B4B'
    },
    overview: 'Connects Chesed to Netzach down the Pillar of Mercy. Governs cosmic cycles, karma, luck, and rhythmic change.',
    pathworkingMeditation: 'Stand at the motionless center of the spinning wheel of fate, observing all changing conditions with calm detachment.'
  },
  {
    id: 'path-22',
    number: 22,
    name: 'The Faithful Intelligence',
    fromSephiraId: 'geburah',
    toSephiraId: 'tiphareth',
    hebrewLetter: 'ל',
    hebrewLetterName: 'Lamed',
    letterMeaning: 'Ox-Goad (Direction / Balance)',
    tarotKey: 'XI / VIII',
    tarotCardName: 'Justice / Adjustment',
    attributionType: 'Zodiac',
    attribution: 'Libra',
    symbolIcon: '♎',
    colors: {
      atziluth: '#06B6D4',
      briah: '#0891B2',
      yetzirah: '#0E7490',
      assiah: '#155E75'
    },
    overview: 'Connects Geburah to Tiphareth. The balance scale of Karma and truth, aligning personal action with universal law.',
    pathworkingMeditation: 'Hold the golden scales of truth in perfect equilibrium, weighing thoughts and actions with crystal clarity.'
  },
  {
    id: 'path-23',
    number: 23,
    name: 'The Stable Intelligence',
    fromSephiraId: 'geburah',
    toSephiraId: 'hod',
    hebrewLetter: 'מ',
    hebrewLetterName: 'Mem',
    letterMeaning: 'Water (The Great Receptive Ocean)',
    tarotKey: 'XII',
    tarotCardName: 'The Hanged Man',
    attributionType: 'Element',
    attribution: 'Water',
    symbolIcon: '🜄',
    colors: {
      atziluth: '#0284C7',
      briah: '#0369A1',
      yetzirah: '#075985',
      assiah: '#0C4A6E'
    },
    overview: 'Connects Geburah to Hod along the Pillar of Severity. Voluntary sacrifice of egoic perspective to gain divine enlightenment.',
    pathworkingMeditation: 'Suspend yourself upside down in silent watery meditation, viewing reality from an entirely inverted, selfless perspective.'
  },
  {
    id: 'path-24',
    number: 24,
    name: 'The Imaginative Intelligence',
    fromSephiraId: 'tiphareth',
    toSephiraId: 'netzach',
    hebrewLetter: 'נ',
    hebrewLetterName: 'Nun',
    letterMeaning: 'Fish (Life in Water / Regeneration)',
    tarotKey: 'XIII',
    tarotCardName: 'Death',
    attributionType: 'Zodiac',
    attribution: 'Scorpio',
    symbolIcon: '♏',
    colors: {
      atziluth: '#881337',
      briah: '#9F1239',
      yetzirah: '#BE123C',
      assiah: '#E11D48'
    },
    overview: 'Connects Tiphareth to Netzach. Transformation, profound rebirth, and release of dead forms to liberate living essence.',
    pathworkingMeditation: 'Shed all old identities like a serpent casting off dry skin, rising resurrected toward the solar dawn.'
  },
  {
    id: 'path-25',
    number: 25,
    name: 'The Trial / Tentative Intelligence',
    fromSephiraId: 'tiphareth',
    toSephiraId: 'yesod',
    hebrewLetter: 'ס',
    hebrewLetterName: 'Samekh',
    letterMeaning: 'Prop / Support (The Arrow of Spirit)',
    tarotKey: 'XIV',
    tarotCardName: 'Temperance / Art',
    attributionType: 'Zodiac',
    attribution: 'Sagittarius',
    symbolIcon: '♐',
    colors: {
      atziluth: '#2563EB',
      briah: '#1D4ED8',
      yetzirah: '#1E40AF',
      assiah: '#1E3A8A'
    },
    overview: 'The vertical middle path connecting Yesod (Astral) straight to Tiphareth (Solar Heart). The rainbow bridge of spiritual alchemy.',
    pathworkingMeditation: 'Pour golden and silver fluids between chalices in perfect rhythm, shooting your arrow of desire straight to the heart of God.'
  },
  {
    id: 'path-26',
    number: 26,
    name: 'The Renovating Intelligence',
    fromSephiraId: 'tiphareth',
    toSephiraId: 'hod',
    hebrewLetter: 'ע',
    hebrewLetterName: 'Ayin',
    letterMeaning: 'Eye (Direct Perception / Reality)',
    tarotKey: 'XV',
    tarotCardName: 'The Devil',
    attributionType: 'Zodiac',
    attribution: 'Capricorn',
    symbolIcon: '♑',
    colors: {
      atziluth: '#334155',
      briah: '#1E293B',
      yetzirah: '#0F172A',
      assiah: '#020617'
    },
    overview: 'Connects Tiphareth to Hod. Unmasking material illusions and confronting raw instinct to discover true spiritual freedom.',
    pathworkingMeditation: 'Look closely with open eyes at what binds you, realizing the chains around your neck are loose and easily cast off.'
  },
  {
    id: 'path-27',
    number: 27,
    name: 'The Exciting Intelligence',
    fromSephiraId: 'netzach',
    toSephiraId: 'hod',
    hebrewLetter: 'פ',
    hebrewLetterName: 'Peh',
    letterMeaning: 'Mouth (Word / Dynamic Expression)',
    tarotKey: 'XVI',
    tarotCardName: 'The Tower',
    attributionType: 'Planet',
    attribution: 'Mars',
    symbolIcon: '♂',
    colors: {
      atziluth: '#DC2626',
      briah: '#B91C1C',
      yetzirah: '#991B1B',
      assiah: '#7F1D1D'
    },
    overview: 'Horizontal path connecting Emotion (Netzach) and Intellect (Hod). Lightning flash shattering false mental constructs.',
    pathworkingMeditation: 'Watch the lightning bolt of absolute truth shatter your false towers of pride, liberating pure light from rigid brick.'
  },
  {
    id: 'path-28',
    number: 28,
    name: 'The Natural Intelligence',
    fromSephiraId: 'netzach',
    toSephiraId: 'yesod',
    hebrewLetter: 'צ',
    hebrewLetterName: 'Tzaddi',
    letterMeaning: 'Fish-Hook (Catching Divine Grace)',
    tarotKey: 'XVII',
    tarotCardName: 'The Star',
    attributionType: 'Zodiac',
    attribution: 'Aquarius',
    symbolIcon: '♒',
    colors: {
      atziluth: '#38BDF8',
      briah: '#0284C7',
      yetzirah: '#0369A1',
      assiah: '#0C4A6E'
    },
    overview: 'Connects Netzach to Yesod. The outpouring of living waters from the cosmic star, inspiring faith and hope.',
    pathworkingMeditation: 'Kneel by the crystal stream under seven brilliant stars, pouring living waters onto earth and sea in sweet surrender.'
  },
  {
    id: 'path-29',
    number: 29,
    name: 'The Corporeal Intelligence',
    fromSephiraId: 'netzach',
    toSephiraId: 'malkuth',
    hebrewLetter: 'ק',
    hebrewLetterName: 'Qoph',
    letterMeaning: 'Back of Head (Subconscious Instinct)',
    tarotKey: 'XVIII',
    tarotCardName: 'The Moon',
    attributionType: 'Zodiac',
    attribution: 'Pisces',
    symbolIcon: '♓',
    colors: {
      atziluth: '#A855F7',
      briah: '#7E22CE',
      yetzirah: '#6B21A8',
      assiah: '#581C87'
    },
    overview: 'Connects Netzach to Malkuth down the right side. Walking through shadow realms and instinctual dreams toward physical manifestation.',
    pathworkingMeditation: 'Walk carefully between the twin towers as the crayfish emerges from dark waters, trusting the inner light along the winding path.'
  },
  {
    id: 'path-30',
    number: 30,
    name: 'The Collecting Intelligence',
    fromSephiraId: 'hod',
    toSephiraId: 'yesod',
    hebrewLetter: 'ר',
    hebrewLetterName: 'Resh',
    letterMeaning: 'Head (Reason / Enlightenment)',
    tarotKey: 'XIX',
    tarotCardName: 'The Sun',
    attributionType: 'Planet',
    attribution: 'Sun',
    symbolIcon: '☉',
    colors: {
      atziluth: '#F59E0B',
      briah: '#D97706',
      yetzirah: '#B45309',
      assiah: '#78350F'
    },
    overview: 'Connects Hod to Yesod. Solar warmth, innocent joy, clear rational understanding illuminating subconscious depths.',
    pathworkingMeditation: 'Ride the white horse under the smiling solar disk, celebrating innocent joy and clear illumination.'
  },
  {
    id: 'path-31',
    number: 31,
    name: 'The Perpetual Intelligence',
    fromSephiraId: 'hod',
    toSephiraId: 'malkuth',
    hebrewLetter: 'ש',
    hebrewLetterName: 'Shin',
    letterMeaning: 'Tooth / Spirit (Holy Fire / Transformation)',
    tarotKey: 'XX',
    tarotCardName: 'Judgement / The Aeon',
    attributionType: 'Element',
    attribution: 'Fire / Spirit',
    symbolIcon: '🜂',
    colors: {
      atziluth: '#EF4444',
      briah: '#DC2626',
      yetzirah: '#B91C1C',
      assiah: '#991B1B'
    },
    overview: 'Connects Hod to Malkuth down the left side. The resurrection trumpet waking souls to higher spiritual awareness.',
    pathworkingMeditation: 'Hear the divine trumpet sound across the valley of time, stepping out of old sarcophagi into eternal fire.'
  },
  {
    id: 'path-32',
    number: 32,
    name: 'The Administrative Intelligence',
    fromSephiraId: 'yesod',
    toSephiraId: 'malkuth',
    hebrewLetter: 'ת',
    hebrewLetterName: 'Tau',
    letterMeaning: 'Cross / Mark (Completion / Kingdom Gate)',
    tarotKey: 'XXI',
    tarotCardName: 'The World / The Universe',
    attributionType: 'Planet',
    attribution: 'Saturn / Earth',
    symbolIcon: '♄',
    colors: {
      atziluth: '#334155',
      briah: '#1E293B',
      yetzirah: '#0F172A',
      assiah: '#020617'
    },
    overview: 'The final vertical path connecting the Astral Foundation (Yesod) to Physical Kingdom (Malkuth). Governs incarnation and completion.',
    pathworkingMeditation: 'Dance within the green laurel wreath surrounded by the four holy creatures, celebrating the realization of divine spirit in matter.'
  }
];

// Lightning Flash (Sword of Flame) Path Sequence (Descent of Light)
export const LIGHTNING_FLASH_SEQUENCE = [
  'kether',
  'chokmah',
  'binah',
  'daath',
  'chesed',
  'geburah',
  'tiphareth',
  'netzach',
  'hod',
  'yesod',
  'malkuth'
];

// Serpent of Wisdom (Nehushtan) Path Sequence (Ascent through 22 Paths)
export const SERPENT_PATH_SEQUENCE = [
  'path-32', 'path-31', 'path-30', 'path-29', 'path-28', 'path-27',
  'path-26', 'path-25', 'path-24', 'path-23', 'path-22', 'path-21',
  'path-20', 'path-19', 'path-18', 'path-17', 'path-16', 'path-15',
  'path-14', 'path-13', 'path-12', 'path-11'
];
