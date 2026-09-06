import { BRAND_WATERMARK_CLASS, BRAND_WATERMARK_SRC, BRAND_WATERMARK_TESTID } from "../lib/brandWatermark";

export default function BrandWatermark() {
  return (
    <img
      className={BRAND_WATERMARK_CLASS}
      data-testid={BRAND_WATERMARK_TESTID}
      src={BRAND_WATERMARK_SRC}
      alt=""
      aria-hidden="true"
    />
  );
}
