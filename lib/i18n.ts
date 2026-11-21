export type Language = 'pt' | 'en';

export interface UiStrings {
  header: {
    titlePrefix: string;
    titleSuffix: string;
    subtitle: string;
    controls: string;
    guide: string;
    guideAria: string;
    referenceConsole: string;
    languageToggleAria: string;
  };
  mobileNav: {
    ariaLabel: string;
    tree: string;
    index777: string;
    pillars: string;
    oracle: string;
  };
  console: {
    title: string;
    subtitle: string;
    tab777: string;
    tabPillars: string;
    tabOracle: string;
    collapseAria: string;
    expandAria: string;
  };
  controls: {
    scale: string;
    overlay: string;
    attribution: string;
    resetControls: string;
    reset: string;
    done: string;
    sheetTitle: string;
    sheetSubtitle: string;
    closeSheetAria: string;
    goldenDawnScale: string;
    diagramOverlay: string;
    threePillarsBackdrop: string;
    showPillarsLabel: string;
    on: string;
    off: string;
    scales: Array<{
      id: 'atziluth' | 'briah' | 'yetzirah' | 'assiah';
      label: string;
      subtitle: string;
    }>;
    modes: Array<{
      id: 'default' | 'lightning' | 'serpent';
      label: string;
    }>;
    filterOptions: Array<{
      label: string;
      value: string;
    }>;
  };
  canvas: {
    treeOfLife: string;
    scaleWord: string;
    pillars: string;
    zoomIn: string;
    zoomOut: string;
    resetZoom: string;
    clickToResetZoom: string;
    zoomPercentLabel: string;
    svgAriaLabel: string;
    pillarSeverity: string;
    pillarMildness: string;
    pillarMercy: string;
    pillarSeveritySubtitle: string;
    pillarMercySubtitle: string;
    tooltipSphere: (num: number) => string;
    tooltipPillar: string;
    tooltipDivineName: string;
    tooltipArchangel: string;
    tooltipAstrological: string;
    tooltipPath: (num: number, letter: string) => string;
    tooltipTitle: string;
    tooltipLetterMeaning: string;
  };
  drawer: {
    emptyTitle: string;
    emptyDescription: string;
    statSephiroth: string;
    statPaths: string;
    statScales: string;
    closeAria: string;
    sphereLabel: (num: number) => string;
    pillarSuffix: (pillarDisplay: string) => string;
    pathLabel: (num: number, letterName: string) => string;
    tarotKeySubtitle: (tarotKey: string, name: string) => string;
    tabs: {
      overview: string;
      attributions: string;
      commentary: string;
      meditation: string;
    };
    overview: {
      coreSymbolism: string;
      planet: string;
      yetziraticTitle: string;
      spiritualExperience: string;
      magicalImage: string;
      virtue: string;
      vice: string;
      fourScales: string;
      scaleTitles: {
        atziluth: string;
        briah: string;
        yetzirah: string;
        assiah: string;
      };
      from: string;
      to: string;
      pathTitleHeading: string;
      letterMeaning: string;
      attribution: string;
      overviewSymbolism: string;
      yetziraticText: string;
    };
    attributions: {
      divineName: string;
      archangel: string;
      angelicOrder: string;
      planet: string;
      astrological: string;
      yetziraticTitle: string;
      soulPart: string;
      element: string;
      bodyPart: string;
      gemstone: string;
      incensePlants: string;
      qliphoth: string;
      symbols: string;
      tarotAttribution: string;
      letterAndMeaning: string;
      tarotKey: string;
      esotericTitle: string;
      pathAttribution: string;
      consciousnessAspect: string;
      yetziraticText: string;
    };
    commentary: {
      dionFortuneTitle: string;
      israelRegardieTitle: string;
      dionFortunePathTitle: string;
      israelRegardiePathTitle: string;
      yetziraticTitle: string;
      traditionalPathTitle: string;
      traditionalPathBody: (
        num: number,
        fromName: string,
        toName: string,
        tarotCardName: string,
        attribution: string
      ) => string;
    };
    meditation: {
      traditionalTitle: string;
      oracleTitle: string;
      oracleDescription: (target: string) => string;
      generateButton: string;
    };
  };
  table: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    clearSearchAria: string;
    sephirothTab: (count: number) => string;
    pathsTab: (count: number) => string;
    emptySephiroth: (query: string) => string;
    emptyPaths: (query: string) => string;
    headersSephiroth: {
      num: string;
      sephira: string;
      hebrew: string;
      translation: string;
      divineName: string;
      archangel: string;
      astrological: string;
      experience: string;
    };
    headersPaths: {
      num: string;
      letter: string;
      meaning: string;
      tarotKey: string;
      attribution: string;
      title: string;
    };
  };
  pillarsExplorer: {
    title: string;
    subtitle: string;
    characteristics: string;
    sephirothOnPillar: string;
  };
  aiGuide: {
    title: string;
    subtitle: string;
    welcomeMessage: string;
    quickPrompts: Array<{ label: string; query: string }>;
    loading: string;
    placeholder: string;
    send: string;
    sendAria: string;
    errorPrefix: string;
    connectionError: string;
    meditationPrompt: (name: string) => string;
  };
  studyModal: {
    ariaLabel: string;
    title: string;
    closeAria: string;
    closeButton: string;
    items: Array<{ lead: string; body: string }>;
  };
}

