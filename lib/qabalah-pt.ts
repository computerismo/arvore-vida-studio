import {
  PILLARS_DATA,
  SEPHIROTH_DATA,
  PATHS_DATA,
  PillarInfo,
  Sephira,
  Path,
} from './qabalah-data';
import type { Language } from './i18n';

export const PILLAR_NAMES_PT: Record<'Severity' | 'Mildness' | 'Mercy', string> = {
  Severity: 'Severidade',
  Mildness: 'Equilíbrio',
  Mercy: 'Misericórdia',
};

const PILLARS_PT: Record<
  'Severity' | 'Mildness' | 'Mercy',
  Pick<PillarInfo, 'title' | 'quality' | 'description'>
> = {
  Severity: {
    title: 'Pilar da Severidade (Esquerdo)',
    quality: 'Forma, Restrição, Princípio Feminino Passivo (Binah / Forma / Receptividade)',
    description:
      'O Pilar da Forma e da Disciplina. Representa contração, estrutura, julgamento e discernimento. Equilibra a energia expansiva do Pilar da Misericórdia ao oferecer-lhe limites e continente.',
  },
  Mildness: {
    title: 'Pilar do Equilíbrio (Meio)',
    quality: 'Consciência, Harmonia, Síntese, Linha Direta da Graça Divina',
    description:
      'O Eixo da Consciência e da Ascensão. Conhecido como o Caminho do Meio ou a senda da Shekinah. Harmoniza os extremos da Força (Misericórdia) e da Forma (Severidade) em puro equilíbrio espiritual.',
  },
  Mercy: {
    title: 'Pilar da Misericórdia (Direito)',
    quality: 'Força, Expansão, Princípio Masculino Ativo (Chokmah / Força / Sabedoria)',
    description:
      'O Pilar da Energia Dinâmica e da Expansão. Representa criação irrestrita, amor ilimitado, iluminação e irradiação exterior. Necessita do Pilar da Severidade para evitar dissipação caótica.',
  },
};

type SephiraTranslation = Pick<
  Sephira,
  | 'translation'
  | 'colorDescriptions'
  | 'divineName'
  | 'archangel'
  | 'angelicOrder'
  | 'astrological'
  | 'element'
  | 'chakraOrBodyPart'
  | 'magicalImage'
  | 'spiritualExperience'
  | 'virtue'
  | 'vice'
  | 'symbols'
  | 'preciousStone'
  | 'incenseAndPlants'
  | 'tarotCards'
  | 'overview'
  | 'dionFortuneInsight'
  | 'regardieInsight'
  | 'pathworkingGuidance'
>;

