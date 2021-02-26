import * as React from 'react';
import useSWR from 'swr';
import { FC } from 'react';
import products from '../products.json';
import { Product } from './Product';

const projectId = 1087729420343;
const apiKey = 'AIzaSyC784SQuke0f8cPIUAetGiZzi6zlAMAbZM';
const modelName = 'recently_viewed_default';

const endpoint = `https://recommendationengine.googleapis.com/v1beta1/projects/${projectId}/locations/global/catalogs/default_catalog/eventStores/default_event_store/placements/${modelName}:predict?key=${apiKey}`

export const Recommendations: FC<{ payload: any, dryRun?: boolean }> = ({ payload, dryRun = false }) => {
  const fetcher = (url: string) => fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ...payload, dryRun }),
  }).then(res => res.json())
  const { data, error } = useSWR(endpoint, fetcher);

  const loading = !data && !error;
  if (loading) {
    return (
      <h1 className="text-white text-lg py-2">
        Loading
      </h1>
    )
  }
  if (error) {
    return (
      <h1 className="text-red text-lg py-2">
        Error: {error.toString()}
      </h1>
    )
  }
  if (data?.results?.length) {
    console.log(data?.results);
    return (
      <>
        {data.results.map(({ id }) => products.find(product => product.id === id)).filter(p => !!p).map(product => (
          <Product key={product.id} product={product}/>
        ))}
      </>
    )
    return "Data";
  }
  return (
    <h1 className="text-white text-lg py-2">
      No recommendations yet
    </h1>
  );
}