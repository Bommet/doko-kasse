/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEvening = /* GraphQL */ `
  query GetEvening($Datum: String!) {
    getEvening(Datum: $Datum) {
      Datum
      hannes
      louisa
      tim
      sonstige
      ole
      jan
      semester
    }
  }
`;
export const listEvenings = /* GraphQL */ `
  query ListEvenings($filter: TableEveningFilterInput, $limit: Int, $nextToken: String) {
    listEvenings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        Datum
        hannes
        louisa
        tim
        sonstige
        ole
        jan
        semester
      }
      nextToken
    }
  }
`;
