import type { GalleryImage, Post } from "./types";

/** Imagens ilustrativas (Unsplash) — todas verificadas e relacionadas a
 *  escola, crianças e educação. Substitua pelo conteúdo real da escola no
 *  painel administrativo: os dados do Firestore têm prioridade. */
const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Menina sorrindo com tinta no rosto — alegria da infância.
export const HERO_IMAGE = img("photo-1503454537195-1dcabb73ffb9", 1400);

export const SEGMENT_IMAGES: Record<string, string> = {
  // Bebê/criança pequena — creche.
  creche: img("photo-1485546246426-74dc88dec4d9"),
  // Criança brincando com blocos coloridos — maternal.
  maternal: img("photo-1541692641319-981cc79ee10a"),
  // Criança em atividade de artes — educação infantil.
  "educacao-infantil": img("photo-1516627145497-ae6968895b74"),
  // Sala de aula com estudantes — ensino fundamental.
  "ensino-fundamental": img("photo-1509062522246-3755977927d7"),
};

export const FALLBACK_GALLERY: GalleryImage[] = [
  "photo-1607453998774-d533f65dac99", // três crianças sorrindo
  "photo-1587616211892-f743fcca64f9", // turma de crianças
  "photo-1588075592446-265fd1e6e76f", // roda na sala de aula
  "photo-1516627145497-ae6968895b74", // criança em atividade de artes
  "photo-1587654780291-39c9404d746b", // blocos/peças coloridas
  "photo-1542810634-71277d95dcbb", // crianças na sala
  "photo-1567057419565-4349c49d8a04", // crianças estudando
  "photo-1503676260728-1c00da094a0b", // livros, maçã e letras
  "photo-1535982330050-f1c2fb79ff78", // mochila e material escolar
].map((id, i) => ({ id: `seed-${i}`, imageUrl: img(id, 900) }));

const day = (offset: number) => Date.now() - offset * 24 * 60 * 60 * 1000;

export const FALLBACK_POSTS: Post[] = [
  {
    id: "recesso-feriado",
    kind: "aviso",
    title: "Não haverá aula na sexta (feriado)",
    excerpt:
      "Sexta-feira é feriado municipal e a escola estará fechada. Voltamos às atividades normalmente na segunda. Bom descanso a todos!",
    content: "",
    coverImage: "",
    status: "published",
    createdAt: day(1),
  },
  {
    id: "festival-talentos",
    kind: "evento",
    title: "Festival de Talentos Pirilampo",
    excerpt:
      "Venha prestigiar nossas crianças no palco! Uma tarde de música, dança e teatro feita com muito carinho.",
    coverImage: img("photo-1503454537195-1dcabb73ffb9", 1400),
    status: "published",
    eventDate: day(-12),
    createdAt: day(2),
    content:
      "Reserve a data! O Festival de Talentos é o momento em que cada criança mostra, com orgulho, o que preparou ao longo do trimestre.\n\nHaverá apresentações de música, dança, teatro e poesia. As portas abrem às 14h e a entrada é gratuita para as famílias.\n\nVenha torcer e celebrar com a gente — vai ser inesquecível!",
  },
  {
    id: "reuniao-pais",
    kind: "evento",
    title: "Reunião de Pais e Mestres",
    excerpt:
      "Um encontro para conversarmos sobre o desenvolvimento das crianças e os próximos passos do trimestre.",
    coverImage: "",
    status: "published",
    eventDate: day(-5),
    createdAt: day(3),
    content:
      "Convidamos todas as famílias para a nossa Reunião de Pais e Mestres.\n\nSerá um momento importante para alinharmos expectativas, compartilharmos as conquistas das crianças e tirarmos dúvidas. A presença de vocês faz toda a diferença.",
  },
  {
    id: "festa-junina",
    kind: "momento",
    title: "Nossa Festa Junina foi pura alegria",
    excerpt:
      "Quadrilha, comidas típicas e muita animação marcaram um dos dias mais esperados do ano na Pirilampo.",
    coverImage: img("photo-1587616211892-f743fcca64f9", 1400),
    status: "published",
    createdAt: day(6),
    content:
      "A nossa tradicional Festa Junina reuniu famílias, alunos e educadores em uma tarde inesquecível. O pátio se encheu de bandeirinhas coloridas, e cada turma preparou com carinho sua apresentação de quadrilha.\n\nAs crianças dançaram, cantaram e se divertiram com as brincadeiras típicas, enquanto os pais acompanhavam de pertinho cada sorriso. Não faltaram as delícias da época: pamonha, canjica, milho e muito mais.\n\nMais do que uma festa, esse é um momento de valorizar a cultura popular brasileira e fortalecer os laços entre a escola e as famílias. Obrigado a todos que estiveram conosco!",
  },
  {
    id: "dia-das-maes",
    kind: "momento",
    title: "Um Dia das Mães cheio de carinho",
    excerpt:
      "As crianças prepararam homenagens especiais para celebrar quem cuida delas com tanto amor.",
    coverImage: img("photo-1607453998774-d533f65dac99", 1400),
    status: "published",
    createdAt: day(20),
    content:
      "O Dia das Mães é sempre um momento muito especial na Pirilampo. Durante a semana, as crianças se dedicaram a preparar lembrancinhas, cartões e apresentações para surpreender as mamães.\n\nNo dia da celebração, a emoção tomou conta de todos. Cada gesto, cada abraço e cada palavra mostraram o quanto o amor é a base de tudo o que fazemos aqui.\n\nAgradecemos a todas as mães pela parceria e pela confiança de todos os dias. Vocês são inspiração para os nossos pequenos!",
  },
  {
    id: "semana-da-crianca",
    kind: "momento",
    title: "Semana da Criança: brincar é coisa séria",
    excerpt:
      "Uma semana inteira dedicada ao que as crianças mais amam fazer — brincar, descobrir e sonhar.",
    coverImage: img("photo-1516627145497-ae6968895b74", 1400),
    status: "published",
    createdAt: day(45),
    content:
      "Para comemorar a Semana da Criança, preparamos dias repletos de atividades especiais: pintura de rosto, brinquedos infláveis, oficinas de arte, contação de histórias e muita música.\n\nAcreditamos que o brincar é parte essencial do aprendizado. É brincando que a criança desenvolve a imaginação, a coordenação, a convivência e a autoconfiança.\n\nFoi lindo ver cada sorriso espontâneo durante toda a semana. Afinal, infância é tempo de ser feliz!",
  },
];
