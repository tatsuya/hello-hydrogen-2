import {gql} from '@shopify/hydrogen';

export const MEDIA_FRAGMENT = gql`
  fragment Media on Media {
    mediaContentType
    alt
    previewImage {
      url
    }
    ... on MediaImage {
      id
      image {
        url
        width
        height
      }
    }
    ... on Video {
      id
      sources {
        mimeType
        url
      }
    }
    ... on Model3d {
      id
      sources {
        mimeType
        url
      }
    }
    ... on ExternalVideo {
      id
      embedUrl
      host
    }
  }
`;

export const ARTICLE_CARD_FRAGMENT = gql`
  fragment ArticleCard on Article {
    id
    title
    publishedAt
    handle
    trackingParameters
    image {
      url
      altText
      width
      height
    }
    __typename
  }
`;

export const PAGE_CARD_FRAGMENT = gql`
  fragment PageCard on Page {
    id
    title
    createdAt
    handle
    trackingParameters
    __typename
  }
`;

export const PRODUCT_CARD_FRAGMENT = gql`
  fragment ProductCard on Product {
    id
    title
    publishedAt
    handle
    trackingParameters
    variants(first: 1) {
      nodes {
        id
        image {
          url
          altText
          width
          height
        }
        priceV2 {
          amount
          currencyCode
        }
        compareAtPriceV2 {
          amount
          currencyCode
        }
      }
    }
    __typename
  }
`;
