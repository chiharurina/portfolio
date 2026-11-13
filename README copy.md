# Arriana Flores | Portfolio

- `index.html`: home page with featured projects and the block system simulator
- `projects.html`: all projects with filters
- `escape-room.html`, `rose-float.html`: case studies (styles in `case-study.css`)
- `resume.pdf`: résumé. Replace the file to update it.

## Adding photos and video
- Home featured cards: set `data-photo="images/file.jpg"` on the card's `feature-media` element.
- Case studies: set `data-src="images/file.jpg"` (or `.mp4`, with `data-poster` for a thumbnail) on a
  `hero-media` or `figure class="media"` element. Empty slots are hidden from visitors.
- Projects page: `data-photos="images/a.jpg, images/b.jpg"` on a project card.

## Draft view
Open a case study with `?draft` on the end (for example `escape-room.html?draft`) to see red
notes listing what still needs writing and which media slots are empty. Visitors never see these.
