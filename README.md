# Restaurant Website Template

A flexible, data-driven restaurant website template built for rapid customization. All content and theme values live in `data.json`, so you can create a new restaurant site by swapping one file.

## Getting Started

1. Update `data.json` with your restaurant name, menu items, images, colors, and links.
2. Launch a local server so the browser can fetch the JSON file:

```bash
python -m http.server 8000
```

3. Visit `http://localhost:8000` in your browser.

## Configuration Highlights

- **Theme colors**: Update `theme.colors` in `data.json` to change the entire palette.
- **Typography**: Update `theme.fonts` in `data.json` or swap the Google Fonts in `index.html`.
- **Content**: Menu categories, specials, events, and testimonials are all configured in `data.json`.
- **Hero + Gallery images**: Replace with your own photo URLs.
- **Menu PDF**: Provide a downloadable menu file via `menu.pdf` in `data.json`.
- **Navigation**: Update `navigation` in `data.json` to control page links.

## Template Sections

- Home hero with quick stats
- About + highlights page
- Menu highlights page
- Chef's specials page
- Gallery page
- Testimonials page
- Events + private dining page
- Visit / contact page

## Tips for Creating New Restaurant Sites

- Duplicate the repo and update only `data.json` for fast changes.
- Keep photos high resolution for the best visual impact.
- Customize CTA links for ordering and reservations.

## License

Use freely for client projects.
