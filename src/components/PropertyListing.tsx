'use client'

import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'
import { cn, formatPrice } from '@/lib/utils'
import { PROPERTY_CATEGORIES, PROPERTY_STATUS } from '@/config'
import ImageSlider from './ImageSlider'
import { Imovei } from '@/payload-types'

interface PropertyListingProps {
  property: Imovei | null
  index: number
}

const PropertyListing = ({
  property,
  index,
}: PropertyListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 75)

    return () => clearTimeout(timer)
  }, [index])

  if (!property || !isVisible) return <PropertyPlaceholder />

  const label = PROPERTY_CATEGORIES.find(
    ({ value }) => value === property.category
  )?.label

  const labelStatus = PROPERTY_STATUS.find(
    ({ value }) => value === property.status
  )?.label

  const validUrls = property.images
    .map(({ image }) =>
      typeof image === 'string' ? image : image.url
    )
    .filter(Boolean) as string[]

  if (isVisible && property) {
    return (
      <Link
        className={cn(
          'invisible h-full w-full cursor-pointer group/main',
          {
            'visible animate-in fade-in-5': isVisible,
          }
        )}
        href={`/imoveis/${property.id}`}>
        <div className='flex flex-col w-full'>
          <ImageSlider urls={validUrls} />

          <h3 className='mt-4 font-medium text-sm text-gray-700'>
            {property.title}
          </h3>
          <p className='mt-1 text-sm text-gray-500'>
            {label}
          </p>
          <p className='mt-1 text-sm text-gray-500'>
            {labelStatus}
          </p>
          <p className='mt-1 font-medium text-sm text-gray-900'>
            {formatPrice(property.price)}
          </p>
        </div>
      </Link>
    )
  }
}

const PropertyPlaceholder = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
        <Skeleton className='h-full w-full' />
      </div>
      <Skeleton className='mt-4 w-2/3 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-16 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-12 h-4 rounded-lg' />
    </div>
  )
}

export default PropertyListing