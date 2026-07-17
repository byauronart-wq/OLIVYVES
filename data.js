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
  brand: 'OLIV YVES',
  domain: 'olivyves.com',

  order: {
    email: 'ivodeoliveiradrive@gmail.com',

    // URL da função serverless que cria a sessão de checkout Stripe
    // (ver checkout-api/README.md para o deploy). Enquanto estiver vazio,
    // o botão "Finalizar encomenda" usa um email de recurso com o carrinho completo.
    checkoutApi: '',
  },

  // Preços do catálogo estão sempre em EUR. USD é só para mostrar o preço ao
  // cliente — o valor cobrado a sério é sempre calculado no servidor (checkout-api/).
  currency: {
    base: 'EUR',
    rates: { EUR: 1, USD: 1.08 }, // atualizar à mão de vez em quando
    symbols: { EUR: '€', USD: '$' },
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

/* ---- Tamanhos por corte de placa (acrílico cristal 5mm, corte e arestas polidas) ----
   Cada peça oferece só os tamanhos do corte que combina com a sua forma:
   retangular (Horizonte, Cósmica), elipse (Nascente), redonda (Profundidade, Órbita).
   Preços de venda (o custo do fornecedor não é o preço mostrado ao cliente). */
const RECT_SIZES = [
  { id: 'rect-70x50', label: { pt: '70 × 50 cm', en: '70 × 50 cm' }, price: 279 },
  { id: 'rect-57x80', label: { pt: '57 × 80 cm', en: '57 × 80 cm' }, price: 349 },
  { id: 'rect-100x75', label: { pt: '100 × 75 cm', en: '100 × 75 cm' }, price: 449 },
];
const ELLIPSE_SIZES = [
  { id: 'elipse-100x60', label: { pt: 'Elipse 100 × 60 cm', en: 'Ellipse 100 × 60 cm' }, price: 399 },
  { id: 'elipse-70x40', label: { pt: 'Elipse 70 × 40 cm', en: 'Ellipse 70 × 40 cm' }, price: 279 },
];
const ROUND_SIZES = [
  { id: 'redonda-90', label: { pt: 'Redonda · Ø 90 cm', en: 'Round · Ø 90 cm' }, price: 499 },
  { id: 'redonda-50', label: { pt: 'Redonda · Ø 50 cm', en: 'Round · Ø 50 cm' }, price: 249 },
];

/* ---- O catálogo ---- */
window.CATALOG = {
  collections: [
    {
      id: 'auron',
      name: 'AURON',
      mode: 'imersivo',                 // AURON usa a experiência "casa ao entardecer"
      page: 'index.html#top',           // a coleção vive agora dentro do próprio index.html

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
        pt: 'Acrílico translúcido 5 mm, impressão UV. Não inclui LED — não é iluminada.',
        en: 'Translucent acrylic 5 mm, UV print. Does not include LED — not illuminated.',
      },
      productionTime: { pt: '2 a 3 semanas', en: '2 to 3 weeks' },
      included: {
        pt: [
          'Não inclui LED — não é iluminada; vive da luz natural/artificial da divisão',
          'Placa em acrílico translúcido de 5 mm, impressão UV',
          'Sistema de suspensão (standoffs, a ~16 mm da parede)',
          'Envio para todo o país',
        ],
        en: [
          'Does not include LED — not illuminated; lives on the room\'s natural or artificial light',
          'Translucent 5 mm acrylic plate, UV print',
          'Mounting hardware (standoffs, ~16 mm off the wall)',
          'Nationwide shipping',
        ],
      },

      // NOTA: os caminhos das imagens seguem os nomes das pastas em assets/shop/.
      // Se renomeares uma pasta, actualiza aqui os caminhos dessa peça (ou pede-me).
      pieces: [
        {
          id: 'profundidade',
          name: { pt: 'Profundidade', en: 'Depth' },
          desc: {
            pt: 'Azul profundo em anel, com um núcleo escuro que puxa o olhar para dentro.',
            en: 'Deep blue in a ring, with a dark core that draws the eye inward.',
          },
          images: [
            'assets/shop/deep blue circle/profundidade-1-front.jpg',
            'assets/shop/deep blue circle/gallery-blue-circle.jpg',
            'assets/shop/deep blue circle/hero-terracota.jpg',
          ],
          sizes: ROUND_SIZES,
        },
        {
          id: 'horizonte',
          name: { pt: 'Horizonte', en: 'Horizon' },
          desc: {
            pt: 'Um pôr-do-sol contido num retângulo — magenta a arder em laranja.',
            en: 'A sunset held in a rectangle — magenta burning into orange.',
          },
          images: [
            'assets/shop/horizontal sunset/horizonte-1-front.jpg',
            'assets/shop/horizontal sunset/gallery-sunset-horizontal.jpg',
            'assets/shop/horizontal sunset/office horizontal sunset-horizontal office-room.png',
          ],
          sizes: RECT_SIZES,
        },
        {
          id: 'nascente',
          name: { pt: 'Nascente', en: 'Rising' },
          desc: {
            pt: 'Sol oval em tons quentes, com auréola violeta. Luz que nasce.',
            en: 'An oval sun in warm tones, ringed in violet. Rising light.',
          },
          images: [
            'assets/shop/ellipse sun/auron_500x700mm_bleed3mm_300dpi_2026-07-13-20-44-04.png',
            'assets/shop/ellipse sun/entrance_persianas_wall_2026-07-13-19-06-22.png',
          ],
          sizes: ELLIPSE_SIZES,
        },
        {
          id: 'cosmica',
          name: { pt: 'Cósmica', en: 'Cosmic' },
          desc: {
            pt: 'Violeta profundo com halo magenta — uma aura cósmica, vertical.',
            en: 'Deep violet with a magenta halo — a cosmic aura, vertical.',
          },
          images: [
            'assets/shop/cosmic aura/auron_cosmic3.png',
            'assets/shop/cosmic aura/gallery_moody_wall_2026-07-14-07-18-03.png',
            'assets/shop/cosmic aura/dramatic_room_wall_2026-07-14-07-14-55.png',
          ],
          sizes: RECT_SIZES,
        },
        {
          id: 'orbita',
          name: { pt: 'Órbita', en: 'Orbit' },
          desc: {
            pt: 'Círculo cósmico, centro em fuga — azul e violeta em órbita.',
            en: 'A cosmic circle, its core receding — blue and violet in orbit.',
          },
          images: [
            'assets/shop/cosmic circle/auron_500x500mm_bleed3mm_300dpi_2026-07-04-18-51-25.png',
            'assets/shop/cosmic circle/gallery-white-wall.jpg',
            'assets/shop/cosmic circle/gallery-industrial.jpg',
          ],
          sizes: ROUND_SIZES,
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
