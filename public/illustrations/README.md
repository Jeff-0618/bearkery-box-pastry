# Teddy Bear Illustrations

This folder is where the 10 illustrations of Bearkery Box's own teddy bear
mascot go. Drop each file in here with the **exact filename** below and it
will appear on the site automatically — no code changes needed.

Until a file exists, that spot on the site shows a small dashed placeholder
instead of a broken image, so it's safe to deploy before all 10 are ready.

## How to produce these

Give your designer (or an AI image tool that supports image/character
reference, e.g. Midjourney `--cref`, Recraft) the original reference photo
of the bear plus the scene description below for each pose. Keep every
other detail — face, proportions, fur colour, bow tie, art style —
identical to the reference photo. Only the pose/action/props should change.

Export each as a **PNG, ideally with a transparent background**, at least
1200px on the longer edge.

| Filename | Used on | Scene |
|---|---|---|
| `welcome-bear.png` | Homepage hero | Bear standing, one paw raised in an open, welcoming wave |
| `holding-cake.png` | Product detail page | Bear holding a round frosted cake with both paws, presenting it forward |
| `holding-sandwich.png` | Everyday Favourites section | Bear holding a wrapped sandwich (close to the reference photo's pose) |
| `packing-gift.png` | Checkout page | Bear tying a ribbon around a gift box on the table |
| `thank-you-bear.png` | Order success page | Bear with paws together near chest, gentle bow, happy closed-eye smile |
| `waiting-bear.png` | Empty cart | Bear sitting alone at the table, chin resting on paw, empty plate in front |
| `sleeping-bear.png` | 404 page | Bear with eyes closed, head resting on folded paws, small "Zzz" above |
| `reading-menu.png` | How To Order section | Bear holding an open small menu card, looking down at it |
| `baking-bear.png` | About page + homepage About teaser | Bear at the counter with an apron, mixing bowl in front, wooden spoon in paw |
| `gift-box-bear.png` | Collections page | Bear holding up a ribboned gift box with both paws |

## Notes

- These filenames are also defined in `components/shared/BearIllustration.tsx`
  if you ever need to rename or add a new pose.
- Product photography (sandwiches, bento cakes, etc.) is separate from
  this folder — those are placeholder stock photos in `lib/data.ts` and
  should be replaced with real product photos when available.
