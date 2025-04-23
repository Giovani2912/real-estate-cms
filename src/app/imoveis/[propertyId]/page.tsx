// import AddToCartButton from '@/components/AddToCartButton'
import ImageSlider from '@/components/ImageSlider'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

import PropertyReel from '@/components/PropertyReel'
import { buttonVariants } from '@/components/ui/button'
import { PROPERTY_CATEGORIES } from '@/config'
import { getPayloadClient } from '@/get-payload'
import { formatCurrency } from '@/lib/formatCurrency'
import { Imovei } from '@/payload-types'
import { BathIcon, Bed, Car, Check, MapPin, ShowerHeadIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    propertyId: string
  }
}

const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Imóveis', href: '/imoveis' },
]

const Page = async ({ params }: PageProps) => {
  const { propertyId } = params

  const payload = await getPayloadClient()

  const { docs: imoveis } = await payload.find({
    collection: 'imoveis',
    limit: 1,
    where: {
      id: {
        equals: propertyId,
      },
    },
  })

  //@ts-ignore
  const [property]: Imovei | any = imoveis

  if (!property) return notFound()

  const label = PROPERTY_CATEGORIES.find(
    ({ value }) => value === property.category
  )?.label

  const validUrls = property.images
    .map(({ image }) =>
      typeof image === 'string' ? image : image.url
    )
    .filter(Boolean) as string[]

  return (
    <MaxWidthWrapper className='bg-white'>
      <div className='bg-white'>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
          {/* Product Details */}
          <div className='lg:max-w-lg lg:self-end'>
            <ol className='flex items-center space-x-2'>
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className='flex items-center text-sm'>
                    <Link
                      href={breadcrumb.href}
                      className='font-medium text-sm text-muted-foreground hover:text-gray-900'>
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                        className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                        <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className='mt-4'>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                {property.title}
              </h1>
            </div>

            <section className='mt-4'>
              <div className='flex items-center'>
                <p className='font-medium text-gray-900'>
                  {formatCurrency(property.price)}
                </p>

                <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
                  {label}
                </div>
              </div>

              <div className='mt-4 space-y-6'>
                <p className='text-base text-muted-foreground'>
                  {property.description}
                </p>
              </div>

              <div className='mt-6 flex items-center'>
                <Check
                  aria-hidden='true'
                  className='h-7 w-7 flex-shrink-0 text-red-500'
                />
                <p className='ml-2 text-sm text-muted-foreground'>
                  Cadastrado por 
                  <Link href='/' className={buttonVariants({variant: 'link'})}>Valdir Foltran</Link>
                </p>
              </div>

              <div className='mt-6 flex items-center'>
                <MapPin
                  aria-hidden='true'
                  className='h-7 w-7 flex-shrink-0 text-red-500' 
                />     
                <p className='ml-2 text-sm text-muted-foreground'>
                  {property.street}, {property.number} - {property.neighborhood}  
                </p>
              </div>
            </section>
          </div>

          {/* Product images */}
          <div className='mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center'>
            <div className='aspect-square rounded-lg'>
              <ImageSlider urls={validUrls} />
            </div>
            <div className='flex flex-col gap-4 mt-4'>
            <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-4 md:space-y-2 w-fit">
              <li className="w-fit">
                <BathIcon className="h-5 w-5 text-red-600 inline mr-1.5" />
                {property.bathrooms} banheiros
              </li>
              <li className="w-fit">
                <Bed className="h-5 w-5 text-red-600 inline mr-1.5" />
                {property.bedrooms} quartos
              </li>
              <li className="w-fit">
                <Car className="h-5 w-5 text-red-600 inline mr-1.5" />
                {} vagas de garagem
              </li>
              <li className="w-fit">
                <ShowerHeadIcon className="h-5 w-5 text-red-600 inline mr-1.5" />
                {} suítes
              </li>
            </ul>
            </div>
          </div>

          {/* add to cart part */}
          {/* <div className='mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start'>
            <div>
              <div className='mt-10'>
                <AddToCartButton product={product} />
              </div>
              <div className='mt-6 text-center'>
                <div className='group inline-flex text-sm text-medium'>
                  <Shield
                    aria-hidden='true'
                    className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400'
                  />
                  <span className='text-muted-foreground hover:text-gray-700'>
                    30 Day Return Guarantee
                  </span>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <PropertyReel
        href={`/imoveis/${property.category}`}
        query={{ category: property.category, limit: 4 }}
        title={`Mais ${label}`}
        subtitle={`Veja outras opções de ${label} parecidas com '${property.title}'`}
      />
    </MaxWidthWrapper>
  )
}

export default Page