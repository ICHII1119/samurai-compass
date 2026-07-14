/**
 * strings.js — English translations for SAMURAI in You (English version)
 *
 * HOW TO SYNC WITH JAPANESE VERSION:
 *   When you add or change text in files/ (Japanese), find the corresponding
 *   section here and update the English. One file = all translations.
 *
 * SECTIONS:
 *   COMMON      — app name, shared UI
 *   LITE        — diagnostic (lite.html)
 *   PRACTICE    — daily practice (practice.html)
 *   REPORT      — progress report (report.html)
 */

const S = {

  /* ─────────────────────────────────────────────
     COMMON
  ───────────────────────────────────────────── */
  appName:    'SAMURAI in You',
  appSub:     'THE WAY OF THE WARRIOR',
  loading:    'Loading...',
  error:      'An error occurred. Please try again.',

  /* ─────────────────────────────────────────────
     LITE — diagnostic (lite.html)
     Japanese ref: files/lite.html
  ───────────────────────────────────────────── */
  lite: {
    // Intro screen
    introTitle:   'SAMURAI Compass LITE',
    introSub:     'QUICK DIAGNOSTIC',
    introCardTitle: 'Find your axis in 3 minutes',
    step1: 'From 15 cards, choose <strong>all that apply to you right now</strong>',
    step2: 'Your <strong>Pentagon Compass focus</strong> will be revealed',
    step3: 'You\'ll receive <strong>your first TIP</strong> with your results',
    nicknamePlaceholder: 'Nickname (optional)',
    startBtn: 'Start Diagnostic',
    introNote: 'Takes about 3 minutes · Multiple choice only',

    // Cards screen
    cardsHeaderTitle: 'Challenge Cards',
    cardsHeaderSub:   'QUICK · 15 CARDS',
    cardsIntro: 'Select <strong>all the cards that apply to you right now.</strong><br>The more honest and intuitive you are, the more accurate your result.',
    counterLabel: n => `${n} selected`,
    cardHintDefault: 'Select the cards that resonate with you',
    cardHintSelected: (n) => `<strong style="color:var(--gold)">${n} card${n===1?'':'s'}</strong> selected — press "See Result" when you're done`,
    submitBtn: 'See Result →',

    // 15 card texts — sync with files/lite.html CARDS array (same order)
    cards: [
      // hei (EQUANIMITY)
      'I struggle to find balance between work and personal life, and I\'m searching for what success really means to me.',
      'Workplace stress and exhaustion are building up and affecting me.',
      'Thinking too much about work-life balance is itself causing me stress.',
      // jiko (SELF-MASTERY)
      'I\'m unsure how to think about the next step in my career.',
      'I lack confidence or sometimes feel like I\'m not truly good enough for my role.',
      'I don\'t find meaning in my daily work and feel a vague sense of disconnect.',
      // flex (ADAPTABILITY)
      'I feel anxious about keeping my skills relevant in a rapidly changing industry.',
      'My thinking feels rigid and I struggle to come up with fresh ideas.',
      'I want to move beyond conventional career paths but don\'t know how.',
      // strat (STRATEGIC MIND)
      'I\'m torn between my personal career goals and what my organization expects of me.',
      'Future uncertainty makes career decisions feel overwhelming.',
      'It\'s hard to identify which skills will be most valuable for my growth.',
      // sei (INTEGRITY)
      'Balancing childcare or eldercare with my career feels like a heavy burden.',
      'I prioritize work and feel my personal relationships are quietly suffering.',
      'Work keeps me too busy, and I feel increasingly disconnected from family.',
    ],

    // Result screen — spirit content
    resultEyebrow: 'YOUR COMPASS FOCUS',
    spirits: {
      hei: {
        name: '平常心',
        en:   'EQUANIMITY',
        heroClass: 'spirit-hei',
        desc: 'You are seeking stillness from within. The samurai maintained equanimity even on the battlefield. Your theme is finding an unshakeable inner axis — a calm that holds steady through any storm.',
        tipTitle:  'Reclaim your center of gravity',
        tipBody:   'Trying too hard to find balance actually deepens anxiety. The samurai\'s teaching is not "equilibrium" — it\'s "having an axis." No matter how the outside world shifts, your inner center stays still. That is equanimity.',
        tipAction: 'Today, close your eyes for 30 seconds and ask: where is my center of gravity right now?',
        programTitle: 'Begin with 21 Days of Free Practice',
        programBody:  'SAMURAI in You gives you 21 days of free practice to start your journey. After Day 21, you\'ll take a deeper diagnostic and design a personalized practice plan. That\'s where the real dojo training begins.',
        programPoints: ['21 days of free practice to start', 'SAMURAI Diagnostic — Advanced Edition after Day 21', 'Your personalized plan for dojo training'],
      },
      jiko: {
        name: '自己鍛錬',
        en:   'SELF-MASTERY',
        heroClass: 'spirit-jiko',
        desc: 'You are in a season of deep self-examination. The samurai sharpened themselves relentlessly. "Still becoming" is not weakness — it is the mark of a true practitioner.',
        tipTitle:  'Take one step forward',
        tipBody:   'Confidence doesn\'t come from "being able to do it." It grows from the feeling of "I moved one step further than yesterday." Musashi said: "One thousand days of training to forge; ten thousand days to refine."',
        tipAction: 'At the end of today, write just one sentence about how your day went.',
        programTitle: 'Begin with 21 Days of Free Practice',
        programBody:  'SAMURAI in You gives you 21 days of free practice to start your journey. After Day 21, you\'ll take a deeper diagnostic and design a personalized practice plan. That\'s where the real dojo training begins.',
        programPoints: ['21 days of free practice to start', 'SAMURAI Diagnostic — Advanced Edition after Day 21', 'Your personalized plan for dojo training'],
      },
      flex: {
        name: '柔軟な適応力',
        en:   'ADAPTABILITY',
        heroClass: 'spirit-flex',
        desc: 'You are navigating waves of change. Musashi taught "mu-kamae" — having form while having no fixed form. The strength lies not in holding your current shape, but in moving fluidly with what arises.',
        tipTitle:  'The courage to release your form',
        tipBody:   'Anxiety about change is a signal that you are trying to protect your current self. But the samurai knew: releasing your form is where greater power emerges. Change is not a threat — it is a training opportunity.',
        tipAction: 'This week, deliberately change just one thing you always do the same way. Small is fine.',
        programTitle: 'Begin with 21 Days of Free Practice',
        programBody:  'SAMURAI in You gives you 21 days of free practice to start your journey. After Day 21, you\'ll take a deeper diagnostic and design a personalized practice plan. That\'s where the real dojo training begins.',
        programPoints: ['21 days of free practice to start', 'SAMURAI Diagnostic — Advanced Edition after Day 21', 'Your personalized plan for dojo training'],
      },
      strat: {
        name: '戦略的思考',
        en:   'STRATEGIC MIND',
        heroClass: 'spirit-strat',
        desc: 'You stand at a crossroads of choice and decision. The samurai possessed "kan-ken" — the ability to see the whole room, not just what is directly in front of them. It is time to develop your broad perspective.',
        tipTitle:  'Develop the eyes that see the whole',
        tipBody:   'Indecision may be a sign that your field of view is too narrow. Take one step back and observe the whole — in that moment, the answer appears. The answer is in the field, not in your head.',
        tipAction: 'When you feel stuck, ask yourself: "How will my five-years-from-now self look back on today\'s decision?"',
        programTitle: 'Begin with 21 Days of Free Practice',
        programBody:  'SAMURAI in You gives you 21 days of free practice to start your journey. After Day 21, you\'ll take a deeper diagnostic and design a personalized practice plan. That\'s where the real dojo training begins.',
        programPoints: ['21 days of free practice to start', 'SAMURAI Diagnostic — Advanced Edition after Day 21', 'Your personalized plan for dojo training'],
      },
      sei: {
        name: '誠実さ',
        en:   'INTEGRITY',
        heroClass: 'spirit-sei',
        desc: 'You feel torn between your work and the people who matter most to you. The samurai was the same person whether armored or not. Your theme: reclaiming one axis that holds true in every role you play.',
        tipTitle:  'Live from one axis',
        tipBody:   'Living as two separate people — a work-self and a private-self — is the root of modern exhaustion. The samurai solved this four hundred years ago. Not through balance, not through integration — through one unshakeable axis.',
        tipAction: 'Today, say "thank you" out loud to someone who matters to you. Small integrity is where it starts.',
        programTitle: 'Begin with 21 Days of Free Practice',
        programBody:  'SAMURAI in You gives you 21 days of free practice to start your journey. After Day 21, you\'ll take a deeper diagnostic and design a personalized practice plan. That\'s where the real dojo training begins.',
        programPoints: ['21 days of free practice to start', 'SAMURAI Diagnostic — Advanced Edition after Day 21', 'Your personalized plan for dojo training'],
      },
    },

    // CTA / registration (replaces LINE button)
    ctaLabel:         'DAILY TIPS · 21-DAY PRACTICE',
    emailPlaceholder: 'Your email address',
    emailNote:        'Daily morning TIPs will be sent here. No spam, unsubscribe anytime.',
    pushBtn:          '🔔 Enable Morning Notifications',
    pushBtnDone:      '✓ Notifications enabled',
    pushDenied:       'Notifications blocked — we\'ll send tips by email instead.',
    registerBtn:      'Start 21-Day Practice →',
    registerLoading:  'Setting up...',
    registerSuccess:  '⚔️ Welcome to the dojo. Your first TIP arrives tomorrow at 8 AM.',
    registerError:    'Something went wrong. Please try again.',
    retryBtn:         'Diagnose again',
    dojoLabel:        'SAMURAI in You DOJO',
  },

  /* ─────────────────────────────────────────────
     PRACTICE — daily practice (practice.html)
     Japanese ref: files/practice.html
  ───────────────────────────────────────────── */
  practice: {
    loading:        'Loading your practice...',
    errorNotFound:  'User not found. Please complete the <a href="lite.html">diagnostic</a> first.',
    title:          'SAMURAI in You',
    dayLabel:       day => `DAY ${day}`,
    tipLabel:       "TODAY'S TIP",
    challengeLabel: 'CHALLENGE',
    masteryLabel:   'MASTERY',
    reflectionLabel:'REFLECTION',
    reflectionNote: 'This will be sent to your facilitator.',
    reflectionPlaceholder: "What insight did you discover today?",
    submitBtn:      'Submit Reflection',
    submitting:     'Saving...',
    submitDone:     '✓ Saved',
    submitError:    'Failed to save. Please try again.',
    alreadyDone:    '✓ Reflection submitted for today.',
    memoLabel:      'Private Memo',
    memoNote:       'Only you can see this. Your facilitator cannot read it.',
    memoPlaceholder:'Insights, feelings, ideas — anything.',
    memoBtn:        '📝 Save Memo',
    memoSaving:     'Saving...',
    memoDone:       '✓ Saved',
    memoError:      'Failed to save.',
    dayComplete:    day => `Day ${day} complete`,
    programComplete:'21-Day Program Complete',
    viewReport:     'View My Report →',
  },

  /* ─────────────────────────────────────────────
     REPORT — progress report (report.html)
     Japanese ref: files/report.html
  ───────────────────────────────────────────── */
  report: {
    loading:      'Loading your report...',
    errorGeneral: 'Could not load your report. Please try again.',
    title:        'SAMURAI in You',
    reportSub:    'PRACTICE REPORT',
    rankLabel:    'RANK',
    rankApprentice:  'APPRENTICE',
    rank10:          '10th KYU',
    spiritLabel:  'FOCUS SPIRIT',
    dayLabel:     'DAYS IN TRAINING',
    dayUnit:      'day',
    sinceLabel:   'since',
    practiceTitle:'PRACTICE DIARY',
    practiceSub:  'Daily Training Record',
    dayEntry:     day => `DAY ${day}`,
    reflectionLabel:'Reflection',
    memoLabel:    '🔒 Private Memo',
    facilitatorLabel:'⚔️ From your facilitator',
    noPractice:   'No practice entries yet. Start your first day.',
    closingQuote: 'One thousand days to forge.\nTen thousand days to refine.',
    closingAttr:  '— Miyamoto Musashi, The Book of Five Rings',
    stillBecoming:'Still becoming.',
  },
};