const SEPHIROTH_PT: Record<string, SephiraTranslation> = {
  kether: {
    translation: 'Coroa',
    colorDescriptions: {
      atziluth: 'Luz Branca Pura Brilhante',
      briah: 'Brilho de Luz Branca Pura',
      yetzirah: 'Centelhas de Luz Branca Pura',
      assiah: 'Branco Salpicado de Ouro',
    },
    divineName: 'Eheieh (אהיה - "Eu Sou o Que Sou")',
    archangel: 'Metatron (Príncipe da Presença)',
    angelicOrder: 'Chaioth ha-Qadesh (Santas Criaturas Viventes)',
    astrological: 'Rashith ha-Gilgalim (Primeiros Turbilhões / Primum Mobile)',
    element: 'Espírito Divino Puro / Luz Primordial',
    chakraOrBodyPart: 'Crânio / Acima da Cabeça (Chakra Coronário)',
    magicalImage: 'Um Rei Ancião de Barba Visto de Perfil (Apenas o Lado Direito)',
    spiritualExperience: 'União com Deus / Iluminação Completa',
    virtue: 'Realização / Conclusão da Grande Obra',
    vice: 'Nenhum (Potencial Puro antes da Queda Dualista)',
    symbols: ['Ponto', 'Coroa', 'Suástica / Espiral', 'Anel Não-Ultrapassável'],
    preciousStone: 'Diamante',
    incenseAndPlants: 'Âmbar Cinzento / Lótus',
    tarotCards: 'Os Quatro Ases',
    overview:
      'Kether é a fonte suprema de toda manifestação, a unidade primordial anterior a toda diferenciação e dualidade. É a raiz imanifesta da qual germina a Árvore da Vida.',
    dionFortuneInsight:
      'Em "A Cabala Mística", Dion Fortune descreve Kether como o ponto dentro do círculo, a primeira manifestação vinda do Ain Soph Aur. É o ser puro sem forma, a fonte de toda vida e espírito.',
    regardieInsight:
      'Israel Regardie enfatiza Kether como o centro espiritual supremo na humanidade — a Centelha Divina (Yechidah) acima da consciência individual do ego.',
    pathworkingGuidance:
      'Medite no silêncio absoluto e na luz branca brilhante acima do topo da cabeça. Dissolva todos os conceitos de eu e outro no infinito EU SOU.',
  },
  chokmah: {
    translation: 'Sabedoria',
    colorDescriptions: {
      atziluth: 'Azul Suave Puro',
      briah: 'Cinza',
      yetzirah: 'Cinza-Pérola Iridescente',
      assiah: 'Branco Salpicado de Vermelho, Azul e Amarelo',
    },
    divineName: 'Yah (יה - "O Senhor")',
    archangel: 'Raziel (Arauto da Divindade / Guardião dos Segredos)',
    angelicOrder: 'Auphanim (Rodas / Galáxias)',
    astrological: 'Mazloth (Esfera das Estrelas Fixas / Zodíaco)',
    element: 'Fogo Criativo Dinâmico / Masculino Arquetípico',
    chakraOrBodyPart: 'Lado Esquerdo do Rosto / Hemisfério Direito',
    magicalImage: 'Um Homem Barbado / Figura de Realeza Poderosa',
    spiritualExperience: 'A Visão de Deus Face a Face',
    virtue: 'Devoção / Impulso de Energia Pura',
    vice: 'Fanatismo / Energia Cega Sem Direção',
    symbols: ['O Lingam', 'O Falo', 'A Linha', 'O Manto Interior de Glória'],
    preciousStone: 'Rubi Estrela / Turquesa / Safira',
    incenseAndPlants: 'Almíscar / Haxixe / Olíbano',
    tarotCards: 'Os Quatro Dois',
    overview:
      'Chokmah é o Grande Pai (Abba), a energia cinética dinâmica da criação que irrompe a partir de Kether. É pura sabedoria, impulso vital e força espiritual.',
    dionFortuneInsight:
      'Dion Fortune destaca Chokmah como a força masculina primordial — o Grande Estimulador que fecunda Binah (a Grande Mãe).',
    regardieInsight:
      'Regardie descreve Chokmah como a energia cósmica em movimento antes de ser contida ou estruturada na matéria.',
    pathworkingGuidance:
      'Visualize uma noite cósmica infinita repleta de galáxias espiraladas e potencial elétrico ilimitado, sentindo o fluxo vital da força divina.',
  },
  binah: {
    translation: 'Entendimento',
    colorDescriptions: {
      atziluth: 'Carmesim',
      briah: 'Preto',
      yetzirah: 'Marrom Escuro',
      assiah: 'Cinza Salpicado de Rosa',
    },
    divineName: 'YHVH Elohim (יהוה אלהים - "Senhor Deus")',
    archangel: 'Tzaphkiel (Contemplador de Deus / Vigia)',
    angelicOrder: 'Aralim (Tronos / Os Fortes)',
    astrological: 'Shabbathai (Esfera de Saturno)',
    element: 'Água Arquetípica / Grande Mar (Marah)',
    chakraOrBodyPart: 'Lado Direito do Rosto / Hemisfério Esquerdo',
    magicalImage: 'Uma Mulher Madura / Matrona / A Rainha em Seu Trono',
    spiritualExperience: 'Visão da Dor / Compreensão do Karma',
    virtue: 'Silêncio / Disciplina / Pureza',
    vice: 'Avareza / Melancolia / Rigidez',
    symbols: ['A Yoni', 'O Cálice / Taça', 'O Manto Exterior da Ocultação'],
    preciousStone: 'Pérola / Safira Estrela / Ônix',
    incenseAndPlants: 'Mirra / Cipreste / Beladona',
    tarotCards: 'Os Quatro Três',
    overview:
      'Binah é a Grande Mãe (Ama/Aima), o arquétipo da Forma, da Gestação e da Matriz. Ela recebe a força bruta de Chokmah e lhe confere contorno, tempo e limite.',
    dionFortuneInsight:
      'Fortune observa que Binah é a raiz da forma e do tempo. Ela é tanto a Doadora da Vida quanto a Tecelã do Destino e da Morte através do nascimento físico.',
    regardieInsight:
      'Regardie concentra-se em Binah como o útero cósmico a partir do qual todos os padrões arquetípicos se cristalizam em realidade tangível.',
    pathworkingGuidance:
      'Contemple a quietude profunda do mar escuro e sereno, acolhendo a forma no espaço sagrado e honrando os limites que tornam a existência possível.',
  },
  daath: {
    translation: 'Conhecimento (A Esfera Oculta / Abismo)',
    colorDescriptions: {
      atziluth: 'Lavanda / Violeta Elétrico',
      briah: 'Púrpura Real Profundo',
      yetzirah: 'Vazio Prismático Iridescente',
      assiah: 'Índigo Profundo Salpicado de Ouro',
    },
    divineName: 'YHVH Elohim (Aspecto Oculto) / Choronzon (Guardião do Abismo)',
    archangel: 'Metatron (Aspecto Superior) e Raziel (Aspecto Secreto)',
    angelicOrder: 'Serafins / Mensageiros Cósmicos',
    astrological: 'Sírius / Plutão / O Vazio',
    element: 'Éter / Akasha / Mente Cósmica',
    chakraOrBodyPart: 'Garganta / Pescoço (Chakra Laríngeo)',
    magicalImage: 'Uma Cabeça com Duas Faces Olhando Ambos os Lados / Jano / Presença Invisível',
    spiritualExperience: 'Atravessar o Abismo / Realização da Verdade Divina',
    virtue: 'Desapego / Transcendência da Ilusão',
    vice: 'Orgulho Intelectual / Loucura / Dispersão',
    symbols: ['O Abismo', 'A Ponte', 'O Prisma', 'O Pergaminho do Mistério'],
    preciousStone: 'Alexandrita / Diamante Negro',
    incenseAndPlants: 'Erva-Moura / Absinto',
    tarotCards: 'O Mistério da Carta em Branco',
    overview:
      "Da'ath não é uma Sephirah comum, mas a união mística entre Chokmah (Sabedoria) e Binah (Entendimento), gerando o Conhecimento. Repousa sobre o perigoso Abismo que separa a Tríade Superna da criação inferior.",
    dionFortuneInsight:
      "Dion Fortune descreve Da'ath como o portal entre o reino divino dos arquétipos e a mente psicológica da humanidade.",
    regardieInsight:
      "Regardie aponta que atravessar Da'ath exige renunciar completamente à identidade do ego para renascer em uma consciência espiritual superior.",
    pathworkingGuidance:
      'Permaneça com coragem à beira do Abismo, entregando as certezas intelectuais limitadas para cruzar o vazio rumo à revelação divina.',
  },
  chesed: {
    translation: 'Misericórdia / Amor Bondoso (Gedulah)',
    colorDescriptions: {
      atziluth: 'Azul-Violeta Profundo',
      briah: 'Azul',
      yetzirah: 'Azul-Púrpura Profundo',
      assiah: 'Azul-Celeste Profundo Salpicado de Amarelo',
    },
    divineName: 'El (אל - "O Todo-Poderoso")',
    archangel: 'Tzadkiel (Justiça de Deus)',
    angelicOrder: 'Chasmalim (Os Brilhantes / Seres Luminosos)',
    astrological: 'Tzedek (Esfera de Júpiter)',
    element: 'Água da Vida / Majestade Benevolente',
    chakraOrBodyPart: 'Braço Esquerdo / Ombro',
    magicalImage: 'Um Rei Poderoso e Coroado Sentado em Seu Trono',
    spiritualExperience: 'Visão de Amor e Benevolência',
    virtue: 'Obediência / Generosidade / Compaixão',
    vice: 'Tirania / Hipocrisia / Gula',
    symbols: ['O Tetraedro / Pirâmide', 'O Cetro', 'O Orbe', 'O Cajado'],
    preciousStone: 'Ametista / Lápis-Lazúli / Safira',
    incenseAndPlants: 'Cedro / Canela / Noz-Moscada',
    tarotCards: 'Os Quatro Quatros',
    overview:
      'Chesed é a primeira esfera de governo manifestado, personificando a graça divina, a abundância, a expansão, a ordem e a organização amorosa.',
    dionFortuneInsight:
      'Em "A Cabala Mística", Fortune descreve Chesed como o governante e construtor ideal que estabelece ordem, lei e prosperidade por toda a criação.',
    regardieInsight:
      'Regardie destaca Chesed como o preservador benevolente que organiza a força bruta em harmonia amorosa.',
    pathworkingGuidance:
      'Sinta um calor azul-real expandir-se do seu coração, envolvendo todos os seres vivos em graça e proteção incondicionais.',
  },
  geburah: {
    translation: 'Severidade / Força (Din)',
    colorDescriptions: {
      atziluth: 'Vermelho-Alaranjado',
      briah: 'Vermelho Escarlate',
      yetzirah: 'Escarlate Brilhante',
      assiah: 'Vermelho Salpicado de Preto',
    },
    divineName: 'Elohim Gibor (אלהים גבור - "Deus dos Exércitos / Poderoso")',
    archangel: 'Camael (Aquele que Vê Deus / Arcanjo do Fogo)',
    angelicOrder: 'Serafins (Serpentes de Fogo)',
    astrological: 'Madim (Esfera de Marte)',
    element: 'Força Purificadora Ígnea',
    chakraOrBodyPart: 'Braço Direito / Ombro',
    magicalImage: 'Um Guerreiro Poderoso em Sua Carruagem com Espada',
    spiritualExperience: 'Visão de Poder e Justiça',
    virtue: 'Energia / Coragem / Ação Justa',
    vice: 'Crueldade / Destrutividade / Ira',
    symbols: ['O Pentagrama', 'A Espada', 'A Lança', 'O Flagelo / Chicote'],
    preciousStone: 'Rubi / Granada',
    incenseAndPlants: 'Tabaco / Sangue de Dragão / Pimenta',
    tarotCards: 'Os Quatro Cincos',
    overview:
      'Geburah é a esfera da força, do julgamento, da purificação e da destruição de formas obsoletas. Garante o equilíbrio ao podar o que está decaído.',
    dionFortuneInsight:
      'Fortune observa que Geburah é essencial para a saúde espiritual — é o bisturi do cirurgião que remove o câncer espiritual para que o corpo possa se curar.',
    regardieInsight:
      'Regardie enfatiza Geburah como a energia dinâmica necessária para superar obstáculos, romper a inércia e aplicar a lei divina.',
    pathworkingGuidance:
      'Visualize uma chama escarlate brilhante consumindo ilusões, fraqueza e medo, deixando apenas aço espiritual puro e temperado.',
  },
  tiphareth: {
    translation: 'Beleza / Harmonia',
    colorDescriptions: {
      atziluth: 'Rosa Claro Translúcido',
      briah: 'Ouro Amarelo',
      yetzirah: 'Rosa Salmão Rico',
      assiah: 'Âmbar Dourado',
    },
    divineName: 'YHVH Eloah Ve-Daath (יהוה אלוה ודעת - "Senhor Deus do Conhecimento")',
    archangel: 'Raphael (Médico Divino / Luz Curadora)',
    angelicOrder: 'Malachim (Reis / Anjos Mensageiros)',
    astrological: 'Shemesh (Esfera do Sol)',
    element: 'Luz Solar e Consciência Solar',
    chakraOrBodyPart: 'Coração / Peito (Chakra Cardíaco / Centro de Tiphareth)',
    magicalImage: 'Um Rei Coroado / Uma Criança / Um Deus Sacrificado (Herói Solar)',
    spiritualExperience:
      'Visão da Harmonia / Conhecimento e Conversação com o Sagrado Anjo Guardião',
    virtue: 'Devoção à Grande Obra / Equilíbrio',
    vice: 'Orgulho / Inflação do Ego',
    symbols: ['A Rosa-Cruz', 'O Hexagrama', 'O Cubo', 'O Cálice Dourado'],
    preciousStone: 'Topázio / Diamante Amarelo / Ouro',
    incenseAndPlants: 'Olíbano / Louro / Heliotrópio',
    tarotCards: 'Os Quatro Seis',
    overview:
      'Tiphareth é o sol central da Árvore da Vida, sintetizando todas as esferas ao redor. Representa a consciência crística/osiriana, a beleza, a redenção e a iluminação do coração.',
    dionFortuneInsight:
      'Em "A Cabala Mística", Fortune descreve Tiphareth como o coração da Árvore, onde a consciência humana se transforma em consciência divina.',
    regardieInsight:
      'Regardie destaca Tiphareth como o ponto de encontro onde o Sagrado Anjo Guardião conecta-se com a alma aspirante.',
    pathworkingGuidance:
      'Concentre-se no centro do peito. Veja um sol dourado radiante desabrochando como uma rosa, irradiando luz incondicional, cura e paz a cada célula.',
  },
  netzach: {
    translation: 'Vitória / Perseverança',
    colorDescriptions: {
      atziluth: 'Verde-Âmbar',
      briah: 'Verde Esmeralda',
      yetzirah: 'Verde-Amarelo Brilhante',
      assiah: 'Oliva Salpicado de Ouro',
    },
    divineName: 'YHVH Tzabaoth (יהוה צבאות - "Senhor dos Exércitos")',
    archangel: 'Haniel (Graça de Deus / Arcanjo de Vênus)',
    angelicOrder: 'Elohim (Deuses / Seres Divinos)',
    astrological: 'Nogah (Esfera de Vênus)',
    element: 'Fogo Emocional / Paixão Artística',
    chakraOrBodyPart: 'Lombos / Pelve / Perna Direita',
    magicalImage: 'Uma Bela Mulher Nua',
    spiritualExperience: 'Visão da Beleza Triunfante',
    virtue: 'Altruísmo / Criação Apaixonada',
    vice: 'Impureza / Luxúria / Mania Emocional',
    symbols: ['A Lâmpada', 'O Cinto', 'A Rosa', 'A Esmeralda'],
    preciousStone: 'Esmeralda',
    incenseAndPlants: 'Rosa / Benjoim / Murta',
    tarotCards: 'Os Quatro Setes',
    overview:
      'Netzach é a esfera da emoção, da criatividade artística, do instinto, da dinâmica da natureza, do romance e da vitória pela perseverança.',
    dionFortuneInsight:
      'Fortune explica Netzach como o reino dos espíritos elementais da natureza, dos sentimentos brutos, da mente grupal e da inspiração artística.',
    regardieInsight:
      'Regardie observa que Netzach governa a matriz astral do desejo e da devoção que impulsiona a motivação humana.',
    pathworkingGuidance:
      'Mergulhe em um jardim esmeralda exuberante banhado por luz rosada, sentindo paixão profunda, alegria artística e libertação emocional.',
  },
  hod: {
    translation: 'Esplendor / Glória',
    colorDescriptions: {
      atziluth: 'Violeta-Púrpura',
      briah: 'Laranja',
      yetzirah: 'Marrom-Avermelhado',
      assiah: 'Marrom-Amarelado Salpicado de Branco',
    },
    divineName: 'Elohim Tzabaoth (אלהים צבאות - "Deus dos Exércitos")',
    archangel: 'Michael (Quem é Como Deus / Arcanjo Sol-Mercúrio)',
    angelicOrder: 'Beni Elohim (Filhos dos Deuses)',
    astrological: 'Kokab (Esfera de Mercúrio)',
    element: 'Água Intelectual / Lógica Formativa',
    chakraOrBodyPart: 'Lombos / Pelve / Perna Esquerda',
    magicalImage: 'Um Hermafrodita / Hermes / Figura de Thoth',
    spiritualExperience: 'Visão do Esplendor / Compreensão dos Segredos Herméticos',
    virtue: 'Veracidade / Honestidade Intelectual Rigorosa',
    vice: 'Falsidade / Engano / Intelectualização Excessiva',
    symbols: ['O Caduceu', 'O Avental Mágico', 'Os Nomes de Poder', 'O Pergaminho'],
    preciousStone: 'Opala / Opala de Fogo / Mercúrio',
    incenseAndPlants: 'Estoraque / Lavanda / Manjerona',
    tarotCards: 'Os Quatro Oitos',
    overview:
      'Hod é a esfera do intelecto, da mente concreta, da comunicação, da ciência, da magia ritual, da matemática e da lógica estruturada.',
    dionFortuneInsight:
      'Em "A Cabala Mística", Fortune descreve Hod como o domínio das formas intelectuais, símbolos mágicos e análise racional.',
    regardieInsight:
      'Regardie ressalta Hod como a arquitetura mental onde os pensamentos são organizados em sistemas coerentes e palavras de poder.',
    pathworkingGuidance:
      'Visualize um salão alaranjado cintilante repleto de glifos geométricos sagrados, pergaminhos dourados e clareza intelectual precisa.',
  },
  yesod: {
    translation: 'Fundamento',
    colorDescriptions: {
      atziluth: 'Violeta Profundo',
      briah: 'Púrpura',
      yetzirah: 'Púrpura Muito Escuro',
      assiah: 'Citrino Salpicado de Azul-Celeste',
    },
    divineName: 'Shaddai El Chai (שדי אל חי - "Deus Todo-Poderoso Vivo")',
    archangel: 'Gabriel (Homem Forte de Deus / Arcanjo da Lua)',
    angelicOrder: 'Kerubim (Os Fortes / Guardiões)',
    astrological: 'Levanah (Esfera da Lua)',
    element: 'Éter Astral / Águas Subconscientes',
    chakraOrBodyPart: 'Órgãos Reprodutivos / Chakra Sacral',
    magicalImage: 'Um Belo Homem Forte / Atlas Sustentando a Terra',
    spiritualExperience: 'Visão do Mecanismo do Universo',
    virtue: 'Independência / Pureza de Intenção',
    vice: 'Ociosidade / Ilusão / Autoengano',
    symbols: ['As Sandálias', 'Os Perfumes', 'O Espelho', 'A Lua Crescente'],
    preciousStone: 'Cristal de Quartzo / Pedra da Lua',
    incenseAndPlants: 'Jasmim / Ginseng / Cânfora',
    tarotCards: 'Os Quatro Noves',
    overview:
      'Yesod é o Fundamento Etérico-Astral, o reservatório subconsciente e a camada de matriz onde a energia se cristaliza imediatamente antes de tornar-se matéria física.',
    dionFortuneInsight:
      'Fortune observa que Yesod é a lente através da qual as forças superiores passam para se materializar em Malkuth. Governa sonhos, instintos e memória.',
    regardieInsight:
      'Regardie descreve Yesod como a aura etérica que alimenta a biologia física e armazena os arquétipos do subconsciente.',
    pathworkingGuidance:
      'Permaneça sob uma lua cheia prateada observando correntes púrpuras translúcidas tecerem a matriz etérica da realidade física.',
  },
  malkuth: {
    translation: 'Reino (A Terra)',
    colorDescriptions: {
      atziluth: 'Amarelo / Ouro / Quatro Elementos',
      briah: 'Citrino, Oliva, Castanho-Avermelhado e Preto',
      yetzirah: 'Citrino, Oliva e Castanho-Avermelhado Salpicados de Ouro',
      assiah: 'Preto Raiado de Amarelo',
    },
    divineName: 'Adonai Melekh / Adonai Ha-Aretz (אדני המלך - "Senhor Rei da Terra")',
    archangel: 'Sandalphon (Co-Irmão / Líder do Coro Celeste)',
    angelicOrder: 'Ashim (Almas de Fogo / Espíritos Elementais)',
    astrological: 'Cholem ha-Yesodoth (Esfera dos Quatro Elementos / Terra)',
    element: 'Terra (Matéria Física - Quatro Elementos Combinados)',
    chakraOrBodyPart: 'Pés / Tornozelos (Chakra Básico / Raiz)',
    magicalImage: 'Uma Jovem Mulher Coroada e Entronizada',
    spiritualExperience: 'Visão do Sagrado Anjo Guardião na Matéria',
    virtue: 'Discernimento / Aplicação Prática / Enraizamento',
    vice: 'Inércia / Materialismo / Preguiça',
    symbols: ['O Altar do Duplo Cubo', 'A Cruz de Braços Iguais', 'O Círculo Mágico'],
    preciousStone: 'Cristal de Rocha / Sal / Granito',
    incenseAndPlants: 'Dítamo de Creta / Patchouli',
    tarotCards: 'Os Quatro Dez',
    overview:
      'Malkuth é o universo físico, o receptáculo para todas as 9 Sephiroth anteriores. É o Reino manifestado onde o potencial espiritual encontra a realidade sólida.',
    dionFortuneInsight:
      'Fortune enfatiza que Malkuth não é maligna nem decaída — é o templo sagrado da Shekinah, onde o espírito vivencia a criação sensorial.',
    regardieInsight:
      'Regardie destaca Malkuth como a âncora necessária para a realização espiritual — o ponto de partida e de chegada da Grande Obra.',
    pathworkingGuidance:
      'Sinta seus pés enraizados profundamente na terra fértil, honrando seu corpo físico como um templo vivo e sagrado do espírito divino.',
  },
};

