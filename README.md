# slidev-theme-auriga

A minimalist [Slidev](https://sli.dev) theme inspired by the [Auriga LaTeX Beamer theme](https://github.com/anishathalye/auriga), designed for academic and technical presentations. Features theorem environments, BibTeX citations, footnote references, and automatic page numbering.

## Features

- Clean, minimalist design faithful to the Auriga Beamer aesthetic
- Academic components: theorems, lemmas, definitions, corollaries, proofs, and remarks with auto-numbering
- BibTeX support with inline citations (`<Cite>`) and footnote citations (`<Footcite>`)
- Paginated references layout for bibliography slides
- Colored block environments (info, warning, danger, success, example)
- Cover page with authors, institutions, date, and logos
- Automatic page counter (hidden on cover, end, and reference slides)
- 10 slide layouts for diverse content needs
- Typography: Roboto (headings), Lato (body), Hack (code)

## Installation

Add the following frontmatter to your `slides.md`:

```yaml
---
theme: auriga
---
```

Learn more about [how to use a theme](https://sli.dev/guide/theme-addon).

## Layouts

| Layout | Description |
|--------|-------------|
| `cover` | Title page with authors, institutions, date, and logos |
| `default` | Standard content slide with a frame title |
| `section` | Section divider with centered title |
| `center` | Centered content |
| `two-cols` | Two-column layout |
| `two-cols-header` | Two columns with a shared header |
| `quote` | Blockquote display |
| `fact` | Large fact or number highlight |
| `end` | Closing slide |
| `references` | Paginated bibliography from a BibTeX file |

## Components

### `<Theorem>`

Renders a theorem-like environment with a colored left border and auto-numbering.

```md
<Theorem type="theorem" title="Pythagorean Theorem">

In a right triangle, $a^2 + b^2 = c^2$.

</Theorem>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'theorem'` \| `'lemma'` \| `'definition'` \| `'corollary'` \| `'proposition'` \| `'proof'` \| `'remark'` | `'theorem'` | Environment type (determines color and label) |
| `title` | `string` | — | Optional title shown in parentheses |
| `number` | `string` | — | Manual number override (auto-numbered if omitted) |

### `<Block>`

A colored callout block with an optional title bar.

```md
<Block type="info" title="Note">

This is an informational callout.

</Block>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'default'` \| `'info'` \| `'success'` \| `'warning'` \| `'danger'` \| `'example'` \| `'alert'` | `'default'` | Block style |
| `title` | `string` | — | Title displayed in a colored header bar |

### `<Cite>`

Inline superscript citation that renders as `[n]` with a tooltip showing the full reference.

```md
Deep learning <Cite cite-key="lecun2015" bib-file="/example.bib" /> has transformed AI.
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cite-key` | `string` | — | BibTeX citation key |
| `label` | `string` | — | Manual label override |
| `bib-file` | `string` | — | Path to `.bib` file (only needed on the first citation or if not loaded globally) |

### `<Footcite>`

Footnote-style citation. Places a superscript marker in the text and renders the full reference at the bottom of the slide.

```md
Transformers <Footcite cite-key="vaswani2017" bib-file="/example.bib" /> changed NLP.
```

Supports multiple keys on a single marker:

```md
Prior work <Footcite :cite-keys="['lecun2015', 'goodfellow2014']" bib-file="/example.bib" />
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cite-key` | `string` | — | Single BibTeX citation key |
| `cite-keys` | `string[]` | — | Multiple BibTeX citation keys |
| `label` | `string` | — | Manual label override |
| `bib-file` | `string` | — | Path to `.bib` file |

### `<Highlight>`

Colored emphasis for inline text.

```md
The key idea is <Highlight>attention mechanisms</Highlight>.
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | `'#2252a3'` | Text color (any CSS color value) |

### `<Footnote>`

A positioned footnote container at the bottom of the slide.

```md
<Footnote>

Source: World Bank, 2024

</Footnote>
```

## BibTeX Support

Place a `.bib` file in the `public/` directory of your project. Example:

```bibtex
@article{lecun2015,
  author  = {Yann LeCun and Yoshua Bengio and Geoffrey Hinton},
  title   = {Deep Learning},
  journal = {Nature},
  volume  = {521},
  pages   = {436--444},
  year    = {2015}
}
```

Load the bibliography globally via the cover slide frontmatter:

```yaml
---
theme: auriga
layout: cover
bib: /example.bib
---
```

Or load it per-component using the `bib-file` prop on `<Cite>` or `<Footcite>`.

### References Slide

Add a references layout slide at the end of your deck:

```yaml
---
layout: references
bib: /example.bib
---
```

The references layout supports pagination:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `bib` | `string` | — | Path to `.bib` file |
| `page` | `number` | `1` | Current page of references |
| `perPage` | `number` | `5` | References per page |

For long bibliographies, add multiple reference slides:

```yaml
---
layout: references
bib: /example.bib
page: 1
perPage: 5
---

---
layout: references
page: 2
perPage: 5
---
```

## Cover Page Configuration

The cover layout accepts frontmatter for authors, institutions, date, and logos:

```yaml
---
layout: cover
authors:
  - name: Alice Smith
    institution: Max Planck Institute
  - name: Bob Jones
    institution: ETH Zürich
date: "February 2026"
logos:
  - /mpi_logo.png
  - /eth_logo.png
bib: /example.bib
---

# Presentation Title

Subtitle or additional description
```

Institutions are automatically deduplicated and displayed below the author names.

## Page Counter

An automatic page counter is displayed in the bottom-right corner of content slides. It is hidden on `cover`, `end`, and `references` layouts. The counter excludes the cover and end slides from the total, showing the format `n / N` where `N` is the number of content slides.

## Customization

Override the theme's CSS custom properties in your `styles/index.css`:

```css
:root {
  --auriga-fg: #000000;
  --auriga-bg: #ffffff;
  --auriga-dark-gray: #4f4f4f;
  --auriga-light-gray: #f5f6fa;
  --auriga-gray: #929292;
  --auriga-red: #b51700;
  --auriga-blue: #0076ba;
  --auriga-highlight: #2252a3;
}
```

## Fonts

| Role | Font | Weight |
|------|------|--------|
| Headings | Roboto | 400, 700 |
| Body text | Lato | 400 |
| Code | Hack | 400 |

Roboto is loaded via Google Fonts. Lato and Hack are configured through Slidev's built-in font system.

## Development

To work on this theme locally, clone the repository and run:

```bash
npm install
npx slidev slides.md
```

The included `slides.md` serves as a demo showcasing all layouts and components.

To use a local copy of this theme in another Slidev project, set the theme to the relative path:

```yaml
---
theme: ./path/to/slidev-theme-auriga
---
```

## Credits

Inspired by the [Auriga](https://github.com/anishathalye/auriga) LaTeX Beamer theme by Anish Athalye.

## License

[MIT](./LICENSE)
