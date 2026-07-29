export const productsData = {
  curamix: {
    id: 'curamix',
    name: 'CuraMix',
    category: 'FERTILISER',
    tagline: 'Curated Organic Soil Blend',
    description:
      'CURA MIX is a curated fertiliser by Biovik. Just share your soil test report, crop type, and growing cycle — we curate the right organic blend tailored specifically for your field.',
    details:
      'Custom engineered by Biovik Labs after thorough spectral and biological testing of your soil sample. We calibrate organic nutrient carriers, microbial consortia, and bio-catalyst ratios to match your crop type and growing cycle — delivering field-specific fertility without synthetic residue.',
    features: [
      'Soil Report Based Customisation',
      'Balanced NPK Bio-Catalysts',
      'Zero Synthetic Residue',
    ],
    science: [
      {
        title: 'Soil Test Analysis',
        body: 'Your submitted soil report is mapped against nutrient deficits, pH bands, and organic matter baselines to define a precise formulation profile.',
      },
      {
        title: 'Crop & Cycle Matching',
        body: 'Active fractions are tuned to the crop species and growth window so nutrient delivery aligns with uptake peaks across the season.',
      },
      {
        title: 'Field-Ready Blend',
        body: 'The final CuraMix batch is homogenized for consistent potency, shelf stability, and compatible deployment via foliar or soil application.',
      },
    ],
    dosing: {
      mix: '5–10 mL per 1 L water',
      frequency: 'Every 10–14 days during active growth',
      mode: 'Foliar spray / drip-compatible / drone delivery',
    },
    specs: ['Custom Soil Blend', 'Crop-Cycle Tuned', '0% Synthetic Residue'],
    image: '/assets/products/curamix.png',
    imageFallback: '/assets/products/curamix.svg',
    videoSrc: '/assets/videos/products/curamix-demo.mp4',
    poster: '/assets/products/curamix.png',
    contactCta: {
      label: 'Upload Soil Report',
      to: '/contact?product=CuraMix&inquiry=Product%20Inquiry',
    },
  },
  'bio-bloom': {
    id: 'bio-bloom',
    name: 'Bio-Bloom',
    category: 'HORTICULTURE',
    tagline: 'Organic Bloom Booster',
    description:
      'Bio-Bloom is an organic bloom booster by Biovik for fruits and flowers, designed to support healthier blooms, better fruit set, and improved overall yield when sprayed during the flowering and fruiting stage.',
    details:
      'Triggers natural phytohormone pathways to accelerate bud formation and increase sugar/brix levels in harvest. Application is timed to flowering and fruiting windows for maximum canopy response and marketable yield.',
    features: [
      'Flowering & Fruiting Stage Optimized',
      'Enhanced Fruit Set Ratio',
      'Improved Shelf-Life & Color',
    ],
    science: [
      {
        title: 'Flowering Window Activation',
        body: 'Bio-Bloom supports bud initiation and bloom density when applied at the onset of flowering, aligning with natural reproductive signaling.',
      },
      {
        title: 'Cell Elongation & Fruit Set',
        body: 'Bioactive metabolites encourage cell expansion and stronger fruit set, improving cluster fill and reducing premature drop.',
      },
      {
        title: 'Harvest Yield Enhancement',
        body: 'Continued use through early fruiting elevates sugar pathways and visual quality metrics for higher harvest value.',
      },
    ],
    dosing: {
      mix: '5–10 mL per 1 L water',
      frequency: '2–3 sprays during flowering; 1–2 during early fruiting',
      mode: 'Even foliar spray (morning / evening)',
    },
    specs: ['Flowering & Fruiting Stage', 'Bloom Density Boost', 'Brix / Color Support'],
    image: '/assets/products/bio-bloom.png',
    imageFallback: '/assets/products/bio-bloom.svg',
    videoSrc: '/assets/videos/products/bio-bloom-demo.mp4',
    poster: '/assets/products/bio-bloom.png',
  },
  'bio-reaper': {
    id: 'bio-reaper',
    name: 'Bio Reaper',
    category: 'WEEDICIDE',
    tagline: 'Root-Level Organic Weed Control',
    description:
      'Bio Reaper is a first-of-its-kind organic weedicide designed to eliminate targeted weeds at the root level. It destroys the mechanism of photosynthesis and prevents further growth at the tissue level by disrupting Xylem & Phloem transport.',
    details:
      'Penetrates vascular systems to shut down light-harvesting complex proteins without leaving toxic chemicals in soil. Targeted tissue collapse stops regrowth from the root upward.',
    features: [
      'Root & Vascular Transport Disruption',
      'Photosynthesis Mechanism Blocker',
      'Eco-Friendly Breakdown',
    ],
    science: [
      {
        title: 'Photosynthesis Shutdown',
        body: 'Active fractions interrupt energy capture in weed leaf tissue, collapsing photosynthetic throughput at the cellular level.',
      },
      {
        title: 'Xylem & Phloem Disruption',
        body: 'Vascular movement is blocked so nutrients and water cannot sustain further tissue expansion or recovery.',
      },
      {
        title: 'Root-Level Elimination',
        body: 'Downward systemic action reaches root structures, preventing resprouting while preserving surrounding crop safety profiles.',
      },
    ],
    dosing: {
      mix: '8–12 mL per 1 L water (spot treatment)',
      frequency: 'Single pass; recheck in 7–10 days',
      mode: 'Targeted spray on weed canopy — avoid crop overspray',
    },
    specs: [
      'Photosynthesis Disruption',
      'Xylem / Phloem Block',
      'Root-Level Control',
    ],
    image: '/assets/products/bio-reaper.png',
    imageFallback: '/assets/products/bio-reaper.svg',
    videoSrc: '/assets/videos/products/bio-reaper-demo.mp4',
    poster: '/assets/products/bio-reaper.png',
  },
  trishul: {
    id: 'trishul',
    name: 'Trishul',
    category: 'PREVENTIVE PEST CONTROL',
    tagline: 'Eco-Friendly Crop Protection',
    description:
      'Trishul is a first-of-its-kind organic pest control solution by Biovik that helps protect crops from pest attacks while remaining completely safe for humans, soil, and groundwater. It operates on a preventive, nature-friendly approach to foster a cleaner farm ecosystem.',
    details:
      'Forms a biological microscopic shield around plant epidermis, repelling larval and adult pest attacks naturally while remaining compatible with soil microbiota and groundwater systems.',
    features: [
      '100% Safe for Humans & Soil',
      'Groundwater Friendly',
      'Preventive Resistance Shield',
    ],
    science: [
      {
        title: 'Preventive Epidermal Barrier',
        body: 'Creates a nature-aligned surface defense that deters early pest colonization before damage thresholds are reached.',
      },
      {
        title: 'Human & Soil Safe Profile',
        body: 'Formulated without residual toxins that compromise farm workers, produce safety, or living soil communities.',
      },
      {
        title: 'Groundwater Protection',
        body: 'Biodegradable pathways ensure active components do not accumulate in aquifers or long-term water tables.',
      },
    ],
    dosing: {
      mix: '5–10 mL per 1 L water',
      frequency: 'Preventive schedule every 10–12 days in pest-pressure seasons',
      mode: 'Full-canopy foliar spray / drone-assisted coverage',
    },
    specs: ['Human & Soil Safe', 'Groundwater Friendly', 'Preventive Shield'],
    image: '/assets/products/trishul.png',
    imageFallback: '/assets/products/trishul.svg',
    videoSrc: '/assets/videos/products/trishul-demo.mp4',
    poster: '/assets/products/trishul.png',
  },
}

export const productList = Object.values(productsData)

export function getProduct(id) {
  return productsData[id] ?? null
}
