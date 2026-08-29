# Academy hero film

Drop the cinematic hero video here as:

    dfx-academy-hero.mp4

Guidance
- 8-14 seconds, silent, seamless loop, H.264 MP4, ideally under ~4 MB.
- Real footage: a modern professional learning environment, collaboration,
  instructor demonstration, laptops, live project work. No stock-smile poses,
  no generic futuristic AI imagery, no fake campus shots.
- Also supply a poster frame at /public/images/academy/hero-poster.jpg
  (1920x1080, same frame as the video's first frame).

The hero degrades gracefully: with no video it shows the poster, and with
neither it shows the composed navy field. Nothing breaks if the files are
absent, and no video is mounted at all under prefers-reduced-motion.

Paths are configured in HERO in lib/academy/content.ts.
