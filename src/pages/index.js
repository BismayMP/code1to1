import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { HomepageCta, HomepageFeatureList, HomepageHero, HomepageLogoList, HomepageProductList } from "../components/sections";
import Fallback from "../components/fallback";
import SEOHead from "../components/head";

export default function Homepage(props) {
  const { homepage } = props.data;
  return (
    <Layout>
      {homepage?.blocks?.map((block) => {
        const { id, blocktype, ...componentProps } = block;
        switch (blocktype) {
          case "HomepageHero":
            return <HomepageHero key={id} {...componentProps} />;
          case "HomepageLogoList":
            return <HomepageLogoList key={id} {...componentProps} />;
          case "HomepageProductList":
            return <HomepageProductList key={id} {...componentProps} />;
          case "HomepageCta":
            return <HomepageCta key={id} {...componentProps} />;
          case "HomepageFeatureList":
            return <HomepageFeatureList key={id} {...componentProps} />;
          default:
            return <></>;
        }
      })}
    </Layout>
  );
}
export const Head = (props) => {
  const { homepage } = props.data;
  return <SEOHead
    title={homepage?.title}
    description={homepage?.description}
    image={homepage?.image}
  />;
};
export const query = graphql`
  {
    homepage {
      id
      title
      description
      image {
        id
        url
      }
      blocks: content {
        id
        blocktype
        ...HomepageHeroContent
        ...HomepageFeatureListContent
        ...HomepageCtaContent
        ...HomepageLogoListContent
        ...HomepageProductListContent
      }
    }
  }
`;
// ...HomepageTestimonialListContent
//         ...HomepageBenefitListContent
//         ...HomepageStatListContent;