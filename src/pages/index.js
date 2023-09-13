import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { HomepageCta, HomepageFeatureList, HomepageHero, HomepageLogoList, HomepageProductList } from "../components/sections";
import SEOHead from "../components/head";

export default function Homepage(props) {
  const { homepage } = props.data;
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  if (!homepage && !hasWindow) {
    return <></>;
  }

  return (
    <Layout>
      {homepage?.blocks?.length ? homepage?.blocks?.map((block) => {
        const { id, blocktype, ...componentProps } = block;
        console.log(block);
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
      }) : <></>}
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