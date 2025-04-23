// import AddToCartButton from '@/components/AddToCartButton'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

import PropertyReel from '@/components/PropertyReel'

const Page = async () => {
  return (
    <MaxWidthWrapper className='bg-white'>

      <PropertyReel title="Prontos para morar" query={{ sort: "desc", limit: 4, status: "prontos-para-morar" }} />

    </MaxWidthWrapper>
  )
}

export default Page