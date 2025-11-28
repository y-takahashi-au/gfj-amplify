
import { useIntlayer } from "next-intlayer/server";
import { type FC } from "react";

export const AboutUs: FC = () => {
  const content = useIntlayer("about-us");

  return (
    <div>
      <h3 className="pt-5 text-xl font-bold">{content.title.value}</h3>
      <p>{content.description.value}</p>
    </div>
  );
};
