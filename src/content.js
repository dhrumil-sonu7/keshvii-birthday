/**
 * content.js
 * ─────────
 * Single source of truth for every text string, photo path and config value.
 * Add / reorder slides freely – the app maps over the `slides` array.
 */

const content = {
  /* ── Names ────────────────────────────────────────────────── */
  name: 'Keshvii',
  petName: 'My billi',
  age: 25,

  /* ── Intro ────────────────────────────────────────────────── */
  introHint: 'Tap to open, My billi',

  /* ── Slides (photos + captions) ───────────────────────────── */
  slides: [
    {
      photo: '/photos/1.jpeg',
      caption:
        'Haaa Li aveeee, aem naa hoyyy Rekhaa🫠',
    },
    {
      photo: '/photos/2.jpeg',
      caption:
        'Every time I look at this picture, I can\'t help but smile. You have this effortless way of making the world look a little brighter 🌟',
    },
    {
      photo: '/photos/3.jpeg',
      caption:
        'Of all the beautiful sounds in the world, your laugh is slowly becoming my absolute favorite 💗✨',
    },
    {
      photo: '/photos/4.jpeg',
      caption:
        'Getting to know you has been the best part of my year. There\'s so much warmth in your eyes, and I love discovering the person behind them 🌹',
    },
    {
      photo: '/photos/5.jpeg',
      caption:
        'Abhi toh chahat ki shuruat hai, aage abhi pura jahan baaki hai,\nTumse juda har lamha haseen hai, abhi aisi kai mulakaatein baaki hain 💫🫂',
    },
  ],

  /* ── Finale ───────────────────────────────────────────────── */
  finaleTitle: 'Happy Birthday, Keshvii',
  closingLine: "I'm really glad you're in my life, My billi.",

  /* ── Secret message ───────────────────────────────────────── */
  secretMessage: `Happiest of Happiest birthday to you Keshviii!
May kanha ji bless you abundantly!✨
Myy Billliii!!🫂💗

To the girl who is slowly becoming my favorite person to talk to. I am so glad that we are in this beautiful phase of getting to know each other, and every conversation with you genuinely brightens up my day. May this birthday bring you infinite laughter, endless cake, and everything your heart desires. Cheers to celebrating today, and hopefully many more of your birthdays together in the future! Have an amazing day ahead! 🎈💕🧿`,

  /* ── Music ─────────────────────────────────────────────────── */
  musicSrc: '/music.mp3',
  musicVolume: 0.5,
};

export default content;
