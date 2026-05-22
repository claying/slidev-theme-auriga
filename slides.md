---
theme: ./
layout: cover
authors:
  - name: Alice Smith
    institution: MIT CSAIL
  - name: Bob Jones
    institution: Stanford University
date: "February 2026"
bib: /example.bib
---

# Auriga Theme for Slidev

A minimalist presentation theme inspired by the Auriga LaTeX Beamer theme

---

# Default Layout

This is a standard content slide with a frame title.

- First-level bullet point
- Another point with **bold** and *italic* text
  - Nested item with less spacing
  - Another nested item
- Back to first level

A paragraph of body text using Lato. The design prioritizes content clarity with minimal visual distractions.

---
layout: section
---

# Section Divider

A new chapter begins here

---

# Lists and Formatting

## Ordered List

1. First item in the list
2. Second item with `inline code`
3. Third item with a [hyperlink](https://example.com)

## Text Styles

Regular text, **bold text**, *italic text*, and `monospace code`.

---

# Table Example

| Method    | Accuracy | Parameters |
|-----------|----------|------------|
| ResNet-50 | 76.1%    | 25.6M     |
| ViT-B/16  | 77.9%    | 86.6M     |
| DeiT-Base | 81.8%    | 86.6M     |
| Swin-T    | 81.3%    | 28.3M     |

Custom width and centered alignment with `--table-width` and `--table-align`:

<div style="--table-width: 60%; --table-align: center">

| Metric   | Value |
|----------|-------|
| Recall   | 92.3% |
| F1 Score | 89.7% |

</div>

---
layout: two-cols
---

# Left Column

Content on the left side of the slide.

- Point A
- Point B
- Point C

::right::

# Right Column

Content on the right side of the slide.

- Point D
- Point E
- Point F

---
layout: two-cols-header
---

# Comparison

::left::

## Option A

- Simple to implement
- Lower cost
- Limited features

::right::

## Option B

- More complex
- Higher cost
- Full feature set

---

# Code Example

A block of code rendered with syntax highlighting:

```python
def fibonacci(n: int) -> int:
    """Calculate the nth Fibonacci number."""
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
```

---
layout: center
---

# Centered Content

This layout centers everything on the slide.

Useful for key statements or transitions.

---
layout: quote
---

The best way to predict the future is to invent it.

Alan Kay

---
layout: fact
---

# 42

The answer to life, the universe, and everything

---

# Theorem Environments

<Theorem type="theorem" title="Pythagorean Theorem">

In a right triangle, $a^2 + b^2 = c^2$ where $c$ is the hypotenuse.

</Theorem>

<Theorem type="definition" title="Convexity">

A set $S$ is **convex** if for any $x, y \in S$ and $\lambda \in [0,1]$, we have $\lambda x + (1-\lambda) y \in S$.

</Theorem>

<Theorem type="lemma">

Every convergent sequence is bounded.

</Theorem>

---

# Block Environments

<Block type="info" title="Note">

This is an informational callout using the Block component.

</Block>

<Block type="warning" title="Caution">

Ensure all assumptions are verified before applying this result.

</Block>

<Block type="example" title="Example">

Consider the case where $n = 3$ and $k = 2$.

</Block>

---

# Highlight and Citations

The field of <Highlight>deep learning</Highlight> has seen remarkable progress.

Foundational work includes convolutional networks <Cite cite-key="lecun2015" bib-file="/example.bib" />, the transformer architecture <Cite cite-key="vaswani2017" bib-file="/example.bib" />, and generative adversarial networks <Cite cite-key="goodfellow2014" bib-file="/example.bib" />.

Key insight: <Highlight>attention mechanisms</Highlight> replaced recurrence entirely.

---

# Footnote Citations

Neural networks have become the dominant approach in modern AI <Footcite cite-key="lecun2015" bib-file="/example.bib" />.

The transformer architecture <Footcite cite-key="vaswani2017" bib-file="/example.bib" /> enabled large-scale language modeling.

GANs <Footcite cite-key="goodfellow2014" bib-file="/example.bib" /> introduced adversarial training.

---
layout: end
---

# Thank You

Questions?

---
layout: references
bib: /example.bib
---
