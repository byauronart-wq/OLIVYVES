/* ============================================================
   OLIVEIRA — DADOS DO SITE  (o cérebro do site)
   ------------------------------------------------------------
   OLIVEIRA é a marca-mãe. Cada COLEÇÃO é um módulo com os seus
   próprios dados, um "modo" de apresentação e um tema (cores).
   AURON é a primeira coleção (arte em acrílico translúcido).

   Para adicionar uma coleção nova, no futuro:
     1. copia um bloco de coleção aqui em baixo,
     2. muda id / nome / peças / tema,
     3. escolhe o "mode":  'imersivo'  ou  'grelha'.
   Não é preciso reescrever o resto do site.
   ============================================================ */

/* ---- CONFIG global: como se encomenda ---- */
window.CONFIG = {
  brand: 'OLIVEIRA',
  domain: 'byauron.art',

  order: {
    // modo do botão "Encomendar": 'whatsapp' | 'email' | 'stripe'
    mode: 'whatsapp',

    // Nº de WhatsApp (formato internacional, só dígitos, ex: '351912345678').
    // Enquanto estiver vazio, o botão usa automaticamente o email abaixo.
    whatsapp: '',

    email: 'ivodeoliveiradrive@gmail.com',

    // Encomenda por medida = sinal (%) para arrancar a produção.
    depositPct: 50,

    // (stripe) — só usado se mode === 'stripe'. Deixar vazio até haver conta.
    stripeLink: '',
  },

  // Chat / mensagens.
  // Por defeito, o botão de chat abre um FORMULÁRIO dentro do site
  // (nome, email, tipo, mensagem). Ao enviar, recebes um EMAIL automático
  // no endereço "formTo" (usa o serviço gratuito FormSubmit — na 1ª mensagem
  // recebes um email a pedir para confirmares/ativar; confirmas uma vez e fica).
  //
  // Alternativa: se preencheres "tawkSrc" (embed.tawk.to/XXXX/YYYY), o botão
  // passa a ser um chat AO VIVO (Tawk.to) em vez do formulário.
  chat: {
    formTo: '',       // email que recebe as mensagens (vazio = usa order.email)
    tawkSrc: '',      // deixa vazio para usar o formulário
  },
};

/* ---- Tamanhos partilhados (placa de acrílico, formato A) ---- */
/* Preços de referência do brief — confirmar antes de publicar. */
/* stripe: (opcional) link de pagamento Stripe deste tamanho. Cria em
   dashboard.stripe.com → Payment Links, cola o link aqui, e põe
   CONFIG.order.mode = 'stripe' para o botão levar direto ao pagamento.
   Vazio = usa WhatsApp/email. */
const AURON_SIZES = [
  { id: 'a4', label: { pt: 'A4 · 21 × 29,7 cm', en: 'A4 · 21 × 29.7 cm' }, price: 45, stripe: '' },
  { id: 'a3', label: { pt: 'A3 · 29,7 × 42 cm', en: 'A3 · 29.7 × 42 cm' }, price: 69, stripe: '' },
  { id: 'a2', label: { pt: 'A2 · 42 × 59,4 cm', en: 'A2 · 42 × 59.4 cm' }, price: 99, stripe: '' },
];

/* ---- O catálogo ---- */
window.CATALOG = {
  collections: [
    {
      id: 'auron',
      name: 'AURON',
      mode: 'imersivo',                 // AURON usa a experiência "casa ao entardecer"
      page: 'auron.html',               // página da experiência da coleção

      tagline: {
        pt: 'Auras de cor em acrílico translúcido.',
        en: 'Auras of colour in translucent acrylic.',
      },
      description: {
        pt: 'Gradientes que respiram luz, impressos em acrílico translúcido. Sem luz própria — cada peça vive da luz da divisão onde é pendurada.',
        en: 'Gradients that breathe light, printed on translucent acrylic. No light of its own — each piece lives on the light of the room it hangs in.',
      },

      // tema (cores) desta coleção — quente, luz baixa, entardecer
      theme: {
        bg: '#0b0a0d', bg2: '#131116', ink: '#f3efe9',
        accent: '#d98f5a', accent2: '#7f7bd8',
      },

      // ficha técnica partilhada por todas as peças da coleção
      material: {
        pt: 'Acrílico translúcido 5 mm, impressão UV.',
        en: 'Translucent acrylic 5 mm, UV print.',
      },
      edition: 25,                      // edição limitada (nº de exemplares por peça)
      productionTime: { pt: '2 a 3 semanas', en: '2 to 3 weeks' },
      included: {
        pt: [
          'Placa em acrílico translúcido de 5 mm, impressão UV',
          'Sistema de suspensão (standoffs, a ~16 mm da parede)',
          'Envio para todo o país',
        ],
        en: [
          'Translucent 5 mm acrylic plate, UV print',
          'Mounting hardware (standoffs, ~16 mm off the wall)',
          'Nationwide shipping',
        ],
      },

      sizes: AURON_SIZES,

      pieces: [
        {
          id: 'profundidade',
          name: { pt: 'Profundidade', en: 'Depth' },
          desc: {
            pt: 'Azul profundo em anel circular, com um núcleo escuro que puxa o olhar para dentro. Quieto e contemplativo.',
            en: 'Deep blue in a circular ring, with a dark core that draws the eye inward. Quiet and contemplative.',
          },
          images: [
            'assets/shop/profundidade-1-front.jpg',
            'assets/shop/profundidade-2-gallery.jpg',
            'assets/shop/profundidade-3-room.jpg',
          ],
        },
        {
          id: 'alvorada',
          name: { pt: 'Alvorada', en: 'Dawn' },
          desc: {
            pt: 'Azul-gelo a abrir para um centro rosa — a cor de um amanhecer, suave sobre qualquer parede.',
            en: 'Ice-blue opening into a pink core — the colour of daybreak, soft on any wall.',
          },
          images: [
            'assets/shop/alvorada-1-gallery.jpg',
            'assets/shop/alvorada-2-room.jpg',
          ],
        },
        {
          id: 'horizonte',
          name: { pt: 'Horizonte', en: 'Horizon' },
          desc: {
            pt: 'Um pôr-do-sol contido num retângulo: magenta a arder em laranja, núcleo escuro ao centro.',
            en: 'A sunset held in a rectangle: magenta burning into orange, a dark core at its centre.',
          },
          images: [
            'assets/shop/horizonte-1-front.jpg',
            'assets/shop/horizonte-2-gallery.jpg',
            'assets/shop/horizonte-3-room.jpg',
          ],
        },
        {
          id: 'penumbra',
          name: { pt: 'Penumbra', en: 'Penumbra' },
          desc: {
            pt: 'Violeta e magenta a dissolverem-se em azul — feita para uma divisão que já vive em meia-luz.',
            en: 'Violet and magenta dissolving into blue — made for a room that already lives in half-light.',
          },
          images: [
            'assets/shop/penumbra-1-front.jpg',
            'assets/shop/penumbra-2-room.jpg',
          ],
        },
      ],
    },

    /* ---- coleções futuras entram aqui (mode: 'grelha' até terem experiência própria) ---- */
  ],
};

/* Helper: devolve uma coleção por id */
window.getCollection = function (id) {
  return window.CATALOG.collections.find((c) => c.id === id) || null;
};
