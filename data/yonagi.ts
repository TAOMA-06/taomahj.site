export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  focal?: string;
  sourceUrl?: string;
  credit?: string;
};

export type MenuItem = {
  name: string;
  english?: string;
  price: string;
  note?: string;
  image?: ImageAsset;
};

export type MenuCategory = {
  id: string;
  name: string;
  english: string;
  note?: string;
  items: MenuItem[];
};

export const yonagiImages = {
  interior: {
    src: '/assets/yonagi/interior.webp',
    alt: '暖かな照明と木のカウンターが並ぶ小さな食堂の店内',
    width: 1067,
    height: 1600,
    focal: '48% 54%',
    sourceUrl: 'https://www.pexels.com/photo/32722834/',
    credit: 'Richard L / Pexels'
  },
  grill: {
    src: '/assets/yonagi/grill.webp',
    alt: '赤く熾った炭の上で魚を焼く料理人の手元',
    width: 1400,
    height: 934,
    focal: '66% 52%',
    sourceUrl: 'https://www.pexels.com/photo/6872133/',
    credit: 'Quang Nguyen Vinh / Pexels'
  },
  exterior: {
    src: '/assets/yonagi/exterior.webp',
    alt: '暖簾と提灯の灯りが迎える夜の小さな日本料理店',
    width: 676,
    height: 1200,
    focal: '50% 46%',
    sourceUrl: 'https://www.pexels.com/photo/35132876/',
    credit: 'Muharrem Alper / Pexels'
  },
  table: {
    src: '/assets/yonagi/table.webp',
    alt: '木の温もりと柔らかな光に包まれた二人掛けの席',
    width: 900,
    height: 1200,
    focal: '52% 55%',
    sourceUrl: 'https://www.pexels.com/photo/29888413/',
    credit: 'Markus Winkler / Pexels'
  },
  fish: {
    src: '/assets/yonagi/fish.webp',
    alt: '香草と柑橘を添えた本日の焼き魚',
    width: 662,
    height: 900,
    sourceUrl: 'https://www.pexels.com/photo/28843593/'
  },
  sashimi: {
    src: '/assets/yonagi/sashimi.webp',
    alt: '大葉を添えた季節のお造り',
    width: 601,
    height: 900,
    sourceUrl: 'https://www.pexels.com/photo/23531630/'
  },
  tuna: {
    src: '/assets/yonagi/tuna.webp',
    alt: '薬味と青味を合わせた鮪の山葵醤油',
    width: 506,
    height: 900,
    sourceUrl: 'https://www.pexels.com/photo/5691468/'
  },
  salmon: {
    src: '/assets/yonagi/salmon.webp',
    alt: '香味野菜を添えた炙りサーモン',
    width: 601,
    height: 900,
    sourceUrl: 'https://www.pexels.com/photo/3296543/'
  },
  tempura: {
    src: '/assets/yonagi/tempura.webp',
    alt: '季節の野菜と魚を盛り合わせた天ぷら御膳',
    width: 600,
    height: 900,
    sourceUrl: 'https://www.pexels.com/photo/35132140/'
  },
  riceBowl: {
    src: '/assets/yonagi/ricebowl.webp',
    alt: '鮭と薬味を彩りよく盛り付けた小さな海鮮丼',
    width: 900,
    height: 507,
    sourceUrl: 'https://www.pexels.com/photo/37058820/'
  }
} satisfies Record<string, ImageAsset>;

