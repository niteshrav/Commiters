import { HOME_SECTION_SEPARATOR_CLASS } from "../lib/homeSectionLayout";

type Props = {
  testId: string;
};

export default function HomeSectionSeparator({ testId }: Props) {
  return (
    <hr
      className={`home-section-separator band-breakout ${HOME_SECTION_SEPARATOR_CLASS}`}
      data-testid={testId}
    />
  );
}
