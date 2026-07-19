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
  gallery: {
    image: 'assets/gallery/nome-da-peca/em-contexto.jpg',
    ar: '4/5',                                 // proporção da moldura na galeria
    caption: { pt: 'Legenda curta.', en: 'Short caption.' },
  },
},
```

A numeração (01, 02, …) na galeria é automática, pela ordem da lista.

## Passo 3 — Escolher a tabela de tamanhos (forma da peça)

No topo de `data.js` existem as tabelas de preço por corte:

| Constante       | Forma                  | Tamanhos atuais |
|-----------------|------------------------|-----------------|
| `RECT_SIZES`    | Retângulo (H ou V)     | 70×50 · 57×80 · 100×75 |
| `ELLIPSE_SIZES` | Elipse                 | 100×60 · 70×40 |
| `ROUND_SIZES`   | Redonda                | Ø90 · Ø50 |

- Peça nova de uma forma **existente** → usa a constante certa em `sizes:`.
- **Forma nova** (ex.: quadrado) → cria uma constante nova ao lado das outras,
  no mesmo formato, e usa-a. Os preços são os de venda ao cliente, em EUR.

## Passo 4 — Publicar

```
git add -A
git commit -m "feat: nova peça <Nome>"
git push origin main
```

O site atualiza em ~1-2 minutos (GitHub Pages).

## Notas

- **`ar` (aspect ratio)**: `'4/5'` para retrato, `'1/1'` para quadrado/redonda,
  `'5/4'` para paisagem — é só a moldura da cena na galeria.
- **Ordem na galeria** = ordem da lista `pieces`. Arrasta o bloco para mudar.
- **Coleções futuras**: copia o bloco inteiro da coleção AURON em
  `CATALOG.collections`, muda `id`/`name`/`pieces`. Quando existir uma 2ª
  coleção, o portal de escolha de coleções volta a ser ativado (falar comigo
  nessa altura).
