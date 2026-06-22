import type { SiteSettings } from "./types";

export const SITE = {
  name: "Escola e Creche Pirilampo",
  shortName: "Escola Pirilampo",
  tagline: "Onde cada criança brilha",
  city: "Itabatã",
  district: "Mucuri",
  state: "BA",
  url: "https://escolapirilampo.com.br",
} as const;

/** Configurações padrão — usadas quando o Firestore ainda não respondeu
 *  ou não está configurado. Mantêm o site 100% funcional sem backend. */
export const DEFAULT_SETTINGS: SiteSettings = {
  heroTitle: "Onde cada criança aprende a brilhar",
  heroSubtitle:
    "Educação acolhedora e de excelência em Itabatã, da creche ao 9º ano. Um lugar seguro para crescer, descobrir e sonhar.",
  phone: "(73) 99999-0000",
  whatsapp: "5573999990000",
  instagram: "pirilampo_escola",
  address: "Itabatã, Mucuri — Bahia",
  instagramWidget: "",
  enrollmentStatus: "open",
  enrollmentNote: "",
};

export const WHATSAPP_ENROLL_MESSAGE =
  "Olá! Gostaria de obter informações sobre matrícula.";

export const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "A Escola" },
  { href: "/segmentos", label: "Segmentos" },
  { href: "/projetos", label: "Projetos" },
  { href: "/galeria", label: "Galeria" },
  { href: "/momentos", label: "Mural" },
  { href: "/contato", label: "Contato" },
] as const;

export const SEGMENTS = [
  {
    slug: "creche",
    name: "Creche",
    age: "4 meses a 3 anos",
    color: "blossom",
    summary:
      "Os primeiros passos longe do colo, com carinho de quem entende de bebês.",
    description:
      "Um ambiente seguro, higiênico e afetuoso onde os bebês recebem cuidado individual, estímulos sensoriais e muito aconchego. Rotina de sono, alimentação e brincadeiras pensada para cada fase do desenvolvimento.",
    highlights: [
      "Cuidado individualizado e afetivo",
      "Estímulos sensoriais e motores",
      "Rotina de sono e alimentação acompanhada",
      "Comunicação diária com as famílias",
    ],
  },
  {
    slug: "maternal",
    name: "Maternal",
    age: "3 a 4 anos",
    color: "glow",
    summary:
      "A descoberta do mundo pela brincadeira, pela linguagem e pela amizade.",
    description:
      "Na fase do encantamento, a criança aprende brincando: amplia o vocabulário, desenvolve autonomia e começa a viver em grupo. Música, contação de histórias e arte fazem parte de todos os dias.",
    highlights: [
      "Desenvolvimento da linguagem e da fala",
      "Autonomia e socialização",
      "Música, arte e contação de histórias",
      "Coordenação motora pela brincadeira",
    ],
  },
  {
    slug: "educacao-infantil",
    name: "Educação Infantil",
    age: "4 a 5 anos",
    color: "sky",
    summary:
      "A base do letramento e do raciocínio, construída com leveza e propósito.",
    description:
      "Preparamos o caminho para a alfabetização respeitando o tempo de cada criança. Projetos pedagógicos, jogos e vivências constroem a curiosidade, o pensamento lógico e a confiança para a próxima etapa.",
    highlights: [
      "Pré-alfabetização e letramento",
      "Raciocínio lógico e matemático",
      "Projetos pedagógicos por temas",
      "Desenvolvimento socioemocional",
    ],
  },
  {
    slug: "ensino-fundamental",
    name: "Ensino Fundamental",
    age: "1º ao 9º ano",
    color: "sky",
    summary:
      "Conhecimento sólido, pensamento crítico e valores para a vida toda.",
    description:
      "Do 1º ao 9º ano, unimos uma base acadêmica forte ao cuidado com a formação humana. Acompanhamento próximo, leitura, projetos e tecnologia preparam o estudante para os desafios de cada série com autonomia e responsabilidade.",
    highlights: [
      "Base acadêmica sólida e atualizada",
      "Acompanhamento individual da aprendizagem",
      "Incentivo à leitura e à pesquisa",
      "Formação de valores e cidadania",
    ],
  },
] as const;