type PathTranslation = Pick<
  Path,
  | 'name'
  | 'letterMeaning'
  | 'tarotCardName'
  | 'attribution'
  | 'overview'
  | 'pathworkingMeditation'
>;

const ATTRIBUTION_TYPE_PT: Record<Path['attributionType'], string> = {
  Element: 'Elemento',
  Planet: 'Planeta',
  Zodiac: 'Zodíaco',
};

const PATHS_PT: Record<string, PathTranslation> = {
  'path-11': {
    name: 'A Inteligência Cintilante',
    letterMeaning: 'Boi (Força Primordial / Sopro)',
    tarotCardName: 'O Louco',
    attribution: 'Ar',
    overview:
      'Conecta a unidade suprema de Kether à sabedoria dinâmica de Chokmah. Representa o sopro cósmico original e o potencial divino puro e incondicionado.',
    pathworkingMeditation:
      'Dê um passo além do penhasco do medo racional rumo ao éter infinito da confiança absoluta, guiado pelo espírito divino.',
  },
  'path-12': {
    name: 'A Inteligência da Transparência',
    letterMeaning: 'Casa (Recipiente / Mente)',
    tarotCardName: 'O Mago',
    attribution: 'Mercúrio',
    overview:
      'Conecta Kether a Binah. Representa a intenção consciente dirigindo as forças elementais para construir a realidade.',
    pathworkingMeditation:
      'Erga sua mão direita ao céu e aponte a esquerda para a terra, tornando-se um canal límpido para a manifestação divina.',
  },
  'path-13': {
    name: 'A Inteligência Unificadora',
    letterMeaning: 'Camelo (Travessia do Deserto / Santuário)',
    tarotCardName: 'A Sacerdotisa',
    attribution: 'Lua',
    overview:
      'O longo caminho que conecta Kether pelo Pilar do Meio através do Abismo diretamente até Tiphareth. Rege a memória, a intuição e o santuário divino.',
    pathworkingMeditation:
      'Sente-se entre os pilares preto e branco diante do véu do templo, escutando o sussurro sereno da memória cósmica.',
  },
  'path-14': {
    name: 'A Inteligência Iluminadora',
    letterMeaning: 'Porta (Portal da Geração)',
    tarotCardName: 'A Imperatriz',
    attribution: 'Vênus',
    overview:
      'Une o Pai (Chokmah) e a Mãe (Binah) no topo da Árvore. É o portal do amor, da abundância e da fertilidade orgânica.',
    pathworkingMeditation:
      'Atravesse o portal dourado do amor rumo a um campo florido, celebrando a fertilidade abundante da criação.',
  },
  'path-15': {
    name: 'A Inteligência Constitutiva',
    letterMeaning: 'Janela (Visão / Respiração)',
    tarotCardName: 'O Imperador',
    attribution: 'Áries',
    overview:
      'Conecta Sabedoria à Consciência do Coração. Estabelece ordem, autoridade, visão e liderança.',
    pathworkingMeditation:
      'Olhe pela janela da autoridade espiritual, governando sua natureza inferior com sabedoria e propósito nobre.',
  },
  'path-16': {
    name: 'A Inteligência Triunfante e Eterna',
    letterMeaning: 'Prego / Gancho (Ligação do Espírito à Alma)',
    tarotCardName: 'O Hierofante',
    attribution: 'Touro',
    overview:
      'Conecta Chokmah a Chesed pelo Pilar da Misericórdia. A voz da iniciação interior e da sabedoria sagrada tradicional.',
    pathworkingMeditation:
      'Receba o sussurro solene do mestre antigo, ligando sua mente humana à revelação divina.',
  },
  'path-17': {
    name: 'A Inteligência Disponente',
    letterMeaning: 'Espada (Discernimento / Separação)',
    tarotCardName: 'Os Enamorados',
    attribution: 'Gêmeos',
    overview:
      'Conecta Binah a Tiphareth. Representa a escolha espiritual, a união dos opostos e o discernimento entre o divino e o temporal.',
    pathworkingMeditation:
      'Una as polaridades masculina e feminina sob a luz do arcanjo Raphael, escolhendo a devoção espiritual acima da divisão dualista.',
  },
  'path-18': {
    name: 'A Inteligência da Casa da Influência',
    letterMeaning: 'Cerca / Recinto (Proteção)',
    tarotCardName: 'O Carro',
    attribution: 'Câncer',
    overview:
      'Conecta Binah a Geburah descendo pelo Pilar da Severidade. A armadura sagrada que conduz a alma divina à vitória sobre os instintos astrais inferiores.',
    pathworkingMeditation:
      'Conduza sua carruagem prateada adiante guiado pelo propósito espiritual, mantendo domínio sereno sobre as duas esfinges.',
  },
  'path-19': {
    name: 'A Inteligência do Segredo das Atividades Espirituais',
    letterMeaning: 'Serpente (Kundalini / Força Vital)',
    tarotCardName: 'A Força / Luxúria',
    attribution: 'Leão',
    overview:
      'Caminho horizontal que liga Chesed (Misericórdia) e Geburah (Severidade). Rege o domínio das paixões por meio da graça espiritual suave.',
    pathworkingMeditation:
      'Repouse suavemente suas mãos sobre o leão da paixão, transmutando o desejo bruto em poder espiritual radiante.',
  },
  'path-20': {
    name: 'A Inteligência da Vontade',
    letterMeaning: 'Mão (A Centelha Primordial / Semente)',
    tarotCardName: 'O Eremita',
    attribution: 'Virgem',
    overview:
      'Conecta Chesed a Tiphareth. O buscador solitário que ergue a lanterna da verdade para iluminar a senda dos iniciados sinceros.',
    pathworkingMeditation:
      'Ergue sua lanterna dourada no cume da montanha, guiando silenciosamente as almas com sabedoria paciente e humilde.',
  },
  'path-21': {
    name: 'A Inteligência da Conciliação',
    letterMeaning: 'Palma da Mão (Forma Receptiva)',
    tarotCardName: 'A Roda da Fortuna',
    attribution: 'Júpiter',
    overview:
      'Conecta Chesed a Netzach pelo Pilar da Misericórdia. Governa os ciclos cósmicos, o karma, a fortuna e a mudança rítmica.',
    pathworkingMeditation:
      'Permaneça no centro imóvel da roda giratória do destino, observando todas as condições mutáveis com sereno desapego.',
  },
  'path-22': {
    name: 'A Inteligência Fiel',
    letterMeaning: 'Aguilhão de Boi (Direção / Equilíbrio)',
    tarotCardName: 'A Justiça / O Ajustamento',
    attribution: 'Libra',
    overview:
      'Conecta Geburah a Tiphareth. A balança do Karma e da verdade, alinhando a ação pessoal à lei universal.',
    pathworkingMeditation:
      'Segure a balança dourada da verdade em perfeito equilíbrio, pesando pensamentos e atos com clareza cristalina.',
  },
  'path-23': {
    name: 'A Inteligência Estável',
    letterMeaning: 'Água (O Grande Oceano Receptivo)',
    tarotCardName: 'O Enforcado',
    attribution: 'Água',
    overview:
      'Conecta Geburah a Hod pelo Pilar da Severidade. Sacrifício voluntário da perspectiva egoica para alcançar a iluminação divina.',
    pathworkingMeditation:
      'Suspenda-se de cabeça para baixo em meditação aquática silenciosa, contemplando a realidade a partir de uma perspectiva totalmente invertida e altruísta.',
  },
  'path-24': {
    name: 'A Inteligência Imaginativa',
    letterMeaning: 'Peixe (Vida na Água / Regeneração)',
    tarotCardName: 'A Morte',
    attribution: 'Escorpião',
    overview:
      'Conecta Tiphareth a Netzach. Transformação, renascimento profundo e liberação das formas mortas para despertar a essência viva.',
    pathworkingMeditation:
      'Desprenda-se de todas as antigas identidades como a serpente que troca a pele seca, erguendo-se ressuscitado rumo ao amanhecer solar.',
  },
  'path-25': {
    name: 'A Inteligência da Provação',
    letterMeaning: 'Esteio / Apoio (A Flecha do Espírito)',
    tarotCardName: 'A Temperança / A Arte',
    attribution: 'Sagitário',
    overview:
      'O caminho vertical do meio que liga Yesod (Astral) diretamente a Tiphareth (Coração Solar). A ponte do arco-íris da alquimia espiritual.',
    pathworkingMeditation:
      'Verta fluidos dourados e prateados entre os cálices em ritmo perfeito, lançando sua flecha de aspiração direto ao coração de Deus.',
  },
  'path-26': {
    name: 'A Inteligência Renovadora',
    letterMeaning: 'Olho (Percepção Direta / Realidade)',
    tarotCardName: 'O Diabo',
    attribution: 'Capricórnio',
    overview:
      'Conecta Tiphareth a Hod. Desmascara as ilusões materiais e confronta o instinto bruto para revelar a verdadeira liberdade espiritual.',
    pathworkingMeditation:
      'Olhe atentamente de olhos abertos para o que o aprisiona, percebendo que as correntes em seu pescoço são frouxas e fáceis de soltar.',
  },
  'path-27': {
    name: 'A Inteligência Excitante',
    letterMeaning: 'Boca (Palavra / Expressão Dinâmica)',
    tarotCardName: 'A Torre',
    attribution: 'Marte',
    overview:
      'Caminho horizontal que une Emoção (Netzach) e Intelecto (Hod). O relâmpago que despedaça falsas construções mentais.',
    pathworkingMeditation:
      'Observe o raio da verdade absoluta destruir suas falsas torres de orgulho, libertando a luz pura dos tijolos rígidos.',
  },
  'path-28': {
    name: 'A Inteligência Natural',
    letterMeaning: 'Anzol (Pescar a Graça Divina)',
    tarotCardName: 'A Estrela',
    attribution: 'Aquário',
    overview:
      'Conecta Netzach a Yesod. O derramamento das águas vivas da estrela cósmica, inspirando fé, renovação e esperança.',
    pathworkingMeditation:
      'Ajoelhe-se junto ao riacho cristalino sob sete estrelas brilhantes, vertendo águas vivas sobre a terra e o mar em doce entrega.',
  },
  'path-29': {
    name: 'A Inteligência Corpórea',
    letterMeaning: 'Nuca (Instinto Subconsciente)',
    tarotCardName: 'A Lua',
    attribution: 'Peixes',
    overview:
      'Conecta Netzach a Malkuth pelo lado direito. A travessia pelos reinos sombrios e sonhos instintivos rumo à manifestação física.',
    pathworkingMeditation:
      'Caminhe com atenção entre as torres gêmeas enquanto o crustáceo emerge das águas escuras, confiando na luz interior ao longo da senda sinuosa.',
  },
  'path-30': {
    name: 'A Inteligência Coletora',
    letterMeaning: 'Cabeça (Razão / Iluminação)',
    tarotCardName: 'O Sol',
    attribution: 'Sol',
    overview:
      'Conecta Hod a Yesod. Calor solar, alegria inocente e compreensão racional clara iluminando as profundezas subconscientes.',
    pathworkingMeditation:
      'Cavalgue o cavalo branco sob o disco solar sorridente, celebrando a alegria inocente e a iluminação límpida.',
  },
  'path-31': {
    name: 'A Inteligência Perpétua',
    letterMeaning: 'Dente / Espírito (Fogo Sagrado / Transformação)',
    tarotCardName: 'O Julgamento / O Aeon',
    attribution: 'Fogo / Espírito',
    overview:
      'Conecta Hod a Malkuth pelo lado esquerdo. A trombeta da ressurreição despertando as almas para uma consciência espiritual superior.',
    pathworkingMeditation:
      'Ouça o toque da trombeta divina ecoar pelo vale do tempo, saindo dos antigos sarcófagos para o fogo eterno.',
  },
  'path-32': {
    name: 'A Inteligência Administrativa',
    letterMeaning: 'Cruz / Sinal (Conclusão / Portal do Reino)',
    tarotCardName: 'O Mundo / O Universo',
    attribution: 'Saturno / Terra',
    overview:
      'O caminho vertical final que conecta o Fundamento Astral (Yesod) ao Reino Físico (Malkuth). Governa a encarnação e a conclusão da obra.',
    pathworkingMeditation:
      'Dance dentro da coroa de louros verde rodeado pelas quatro santas criaturas, celebrando a realização do espírito divino na matéria.',
  },
};

