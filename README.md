# parcer-reporter-event-handler

Parcel plugin for watch and rebuild when Parcel buiding throw fatal errors or freezes.

Created for vanilla HTML/CSS bundles.
You can see usage example in [this template](https://github.com/glivera-team/glivera-parcel-template).

Important! Don`t forget hit the star https://github.com/jsqrt/parcer-reporter-event-handler

## Usage

Your sources must be in `src` directory.
Parcel config must be in `.parcelrc` file.

Declare plugin in your `.parcelrc`:

```
"reporters": [
  "parcel-reporter-event-handler",
  "..."
]
```

## Authors

- [@jsqrt](https://github.com/jsqrt/)
- [@Glivera-team](https://github.com/glivera-team)