export const UI_STRINGS: Record<Language, UiStrings> = {
  pt: {
    header: {
      titlePrefix: 'Otz Chiim',
      titleSuffix: ' · A Árvore da Vida',
      subtitle: 'Referência de Cabala Hermética · Tradição da Aurora Dourada',
      controls: 'Controles',
      guide: 'Guia',
      guideAria: 'Guia de Estudo',
      referenceConsole: 'Painel de Referência',
      languageToggleAria: 'Selecionar idioma',
    },
    mobileNav: {
      ariaLabel: 'Navegação principal',
      tree: 'Árvore',
      index777: 'Índice 777',
      pillars: 'Pilares',
      oracle: 'Oráculo',
    },
    console: {
      title: 'Painel de Referência Hermética',
      subtitle: 'Índice 777, Análise dos 3 Pilares e Oráculo de Pathworking',
      tab777: 'Índice 777',
      tabPillars: '3 Pilares',
      tabOracle: 'Oráculo',
      collapseAria: 'Recolher Painel de Referência',
      expandAria: 'Expandir Painel de Referência',
    },
    controls: {
      scale: 'Escala',
      overlay: 'Traçado',
      attribution: 'Atribuição',
      resetControls: 'Redefinir controles',
      reset: 'Redefinir',
      done: 'Concluir',
      sheetTitle: 'Controles do Diagrama',
      sheetSubtitle: 'Escalas de cor, traçados cósmicos, pilares e filtros',
      closeSheetAria: 'Fechar controles do diagrama',
      goldenDawnScale: 'Escala de Cores da Aurora Dourada',
      diagramOverlay: 'Traçado no Diagrama',
      threePillarsBackdrop: 'Fundo dos Três Pilares',
      showPillarsLabel: 'Exibir Pilares da Severidade, Equilíbrio e Misericórdia',
      on: 'LIGADO',
      off: 'DESLIGADO',
      scales: [
        { id: 'atziluth', label: 'Atziluth', subtitle: 'Arquetípica (Rei)' },
        { id: 'briah', label: 'Briah', subtitle: 'Criativa (Rainha)' },
        { id: 'yetzirah', label: 'Yetzirah', subtitle: 'Formativa (Príncipe)' },
        { id: 'assiah', label: 'Assiah', subtitle: 'Material (Princesa)' },
      ],
      modes: [
        { id: 'default', label: 'Padrão' },
        { id: 'lightning', label: 'Relâmpago' },
        { id: 'serpent', label: 'Serpente' },
      ],
      filterOptions: [
        { label: 'Todas as Atribuições', value: '' },
        { label: 'Elemento Fogo', value: 'fire' },
        { label: 'Elemento Água', value: 'water' },
        { label: 'Elemento Ar', value: 'air' },
        { label: 'Elemento Terra', value: 'earth' },
        { label: 'Sol / Solar', value: 'sun' },
        { label: 'Lua / Lunar', value: 'moon' },
        { label: 'Mercúrio', value: 'mercury' },
        { label: 'Vênus', value: 'venus' },
        { label: 'Marte', value: 'mars' },
        { label: 'Júpiter', value: 'jupiter' },
        { label: 'Saturno', value: 'saturn' },
        { label: 'Pilar da Misericórdia', value: 'mercy' },
        { label: 'Pilar da Severidade', value: 'severity' },
        { label: 'Pilar do Equilíbrio', value: 'mildness' },
      ],
    },
    canvas: {
      treeOfLife: 'Árvore da Vida',
      scaleWord: 'Escala',
      pillars: 'Pilares',
      zoomIn: 'Aumentar zoom',
      zoomOut: 'Diminuir zoom',
      resetZoom: 'Redefinir zoom',
      clickToResetZoom: 'Clique para redefinir o zoom',
      zoomPercentLabel: '100% de zoom',
      svgAriaLabel:
        'Diagrama interativo da Árvore da Vida da Cabala Hermética com 10 Sephiroth, Daath e 22 caminhos',
      pillarSeverity: 'Severidade (Boaz)',
      pillarMildness: 'Equilíbrio (Meio)',
      pillarMercy: 'Misericórdia (Jachin)',
      pillarSeveritySubtitle: 'Pilar da Severidade',
      pillarMercySubtitle: 'Pilar da Misericórdia',
      tooltipSphere: (num) => (num === 0 ? "Da'ath" : `Sephirah ${num}`),
      tooltipPillar: 'Pilar:',
      tooltipDivineName: 'Nome Divino:',
      tooltipArchangel: 'Arcanjo:',
      tooltipAstrological: 'Astrológico:',
      tooltipPath: (num, letter) => `Caminho ${num} (${letter})`,
      tooltipTitle: 'Título:',
      tooltipLetterMeaning: 'Significado da Letra:',
    },
    drawer: {
      emptyTitle: 'Selecione uma Esfera ou Caminho',
      emptyDescription:
        "Toque em qualquer uma das 10 Sephiroth, Da'ath ou nos 22 caminhos hebraicos da Árvore da Vida para inspecionar nomes divinos, escalas de cores da Aurora Dourada, arcanos do Tarô e comentários de pathworking.",
      statSephiroth: 'Sephiroth',
      statPaths: 'Caminhos',
      statScales: 'Escalas de Cor',
      closeAria: 'Fechar painel de detalhes',
      sphereLabel: (num) => (num === 0 ? "Da'ath" : `Esfera ${num}`),
      pillarSuffix: (pillarDisplay) => `Pilar (${pillarDisplay})`,
      pathLabel: (num, letterName) => `Caminho ${num} (${letterName})`,
      tarotKeySubtitle: (tarotKey, name) => `Arcano ${tarotKey} · ${name}`,
      tabs: {
        overview: 'Visão Geral',
        attributions: 'Atribuições',
        commentary: 'Excertos',
        meditation: 'Pathworking',
      },
      overview: {
        coreSymbolism: 'Simbolismo Central e Essência',
        planet: 'Planeta / Esfera Celeste',
        yetziraticTitle: 'Título Yetzirático',
        spiritualExperience: 'Experiência Espiritual',
        magicalImage: 'Imagem Mágica',
        virtue: 'Virtude',
        vice: 'Vício / Ilusão',
        fourScales: 'As Quatro Escalas de Cor da Aurora Dourada',
        scaleTitles: {
          atziluth: 'Atziluth (Arquetípica)',
          briah: 'Briah (Criativa)',
          yetzirah: 'Yetzirah (Formativa)',
          assiah: 'Assiah (Material)',
        },
        from: 'De',
        to: 'Para',
        pathTitleHeading: 'Título do Caminho e Inteligência Esotérica',
        letterMeaning: 'Significado da Letra Hebraica',
        attribution: 'Atribuição',
        overviewSymbolism: 'Visão Geral e Simbolismo',
        yetziraticText: 'Texto do Sepher Yetzirah (32 Caminhos da Sabedoria)',
      },
      attributions: {
        divineName: 'Nome Divino',
        archangel: 'Arcanjo',
        angelicOrder: 'Ordem Angélica',
        planet: 'Planeta / Esfera Celeste',
        astrological: 'Chakra Mundano (Astrológico)',
        yetziraticTitle: 'Inteligência Yetzirática',
        soulPart: 'Parte da Alma (Psicologia Cabalística)',
        element: 'Elemento',
        bodyPart: 'Microcosmo / Parte do Corpo',
        gemstone: 'Pedra Preciosa',
        incensePlants: 'Incensos e Plantas',
        qliphoth: 'Qliphoth (Aspecto Adverso / Sombra)',
        symbols: 'Símbolos Mágicos (777)',
        tarotAttribution: 'Atribuição no Tarô',
        letterAndMeaning: 'Letra Hebraica e Significado',
        tarotKey: 'Chave do Tarô',
        esotericTitle: 'Título Esotérico',
        pathAttribution: 'Regência Astrológica / Elemental',
        consciousnessAspect: 'Correspondências 777 (Bestas, Plantas e Minerais)',
        yetziraticText: 'Passagem do Sepher Yetzirah',
      },
      commentary: {
        dionFortuneTitle: 'Dion Fortune — "A Cabala Mística"',
        israelRegardieTitle: 'Israel Regardie — "O Jardim das Romãs" e "O Pilar do Meio"',
        dionFortunePathTitle: 'Dion Fortune — Simbolismo do Caminho',
        israelRegardiePathTitle: 'Israel Regardie — Análise Hermética e 777',
        yetziraticTitle: 'Sepher Yetzirah — Os Trinta e Dois Caminhos',
        traditionalPathTitle: 'Atribuição Hermética Tradicional do Caminho',
        traditionalPathBody: (num, fromName, toName, tarotCardName, attribution) =>
          `O Caminho ${num} conecta ${fromName} a ${toName}. Nas correspondências do 777, representa a ponte transformadora regida por ${tarotCardName} e pela força astrológica ou elemental de ${attribution}.`,
      },
      meditation: {
        traditionalTitle: 'Meditação Tradicional de Pathworking',
        oracleTitle: 'Oráculo de Pathworking Guiado',
        oracleDescription: (target) =>
          `Gere uma jornada de meditação guiada passo a passo, especialmente adaptada para ${target}.`,
        generateButton: 'Gerar Meditação Guiada',
      },
    },
    table: {
      title: 'Índice Mestre de Correspondências',
      subtitle:
        'Referência 777 entre Nomes Divinos, Arcanjos, Astrologia e Chaves do Tarô.',
      searchPlaceholder: 'Buscar hebraico, Arcanjo, Tarô...',
      clearSearchAria: 'Limpar busca',
      sephirothTab: (count) => `Sephiroth (${count})`,
      pathsTab: (count) => `22 Caminhos (${count})`,
      emptySephiroth: (query) => `Nenhuma Sephirah corresponde a "${query}".`,
      emptyPaths: (query) => `Nenhum Caminho corresponde a "${query}".`,
      headersSephiroth: {
        num: '#',
        sephira: 'Sephirah',
        hebrew: 'Hebraico',
        translation: 'Tradução',
        divineName: 'Nome Divino',
        archangel: 'Arcanjo',
        astrological: 'Astrológico',
        experience: 'Experiência Espiritual',
      },
      headersPaths: {
        num: 'Caminho #',
        letter: 'Letra Hebraica',
        meaning: 'Significado',
        tarotKey: 'Chave do Tarô',
        attribution: 'Atribuição',
        title: 'Título da Inteligência',
      },
    },
    pillarsExplorer: {
      title: 'Os Três Pilares da Árvore da Vida',
      subtitle:
        'Explore as três colunas cósmicas que equilibram Força (Misericórdia), Forma (Severidade) e Consciência (Equilíbrio).',
      characteristics: 'Características da Coluna',
      sephirothOnPillar: 'Sephiroth neste Pilar',
    },
    aiGuide: {
      title: 'Guia e Oráculo de Cabala Hermética',
      subtitle: 'Meditações de pathworking, atribuições 777 e síntese hermética',
      welcomeMessage:
        'Saudações, buscador dos Mistérios. Sou seu Guia de Cabala Hermética, versado nas tradições da Aurora Dourada, Dion Fortune, Israel Regardie e 777. Como posso auxiliar seu pathworking hoje?',
      quickPrompts: [
        {
          label: 'Exercício do Pilar do Meio',
          query:
            'Explique o ritual do Exercício do Pilar do Meio e como ele equilibra a energia entre Kether, Tiphareth, Yesod e Malkuth.',
        },
        {
          label: 'Binah vs Geburah',
          query:
            'Compare a visão de Dion Fortune sobre Binah e Geburah no Pilar da Severidade.',
        },
        {
          label: 'Caminho 13 e o Abismo',
          query:
            'Como o Caminho 13 (A Sacerdotisa / Gimel) atravessa o Abismo de Kether até Tiphareth?',
        },
      ],
      loading: 'Consultando os Arquivos Herméticos...',
      placeholder: 'Pergunte sobre Sephiroth, Tarô ou pathworking...',
      send: 'Enviar',
      sendAria: 'Enviar mensagem',
      errorPrefix: 'Erro ao consultar o Oráculo Hermético:',
      connectionError: 'Verifique sua conexão e tente novamente.',
      meditationPrompt: (name) =>
        `Gere uma meditação guiada de Pathworking passo a passo detalhada para ${name}.`,
    },
    studyModal: {
      ariaLabel: 'Como Estudar a Árvore da Vida',
      title: 'Como Estudar a Árvore da Vida',
      closeAria: 'Fechar guia',
      closeButton: 'Fechar Guia',
      items: [
        {
          lead: "Esferas (1–10 + Da'ath):",
          body: 'Clique ou toque em qualquer esfera do diagrama para abrir seus nomes divinos, arcanjos, atribuições astrológicas e comentários clássicos.',
        },
        {
          lead: 'Caminhos de Ligação (11–32):',
          body: 'Clique em qualquer letra hebraica ou linha de caminho para inspecionar seu Arcano Maior do Tarô e seu título esotérico.',
        },
        {
          lead: 'Escalas de Cores da Aurora Dourada:',
          body: 'Alterne entre as escalas Atziluth (Rei), Briah (Rainha), Yetzirah (Príncipe) e Assiah (Princesa) na barra superior ou em Controles no celular.',
        },
        {
          lead: 'Traçados no Diagrama:',
          body: 'Ative o Relâmpago Flamejante da descida cósmica ou a Serpente da Sabedoria na ascensão pelos caminhos.',
        },
        {
          lead: 'Painel de Referência:',
          body: 'Expanda o Painel de Referência abaixo da Árvore em tablets/desktop — ou use as abas inferiores no celular — para explorar o Índice 777, os 3 Pilares e o Oráculo de Pathworking.',
        },
      ],
    },
  },
  en: {
    header: {
      titlePrefix: 'Otz Chiim',
      titleSuffix: ' · The Tree of Life',
      subtitle: 'Hermetic Qabalah Reference · Golden Dawn Tradition',
      controls: 'Controls',
      guide: 'Guide',
      guideAria: 'Study Guide',
      referenceConsole: 'Reference Console',
      languageToggleAria: 'Select language',
    },
    mobileNav: {
      ariaLabel: 'Primary navigation',
      tree: 'Tree',
      index777: '777 Index',
      pillars: 'Pillars',
      oracle: 'Oracle',
    },
    console: {
      title: 'Hermetic Reference Console',
      subtitle: '777 Index, 3 Pillars Analysis, and Pathworking Oracle',
      tab777: '777 Index',
      tabPillars: '3 Pillars',
      tabOracle: 'Oracle',
      collapseAria: 'Collapse Reference Console',
      expandAria: 'Expand Reference Console',
    },
    controls: {
      scale: 'Scale',
      overlay: 'Overlay',
      attribution: 'Attribution',
      resetControls: 'Reset controls',
      reset: 'Reset',
      done: 'Done',
      sheetTitle: 'Diagram Controls',
      sheetSubtitle: 'Color scales, cosmic overlays, pillars & filters',
      closeSheetAria: 'Close diagram controls',
      goldenDawnScale: 'Golden Dawn Color Scale',
      diagramOverlay: 'Diagram Overlay',
      threePillarsBackdrop: 'Three Pillars Backdrop',
      showPillarsLabel: 'Show Severity, Mildness & Mercy Pillars',
      on: 'ON',
      off: 'OFF',
      scales: [
        { id: 'atziluth', label: 'Atziluth', subtitle: 'Archetypal (King)' },
        { id: 'briah', label: 'Briah', subtitle: 'Creative (Queen)' },
        { id: 'yetzirah', label: 'Yetzirah', subtitle: 'Formative (Prince)' },
        { id: 'assiah', label: 'Assiah', subtitle: 'Material (Princess)' },
      ],
      modes: [
        { id: 'default', label: 'Standard' },
        { id: 'lightning', label: 'Lightning' },
        { id: 'serpent', label: 'Serpent' },
      ],
      filterOptions: [
        { label: 'All Attributions', value: '' },
        { label: 'Fire Element', value: 'fire' },
        { label: 'Water Element', value: 'water' },
        { label: 'Air Element', value: 'air' },
        { label: 'Earth Element', value: 'earth' },
        { label: 'Solar / Sun', value: 'sun' },
        { label: 'Lunar / Moon', value: 'moon' },
        { label: 'Mercury', value: 'mercury' },
        { label: 'Venus', value: 'venus' },
        { label: 'Mars', value: 'mars' },
        { label: 'Jupiter', value: 'jupiter' },
        { label: 'Saturn', value: 'saturn' },
        { label: 'Pillar of Mercy', value: 'mercy' },
        { label: 'Pillar of Severity', value: 'severity' },
        { label: 'Pillar of Mildness', value: 'mildness' },
      ],
    },
    canvas: {
      treeOfLife: 'Tree of Life',
      scaleWord: 'Scale',
      pillars: 'Pillars',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      resetZoom: 'Reset zoom',
      clickToResetZoom: 'Click to reset zoom',
      zoomPercentLabel: '100% zoom',
      svgAriaLabel:
        'Interactive Hermetic Qabalah Tree of Life diagram with 10 Sephiroth, Daath, and 22 connecting paths',
      pillarSeverity: 'Severity (Boaz)',
      pillarMildness: 'Mildness (Middle)',
      pillarMercy: 'Mercy (Jachin)',
      pillarSeveritySubtitle: 'Pillar of Severity',
      pillarMercySubtitle: 'Pillar of Mercy',
      tooltipSphere: (num) => (num === 0 ? "Da'ath" : `Sephira ${num}`),
      tooltipPillar: 'Pillar:',
      tooltipDivineName: 'Divine Name:',
      tooltipArchangel: 'Archangel:',
      tooltipAstrological: 'Astrological:',
      tooltipPath: (num, letter) => `Path ${num} (${letter})`,
      tooltipTitle: 'Title:',
      tooltipLetterMeaning: 'Letter Meaning:',
    },
    drawer: {
      emptyTitle: 'Select a Sphere or Path',
      emptyDescription:
        "Tap any of the 10 Sephiroth, Da'ath, or 22 Hebrew letter paths on the Tree of Life to inspect divine names, Golden Dawn color scales, Tarot keys, and pathworking commentary here.",
      statSephiroth: 'Sephiroth',
      statPaths: 'Paths',
      statScales: 'Color Scales',
      closeAria: 'Close details panel',
      sphereLabel: (num) => (num === 0 ? "Da'ath" : `Sphere ${num}`),
      pillarSuffix: (pillarDisplay) => `${pillarDisplay} Pillar`,
      pathLabel: (num, letterName) => `Path ${num} (${letterName})`,
      tarotKeySubtitle: (tarotKey, name) => `Tarot Key ${tarotKey} · ${name}`,
      tabs: {
        overview: 'Overview',
        attributions: 'Attributions',
        commentary: 'Excerpts',
        meditation: 'Pathworking',
      },
      overview: {
        coreSymbolism: 'Core Symbolism & Essence',
        planet: 'Planet / Celestial Sphere',
        yetziraticTitle: 'Yetziratic Title',
        spiritualExperience: 'Spiritual Experience',
        magicalImage: 'Magical Image',
        virtue: 'Virtue',
        vice: 'Vice / Illusion',
        fourScales: 'Golden Dawn Four Color Scales',
        scaleTitles: {
          atziluth: 'Atziluth (Archetypal)',
          briah: 'Briah (Creative)',
          yetzirah: 'Yetzirah (Formative)',
          assiah: 'Assiah (Material)',
        },
        from: 'From',
        to: 'To',
        pathTitleHeading: 'Path Title & Esoteric Intelligence',
        letterMeaning: 'Hebrew Letter Meaning',
        attribution: 'Attribution',
        overviewSymbolism: 'Overview & Symbolism',
        yetziraticText: 'Sepher Yetzirah Text (32 Paths of Wisdom)',
      },
      attributions: {
        divineName: 'Divine Name',
        archangel: 'Archangel',
        angelicOrder: 'Angelic Order',
        planet: 'Planet / Celestial Sphere',
        astrological: 'Mundane Chakra (Astrological)',
        yetziraticTitle: 'Yetziratic Intelligence',
        soulPart: 'Part of the Soul (Qabalistic Psychology)',
        element: 'Element',
        bodyPart: 'Microcosm / Body Part',
        gemstone: 'Gemstone',
        incensePlants: 'Incense & Botanicals',
        qliphoth: 'Qliphoth (Adverse Aspect / Shell)',
        symbols: 'Magical Symbols (777)',
        tarotAttribution: 'Tarot Attribution',
        letterAndMeaning: 'Hebrew Letter & Meaning',
        tarotKey: 'Tarot Key',
        esotericTitle: 'Esoteric Title',
        pathAttribution: 'Astrological / Elemental Rulership',
        consciousnessAspect: '777 Correspondences (Sacred Beasts, Plants & Stones)',
        yetziraticText: 'Sepher Yetzirah Passage',
      },
      commentary: {
        dionFortuneTitle: 'Dion Fortune — "The Mystical Qabalah"',
        israelRegardieTitle: 'Israel Regardie — "A Garden of Pomegranates" & "The Middle Pillar"',
        dionFortunePathTitle: 'Dion Fortune — Path Symbolism',
        israelRegardiePathTitle: 'Israel Regardie — Hermetic & 777 Analysis',
        yetziraticTitle: 'Sepher Yetzirah — The Thirty-Two Paths',
        traditionalPathTitle: 'Traditional Hermetic Path Attribution',
        traditionalPathBody: (num, fromName, toName, tarotCardName, attribution) =>
          `Path ${num} connects ${fromName} to ${toName}. In 777 correspondences, it represents the transformative bridge governed by ${tarotCardName} and the astrological or elemental force of ${attribution}.`,
      },
      meditation: {
        traditionalTitle: 'Traditional Pathworking Meditation',
        oracleTitle: 'Guided Pathworking Oracle',
        oracleDescription: (target) =>
          `Generate an expanded step-by-step guided meditation journey specifically tailored to ${target}.`,
        generateButton: 'Generate Guided Meditation',
      },
    },
    table: {
      title: 'Master Correspondence Index',
      subtitle:
        '777 reference across Divine Names, Archangels, Astrology, and Tarot keys.',
      searchPlaceholder: 'Search Hebrew, Archangel, Tarot...',
      clearSearchAria: 'Clear search',
      sephirothTab: (count) => `Sephiroth (${count})`,
      pathsTab: (count) => `22 Paths (${count})`,
      emptySephiroth: (query) => `No Sephiroth match "${query}".`,
      emptyPaths: (query) => `No Paths match "${query}".`,
      headersSephiroth: {
        num: '#',
        sephira: 'Sephira',
        hebrew: 'Hebrew',
        translation: 'Translation',
        divineName: 'Divine Name',
        archangel: 'Archangel',
        astrological: 'Astrological',
        experience: 'Spiritual Experience',
      },
      headersPaths: {
        num: 'Path #',
        letter: 'Hebrew Letter',
        meaning: 'Meaning',
        tarotKey: 'Tarot Key',
        attribution: 'Attribution',
        title: 'Intelligence Title',
      },
    },
    pillarsExplorer: {
      title: 'The Three Pillars of the Tree of Life',
      subtitle:
        'Explore the three cosmic columns balancing Force (Mercy), Form (Severity), and Consciousness (Equilibrium).',
      characteristics: 'Column Characteristics',
      sephirothOnPillar: 'Sephiroth on this Pillar',
    },
    aiGuide: {
      title: 'Hermetic Qabalah Guide & Oracle',
      subtitle: 'Pathworking meditations, 777 attributions, and Hermetic synthesis',
      welcomeMessage:
        'Greetings, seeker of the Mysteries. I am your Hermetic Qabalah Guide, versed in the traditions of the Golden Dawn, Dion Fortune, Israel Regardie, and 777. How may I assist your pathworking today?',
      quickPrompts: [
        {
          label: 'Middle Pillar Exercise',
          query:
            'Explain the Middle Pillar exercise ritual and how it balances energy across Kether, Tiphareth, Yesod, and Malkuth.',
        },
        {
          label: 'Binah vs Geburah',
          query: "Compare Dion Fortune's view of Binah vs Geburah on the Pillar of Severity.",
        },
        {
          label: 'Path 13 & The Abyss',
          query:
            'How does Path 13 (The High Priestess / Gimel) cross the Abyss from Kether to Tiphareth?',
        },
      ],
      loading: 'Consulting Hermetic Archives...',
      placeholder: 'Ask about Sephiroth, Tarot, or pathworking...',
      send: 'Send',
      sendAria: 'Send message',
      errorPrefix: 'Error contacting Hermetic Oracle:',
      connectionError: 'Please check your connection and try again.',
      meditationPrompt: (name) =>
        `Generate a detailed step-by-step guided Pathworking Meditation for ${name}.`,
    },
    studyModal: {
      ariaLabel: 'How to Study the Tree of Life',
      title: 'How to Study the Tree of Life',
      closeAria: 'Close guide',
      closeButton: 'Close Guide',
      items: [
        {
          lead: "Spheres (1–10 + Da'ath):",
          body: 'Click or tap any sphere on the diagram to slide open its divine names, archangels, astrological attributions, and classic commentary.',
        },
        {
          lead: 'Connecting Pathways (11–32):',
          body: 'Click any Hebrew letter or path line to inspect its Tarot Major Arcana key and esoteric title.',
        },
        {
          lead: 'Golden Dawn Color Scales:',
          body: 'Switch between Atziluth (King), Briah (Queen), Yetzirah (Prince), and Assiah (Princess) scales in the top toolbar or mobile Controls sheet.',
        },
        {
          lead: 'Diagram Overlays:',
          body: 'Toggle the Lightning Flash cosmic descent or Serpent of Wisdom ascent paths.',
        },
        {
          lead: 'Reference Console:',
          body: 'Expand the Reference Console below the Tree on tablet/desktop—or use the mobile bottom tabs—to browse the 777 Index, 3 Pillars, and Pathworking Oracle.',
        },
      ],
    },
  },
};
