import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const AppStore = () => {
  return (
    <div className="w-full flex justify-center mt-16">
        <Link href="https://apps.apple.com/tr/app/velora/id6762641928">
            <Image src="/App-store-download.webp" alt="App store'dan indir" className="justify-center "  width={175} height={175} />
        </Link>
    </div>
  )
}
