import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import {
  Nudge,
  Container,
  Section,
  Heading,
  Text,
  ButtonList,
  Kicker
} from "./ui";
import ContactForm from "./contact-form";

export default function HomepageCta(props) {
  return (
    <Container width="fullbleed" id={props.sectionId}>
      <Section padding={5} radius="large" background="primary">
        <Heading center>
          {props.kicker && <Kicker center>{props.kicker}</Kicker>}
          {props.heading}
        </Heading>
        {props.text && <Text as="p" center variant="lead">
          {props.text}
        </Text>
        }
        <ButtonList links={props.links} variant="center" reversed />
        {
          props.hasContactForm &&
          <ContactForm />
        }
        {props.image && (
          <Nudge left={5} right={5} bottom={5}>
            <GatsbyImage
              alt={props.image.alt}
              image={getImage(props.image.gatsbyImageData)}
            />
          </Nudge>
        )}
      </Section>
    </Container>
  );
}

export const query = graphql`
  fragment HomepageCtaContent on HomepageCta {
    id
    kicker
    sectionId
    heading
    text
    hasContactForm
    image {
      alt
      id
      gatsbyImageData
    }
    links {
      id
      href
      text
    }
  }
`;
