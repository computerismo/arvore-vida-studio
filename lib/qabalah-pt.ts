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
    quality: 'Forma, Restrição, Princípio Feminino Passivo (Binah / Forma / Disciplina)',
    description:
      'O Pilar da Forma e da Disciplina. Representa contração, estrutura, julgamento e discernimento. Dion Fortune enfatiza que, sem os limites protetores de Boaz, a força expansiva se dissiparia em caos sem forma.',
  },
  Mildness: {
    title: 'Pilar do Equilíbrio (Meio)',
    quality: 'Consciência, Harmonia, Síntese, Caminho da Flecha (Samekh–Gimel)',
    description:
      'O Eixo da Consciência e da Ascensão. Conhecido como o Pilar do Meio ou o Caminho do Equilíbrio. Israel Regardie formalizou seus centros energéticos no exercício do Pilar do Meio para fazer circular a Luz Divina pelo microcosmo.',
  },
  Mercy: {
    title: 'Pilar da Misericórdia (Direito)',
    quality: 'Força, Expansão, Princípio Masculino Ativo (Chokmah / Força / Vitalidade)',
    description:
      'O Pilar da Energia Dinâmica e da Expansão. Representa fluxo criativo, abundância, devoção e força viva. Requer o contrapeso do Pilar da Severidade para alcançar manifestação coerente.',
  },
};

