import Skeleton from '@mui/material/Skeleton';

export default function ProductsLoading() {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-[80vw] gap-4 gap-y-6'>
      <div>
        <Skeleton variant="rectangular" width={210} height={118} />
        <Skeleton />
        <Skeleton width="60%" />
      </div>
      <div>
        <Skeleton variant="rectangular" width={210} height={118} />
        <Skeleton />
        <Skeleton width="60%" />
      </div>
      <div>
        <Skeleton variant="rectangular" width={210} height={118} />
        <Skeleton />
        <Skeleton width="60%" />
      </div>
      <div>
        <Skeleton variant="rectangular" width={210} height={118} />
        <Skeleton />
        <Skeleton width="60%" />
      </div>
      <div>
        <Skeleton variant="rectangular" width={210} height={118} />
        <Skeleton />
        <Skeleton width="60%" />
      </div>
    </div>
  );
}