export const yonagi = {
  identity: {
    name: '夜凪食堂',
    reading: 'よなぎしょくどう',
    english: 'Yonagi Shokudo',
    tagline: '季節の焼き物と、静かなカウンター。',
    area: '大阪・南堀江',
    openDays: '火曜–日曜',
    shortIntro:
      '旬の魚と野菜を、炭の香りとともに。お一人でも、大切な方とも、静かな夜を過ごせる十二席の季節料理店です。',
    longIntro:
      '夜凪とは、日が落ちたあとに海がしずかに凪ぐこと。南堀江の路地で、その日に届いた魚と野菜に向き合い、炭火の焼き物を中心に少しずつお出しします。派手さよりも、出汁の香り、炭のはぜる音、食後に残る余韻を大切に。カウンターでは一人の晩酒を、テーブルでは二人の時間を。季節が移ろうたびに、また帰りたくなる一皿をご用意しています。',
    englishIntro:
      'A twelve-seat seasonal kitchen in Minamihorie, Osaka, centered on charcoal-grilled fish, vegetables and the quiet pleasure of a counter seat.'
  },
  contact: {
    phoneDisplay: '06-1234-5678',
    phoneHref: 'tel:+81612345678',
    address: '大阪府大阪市西区南堀江 X-X-X',
    hours: '火–日 17:30–23:00（L.O. 22:00）',
    closed: '月曜定休',
    mapHref:
      'https://www.google.com/maps/search/?api=1&query=%E5%A4%A7%E9%98%AA%E5%BA%9C%E5%A4%A7%E9%98%AA%E5%B8%82%E8%A5%BF%E5%8C%BA%E5%8D%97%E5%A0%80%E6%B1%9F',
    email: 'taomahj834225@outlook.com',
    emailHref: 'mailto:taomahj834225@outlook.com'
  },
  sellingPoints: [
    { number: '一', title: '季節を焼く', text: '旬の魚と野菜を、香りまでおいしい火入れで。' },
    { number: '二', title: '十二席だけ', text: 'カウンター八席、テーブル四席。静かな距離感です。' },
    { number: '三', title: '迷わず来店', text: '電話・地図・営業時間を、すぐ見つけられるご案内。' }
  ],
  sMenu: [
    { name: '本日の焼き魚', price: '¥1,380〜', image: yonagiImages.fish },
    { name: '季節のお造り', price: '¥1,480', image: yonagiImages.sashimi },
    { name: '鮪の山葵醤油', price: '¥1,180', image: yonagiImages.tuna },
    { name: '炙りサーモン 香味野菜', price: '¥1,280', image: yonagiImages.salmon },
    { name: '季節の天ぷら', price: '¥1,100', image: yonagiImages.tempura },
    { name: '締めの海鮮小丼', price: '¥980', image: yonagiImages.riceBowl }
  ] satisfies MenuItem[],
  pMenu: [
    {
      id: 'omakase', name: 'おまかせ', english: 'OMAKASE', note: '前日までのご予約をおすすめします。',
      items: [
        { name: '季節のおまかせ　五品', english: 'Seasonal tasting, 5 courses', price: '¥4,500' },
        { name: '季節のおまかせ　七品', english: 'Seasonal tasting, 7 courses', price: '¥6,000' },
        { name: '夜凪の特別コース', english: 'Yonagi special course', price: '¥7,500' }
      ]
    },
    {
      id: 'grill', name: '焼き物', english: 'FROM THE CHARCOAL GRILL',
      items: [
        { name: '本日の鮮魚　炭火焼き', price: '¥1,380〜' },
        { name: '河内鴨の山椒焼き', price: '¥1,680' },
        { name: '蓮根と九条ねぎ', price: '¥880' },
        { name: '厚揚げ　麦味噌添え', price: '¥720' }
      ]
    },
    {
      id: 'small', name: '一品', english: 'SMALL PLATES',
      items: [
        { name: '季節のお造り', price: '¥1,480' },
        { name: 'だし巻きたまご', price: '¥780' },
        { name: '白味噌クリームチーズ', price: '¥650' },
        { name: '鶏と生姜の土鍋ごはん', price: '¥1,600' },
        { name: '自家製ほうじ茶プリン', price: '¥580' }
      ]
    },
    {
      id: 'drink', name: 'お飲み物', english: 'DRINKS',
      items: [
        { name: '日本酒　季節の一杯', price: '¥900〜' },
        { name: '生ビール', price: '¥680' },
        { name: '自家製山椒サワー', price: '¥750' },
        { name: '奈良県産ぶどうジュース', price: '¥600' }
      ]
    }
  ] satisfies MenuCategory[],
  menuHighlights: [yonagiImages.fish, yonagiImages.tuna, yonagiImages.riceBowl],
  space: [
    { title: 'カウンター', english: 'COUNTER / 8 SEATS', text: '料理人の手元と炭の音を、目の前で。', image: yonagiImages.interior },
    { title: '二人席', english: 'TABLE / 4 SEATS', text: '会話を邪魔しない、柔らかな灯りの一卓。', image: yonagiImages.table },
    { title: '路地の灯り', english: 'MINAMIHORIE', text: '暖簾をくぐれば、街の速さから少し離れる。', image: yonagiImages.exterior }
  ],
  reservation: {
    intro: 'カウンター席はご予約を優先しています。2名様以上のご来店は、なるべく前日までにお電話ください。',
    english: 'Counter seating is prioritized for reservations. For parties of two or more, please call by the day before your visit.',
    rules: [
      '当日の空席はお電話でご確認ください。',
      'ご予約時間から15分を過ぎる場合はご連絡ください。',
      '前日以降のコースキャンセルには料金がかかる場合があります。',
      '苦手な食材やアレルギーはご予約時にお伝えください。'
    ]
  },
  seo: {
    s: {
      title: '夜凪食堂｜大阪・南堀江の季節料理と炭火焼き｜Demo S',
      description: '季節の焼き物と、静かなカウンター。大阪・南堀江の十二席の季節料理店「夜凪食堂」の制作デモです。'
    },
    p: {
      title: '夜凪食堂｜季節と炭火を味わう南堀江の一夜｜Demo P',
      description: '炭火の焼き物を中心に、季節のおまかせと日本酒を。物語、空間、予約案内を備えた夜凪食堂 Pro 制作デモ。'
    }
  }
};
