import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-beige-100">
      {/* Illustration Panel - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:flex lg:w-[560px] lg:flex-shrink-0">
        <div className="relative m-5 flex w-full flex-col justify-between overflow-hidden rounded-xl bg-grey-900 p-10">
          {/* Background illustration */}
          <div className="absolute inset-0 rounded-xl">
            <Image
              src="/auth-illustration.png"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <Image
              src="/logo-white.svg"
              alt="finance"
              width={121}
              height={22}
              priority
            />
          </div>

          <div className="relative z-10 flex flex-col gap-6 text-white">
            <h2 className="text-[32px] font-bold leading-[1.2]">
              Keep track of your money
              <br />
              and save for your future
            </h2>
            <p className="text-sm leading-[1.5]">
              Personal finance app puts you in control of your spending. Track
              transactions, set budgets, and add to savings pots easily.
            </p>
          </div>
        </div>
      </div>

      {/* Form Area */}
      <div className="flex flex-1 items-center justify-center p-8 md:p-10">
        <div className="w-full max-w-[560px]">
          {children}
        </div>
      </div>
    </div>
  )
}
