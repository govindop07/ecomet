import Skeleton from '@mui/material/Skeleton';

export default function CollectionLoading() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
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
