import {
  gql,
  type HydrogenApiRouteOptions,
  type HydrogenRequest,
} from '@shopify/hydrogen';

export async function api(
  request: HydrogenRequest,
  {queryShop}: HydrogenApiRouteOptions,
) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 405,
      headers: {Allow: 'POST'},
    });
  }

  const url = new URL(request.url);
  const countryCode = url.searchParams.get('country');
  const languageCode = url.searchParams.get('language');
  const query = url.searchParams.get('query');

  return await queryShop({
    query: PREDICTIVE_SEARCH_QUERY,
    variables: {
      query,
      countryCode,
      languageCode,
    },
  });
}

const PREDICTIVE_SEARCH_QUERY = gql`
  query predictiveSearch(
    $query: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    predictiveSearch(
      limit: 10
      query: $query
      types: [PRODUCT, PAGE, ARTICLE, QUERY]
    ) {
      products {
        id
        title
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
          }
        }
      }
      pages {
        id
        title
        handle
        trackingParameters
      }
      articles {
        id
        title
        handle
        trackingParameters
        image {
          url
          altText
          width
          height
        }
      }
      queries {
        text
        styledText
        trackingParameters
      }
    }
  }
`;
