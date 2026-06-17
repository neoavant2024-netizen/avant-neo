// サイト全体で参照する企業情報・ナビゲーション定義

// Web3Forms のアクセスキー（https://web3forms.com で info@avant-neo.jp を登録して取得）。
// 公開して問題ない値（送信先メールはサービス側で紐付けられる）。
export const contactAccessKey = "840cc863-849d-46a5-8be8-d1b1cae1802d";

export const site = {
  name: "株式会社アヴァント",
  nameEn: "AVANT Inc.",
  tagline: "テクノロジーの力で、ビジネスの可能性を再定義する。",
  description:
    "生成AI活用支援・SNSマーケティング・WEB制作/DX化を通じて、企業の経営をアップデートするテクノロジー・イノベーション・カンパニー。",
  email: "info@avant-neo.jp",
  url: "https://avant-neo.jp",
  established: "1999年3月24日",
  capital: "1,000万円",
  ceo: "鶴見 竜之介",
} as const;

export const nav = [
  { label: "Home", labelJa: "ホーム", href: "/" },
  { label: "Services", labelJa: "サービス", href: "/services" },
  { label: "About", labelJa: "会社案内", href: "/about" },
  { label: "News", labelJa: "お知らせ", href: "/news" },
  { label: "Access", labelJa: "アクセス", href: "/access" },
] as const;

export const offices = [
  {
    name: "本社",
    zip: "320-0061",
    address: "栃木県宇都宮市宝木町2丁目802番地1 ヴィラパンフィーリ1F",
    note: "イヴォワール洋菓子店様の隣／ローソン 宇都宮宝木二丁目店様の向かい",
    parking: "あり（要問合せ）",
  },
  {
    name: "宇都宮拠点",
    zip: "321-0954",
    address: "栃木県宇都宮市元今泉5丁目13-14 Park East 3F",
    note: "",
    parking: "あり（要問合せ）",
  },
] as const;

export const banks = ["みずほ銀行", "足利銀行", "栃木銀行", "鹿沼相互信用金庫"];

// 事業の3本柱
export const pillars = [
  {
    no: "01",
    title: "経営OSをアップデート",
    titleEn: "Update your business OS",
    desc: "ChatGPT等の生成AIを業務で『使いこなす』ための実践研修と、全社的なAI導入コンサルティング。生産性を劇的に高め、新たなビジネス価値を創出します。",
    tags: ["生成AI研修", "DX化支援", "業務効率化"],
  },
  {
    no: "02",
    title: "顧客との絆をデザイン",
    titleEn: "Design the bond with customers",
    desc: "TikTok・YouTube・InstagramのSNS運用代行から、ターゲットの心を動かすインフルエンサー施策まで。認知拡大から熱狂的なファン育成まで一貫支援します。",
    tags: ["SNSマーケティング", "インフルエンサー", "ファン育成"],
  },
  {
    no: "03",
    title: "実践知見を、戦略へ",
    titleEn: "From practice to strategy",
    desc: "成果につながるコーポレート／ECサイトの企画・制作、オウンドメディア運用。自社運営で培った『リアルな』ノウハウを還元し、机上の空論ではない戦略を提供します。",
    tags: ["WEB制作", "ECサイト", "オウンドメディア"],
  },
] as const;

// サービス詳細
export const services = [
  {
    id: "ai",
    title: "生成AI活用支援",
    subtitle: "研修・コンサルティング",
    body: "「ChatGPTって何ができるの?」という段階から伴走します。日々の議事録づくり・メール文面の作成・企画書のたたき台・社内マニュアル整備などをAIで効率化。御社の実際の業務を題材にしたハンズオン研修で、社員一人ひとりが“使える”ようになるところまでサポートし、会社全体への導入計画づくりまでお手伝いします。",
    points: [
      "社員向けの実践型ハンズオン研修・講習会",
      "議事録・メール・資料作成などの業務効率化",
      "自社専用AIチャットや業務自動化の導入支援",
    ],
  },
  {
    id: "sns",
    title: "SNS／インフルエンサーマーケティング",
    subtitle: "運用代行・施策設計",
    body: "Instagram・TikTok・YouTubeの「何を投稿すればいいか分からない」を丸ごと解決。投稿の企画から撮影・編集・毎日の更新・コメント対応まで代行します。さらに、商品やお店に合ったインフルエンサー(SNSで影響力のある人)の選定・交渉や、ライブ配信での販売まで対応。フォロワーを“ファン”に育て、売上につなげます。",
    points: [
      "SNSアカウントの企画・投稿・運用まるごと代行",
      "商品に合うインフルエンサーの選定・起用",
      "ライブ配信での商品紹介・販売(ライブコマース)",
    ],
  },
  {
    id: "web",
    title: "WEBコンテンツ制作・DX化支援",
    subtitle: "制作・デジタル戦略",
    body: "「会社のホームページを新しくしたい」「ネットショップを始めたい」といったご要望に対応。デザインから文章作成、公開後の更新まで一括で承ります。あわせて、紙やExcelで行っている予約・在庫・顧客管理などをデジタル化(DX)し、日々の手間を削減。Webからの集客と業務の効率化を同時に進めます。",
    points: [
      "ホームページ・ネットショップ(EC)の制作",
      "ブログ記事・写真・動画などのコンテンツ制作",
      "予約・在庫・顧客管理などのデジタル化(DX)",
    ],
  },
  {
    id: "advisory",
    title: "技術顧問契約",
    subtitle: "技術アドバイス",
    body: "「専任のIT担当者がいない」「何から手をつければいいか分からない」という企業さまの“社外の技術パートナー”として、継続的に伴走します。技術の選定や開発のご相談、社員のスキルアップ教育、社内のIT環境・ツールの構築支援まで、御社の状況に合わせて必要なアドバイスとサポートを提供します。",
    points: [
      "技術アドバイス・技術選定のご相談",
      "社員教育・スキルアップ支援",
      "会社の環境構築・ツール導入の支援",
    ],
  },
] as const;

// お知らせ（将来CMS連携を見据えたデータ構造）
export type NewsItem = {
  slug: string;
  date: string;
  category: string;
  title: string;
  body: string;
};

export const news: NewsItem[] = [
  {
    slug: "website-renewal",
    date: "2026-06-01",
    category: "お知らせ",
    title: "コーポレートサイトをリニューアルしました",
    body: "この度、株式会社アヴァントのコーポレートサイトを全面リニューアルいたしました。今後とも変わらぬご愛顧を賜りますようお願い申し上げます。",
  },
  {
    slug: "website-launch",
    date: "2025-04-01",
    category: "お知らせ",
    title: "ホームページを公開しました",
    body: "株式会社アヴァントのホームページを公開しました。",
  },
];