type SephiraTranslation = Pick<
  Sephira,
  | 'translation'
  | 'colorDescriptions'
  | 'divineName'
  | 'archangel'
  | 'angelicOrder'
  | 'planet'
  | 'astrological'
  | 'yetziraticTitle'
  | 'soulPart'
  | 'qliphoth'
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
      atziluth: 'Brilho Radiante',
      briah: 'Brilho de Luz Branca',
      yetzirah: 'Brilho de Luz Branca',
      assiah: 'Branco Salpicado de Ouro',
    },
    divineName: 'Eheieh (אהיה — "Eu Sou / Serei")',
    archangel: 'Metatron (Príncipe da Presença)',
    angelicOrder: 'Chaioth ha-Qadesh (Santas Criaturas Viventes)',
    planet: 'Primum Mobile · Além dos Planetas',
    astrological: 'Rashith ha-Gilgalim (Primeiros Turbilhões / Primum Mobile)',
    yetziraticTitle: 'A Inteligência Admirável ou Oculta',
    soulPart: 'Yechidah (A Centelha Divina Indivisível / Eu Monádico)',
    qliphoth: 'Thaumiel (Duas Forças Contendoras — Dualismo Tentando Dividir o Uno)',
    element: 'Raiz do Ar / Quintessência / Espírito Imanifeso Puro',
    chakraOrBodyPart: 'Sahasrara / Crânio · Logo Acima do Alto da Cabeça',
    magicalImage: 'Um Rei Ancião de Barba Visto de Perfil (Apenas o Lado Direito)',
    spiritualExperience: 'União com Deus',
    virtue: 'Realização / Conclusão da Grande Obra',
    vice: 'Nenhum (Unidade Pura antes da dualidade)',
    symbols: [
      'O Ponto',
      'A Coroa',
      'A Suástica (Cruz Giratória)',
      'O Ponto Dentro do Círculo',
    ],
    preciousStone: 'Diamante',
    incenseAndPlants: 'Âmbar Cinzento / Amendoeira em Flor',
    tarotCards: 'Os Quatro Ases (Raiz dos Poderes dos Elementos)',
    overview:
      'Kether é a Coroa no topo da Árvore, o primeiro ponto de manifestação que se condensa da Luz Ilimitada (Ain Soph Aur). Na Cabala Hermética representa o ser puro — anterior à polaridade, à forma ou ao pensamento individualizado — do qual todas as emanações subsequentes derivam sua existência.',
    dionFortuneInsight:
      'Em "A Cabala Mística", Dion Fortune explica que Kether está para o universo manifestado assim como o ponto sem dimensão está para a geometria. Ela destaca que o perfil direito do Rei Ancião significa que parte de Kether permanece eternamente voltada para o Ain Soph imanifesto, além da compreensão humana.',
    regardieInsight:
      'Em "O Jardim das Romãs" e "O Pilar do Meio", Israel Regardie identifica Kether com Yechidah, o centro espiritual supremo pairando logo acima do crânio físico. É a fonte do Brilho Branco invocado no início do exercício do Pilar do Meio, unindo a consciência pessoal ao Eu transcendente.',
    pathworkingGuidance:
      'Medite no silêncio absoluto e em um ponto infinitamente pequeno de luz branca ofuscante acima do topo da cabeça. Deixe toda fronteira entre observador e observado dissolver-se no puro e silencioso EU SOU.',
  },
  chokmah: {
    translation: 'Sabedoria',
    colorDescriptions: {
      atziluth: 'Azul Suave Puro',
      briah: 'Cinza',
      yetzirah: 'Cinza-Pérola Iridescente',
      assiah: 'Branco Salpicado de Vermelho, Azul e Amarelo',
    },
    divineName: 'Yah (יה — "O Senhor")',
    archangel: 'Raziel (Arauto da Divindade / Guardião dos Segredos)',
    angelicOrder: 'Auphanim (Rodas / Vórtices Cósmicos Giratórios)',
    planet: 'Esfera do Zodíaco · Estrelas Fixas (Moderno: Urano / Netuno)',
    astrological: 'Mazloth (Esfera do Zodíaco / Estrelas Fixas)',
    yetziraticTitle: 'A Inteligência Iluminadora',
    soulPart: 'Chiah (A Verdadeira Vontade Criadora / Força Vital)',
    qliphoth: 'Ghagiel (Os Impedidores — Fluxo Cego e Caótico)',
    element: 'Raiz do Fogo / Força Dinâmica Arquetípica (Abba)',
    chakraOrBodyPart: 'Lado Esquerdo do Rosto / Hemisfério Cerebral Direito',
    magicalImage: 'Uma Figura Masculina Barbuda (Abba, o Pai Superno)',
    spiritualExperience: 'A Visão de Deus Face a Face',
    virtue: 'Devoção',
    vice: 'Nenhum Tradicional (Distorção Inferior: Impulso Cego Sem Limites)',
    symbols: [
      'O Lingam / Falo',
      'A Linha',
      'O Manto Interior de Glória',
      'A Pedra Erguida',
      'A Linha Reta',
    ],
    preciousStone: 'Rubi Estrela / Turquesa',
    incenseAndPlants: 'Almíscar / Amaranto',
    tarotCards: 'Os Quatro Dois e os Quatro Cavaleiros/Reis (Yod)',
    overview:
      'Chokmah é Abba, o Pai Superno e o primeiro impulso positivo exterior da Força cósmica após a quietude de Kether. Personifica a Sabedoria cinética pura — potência criativa irrestrita em busca de uma matriz receptiva em Binah.',
    dionFortuneInsight:
      'Dion Fortune caracteriza Chokmah como o Grande Estimulador do universo: energia dinâmica pura antes da forma. Ela esclarece que Sabedoria na Cabala não é conhecimento intelectual, mas o poder vivo e fecundante do Espírito que irrompe da Coroa antes de ser organizado em estruturas.',
    regardieInsight:
      'Israel Regardie descreve Chokmah em "O Jardim das Romãs" como o radiante "Manto Interior de Glória" e o Mazloth — a esfera estelar giratória do Zodíaco. Psicologicamente, corresponde a Chiah, a Vontade criativa transcendente que não conhece hesitação ou divisão.',
    pathworkingGuidance:
      'Visualize uma imensidão noturna azul-índigo viva com nebulosas cinza-pérola em espiral, sentindo uma fonte inesgotável de vitalidade espiritual pura jorrar adiante sem restrições.',
  },
  binah: {
    translation: 'Entendimento',
    colorDescriptions: {
      atziluth: 'Carmesim',
      briah: 'Preto',
      yetzirah: 'Marrom Escuro',
      assiah: 'Cinza Salpicado de Rosa',
    },
    divineName: 'YHVH Elohim (יהוה אלהים — "Senhor Deus")',
    archangel: 'Tzaphkiel (Contemplador de Deus)',
    angelicOrder: 'Aralim (Tronos / Os Fortes)',
    planet: 'Saturno ♄ (Shabbathai)',
    astrological: 'Shabbathai (Esfera de Saturno)',
    yetziraticTitle: 'A Inteligência Santificadora',
    soulPart: 'Neshamah (A Alma Divina Intuitiva / Aspiração Espiritual)',
    qliphoth: 'Satariel (Os Ocultadores — Escuridão Cega e Rigidez Obscura)',
    element: 'Raiz da Água / O Grande Mar (Marah)',
    chakraOrBodyPart: 'Lado Direito do Rosto / Hemisfério Cerebral Esquerdo',
    magicalImage:
      'Uma Mulher Madura / Uma Matrona (Ama, a Mãe Escura Estéril, e Aima, a Mãe Clara Fértil)',
    spiritualExperience: 'Visão da Dor',
    virtue: 'Silêncio',
    vice: 'Avareza / Inércia / Rigidez',
    symbols: [
      'A Yoni',
      'O Manto Exterior da Ocultação',
      'A Taça / Cálice',
      'A Vesica Piscis',
    ],
    preciousStone: 'Pérola / Safira Estrela',
    incenseAndPlants: 'Mirra / Cipreste / Papoula do Ópio',
    tarotCards: 'Os Quatro Três e as Quatro Rainhas (Heh)',
    overview:
      'Binah é a Mãe Superna (Ama e Aima), o arquétipo primordial da Forma, do Tempo e da Limitação. Ela recebe a força radiante de Chokmah e a envolve no útero do Entendimento para que os mundos manifestados possam nascer.',
    dionFortuneInsight:
      'Em "A Cabala Mística", Dion Fortune explica por que Binah se associa a Saturno e à Visão da Dor: dar forma ao Espírito é submetê-lo à limitação, ao declínio e à morte. Contudo, essa disciplina saturnina é profundamente compassiva — sem o ventre escuro de Binah, a força infinita jamais se tornaria vida consciente.',
    regardieInsight:
      'Israel Regardie equipara Binah ao Grande Mar (Marah) e à faculdade de Neshamah, a alma intuitiva superior que percebe a lei cósmica. Longe de ser negativa, a negritude de Binah em Briah representa a noite fértil da gestação que absorve toda a luz para dar à luz a criação.',
    pathworkingGuidance:
      'Repouse no vasto e silencioso mar de obsidiana sob profundezas aveludadas sem estrelas. Honre o vaso sagrado da forma e do tempo que converte o espírito ofuscante em beleza viva e estruturada.',
  },
  daath: {
    translation: 'Conhecimento (A Sephirah Oculta)',
    colorDescriptions: {
      atziluth: 'Lavanda',
      briah: 'Cinza-Prateado',
      yetzirah: 'Violeta Puro',
      assiah: 'Índigo Profundo Salpicado de Ouro',
    },
    divineName: 'YHVH Elohim (Síntese Oculta de Chokmah e Binah)',
    archangel: 'Nenhum Tradicional (Limiar da Síntese Superna)',
    angelicOrder: 'Nenhum Tradicional (Ponte Através do Abismo)',
    planet: 'Sem Esfera Planetária Tradicional (Limiar do Abismo)',
    astrological: 'O Abismo (Conjunção de Chokmah e Binah · Notas modernas: Urano/Plutão)',
    yetziraticTitle: 'A Esfera Não Numerada — Síntese de Sabedoria e Entendimento',
    soulPart: 'Limiar que Liga o Ruach (Mente) a Neshamah (Intuição Superna)',
    qliphoth: 'O Abismo / Dispersão do Intelecto Egoico',
    element: 'Akasha / Éter Sutil da Consciência',
    chakraOrBodyPart: 'Garganta / Nuca (Centro Laríngeo do Pilar do Meio)',
    magicalImage: 'Uma Cabeça de Duas Faces / Uma Presença Invisível Sobre o Golfo',
    spiritualExperience: 'Realização da Lei Cósmica Através do Abismo',
    virtue: 'Desapego / Devoção à Verdade',
    vice: 'Orgulho Intelectual / Dispersão / Delírio Espiritual',
    symbols: ['O Abismo', 'O Prisma', 'A Ponte Invisível', 'A Palavra Sagrada'],
    preciousStone: 'Alexandrita / Quartzo Transparente',
    incenseAndPlants: 'Olíbano / Cedro (Incensos Purificadores)',
    tarotCards: 'Sem Cartas de Naipe Próprias (Refletida no Caminho de Gimel)',
    overview:
      "Da'ath não é uma das dez Sephiroth numeradas, mas o filho invisível de Chokmah (Sabedoria) e Binah (Entendimento). Situada sobre o Abismo no Pilar do Meio, marca o limiar perigoso entre a Tríade Superna e as sete esferas inferiores da manifestação.",
    dionFortuneInsight:
      'Dion Fortune escreve em "A Cabala Mística" que Da\'ath representa o Conhecimento como realização direta — entendimento unido à sabedoria — e marca a fronteira evolutiva da consciência humana. Tentar apreender verdades supernas por meio de um intelecto não purificado gera loucura ou orgulho espiritual enquanto o ego não for rendido.',
    regardieInsight:
      'Em "O Jardim das Romãs" e "O Pilar do Meio", Israel Regardie trata Da\'ath como o centro oculto da garganta que liga a reflexão mental (Ruach) à intuição divina (Neshamah). Durante o ritual do Pilar do Meio, vibrar YHVH Elohim na nuca ativa essa ponte de síntese consciente.',
    pathworkingGuidance:
      'Respire luz violeta na garganta e na nuca, sustentando o silêncio à beira do Abismo. Solte a necessidade de possuir a verdade com o ego racional, tornando-se um prisma vazio para uma consciência mais alta.',
  },
  chesed: {
    translation: 'Misericórdia / Amor Bondoso (Gedulah)',
    colorDescriptions: {
      atziluth: 'Violeta Profundo',
      briah: 'Azul',
      yetzirah: 'Púrpura Profundo',
      assiah: 'Azul-Celeste Profundo Salpicado de Amarelo',
    },
    divineName: 'El (אל — "O Deus Poderoso")',
    archangel: 'Tzadkiel (Justiça de Deus)',
    angelicOrder: 'Chasmalim (Os Brilhantes)',
    planet: 'Júpiter ♃ (Tzedek)',
    astrological: 'Tzedek (Esfera de Júpiter)',
    yetziraticTitle: 'A Inteligência Coesiva ou Receptacular',
    soulPart: 'Ruach (Aspecto Expansivo Superior / Razão Abstrata)',
    qliphoth: "Gha'agsheblah (Os Espancadores — Excesso Desperdiçador e Tirania)",
    element: 'Água da Expansão Benevolente (Abaixo do Abismo)',
    chakraOrBodyPart: 'Braço e Ombro Esquerdos',
    magicalImage: 'Um Rei Poderoso Coroado e Entronizado',
    spiritualExperience: 'Visão do Amor',
    virtue: 'Obediência',
    vice: 'Fanatismo, Hipocrisia, Gula, Tirania',
    symbols: ['A Figura Sólida (Tetraedro / Cubo)', 'O Orbe', 'O Bastão', 'O Cetro', 'O Cajado'],
    preciousStone: 'Ametista / Safira',
    incenseAndPlants: 'Cedro',
    tarotCards: 'Os Quatro Quatros',
    overview:
      'Chesed (também chamada Gedulah, Grandeza) é a primeira esfera abaixo do Abismo, regendo a ordem jupiteriana, o governo benevolente, a lei construtiva e a misericórdia expansiva. Aqui os arquétipos supernos abstratos se cristalizam em ideais coerentes para a vida manifestada.',
    dionFortuneInsight:
      'Dion Fortune denomina Chesed o "governante e legislador ideal" — o rei-pai benevolente que constrói a civilização, protege os vulneráveis e organiza a energia harmoniosamente. Como sua generosidade jupiteriana pode decair em complacência, hipocrisia ou tirania paternalista, Chesed requer o fogo corretivo de Geburah no lado oposto da Árvore.',
    regardieInsight:
      'Israel Regardie observa que o título yetzirático de Chesed, "A Inteligência Coesiva ou Receptacular", revela sua verdadeira função: ela recolhe os raios espirituais descendentes dos Supernos e os ordena em padrões estáveis e vivificantes de abundância e razão superior.',
    pathworkingGuidance:
      'Visualize uma serena sala do trono de safira inundada por cálida luz azul-real. Sinta a majestade serena do governo justo, estendendo boa vontade generosa e ordem firme a todas as partes de sua psique.',
  },
  geburah: {
    translation: 'Severidade / Força (Din / Pachad)',
    colorDescriptions: {
      atziluth: 'Laranja',
      briah: 'Vermelho Escarlate',
      yetzirah: 'Escarlate Brilhante',
      assiah: 'Vermelho Salpicado de Preto',
    },
    divineName: 'Elohim Gibor (אלהים גבור — "Deus dos Exércitos / Deus Poderoso")',
    archangel: 'Khamael (Camael — Queimador / Aquele que Vê Deus)',
    angelicOrder: 'Serafins (As Serpentes de Fogo)',
    planet: 'Marte ♂ (Madim)',
    astrological: 'Madim (Esfera de Marte)',
    yetziraticTitle: 'A Inteligência Radical',
    soulPart: 'Ruach (Discernimento Dinâmico e Força Volitiva)',
    qliphoth: 'Golachab (Os Incendiários — Ira Cega e Destruição Cruel)',
    element: 'Fogo Purificador (Equilíbrio Marcial)',
    chakraOrBodyPart: 'Braço e Ombro Direitos',
    magicalImage: 'Um Guerreiro Poderoso em Sua Carruagem, Armado e Coroado',
    spiritualExperience: 'Visão do Poder',
    virtue: 'Energia, Coragem',
    vice: 'Crueldade, Destruição',
    symbols: [
      'O Pentágono (Estrela de Cinco Pontas)',
      'A Rosa Tudor de Cinco Pétalas',
      'A Espada',
      'A Lança',
      'O Flagelo',
      'A Corrente',
    ],
    preciousStone: 'Rubi',
    incenseAndPlants: 'Tabaco',
    tarotCards: 'Os Quatro Cincos',
    overview:
      'Geburah (Força ou Severidade) é a esfera marcial da justiça dinâmica, do discernimento e da coragem espiritual. Contrapesa a expansão ilimitada de Chesed ao podar o que está obsoleto, estagnado ou fora de harmonia com a lei cósmica.',
    dionFortuneInsight:
      'Em "A Cabala Mística", Dion Fortune defende Geburah contra temores superficiais: não se trata de malícia, mas de metabolismo cósmico e cirurgia espiritual. Como o bisturi do cirurgião que remove o tecido doente para que o organismo viva, Geburah aplica os fogos de Marte para preservar a vitalidade e a verdade.',
    regardieInsight:
      'Israel Regardie enfatiza que, sem a Inteligência Radical de Geburah, a misericórdia de Chesed degenera em estagnação sentimental. Geburah fornece a força de vontade feroz, a disciplina e a coragem moral necessárias para romper a inércia interior e defender a Grande Obra.',
    pathworkingGuidance:
      'Permaneça ereto dentro de um pilar de chama escarlate viva. Sinta o medo, a letargia e o comodismo queimarem com limpeza, deixando coragem marcial temperada e clareza decisiva a serviço da justiça.',
  },
  tiphareth: {
    translation: 'Beleza / Harmonia',
    colorDescriptions: {
      atziluth: 'Rosa Claro Translúcido',
      briah: 'Amarelo (Ouro)',
      yetzirah: 'Salmão Rico',
      assiah: 'Âmbar Dourado',
    },
    divineName: 'YHVH Eloah Ve-Daath (יהוה אלוה ודעת — "Senhor Deus do Conhecimento")',
    archangel: 'Raphael (Solar na Aurora Dourada) / Michael (Solar Tradicional)',
    angelicOrder: 'Malachim (Reis / Mensageiros Reais)',
    planet: 'Sol ☉ (Shemesh)',
    astrological: 'Shemesh (Esfera do Sol)',
    yetziraticTitle: 'A Inteligência Mediadora',
    soulPart: 'Ruach (Centro Verdadeiro do Ego Integrado e do Eu Superior)',
    qliphoth: 'Thagiriron (Os Disputadores — Orgulho Espiritual e Falsa Iluminação)',
    element: 'Luz Solar / Centro de Equilíbrio',
    chakraOrBodyPart: 'Coração / Peito (Centro Cardíaco–Solar do Pilar do Meio)',
    magicalImage: 'Um Rei Majestoso / Uma Criança / Um Deus Sacrificado',
    spiritualExperience: 'Visão da Harmonia das Coisas / Mistérios da Crucificação',
    virtue: 'Devoção à Grande Obra',
    vice: 'Orgulho',
    symbols: [
      'O Lamen',
      'A Rosa-Cruz',
      'A Cruz do Calvário',
      'A Pirâmide Truncada',
      'O Cubo',
    ],
    preciousStone: 'Topázio / Diamante Amarelo',
    incenseAndPlants: 'Olíbano (Incenso)',
    tarotCards: 'Os Quatro Seis e os Quatro Príncipes/Imperadores (Vau)',
    overview:
      'Tiphareth é o Coração Solar radiante da Árvore da Vida, conectado por caminhos a todas as Sephiroth, exceto Malkuth. É o grande ponto de mediação entre o Macrocosmo e o Microcosmo — a sede da harmonia, da cura, do sacrifício e do renascimento espiritual.',
    dionFortuneInsight:
      'Dion Fortune dedica o cerne de "A Cabala Mística" a Tiphareth como a esfera dos Deuses Redentores (Osíris, Cristo, Adônis, Apolo). Aqui a personalidade inferior morre para a sua separatividade a fim de que a Individualidade Superior brilhe, reconciliando a severidade de Geburah e a misericórdia de Chesed em Beleza viva.',
    regardieInsight:
      'Israel Regardie identifica Tiphareth como o centro luminoso do ritual do Pilar do Meio e a meta do grau Adeptus Minor na Aurora Dourada: o Conhecimento e Conversação com o Sagrado Anjo Guardião. Harmoniza intelecto (Hod) e emoção (Netzach) sob a luz dourada do Sol.',
    pathworkingGuidance:
      'Centralize sua consciência no peito enquanto um sol amarelo-dourado desabrocha no interior de uma rosa-cruz. Respire calor radiante para fora, unindo pensamentos e sentimentos fragmentados em serena devoção à Grande Obra.',
  },
  netzach: {
    translation: 'Vitória',
    colorDescriptions: {
      atziluth: 'Âmbar',
      briah: 'Esmeralda',
      yetzirah: 'Verde-Amarelo Brilhante',
      assiah: 'Oliva Salpicado de Ouro',
    },
    divineName: 'YHVH Tzabaoth (יהוה צבאות — "Senhor dos Exércitos")',
    archangel: 'Haniel (Graça de Deus)',
    angelicOrder: 'Elohim (Deuses / Poderes Criativos da Natureza)',
    planet: 'Vênus ♀ (Nogah)',
    astrological: 'Nogah (Esfera de Vênus)',
    yetziraticTitle: 'A Inteligência Oculta ou Escondida',
    soulPart: 'Ruach (Polaridade Emocional, Instintiva e Artística)',
    qliphoth: "A'arab Zaraq (Os Corvos da Dispersão — Paixão Cega e Desejo Fragmentado)",
    element: 'Fogo (Força Emocional e Instintiva)',
    chakraOrBodyPart: 'Lombos / Quadris / Perna Direita',
    magicalImage: 'Uma Bela Mulher Nua',
    spiritualExperience: 'Visão da Beleza Triunfante',
    virtue: 'Altruísmo',
    vice: 'Impureza, Luxúria',
    symbols: ['A Lâmpada e o Cinto', 'A Rosa', 'A Esmeralda', 'A Taça de Cobre'],
    preciousStone: 'Esmeralda',
    incenseAndPlants: 'Rosa / Benjoim / Sândalo Vermelho',
    tarotCards: 'Os Quatro Setes',
    overview:
      'Netzach é a esfera venusiana da Vitória, da emoção, da inspiração artística, da polaridade e das forças dinâmicas da natureza viva. Situada na base do Pilar da Misericórdia, alimenta a devoção, a paixão e a imaginação criadora.',
    dionFortuneInsight:
      'Dion Fortune destaca que Netzach governa o reino da mente grupal, dos espíritos elementais da natureza, da música e do tom afetivo bruto. Enquanto Hod fala em conceitos e fórmulas, Netzach move-se em imagens, ritmos e amor; sua verdadeira virtude é o Altruísmo, elevando o desejo à devoção impessoal à Beleza.',
    regardieInsight:
      'Israel Regardie explica o título yetzirático de Netzach — "A Inteligência Oculta" — como alusão às correntes instintivas escondidas que animam a magia, o magnetismo ritual e o gênio artístico. Equilibrado por Hod, o sentir venusiano torna-se poder criativo radiante e disciplinado, e não impulso caótico.',
    pathworkingGuidance:
      'Caminhe descalço por um bosque esmeralda verdejante iluminado por cálida luz âmbar. Sinta reverência pela beleza viva da natureza, deixando o anseio pessoal expandir-se em amor altruísta e alegre.',
  },
  hod: {
    translation: 'Esplendor / Glória',
    colorDescriptions: {
      atziluth: 'Violeta Púrpura',
      briah: 'Laranja',
      yetzirah: 'Castanho-Avermelhado',
      assiah: 'Marrom-Amarelado Salpicado de Branco',
    },
    divineName: 'Elohim Tzabaoth (אלהים צבאות — "Deus dos Exércitos")',
    archangel: 'Michael (Regente Briático na Aurora Dourada) / Raphael (Planetário Tradicional)',
    angelicOrder: 'Beni Elohim (Filhos dos Deuses)',
    planet: 'Mercúrio ☿ (Kokab)',
    astrological: 'Kokab (Esfera de Mercúrio)',
    yetziraticTitle: 'A Inteligência Absoluta ou Perfeita',
    soulPart: 'Ruach (Intelecto Concreto, Linguagem e Forma Simbólica)',
    qliphoth: 'Samael (Os Enganadores — Sofisma, Mentira e Intelectualismo Estéril)',
    element: 'Água (Fluidez Mercurial da Mente)',
    chakraOrBodyPart: 'Lombos / Quadris / Perna Esquerda',
    magicalImage: 'Um Hermafrodita (Hermes–Thoth)',
    spiritualExperience: 'Visão do Esplendor',
    virtue: 'Veracidade',
    vice: 'Falsidade, Desonestidade',
    symbols: ['Os Nomes e Versículos', 'O Avental', 'O Caduceu', 'O Pergaminho'],
    preciousStone: 'Opala (especialmente Opala de Fogo)',
    incenseAndPlants: 'Estoraque',
    tarotCards: 'Os Quatro Oitos',
    overview:
      'Hod é a esfera mercuriana do Esplendor, do intelecto, da linguagem, da ciência, da magia ritual e da forma mental precisa. Posicionada ao pé do Pilar da Severidade, fornece recipientes simbólicos exatos às correntes vivas que sobem de Netzach.',
    dionFortuneInsight:
      'Em "A Cabala Mística", Dion Fortune identifica Hod como a esfera da Magia Cerimonial, de Hermes-Thoth e da mente concreta. Como símbolos e palavras de poder são forjados aqui, sua virtude obrigatória é a Veracidade absoluta — pois formulações falsas distorcem os moldes astrais de Yesod.',
    regardieInsight:
      'Israel Regardie observa que Hod é onde a intuição espiritual é traduzida em sistemas filosóficos, matemáticos e rituais exatos. Ainda assim, adverte que Hod sem o calor de Netzach torna-se pedantismo estéril; o estudo hermético genuíno desposa o rigor mercuriano com a devoção venusiana.',
    pathworkingGuidance:
      'Entre em um templo laranja incandescente repleto de glifos geométricos e pergaminhos luminosos. Observe seus pensamentos com honestidade afiada, alinhando fala, símbolo e intelecto à verdade simples.',
  },
  yesod: {
    translation: 'Fundamento',
    colorDescriptions: {
      atziluth: 'Índigo',
      briah: 'Violeta',
      yetzirah: 'Púrpura Muito Escuro',
      assiah: 'Citrino Salpicado de Azul-Celeste',
    },
    divineName: 'Shaddai El Chai (שדי אל חי — "Deus Todo-Poderoso Vivo")',
    archangel: 'Gabriel (Homem Forte de Deus)',
    angelicOrder: 'Kerubim (Os Fortes)',
    planet: 'Lua ☽ (Levanah)',
    astrological: 'Levanah (Esfera da Lua)',
    yetziraticTitle: 'A Inteligência Pura',
    soulPart: 'Nephesh (A Alma Vital, Instintiva e Astral)',
    qliphoth: 'Gamaliel (Os Obscenos — Fascínio Astral e Obsessão Inconsciente)',
    element: 'Ar (Matriz Etérica e Astral Sutil)',
    chakraOrBodyPart: 'Órgãos Reprodutivos / Centro Pélvico (Pilar do Meio)',
    magicalImage: 'Um Belo Homem Nu, Muito Forte',
    spiritualExperience: 'Visão do Mecanismo do Universo',
    virtue: 'Independência',
    vice: 'Ociosidade',
    symbols: ['Os Perfumes e as Sandálias', 'A Lua Crescente', 'O Espelho Astral'],
    preciousStone: 'Quartzo',
    incenseAndPlants: 'Jasmim / Ginseng',
    tarotCards: 'Os Quatro Noves',
    overview:
      'Yesod é o Fundamento Lunar no Pilar do Meio, imediatamente atrás do véu físico de Malkuth. Atua como o Tesouro de Imagens etérico e astral — a matriz formativa pela qual todo impulso superior precisa passar antes de se cristalizar em matéria.',
    dionFortuneInsight:
      'Dion Fortune chama Yesod de "Maquinário do Universo" e a Esfera de Maya e da Luz Astral. Assim como a Lua reflete a luz solar na noite, Yesod reflete Tiphareth em Malkuth; ela ensina que dominar as marés mutáveis de Yesod traz verdadeira Independência da ilusão e do fascínio psíquico.',
    regardieInsight:
      'Israel Regardie vincula Yesod diretamente ao Nephesh, à mente subconsciente, à vida onírica e à vitalidade etérica (prana) mobilizada no exercício do Pilar do Meio. Purificar Yesod estabiliza o alicerce subconsciente para que a luz espiritual desça com segurança à vida cotidiana.',
    pathworkingGuidance:
      'Permaneça sob um céu noturno violeta fresco diante de uma lua crescente prateada. Observe correntes etéricas luminosas tecerem os padrões ocultos por trás da matéria, ancorando sua vitalidade em serena autonomia.',
  },
  malkuth: {
    translation: 'O Reino',
    colorDescriptions: {
      atziluth: 'Amarelo',
      briah: 'Citrino, Oliva, Castanho-Avermelhado e Preto',
      yetzirah: 'Citrino, Oliva, Castanho-Avermelhado e Preto Salpicados de Ouro',
      assiah: 'Preto Raiado de Amarelo',
    },
    divineName: 'Adonai ha-Aretz / Adonai Melekh (אדני הארץ — "Senhor da Terra")',
    archangel: 'Sandalphon (Co-Irmão / Anjo da Terra)',
    angelicOrder: 'Ashim (Almas de Fogo)',
    planet: 'Terra 🜨 · Esfera dos Quatro Elementos',
    astrological: 'Cholem ha-Yesodoth (Quebrador dos Fundamentos / Esfera dos Elementos)',
    yetziraticTitle: 'A Inteligência Resplandecente',
    soulPart: 'Guph (O Corpo Físico e Veículo Sensorial do Nephesh)',
    qliphoth: 'Nehemoth / Lilith (As Sussurradoras — Materialismo Denso e Inércia Cega)',
    element: 'Terra (Síntese de Fogo, Água, Ar e Terra)',
    chakraOrBodyPart: 'Pés / Tornozelos / Plantas dos Pés (Centro de Aterramento)',
    magicalImage: 'Uma Jovem Mulher Coroada e Entronizada',
    spiritualExperience: 'Visão do Sagrado Anjo Guardião',
    virtue: 'Discernimento',
    vice: 'Avareza, Inércia',
    symbols: [
      'O Altar do Duplo Cubo',
      'A Cruz de Braços Iguais',
      'O Círculo Mágico',
      'O Triângulo da Arte',
    ],
    preciousStone: 'Cristal de Rocha',
    incenseAndPlants: 'Dítamo de Creta',
    tarotCards: 'Os Quatro Dez e as Quatro Princesas (Heh Final)',
    overview:
      'Malkuth é o Reino — o cosmos físico, os quatro elementos em manifestação e a culminação de todas as nove Sephiroth superiores. Na célebre máxima "Kether está em Malkuth, e Malkuth está em Kether", a esfera mais baixa reflete a mais alta.',
    dionFortuneInsight:
      'Dion Fortune insiste ao longo de "A Cabala Mística" que a Cabala Hermética jamais despreza a matéria: Malkuth é a Noiva do Microprosopo e o templo sagrado da Shekinah. A realização espiritual exige Discernimento — discernir a presença divina dentro da realidade concreta em vez de fugir da vida terrena.',
    regardieInsight:
      'Em "A Árvore da Vida" e "O Pilar do Meio", Israel Regardie sublinha que todo ritual, meditação e integração psicológica deve culminar nos pés, em Malkuth. Sem ancorar a percepção espiritual em ação prática e saúde corporal, o misticismo evapora em fantasia.',
    pathworkingGuidance:
      'Sinta a terra firme sob as plantas dos pés, percebendo os quatro quadrantes elementais — ar citrino, água oliva, fogo castanho-avermelhado, terra negra — repousando em sereno equilíbrio ao redor do corpo como um templo vivo.',
  },
};

