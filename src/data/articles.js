// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ARTICLES DATA FILE
//  To add a new article, copy one block below and fill in
//  your own title, category, date, excerpt, and content.
//  The website will automatically show it in the list
//  and create its own detail page — no other changes needed.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const articles = [
  {
    id: "iso-16232-complete-guide",           // URL slug — no spaces, use hyphens
    featured: true,                           // Show as the large featured card
    emoji: "🧪",                              // Icon shown on the card thumbnail
    category: "Technical Guide",
    title: "The Complete Guide to ISO 16232: Technical Cleanliness for Fluid Power Components",
    date: "April 2026",
    readTime: "12 min read",
    excerpt:
      "An in-depth walkthrough of ISO 16232 — covering extraction methods, analysis procedures, cleanliness code determination, and practical implementation strategies for modern manufacturing environments.",
    // Full article content — write each paragraph as a separate string in the array.
    // Use "## Heading" to insert a subheading inside the article.
    content: [
      "## What is ISO 16232?",
      "ISO 16232 is the international standard that defines methods for testing and measuring the technical cleanliness of components and systems used in fluid power applications. Originally developed for the automotive industry, it has become the benchmark across hydraulics, transmission systems, fuel injection, and braking components worldwide.",
      "## Why Technical Cleanliness Matters",
      "Particulate contamination is one of the leading causes of premature failure in precision assemblies. Even microscopic particles — often invisible to the naked eye — can cause wear, blockages, and catastrophic system failures. For OEM manufacturers and their supply chains, meeting cleanliness specifications is not optional; it is a contractual and safety requirement.",
      "## The Extraction Process",
      "The standard defines several validated extraction methods depending on component geometry and the nature of the contamination risk. These include pressure rinsing, ultrasonic agitation, and direct flushing. Selecting the correct method is critical to ensuring that the extracted particles are representative of the actual component cleanliness level.",
      "## Analysis and Cleanliness Codes",
      "Extracted particles are filtered and analysed both gravimetrically (by mass) and by particle count using calibrated light obscuration or microscopy equipment. Results are classified into standardised cleanliness codes, which allow direct comparison between components, suppliers, and production batches.",
      "## Practical Implementation",
      "Successfully implementing ISO 16232 in a manufacturing environment requires trained personnel, validated laboratory equipment, controlled environmental conditions, and a robust documentation process. Many companies underestimate the investment required — both in physical infrastructure and in technical expertise.",
      "## Conclusion",
      "ISO 16232 provides a rigorous, reproducible framework for measuring and communicating technical cleanliness. Organisations that invest in understanding and properly implementing this standard gain a significant quality advantage — and avoid the costly failures that contaminated components inevitably cause.",
    ],
  },

  {
    id: "particle-count-vs-gravimetric",
    featured: false,
    emoji: "⚗️",
    category: "Contamination Control",
    title: "Understanding Particle Count vs. Gravimetric Analysis",
    date: "March 2026",
    readTime: "7 min read",
    excerpt:
      "When should you use particle count analysis, and when is gravimetric the right choice? This article breaks down the trade-offs and helps you choose the right method for your application.",
    content: [
      "## Two Complementary Approaches",
      "Technical cleanliness analysis relies on two primary measurement methods: gravimetric analysis, which measures the total mass of contamination extracted from a component, and particle count analysis, which measures the number and size distribution of individual particles. Both methods are defined within ISO 16232 and VDA 19, and both have distinct strengths.",
      "## Gravimetric Analysis",
      "Gravimetric testing involves weighing a filter membrane before and after extraction to determine the total mass of particles collected. It is straightforward, reproducible, and gives a single pass/fail value against a mass-based cleanliness specification. It is particularly useful when the contamination risk is driven by bulk material — such as machining swarf or casting sand — rather than isolated hard particles.",
      "## Particle Count Analysis",
      "Particle counting provides a size-classified distribution of particles — for example, the number of particles greater than 25 µm, 50 µm, 100 µm, and 200 µm. This is essential where specific large particles pose a disproportionate risk to downstream components, such as in fuel injector systems or high-pressure hydraulic valves.",
      "## Choosing the Right Method",
      "In practice, most cleanliness specifications require both methods. However, if resources are limited, the choice depends on the failure mode being prevented. If large isolated particles are the primary risk, particle counting is essential. If the concern is a general contamination load from a machining or casting process, gravimetric analysis may be sufficient as a production control tool.",
      "## Conclusion",
      "Neither method is universally superior. A well-designed technical cleanliness programme uses both, applying each where it adds the most value. Understanding the distinction helps engineers write better specifications and make smarter decisions during process validation.",
    ],
  },

  {
    id: "5-common-cleaning-mistakes",
    featured: false,
    emoji: "🏭",
    category: "Process Engineering",
    title: "5 Common Mistakes in Industrial Parts Cleaning",
    date: "February 2026",
    readTime: "5 min read",
    excerpt:
      "From incorrect chemistry selection to improper rinsing sequences, these five errors account for the majority of cleanliness failures in production environments — and how to avoid them.",
    content: [
      "Despite significant investment in cleaning equipment, many manufacturing sites consistently fail to meet cleanliness targets. The root cause is rarely the machine itself — it is almost always one of the following five process errors.",
      "## 1. Wrong Chemistry for the Contamination Type",
      "Aqueous cleaners, solvent-based systems, and alkaline solutions are each suited to different contamination types. Using an alkaline cleaner to remove light machining oils on aluminium components, for example, can cause both ineffective cleaning and surface damage. Always match the chemistry to the soil and substrate.",
      "## 2. Insufficient Rinsing",
      "Cleaning chemistry residue left on components is itself a contamination. Many facilities under-specify their rinse stages — particularly the final deionised water rinse — creating ionic contamination that is invisible under standard particle analysis but catastrophic in electronic or precision hydraulic assemblies.",
      "## 3. Re-contamination After Cleaning",
      "Achieving a clean component is only half the challenge. Handling, transport, and packaging in non-cleanroom conditions immediately after cleaning is one of the most common causes of field failures. Cleanroom-grade packaging and trained operators are not optional extras — they are part of the cleanliness process.",
      "## 4. No Process Validation",
      "Many production lines run cleaning processes that were set up years ago and have never been formally validated. Process parameters drift, bath chemistry degrades, and spray nozzles block. Without periodic validation and monitoring, cleanliness performance deteriorates silently.",
      "## 5. Testing the Wrong Thing",
      "Cleanliness testing is often performed on a different component, at a different stage of production, or using a different extraction method than specified by the customer. Ensuring that the test mirrors exactly what the customer requires — component, extraction method, analysis method, and acceptance criteria — is the foundation of a reliable quality system.",
    ],
  },

  {
    id: "vda-19-vs-iso-16232",
    featured: false,
    emoji: "📐",
    category: "Standards & Compliance",
    title: "VDA 19 vs ISO 16232: Key Differences Explained",
    date: "January 2026",
    readTime: "6 min read",
    excerpt:
      "Both standards define technical cleanliness requirements but with different scopes. This comparison helps quality engineers understand which applies to their product and how to meet both efficiently.",
    content: [
      "## Origins and Scope",
      "VDA 19 is a German automotive industry guideline published by the VDA (Verband der Automobilindustrie), originally developed to meet the specific cleanliness demands of German OEMs. ISO 16232 is the international standard derived largely from VDA 19, but with broader applicability across global fluid power industries.",
      "## Structural Differences",
      "VDA 19 is structured in two parts: Part 1 covers technical cleanliness requirements for components in series production, while Part 2 covers cleanliness requirements for assembly environments. ISO 16232 focuses primarily on component cleanliness testing and does not have an equivalent to VDA 19 Part 2.",
      "## Technical Alignment",
      "The test methods in both standards are substantially aligned. Extraction procedures, filtration requirements, and analysis methods are largely equivalent. However, VDA 19 includes additional requirements around laboratory qualification and method validation that are not explicitly stated in ISO 16232.",
      "## Which Standard Applies to You?",
      "If you supply components to German OEMs (BMW, Mercedes-Benz, Volkswagen Group, ZF, Bosch), you are likely required to comply with VDA 19. If your customer base is broader or non-German, ISO 16232 is typically sufficient. Many organisations comply with both simultaneously, as the technical requirements are so closely aligned.",
      "## Practical Advice",
      "Build your technical cleanliness process to the more demanding of the two standards. In practice, a laboratory and process that meets VDA 19 will automatically satisfy ISO 16232 requirements. Documenting compliance with both in your quality management system protects against customer audits from either direction.",
    ],
  },

  // ─── COMING SOON — dummy placeholder articles ───────────────────────────────
  {
    id: "contamination-control-in-ev",
    comingSoon: true,
    featured: false,
    emoji: "⚡",
    category: "Industry Trends",
    title: "Technical Cleanliness Challenges in Electric Vehicle Manufacturing",
    date: "Coming Soon",
    readTime: "8 min read",
    excerpt:
      "EV drivetrains introduce new cleanliness demands beyond traditional ICE requirements. Explore how OEMs and tier-1 suppliers are adapting their contamination control strategies.",
    content: [],
  },
  {
    id: "setting-up-cleanliness-lab",
    comingSoon: true,
    featured: false,
    emoji: "🔬",
    category: "Lab & Process",
    title: "How to Set Up an In-House Technical Cleanliness Lab",
    date: "Coming Soon",
    readTime: "10 min read",
    excerpt:
      "A practical guide to equipment selection, room layout, qualification procedures, and common pitfalls when establishing a new cleanliness testing laboratory.",
    content: [],
  },
  {
    id: "cleanliness-specification-writing",
    comingSoon: true,
    featured: false,
    emoji: "📋",
    category: "Standards & Compliance",
    title: "Writing Effective Technical Cleanliness Specifications",
    date: "Coming Soon",
    readTime: "6 min read",
    excerpt:
      "A poorly written cleanliness spec causes disputes, failed audits, and non-conforming parts. Learn how to write clear, measurable, and enforceable cleanliness requirements.",
    content: [],
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  HOW TO ADD A NEW ARTICLE — copy this template and paste
//  it inside the array above:
//
//  {
//    id: "my-new-article-title",   // unique URL slug
//    featured: false,              // set true for ONE article only
//    emoji: "📄",                  // any emoji for the thumbnail
//    category: "My Category",
//    title: "My Article Title",
//    date: "May 2026",
//    readTime: "5 min read",
//    excerpt: "Short summary shown on the article card.",
//    content: [
//      "## First Heading",
//      "First paragraph text...",
//      "## Second Heading",
//      "Second paragraph text...",
//    ],
//  },
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
