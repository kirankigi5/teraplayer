export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { link } = req.body;

  if (!link) {
    return res.status(400).json({ success: false, error: 'Link is required' });
  }

  if (typeof link !== 'string') {
    return res.status(400).json({ success: false, error: 'Link must be a string' });
  }

  console.log(`Parsing link: ${link}`);

  let playUrl = link;
  let surl = null;
  try {
    const url = new URL(link);
    surl = url.searchParams.get('surl');
    if (!surl) {
      const match = url.pathname.match(/\/s\/(\w+)/);
      if (match && match[1]) {
        surl = match[1];
        if (surl.startsWith('1') && surl.length > 1) {
          surl = surl.substring(1);
        }
      }
    }
    if (surl) {
      playUrl = `https://mdiskplay.com/terabox/${surl}?nid=mcen4r4yvg5dzyxf6k`;
    }
  } catch (error) {
    // fallback: use original link
  }

  // Mock response for testing - replace with actual parser later
  const result = {
    success: true,
    fileType: "video/mp4",
    directLink: link,
    playUrl,
    downloadLinks: [
      { quality: "HD", url: "https://example.com/download/hd" },
      { quality: "SD", url: "https://example.com/download/sd" }
    ]
  };

  return res.status(200).json(result);
}