type PathTranslation = Pick<
  Path,
  | 'name'
  | 'letterMeaning'
  | 'tarotCardName'
  | 'attribution'
  | 'colorDescriptions'
  | 'yetziraticText'
  | 'consciousnessAspect'
  | 'overview'
  | 'dionFortuneInsight'
  | 'regardieInsight'
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
    letterMeaning: 'Boi (Força Primordial / Sopro Criador)',
    tarotCardName: 'O Louco',
    attribution: 'Ar',
    colorDescriptions: {
      atziluth: 'Amarelo Pálido Brilhante',
      briah: 'Azul Celeste',
      yetzirah: 'Verde Esmeralda Azulado',
      assiah: 'Esmeralda Salpicado de Ouro',
    },
    yetziraticText:
      'O Décimo Primeiro Caminho é a Inteligência Cintilante, porque é a essência daquela cortina colocada próxima à ordem da disposição, e esta é uma dignidade especial concedida a ele para que possa permanecer diante da Face da Causa das Causas.',
    consciousnessAspect: 'Sopro do Espírito (Ruach) · Águia Sagrada / Homem · Gálbano · Topázio',
    overview:
      'Conecta a unidade suprema de Kether à sabedoria dinâmica de Chokmah. Representa o sopro cósmico original e o Espírito puro e incondicionado descendo à primeira polaridade da criação.',
    dionFortuneInsight:
      'Dion Fortune observa que os caminhos supernos mais altos pertencem a níveis cósmicos acima da consciência pessoal comum, mas O Louco (Aleph) ecoa em nós como pura confiança intuitiva — a loucura divina que dá o passo além do cálculo racional rumo ao Espírito vivo.',
    regardieInsight:
      'Israel Regardie aponta em "O Jardim das Romãs" que Aleph, a primeira Letra Mãe do Ar, representa o sutil sopro cósmico que medeia entre Kether e Chokmah, permanecendo "diante da Causa das Causas" como o véu do Espírito luminoso puro.',
    pathworkingMeditation:
      'Respire profundamente em luz amarelo-pálida brilhante, soltando o cálculo ansioso enquanto pisa com leveza no céu infinito da pura confiança espiritual.',
  },
  'path-12': {
    name: 'A Inteligência da Transparência',
    letterMeaning: 'Casa (Recipiente / Mente)',
    tarotCardName: 'O Mago',
    attribution: 'Mercúrio',
    colorDescriptions: {
      atziluth: 'Amarelo',
      briah: 'Púrpura',
      yetzirah: 'Cinza',
      assiah: 'Índigo Raiado de Violeta',
    },
    yetziraticText:
      'O Décimo Segundo Caminho é a Inteligência da Transparência, porque é aquela espécie de Magnificência chamada Chazchazit, o lugar de onde emana a visão daqueles que veem em aparições.',
    consciousnessAspect: 'Canalização Consciente da Vontade · Íbis / Cinocéfalo · Almécega · Opala e Ágata',
    overview:
      'Conecta Kether diretamente a Binah, a Grande Mãe. Como O Mago sob Mercúrio, representa a atenção divina focalizada tornando-se um canal transparente ("Como em cima, assim embaixo") para modelar a matriz primordial.',
    dionFortuneInsight:
      'Dion Fortune associa este caminho à transmissão das ideias arquetípicas da Coroa para a Matriz da Forma: o Logos ou Verbo atuando por meio da vontade espiritual concentrada, e não por artifícios da mente inferior.',
    regardieInsight:
      'Israel Regardie relaciona a "Inteligência da Transparência" à lucidez clarividente verdadeira e ao Mago Hermético — uma mente tão límpida e desprendida que a Luz Superna a atravessa sem distorção rumo a Binah.',
    pathworkingMeditation:
      'Permaneça entre o céu e a terra como um vaso de cristal límpido. Erga uma mão à Kether dourada e direcione a corrente para o cálice silencioso de obsidiana em Binah.',
  },
  'path-13': {
    name: 'A Inteligência Unificadora',
    letterMeaning: 'Camelo (Travessia do Abismo / Santuário)',
    tarotCardName: 'A Sacerdotisa',
    attribution: 'Lua',
    colorDescriptions: {
      atziluth: 'Azul',
      briah: 'Prata',
      yetzirah: 'Azul Pálido Frio',
      assiah: 'Prata Raiado de Azul-Celeste',
    },
    yetziraticText:
      'O Décimo Terceiro Caminho chama-se a Inteligência Unificadora, e é assim denominado porque é ele próprio a Essência da Glória. É a Consumação da Verdade das coisas espirituais individuais.',
    consciousnessAspect: 'Travessia do Abismo · Cão · Cânfora / Aloés · Pedra da Lua e Pérola',
    overview:
      'O caminho vertical central que desce pelo Pilar do Meio a partir de Kether, atravessando diretamente o Abismo e Da’ath até o Coração Solar de Tiphareth. Rege a memória cósmica, a intuição e a ascensão mística silenciosa.',
    dionFortuneInsight:
      'Dion Fortune chama A Sacerdotisa de grande ponte espiritual do Pilar do Meio: o reflexo lunar de Kether descendo através do Abismo até a Alma em Tiphareth, portando os pergaminhos da memória cósmica e da iniciação sutil.',
    regardieInsight:
      'Israel Regardie destaca Gimel — o Camelo cruzando o deserto do Abismo — como o caminho místico essencial que liga o Adepto em Tiphareth diretamente à Coroa (Yechidah). Sem o desapego sereno deste caminho, nenhuma consciência atravessa Da’ath.',
    pathworkingMeditation:
      'Sente-se em silêncio entre os pilares preto e branco diante do véu do templo, deixando a luz lunar prateada guiar sua consciência através do deserto sereno do Abismo rumo à Coroa.',
  },
  'path-14': {
    name: 'A Inteligência Iluminadora',
    letterMeaning: 'Porta (Portal da Geração)',
    tarotCardName: 'A Imperatriz',
    attribution: 'Vênus',
    colorDescriptions: {
      atziluth: 'Verde Esmeralda',
      briah: 'Azul Celeste',
      yetzirah: 'Verde de Primavera Nascente',
      assiah: 'Rosa Vivo ou Cereja Raiado de Verde Pálido',
    },
    yetziraticText:
      'O Décimo Quarto Caminho é a Inteligência Iluminadora, e é assim chamado porque é aquele Brilhante que é o fundador das ideias ocultas e fundamentais de santidade e de seus estágios de preparação.',
    consciousnessAspect: 'Matrimônio Sagrado de Abba e Aima · Pomba / Pardal · Sândalo e Murta · Esmeralda e Turquesa',
    overview:
      'O caminho horizontal mais elevado, unindo Abba (Chokmah) e Aima (Binah) através da Tríade Superna. Regido por Vênus e A Imperatriz, é a porta fértil pela qual a Força pura desposa a Forma para gerar toda vida cósmica.',
    dionFortuneInsight:
      'Dion Fortune ensina que o Caminho 14 personifica o Amor cósmico em seu arquétipo mais elevado — a atração magnética eterna entre Força positiva e Forma negativa. Toda manifestação ulterior da harmonia venusiana na Árvore é reflexo desse matrimônio superno.',
    regardieInsight:
      'Israel Regardie interpreta Daleth, "a Porta", como o portal pelo qual a Luz de Kether — tendo-se dividido em Sabedoria e Entendimento — torna-se fértil e luminosa, dando à luz todos os planos inferiores da existência.',
    pathworkingMeditation:
      'Atravesse um arco esmeralda entrelaçado de rosas vivas, testemunhando Força e Forma se abraçarem em harmonia serena e abundante acima de todo conflito terreno.',
  },
  'path-15': {
    name: 'A Inteligência Constitutiva',
    letterMeaning: 'Janela (Visão / Supervisão Espiritual)',
    tarotCardName: 'O Imperador',
    attribution: 'Áries',
    colorDescriptions: {
      atziluth: 'Escarlate',
      briah: 'Vermelho',
      yetzirah: 'Chama Brilhante',
      assiah: 'Vermelho Incandescente',
    },
    yetziraticText:
      'O Décimo Quinto Caminho é a Inteligência Constitutiva, assim chamada porque constitui a substância da criação em pura escuridão, e os homens falaram destas contemplações; é aquela escuridão referida na Escritura, Jó 38:9, "e a densa escuridão por faixa envolvente."',
    consciousnessAspect: 'Ordem Espiritual Pioneira · Carneiro / Coruja · Sangue de Dragão · Rubi',
    overview:
      'Conecta Chokmah (o Pai Superno) diretamente a Tiphareth (o Filho Solar). Como O Imperador e Áries, traz liderança ígnea pioneira, visão clara e autoridade espiritual soberana ao Coração.',
    dionFortuneInsight:
      'Dion Fortune aponta que o Caminho 15 transmite a autoridade paterna de Chokmah para a consciência central de Tiphareth, estabelecendo ordem, visão e governo moral sobre o reino inferior da personalidade.',
    regardieInsight:
      'Israel Regardie relaciona a letra hebraica Heh ("uma janela") à visão penetrante: ela abre uma fresta a partir de Tiphareth diretamente para a Sabedoria estelar ígnea de Chokmah, capacitando a alma a governar sua própria natureza com a iniciativa de Áries.',
    pathworkingMeditation:
      'Contemple por uma janela elevada banhada pela aurora escarlate, sentindo a soberania solar reta e a clareza corajosa assumirem o governo de seu mundo interior.',
  },
  'path-16': {
    name: 'A Inteligência Triunfante e Eterna',
    letterMeaning: 'Prego / Gancho (União do Espírito à Alma)',
    tarotCardName: 'O Hierofante',
    attribution: 'Touro',
    colorDescriptions: {
      atziluth: 'Laranja-Avermelhado',
      briah: 'Índigo Profundo',
      yetzirah: 'Oliva Quente Profundo',
      assiah: 'Marrom Rico',
    },
    yetziraticText:
      'O Décimo Sexto Caminho é a Inteligência Triunfante ou Eterna, assim chamada porque é o deleite da Glória, além do qual não há outra Glória semelhante a ela, sendo também chamada o Paraíso preparado para os Justos.',
    consciousnessAspect: 'Mestre Interior e Tradição Sagrada · Touro · Estoraque · Topázio',
    overview:
      'Desce pelo Pilar da Misericórdia de Chokmah até Chesed. Governado por Touro e O Hierofante, é o canal da tradição espiritual viva, da iniciação interior e do mestre fiel que liga a lei humana à Sabedoria Superna.',
    dionFortuneInsight:
      'Dion Fortune destaca O Hierofante como a ponte através da borda externa do Abismo pelo lado da Misericórdia: o Iniciador e Guardião da Sabedoria Antiga que traduz a verdade cósmica atemporal em tradição esotérica duradoura em Chesed.',
    regardieInsight:
      'Israel Regardie chama atenção para a letra Vau ("um prego ou gancho"), explicando como ela fixa firmemente a Sabedoria Superna de Chokmah ao legislador benevolente Chesed, preservando o santuário interior do "Paraíso preparado para os Justos".',
    pathworkingMeditation:
      'Ajoelhe-se diante do Hierofante interior silencioso banhado em luz laranja-avermelhada e índigo profundo, escutando a voz serena da sabedoria espiritual perene.',
  },
  'path-17': {
    name: 'A Inteligência Disponente',
    letterMeaning: 'Espada (Discernimento / Divisão e Escolha)',
    tarotCardName: 'Os Enamorados',
    attribution: 'Gêmeos',
    colorDescriptions: {
      atziluth: 'Laranja',
      briah: 'Malva Pálido',
      yetzirah: 'Couro Amarelo Novo',
      assiah: 'Cinza-Avermelhado Tendendo ao Malva',
    },
    yetziraticText:
      'O Décimo Sétimo Caminho é a Inteligência Disponente, que provê Fé aos Justos, e eles são revestidos com o Espírito Santo por meio dela, sendo chamada o Fundamento da Excelência no estado das coisas superiores.',
    consciousnessAspect: 'União dos Opostos e Escolha Justa · Pega / Gêmeos · Absinto · Alexandrita e Turmalina',
    overview:
      'Conecta Binah (Entendimento Superno) até Tiphareth (o Coração). Sob Gêmeos e Os Enamorados, representa o discernimento intelectual (Zain, a Espada) culminando no matrimônio sagrado das polaridades complementares.',
    dionFortuneInsight:
      'Dion Fortune enfatiza que Zain é uma espada de dois gumes do discernimento: antes que a verdadeira união aconteça em Tiphareth, a alma deve separar o real do irreal, voltando a escolha consciente da ilusão inferior para a cobertura angélica dos Supernos.',
    regardieInsight:
      'Israel Regardie observa em "O Jardim das Romãs" que "prover Fé aos Justos" significa o súbito lampejo intuitivo descendo de Binah para Tiphareth — reconciliando dualidades pelo simbolismo do Casamento Alquímico Angélico dos Enamorados na Aurora Dourada.',
    pathworkingMeditation:
      'Permaneça sob o anjo radiante em luz laranja-dourada e malva suave, harmonizando os opostos gêmeos dentro da própria mente mediante uma escolha límpida e cordial.',
  },
  'path-18': {
    name: 'A Inteligência da Casa da Influência',
    letterMeaning: 'Cerca / Recinto (Recipiente Sagrado)',
    tarotCardName: 'O Carro',
    attribution: 'Câncer',
    colorDescriptions: {
      atziluth: 'Âmbar',
      briah: 'Bordô',
      yetzirah: 'Castanho-Avermelhado Brilhante Rico',
      assiah: 'Marrom Esverdeado Escuro',
    },
    yetziraticText:
      'O Décimo Oitavo Caminho chama-se a Inteligência ou Casa da Influência (pela grandeza de cuja abundância o influxo das coisas boas sobre os seres criados é aumentado), e de seu seio são extraídos os arcanos e os sentidos ocultos, que habitam à sua sombra e a ela se apegam.',
    consciousnessAspect: 'Veículo Espiritual (Merkabah) e Graal · Caranguejo / Esfinge · Ônica · Âmbar',
    overview:
      'Desce pelo Pilar da Severidade de Binah a Geburah. Como O Carro e Câncer, é a "cerca" protetora ou veículo Merkabah blindado que conduz o Eu Superior vitoriosamente através do Abismo.',
    dionFortuneInsight:
      'Dion Fortune explica que Cheth (um recinto) reflete a aura protetora e o cálice do Graal conduzido pelo Auriga: guarda os Mistérios Supernos que descem de Binah enquanto dirige o poder feroz de Geburah sem deixá-lo dispersar.',
    regardieInsight:
      'Israel Regardie vincula este caminho ao Sangreal (Santo Graal) e às duas esfinges do Carro: assim como Câncer é um recinto aquoso regido pela disciplina em Boaz, o Adepto comanda forças opostas branca e preta pela pura quietude da vontade.',
    pathworkingMeditation:
      'Assuma seu lugar dentro de uma carruagem celeste âmbar e bordô, segurando as rédeas com serenidade enquanto forças opostas avançam juntas em firme e silencioso equilíbrio.',
  },
  'path-19': {
    name: 'A Inteligência do Segredo de Todas as Atividades Espirituais',
    letterMeaning: 'Serpente (Energia Vital / Kundalini)',
    tarotCardName: 'A Força (Luxúria)',
    attribution: 'Leão',
    colorDescriptions: {
      atziluth: 'Amarelo Esverdeado',
      briah: 'Púrpura Profundo',
      yetzirah: 'Cinza',
      assiah: 'Âmbar Avermelhado',
    },
    yetziraticText:
      'O Décimo Nono Caminho é a Inteligência do Segredo de todas as atividades dos seres espirituais, e é assim chamado por causa da afluência difundida por ele a partir da bênção altíssima e da mais elevada glória exaltada.',
    consciousnessAspect: 'Domar a Vitalidade Primordial · Leão · Olíbano · Olho-de-Gato',
    overview:
      'A ponte horizontal logo abaixo do Abismo que liga Chesed (Misericórdia) e Geburah (Severidade). Regido por Leão e A Força, ensina como a força vital serpentina primordial é conduzida com suavidade e não esmagada.',
    dionFortuneInsight:
      'Dion Fortune descreve o Caminho 19 como o verdadeiro segredo do poder mágico: a donzela da intuição cerrando suavemente as mandíbulas do Leão com uma guirlanda de rosas — transmutando o instinto solar-vital bruto em força espiritual por meio do amor e do prumo interior, nunca da repressão violenta.',
    regardieInsight:
      'Israel Regardie enfatiza que Teth ("a Serpente") conecta a expansão benevolente (Chesed) à severidade ígnea (Geburah), equilibrando misericórdia e força na corrente vital magnética ("luz astral" / Prana) que sustenta toda operação espiritual.',
    pathworkingMeditation:
      'Repouse mãos suaves e firmes sobre o Leão dourado do instinto vital dentro de si, conduzindo a potência natural feroz para uma compostura serena e radiante.',
  },
  'path-20': {
    name: 'A Inteligência da Vontade',
    letterMeaning: 'Mão (A Semente / Ponto Primordial)',
    tarotCardName: 'O Eremita',
    attribution: 'Virgem',
    colorDescriptions: {
      atziluth: 'Verde-Amarelado',
      briah: 'Cinza-Ardósia',
      yetzirah: 'Cinza Esverdeado',
      assiah: 'Cor de Ameixa',
    },
    yetziraticText:
      'O Vigésimo Caminho é a Inteligência da Vontade, e é assim chamado porque é o meio de preparação de todo e cada ser criado, e por esta inteligência torna-se conhecida a existência da Sabedoria Primordial.',
    consciousnessAspect: 'Iluminação Solitária e Verdadeira Vontade · Virgem / Anacoreta · Narciso · Peridoto',
    overview:
      'Conecta Chesed (Misericórdia/Júpiter) a Tiphareth (Coração/Sol). Associado a Virgem, à letra Yod e a O Eremita, retrata o sábio solitário portando a lâmpada velada da Verdadeira Vontade do coração até a ordem cósmica.',
    dionFortuneInsight:
      'Dion Fortune aponta o paradoxo d’O Eremita: embora velado em solidão cinza-ardósia no alto das montanhas, ele ergue sua lanterna para iluminar a trilha dos que sobem abaixo — unindo serviço humilde (Virgem) à semente criativa de Yod.',
    regardieInsight:
      'Israel Regardie enfatiza que a "Inteligência da Vontade" reflete a letra-semente Yod (raiz de todas as letras hebraicas) unindo o projeto de Chesed à consciência individual de Tiphareth: descobrir a Verdadeira Vontade em contemplação serena e autocontida.',
    pathworkingMeditation:
      'Suba silenciosamente rumo ao cume da montanha no crepúsculo cinza-ardósia fresco, protegendo a estrela firme de seis pontas de luz no interior de sua lanterna.',
  },
  'path-21': {
    name: 'A Inteligência da Conciliação',
    letterMeaning: 'Palma da Mão (Ciclo Receptivo)',
    tarotCardName: 'A Roda da Fortuna',
    attribution: 'Júpiter',
    colorDescriptions: {
      atziluth: 'Violeta',
      briah: 'Azul',
      yetzirah: 'Púrpura Rico',
      assiah: 'Azul Vivo Raiado de Amarelo',
    },
    yetziraticText:
      'O Vigésimo Primeiro Caminho é a Inteligência da Conciliação, e é assim chamado porque recebe a influência divina que flui para ele a partir de sua bênção sobre toda e cada existência.',
    consciousnessAspect: 'Ciclos Kármicos e Providência Benevolente · Águia · Açafrão · Ametista e Lápis-Lazúli',
    overview:
      'Desce pelo Pilar da Misericórdia de Chesed a Netzach. Regido por Júpiter e A Roda da Fortuna, governa a rotação rítmica do karma, a lei cíclica e a conciliação das circunstâncias mutáveis com a providência superior.',
    dionFortuneInsight:
      'Dion Fortune interpreta o Caminho 21 como a roda giratória da lei cósmica que traz a ordem divina de Chesed até as marés emocionais de Netzach: cada oscilação na borda da fortuna move-se em torno de um eixo espiritual inabalável.',
    regardieInsight:
      'Israel Regardie destaca Kaph ("a palma aberta que recebe") como o canal gracioso da bênção jupiteriana, ensinando o estudante a acolher a mudança cíclica sem perder o equilíbrio no cubo imóvel do centro.',
    pathworkingMeditation:
      'Dê um passo para dentro rumo ao eixo imóvel violeta e azul no centro da Roda giratória, observando estações e fortunas girarem em paz ao redor de um propósito inabalável.',
  },
  'path-22': {
    name: 'A Inteligência Fiel',
    letterMeaning: 'Aguilhão de Boi (Equilíbrio e Ajustamento)',
    tarotCardName: 'A Justiça (O Ajustamento)',
    attribution: 'Libra',
    colorDescriptions: {
      atziluth: 'Verde Esmeralda',
      briah: 'Azul',
      yetzirah: 'Azul-Esverdeado Profundo',
      assiah: 'Verde Pálido',
    },
    yetziraticText:
      'O Vigésimo Segundo Caminho é a Inteligência Fiel, e é assim chamado porque por ele as virtudes espirituais são acrescidas, e todos os habitantes da terra estão quase sob sua sombra.',
    consciousnessAspect: 'Equilíbrio Kármico e Verdade Imparcial · Elefante · Gálbano · Esmeralda',
    overview:
      'Conecta Geburah (Severidade) a Tiphareth (Beleza). Sob Libra e A Justiça, representa o ajustamento exato e fiel de causa e efeito — corrigindo todo desvio antes que a alma se aproxime do centro Solar.',
    dionFortuneInsight:
      'Dion Fortune vê A Justiça no Caminho 22 como equilíbrio dinâmico em ação: Lamed, o aguilhão de boi, cutuca suavemente a personalidade errante de volta à senda do prumo para que a severidade de Geburah sirva à harmonia de Tiphareth.',
    regardieInsight:
      'Israel Regardie observa que a Aurora Dourada alinha Libra (A Justiça) à lei fiel do karma — não vingança cega, mas um ajustamento natural exato que restaura a compostura sempre que surgem extremos.',
    pathworkingMeditation:
      'Mantenha os pratos da balança dourada estáveis entre luz esmeralda fresca e azul profundo, deixando o excesso cair até que pensamento, motivo e ato repousem em quieto equilíbrio.',
  },
  'path-23': {
    name: 'A Inteligência Estável',
    letterMeaning: 'Água (O Grande Oceano Receptivo)',
    tarotCardName: 'O Enforcado',
    attribution: 'Água',
    colorDescriptions: {
      atziluth: 'Azul Profundo',
      briah: 'Verde-Mar',
      yetzirah: 'Verde Oliva Profundo',
      assiah: 'Branco Salpicado de Púrpura',
    },
    yetziraticText:
      'O Vigésimo Terceiro Caminho é a Inteligência Estável, e é assim chamado porque possui a virtude da consistência entre todas as numerações.',
    consciousnessAspect: 'Entrega Voluntária e Inversão de Perspectiva · Águia–Serpente–Escorpião · Mirra · Berilo e Água-Marinha',
    overview:
      'Desce pelo Pilar da Severidade de Geburah a Hod. Atribuído à Letra Mãe Mem (Água) e a O Enforcado, retrata a suspensão voluntária dos valores mundanos para que a verdade superior estabilize a consciência.',
    dionFortuneInsight:
      'Dion Fortune interpreta o Caminho 23 como profunda inversão espiritual: aos olhos mundanos em Malkuth e Hod, o místico parece de cabeça para baixo e inativo, mas na realidade a alma pende ancorada nas águas superiores de Geburah, sacrificando a vontade do ego pela iluminação.',
    regardieInsight:
      'Israel Regardie comenta o aparente paradoxo de chamar este caminho aquoso de "A Inteligência Estável": a verdadeira estabilidade só surge quando o intelecto fluido e reativo (Hod) se entrega por completo à lei cósmica em vez de se agarrar a opiniões rígidas do ego.',
    pathworkingMeditation:
      'Suspenda a pressa mundana em serenas águas azul-profundas, contemplando velhos hábitos sob um ângulo invertido até que uma quietude pacífica pouse sobre a mente.',
  },
  'path-24': {
    name: 'A Inteligência Imaginativa',
    letterMeaning: 'Peixe (Vida Movendo-se nas Águas Escuras)',
    tarotCardName: 'A Morte',
    attribution: 'Escorpião',
    colorDescriptions: {
      atziluth: 'Azul-Esverdeado',
      briah: 'Marrom Fosco',
      yetzirah: 'Marrom Muito Escuro',
      assiah: 'Marrom-Índigo Lívido (Como um Besouro Negro)',
    },
    yetziraticText:
      'O Vigésimo Quarto Caminho é a Inteligência Imaginativa, e é assim chamado porque dá semelhança a todas as similitudes que são criadas de modo análogo às suas harmoniosas elegâncias.',
    consciousnessAspect: 'Putrefação, Renascimento e Regeneração · Escorpião / Águia · Benjoim · Pedra da Serpente',
    overview:
      'Conecta Tiphareth (Sol/Coração) a Netzach (Vênus/Desejo). Regido por Escorpião e pelo Arcano da Morte, representa a dissolução necessária da alquimia dos apegos emocionais mortos para que a beleza viva ressurja renovada.',
    dionFortuneInsight:
      'Dion Fortune enfatiza que A Morte no Caminho 24 jamais é aniquilação — é transformação, a travessia pelas águas subterrâneas escuras onde formas gastas se decompõem para nutrir novo crescimento sob o Sol nascente de Tiphareth.',
    regardieInsight:
      'Israel Regardie explica seu nome yetzirático, "A Inteligência Imaginativa", como o processo alquímico de putrefação e renovação: à medida que desejos antigos em Netzach morrem, a imaginação criadora é purificada para refletir as harmonias reais de Tiphareth.',
    pathworkingMeditation:
      'Deixe identidades ultrapassadas e apegos áridos dissolverem-se suavemente como folhas de outono retornando à terra escura, observando a aurora solar dourada romper além das duas torres.',
  },
  'path-25': {
    name: 'A Inteligência da Provação',
    letterMeaning: 'Esteio / Estaca de Tenda (A Flecha da Aspiração)',
    tarotCardName: 'A Temperança (A Arte)',
    attribution: 'Sagitário',
    colorDescriptions: {
      atziluth: 'Azul',
      briah: 'Amarelo',
      yetzirah: 'Verde',
      assiah: 'Azul Escuro Vívido',
    },
    yetziraticText:
      'O Vigésimo Quinto Caminho é a Inteligência da Provação ou Tentativa, e é assim chamado porque é a tentação primária pela qual o Criador prova todas as pessoas justas.',
    consciousnessAspect: 'Têmpera Alquímica e Caminho da Flecha · Centauro / Cavalo · Ligno-Aloés · Jacinto',
    overview:
      'O caminho vertical central que ascende pelo Pilar do Meio de Yesod (Astral) diretamente para Tiphareth (Coração Solar). Sob Sagitário e A Temperança, é a ponte do arco-íris da alquimia espiritual e a primeira grande provação interior.',
    dionFortuneInsight:
      'Dion Fortune descreve o Caminho 25 como a "Noite Escura da Alma" da iniciação inicial — a prova na qual o aspirante sobe das ilusões lunares mutáveis de Yesod pelo deserto astral rumo ao Sol firme de Tiphareth, guiado pelo anjo que verte fogo e água.',
    regardieInsight:
      'Israel Regardie enfatiza que a Flecha de Sagitário (Qesheth, o Arco-Íris da Promessa) dispara em linha reta pelo Pilar do Meio a partir do alicerce subconsciente de Yesod até o Sagrado Anjo Guardião em Tiphareth, unindo os opostos por paciente têmpera alquímica.',
    pathworkingMeditation:
      'Trace o arco do arco-íris subindo da violeta Yesod rumo à dourada Tiphareth, temperando a aspiração ígnea e o sentir aquoso numa única flecha reta apontada ao Coração.',
  },
  'path-26': {
    name: 'A Inteligência Renovadora',
    letterMeaning: 'Olho (Visão Direta / Aparências)',
    tarotCardName: 'O Diabo',
    attribution: 'Capricórnio',
    colorDescriptions: {
      atziluth: 'Índigo',
      briah: 'Preto',
      yetzirah: 'Preto-Azulado',
      assiah: 'Cinza Escuro Frio Aproximando-se do Preto',
    },
    yetziraticText:
      'O Vigésimo Sexto Caminho chama-se a Inteligência Renovadora, porque o Deus Santo renova por meio dele todas as coisas mutáveis que são renovadas pela criação do mundo.',
    consciousnessAspect: 'Confrontar a Sombra e o Júbilo de Pã · Bode · Almíscar · Diamante Negro',
    overview:
      'Conecta Tiphareth (Sol/Coração) a Hod (Mercúrio/Intelecto). Atribuído a Capricórnio, Ayin ("o Olho") e O Diabo, desafia a mente racional a enxergar através do cativeiro material e reconhecer sem medo a força vital bruta da natureza.',
    dionFortuneInsight:
      'Dion Fortune esclarece que o Caminho 26 não é o mal, mas o "Senhor da Matéria" e o limiar do riso e da desilusão: as correntes só parecem pesadas enquanto a mente em Hod toma as aparências superficiais pela realidade última.',
    regardieInsight:
      'Israel Regardie aponta que "A Inteligência Renovadora" quebra o orgulho intelectual estagnado ao nos confrontar com o instinto e a limitação física — pois, uma vez que rimos do cativeiro de Ayin (o mero olhar exterior), a vitalidade é renovada a serviço de Tiphareth.',
    pathworkingMeditation:
      'Olhe com clareza para a sombra índigo-negra sem recuar, percebendo que os grilhões ao redor da mente são frouxos o bastante para serem retirados a qualquer instante.',
  },
  'path-27': {
    name: 'A Inteligência Excitante',
    letterMeaning: 'Boca (Palavra Falada / Sopro de Força)',
    tarotCardName: 'A Torre',
    attribution: 'Marte',
    colorDescriptions: {
      atziluth: 'Escarlate',
      briah: 'Vermelho',
      yetzirah: 'Vermelho Veneziano',
      assiah: 'Vermelho Brilhante Raiado de Azul-Celeste ou Esmeralda',
    },
    yetziraticText:
      'O Vigésimo Sétimo Caminho é a Inteligência Excitante, e é assim chamado porque por ele é criado o intelecto de todos os seres criados sob o céu mais alto, bem como o excitamento ou movimento deles.',
    consciousnessAspect: 'Destruição de Formas Falsas e Palavra Dinâmica · Cavalo / Urso · Pimenta e Sangue de Dragão · Rubi',
    overview:
      'O caminho horizontal mais baixo, ligando Emoção (Netzach) e Intelecto (Hod). Governado por Marte e A Torre, é o clarão da crise e do despertar que estilhaça fortalezas mentais rígidas.',
    dionFortuneInsight:
      'Dion Fortune observa que A Torre ergue-se entre o sentimento e o intelecto para lembrar que estruturas mentais gastas e dogmas presunçosos precisam, cedo ou tarde, ser atingidos pelo relâmpago do Espírito — libertando a verdade aprisionada.',
    regardieInsight:
      'Israel Regardie vincula Peh ("a Boca") à Palavra Falada vibrante da magia ritual e ao despertar marcial da vitalidade adormecida ("A Inteligência Excitante"), arrancando a alma do sono complacente entre Hod e Netzach.',
    pathworkingMeditation:
      'Testemunhe um raio escarlate atingir uma torre inflexível de ideias rígidas, vendo o céu aberto invadir o espaço à medida que muros estreitos desabam.',
  },
  'path-28': {
    name: 'A Inteligência Natural',
    letterMeaning: 'Anzol (Pescar a Graça / Meditação)',
    tarotCardName: 'A Estrela',
    attribution: 'Aquário',
    colorDescriptions: {
      atziluth: 'Violeta',
      briah: 'Azul Celeste',
      yetzirah: 'Malva Azulado',
      assiah: 'Branco Matizado de Púrpura',
    },
    yetziraticText:
      'O Vigésimo Oitavo Caminho chama-se a Inteligência Natural, porque por meio dele é consumada e aperfeiçoada a natureza de tudo o que existe abaixo do Sol.',
    consciousnessAspect: 'Intuição Iluminada e Renovação Cósmica · Homem / Águia · Gálbano · Vidro Artificial e Calcedônia',
    overview:
      'Conecta Netzach (Vênus/Emoção) a Yesod (Lua/Astral). Atribuído a Aquário e A Estrela, é o derramamento sereno e revigorante da inspiração cósmica viva após a tempestade d’A Torre.',
    dionFortuneInsight:
      'Dion Fortune destaca A Estrela como a Verdade desvelada vertendo suas águas igualmente sobre a terra seca da forma e o lago escuro do subconsciente: aqui a emoção pessoal (Netzach) é limpa e canalizada em visão astral límpida (Yesod).',
    regardieInsight:
      'Israel Regardie associa Tzaddi ("o Anzol") à contemplação meditativa que "pesca" inspiração divina das profundezas supernas, trazendo esperança, clareza e harmonia natural a tudo o que existe "abaixo do Sol".',
    pathworkingMeditation:
      'Ajoelhe-se junto a águas límpidas e prateadas sob sete estrelas violeta e azul-celeste, deixando a corrente calmante lavar o cansaço da mente e do coração.',
  },
  'path-29': {
    name: 'A Inteligência Corpórea',
    letterMeaning: 'Nuca (Cérebro Onírico e Instintivo)',
    tarotCardName: 'A Lua',
    attribution: 'Peixes',
    colorDescriptions: {
      atziluth: 'Carmesim (Ultravioleta)',
      briah: 'Couro Claro Salpicado de Branco-Prateado',
      yetzirah: 'Marrom-Rosado Claro Translúcido',
      assiah: 'Cor de Pedra',
    },
    yetziraticText:
      'O Vigésimo Nono Caminho é a Inteligência Corpórea, assim chamado porque forma todo corpo que é formado em todos os mundos, bem como a reprodução deles.',
    consciousnessAspect: 'Evolução Biológica e Inconsciente Profundo · Besouro / Golfinho · Âmbar Cinzento · Pérola',
    overview:
      'Desce pelo lado direito da Árvore de Netzach (Instinto/Natureza) diretamente para Malkuth (Corpo Físico). Regido por Peixes e A Lua, traça a senda evolutiva sinuosa através da memória inconsciente profunda rumo à encarnação.',
    dionFortuneInsight:
      'Dion Fortune explica por que este caminho é psicologicamente tão exigente: Qoph corresponde ao bulbo raquidiano e ao instinto ancestral. Caminhar entre as duas torres d’A Lua requer encarar medos primordiais e memórias evolutivas sem recuar.',
    regardieInsight:
      'Israel Regardie denomina o Caminho 29 o portal do inconsciente coletivo profundo e da memória celular ("forma todo corpo em todos os mundos"): conforme o crustáceo escala das águas escuras de Peixes para a terra firme, a vitalidade subconsciente toma forma física em Malkuth.',
    pathworkingMeditation:
      'Caminhe com calma pela trilha estreita que emerge das águas escuras rumo às colinas distantes, confiando na luz serena adiante mesmo quando os lobos do instinto uivam à margem do caminho.',
  },
  'path-30': {
    name: 'A Inteligência Coletora',
    letterMeaning: 'Cabeça (Razão Solar e Clareza)',
    tarotCardName: 'O Sol',
    attribution: 'Sol',
    colorDescriptions: {
      atziluth: 'Laranja',
      briah: 'Amarelo Dourado',
      yetzirah: 'Âmbar Rico',
      assiah: 'Âmbar Raiado de Vermelho',
    },
    yetziraticText:
      'O Trigésimo Caminho é a Inteligência Coletora, e é assim chamado porque os Astrólogos deduzem dele o julgamento das estrelas e dos signos celestes, e a perfeição de sua ciência, segundo as regras de suas revoluções.',
    consciousnessAspect: 'Iluminação Solar da Mente e do Astral · Leão / Gavião · Olíbano e Canela · Crisólita',
    overview:
      'Conecta Hod (Intelecto) a Yesod (Fundamento Astral). Governado pelo Sol e pela Chave XIX do Tarô, recolhe percepções dispersas e projeta luz consciente clara e cálida sobre o mundo onírico lunar de Yesod.',
    dionFortuneInsight:
      'Dion Fortune nota que o Caminho 30 representa o amanhecer jubiloso após a incerteza lunar: as duas crianças dançando dentro do jardim murado mostram o intelecto (Hod) e o sentir/instinto brincando juntos em harmonia inocente sob a verdade solar.',
    regardieInsight:
      'Israel Regardie explica que "A Inteligência Coletora" reúne todos os raios dos reinos planetários e astrais em síntese racional clara — trazendo a luminosidade viva do Sol de Tiphareth ao alcance da razão desperta.',
    pathworkingMeditation:
      'Entre em um jardim murado banhado de sol e calor laranja-dourado, sentindo as sombras da confusão evaporarem sob uma alegria simples e infantil.',
  },
  'path-31': {
    name: 'A Inteligência Perpétua',
    letterMeaning: 'Dente (Espírito Santo / Línguas de Fogo)',
    tarotCardName: 'O Julgamento (O Aeon)',
    attribution: 'Fogo / Espírito',
    colorDescriptions: {
      atziluth: 'Escarlate Alaranjado Incandescente',
      briah: 'Vermelhão',
      yetzirah: 'Escarlate Salpicado de Ouro',
      assiah: 'Vermelhão Salpicado de Carmesim e Esmeralda',
    },
    yetziraticText:
      'O Trigésimo Primeiro Caminho é a Inteligência Perpétua; mas por que é assim chamado? Porque regula os movimentos do Sol e da Lua em sua ordem própria, cada qual em uma órbita conveniente para si.',
    consciousnessAspect: 'Despertar pelo Fogo Sagrado · Leão · Olíbano · Opala de Fogo',
    overview:
      'Desce pelo lado esquerdo da Árvore de Hod (Intelecto) diretamente para Malkuth (Matéria). Atribuído à Letra Mãe Shin (Fogo/Espírito) e a O Julgamento, retrata o fogo pentecostal despertando a humanidade física para o renascimento espiritual.',
    dionFortuneInsight:
      'Dion Fortune enfatiza que Shin é o Espírito ígneo descendo aos quatro elementos de Malkuth para erguer os "mortos" adormecidos — a consciência mundana presa à rotina — à percepção desperta dos mundos sutis.',
    regardieInsight:
      'Israel Regardie chama o Caminho 31 de "Inteligência Perpétua" do fogo cósmico: quando purificada pelo toque da trombeta de Gabriel, a mente analítica de Hod não duvida mais do espírito, mas testemunha a vitalidade eterna animando a matéria física.',
    pathworkingMeditation:
      'Ouça uma clara trombeta dourada ressoar através do fogo escarlate incandescente, erguendo-se de braços abertos de hábitos estreitos para uma renovação espiritual plenamente desperta.',
  },
  'path-32': {
    name: 'A Inteligência Administrativa',
    letterMeaning: 'Cruz / Sinal (Selo da Conclusão)',
    tarotCardName: 'O Mundo (O Universo)',
    attribution: 'Saturno / Terra',
    colorDescriptions: {
      atziluth: 'Índigo',
      briah: 'Preto',
      yetzirah: 'Preto-Azulado',
      assiah: 'Preto Raiado de Azul',
    },
    yetziraticText:
      'O Trigésimo Segundo Caminho é a Inteligência Administrativa, e é assim chamado porque dirige e associa os movimentos dos sete planetas, conduzindo todos eles em seus próprios cursos adequados.',
    consciousnessAspect: 'Portal da Encarnação e Grande Obra Concluída · Crocodilo · Assa-fétida / Estoraque · Ônix',
    overview:
      'O primeiro caminho encontrado ao ascender de Malkuth (Terra) rumo a Yesod (Astral), e o selo final na descida. Sob Saturno e O Mundo, governa a encarnação física, o tempo, o karma e a conclusão cósmica.',
    dionFortuneInsight:
      'Dion Fortune chama o Caminho 32 de limiar da "Noite Escura" da primeira iniciação e prova saturnina da perseverança: aqui o aspirante aprende a vencer a inércia física e cruzar conscientemente o véu que separa a matéria (Malkuth) da Luz Astral (Yesod).',
    regardieInsight:
      'Israel Regardie explica que "A Inteligência Administrativa" sintetiza todas as sete correntes planetárias em Malkuth — simbolizada pelo Dançarino dentro da coroa de louros cercado pelas quatro bestas querúbicas dos elementos, unindo Terra e Céu.',
    pathworkingMeditation:
      'Permaneça ereto dentro de uma guirlanda oval verde flanqueada pelos quatro guardiões elementais fixos, sentindo a quietude índigo-negra saturnina ancorar firmemente o céu na terra.',
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
