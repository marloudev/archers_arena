
  
  export default function OfferSection() {

    const incentives = [
        {
          name: 'Activities',
          imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-shipping-simple.svg',
          description: "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
        },
        {
          name: 'Group Packages',
          imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-warranty-simple.svg',
          description: "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
        },
        {
          name: 'Parties',
          imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-exchange-simple.svg',
          description:
            "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
        },
        {
            name: 'Gym Rental',
            imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-warranty-simple.svg',
            description:
              "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
          },
      ]
    return (
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl py-12 sm:px-2lg:px-4">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
            <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
              <div>
                <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                  We built our business on great customer service
                </h2>
                <p className="mt-4 text-gray-500">
                  At the beginning at least, but then we realized we could make a lot more money if we kinda stopped
                  caring about that. Our new strategy is to write a bunch of things that look really good in the
                  headlines, then clarify in the small print but hope people don't actually read it.
                </p>
              </div>
              <img
                alt=""
                src="/resources/resources4.jpeg"
                className="aspect-3/2 w-full rounded-lg bg-gray-100 object-cover"
              />
            </div>
            <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {incentives.map((incentive) => (
                <div key={incentive.name} className="sm:flex lg:block">
                  <div className="sm:shrink-0">
                    <img alt="" src={incentive.imageSrc} className="size-16" />
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                    <h3 className="text-sm font-medium text-gray-900">{incentive.name}</h3>
                    <p className="mt-2 text-sm text-gray-500">{incentive.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  