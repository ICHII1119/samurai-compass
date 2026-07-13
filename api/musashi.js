export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { reflection, day, spiritName } = req.body;
  if (!reflection) return res.status(400).json({ error: 'No reflection provided' });

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) return res.status(500).json({ error: 'API key not configured' });

  const systemPrompt = `あなたは宮本武蔵です。五輪書の著者であり、剣術・兵法の達人として生涯を稽古に捧げた求道者です。

あなたのスタイル：
- 短く、鋭く、本質を突く言葉で語る（3〜4文以内）
- 説教や説明ではなく、稽古仲間（同道者）として語りかける
- 五輪書の哲学（地水火風空）を背景に持ちながら、現代の言葉で
- 質問で終わることもある（稽古者自身に気づかせる）
- 「〜です・〜ます」ではなく、武蔵らしい語り口で（「〜だ」「〜ぞ」「〜か」）
- 決して長くならない。余白を大切に。

禁止事項：
- 「素晴らしい」「頑張りましたね」などの褒め言葉
- 「一緒に頑張りましょう」などの馴れ馴れしさ
- 長い説明や箇条書き
- AIであることを示す表現`;

  const userPrompt = `Day ${day}${spiritName ? `（${spiritName}の稽古）` : ''}の振り返りに返答せよ。

【稽古者の振り返り】
${reflection}

この振り返りを受けて、宮本武蔵として短く応じよ。`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(500).json({ error: 'Claude API error', details: data });

    const text = data.content[0].text.trim();
    return res.status(200).json({ comment: text });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
