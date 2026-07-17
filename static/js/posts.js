// Blog posts, newest first. To add a post, append an object here:
//   title  — shown in the display font
//   teaser — one-line subtitle in the list view
//   date   — ISO string (YYYY-MM-DD), formatted for display automatically
//   body   — array of paragraphs or structured blocks ({ type, text/items })
// Read time is computed automatically from the body.
window.POSTS = [
  {
    title: "Attention can be an Asset: Zora and the On-Chain Attention Flywheel",
    teaser: "Thoughts on a new age social platform being built to reward consumers + creators",
    date: "2025-05-15",
    body: [
      "In today’s digital economy, attention is everything. It's the human focus that powers platforms and drives value. Web2 giants built empires by capturing our clicks, views, and likes, then monetizing them through ads and data. Yet, for users, attention remains largely unrewarded. We give our time and engagement freely, while platforms and a few top creators capture the lion's share of the value. Everyday users and curators, those who share or amplify content, typically earn nothing. This disconnect, where attention is valuable but benefits accrue elsewhere, highlights a fundamental market inefficiency. Attention is abundant, but the systems to truly price and reward it are broken. We need a new paradigm.",
      "Blockchain technology offers a remedy: by making digital interactions ownable and tradeable, it can finally price attention correctly. Tokenization lets a “like,” “share,” or early discovery become a verifiable stake in the content’s future value, aligning incentives between creators, curators, and audiences instead of funneling everything to a centralized platform.",
      "This is the backdrop against which Zora emerges, not just another social app, but a protocol that turns each piece of content, and the attention it earns, into a liquid on-chain asset. Through tokenization, Zora aims to correct Web2’s mis-pricing and build a social ecosystem where the people who create and amplify culture share directly in its upside.",
      {
        type: "heading",
        text: "A New Model for On-Chain Attention Markets",
      },
      "Zora is a social network built on crypto technology with a simple yet powerful idea: every piece of content can become a tradable digital asset, capturing the value of the attention it receives. When you post on Zora, your content isn't just data in a feed. It's minted into a unique token on a public blockchain. Each post gets its own coin (like a mini-stock) that anyone can buy, collect, or sell.",
      "This design flips the script on traditional social media monetization. Instead of ads, engagement drives value through direct ownership and a market. Creators earn directly from sales and trades of their content's token. If a post goes viral, the creator earns as demand and price increase. Similarly, early supporters or those who helped spread the content can benefit financially by holding or trading its token.",
      "This creates a self-reinforcing \"attention economy\" flywheel with four key roles:",
      {
        type: "list",
        items: [
          "Creators: Make the content.",
          "Curators: Discover and amplify the best content.",
          "Consumers: Provide attention and engagement.",
          "Speculators (Collectors/Traders): Invest in content tokens, providing liquidity and price signals.",
        ],
      },
      "Note: these 4 roles were taken from a X post by WagmiAlexander. Would highly recommend reading!",
      "Each role is essential, and their interaction can create a powerful feedback loop: Content attracts Consumers, Curators amplify it, driving more Consumer attention. This attention attracts Speculators who invest, adding monetary value. Value accrual incentivizes more Creators, rewards Curators and Speculators, and provides better content for Consumers. It's a virtuous cycle.",
      "Let's look at each role's contribution.",
      "Creators: Originators of Content and Value",
      "Creators provide the initial spark. On Zora, posting content instantly tokenizes it, giving creators direct ownership and a stake in their work's market value. They launch a micro-economy with each post. Earnings aren't dependent on ads or platform algorithms; they're baked into the content token itself, scaling directly with its popularity and market activity. If your post's token gains value through demand and trading, you earn from those transactions (like royalties). This aligns creator incentives with true audience appreciation, not just algorithm hacks.",
      "Beyond earnings, Zora offers creators sovereignty. Content is on-chain, meaning creators aren't beholden to a central platform's rules or sudden changes. Their work is their owned, tokenized property. This counters the feeling creators often have on legacy platforms - building on rented land. On Zora, the market, not a central authority, decides what a post is worth. Creators become micro-entrepreneurs, launching \"content coins\" that rise and fall with collective interest. Their role in the flywheel is to start it, creating engaging content that invites their audience to become stakeholders.",
      "Curators: Amplifiers of Attention and Taste",
      "Curators filter and amplify content - they are the human algorithms. In Web2, retweeting or sharing adds value by increasing reach, but this curatorial labor is rarely rewarded beyond social clout.",
      "Zora changes this. Curators who spot great content early can become investors by buying its token. Sharing and promoting content isn't just altruistic. It's also a form of investment in that content's potential market value. If content they backed early becomes popular, their tokens can appreciate, rewarding their insight. Curation becomes a form of investing in culture. This encourages a more meritocratic discovery process, less reliant on opaque algorithms. Curators align their personal taste (\"I love this\") with potential financial upside (\"If others love it too, my stake grows\"). They add value by surfacing gems and guiding attention, strengthening the flywheel by ensuring good content finds its audience. While not every curator buys tokens, the possibility of financial reward alongside social recognition changes the dynamic of sharing.",
      "Consumers: The Audience as the Attention Engine",
      "Consumers are the audience providing the essential attention. In Web2, they are often called \"the product\" because their attention is sold to advertisers. On Zora, while content is still free to view for anyone (no paywalls for scrolling!), consumers are integral to value creation in a different way.",
      "Their attention and engagement signal what content is interesting or trending. Likes, comments, shares, and viewing time contribute to a post's cultural significance and perceived value. This popularity attracts collectors/speculators who invest in the content token, effectively subsidizing the free experience for everyone else. Consumers are the engine providing the raw attention. While an individual consumer might not earn directly from watching, they benefit from an ad-free environment where content quality might be higher because value flows from genuine interest reflected in the market, not just clickbait optimized for ads. Consumers collectively crowdsource content valuation through their behavior, giving them more influence than opaque algorithms.",
      "Speculators: Market Makers in the Attention Economy",
      "Speculators (collectors/traders) are new to the social media mix. By tokenizing content, Zora creates a market where people can invest in a post like a collectible or stock. Speculators buy content tokens betting on their future value. They act as market makers, providing liquidity and helping discover price.",
      "Introducing speculation might sound like turning culture into a casino, but in a balanced system, it serves a function: translating present attention into potential future value. Speculators inject capital and create price signals. If a post's token rises, it signals market belief in its lasting value, guiding creators, curators, and other consumers.",
      "Speculators add value by providing liquidity (making tokens easy to buy/sell) and rewarding early insight. Their potential for profit attracts capital. Crucially, Zora's design includes creator royalties on trades, meaning creators earn even from purely speculative activity. Unlike Web2, where the creator of a viral tweet sees no money from Wall Street trading Twitter stock, Zora ensures the creator is always connected to the value flow generated by their content's market activity. Speculation, when balanced, helps complete the attention flywheel: content -> attention -> valuation -> reward, fueling more creation. It acknowledges that where there's attention, markets can form, bringing them on-chain.",
      {
        type: "heading",
        text: "Web2's Bottlenecks and Zora's Answers",
      },
      "Comparing Zora to legacy platforms highlights its unique approach:",
      {
        type: "list",
        items: [
          "Centralized Control vs. Decentralized Ownership: Web2 platforms control everything; users rent space. Zora puts content ownership on-chain. No single entity can arbitrarily censor or change rules. Creators gain sovereignty, while users own their digital property.",
          "Ad-Driven vs. Direct Token Monetization: Web2 sells attention via ads, leading to engagement-farming and intrusive experiences. Zora bypasses ads, allowing value to flow directly from those who collect the content to the creators and early supporters. Consumption remains free, subsidized by collectors.",
          "No User Financial Participation vs. Multisided Incentives: In Web2, only platforms and top creators earn significantly. Zora enables anyone (creator, curator, early collector) to potentially benefit from a piece of content's success, recognizing contributions at all levels of the ecosystem.",
          "Fragmented/Non-Transferrable Value vs. Unified On-Chain Market: Web2 value is siloed. Zora's tokenized content is an interoperable asset on the blockchain, tradeable in open markets with built-in liquidity. Content gains a longer economic tail, becoming a lasting, portable asset.",
        ],
      },
      "Zora addresses Web2's core limitations by making attention and creativity liquid, owned, and transparently valued. It replaces opaque, top-down models with an open, market-driven ecosystem where value flows among participants.",
      {
        type: "heading",
        text: "A Speculative Future: Scaling the Attention Market",
      },
      "What if this model scales? We could see mass-market decentralized social networks rivaling today's giants but running on fundamentally different principles. Social media could merge with open marketplaces where content value is measured not just by likes, but by market cap. Popular memes become \"blue-chip content\" for a time, tradable assets reflecting cultural impact.",
      "This future could birth new roles: \"trend investors,\" \"curatorial DAOs\" pooling funds to back content, or influencers managing portfolios of content tokens. Fan clubs could become investment clubs. Tokenized attention markets could extend beyond social posts - to music, journalism, or even aspects of personal reputation. Attention becomes a recognized asset class.",
      "A decentralized attention market could democratize media economics. Anyone can invest in the cultural products they believe in, distributing capital differently than traditional gatekeepers. Niche content could find global patrons. Platforms would compete by delivering real value to users (stakeholders) rather than just optimizing for endless scrolling.",
      "Challenges exist: Could financializing social interaction create perverse incentives? Could bubbles form? Yes, but these are dynamics present in many markets, including today's virality. With transparency and evolving community norms, markets can adapt. Optimistically, transparent markets could ensure truly valuable creators get sustained backing, smoothing creative careers. The core idea forces us to rethink: What do we value in our collective attention, and how should that value be shared?",
      {
        type: "heading",
        text: "Final Thoughts",
      },
      "At the heart of Zora's model is the powerful connection between attention and ownership - the desire not just to consume, but to belong to and participate in content's story. By linking attention with ownership, Zora taps into deeper motivations: pride of ownership, the thrill of investment, the commitment of patronage. Owning a token of content you love changes your relationship from passive observer to active participant.",
      "This model suggests that well-designed systems can align self-interest with passion. Creators can pursue artistic expression and make a living; curators' genuine taste can align with potential profit. The goal isn't replacing passion with greed, but providing sustainability and recognition for creative and curatorial effort.",
      "Admittedly, Zora's on-chain attention market is a bold experiment. It challenges the notion that only platforms profit from our collective presence. It posits a future where every moment of attention can be a valuable, owned exchange. It's clear to me atleast that they're trying to reshape the social internet's business model. Whether Zora is the answer or sparks further innovation, the core insight holds: attention is key, and giving users ownership empowers them. In a world of on-chain attention markets, we become stakeholders in the culture we create. This vision brings the economics of the internet closer to serving the people using it, creating a flywheel of creativity, curation, consumption, and speculation centered on what we collectively find inspiring and valuable.",
    ],
  },
];
