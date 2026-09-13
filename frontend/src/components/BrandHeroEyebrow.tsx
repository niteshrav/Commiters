import {
  BRAND_HERO_EYEBROW_CLASS,
  BRAND_HERO_EYEBROW_TESTID,
  BRAND_HERO_EYEBROW_TEXT,
  BRAND_HERO_EYEBROW_WRAP_CLASS,
} from "../lib/siteBrandChrome";

type Props = {
  text?: string;
};

export default function BrandHeroEyebrow({ text = BRAND_HERO_EYEBROW_TEXT }: Props) {
  return (
    <div className={BRAND_HERO_EYEBROW_WRAP_CLASS} data-testid={BRAND_HERO_EYEBROW_TESTID}>
      <span className={BRAND_HERO_EYEBROW_CLASS}>{text}</span>
    </div>
  );
}
