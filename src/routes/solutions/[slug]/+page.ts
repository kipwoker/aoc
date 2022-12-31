import type { PageLoad } from './$types';
 
export const load = (({ params }) => {
  return {
    solutionId: params.slug
  };
}) satisfies PageLoad;