export function getLocalizedPillarName(
  pillar: 'Severity' | 'Mildness' | 'Mercy',
  lang: Language
): string {
  return lang === 'pt' ? PILLAR_NAMES_PT[pillar] : pillar;
}

export function getLocalizedPillarsData(lang: Language): Record<string, PillarInfo> {
  if (lang === 'en') return PILLARS_DATA;
  return {
    Severity: { ...PILLARS_DATA.Severity, ...PILLARS_PT.Severity },
    Mildness: { ...PILLARS_DATA.Mildness, ...PILLARS_PT.Mildness },
    Mercy: { ...PILLARS_DATA.Mercy, ...PILLARS_PT.Mercy },
  };
}

export function getLocalizedSephirothData(lang: Language): Sephira[] {
  if (lang === 'en') return SEPHIROTH_DATA;
  return SEPHIROTH_DATA.map((sephira) => ({
    ...sephira,
    ...(SEPHIROTH_PT[sephira.id] || {}),
  }));
}

export function getLocalizedPathsData(lang: Language): Path[] {
  if (lang === 'en') return PATHS_DATA;
  return PATHS_DATA.map((pathItem) => ({
    ...pathItem,
    ...(PATHS_PT[pathItem.id] || {}),
  }));
}

export function getLocalizedAttributionType(
  attributionType: Path['attributionType'],
  lang: Language
): string {
  return lang === 'pt' ? ATTRIBUTION_TYPE_PT[attributionType] : attributionType;
}
