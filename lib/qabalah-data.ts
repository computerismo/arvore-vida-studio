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
  quarteredColors?: [string, string, string, string]; // Top (Citrine), Right (Olive), Bottom (Black), Left (Russet)
  colorDescriptions: {
    atziluth: string;
    briah: string;
    yetzirah: string;
    assiah: string;
  };

  // Primary Qabalistic Attributions (Golden Dawn / 777 / Fortune / Regardie)
  divineName: string;
  archangel: string;
  angelicOrder: string;
  planet: string;       // Explicit Planetary / Mundane Sphere
  astrological: string; // Hebrew Mundane Chakra & Sphere
  yetziraticTitle: string; // Sepher Yetzirah Intelligence Title
  soulPart: string;     // Qabalistic Psychology (Yechidah, Chiah, Neshamah, Ruach, Nephesh, Guph)
  qliphoth: string;     // Adverse Shell / Shadow Aspect
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

  // Path Color Scales (Golden Dawn 777)
  colors: {
    atziluth: string;
    briah: string;
    yetzirah: string;
    assiah: string;
  };
  colorDescriptions: {
    atziluth: string;
    briah: string;
    yetzirah: string;
    assiah: string;
  };

  // Sepher Yetzirah & 777 Attributions
  yetziraticText: string;
  consciousnessAspect: string; // Magical power, sacred beast/plant/mineral per 777

  overview: string;
  dionFortuneInsight: string;
  regardieInsight: string;
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
    symbolicColor: '#1e293b',
    sephirothIds: ['binah', 'geburah', 'hod'],
    quality: 'Form, Restriction, Passive Feminine Principle (Binah / Form / Discipline)',
    description:
      'The Pillar of Form and Discipline. Represents contraction, structure, judgment, and discernment. Dion Fortune emphasizes that without the restraining boundaries of Boaz, expansive force would dissipate into formless chaos.',
  },
  Mildness: {
    id: 'Mildness',
    title: 'Pillar of Mildness (Middle)',
    hebrewName: 'Pillar of Equilibrium',
    symbolicColor: '#eab308',
    sephirothIds: ['kether', 'daath', 'tiphareth', 'yesod', 'malkuth'],
    quality: 'Consciousness, Harmony, Synthesis, Path of the Arrow (Samekh–Gimel)',
    description:
      'The Axis of Consciousness and Ascent. Known as the Middle Pillar or the Way of Equilibrium. Israel Regardie formalized its energetic centers into the Middle Pillar exercise to circulate Divine Light through the microcosm.',
  },
  Mercy: {
    id: 'Mercy',
    title: 'Pillar of Mercy (Right)',
    hebrewName: 'Jachin (יָכִין)',
    symbolicColor: '#e0e7ff',
    sephirothIds: ['chokmah', 'chesed', 'netzach'],
    quality: 'Force, Expansion, Active Masculine Principle (Chokmah / Force / Vitality)',
    description:
      'The Pillar of Dynamic Energy and Expansion. Represents creative outflow, abundance, devotion, and living force. Requires the counter-balance of the Pillar of Severity to achieve coherent manifestation.',
  },
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
      atziluth: '#ffffff',
      briah: '#fffefa',
      yetzirah: '#f5f7fa',
      assiah: '#efe8d5',
    },
    colorDescriptions: {
      atziluth: 'Brilliance',
      briah: 'White Brilliance',
      yetzirah: 'White Brilliance',
      assiah: 'White Flecked Gold',
    },
    divineName: 'Eheieh (אהיה — "I Am / I Will Be")',
    archangel: 'Metatron (Prince of the Countenance)',
    angelicOrder: 'Chaioth ha-Qadesh (Holy Living Creatures)',
    planet: 'Primum Mobile · Beyond the Planets',
    astrological: 'Rashith ha-Gilgalim (First Swirlings / Primum Mobile)',
    yetziraticTitle: 'The Admirable or Hidden Intelligence',
    soulPart: 'Yechidah (The Indivisible Divine Spark / Monadic Self)',
    qliphoth: 'Thaumiel (Two Contending Forces — Dualism Attempting to Divide the One)',
    element: 'Root of Air / Quintessence / Pure Unmanifest Spirit',
    chakraOrBodyPart: 'Sahasrara / Cranium · Just Above the Crown of the Head',
    magicalImage: 'An Ancient Bearded King Seen in Profile (Right Side Only)',
    spiritualExperience: 'Union with God',
    virtue: 'Attainment / Completion of the Great Work',
    vice: 'None (Pure Unity prior to duality)',
    symbols: ['The Point', 'The Crown', 'The Swastika (Whirling Cross)', 'The Point Within the Circle'],
    preciousStone: 'Diamond',
    incenseAndPlants: 'Ambergris / Almond in Flower',
    tarotCards: 'The Four Aces (Root of the Powers of the Elements)',
    overview:
      'Kether is the Crown above the Tree, the first point of manifestation condensing out of the Limitless Light (Ain Soph Aur). In Hermetic Qabalah it represents pure being—prior to polarity, form, or individualized thought—from which all subsequent emanations derive their existence.',
    dionFortuneInsight:
      'In "The Mystical Qabalah", Dion Fortune explains that Kether stands to the manifested universe as a point without dimension stands to geometry. She stresses that the right-side profile of the Ancient King signifies that part of Kether remains forever turned toward the Unmanifest Ain Soph, beyond human comprehension.',
    regardieInsight:
      'In "A Garden of Pomegranates" and "The Middle Pillar", Israel Regardie identifies Kether with Yechidah, the supreme spiritual center poised just above the physical cranium. It is the source of the White Brilliance invoked at the start of the Middle Pillar exercise, uniting personal consciousness with the transcendent Self.',
    pathworkingGuidance:
      'Meditate on absolute stillness and an infinitely small point of blinding white radiance above the crown of the head. Allow every boundary between observer and observed to dissolve into pure, silent I AM.',
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
      atziluth: '#60a5fa',
      briah: '#a6abaa',
      yetzirah: '#b7bdbe',
      assiah: '#8c9398',
    },
    colorDescriptions: {
      atziluth: 'Pure Soft Blue',
      briah: 'Grey',
      yetzirah: 'Pearl-Grey Iridescent',
      assiah: 'White Flecked Red, Blue, and Yellow',
    },
    divineName: 'Yah (יה — "The Lord")',
    archangel: 'Raziel (Herald of Deity / Keeper of Secrets)',
    angelicOrder: 'Auphanim (Wheels / Whirling Cosmic Vortices)',
    planet: 'Sphere of the Zodiac · Fixed Stars (Modern: Uranus / Neptune)',
    astrological: 'Mazloth (Sphere of the Zodiac / Fixed Stars)',
    yetziraticTitle: 'The Illuminating Intelligence',
    soulPart: 'Chiah (The True Creative Will / Life-Force)',
    qliphoth: 'Ghagiel (The Hinderers — Blind, Chaotic Outflow)',
    element: 'Root of Fire / Archetypal Dynamic Force (Abba)',
    chakraOrBodyPart: 'Left Side of the Face / Right Cerebral Hemisphere',
    magicalImage: 'A Bearded Male Figure (Abba, the Supernal Father)',
    spiritualExperience: 'The Vision of God Face to Face',
    virtue: 'Devotion',
    vice: 'None Traditional (Lower Distortion: Blind, Unbounded Impulse)',
    symbols: ['The Lingam / Phallus', 'The Line', 'The Inner Robe of Glory', 'The Standing Stone', 'The Straight Line'],
    preciousStone: 'Star Ruby / Turquoise',
    incenseAndPlants: 'Musk / Amaranth',
    tarotCards: 'The Four Twos & The Four Knights/Kings (Yod)',
    overview:
      'Chokmah is Abba, the Supernal Father and first positive outward surge of cosmic Force after the stillness of Kether. It embodies pure kinetic Wisdom—unbridled creative potency seeking a receptive matrix in Binah.',
    dionFortuneInsight:
      'Dion Fortune characterizes Chokmah as the Great Stimulator of the universe: pure dynamic energy prior to form. She clarifies that Wisdom in Qabalah is not intellectual knowledge, but the living, fecundating power of Spirit flashing outward from the Crown before being organized into structures.',
    regardieInsight:
      'Israel Regardie describes Chokmah in "A Garden of Pomegranates" as the radiant "Inner Robe of Glory" and the Mazloth—the whirling star-sphere of the Zodiac. Psychologically, it corresponds to Chiah, the transcendent creative Will that knows no hesitation or division.',
    pathworkingGuidance:
      'Envision a boundless expanse of deep indigo sky alive with whirling pearl-grey nebulae, feeling an inexhaustible fountain of pure spiritual vitality surging forward without restriction.',
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
      atziluth: '#b52758',
      briah: '#191c20',
      yetzirah: '#4e3629',
      assiah: '#6d6266',
    },
    colorDescriptions: {
      atziluth: 'Crimson',
      briah: 'Black',
      yetzirah: 'Dark Brown',
      assiah: 'Grey Flecked Pink',
    },
    divineName: 'YHVH Elohim (יהוה אלהים — "Lord God")',
    archangel: 'Tzaphkiel (Contemplator of God)',
    angelicOrder: 'Aralim (Thrones / The Strong Ones)',
    planet: 'Saturn ♄ (Shabbathai)',
    astrological: 'Shabbathai (Sphere of Saturn)',
    yetziraticTitle: 'The Sanctifying Intelligence',
    soulPart: 'Neshamah (The Intuitive Divine Soul / Spiritual Aspiration)',
    qliphoth: 'Satariel (The Concealers — Blind Darkness & Rigid Obscuration)',
    element: 'Root of Water / The Great Sea (Marah)',
    chakraOrBodyPart: 'Right Side of the Face / Left Cerebral Hemisphere',
    magicalImage: 'A Mature Woman / A Matron (Ama, the Dark Sterile & Aima, the Bright Fertile Mother)',
    spiritualExperience: 'Vision of Sorrow',
    virtue: 'Silence',
    vice: 'Avarice / Inertia / Rigidity',
    symbols: ['The Yoni', 'The Outer Robe of Concealment', 'The Cup / Chalice', 'The Vesica Piscis'],
    preciousStone: 'Pearl / Star Sapphire',
    incenseAndPlants: 'Myrrh / Cypress / Opium Poppy',
    tarotCards: 'The Four Threes & The Four Queens (Heh)',
    overview:
      'Binah is the Supernal Mother (Ama and Aima), the primordial archetype of Form, Time, and Limitation. She receives the radiant force of Chokmah and encloses it within the womb of Understanding so that manifested worlds can come to birth.',
    dionFortuneInsight:
      'In "The Mystical Qabalah", Dion Fortune explains why Binah is associated with Saturn and the Vision of Sorrow: to give Spirit a form is to subject it to limitation, decay, and death. Yet this Saturnian discipline is deeply compassionate—without the dark womb of Binah, infinite force could never become conscious life.',
    regardieInsight:
      'Israel Regardie equates Binah with the Great Sea (Marah) and the faculty of Neshamah, the higher intuitive soul that perceives cosmic law. Far from negative, Binah’s blackness in Briah represents the fertile night of gestation that absorbs all light to give birth to creation.',
    pathworkingGuidance:
      'Rest within the vast, silent obsidian sea beneath starless velvet depths. Honor the sacred vessel of form and time that turns blinding spirit into living, structured beauty.',
  },
  {
    id: 'daath',
    number: 0,
    name: "Da'ath",
    hebrewName: 'דַּעַת',
    translation: 'Knowledge (The Hidden Sephira)',
    pillar: 'Mildness',
    coordinates: { x: 50, y: 32 },
    colors: {
      atziluth: '#818CF8',
      briah: '#4338CA',
      yetzirah: '#312E81',
      assiah: '#1E1B4B',
    },
    colorDescriptions: {
      atziluth: 'Lavender',
      briah: 'Grey-Silver',
      yetzirah: 'Pure Violet',
      assiah: 'Deep Indigo Flecked Gold',
    },
    divineName: 'YHVH Elohim (Concealed Synthesis of Chokmah & Binah)',
    archangel: 'None Traditional (Threshold of the Supernal Synthesis)',
    angelicOrder: 'None Traditional (Bridge Across the Abyss)',
    planet: 'None Traditional · No Planetary Sphere (Threshold of the Abyss)',
    astrological: 'The Abyss (Conjunction of Chokmah & Binah · Modern: Uranus/Pluto notes)',
    yetziraticTitle: 'The Unnumbered Sphere — Synthesis of Wisdom & Understanding',
    soulPart: 'Threshold Linking Ruach (Mind) to Neshamah (Supernal Intuition)',
    qliphoth: 'The Abyss / Dispersion of Egoic Intellect',
    element: 'Akasha / Subtle Ether of Consciousness',
    chakraOrBodyPart: 'Throat / Nape of the Neck (Middle Pillar Throat Center)',
    magicalImage: 'A Two-Faced Head / An Invisible Presence Over the Gulf',
    spiritualExperience: 'Realization of Cosmic Law Across the Abyss',
    virtue: 'Detachment / Devotion to Truth',
    vice: 'Intellectual Pride / Dispersion / Spiritual Delusion',
    symbols: ['The Abyss', 'The Prism', 'The Invisible Bridge', 'The Sacred Word'],
    preciousStone: 'Alexandrite / Clear Quartz',
    incenseAndPlants: 'Olibanum / Cedar (Purifying Incenses)',
    tarotCards: 'No Separate Suit Cards (Reflected in the Path of Gimel)',
    overview:
      "Da'ath is not one of the ten numbered Sephiroth, but the invisible child of Chokmah (Wisdom) and Binah (Understanding). Positioned over the Abyss on the Middle Pillar, it marks the perilous threshold between the Supernal Triad and the seven lower spheres of manifestation.",
    dionFortuneInsight:
      "Dion Fortune writes in \"The Mystical Qabalah\" that Da'ath represents Knowledge as direct realization—understanding joined to wisdom—and marks the evolutionary frontier of human consciousness. Attempting to grasp Supernal truths through unpurified intellect here breeds madness or spiritual pride unless ego is surrendered.",
    regardieInsight:
      "In \"A Garden of Pomegranates\" and \"The Middle Pillar\", Israel Regardie treats Da'ath as the hidden throat center linking mental reflection (Ruach) with divine intuition (Neshamah). During the Middle Pillar ritual, vibrating YHVH Elohim at the nape of the neck activates this bridge of conscious synthesis.",
    pathworkingGuidance:
      'Breathe violet light into the throat and nape of the neck, holding silence at the edge of the Abyss. Release the need to possess truth with the rational ego, becoming an empty prism for higher awareness.',
  },
  {
    id: 'chesed',
    number: 4,
    name: 'Chesed',
    hebrewName: 'חֶסֶד',
    translation: 'Mercy / Loving-Kindness (Gedulah)',
    pillar: 'Mercy',
    coordinates: { x: 80, y: 44 },
    colors: {
      atziluth: '#3b4cb8',
      briah: '#2452ab',
      yetzirah: '#323a8c',
      assiah: '#1d3976',
    },
    colorDescriptions: {
      atziluth: 'Deep Violet',
      briah: 'Blue',
      yetzirah: 'Deep Purple',
      assiah: 'Deep Azure Flecked Yellow',
    },
    divineName: 'El (אל — "The Mighty God")',
    archangel: 'Tzadkiel (Righteousness of God)',
    angelicOrder: 'Chasmalim (The Brilliant Ones)',
    planet: 'Jupiter ♃ (Tzedek)',
    astrological: 'Tzedek (Sphere of Jupiter)',
    yetziraticTitle: 'The Cohesive or Receptacular Intelligence',
    soulPart: 'Ruach (Upper Expansive / Abstract Reasoning Aspect)',
    qliphoth: "Gha'agsheblah (The Smiters — Wasteful Excess & Tyranny)",
    element: 'Water of Benevolent Expansion (Below the Abyss)',
    chakraOrBodyPart: 'Left Arm & Shoulder',
    magicalImage: 'A Mighty Crowned and Enthroned King',
    spiritualExperience: 'Vision of Love',
    virtue: 'Obedience',
    vice: 'Bigotry, Hypocrisy, Gluttony, Tyranny',
    symbols: ['The Solid Figure (Tetrahedron / Cube)', 'The Orb', 'The Wand', 'The Scepter', 'The Crook'],
    preciousStone: 'Amethyst / Sapphire',
    incenseAndPlants: 'Cedar',
    tarotCards: 'The Four Fours',
    overview:
      'Chesed (also called Gedulah, Greatness) is the first sphere below the Abyss, governing Jupiterian order, benevolent rulership, constructive law, and expansive mercy. Here the abstract Supernal archetypes crystallize into coherent ideals for manifested life.',
    dionFortuneInsight:
      'Dion Fortune calls Chesed the "ideal ruler and lawgiver"—the benevolent father-king who builds civilization, protects the weak, and organizes energy harmoniously. Because its Jupiterian generosity can decay into complacency, hypocrisy, or paternalistic tyranny, Chesed requires the corrective fire of Geburah across the Tree.',
    regardieInsight:
      'Israel Regardie points out that Chesed’s Yetziratic title, "The Cohesive or Receptacular Intelligence," reveals its true role: it gathers the descending spiritual rays from the Supernals and arranges them into stable, life-giving patterns of abundance and higher reason.',
    pathworkingGuidance:
      'Envision a serene sapphire throne room flooded with warm royal blue light. Sense the quiet majesty of just governance, extending generous goodwill and steady order toward all parts of your psyche.',
  },
  {
    id: 'geburah',
    number: 5,
    name: 'Geburah',
    hebrewName: 'גְּבוּרָה',
    translation: 'Severity / Strength (Din / Pachad)',
    pillar: 'Severity',
    coordinates: { x: 20, y: 44 },
    colors: {
      atziluth: '#e34e2b',
      briah: '#d6332b',
      yetzirah: '#b82520',
      assiah: '#8c1e1a',
    },
    colorDescriptions: {
      atziluth: 'Orange',
      briah: 'Scarlet Red',
      yetzirah: 'Bright Scarlet',
      assiah: 'Red Flecked Black',
    },
    divineName: 'Elohim Gibor (אלהים גבור — "God of Battles / Mighty God")',
    archangel: 'Khamael (Camael — Burner / He Who Sees God)',
    angelicOrder: 'Seraphim (The Fiery Serpents)',
    planet: 'Mars ♂ (Madim)',
    astrological: 'Madim (Sphere of Mars)',
    yetziraticTitle: 'The Radical Intelligence',
    soulPart: 'Ruach (Dynamic Discrimination & Volitional Force)',
    qliphoth: 'Golachab (The Burners — Blind Wrath & Cruel Destruction)',
    element: 'Purifying Fire (Martial Equilibrium)',
    chakraOrBodyPart: 'Right Arm & Shoulder',
    magicalImage: 'A Mighty Warrior in His Chariot, Armed and Crowned',
    spiritualExperience: 'Vision of Power',
    virtue: 'Energy, Courage',
    vice: 'Cruelty, Destruction',
    symbols: ['The Pentagon (Five-Pointed Star)', 'The Tudor Rose of Five Petals', 'The Sword', 'The Spear', 'The Scourge', 'The Chain'],
    preciousStone: 'Ruby',
    incenseAndPlants: 'Tobacco',
    tarotCards: 'The Four Fives',
    overview:
      'Geburah (Strength or Severity) is the Martial sphere of dynamic justice, discrimination, and spiritual courage. It counterbalances Chesed’s boundless expansion by severing what is obsolete, stagnant, or out of harmony with cosmic law.',
    dionFortuneInsight:
      'In "The Mystical Qabalah", Dion Fortune famously defends Geburah from superficial fear: it is not malice, but cosmic metabolism and spiritual surgery. Like a surgeon’s scalpel removing diseased tissue so the organism may live, Geburah applies the fires of Mars to preserve vitality and truth.',
    regardieInsight:
      'Israel Regardie emphasizes that without the Radical Intelligence of Geburah, Chesed’s mercy degenerates into sentimental stagnation. Geburah supplies the fierce willpower, discipline, and moral courage required to break inner inertia and defend the Great Work.',
    pathworkingGuidance:
      'Stand upright within a pillar of living scarlet flame. Feel fear, lethargy, and compromise burn away cleanly, leaving tempered martial courage and decisive clarity in service of justice.',
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
      atziluth: '#f194b4',
      briah: '#edc944',
      yetzirah: '#e88b78',
      assiah: '#c98a2c',
    },
    colorDescriptions: {
      atziluth: 'Clear Pink Rose',
      briah: 'Yellow (Gold)',
      yetzirah: 'Rich Salmon',
      assiah: 'Golden Amber',
    },
    divineName: 'YHVH Eloah Ve-Daath (יהוה אלוה ודעת — "Lord God of Knowledge")',
    archangel: 'Raphael (Golden Dawn Solar) / Michael (Traditional Solar)',
    angelicOrder: 'Malachim (Kings / Royal Messengers)',
    planet: 'Sun ☉ (Shemesh)',
    astrological: 'Shemesh (Sphere of the Sun)',
    yetziraticTitle: 'The Mediating Intelligence',
    soulPart: 'Ruach (True Center of Integrated Ego & Higher Self)',
    qliphoth: 'Thagiriron (The Disputers — Spiritual Pride & False Illumination)',
    element: 'Solar Light / Center of Equilibrium',
    chakraOrBodyPart: 'Heart / Breast (Solar Plexus–Heart Middle Pillar Center)',
    magicalImage: 'A Majestic King / A Child / A Sacrificed God',
    spiritualExperience: 'Vision of the Harmony of Things / Mysteries of the Crucifixion',
    virtue: 'Devotion to the Great Work',
    vice: 'Pride',
    symbols: ['The Lamen', 'The Rose Cross', 'The Calvary Cross', 'The Truncated Pyramid', 'The Cube'],
    preciousStone: 'Topaz / Yellow Diamond',
    incenseAndPlants: 'Olibanum (Frankincense)',
    tarotCards: 'The Four Sixes & The Four Princes/Emperors (Vau)',
    overview:
      'Tiphareth is the radiant Solar Heart of the Tree of Life, linked by pathways to every Sephira except Malkuth. It is the great point of mediation between Macrocosm and Microcosm—the seat of harmony, healing, sacrifice, and spiritual rebirth.',
    dionFortuneInsight:
      'Dion Fortune devotes the heart of "The Mystical Qabalah" to Tiphareth as the sphere of the Redeemer Gods (Osiris, Christ, Adonis, Apollo). Here lower personality dies to its separateness so that Higher Individuality may shine, reconciling the severity of Geburah and the mercy of Chesed into living Beauty.',
    regardieInsight:
      'Israel Regardie identifies Tiphareth as the luminous center of the Middle Pillar ritual and the goal of the Adeptus Minor grade in the Golden Dawn: the Knowledge and Conversation of the Holy Guardian Angel. It harmonizes intellect (Hod) and emotion (Netzach) beneath the golden light of the Sun.',
    pathworkingGuidance:
      'Center your awareness in the chest as a blazing golden-yellow sun unfurls within a rose cross. Breathe radiant warmth outward, uniting fractured thoughts and feelings in quiet devotion to the Great Work.',
  },
  {
    id: 'netzach',
    number: 7,
    name: 'Netzach',
    hebrewName: 'נֵצַח',
    translation: 'Victory',
    pillar: 'Mercy',
    coordinates: { x: 80, y: 68 },
    colors: {
      atziluth: '#91b53e',
      briah: '#168354',
      yetzirah: '#9dc43b',
      assiah: '#667532',
    },
    colorDescriptions: {
      atziluth: 'Amber',
      briah: 'Emerald',
      yetzirah: 'Bright Yellow Green',
      assiah: 'Olive Flecked Gold',
    },
    divineName: 'YHVH Tzabaoth (יהוה צבאות — "Lord of Hosts")',
    archangel: 'Haniel (Grace of God)',
    angelicOrder: 'Elohim (Gods / Creative Powers of Nature)',
    planet: 'Venus ♀ (Nogah)',
    astrological: 'Nogah (Sphere of Venus)',
    yetziraticTitle: 'The Occult or Hidden Intelligence',
    soulPart: 'Ruach (Emotional, Instinctual & Artistic Polarity)',
    qliphoth: "A'arab Zaraq (The Ravens of Dispersion — Blind Passion & Fragmented Desire)",
    element: 'Fire (Emotional & Instinctive Force)',
    chakraOrBodyPart: 'Loins / Hips / Right Leg',
    magicalImage: 'A Beautiful Naked Woman',
    spiritualExperience: 'Vision of Beauty Triumphant',
    virtue: 'Unselfishness',
    vice: 'Unchastity, Lust',
    symbols: ['The Lamp and Girdle', 'The Rose', 'The Emerald', 'The Copper Bowl'],
    preciousStone: 'Emerald',
    incenseAndPlants: 'Rose / Benzoin / Red Sandalwood',
    tarotCards: 'The Four Sevens',
    overview:
      'Netzach is the Venusian sphere of Victory, emotion, artistic inspiration, polarity, and the dynamic forces of living nature. Standing at the base of the Pillar of Mercy, it fuels devotion, passion, and the creative imagination.',
    dionFortuneInsight:
      'Dion Fortune emphasizes that Netzach governs the realm of group-mind, elemental nature spirits, music, and raw feeling-tone. Whereas Hod speaks in concepts and formulas, Netzach moves in images, rhythms, and love; its true virtue is Unselfishness, raising desire into impersonal devotion to Beauty.',
    regardieInsight:
      'Israel Regardie explains Netzach’s Yetziratic name—"The Occult Intelligence"—as pointing to the hidden instinctive currents that animate magic, ritual magnetism, and artistic genius. Balanced by Hod, Venusian feeling becomes radiant, disciplined creative power rather than chaotic impulse.',
    pathworkingGuidance:
      'Walk barefoot through a verdant emerald grove illuminated by warm amber light. Feel reverence for the living beauty of nature, letting personal craving expand into unselfish, joyful love.',
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
      atziluth: '#8650b1',
      briah: '#ed862d',
      yetzirah: '#8e402a',
      assiah: '#9e7037',
    },
    colorDescriptions: {
      atziluth: 'Violet Purple',
      briah: 'Orange',
      yetzirah: 'Red-Russet',
      assiah: 'Yellowish Brown Flecked White',
    },
    divineName: 'Elohim Tzabaoth (אלהים צבאות — "God of Hosts")',
    archangel: 'Michael (Golden Dawn Briatic Ruler) / Raphael (Traditional Planetary)',
    angelicOrder: 'Beni Elohim (Sons of the Gods)',
    planet: 'Mercury ☿ (Kokab)',
    astrological: 'Kokab (Sphere of Mercury)',
    yetziraticTitle: 'The Absolute or Perfect Intelligence',
    soulPart: 'Ruach (Concrete Intellect, Language & Symbolic Form)',
    qliphoth: 'Samael (The Deceivers — Sophistry, Lies & Sterile Intellectualism)',
    element: 'Water (Mercurial Fluidity of Mind)',
    chakraOrBodyPart: 'Loins / Hips / Left Leg',
    magicalImage: 'An Hermaphrodite (Hermes–Thoth)',
    spiritualExperience: 'Vision of Splendor',
    virtue: 'Truthfulness',
    vice: 'Falsehood, Dishonesty',
    symbols: ['The Names and Versicles', 'The Apron', 'The Caduceus', 'The Scroll'],
    preciousStone: 'Opal (especially Fire Opal)',
    incenseAndPlants: 'Storax',
    tarotCards: 'The Four Eights',
    overview:
      'Hod is the Mercurial sphere of Splendor, intellect, language, science, ritual magic, and precise mental form. Positioned at the foot of the Pillar of Severity, it gives exact symbolic containers to the living currents rising from Netzach.',
    dionFortuneInsight:
      'In "The Mystical Qabalah", Dion Fortune identifies Hod as the sphere of Ceremonial Magic, Hermes-Thoth, and the concrete mind. Because symbols and words of power are forged here, its mandatory virtue is absolute Truthfulness—for false formulation twists the astral molds of Yesod.',
    regardieInsight:
      'Israel Regardie notes that Hod is where spiritual intuition is translated into exact philosophical, mathematical, and ritual systems. Yet he cautions that Hod without Netzach’s warmth becomes sterile pedantry; genuine Hermetic study marries Mercurial rigor with Venusian devotion.',
    pathworkingGuidance:
      'Enter an incandescent orange temple lined with geometric glyphs and luminous scrolls. Observe your thoughts with razor-sharp honesty, aligning speech, symbol, and intellect with simple truth.',
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
      atziluth: '#393578',
      briah: '#8552b1',
      yetzirah: '#56317a',
      assiah: '#7a7048',
    },
    colorDescriptions: {
      atziluth: 'Indigo',
      briah: 'Violet',
      yetzirah: 'Very Dark Purple',
      assiah: 'Citrine Flecked Azure',
    },
    divineName: 'Shaddai El Chai (שדי אל חי — "Almighty Living God")',
    archangel: 'Gabriel (Strong Man of God)',
    angelicOrder: 'Kerubim (The Strong Ones)',
    planet: 'Moon ☽ (Levanah)',
    astrological: 'Levanah (Sphere of the Moon)',
    yetziraticTitle: 'The Pure Intelligence',
    soulPart: 'Nephesh (The Vital, Instinctual & Astral Soul)',
    qliphoth: 'Gamaliel (The Obscene Ones — Astral Glamour & Unconscious Obsession)',
    element: 'Air (Subtle Etheric & Astral Matrix)',
    chakraOrBodyPart: 'Reproductive Organs / Pelvic Center (Middle Pillar)',
    magicalImage: 'A Beautiful Naked Man, Very Strong',
    spiritualExperience: 'Vision of the Machinery of the Universe',
    virtue: 'Independence',
    vice: 'Idleness',
    symbols: ['The Perfumes and Sandals', 'The Crescent Moon', 'The Astral Mirror'],
    preciousStone: 'Quartz',
    incenseAndPlants: 'Jasmine / Ginseng',
    tarotCards: 'The Four Nines',
    overview:
      'Yesod is the Lunar Foundation on the Middle Pillar, immediately behind the physical veil of Malkuth. It serves as the etheric and astral Treasure House of Images—the formative matrix through which every higher impulse must pass before crystallizing into matter.',
    dionFortuneInsight:
      'Dion Fortune calls Yesod the "Machinery of the Universe" and the Sphere of Maya and the Astral Light. Just as the Moon reflects solar light into night, Yesod reflects Tiphareth into Malkuth; she teaches that mastering Yesod’s shifting tides brings true Independence from illusion and psychic glamour.',
    regardieInsight:
      'Israel Regardie links Yesod directly to the Nephesh, the subconscious mind, dream-life, and the etheric vitality (prana) tapped in the Middle Pillar exercise. Purifying Yesod stabilizes the subconscious foundation so spiritual light can descend safely into daily life.',
    pathworkingGuidance:
      'Stand under a cool violet night sky beneath a silver crescent moon. Watch luminous etheric currents weave the hidden patterns behind matter, grounding your vitality in calm, self-reliant clarity.',
  },
  {
    id: 'malkuth',
    number: 10,
    name: 'Malkuth',
    hebrewName: 'מַלְכוּת',
    translation: 'The Kingdom',
    pillar: 'Mildness',
    coordinates: { x: 50, y: 92 },
    colors: {
      atziluth: '#edc944',
      briah: '#7d803e',
      yetzirah: '#98563b',
      assiah: '#202328',
    },
    quarteredColors: ['#c1ae3b', '#7d803e', '#202328', '#98563b'],
    colorDescriptions: {
      atziluth: 'Yellow',
      briah: 'Citrine, Olive, Russet, and Black',
      yetzirah: 'Citrine, Olive, Russet, and Black Flecked Gold',
      assiah: 'Black Rayed Yellow',
    },
    divineName: 'Adonai ha-Aretz / Adonai Melekh (אדני הארץ — "Lord of the Earth")',
    archangel: 'Sandalphon (Co-Brother / Angel of the Earth)',
    angelicOrder: 'Ashim (Souls of Fire)',
    planet: 'Earth 🜨 · Sphere of the Four Elements',
    astrological: 'Cholem ha-Yesodoth (Breaker of the Foundations / Sphere of Elements)',
    yetziraticTitle: 'The Resplendent Intelligence',
    soulPart: 'Guph (The Physical Body & Sensory Vehicle of Nephesh)',
    qliphoth: 'Nehemoth / Lilith (The Whisperers — Dense Materialism & Blind Inertia)',
    element: 'Earth (Synthesis of Fire, Water, Air & Earth)',
    chakraOrBodyPart: 'Feet / Ankles / Soles (Base Grounding Center)',
    magicalImage: 'A Young Woman Crowned and Throned',
    spiritualExperience: 'Vision of the Holy Guardian Angel',
    virtue: 'Discrimination',
    vice: 'Avarice, Inertia',
    symbols: ['The Altar of the Double Cube', 'The Cross of Equal Arms', 'The Magic Circle', 'The Triangle of Art'],
    preciousStone: 'Rock Crystal',
    incenseAndPlants: 'Dittany of Crete',
    tarotCards: 'The Four Tens & The Four Princesses (Heh Final)',
    overview:
      'Malkuth is the Kingdom—the physical cosmos, the four elements in manifestation, and the culmination of all nine upper Sephiroth. In the famous maxim "Kether is in Malkuth, and Malkuth is in Kether," the lowest sphere reflects the highest.',
    dionFortuneInsight:
      'Dion Fortune insists throughout "The Mystical Qabalah" that Hermetic Qabalah never despises matter: Malkuth is the Bride of Microprosopus and the sacred temple of the Shekinah. Spiritual attainment requires Discrimination—discerning the divine presence within concrete reality rather than fleeing earthly life.',
    regardieInsight:
      'In "The Tree of Life" and "The Middle Pillar", Israel Regardie stresses that all ritual, meditation, and psychological integration must culminate at the feet in Malkuth. Without grounding spiritual insight in practical action and bodily health, mysticism evaporates into fantasy.',
    pathworkingGuidance:
      'Feel the solid earth beneath the soles of your feet, sensing the four elemental quarters—citrine air, olive water, russet fire, black earth—resting in poised equilibrium around your body as a living temple.',
  },
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
    letterMeaning: 'Ox (Primary Force / Creative Breath)',
    tarotKey: '0',
    tarotCardName: 'The Fool',
    attributionType: 'Element',
    attribution: 'Air',
    symbolIcon: '🜁',
    colors: {
      atziluth: '#ede17d',
      briah: '#7dd3fc',
      yetzirah: '#34d399',
      assiah: '#6ee7b7',
    },
    colorDescriptions: {
      atziluth: 'Bright Pale Yellow',
      briah: 'Sky Blue',
      yetzirah: 'Blue Emerald Green',
      assiah: 'Emerald Flecked Gold',
    },
    yetziraticText:
      'The Eleventh Path is the Scintillating Intelligence, because it is the essence of that curtain placed close to the order of the disposition, and this is a special dignity given to it that it may be able to stand before the Face of the Cause of Causes.',
    consciousnessAspect: 'Breath of Spirit (Ruach) · Sacred Eagle / Man · Galbanum · Topaz',
    overview:
      'Connects the supreme unity of Kether to the dynamic wisdom of Chokmah. Represents the original cosmic breath and pure unconditioned Spirit descending into the first polarity of creation.',
    dionFortuneInsight:
      'Dion Fortune notes that the highest Supernal paths belong to cosmic levels above ordinary personal consciousness, yet The Fool (Aleph) echoes within us as pure intuitive trust—the divine folly that steps beyond rational calculation into living Spirit.',
    regardieInsight:
      'Israel Regardie observes in "A Garden of Pomegranates" that Aleph, the first Mother Letter of Air, represents the subtle cosmic breath mediating between Kether and Chokmah, standing "before the Cause of Causes" as the veil of pure luminous Spirit.',
    pathworkingMeditation:
      'Breathe deeply in bright pale yellow light, releasing anxious calculation as you step lightly into the boundless sky of pure spiritual trust.',
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
      atziluth: '#e8c833',
      briah: '#8552b1',
      yetzirah: '#a6abaa',
      assiah: '#393578',
    },
    colorDescriptions: {
      atziluth: 'Yellow',
      briah: 'Purple',
      yetzirah: 'Grey',
      assiah: 'Indigo Rayed Violet',
    },
    yetziraticText:
      'The Twelfth Path is the Intelligence of Transparency, because it is that species of Magnificence called Chazchazit, the place whence issues the vision of those seeing in apparitions.',
    consciousnessAspect: 'Conscious Channeling of Will · Ibis / Cynocephalus · Mastic · Opal & Agate',
    overview:
      'Connects Kether directly to Binah, the Great Mother. As The Magician under Mercury, it represents focused divine attention becoming a transparent conduit ("As above, so below") to shape the primordial matrix.',
    dionFortuneInsight:
      'Dion Fortune relates this path to the transmission of archetypal ideas from the Crown into the Matrix of Form: the Logos or Word acting through focused spiritual will rather than clever lower-mind tricks.',
    regardieInsight:
      'Israel Regardie connects the "Intelligence of Transparency" with true clairvoyant lucidity and the Hermetic Magus—a mind so clear and selfless that Supernal Light passes through it without distortion into Binah.',
    pathworkingMeditation:
      'Stand between heaven and earth as a clear crystal vessel. Raise one hand toward golden Kether and direct the current down into the silent obsidian chalice of Binah.',
  },
  {
    id: 'path-13',
    number: 13,
    name: 'The Unifying Intelligence',
    fromSephiraId: 'kether',
    toSephiraId: 'tiphareth',
    hebrewLetter: 'ג',
    hebrewLetterName: 'Gimel',
    letterMeaning: 'Camel (Crossing the Abyss / Sanctuary)',
    tarotKey: 'II',
    tarotCardName: 'The High Priestess',
    attributionType: 'Planet',
    attribution: 'Moon',
    symbolIcon: '☽',
    colors: {
      atziluth: '#2b61b6',
      briah: '#cbd5e1',
      yetzirah: '#93c5fd',
      assiah: '#94a3b8',
    },
    colorDescriptions: {
      atziluth: 'Blue',
      briah: 'Silver',
      yetzirah: 'Cold Pale Blue',
      assiah: 'Silver Rayed Sky-Blue',
    },
    yetziraticText:
      'The Thirteenth Path is named the Unifying Intelligence, and is so called because it is itself the Essence of Glory. It is the Consummation of the Truth of individual spiritual things.',
    consciousnessAspect: 'Crossing the Abyss · Dog · Camphor / Aloes · Moonstone & Pearl',
    overview:
      'The central vertical path plunging down the Middle Pillar from Kether, straight across the Abyss and Da’ath, directly into the Solar Heart of Tiphareth. It governs cosmic memory, intuition, and silent mystical ascent.',
    dionFortuneInsight:
      'Dion Fortune calls the High Priestess the great spiritual bridge of the Middle Pillar: the lunar reflection of Kether descending across the Abyss to the Soul in Tiphareth, bearing the scrolls of cosmic memory and subtle initiation.',
    regardieInsight:
      'Israel Regardie highlights Gimel—the Camel crossing the desert of the Abyss—as the essential mystical path linking the Adept in Tiphareth directly to the Crown (Yechidah). Without the serene detachment of this path, no consciousness crosses Da’ath.',
    pathworkingMeditation:
      'Sit silently between the black and white pillars before the veil of the temple, letting silver moonlight guide your awareness across the quiet desert of the Abyss toward the Crown.',
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
      atziluth: '#168354',
      briah: '#60a5fa',
      yetzirah: '#34a86e',
      assiah: '#e879a0',
    },
    colorDescriptions: {
      atziluth: 'Emerald Green',
      briah: 'Sky Blue',
      yetzirah: 'Early Spring Green',
      assiah: 'Bright Rose or Cerise Rayed Pale Green',
    },
    yetziraticText:
      'The Fourteenth Path is the Illuminating Intelligence, and is so called because it is that Brilliant One which is the founder of the concealed and fundamental ideas of holiness and of their stages of preparation.',
    consciousnessAspect: 'Sacred Marriage of Abba & Aima · Dove / Sparrow · Sandalwood & Myrtle · Emerald & Turquoise',
    overview:
      'The highest horizontal path, uniting Abba (Chokmah) and Aima (Binah) across the Supernal Triad. Ruled by Venus and The Empress, it is the fertile doorway through which pure Force marries Form to generate all cosmic life.',
    dionFortuneInsight:
      'Dion Fortune teaches that Path 14 embodies cosmic Love in its loftiest archetype—the eternal magnetic attraction between positive Force and negative Form. Every later manifestation of Venusian harmony on the Tree is a reflection of this Supernal marriage.',
    regardieInsight:
      'Israel Regardie interprets Daleth, "the Door," as the portal through which the Light of Kether—having divided into Wisdom and Understanding—becomes fertile and luminous, giving birth to all lower planes of existence.',
    pathworkingMeditation:
      'Pass through an emerald doorway arch woven with living roses, witnessing Force and Form embrace in serene, abundant harmony above all earthly struggle.',
  },
  {
    id: 'path-15',
    number: 15,
    name: 'The Constituting Intelligence',
    fromSephiraId: 'chokmah',
    toSephiraId: 'tiphareth',
    hebrewLetter: 'ה',
    hebrewLetterName: 'Heh',
    letterMeaning: 'Window (Vision / Spiritual Oversight)',
    tarotKey: 'IV',
    tarotCardName: 'The Emperor',
    attributionType: 'Zodiac',
    attribution: 'Aries',
    symbolIcon: '♈',
    colors: {
      atziluth: '#d6332b',
      briah: '#e34e2b',
      yetzirah: '#dc2626',
      assiah: '#b91c1c',
    },
    colorDescriptions: {
      atziluth: 'Scarlet',
      briah: 'Red',
      yetzirah: 'Brilliant Flame',
      assiah: 'Glowing Red',
    },
    yetziraticText:
      'The Fifteenth Path is the Constituting Intelligence, so called because it constitutes the substance of creation in pure darkness, and men have spoken of these contemplations; it is that darkness spoken of in Scripture, Job 38:9, "and thick darkness a swaddling band for it."',
    consciousnessAspect: 'Pioneering Spiritual Order · Ram / Owl · Dragon’s Blood · Ruby',
    overview:
      'Connects Chokmah (Supernal Father) directly to Tiphareth (the Solar Child). As The Emperor and Aries, it brings fiery pioneering leadership, clear vision, and sovereign spiritual authority down to the Heart.',
    dionFortuneInsight:
      'Dion Fortune points out that Path 15 transmits the paternal authority of Chokmah into Tiphareth’s central consciousness, establishing order, vision, and moral governance over the lower kingdom of the personality.',
    regardieInsight:
      'Israel Regardie links the Hebrew letter Heh ("a window") with visionary insight: it opens an aperture from Tiphareth directly onto the fiery starry Wisdom of Chokmah, empowering the soul to rule its own nature with Aries initiative.',
    pathworkingMeditation:
      'Look through a high window bathed in scarlet dawn light, feeling upright solar sovereignty and courageous clarity take command of your inner world.',
  },
  {
    id: 'path-16',
    number: 16,
    name: 'The Triumphant and Eternal Intelligence',
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
      atziluth: '#dc612f',
      briah: '#393578',
      yetzirah: '#784830',
      assiah: '#5c3d28',
    },
    colorDescriptions: {
      atziluth: 'Red Orange',
      briah: 'Deep Indigo',
      yetzirah: 'Deep Warm Olive',
      assiah: 'Rich Brown',
    },
    yetziraticText:
      'The Sixteenth Path is the Triumphant or Eternal Intelligence, so called because it is the pleasure of the Glory, beyond which is no other Glory like to it, and it is called also the Paradise prepared for the Righteous.',
    consciousnessAspect: 'Inner Teacher & Sacred Tradition · Bull · Storax · Topaz',
    overview:
      'Descends the Pillar of Mercy from Chokmah to Chesed. Governed by Taurus and The Hierophant, it is the channel of living spiritual tradition, inner initiation, and the faithful teacher who links human law to Supernal Wisdom.',
    dionFortuneInsight:
      'Dion Fortune highlights The Hierophant as the bridge across the outer edge of the Abyss on the Mercy side: the Initiator and Guardian of Ancient Wisdom who translates timeless cosmic truth into enduring esoteric tradition in Chesed.',
    regardieInsight:
      'Israel Regardie draws attention to the letter Vau ("a nail or hook"), explaining how it securely fastens the Supernal Wisdom of Chokmah to the benevolent lawgiver Chesed, preserving the inner sanctuary of "the Paradise prepared for the Righteous."',
    pathworkingMeditation:
      'Kneel before the silent inner Hierophant bathed in warm red-orange and deep indigo light, listening for the quiet voice of enduring spiritual wisdom.',
  },
  {
    id: 'path-17',
    number: 17,
    name: 'The Disposing Intelligence',
    fromSephiraId: 'binah',
    toSephiraId: 'tiphareth',
    hebrewLetter: 'ז',
    hebrewLetterName: 'Zain',
    letterMeaning: 'Sword (Discrimination / Division & Choice)',
    tarotKey: 'VI',
    tarotCardName: 'The Lovers',
    attributionType: 'Zodiac',
    attribution: 'Gemini',
    symbolIcon: '♊',
    colors: {
      atziluth: '#e68a2d',
      briah: '#c084fc',
      yetzirah: '#ede17d',
      assiah: '#9ca3af',
    },
    colorDescriptions: {
      atziluth: 'Orange',
      briah: 'Pale Mauve',
      yetzirah: 'New Yellow Leather',
      assiah: 'Reddish Grey Inclining to Mauve',
    },
    yetziraticText:
      'The Seventeenth Path is the Disposing Intelligence, which provides Faith to the Righteous, and they are clothed with the Holy Spirit by it, and it is called the Foundation of Excellence in the state of higher things.',
    consciousnessAspect: 'Union of Opposites & Right Choice · Magpie / Twins · Wormwood · Alexandrite & Tourmaline',
    overview:
      'Connects Binah (Supernal Understanding) down to Tiphareth (the Heart). Under Gemini and The Lovers, it represents intellectual discrimination (Zain, the Sword) culminating in the sacred marriage of complementary polarities.',
    dionFortuneInsight:
      'Dion Fortune stresses that Zain is a double-edged sword of discernment: before true union can occur in Tiphareth, the soul must divide the real from the unreal, turning conscious choice away from lower illusion toward the angelic overshadowing of the Supernals.',
    regardieInsight:
      'Israel Regardie observes in "A Garden of Pomegranates" that "providing Faith to the Righteous" signifies the sudden intuitive flash descending from Binah into Tiphareth—reconciling dualities through the Golden Dawn Lovers symbolism of the Angelic Alchemical Marriage.',
    pathworkingMeditation:
      'Stand beneath the radiant angel in golden-orange and soft mauve light, harmonizing twin opposites within your own mind through clear, heartfelt choice.',
  },
  {
    id: 'path-18',
    number: 18,
    name: 'The Intelligence of the House of Influence',
    fromSephiraId: 'binah',
    toSephiraId: 'geburah',
    hebrewLetter: 'ח',
    hebrewLetterName: 'Cheth',
    letterMeaning: 'Fence / Enclosure (Sacred Container)',
    tarotKey: 'VII',
    tarotCardName: 'The Chariot',
    attributionType: 'Zodiac',
    attribution: 'Cancer',
    symbolIcon: '♋',
    colors: {
      atziluth: '#e1aa3b',
      briah: '#8c3b2b',
      yetzirah: '#98563b',
      assiah: '#2c5c52',
    },
    colorDescriptions: {
      atziluth: 'Amber',
      briah: 'Maroon',
      yetzirah: 'Rich Bright Russet',
      assiah: 'Dark Greenish Brown',
    },
    yetziraticText:
      'The Eighteenth Path is called the Intelligence or House of Influence (by the greatness of whose abundance the influx of good things upon created beings is increased), and from its midst the arcana and hidden senses are drawn forth, which dwell in its shade and cling to it.',
    consciousnessAspect: 'Spiritual Vehicle (Merkabah) & Grail · Crab / Sphinx · Onycha · Amber',
    overview:
      'Descends the Pillar of Severity from Binah to Geburah. As The Chariot and Cancer, it is the protective "fence" or armored Merkabah vehicle carrying the Higher Self victoriously across the Abyss.',
    dionFortuneInsight:
      'Dion Fortune explains that Cheth (an enclosure) mirrors the protective aura and the Grail cup carried by the Charioteer: it guards the Supernal Mysteries descending from Binah while directing the fierce power of Geburah without letting it scatter.',
    regardieInsight:
      'Israel Regardie links this path to the Sangreal (Holy Grail) and the dual sphinxes of the Chariot: just as Cancer is a watery enclosure ruled by discipline on Boaz, the Adept commands opposing black and white forces through sheer stillness of will.',
    pathworkingMeditation:
      'Take your place inside an amber-and-maroon celestial chariot, holding the reins calmly as opposing forces pull together in steady, silent equilibrium.',
  },
  {
    id: 'path-19',
    number: 19,
    name: 'The Intelligence of the Secret of All Spiritual Activities',
    fromSephiraId: 'chesed',
    toSephiraId: 'geburah',
    hebrewLetter: 'ט',
    hebrewLetterName: 'Teth',
    letterMeaning: 'Serpent (Vital Energy / Kundalini)',
    tarotKey: 'VIII / XI',
    tarotCardName: 'Strength (Lust)',
    attributionType: 'Zodiac',
    attribution: 'Leo',
    symbolIcon: '♌',
    colors: {
      atziluth: '#c4cc4f',
      briah: '#6b3fa0',
      yetzirah: '#a6abaa',
      assiah: '#c97b38',
    },
    colorDescriptions: {
      atziluth: 'Yellow, Greenish',
      briah: 'Deep Purple',
      yetzirah: 'Grey',
      assiah: 'Reddish Amber',
    },
    yetziraticText:
      'The Nineteenth Path is the Intelligence of the Secret of all the activities of the spiritual beings, and is so called because of the affluence diffused by it from the most high blessing and most high exalted glory.',
    consciousnessAspect: 'Taming Primal Vitality · Lion · Olibanum · Cat’s Eye',
    overview:
      'The horizontal bridge immediately below the Abyss linking Chesed (Mercy) and Geburah (Severity). Ruled by Leo and Strength, it teaches how primal serpentine life-force is harnessed gently rather than crushed.',
    dionFortuneInsight:
      'Dion Fortune describes Path 19 as the true secret of magical power: the maiden of intuition gently closing the jaws of the Lion with a garland of roses—transmuting raw solar-vital instinct into spiritual strength through love and poise rather than violent repression.',
    regardieInsight:
      'Israel Regardie stresses that Teth ("the Serpent") connects benevolent expansion (Chesed) with fiery severity (Geburah), balancing mercy and force into the magnetic vital current ("astral light" / Prana) underlying every spiritual operation.',
    pathworkingMeditation:
      'Place gentle, steady hands upon the golden Lion of vital instinct within you, guiding fierce natural power into calm, radiant composure.',
  },
  {
    id: 'path-20',
    number: 20,
    name: 'The Intelligence of Will',
    fromSephiraId: 'chesed',
    toSephiraId: 'tiphareth',
    hebrewLetter: 'י',
    hebrewLetterName: 'Yod',
    letterMeaning: 'Hand (The Primordial Seed / Point)',
    tarotKey: 'IX',
    tarotCardName: 'The Hermit',
    attributionType: 'Zodiac',
    attribution: 'Virgo',
    symbolIcon: '♍',
    colors: {
      atziluth: '#91b53e',
      briah: '#64748b',
      yetzirah: '#5c7a38',
      assiah: '#704a52',
    },
    colorDescriptions: {
      atziluth: 'Yellowish Green',
      briah: 'Slate Grey',
      yetzirah: 'Green Grey',
      assiah: 'Plum Colour',
    },
    yetziraticText:
      'The Twentieth Path is the Intelligence of Will, and is so called because it is the means of preparation of all and each created being, and by this intelligence the existence of the Primordial Wisdom becomes known.',
    consciousnessAspect: 'Solitary Illumination & True Will · Virgin / Anchorite · Narcissus · Peridot',
    overview:
      'Connects Chesed (Mercy/Jupiter) to Tiphareth (Heart/Sun). Associated with Virgo, the letter Yod, and The Hermit, it portrays the solitary sage bearing the concealed lamp of True Will from the heart toward cosmic order.',
    dionFortuneInsight:
      'Dion Fortune notes the paradox of The Hermit: though veiled in slate-grey solitude atop the heights, he lifts his lantern to illuminate the path for those climbing below—uniting humble service (Virgo) with the creative seed of Yod.',
    regardieInsight:
      'Israel Regardie emphasizes that the "Intelligence of Will" reflects the seed-letter Yod (the root of every Hebrew letter) linking Chesed’s blueprint to Tiphareth’s individual awareness: discovering one’s True Will in quiet, self-contained contemplation.',
    pathworkingMeditation:
      'Climb quietly toward the mountain summit in cool slate-grey twilight, shielding the steady six-pointed star of light inside your lantern.',
  },
  {
    id: 'path-21',
    number: 21,
    name: 'The Intelligence of Conciliation',
    fromSephiraId: 'chesed',
    toSephiraId: 'netzach',
    hebrewLetter: 'כ',
    hebrewLetterName: 'Kaph',
    letterMeaning: 'Palm / Grasping Hand (Receptive Cycle)',
    tarotKey: 'X',
    tarotCardName: 'Wheel of Fortune',
    attributionType: 'Planet',
    attribution: 'Jupiter',
    symbolIcon: '♃',
    colors: {
      atziluth: '#8650b1',
      briah: '#2452ab',
      yetzirah: '#6b46a1',
      assiah: '#3b4ca8',
    },
    colorDescriptions: {
      atziluth: 'Violet',
      briah: 'Blue',
      yetzirah: 'Rich Purple',
      assiah: 'Bright Blue Rayed Yellow',
    },
    yetziraticText:
      'The Twenty-first Path is the Intelligence of Conciliation, and is so called because it receives the divine influence which flows into it from its benediction upon all and each existence.',
    consciousnessAspect: 'Karmic Cycles & Benevolent Providence · Eagle · Saffron · Amethyst & Lapis Lazuli',
    overview:
      'Descends the Pillar of Mercy from Chesed to Netzach. Ruled by Jupiter and the Wheel of Fortune, it governs the rhythmic rotation of karma, cyclical law, and the reconciliation of shifting circumstance with higher providence.',
    dionFortuneInsight:
      'Dion Fortune interprets Path 21 as the turning wheel of cosmic law that brings Chesed’s divine order down into the emotional tides of Netzach: every swing of fortune’s rim moves around an unshakeable spiritual axle.',
    regardieInsight:
      'Israel Regardie highlights Kaph ("the open palm receiving") as the gracious channel of Jupiterian benediction, teaching the student to accept cyclical change without losing equilibrium at the motionless hub.',
    pathworkingMeditation:
      'Step inward to the still violet-and-blue axle at the center of the turning Wheel, watching seasons and fortunes revolve peacefully around unmoving purpose.',
  },
  {
    id: 'path-22',
    number: 22,
    name: 'The Faithful Intelligence',
    fromSephiraId: 'geburah',
    toSephiraId: 'tiphareth',
    hebrewLetter: 'ל',
    hebrewLetterName: 'Lamed',
    letterMeaning: 'Ox-Goad (Equilibrium & Adjustment)',
    tarotKey: 'XI / VIII',
    tarotCardName: 'Justice (Adjustment)',
    attributionType: 'Zodiac',
    attribution: 'Libra',
    symbolIcon: '♎',
    colors: {
      atziluth: '#168354',
      briah: '#2b61b6',
      yetzirah: '#148c91',
      assiah: '#2d6e5e',
    },
    colorDescriptions: {
      atziluth: 'Emerald Green',
      briah: 'Blue',
      yetzirah: 'Deep Blue-Green',
      assiah: 'Pale Green',
    },
    yetziraticText:
      'The Twenty-second Path is the Faithful Intelligence, and is so called because by it spiritual virtues are increased, and all dwellers on earth are nearly under its shadow.',
    consciousnessAspect: 'Karmic Balance & Impartial Truth · Elephant · Galbanum · Emerald',
    overview:
      'Connects Geburah (Severity) to Tiphareth (Beauty). Under Libra and Justice, it represents the exact, faithful adjustment of cause and effect—correcting every deviation before the soul approaches the Solar center.',
    dionFortuneInsight:
      'Dion Fortune sees Justice on Path 22 as dynamic equilibrium in action: Lamed, the ox-goad, gently prods the wandering personality back onto the path of balance so Geburah’s severity serves the harmony of Tiphareth.',
    regardieInsight:
      'Israel Regardie observes that the Golden Dawn aligns Libra (Justice) with the faithful law of karma—not blind vengeance, but an exact natural adjustment that restores poise whenever extremes appear.',
    pathworkingMeditation:
      'Hold the golden scales steady amid cool emerald and deep blue light, letting excess fall away until thought, motive, and deed rest in quiet balance.',
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
      atziluth: '#214483',
      briah: '#148c91',
      yetzirah: '#7d803e',
      assiah: '#f1f5f9',
    },
    colorDescriptions: {
      atziluth: 'Deep Blue',
      briah: 'Sea-Green',
      yetzirah: 'Deep Olive Green',
      assiah: 'White Flecked Purple',
    },
    yetziraticText:
      'The Twenty-third Path is the Stable Intelligence, and is so called because it has the virtue of consistency among all numerations.',
    consciousnessAspect: 'Willing Surrender & Reversal of Perspective · Eagle–Serpent–Scorpion · Myrrh · Beryl & Aquamarine',
    overview:
      'Descends the Pillar of Severity from Geburah to Hod. Attributed to the Mother Letter Mem (Water) and The Hanged Man, it depicts the willing suspension of worldly values so higher truth may stabilize consciousness.',
    dionFortuneInsight:
      'Dion Fortune interprets Path 23 as profound spiritual inversion: to worldly eyes in Malkuth and Hod, the mystic appears upside down and inactive, yet in reality the soul hangs anchored in the higher waters of Geburah, sacrificing ego-will for illumination.',
    regardieInsight:
      'Israel Regardie remarks on the apparent paradox of calling this watery path "the Stable Intelligence": true stability arises only when fluid, reactive intellect (Hod) surrenders completely to cosmic law rather than clinging to rigid ego-opinions.',
    pathworkingMeditation:
      'Suspend worldly haste within calm deep-blue waters, viewing old habits from an inverted angle until peaceful stillness settles over the mind.',
  },
  {
    id: 'path-24',
    number: 24,
    name: 'The Imaginative Intelligence',
    fromSephiraId: 'tiphareth',
    toSephiraId: 'netzach',
    hebrewLetter: 'נ',
    hebrewLetterName: 'Nun',
    letterMeaning: 'Fish (Life Moving Through Dark Waters)',
    tarotKey: 'XIII',
    tarotCardName: 'Death',
    attributionType: 'Zodiac',
    attribution: 'Scorpio',
    symbolIcon: '♏',
    colors: {
      atziluth: '#148c91',
      briah: '#5c4d3c',
      yetzirah: '#6b382e',
      assiah: '#2c2b40',
    },
    colorDescriptions: {
      atziluth: 'Green-Blue',
      briah: 'Dull Brown',
      yetzirah: 'Very Dark Brown',
      assiah: 'Livid Indigo Brown (Like a Black Beetle)',
    },
    yetziraticText:
      'The Twenty-fourth Path is the Imaginative Intelligence, and is so called because it gives a likeness to all the similitudes which are created in like manner similar to its harmonious elegancies.',
    consciousnessAspect: 'Putrefaction, Rebirth & Regeneration · Scorpion / Eagle · Benzoin · Snakestone',
    overview:
      'Connects Tiphareth (Sun/Heart) down to Netzach (Venus/Desire). Ruled by Scorpio and the Death Arcanum, it represents alchemy’s necessary dissolution of dead emotional attachments so living beauty may rise anew.',
    dionFortuneInsight:
      'Dion Fortune emphasizes that Death on Path 24 is never annihilation—it is transformation, the passage through dark subterranean waters where worn-out forms decompose to nourish new growth under the rising Sun of Tiphareth.',
    regardieInsight:
      'Israel Regardie explains its Yetziratic name, "The Imaginative Intelligence," as the alchemical process of putrefaction and renewal: as old desires in Netzach die away, the creative imagination is purified to reflect the real harmonies of Tiphareth.',
    pathworkingMeditation:
      'Allow outdated identities and stale attachments to dissolve gently like autumn leaves returning to dark earth, watching the golden solar dawn break beyond the twin towers.',
  },
  {
    id: 'path-25',
    number: 25,
    name: 'The Intelligence of Probation (Trial)',
    fromSephiraId: 'tiphareth',
    toSephiraId: 'yesod',
    hebrewLetter: 'ס',
    hebrewLetterName: 'Samekh',
    letterMeaning: 'Prop / Tent-Peg (The Arrow of Aspiration)',
    tarotKey: 'XIV',
    tarotCardName: 'Temperance (Art)',
    attributionType: 'Zodiac',
    attribution: 'Sagittarius',
    symbolIcon: '♐',
    colors: {
      atziluth: '#2b61b6',
      briah: '#edc944',
      yetzirah: '#168354',
      assiah: '#1e3a78',
    },
    colorDescriptions: {
      atziluth: 'Blue',
      briah: 'Yellow',
      yetzirah: 'Green',
      assiah: 'Dark Vivid Blue',
    },
    yetziraticText:
      'The Twenty-fifth Path is the Intelligence of Probation or Trial, and is so called because it is the primary temptation, by which the Creator tries all righteous persons.',
    consciousnessAspect: 'Alchemical Tempering & Path of the Arrow · Centaur / Horse · Lign-Aloes · Jacinth',
    overview:
      'The central vertical path ascending the Middle Pillar from Yesod (Astral) straight into Tiphareth (Solar Heart). Under Sagittarius and Temperance, it is the rainbow bridge of spiritual alchemy and the first great inner ordeal.',
    dionFortuneInsight:
      'Dion Fortune describes Path 25 as the "Dark Night of the Soul" of early initiation—the trial in which the aspirant rises out of Yesod’s shifting lunar illusions across the astral desert toward the steady Sun of Tiphareth, guided by the angel pouring fire and water.',
    regardieInsight:
      'Israel Regardie emphasizes that the Arrow of Sagittarius (Qesheth, the Rainbow of Promise) shoots straight up the Middle Pillar from the subconscious foundation of Yesod to the Holy Guardian Angel in Tiphareth, uniting opposites through patient alchemical tempering.',
    pathworkingMeditation:
      'Trace the rainbow arc rising from violet Yesod toward golden Tiphareth, tempering fiery aspiration and watery feeling into one straight arrow aimed at the Heart.',
  },
  {
    id: 'path-26',
    number: 26,
    name: 'The Renovating Intelligence',
    fromSephiraId: 'tiphareth',
    toSephiraId: 'hod',
    hebrewLetter: 'ע',
    hebrewLetterName: 'Ayin',
    letterMeaning: 'Eye (Direct Vision / Appearances)',
    tarotKey: 'XV',
    tarotCardName: 'The Devil',
    attributionType: 'Zodiac',
    attribution: 'Capricorn',
    symbolIcon: '♑',
    colors: {
      atziluth: '#393578',
      briah: '#191c20',
      yetzirah: '#3b4a5e',
      assiah: '#2d323b',
    },
    colorDescriptions: {
      atziluth: 'Indigo',
      briah: 'Black',
      yetzirah: 'Blue-Black',
      assiah: 'Cold Dark Grey Approaching Black',
    },
    yetziraticText:
      'The Twenty-sixth Path is called the Renovating Intelligence, because the Holy God renews by it all the changing things which are renewed by the creation of the world.',
    consciousnessAspect: 'Confronting the Shadow & Mirth of Pan · Goat · Musk · Black Diamond',
    overview:
      'Connects Tiphareth (Sun/Heart) to Hod (Mercury/Intellect). Attributed to Capricorn, Ayin ("the Eye"), and The Devil, it challenges rational mind to see through material bondage and recognize nature’s raw life-force without fear.',
    dionFortuneInsight:
      'Dion Fortune clarifies that Path 26 is not evil, but the "Lord of Matter" and the threshold of laughter and disillusionment: chains appear heavy only while the mind in Hod takes surface appearances for ultimate reality.',
    regardieInsight:
      'Israel Regardie points out that "The Renovating Intelligence" breaks stagnant intellectual pride by confronting us with instinct and physical limitation—for once we laugh at the bondage of Ayin (mere outward seeing), vitality is renewed in service of Tiphareth.',
    pathworkingMeditation:
      'Look clearly into the indigo-black shadow without flinching, noticing that the chains around the mind are loose enough to lift away at any moment.',
  },
  {
    id: 'path-27',
    number: 27,
    name: 'The Exciting Intelligence',
    fromSephiraId: 'netzach',
    toSephiraId: 'hod',
    hebrewLetter: 'פ',
    hebrewLetterName: 'Peh',
    letterMeaning: 'Mouth (Spoken Word / Breath of Force)',
    tarotKey: 'XVI',
    tarotCardName: 'The Tower',
    attributionType: 'Planet',
    attribution: 'Mars',
    symbolIcon: '♂',
    colors: {
      atziluth: '#d6332b',
      briah: '#e34e2b',
      yetzirah: '#ef4444',
      assiah: '#b91c1c',
    },
    colorDescriptions: {
      atziluth: 'Scarlet',
      briah: 'Red',
      yetzirah: 'Venetian Red',
      assiah: 'Bright Red Rayed Azure or Emerald',
    },
    yetziraticText:
      'The Twenty-seventh Path is the Exciting Intelligence, and is so called because by it is created the intellect of all created beings under the highest heaven, and the excitement or motion of them.',
    consciousnessAspect: 'Shattering False Forms & Dynamic Speech · Horse / Bear · Pepper & Dragon’s Blood · Ruby',
    overview:
      'The lowest horizontal path, bridging Emotion (Netzach) and Intellect (Hod). Governed by Mars and The Tower, it is the lightning flash of crisis and awakening that shatters rigid mental fortresses.',
    dionFortuneInsight:
      'Dion Fortune notes that The Tower stands between feeling and intellect to remind us that outworn mental structures and smug dogmas must eventually be struck by the lightning of Spirit—releasing imprisoned truth.',
    regardieInsight:
      'Israel Regardie links Peh ("the Mouth") to the vibrating Spoken Word of ritual magic and the Martial arousal of dormant vitality ("The Exciting Intelligence"), awakening the soul out of complacent sleep between Hod and Netzach.',
    pathworkingMeditation:
      'Witness a bolt of scarlet lightning strike an inflexible tower of rigid ideas, watching open sky rush in as cramped walls fall away.',
  },
  {
    id: 'path-28',
    number: 28,
    name: 'The Natural Intelligence',
    fromSephiraId: 'netzach',
    toSephiraId: 'yesod',
    hebrewLetter: 'צ',
    hebrewLetterName: 'Tzaddi',
    letterMeaning: 'Fish-Hook (Drawing Grace / Meditation)',
    tarotKey: 'XVII',
    tarotCardName: 'The Star',
    attributionType: 'Zodiac',
    attribution: 'Aquarius',
    symbolIcon: '♒',
    colors: {
      atziluth: '#8650b1',
      briah: '#38bdf8',
      yetzirah: '#a5b4fc',
      assiah: '#e2e8f0',
    },
    colorDescriptions: {
      atziluth: 'Violet',
      briah: 'Sky Blue',
      yetzirah: 'Bluish Mauve',
      assiah: 'White Tinged Purple',
    },
    yetziraticText:
      'The Twenty-eighth Path is called the Natural Intelligence, because through it is consummated and perfected the nature of all that exists beneath the Sun.',
    consciousnessAspect: 'Illuminated Intuition & Cosmic Renewal · Man / Eagle · Galbanum · Artificial Glass & Chalcedony',
    overview:
      'Connects Netzach (Venus/Emotion) to Yesod (Moon/Astral). Attributed to Aquarius and The Star, it is the quiet, refreshing outpouring of living cosmic inspiration after the storm of The Tower.',
    dionFortuneInsight:
      'Dion Fortune highlights The Star as unveiled Truth pouring her waters equally onto the dry land of form and the dark pool of the subconscious: here personal emotion (Netzach) is cleansed and channeled into clear astral vision (Yesod).',
    regardieInsight:
      'Israel Regardie links Tzaddi ("the Fish-Hook") to meditative contemplation that "hooks" divine inspiration from the Supernal depths, bringing hope, clarity, and natural harmony to everything "beneath the Sun."',
    pathworkingMeditation:
      'Kneel beside clear silver waters under seven violet-and-sky-blue stars, letting the soothing current wash fatigue from mind and heart.',
  },
  {
    id: 'path-29',
    number: 29,
    name: 'The Corporeal Intelligence',
    fromSephiraId: 'netzach',
    toSephiraId: 'malkuth',
    hebrewLetter: 'ק',
    hebrewLetterName: 'Qoph',
    letterMeaning: 'Back of the Head (Dreaming & Instinctive Brain)',
    tarotKey: 'XVIII',
    tarotCardName: 'The Moon',
    attributionType: 'Zodiac',
    attribution: 'Pisces',
    symbolIcon: '♓',
    colors: {
      atziluth: '#b52758',
      briah: '#c4b89b',
      yetzirah: '#6b4435',
      assiah: '#3d3c42',
    },
    colorDescriptions: {
      atziluth: 'Crimson (Ultra-Violet)',
      briah: 'Buff Flecked Silver-White',
      yetzirah: 'Light Translucent Pinkish Brown',
      assiah: 'Stone Colour',
    },
    yetziraticText:
      'The Twenty-ninth Path is the Corporeal Intelligence, so called because it forms every body which is formed in all the worlds, and the reproduction of them.',
    consciousnessAspect: 'Biological Evolution & Deep Unconscious · Beetle / Dolphin · Ambergris · Pearl',
    overview:
      'Descends the right side of the Tree from Netzach (Instinct/Nature) directly to Malkuth (Physical Body). Ruled by Pisces and The Moon, it traces the winding evolutionary path through deep unconscious memory into incarnation.',
    dionFortuneInsight:
      'Dion Fortune explains why this path is so psychologically demanding: Qoph corresponds to the medulla oblongata and ancestral instinct. Walking between the two towers of The Moon requires facing primal fears and evolutionary memories without turning back.',
    regardieInsight:
      'Israel Regardie calls Path 29 the gateway of the deep racial unconscious and cellular memory ("forms every body in all the worlds"): as the crustacean climbs from dark Piscean waters onto land, subconscious vitality takes physical shape in Malkuth.',
    pathworkingMeditation:
      'Walk calmly along the narrow path rising out of dark waters toward distant hills, trusting the quiet light ahead even while wolves of instinct howl beside the trail.',
  },
  {
    id: 'path-30',
    number: 30,
    name: 'The Collecting Intelligence',
    fromSephiraId: 'hod',
    toSephiraId: 'yesod',
    hebrewLetter: 'ר',
    hebrewLetterName: 'Resh',
    letterMeaning: 'Head (Solar Reason & Clarity)',
    tarotKey: 'XIX',
    tarotCardName: 'The Sun',
    attributionType: 'Planet',
    attribution: 'Sun',
    symbolIcon: '☉',
    colors: {
      atziluth: '#e68a2d',
      briah: '#edc944',
      yetzirah: '#f59e0b',
      assiah: '#d97706',
    },
    colorDescriptions: {
      atziluth: 'Orange',
      briah: 'Gold Yellow',
      yetzirah: 'Rich Amber',
      assiah: 'Amber Rayed Red',
    },
    yetziraticText:
      'The Thirtieth Path is the Collecting Intelligence, and is so called because Astrologers deduce from it the judgment of the stars and celestial signs, and the perfection of their science, according to the rules of their revolutions.',
    consciousnessAspect: 'Solar Illumination of Mind & Astral · Lion / Sparrowhawk · Olibanum & Cinnamon · Chrysolite',
    overview:
      'Connects Hod (Intellect) to Yesod (Astral Foundation). Governed by the Sun and Tarot Key XIX, it gathers scattered insights and shines warm, clear conscious light upon the lunar dream-world of Yesod.',
    dionFortuneInsight:
      'Dion Fortune notes that Path 30 represents the joyful dawn after lunar uncertainty: the twin children dancing within the walled garden show intellect (Hod) and feeling/instinct playing together in innocent harmony beneath solar truth.',
    regardieInsight:
      'Israel Regardie explains that "The Collecting Intelligence" gathers all the rays of the planetary and astral realms into clear rational synthesis—bringing the bright clarity of Tiphareth’s Sun down within reach of waking reason.',
    pathworkingMeditation:
      'Step into a sunlit walled garden ablaze with golden-orange warmth, feeling shadows of confusion evaporate under simple, childlike joy.',
  },
  {
    id: 'path-31',
    number: 31,
    name: 'The Perpetual Intelligence',
    fromSephiraId: 'hod',
    toSephiraId: 'malkuth',
    hebrewLetter: 'ש',
    hebrewLetterName: 'Shin',
    letterMeaning: 'Tooth (Holy Spirit / Tongues of Fire)',
    tarotKey: 'XX',
    tarotCardName: 'Judgement (The Aeon)',
    attributionType: 'Element',
    attribution: 'Fire / Spirit',
    symbolIcon: '🜂',
    colors: {
      atziluth: '#e34e2b',
      briah: '#d6332b',
      yetzirah: '#dc2626',
      assiah: '#b52758',
    },
    colorDescriptions: {
      atziluth: 'Glowing Orange Scarlet',
      briah: 'Vermilion',
      yetzirah: 'Scarlet Flecked Gold',
      assiah: 'Vermilion Flecked Crimson and Emerald',
    },
    yetziraticText:
      'The Thirty-first Path is the Perpetual Intelligence; but why is it so called? Because it regulates the motions of the Sun and Moon in their proper order, each in an orbit convenient for it.',
    consciousnessAspect: 'Awakening by Sacred Fire · Lion · Olibanum · Fire Opal',
    overview:
      'Descends the left side of the Tree from Hod (Intellect) directly to Malkuth (Matter). Attributed to the Mother Letter Shin (Fire/Spirit) and Judgement, it portrays the Pentecostal fire awakening physical humanity to spiritual rebirth.',
    dionFortuneInsight:
      'Dion Fortune emphasizes that Shin is the fiery Spirit descending into the four elements of Malkuth to raise the dormant "dead"—mundane consciousness trapped in routine—into awakened perception of the subtle worlds.',
    regardieInsight:
      'Israel Regardie calls Path 31 the "Perpetual Intelligence" of cosmic fire: when purified by the trumpet-call of Gabriel, the analytical mind of Hod no longer doubts spirit, but witnesses eternal vitality animating physical matter.',
    pathworkingMeditation:
      'Hear a clear golden trumpet resonate through glowing scarlet fire, rising with open arms from old, cramped habits into wide-awake spiritual renewal.',
  },
  {
    id: 'path-32',
    number: 32,
    name: 'The Administrative Intelligence',
    fromSephiraId: 'yesod',
    toSephiraId: 'malkuth',
    hebrewLetter: 'ת',
    hebrewLetterName: 'Tau',
    letterMeaning: 'Cross / Sign (Seal of Completion)',
    tarotKey: 'XXI',
    tarotCardName: 'The World (The Universe)',
    attributionType: 'Planet',
    attribution: 'Saturn / Earth',
    symbolIcon: '♄',
    colors: {
      atziluth: '#393578',
      briah: '#191c20',
      yetzirah: '#2c3a4f',
      assiah: '#1e2026',
    },
    colorDescriptions: {
      atziluth: 'Indigo',
      briah: 'Black',
      yetzirah: 'Blue-Black',
      assiah: 'Black Rayed Blue',
    },
    yetziraticText:
      'The Thirty-second Path is the Administrative Intelligence, and is so called because it directs and associates the motions of the seven planets, directing all of them in their own proper courses.',
    consciousnessAspect: 'Gateway of Incarnation & Great Work Completed · Crocodile · Assafoetida / Storax · Onyx',
    overview:
      'The first path encountered when ascending from Malkuth (Earth) toward Yesod (the Astral), and the final seal when descending. Under Saturn and The World, it governs physical incarnation, time, karma, and cosmic completion.',
    dionFortuneInsight:
      'Dion Fortune calls Path 32 the threshold of the "Dark Night" of first initiation and the Saturnian test of endurance: here the aspirant learns to master physical inertia and pass consciously through the veil separating matter (Malkuth) from the Astral Light (Yesod).',
    regardieInsight:
      'Israel Regardie explains that "The Administrative Intelligence" summarizes all seven planetary currents into Malkuth—symbolized by the Dancer inside the laurel wreath surrounded by the four Kerubic beasts of the elements, uniting Earth and Heaven.',
    pathworkingMeditation:
      'Stand poised within a green oval wreath flanked by the four fixed elemental guardians, feeling deep indigo-black Saturnian stillness anchor heaven solidly into earth.',
  },
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
  'malkuth',
];

// Serpent of Wisdom (Nehushtan) Path Sequence (Ascent through 22 Paths)
export const SERPENT_PATH_SEQUENCE = [
  'path-32', 'path-31', 'path-30', 'path-29', 'path-28', 'path-27',
  'path-26', 'path-25', 'path-24', 'path-23', 'path-22', 'path-21',
  'path-20', 'path-19', 'path-18', 'path-17', 'path-16', 'path-15',
  'path-14', 'path-13', 'path-12', 'path-11',
];
