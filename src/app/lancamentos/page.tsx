// import AddToCartButton from '@/components/AddToCartButton'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

import PropertyReel from '@/components/PropertyReel'

const Page = async () => {
  return (
    <MaxWidthWrapper className='bg-white'>

      <PropertyReel title="Lançamentos" query={{ sort: "desc", limit: 4, status: "lancamentos" }} />

    </MaxWidthWrapper>
  )
}

export default Page