export const DIFFERENTIALS = [
  {
    icon: "HeartHandshake",
    title: "Acolhimento de verdade",
    text: "Turmas com atenção individual e uma equipe que conhece cada criança pelo nome.",
  },
  {
    icon: "ShieldCheck",
    title: "Ambiente seguro",
    text: "Estrutura pensada para o bem-estar e a segurança em cada espaço da escola.",
  },
  {
    icon: "Sparkles",
    title: "Ensino de excelência",
    text: "Proposta pedagógica sólida que respeita o tempo e o potencial de cada aluno.",
  },
  {
    icon: "Users",
    title: "Parceria com as famílias",
    text: "Comunicação próxima e transparente para caminharmos juntos na educação.",
  },
  {
    icon: "Palette",
    title: "Arte e cultura",
    text: "Projetos de literatura, música e artes que despertam a criatividade.",
  },
  {
    icon: "Smile",
    title: "Desenvolvimento integral",
    text: "Cuidamos do cognitivo, do emocional e do social — a criança por inteiro.",
  },
] as const;

export const PROJECTS = [
  {
    title: "Cantinho da Leitura",
    tag: "Literatura",
    text: "Mediação de leitura, contação de histórias e empréstimo de livros para criar leitores apaixonados desde cedo.",
  },
  {
    title: "Ateliê de Artes",
    tag: "Artes",
    text: "Pintura, modelagem e colagem que transformam ideias em obras e desenvolvem a coordenação e a expressão.",
  },
  {
    title: "Nossas Tradições",
    tag: "Datas comemorativas",
    text: "Festa Junina, Dia das Mães e outras datas vividas com afeto, valorizando a cultura e a família.",
  },
  {
    title: "Pirilampo na Cultura",
    tag: "Atividades culturais",
    text: "Apresentações, feiras e mostras culturais que dão palco para cada talento aparecer.",
  },
  {
    title: "Sentir e Conviver",
    tag: "Socioemocional",
    text: "Rodas de conversa e dinâmicas que ensinam empatia, respeito e a lidar com as emoções.",
  },
  {
    title: "Datas que Marcam",
    tag: "Eventos especiais",
    text: "Semana da Criança, passeios e celebrações que viram memórias para a vida toda.",
  },
] as const;

export const FAQ = [
  {
    q: "A partir de que idade a escola recebe crianças?",
    a: "Atendemos da Creche (a partir de 4 meses) ao 9º ano do Ensino Fundamental — passando pelo Maternal e pela Educação Infantil. Cada fase tem uma proposta pensada para o momento do desenvolvimento.",
  },
  {
    q: "Como faço a matrícula?",
    a: "É simples: fale com a nossa equipe pelo WhatsApp. Explicamos as vagas disponíveis, os valores e a proposta pedagógica, e ajudamos você a agendar uma visita para conhecer a escola de pertinho.",
  },
  {
    q: "Quais documentos são necessários para matricular?",
    a: "Em geral: certidão de nascimento da criança, documento de identidade dos responsáveis, comprovante de residência e carteira de vacinação. Para transferências, também a declaração ou histórico da escola anterior. A secretaria confirma a lista completa no momento da matrícula.",
  },
  {
    q: "Posso agendar uma visita antes de decidir?",
    a: "Com certeza — e recomendamos! Agende pelo WhatsApp e venha conhecer os espaços, a equipe e o nosso jeito de cuidar e ensinar. Será um prazer receber a sua família.",
  },
  {
    q: "Qual é o horário de funcionamento?",
    a: "Funcionamos de segunda a sexta-feira, nos turnos da manhã e da tarde. Os horários de entrada e saída de cada turma são confirmados pela secretaria conforme o segmento.",
  },
  {
    q: "Como acompanho o dia a dia do meu filho na escola?",
    a: "Mantemos uma comunicação próxima e transparente com as famílias. Além do contato direto com a equipe, você acompanha festas, projetos e avisos pelo nosso mural de Momentos aqui no site e pelo Instagram.",
  },
] as const;

export const VALUES = [
  {
    title: "Carinho",
    text: "Cada criança é acolhida com afeto e respeito ao seu jeito de ser.",
  },
  {
    title: "Segurança",
    text: "Um ambiente protegido onde famílias confiam e crianças se sentem em casa.",
  },
  {
    title: "Desenvolvimento",
    text: "Estímulo ao crescimento cognitivo, emocional e social em cada etapa.",
  },
  {
    title: "Alegria",
    text: "Aprender é uma experiência leve, lúdica e cheia de descobertas.",
  },
] as const;
