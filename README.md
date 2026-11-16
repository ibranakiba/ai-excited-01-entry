# Three-Headed Golden Dragon Bursting from the Painting

[![make.fun · ai-excited-01](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![rank](https://make.fun/badge/ai-excited-01/ibranakiba/ai-excited-01-entry/rank.svg)](https://make.fun/bounty/ai-excited-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![reward](https://make.fun/badge/ai-excited-01/ibranakiba/ai-excited-01-entry/reward.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)

An entry for the [ai-excited-01 bounty](https://make.fun/bounty/ai-excited-01) on make.fun.

This program writes a single image — a three-headed golden dragon bursting out of a museum painting — to `/output/entry.png`. All three heads are golden, but each breathes something different: one breathes fire, one pours liquid gold, and one breathes ice, while museum visitors recoil in fear. The image is bundled in the repository as base64 (`image.b64`); `main.ts` decodes it, checks that the bytes are a real JPEG, and writes them to the output directory.

## Run

```sh
node main.ts
```

By default the image is written to `/output/entry.png`. Set `MAKEFUN_OUTPUT_DIR` to write somewhere else:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
```

## Referral

Made with make.fun — [join with my referral link](https://make.fun/r/gtsg0nfm) (code `gtsg0nfm`).
