# Como adicionar uma peça nova ao site

Tudo acontece num único sítio: **`data.js`**. A galeria do `index.html` e a
loja geram-se sozinhas a partir daí — não é preciso mexer em HTML nenhum.

## Passo 1 — Preparar as imagens

Cria uma pasta para a peça em cada um destes dois sítios (usa o mesmo nome):

```
assets/shop/nome-da-peca/      ← fotos para a LOJA (frente da peça + mockups)
assets/gallery/nome-da-peca/   ← 1 foto em contexto (parede/sala) para a GALERIA
```

Dicas:
- A **1ª imagem** da lista `images` é a capa do cartão na loja.
- A foto da galeria funciona melhor em contexto real (a peça numa parede),
  não a arte isolada.

## Passo 2 — Adicionar o bloco em `data.js`

Dentro de `pieces: [ ... ]` da coleção AURON, copia um bloco existente e
muda os valores:

```js
{
  id: 'nome-da-peca',                          // sem espaços nem acentos — vai para o URL
  name: { pt: 'Nome', en: 'Name' },
  desc: {
    pt: 'Descrição para a loja (1-2 frases).',
    en: 'Shop description (1-2 sentences).',
  },
  images: [
    'assets/shop/nome-da-peca/frente.jpg',     // 1ª = capa na loja
    'assets/shop/nome-da-peca/mockup-sala.jpg',
  ],
  sizes: ROUND_SIZES,                          // ver Passo 3
  shape: 'circular',                           // ver Passo 3 — a que formato pertence na galeria
  gallery: {
    image: 'assets/gallery/nome-da-peca/em-contexto.jpg',
    caption: { pt: 'Legenda curta.', en: 'Short caption.' },
  },
},
```

A galeria do `index.html` já não lista as peças uma a uma: agrupa-as por
`shape` — uma composição cheia de ecrã por FORMATO, com uma seta lateral
para trocar entre as peças desse mesmo formato. Adicionar uma peça a um
formato que já existe faz com que a seta apareça sozinha (com 1 peça só,
não há seta nem pontos — fica limpo).

**Nota sobre a proporção da moldura:** não se define por peça — vem do
formato (`shapeLabels[shape].ar`, ver Passo 3). É de propósito: se cada
peça tivesse a sua própria proporção, a moldura mudava de tamanho ao
trocar de peça com a seta, o que salta muito ao olho. Todas as peças do
mesmo formato usam sempre a mesma moldura.

## Passo 3 — Escolher a tabela de tamanhos e o formato

No topo de `data.js` existem as tabelas de preço por corte, e mais abaixo
(dentro da coleção) o mapa de formatos da galeria:

| Constante       | `shape:`   | Tamanhos atuais |
|-----------------|------------|-----------------|
| `ROUND_SIZES`   | `'circular'` | Ø90 · Ø50 |
| `ELLIPSE_SIZES` | `'elipse'`   | 100×60 · 70×40 |
| `RECT_SIZES`    | `'rect-h'` (horizontal) ou `'rect-v'` (vertical) | 70×50 · 57×80 · 100×75 |

- Peça nova de uma forma **existente** → usa a constante certa em `sizes:`
  e o `shape:` correspondente da tabela acima.
- **Formato novo** (ex.: quadrado) → cria a constante de tamanhos (como as
  outras) E acrescenta uma entrada nova em `shapeOrder`/`shapeLabels` (perto
  do topo do bloco da coleção AURON) com a chave, o nome em PT/EN e a
  proporção da moldura (`ar`, ex.: `'4/5'` para retrato, `'1/1'` para
  quadrado). Depois usa essa chave no `shape:` da peça.

## Passo 4 — Publicar

```
git add -A
git commit -m "feat: nova peça <Nome>"
git push origin main
```

O site atualiza em ~1-2 minutos (GitHub Pages).

## Notas

- **`ar` (aspect ratio)**: `'4/5'` para retrato, `'1/1'` para quadrado/redonda,
  `'5/4'` para paisagem — vive em `shapeLabels[shape].ar` (por FORMATO, não
  por peça, ver Passo 2).
- **Ordem dos formatos na galeria** = ordem da lista `shapeOrder`. **Ordem
  das peças dentro de um formato** = ordem em que aparecem em `pieces`.
- **Coleções futuras**: copia o bloco inteiro da coleção AURON em
  `CATALOG.collections`, muda `id`/`name`/`pieces`. Quando existir uma 2ª
  coleção, o portal de escolha de coleções volta a ser ativado (falar comigo
  nessa altura).
