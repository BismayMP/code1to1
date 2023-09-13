import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { graphql } from "gatsby";
import Layout from "../components/layout";
import * as sections from "../components/sections";
import Fallback from "../components/fallback";
import SEOHead from "../components/head";

export default function Homepage(props) {
  const { homepage } = props.data;

  return (
    <Layout>
      {homepage?.blocks?.map((block) => {
        if (block === null) {
          return <></>;
        }
        const { id, blocktype, ...componentProps } = block;
        const Component = sections && sections[blocktype] || Fallback;
        return <Component key={id} {...componentProps} />;
      })}
    </Layout>
  );
}
export const Head = (props) => {
  const { homepage } = props.data;
  return <SEOHead {...homepage} />;
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